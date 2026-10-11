// Runs the real TypeScript transport with deterministic network and timers.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function setup({ token, issuanceStatus = 200 } = {}) {
  let now = 0, nextTimer = 0;
  const timers = new Map(), sockets = [], fetches = [], views = [];
  const randomMath = Object.create(Math);
  randomMath.random = () => 0.5;
  class FakeSocket {
    static OPEN = 1;
    readyState = 0;
    packets = [];
    constructor(url) { this.url = url; sockets.push(this); }
    open() { this.readyState = 1; this.onopen?.(); }
    send(raw) { this.packets.push(JSON.parse(raw)); }
    receive(event) { this.onmessage?.({ data: JSON.stringify(event) }); }
    close(code = 1000) { this.readyState = 3; this.onclose?.({ code }); }
  }
  const sandbox = {
    URL, AbortSignal, WebSocket: FakeSocket,
    Date: class extends Date { static now() { return now; } },
    Math: randomMath, navigator: {},
    setTimeout: (fn, delay) => { const id = ++nextTimer; timers.set(id, { fn, at: now + delay }); return id; },
    clearTimeout: id => timers.delete(id),
    setInterval: () => ++nextTimer, clearInterval: () => {},
    fetch: async (url, options) => {
      fetches.push({ url: String(url), options });
      return { ok: issuanceStatus === 200, status: issuanceStatus, headers: { get: () => null }, json: async () => ({ msg: "CHAT_GUEST_SESSION_UNAVAILABLE", data: null }) };
    },
  };
  const modules = {};
  function read(name) {
    if (modules[name]) return modules[name];
    if (name === "@/lib/config/app-env") return { getApiBaseUrl: () => "https://api.example.test" };
    const filename = `features/live-map/chat/${name.replace(/^\.\//, "")}.ts`;
    const code = ts.transpileModule(fs.readFileSync(filename, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
    const module = { exports: {} };
    vm.runInNewContext(`(function(require,module,exports){${code}\n})`, sandbox, { filename })(read, module, module.exports);
    modules[name] = module.exports;
    return module.exports;
  }
  const { LiveMapChatRealtimeClient } = read("./realtime-client");
  const client = new LiveMapChatRealtimeClient({ url: "wss://api.example.test/api/live-map/v3/chat/ws", getToken: async () => token, onChange: view => views.push(view) });
  async function flush() { for (let i = 0; i < 15; i++) await Promise.resolve(); }
  async function advance(ms) {
    now += ms;
    for (const [id, timer] of [...timers]) if (timer.at <= now) { timers.delete(id); timer.fn(); }
    await flush();
  }
  return { client, sockets, fetches, views, flush, advance, timers };
}
const error = (msg, retry_after = null) => ({ type: "error", status: msg.includes("INVALID") ? 401 : 429, msg, retry_after, request_id: null });

(async () => {
  const guest = setup();
  guest.client.start(); await guest.flush();
  assert.equal(guest.fetches.length, 1);
  assert.equal(guest.fetches[0].url, "https://api.example.test/api/live-map/v3/chat/guest-session");
  assert.equal(guest.fetches[0].options.credentials, "include");
  assert.equal(guest.fetches[0].options.cache, "no-store");
  assert.equal(guest.fetches[0].options.body, "{}");
  guest.sockets[0].open();
  assert.equal(JSON.stringify(guest.sockets[0].packets[0]), '{"type":"guest","session":"cookie"}');
  guest.sockets[0].receive(error("CHAT_CONNECT_RATE_LIMITED", 10)); guest.sockets[0].close(4429);
  await guest.advance(9999); guest.client.reconnect(); await guest.flush();
  assert.equal(guest.sockets.length, 1, "Manual retry must honor server cooldown");
  await guest.advance(1); assert.equal(guest.sockets.length, 2);
  guest.client.dispose();
  console.log("PASS cookie issuance ordering, same host, credentials, connect cooldown");

  const invalid = setup(); invalid.client.start(); await invalid.flush();
  invalid.sockets[0].open(); invalid.sockets[0].receive(error("CHAT_GUEST_SESSION_INVALID")); invalid.sockets[0].close(4401);
  await invalid.advance(1000); invalid.sockets[1].open();
  invalid.sockets[1].receive(error("CHAT_GUEST_SESSION_INVALID")); invalid.sockets[1].close(4401);
  await invalid.advance(120000);
  assert.equal(invalid.fetches.length, 2); assert.equal(invalid.sockets.length, 2);
  assert.equal(invalid.views.at(-1).connection, "stopped"); invalid.client.dispose();
  console.log("PASS cookie rejection retries once then stops without IP fallback");

  const unavailable = setup({ issuanceStatus: 503 }); unavailable.client.start(); await unavailable.flush();
  assert.equal(unavailable.sockets.length, 0); await unavailable.advance(1000);
  assert.equal(unavailable.fetches.length, 2); assert.equal(unavailable.sockets.length, 0); unavailable.client.dispose();
  const unshipped = setup({ issuanceStatus: 404 }); unshipped.client.start(); await unshipped.flush();
  await unshipped.advance(120000); assert.equal(unshipped.fetches.length, 1); assert.equal(unshipped.sockets.length, 0); unshipped.client.dispose();
  console.log("PASS issuance failure opens no WS, 503 backoff, absent endpoint stops");

  const loggedIn = setup({ token: "test-token" }); loggedIn.client.start(); await loggedIn.flush(); loggedIn.sockets[0].open();
  assert.equal(loggedIn.fetches.length, 0); assert.equal(loggedIn.sockets[0].packets[0].type, "auth"); loggedIn.client.dispose();
  const refresh = setup(); refresh.client.start(); await refresh.flush(); refresh.sockets[0].open(); refresh.sockets[0].close(1012);
  await refresh.advance(1000); assert.equal(refresh.fetches.length, 2); refresh.client.dispose();
  console.log("PASS authenticated mode and 1012 guest session revalidation");
})().catch(error => { console.error(error); process.exitCode = 1; });
