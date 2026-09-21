// Requires Playwright. Uses live V3 map reads and intercepted party writes.
const baseUrl = process.env.PARTY_TEST_BASE_URL ?? "http://localhost:4000";
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
(async () => {
  const b = await chromium.launch();
  try {
    for (const map of ["customs", "factory", "the-lab"]) {
      const mapData = await (
        await fetch(`https://back.eftlibrary.com/api/live-map/v3/detail/${map}`)
      ).json();
      const detail = await (
        await fetch(`https://back.eftlibrary.com/api/map/v3/detail/${map}`)
      ).json();
      const roomId = "11111111-1111-4111-8111-111111111111";
      const me = {
        id: "22222222-2222-4222-8222-222222222222",
        nickname: "좌표 테스트",
        color: "#FF8800",
        role: "owner",
        status: "joined",
        joined_at: new Date().toISOString(),
      };
      let snap = {
        room: {
          id: roomId,
          map_id: detail.data.map.id,
          name: "좌표 테스트",
          is_locked: false,
          max_members: 5,
          member_count: 1,
          create_time: me.joined_at,
          update_time: me.joined_at,
        },
        me,
        members: [me],
        markers: [],
      };
      const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
      p.on("pageerror", (e) => {
        throw e;
      });
      await p.addInitScript(
        ({ map, roomId, data }) => {
          localStorage.setItem(
            `live-map-party:v3:coordinates@example.invalid:${map}`,
            roomId,
          );
          localStorage.setItem(
            `eft-library-live-map-filters-v1:${map}`,
            JSON.stringify({
              disabledStaticIds: data.static_points.map((x) => x.id),
            }),
          );
        },
        { map, roomId, data: mapData.data },
      );
      let socket;
      const broadcast = () =>
        socket?.send(
          JSON.stringify({
            type: "snapshot",
            event_id: crypto.randomUUID(),
            room_id: roomId,
            server_time: new Date().toISOString(),
            data: {
              ...snap,
              presence: { online_member_ids: [me.id], online_count: 1 },
              positions: [],
              heartbeat_interval_seconds: 15,
              reconnect_grace_seconds: 90,
              reason: "sync",
            },
          }),
        );
      await p.routeWebSocket("**/api/live-map/v3/party/rooms/*/ws", (ws) => {
        socket = ws;
        ws.onMessage(() => broadcast());
      });
      await p.route("**/api/auth/session", (r) =>
        r.fulfill({
          json: {
            user: { email: "coordinates@example.invalid" },
            userInfo: { is_admin: true, email: "coordinates@example.invalid" },
            accessToken: "test",
            expires: "2099-01-01T00:00:00Z",
          },
        }),
      );
      await p.route("**/api/live-map/v3/party/rooms**", (r) => {
        if (r.request().method() === "POST") {
          const marker = {
            ...r.request().postDataJSON(),
            id: crypto.randomUUID(),
            room_id: roomId,
            created_by_member_id: me.id,
            version: 1,
            create_time: me.joined_at,
            update_time: me.joined_at,
          };
          snap.markers = [marker];
          broadcast();
          return r.fulfill({
            status: 201,
            json: { status: 201, msg: "OK", data: marker },
          });
        }
        return r.fulfill({ json: { status: 200, msg: "OK", data: snap } });
      });
      await p.goto(`${baseUrl}/live-map/${map}`);
      await p
        .getByRole("button", { name: /^파티 1\/5$/ })
        .waitFor({ timeout: 90000 });
      for (const rotation of [0, 90, 180, 270]) {
        if (rotation) {
          await p
            .getByRole("button", { name: /지도 시계 방향으로 90도 회전/ })
            .click();
          await p.waitForTimeout(500);
        }
        await p.getByRole("button", { name: /^파티 1\/5$/ }).click();
        await p.getByRole("button", { name: "지도에 마커 추가" }).click();
        const box = await p.locator(".leaflet-container").boundingBox();
        const x = box.x + box.width * 0.52,
          y = box.y + 100;
        await p.mouse.click(x, y);
        await p.getByLabel("마커 설명").waitFor();
        await p.getByLabel("마커 설명").fill(`rotation-${rotation}`);
        await p.getByRole("button", { name: "마커 저장" }).click();
        await p.getByRole("button", { name: "수정", exact: true }).waitFor();
        await p.getByRole("button", { name: "닫기", exact: true }).click();
        const marker = p.locator(".live-map-party-marker");
        await marker.waitFor();
        const bounds = await marker.boundingBox();
        assert.ok(
          Math.abs(bounds.x + bounds.width / 2 - x) < 3,
          `${map}/${rotation} x mismatch ${JSON.stringify(bounds)} vs ${x}`,
        );
        assert.ok(
          Math.abs(bounds.y + bounds.height / 2 - y) < 3,
          `${map}/${rotation} y mismatch`,
        );
        assert.ok(
          Number.isFinite(snap.markers[0].x) &&
            Number.isFinite(snap.markers[0].z),
        );
        console.log("PASS click-to-marker roundtrip", map, rotation);
      }
      await p.close();
    }
  } finally {
    await b.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
