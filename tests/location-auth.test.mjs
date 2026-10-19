import test from 'node:test';
import assert from 'node:assert/strict';
import { LocationRealtimeClient } from '../lib/websocket/location-client.ts';

test('socket auth rejection refreshes once then stops; outages retry without forcing refresh', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout', 'setInterval'] });
  const sockets = [];
  class Socket {
    static OPEN = 1;
    static CONNECTING = 0;
    readyState = 0;
    constructor() { sockets.push(this); }
    close() {}
  }
  const original = Object.getOwnPropertyDescriptor(globalThis, 'WebSocket');
  Object.defineProperty(globalThis, 'WebSocket', { configurable: true, writable: true, value: Socket });
  t.after(() => Object.defineProperty(globalThis, 'WebSocket', original));
  const forces = [];
  const statuses = [];
  const client = new LocationRealtimeClient({ host: 'test.example', getToken: async force => { forces.push(force); return 'token'; }, onStatus: status => statuses.push(status), onMessage() {} });
  const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
  client.start();
  await flush();
  sockets[0].onclose({ code: 4401 });
  t.mock.timers.tick(40000);
  await flush();
  assert.deepEqual(forces, [false, true]);
  sockets[1].onclose({ code: 4401 });
  assert.equal(statuses.at(-1), 'auth-required');
  t.mock.timers.tick(40000);
  await flush();
  assert.equal(sockets.length, 2);
  client.reconnect();
  await flush();
  sockets[2].onclose({ code: 1013 });
  t.mock.timers.tick(40000);
  await flush();
  assert.equal(forces.at(-1), false);
  client.dispose();
});
