// Deterministic WebSocket/clock tests. Uses the project's TypeScript compiler.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const source = ts.transpileModule(
  fs.readFileSync("features/live-map/party/realtime-client.ts", "utf8"),
  {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.CommonJS,
    },
  },
).outputText;
const flush = async () => {
  await Promise.resolve();
  await Promise.resolve();
};
function harness() {
  const base = Date.parse("2026-09-21T00:00:00Z");
  let time = base,
    sequence = 0,
    timerId = 0,
    view,
    terminal = [],
    tokenCount = 0;
  const timers = new Map(),
    sockets = [];
  function add(fn, delay, interval) {
    const id = ++timerId;
    timers.set(id, { fn, due: time + delay, interval });
    return id;
  }
  const clear = (id) => timers.delete(id);
  const clock = {
    tick(ms) {
      const end = time + ms;
      let safety = 0;
      while (true) {
        const next = [...timers]
          .filter(([, v]) => v.due <= end)
          .sort((a, b) => a[1].due - b[1].due)[0];
        if (!next) break;
        if (safety++ > 10000) throw Error("timer loop");
        const [id, t] = next;
        time = t.due;
        if (t.interval) t.due += t.interval;
        else timers.delete(id);
        t.fn();
      }
      time = end;
    },
  };
  class FakeDate extends Date {
    static now() {
      return time;
    }
  }
  class Socket {
    static OPEN = 1;
    readyState = 0;
    sent = [];
    constructor(url) {
      this.url = url;
      sockets.push(this);
    }
    open() {
      this.readyState = 1;
      this.onopen?.();
    }
    send(raw) {
      assert.equal(this.readyState, 1);
      this.sent.push(JSON.parse(raw));
    }
    receive(event) {
      this.onmessage?.({ data: JSON.stringify(event) });
    }
    close(code = 1000) {
      this.readyState = 3;
      this.onclose?.({ code });
    }
  }
  const context = {
    exports: {},
    Date: FakeDate,
    WebSocket: Socket,
    Math: { ...Math, min: Math.min, max: Math.max, random: () => 0 },
    setTimeout: (fn, ms) => add(fn, ms, 0),
    clearTimeout: clear,
    setInterval: (fn, ms) => add(fn, ms, ms),
    clearInterval: clear,
  };
  vm.runInNewContext(source, context);
  const client = new context.exports.PartyRealtimeClient({
    url: "wss://example.invalid/api/live-map/v3/party/rooms/room/ws",
    roomId: "room",
    getToken: async () => `token-${++tokenCount}`,
    onChange: (v) => (view = v),
    onTerminal: (e) => terminal.push(e),
  });
  const member = {
    id: "member",
    nickname: "Tester",
    color: "#AABBCC",
    role: "owner",
    status: "joined",
    joined_at: new Date(base - 1000).toISOString(),
  };
  const snapshot = (overrides = {}, serverTime = time) => ({
    type: "snapshot",
    event_id: `event-${++sequence}`,
    room_id: "room",
    server_time: new Date(serverTime).toISOString(),
    data: {
      room: { id: "room", member_count: 1, name: "Room" },
      me: member,
      members: [member],
      markers: [],
      positions: [],
      presence: { online_member_ids: ["member"], online_count: 1 },
      heartbeat_interval_seconds: 15,
      reconnect_grace_seconds: 90,
      reason: "sync",
      ...overrides,
    },
  });
  const point = (type, overrides = {}, serverTime = time) => ({
    type,
    event_id: `event-${++sequence}`,
    room_id: "room",
    server_time: new Date(serverTime).toISOString(),
    data: {
      member_id: "member",
      membership_epoch: "epoch-1",
      nickname: "Tester",
      color: "#AABBCC",
      floor_id: "floor",
      x: 12,
      z: 24,
      marker_type: "danger",
      expires_at: serverTime / 1000 + (type === "ping" ? 5 : 60),
      ...overrides,
    },
  });
  return {
    client,
    clock,
    sockets,
    snapshot,
    point,
    member,
    get view() {
      return view;
    },
    get terminal() {
      return terminal;
    },
    get time() {
      return time;
    },
    get tokens() {
      return tokenCount;
    },
    get timers() {
      return timers.size;
    },
    async start() {
      client.start();
      await flush();
      sockets.at(-1).open();
    },
    ready() {
      sockets.at(-1).receive(snapshot());
    },
  };
}
async function test(name, fn) {
  await fn();
  console.log("PASS", name);
}
(async () => {
  await test("auth in first frame, ready only after snapshot, heartbeat survives broadcasts", async () => {
    const h = harness();
    await h.start();
    const ws = h.sockets[0];
    assert.equal(ws.sent[0].type, "auth");
    assert.equal(ws.sent[0].token, "token-1");
    assert.ok(!ws.url.includes("token"));
    assert.equal(h.view.connection, "connecting");
    h.ready();
    assert.equal(h.view.connection, "connected");
    for (let i = 0; i < 6; i++) {
      h.clock.tick(5000);
      ws.receive(h.snapshot());
    }
    assert.equal(ws.sent.filter((x) => x.type === "heartbeat").length, 2);
    h.client.dispose();
    assert.equal(h.timers, 0);
  });
  await test("server-clock expiry, deduplication, ping survives ordinary snapshots", async () => {
    const h = harness();
    await h.start();
    const ws = h.sockets[0],
      server = h.time + 3600000;
    ws.receive(h.snapshot({}, server));
    const ping = h.point("ping", {}, server);
    ws.receive(ping);
    ws.receive(ping);
    assert.equal(h.view.pings.length, 1);
    h.clock.tick(2000);
    ws.receive(h.snapshot({}, server + 2000));
    assert.equal(h.view.pings.length, 1);
    h.clock.tick(3250);
    assert.equal(h.view.pings.length, 0);
    h.client.dispose();
  });
  await test("newest position wins over reordered events and delayed snapshots; epoch reset", async () => {
    const h = harness();
    await h.start();
    h.ready();
    const ws = h.sockets[0],
      time = h.time;
    const newest = h.point("position", { x: 99 }, time + 2000);
    ws.receive(newest);
    ws.receive(h.point("position", { x: 1 }, time + 1000));
    assert.equal(h.view.positions[0].data.x, 99);
    ws.receive(
      h.snapshot(
        { positions: [h.point("position", { x: 2 }, time + 1000)] },
        time + 1500,
      ),
    );
    assert.equal(h.view.positions[0].data.x, 99);
    const rejoined = {
      ...h.member,
      joined_at: new Date(time + 3000).toISOString(),
    };
    ws.receive(h.snapshot({ me: rejoined, members: [rejoined] }, time + 3000));
    assert.equal(h.view.positions.length, 0);
    ws.receive(
      h.point("position", { membership_epoch: "epoch-1" }, time + 2000),
    );
    assert.equal(h.view.positions.length, 0);
    ws.receive(
      h.point("position", { membership_epoch: "epoch-2" }, time + 3100),
    );
    assert.equal(h.view.positions.length, 1);
    h.client.dispose();
  });
  await test("persistent received positions survive expiry, restore and replace", async () => {
    const h = harness();
    await h.start();
    h.ready();
    const ws = h.sockets[0],
      pos = h.point("position", { expires_at: null, yaw: 90 });
    ws.receive(pos);
    for (let i = 0; i < 20; i++) {
      h.clock.tick(15000);
      ws.receive(h.snapshot({ positions: [pos] }));
    }
    assert.equal(h.view.positions.length, 1);
    assert.equal(h.view.positions[0].data.yaw, 90);
    ws.receive(h.point("position", { expires_at: null, x: 99 }, Date.now()));
    assert.equal(h.view.positions.length, 1);
    assert.equal(h.view.positions[0].data.x, 99);
    ws.receive(h.snapshot({ members: [], positions: [] }));
    assert.equal(h.view.positions.length, 0);
    h.client.dispose();
  });
  await test("positions expire without heartbeat extending their TTL", async () => {
    const h = harness();
    await h.start();
    h.ready();
    const ws = h.sockets[0],
      pos = h.point("position");
    ws.receive(pos);
    for (let i = 0; i < 3; i++) {
      h.clock.tick(15000);
      ws.receive(h.snapshot({ positions: [pos] }));
    }
    h.clock.tick(15250);
    assert.equal(h.view.positions.length, 0);
    h.client.dispose();
  });
  await test("reconnect refreshes token and restores snapshot but not old pings", async () => {
    const h = harness();
    await h.start();
    h.ready();
    h.sockets[0].receive(h.point("ping"));
    h.sockets[0].close(1012);
    h.clock.tick(1000);
    await flush();
    assert.equal(h.tokens, 2);
    h.sockets[1].open();
    assert.equal(h.sockets[1].sent[0].token, "token-2");
    assert.equal(h.view.pings.length, 0);
    assert.notEqual(h.view.connection, "connected");
    h.sockets[1].receive(h.snapshot({ positions: [h.point("position")] }));
    assert.equal(h.view.positions.length, 1);
    h.client.dispose();
  });
  await test("exponential reconnect delay; terminal close never reconnects", async () => {
    const h = harness();
    await h.start();
    h.sockets[0].close(1013);
    h.clock.tick(999);
    await flush();
    assert.equal(h.sockets.length, 1);
    h.clock.tick(1);
    await flush();
    assert.equal(h.sockets.length, 2);
    h.sockets[1].close(1013);
    h.clock.tick(1999);
    await flush();
    assert.equal(h.sockets.length, 2);
    h.clock.tick(1);
    await flush();
    h.sockets[2].open();
    h.ready();
    h.sockets[2].receive({
      type: "error",
      status: 403,
      msg: "PARTY_MEMBER_KICKED",
    });
    h.sockets[2].close(4403);
    h.clock.tick(90000);
    await flush();
    assert.equal(h.sockets.length, 3);
    assert.equal(h.terminal[0].msg, "PARTY_MEMBER_KICKED");
    h.client.dispose();
  });
  await test("429 blocks sends until retry_after; suspended leave blocks reconnect", async () => {
    const h = harness();
    await h.start();
    h.ready();
    const ws = h.sockets[0];
    ws.receive({
      type: "error",
      status: 429,
      msg: "TOO_MANY_ATTEMPTS",
      retry_after: 3,
    });
    assert.equal(
      h.client.sendPoint({ type: "position", floor_id: "floor", x: 1, z: 2 }),
      false,
    );
    h.clock.tick(3000);
    assert.equal(
      h.client.sendPoint({ type: "position", floor_id: "floor", x: 1, z: 2 }),
      true,
    );
    h.client.suspend();
    ws.close(1013);
    h.clock.tick(60000);
    await flush();
    assert.equal(h.sockets.length, 1);
    h.client.resume();
    await flush();
    assert.equal(h.sockets.length, 2);
    h.client.dispose();
  });
  await test("4401 retries fresh credentials only once; malformed frame stops", async () => {
    const h = harness();
    await h.start();
    h.sockets[0].close(4401);
    h.clock.tick(1000);
    await flush();
    h.sockets[1].open();
    h.sockets[1].close(4401);
    h.clock.tick(60000);
    await flush();
    assert.equal(h.sockets.length, 2);
    assert.equal(h.view.connection, "auth-required");
    assert.equal(h.view.error.status, 401);
    h.client.reconnect();
    await flush();
    h.sockets[2].open();
    h.sockets[2].onmessage({ data: "not JSON" });
    assert.equal(h.view.connection, "stopped");
    h.clock.tick(60000);
    await flush();
    assert.equal(h.sockets.length, 3);
    h.client.dispose();
  });
  console.log("Realtime protocol checks passed");
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
