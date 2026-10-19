// Browser integration; desktop/party writes are mocked, V3 map reads are real.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { tmpdir } = require("node:os");
const base = process.env.PARTY_TEST_BASE_URL ?? "http://localhost:4000";
(async () => {
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.route("**/api/auth/session", route => route.fulfill({ json: { user: { email: "timer-test@example.invalid" }, userInfo: { email: "timer-test@example.invalid", nickname: "타이머 테스트", is_admin: false }, accessToken: "test-token", expires: "2099-01-01T00:00:00Z" } }));
    const sockets = new Set();
    let cachedState = null, connections = 0;
    await context.routeWebSocket("**/ws?token=*", socket => {
      connections++;
      sockets.add(socket); socket.onClose(() => sockets.delete(socket));
      socket.send(JSON.stringify({ type: "init", notifications: [] }));
      if (cachedState) socket.send(JSON.stringify({ type: "wpf_raid_state", payload: cachedState, event_id: "recovered-state", replayed: true }));
      socket.send(JSON.stringify({ type: "location_connection_status", status: "ready", connection_id: "timer-test" }));
    });
    await context.routeWebSocket("**/api/live-map/v3/chat/ws", socket => socket.onMessage(() => socket.send(JSON.stringify({ type: "snapshot", event_id: crypto.randomUUID(), data: { user: { id: "timer-user", nickname: "타이머 테스트" }, lobby: [], party: [], party_room_id: null, party_invitations: [], moderation: { is_admin: false, restricted: false }, notifications: { party_invitation_count: 0, notification_tab: "party" }, party_invite_preferences: { allow_party_invites: true }, online_users: [], heartbeat_interval_seconds: 30 } }))));
    await context.route("**/api/live-map/v3/party/rooms?*", route => route.fulfill({ json: { status: 200, msg: "OK", data: { rooms: [], total: 0, limit: 20, offset: 0 } } }));
    const page = await context.newPage();
    const errors = []; page.on("pageerror", error => errors.push(error.message));
    await page.clock.install();
    await page.goto(base + "/live-map/woods");
    await page.getByText("위치 수신 준비 완료", { exact: true }).waitFor();
    const form = page.getByRole("form", { name: "BTR 타이머", exact: true });
    await form.waitFor();
    assert.equal(await form.getAttribute("data-btr-timer-source"), "waiting");
    const now = await page.evaluate(() => Date.now());
    const state = { map: "woods", started_at: new Date(now - 60000).toISOString(), is_active: true, transit_count: 0, session_id: "a".repeat(64), timer_observed_at: new Date(now).toISOString(), raid_ends_at: new Date(now + 2100000).toISOString() };
    const send = (value, id = crypto.randomUUID()) => { cachedState = value; for (const socket of sockets) socket.send(JSON.stringify({ type: "wpf_raid_state", payload: value, event_id: id })); };
    const source = async value => { await page.waitForFunction(value => document.querySelector('[data-btr-timer-source]')?.getAttribute('data-btr-timer-source') === value, value); };
    send(state, "timer-first"); await source("auto");
    await page.clock.fastForward(65000);
    let remaining = Number(await form.getAttribute("data-btr-remaining-seconds")); assert(remaining <= 2035 && remaining >= 2033);
    send(state, "timer-repeat"); await page.waitForTimeout(100);
    assert(Number(await form.getAttribute("data-btr-remaining-seconds")) <= remaining, "Same timer must not restart");
    const beforeReconnect = connections;
    for (const socket of [...sockets]) socket.close({ code: 1013 });
    await page.clock.fastForward(1500);
    await page.getByText("위치 수신 준비 완료", { exact: true }).waitFor();
    assert(connections > beforeReconnect);
    assert(Number(await form.getAttribute("data-btr-remaining-seconds")) <= remaining, "Reconnection must preserve the absolute deadline");
    await page.reload();
    await form.waitFor(); await source("auto");
    remaining = Number(await form.getAttribute("data-btr-remaining-seconds"));
    assert(remaining <= 2035 && remaining >= 2028, "Restoration after 60 seconds must not restart at 35 minutes");

    await form.getByRole("textbox", { name: "분", exact: true }).fill("20");
    await form.getByRole("textbox", { name: "초", exact: true }).fill("00");
    await form.getByRole("button", { name: "수동 시작", exact: true }).click(); await source("manual");
    for (const socket of sockets) socket.send(JSON.stringify({ type: "wpf_location", payload: "123 0 -45 0 0 0 1", event_id: "previous-session-location" }));
    await page.locator(".live-map-player-marker").waitFor();

    send({ ...state, session_id: "b".repeat(64), timer_observed_at: null, raid_ends_at: null });
    await page.waitForTimeout(100); await source("manual");
    await page.locator(".live-map-player-marker").waitFor({ state: "detached" });
    assert.equal(await page.getByLabel("자동 레이드 잔여 시간", { exact: true }).count(), 0);
    send({ ...state, session_id: "b".repeat(64) });
    await form.getByRole("button", { name: "프로그램 타이머로 전환", exact: true }).click(); await source("auto");
    send({ ...state, session_id: "c".repeat(64), timer_observed_at: null, raid_ends_at: null }); await source("waiting");
    assert.equal(await page.getByLabel("자동 레이드 잔여 시간", { exact: true }).count(), 0);
    send({ ...state, session_id: "c".repeat(64) }); await source("auto");
    send({ map: "woods", started_at: state.started_at, is_active: true, transit_count: 0 }); await source("waiting");
    send(state); await source("auto");
    for (const theme of ["light", "dark"]) {
      await page.evaluate(theme => { localStorage.setItem("theme", theme); document.documentElement.classList.toggle("dark", theme === "dark"); }, theme);
      await page.waitForTimeout(300);
      await page.screenshot({ path: `${tmpdir()}/desktop-raid-timer-${theme}.png` });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    assert(await page.getByLabel("자동 레이드 잔여 시간", { exact: true }).isVisible());
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    await page.screenshot({ path: `${tmpdir()}/desktop-raid-timer-mobile.png` });
    send({ ...state, is_active: false, timer_observed_at: null, raid_ends_at: null }); await source("waiting");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole("button", { name: "보기 설정", exact: true }).click();
    const mapToggle = page.getByRole("menuitemcheckbox", { name: "지도 자동 전환", exact: true });
    assert.equal(await mapToggle.getAttribute("aria-checked"), "true");
    await mapToggle.click();
    const logMap = async (map, age = 0) => {
      const observed = await page.evaluate(() => Date.now());
      for (const socket of sockets) socket.send(JSON.stringify({ type: "wpf_log_location", event_id: crypto.randomUUID(), payload: { map, x: 123, y: 0, z: -45, observed_at: new Date(observed - age).toISOString() } }));
      await page.waitForTimeout(150);
    };
    await logMap("customs"); assert(page.url().endsWith("/live-map/woods"));
    await page.reload();
    await page.getByRole("button", { name: "보기 설정", exact: true }).click();
    assert.equal(await mapToggle.getAttribute("aria-checked"), "false", "Disabled automatic navigation must persist across reloads");
    await logMap("customs"); assert(page.url().endsWith("/live-map/woods"));
    await mapToggle.click(); await page.waitForURL("**/live-map/customs");
    await logMap("unknown-map"); assert(page.url().endsWith("/live-map/customs"));
    await logMap("woods", 61000); assert(page.url().endsWith("/live-map/customs"));
    await logMap("woods"); await page.waitForURL("**/live-map/woods");
    console.log("PASS log map auto-navigation, toggle persistence, enable current map, stale and unknown map guards");
    assert.deepEqual(errors, []);
    console.log("PASS Woods timer, delayed updates, manual override/return, null/new-session/legacy/end reset, themes and mobile");
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
