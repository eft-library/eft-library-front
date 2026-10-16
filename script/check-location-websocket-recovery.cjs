// Deterministic tests of the real TypeScript transport and cross-type event cursor.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const code = ts.transpileModule(fs.readFileSync("lib/websocket/location-client.ts", "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
function setup() {
  let now = 0, id = 0, token = "test-token";
  const timers = new Map(), sockets = [], statuses = [], messages = [];
  class Socket {
    static OPEN = 1; static CONNECTING = 0;
    readyState = 0; sent = [];
    constructor(url) { this.url = String(url); sockets.push(this); }
    send(packet) { this.sent.push(packet); }
    open() { this.readyState = 1; this.onopen?.(); }
    receive(packet) { this.onmessage?.({ data: JSON.stringify(packet) }); }
    close(code = 1000) { this.readyState = 3; this.onclose?.({ code }); }
  }
  const math = Object.create(Math); math.random = () => 0.5;
  const sandbox = { URL, WebSocket: Socket, Math: math, Date: class extends Date { static now() { return now; } },
    setTimeout: (fn, delay) => { const key = ++id; timers.set(key, { fn, at: now + delay }); return key; },
    clearTimeout: key => timers.delete(key), setInterval: (fn, delay) => { const key = ++id; timers.set(key, { fn, at: now + delay, interval: delay }); return key; }, clearInterval: key => timers.delete(key) };
  const module = { exports: {} };
  vm.runInNewContext(`(function(module,exports){${code}\n})`, sandbox)(module, module.exports);
  const { LocationRealtimeClient, LocationEventCursor } = module.exports;
  const client = new LocationRealtimeClient({ host: "api.example.test", getToken: async () => token, onStatus: (status, connectionId) => statuses.push({ status, connectionId }), onMessage: packet => messages.push(packet) });
  const flush = async () => { for (let i = 0; i < 10; i++) await Promise.resolve(); };
  const advance = async ms => { now += ms; for (const [key, timer] of [...timers]) if (timer.at <= now) { timers.delete(key); timer.fn(); if (timer.interval && !timers.has(key)) timers.set(key, { ...timer, at: now + timer.interval }); } await flush(); };
  return { client, sockets, statuses, messages, timers, flush, advance, setToken: value => { token = value; }, LocationEventCursor };
}
(async () => {
  const test = setup(); test.client.start(); await test.flush();
  test.sockets[0].open(); assert.equal(test.statuses.at(-1).status, "connecting");
  test.sockets[0].receive({ type: "init", notifications: [] }); assert.equal(test.statuses.at(-1).status, "connecting");
  test.sockets[0].receive({ type: "location_connection_status", status: "ready", connection_id: "one" }); assert.equal(test.statuses.at(-1).status, "ready");
  test.sockets[0].receive({ type: "location_connection_status", status: "reconnecting", connection_id: "one" });
  test.client.wake(); assert.equal(test.sockets.length, 1);
  test.sockets[0].receive({ type: "location_connection_status", status: "ready", connection_id: "one" });
  await test.advance(30000); assert.deepEqual(test.sockets[0].sent, ["ping"]);
  test.sockets[0].close(1013); await test.advance(999); assert.equal(test.sockets.length, 1);
  test.setToken("renewed-token"); await test.advance(1); assert.equal(test.sockets.length, 2); assert(test.sockets[1].url.includes("renewed-token"));
  test.sockets[1].open(); test.sockets[1].receive({ type: "wpf_location", payload: "legacy" }); assert.equal(test.messages.at(-1).payload, "legacy");
  test.client.dispose(); await test.advance(120000); assert.equal(test.sockets.length, 2);
  console.log("PASS ready gating, Redis resubscribe without duplicate socket, ping, close/retry with fresh token, disposal");

  const auth = setup(); auth.client.start(); await auth.flush(); auth.sockets[0].close(1008); await auth.advance(1000); auth.sockets[1].close(1008); await auth.advance(120000);
  assert.equal(auth.statuses.at(-1).status, "auth-required"); assert.equal(auth.sockets.length, 2); auth.client.dispose();
  const stale = setup(); stale.client.start(); stale.client.dispose(); await stale.flush(); assert.equal(stale.sockets.length, 0);
  console.log("PASS authentication failure stops retry loop and stale async auth cannot open a socket");

  const cursor = new test.LocationEventCursor();
  assert(cursor.accept({ type: "wpf_raid_state", event_id: "raid", received_at_unix_us: 1000000 }));
  const restored = cursor.accept({ type: "wpf_location", event_id: "screenshot", received_at_unix_us: 2000000, request_id: 42, replayed: true });
  assert.equal(restored.publishedAt, 2000); assert.equal(restored.replayed, true); assert.equal(restored.requestId, 42);
  assert.equal(cursor.accept({ type: "wpf_location", event_id: "screenshot", received_at_unix_us: 2000000 }), null);
  assert.equal(cursor.accept({ type: "wpf_log_location", event_id: "old-log", received_at_unix_us: 1500000 }), null);
  assert.equal(cursor.accept({ type: "wpf_raid_state", event_id: "old-raid", received_at_unix_us: 1500000 }), null);
  assert(cursor.accept({ type: "wpf_log_location", event_id: "log", received_at_unix_us: 3000000 }));
  assert(cursor.accept({ type: "wpf_location", payload: "legacy" }));
  assert(new test.LocationEventCursor().accept({ event_id: "screenshot", received_at_unix_us: 2000000 }));
  console.log("PASS shared cross-type ordering, duplicate replay, metadata, legacy packets and new-account cursor");
})().catch(error => { console.error(error); process.exitCode = 1; });
