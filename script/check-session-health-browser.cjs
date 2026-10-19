// Auth/session responses are mocked. No Google credentials or real writes are used.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1280, height: 900 } });
    let sessionError, accessToken = 'test-token';
    const expires = Date.now() + 3600000;
    let calls = 0, connections = 0;
    await context.route('**/api/auth/session', route => {
      calls++;
      return route.fulfill({ json: { user: { email: 'session-test@example.invalid' }, userInfo: { email: 'session-test@example.invalid', nickname: 'session-test', is_admin: false }, accessToken, accessTokenExpires: sessionError === 'ReauthenticationRequired' ? Date.now() - 1000 : expires, error: sessionError, expires: '2099-01-01T00:00:00Z' } });
    });
    await context.route('**/api/auth/csrf', route => route.fulfill({ json: { csrfToken: 'test-csrf' } }));
    await context.route('**/api/live-map/v3/party/rooms?*', route => route.fulfill({ json: { status: 200, msg: 'OK', data: { rooms: [], total: 0, limit: 20, offset: 0 } } }));
    await context.route('**/api/live-map/v3/chat/guest-session', route => route.fulfill({ json: { status: 200, msg: 'OK', data: { guest_token: 'unused' } } }));
    await context.routeWebSocket('**/api/live-map/v3/chat/ws', socket => socket.onMessage(() => socket.send(JSON.stringify({ type: 'snapshot', data: { user: { id: 'user', nickname: 'test' }, lobby: [], party: [], party_room_id: null, party_invitations: [], online_users: [], moderation: { is_admin: false, restricted: false }, notifications: { party_invitation_count: 0, notification_tab: 'party' }, party_invite_preferences: { allow_party_invites: true }, heartbeat_interval_seconds: 30 } }))));
    await context.routeWebSocket('**/ws?token=*', socket => {
      connections++;
      socket.send(JSON.stringify({ type: 'init', notifications: [] }));
      socket.send(JSON.stringify({ type: 'location_connection_status', status: 'ready', connection_id: 'health-test' }));
    });
    const page = await context.newPage(); const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.clock.install();
    await page.goto('http://localhost:4000/live-map/customs');
    await page.getByText('위치 수신 준비 완료', { exact: true }).waitFor();
    await page.waitForTimeout(300);
    const initialConnections = connections;
    const check = async () => {
      await page.clock.fastForward(11000);
      await page.evaluate(() => document.dispatchEvent(new Event('visibilitychange')));
    };
    sessionError = 'UserInfoUnavailable'; await check();
    await page.getByText('로그인 상태를 확인하지 못했습니다. 연결을 복구하고 있습니다.', { exact: true }).waitFor();
    assert.equal(connections, initialConnections, 'User-info outage must preserve a healthy location socket');
    sessionError = undefined; await check();
    await page.getByText('로그인 상태를 확인하지 못했습니다. 연결을 복구하고 있습니다.', { exact: true }).waitFor({ state: 'detached' });
    assert.equal(connections, initialConnections, 'User-info recovery must preserve a healthy socket');
    sessionError = 'ReauthenticationRequired'; accessToken = ''; await check();
    await page.getByText('로그인이 만료되어 위치를 받을 수 없습니다. 다시 로그인해주세요.', { exact: true }).waitFor();
    await page.waitForTimeout(300);
    const stoppedCalls = calls;
    await page.clock.fastForward(360000);
    await page.evaluate(() => { window.dispatchEvent(new Event('focus')); window.dispatchEvent(new Event('online')); document.dispatchEvent(new Event('visibilitychange')); });
    await page.waitForTimeout(200);
    assert.equal(calls, stoppedCalls, 'Permanent auth failure must stop interval, focus and online checks');
    sessionError = undefined; accessToken = 'renewed-token';
    await page.evaluate(() => window.dispatchEvent(new StorageEvent('storage', { key: 'nextauth.message', newValue: JSON.stringify({ event: 'session', data: { trigger: 'getSession' }, timestamp: Date.now() }) })));
    await page.getByText('로그인이 만료되어 위치를 받을 수 없습니다. 다시 로그인해주세요.', { exact: true }).waitFor({ state: 'detached' });
    await page.getByText('위치 수신 준비 완료', { exact: true }).waitFor();
    assert(connections > initialConnections, 'New authentication must restore the location socket');
    assert.deepEqual(errors, []);
    console.log('PASS transient user-info error/recovery preserves WS, permanent auth stops all automatic checks, renewed authentication restores WS');
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
