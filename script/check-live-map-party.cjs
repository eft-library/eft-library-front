// Requires Playwright and a running local frontend. Party writes are intercepted.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const mapId = "56f40101d2720b2a4d8b45d6";
const baseUrl = process.env.PARTY_TEST_BASE_URL ?? "http://localhost:4000";
const outputDir = process.env.PARTY_TEST_OUTPUT ?? require("node:os").tmpdir();
const now = new Date().toISOString();
const id = "11111111-1111-4111-8111-111111111111";
const owner = {
  id: "22222222-2222-4222-8222-222222222222",
  nickname: "테스터",
  color: "#FF8800",
  role: "owner",
  status: "joined",
  joined_at: now,
};
const other = {
  ...owner,
  id: "33333333-3333-4333-8333-333333333333",
  nickname: "파티원",
  color: "#0088FF",
  role: "member",
};
const room = {
  id,
  name: "테스트 파티",
  map_id: mapId,
  is_locked: false,
  max_members: 5,
  member_count: 2,
  create_time: now,
  update_time: now,
};
const clone = (x) => JSON.parse(JSON.stringify(x));
(async () => {
  const mapData = require("../public/static/live-map/v3/maps/customs.json").data;
  const floorId =
    mapData.floors.find((f) => f.is_main)?.id || mapData.floors[0].id;
  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 1000 },
    });
    let snapshot = {
      room: clone(room),
      me: clone(owner),
      members: [clone(owner), clone(other)],
      markers: [],
    };
    let requests = [],
      conflict = false,
      closed = false,
      rateLimit = false;
    let failDelete = false;
    const sockets = new Set();
    let socketConnections = 0;
    let positions = [];
    let viewMaps = [];
    const commands = [];
    const broadcast = (reason = "changed") => {
      for (const socket of sockets) {
        if (closed) {
          socket.send(
            JSON.stringify({ type: "error", status: 410, msg: "ROOM_CLOSED" }),
          );
          socket.close({ code: 4410 });
          continue;
        }
        socket.send(
          JSON.stringify({
            type: "snapshot",
            event_id: crypto.randomUUID(),
            room_id: id,
            server_time: new Date().toISOString(),
            data: {
              ...snapshot,
              presence: {
                online_member_ids: [snapshot.me.id],
                online_count: 1,
              },
              positions,
              view_maps: viewMaps,
              heartbeat_interval_seconds: 15,
              reconnect_grace_seconds: 90,
              reason,
            },
          }),
        );
      }
    };
    await context.routeWebSocket(
      "**/api/live-map/v3/party/rooms/*/ws",
      (socket) => {
        socketConnections++;
        sockets.add(socket);
        socket.onClose(() => sockets.delete(socket));
        socket.onMessage((raw) => {
          const message = JSON.parse(raw);
          commands.push(message);
          if (message.type === "view_map") {
            const event = {
              type: "view_map",
              event_id: crypto.randomUUID(),
              room_id: id,
              server_time: new Date().toISOString(),
              data: {
                ...message,
                member_id: snapshot.me.id,
                membership_epoch: "current-epoch",
                nickname: snapshot.me.nickname,
                color: snapshot.me.color,
                map: {
                  id: message.map_id,
                  name_ko: "세관",
                  name_en: "Customs",
                  name_ja: "税関",
                },
                floor: {
                  id: message.floor_id,
                  map_id: message.map_id,
                  floor_no: 1,
                  name_ko: "1층",
                  name_en: "Floor 1",
                  name_ja: "1階",
                },
              },
            };
            viewMaps = [event];
            for (const peer of sockets) peer.send(JSON.stringify(event));
            return;
          }

          if (message.type === "ping" || message.type === "position") {
            assert.ok(!("member_id" in message));
            if (message.type === "position")
              assert.ok(!("marker_type" in message) && !("label" in message));
            const { type, ...body } = message;
            const event = {
              type,
              event_id: crypto.randomUUID(),
              room_id: id,
              server_time: new Date().toISOString(),
              data: {
                ...body,
                member_id: snapshot.me.id,
                membership_epoch: "current-epoch",
                nickname: snapshot.me.nickname,
                color: snapshot.me.color,
                expires_at:
                  type === "position" && body.persistent
                    ? null
                    : Date.now() / 1000 + 60,
              },
            };
            if (type === "position") positions = [event];
            for (const ws of sockets) {
              ws.send(JSON.stringify(event));
              ws.send(JSON.stringify(event));
            }
            return;
          }
          if (message.type === "auth")
            assert.equal(message.token, "test-token");
          broadcast(message.type === "auth" ? "connected" : "sync");
        });
      },
    );
    await context.route("**/api/auth/session", (r) =>
      r.fulfill({
        json: {
          user: { name: "테스터", email: "party-test@example.invalid" },
          userInfo: {
            is_admin: true,
            email: "party-test@example.invalid",
            nickname: "테스터",
          },
          accessToken: "test-token",
          expires: "2099-01-01T00:00:00Z",
        },
      }),
    );
    await context.route("**/api/live-map/v3/party/rooms**", async (route) => {
      const req = route.request(),
        url = new URL(req.url()),
        method = req.method(),
        suffix = url.pathname.split("/rooms")[1];
      const body = req.postDataJSON();
      requests.push({ method, suffix, body, query: url.search });
      const ok = (data, status = 200) => {
        if (method !== "GET") broadcast();
        return route.fulfill({ status, json: { status, msg: "OK", data } });
      };
      const fail = (status, msg) =>
        route.fulfill({ status, json: { status, msg, data: null } });
      if (method === "GET" && !suffix) {
        assert.equal(url.searchParams.has("map_id"), false);
        return ok({ rooms: [snapshot.room], total: 1, limit: 20, offset: 0 });
      }
      assert.equal(req.headers().authorization, "Bearer test-token");
      if (closed) return fail(410, "ROOM_CLOSED");
      if (method === "GET") return ok(snapshot);
      if (rateLimit) {
        rateLimit = false;
        return route.fulfill({
          status: 429,
          headers: {
            "Retry-After": "2",
            "Access-Control-Expose-Headers": "Retry-After",
          },
          json: { status: 429, msg: "TOO_MANY_ATTEMPTS", data: null },
        });
      }
      if (method === "POST" && !suffix) {
        assert.equal(body.map_id, mapId);
        assert.equal(body.password, " secret ");
        snapshot.room.name = body.name;
        return ok(snapshot, 201);
      }
      if (suffix.endsWith("/join")) {
        if (body.password !== "secret")
          return fail(403, "INVALID_ROOM_PASSWORD");
        snapshot.me = clone(other);
        return ok(snapshot);
      }
      if (suffix.endsWith("/leave"))
        return ok({ room_id: id, closed: false, owner_member_id: other.id });
      if (suffix.endsWith("/members/me")) {
        Object.assign(snapshot.me, body);
        Object.assign(
          snapshot.members.find((m) => m.id === snapshot.me.id),
          body,
        );
        return ok(snapshot.me);
      }
      if (suffix.endsWith("/owner")) {
        snapshot.members.forEach(
          (m) => (m.role = m.id === body.member_id ? "owner" : "member"),
        );
        snapshot.me = clone(
          snapshot.members.find((m) => m.id === snapshot.me.id),
        );
        return ok(snapshot);
      }
      if (suffix.endsWith("/kick")) {
        snapshot.members.find((m) => suffix.includes(m.id)).status = "kicked";
        snapshot.room.member_count--;
        return ok(snapshot);
      }
      if (suffix.endsWith("/markers") && method === "POST") {
        assert.ok(body.map_id);
        const marker = {
          ...body,
          id: "44444444-4444-4444-8444-444444444444",
          room_id: id,
          created_by_member_id: snapshot.me.id,
          version: 1,
          create_time: now,
          update_time: now,
        };
        snapshot.markers.push(marker);
        return ok(marker, 201);
      }
      if (suffix.includes("/markers/")) {
        const marker = snapshot.markers[0];
        if (conflict) {
          conflict = false;
          marker.version++;
          marker.label = "다른 사람이 수정";
          return fail(409, "MARKER_VERSION_CONFLICT");
        }
        if (method === "PUT") {
          assert.equal(body.version, marker.version);
          Object.assign(marker, body, { version: marker.version + 1 });
          return ok(marker);
        }
        if (method === "DELETE") {
          if (failDelete) {
            failDelete = false;
            return fail(503, "PARTY_DATABASE_UNAVAILABLE");
          }
          assert.equal(Number(url.searchParams.get("version")), marker.version);
          snapshot.markers = snapshot.markers.filter(
            (entry) => entry.id !== marker.id,
          );
          return ok({ id: marker.id });
        }
      }
      if (method === "PATCH") {
        Object.assign(snapshot.room, body);
        return ok({
          ...snapshot,
          room: { ...snapshot.room, name: "REST_STALE_RESPONSE" },
        });
      }
      if (method === "DELETE") {
        closed = true;
        return ok({ id });
      }
      throw new Error("Unhandled " + method + suffix);
    });
    const page = await context.newPage();
    let pageErrors = [];
    page.on("pageerror", (e) => pageErrors.push(e.message));
    page.on("dialog", () => {
      throw new Error("Unexpected native dialog");
    });
    const panel = () => page.getByRole("region", { name: "라이브 맵 파티" });
    await page.goto(`${baseUrl}/live-map/customs`, {
      waitUntil: "domcontentloaded",
      timeout: 60000,
    });
    await page
      .getByRole("button", { name: "파티", exact: true })
      .click({ timeout: 90000 });
    await page.getByRole("button", { name: "방 만들기", exact: true }).click();
    await page.getByLabel("방 이름", { exact: true }).fill("테스트 파티");
    await page.getByLabel("비밀번호", { exact: true }).fill(" secret ");
    await page.getByRole("button", { name: "방 생성", exact: true }).click();
    await page.getByRole("heading", { name: /공유 마커/ }).waitFor();
    assert.equal(await panel().locator("code").textContent(), "••••");
    await panel()
      .getByRole("button", { name: "비밀번호 보기", exact: true })
      .click();
    assert.equal(await panel().locator("code").textContent(), " secret ");
    console.log("PASS create, auth and untrimmed password display");
    await page.getByRole("button", { name: "좌표 입력", exact: true }).click();
    await page
      .getByLabel("마커 설명")
      .fill('<img src=x onerror="window.partyXss=true">');
    await page.getByLabel("X", { exact: true }).fill("125.5");
    await page.getByLabel("Z", { exact: true }).fill("-48.25");
    await page.getByLabel("종류", { exact: true }).selectOption("danger");
    assert.equal(await page.getByLabel("X", { exact: true }).inputValue(), "125.5");
    assert.equal(await page.getByLabel("Z", { exact: true }).inputValue(), "-48.25");
    await page.getByRole("button", { name: "마커 저장" }).click();
    await page.getByRole("heading", { name: "공유 마커 (1/200)" }).waitFor();
    assert.equal(snapshot.markers[0].x, 125.5);
    assert.equal(snapshot.markers[0].z, -48.25);
    assert.equal(snapshot.markers[0].floor_id, floorId);
    assert.equal(snapshot.markers[0].map_id, mapId);
    await page.getByRole("button", { name: "닫기", exact: true }).click();
    await page.locator(".live-map-party-marker").hover();
    await page.locator(".live-map-marker-tooltip").waitFor();
    assert.equal(await page.locator(".live-map-marker-tooltip img").count(), 0);
    assert.equal(await page.evaluate(() => !!window.partyXss), false);
    await page.getByRole("button", { name: "세관 2층", exact: true }).click();
    await page.locator(".live-map-party-marker").waitFor();
    await page.locator(".live-map-party-floor-label").waitFor();
    assert.equal(
      await page.locator(".live-map-party-floor-label").textContent(),
      "1층",
    );
    assert.equal(
      await page
        .locator(".live-map-party-icon-frame")
        .first()
        .evaluate((element) => getComputedStyle(element).opacity),
      "1",
    );
    await page.getByRole("button", { name: "세관 1층", exact: true }).click();
    console.log("PASS marker coordinates/type/floor, safe tooltip");
    await page.reload();
    await page
      .getByRole("button", { name: /^파티 2\/5$/ })
      .waitFor({ timeout: 60000 });
    assert.equal(
      requests.filter((r) => r.method === "POST" && r.suffix.endsWith("/join"))
        .length,
      0,
    );
    await page.getByRole("button", { name: /^파티 2\/5$/ }).click();
    await page.getByRole("button", { name: "수정", exact: true }).click();
    conflict = true;
    await page.getByLabel("마커 설명").fill("내 수정");
    await page.getByRole("button", { name: "마커 저장" }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "다른 참여자가 마커를 변경" })
      .waitFor();
    await page.getByRole("button", { name: "수정", exact: true }).click();
    await page.getByLabel("마커 설명").fill("집결 지점");
    await page.getByRole("button", { name: "마커 저장" }).click();
    assert.equal(snapshot.markers[0].version, 3);
    console.log("PASS refresh restore, conflict recovery, versioned update");
    assert.equal(
      await page
        .getByRole("button", { name: "순간 핑 찍기", exact: true })
        .count(),
      0,
    );
    assert.equal(
      await page
        .getByRole("button", { name: "내 위치 찍기", exact: true })
        .count(),
      0,
    );
    const whereInput = page.locator("main header input").first();
    await whereInput.fill("123 0 -45 0 0 0 1");
    await whereInput.press("Enter");
    await page.waitForFunction(() =>
      document.body.textContent.includes("X 123.0 / Z -45.0"),
    );
    assert.equal(positions[0].data.x, 123);
    assert.equal(positions[0].data.z, -45);
    assert.equal(positions[0].data.yaw, 0);
    assert.equal(positions[0].data.expires_at, null);
    await page
      .locator(".live-map-party-position .player-icon-heading")
      .waitFor();
    await page.getByRole("button", { name: "세관 2층", exact: true }).click();
    await page.locator(".live-map-party-position").waitFor();
    await page
      .locator(".live-map-party-position .live-map-party-floor-label")
      .waitFor();
    assert.equal(
      await page
        .locator(".live-map-party-position .live-map-party-floor-label")
        .textContent(),
      "1층",
    );
    assert.equal(
      await page
        .locator(".live-map-party-position .live-map-party-icon-frame")
        .evaluate((element) => getComputedStyle(element).opacity),
      "1",
    );
    await page.getByRole("button", { name: "세관 1층", exact: true }).click();
    await whereInput.fill(
      "123 0 -45 0 0.7071067811865476 0 0.7071067811865476",
    );
    await whereInput.press("Enter");
    await page.waitForFunction(
      () =>
        document.querySelector(
          ".live-map-party-position .player-location-marker",
        )?.style.transform === "rotate(270deg)",
    );
    assert.ok(Math.abs(positions[0].data.yaw - 90) < 0.001);
    const connectionsBeforeMapSwitch = socketConnections;
    await panel().getByRole("button", { name: "닫기", exact: true }).click();
    await page.getByRole("button", { name: "세관", exact: true }).click();
    await page.getByRole("button", { name: "공장", exact: true }).click();
    await page.waitForURL("**/live-map/factory");
    await page.getByRole("button", { name: /^파티 2\/5$/ }).waitFor();
    for (let attempt = 0; attempt < 50 && snapshot.markers.length; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    assert.equal(snapshot.markers.length, 0);
    assert.equal(socketConnections, connectionsBeforeMapSwitch);
    assert.equal(await page.locator(".live-map-party-position").count(), 0);
    assert.notEqual(
      commands.filter((command) => command.type === "view_map").at(-1).map_id,
      mapId,
    );
    await page.getByRole("button", { name: "공장", exact: true }).click();
    await page.getByRole("button", { name: "세관", exact: true }).click();
    await page.waitForURL("**/live-map/customs");
    await page.locator(".live-map-party-position").waitFor();
    assert.equal(socketConnections, connectionsBeforeMapSwitch);
    await page.getByRole("button", { name: /^파티 2\/5$/ }).click();
    await panel().getByRole("button", { name: "좌표 입력", exact: true }).click();
    await panel().getByLabel("마커 설명").fill("새 지도 마커");
    await panel().getByLabel("X", { exact: true }).fill("125.5");
    await panel().getByLabel("Z", { exact: true }).fill("-48.25");
    await panel().getByRole("button", { name: "마커 저장" }).click();
    await panel().getByRole("heading", { name: "공유 마커 (1/200)" }).waitFor();
    for (const heading of [0, 90, 180, 270]) {
      await page
        .getByRole("button", { name: /지도 시계 방향으로 90도 회전/ })
        .click();
      await page.waitForFunction(
        (heading) =>
          document.querySelector(
            ".live-map-party-position .player-location-marker",
          )?.style.transform === `rotate(${heading}deg)`,
        heading,
      );
    }
    const second = await context.newPage();
    await second.goto(`${baseUrl}/live-map/customs`);
    await second.getByRole("button", { name: /^파티 2\/5$/ }).click();
    await second.getByRole("status", { name: "실시간 연결됨" }).waitFor();
    await second
      .locator(".live-map-party-position .player-icon-heading")
      .waitFor();
    await second.close();
    assert.equal(
      requests.filter((r) => r.method === "GET" && r.suffix === `/${id}`)
        .length,
      0,
    );
    console.log(
      "PASS received position, multi-tab snapshot restore without REST polling",
    );

    for (const theme of ["light", "dark"]) {
      await page.evaluate((theme) => {
        localStorage.setItem("theme", theme);
        document.documentElement.classList.toggle("dark", theme === "dark");
      }, theme);
      await page.screenshot({ path: `${outputDir}/eft-party-${theme}.png` });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `${outputDir}/eft-party-mobile.png` });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
    );
    await page.getByRole("button", { name: "지도에 마커 추가" }).click();
    assert.equal(await panel().count(), 0);
    await page.getByRole("button", { name: "취소", exact: true }).click();
    console.log("PASS themes, mobile bounds and placement panel dismissal");
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole("button", { name: /^파티 2\/5$/ }).click();
    const deleteCount = () =>
      requests.filter((r) => r.method === "DELETE").length;
    const beforeCancel = deleteCount();
    await page.getByRole("button", { name: "삭제", exact: true }).click();
    const dialog = page.getByRole("alertdialog");
    await dialog.waitFor();
    assert.equal(
      await dialog
        .getByRole("button", { name: "취소", exact: true })
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await dialog.evaluate((el) => el.contains(document.activeElement)),
      true,
    );
    for (const theme of ["light", "dark"]) {
      await page.evaluate(
        (theme) =>
          document.documentElement.classList.toggle("dark", theme === "dark"),
        theme,
      );
      // Let button color transitions finish after switching the theme.
      await page.waitForTimeout(250);
      await page.screenshot({
        path: `${outputDir}/eft-party-confirm-${theme}.png`,
      });
    }
    await dialog.getByRole("button", { name: "취소", exact: true }).click();
    assert.equal(deleteCount(), beforeCancel);
    assert.equal(
      await page
        .getByRole("button", { name: "삭제", exact: true })
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.getByRole("button", { name: "삭제", exact: true }).click();
    await page.keyboard.press("Escape");
    await dialog.waitFor({ state: "detached" });
    assert.equal(await panel().isVisible(), true);
    assert.equal(deleteCount(), beforeCancel);
    await page.getByRole("button", { name: "삭제", exact: true }).click();
    failDelete = true;
    await dialog.getByRole("button", { name: "삭제하기", exact: true }).click();
    await dialog.getByRole("alert").waitFor();
    assert.equal(snapshot.markers.length, 1);
    console.log(
      "PASS custom dialog cancellation, Escape, focus restore, inline failure and retry",
    );

    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "삭제하기", exact: true })
      .click();
    await page.getByRole("heading", { name: "공유 마커 (0/200)" }).waitFor();
    await page.getByRole("button", { name: "방 설정", exact: true }).click();
    await page.getByLabel("방 이름", { exact: true }).fill("새 이름");
    await page.getByLabel("신규 입장 잠금").check();
    await page.getByRole("button", { name: "저장", exact: true }).click();
    await page.getByRole("heading", { name: /새 이름/ }).waitFor();
    assert.equal(snapshot.room.is_locked, true);
    await panel()
      .getByText("내 닉네임·색상 변경", { exact: true })
      .click();
    await panel().getByLabel("내 닉네임", { exact: true }).fill("새 닉네임");
    await panel().getByLabel("내 색상", { exact: true }).fill("#aabbcc");
    await panel().getByRole("button", { name: "내 정보 저장" }).click();
    await panel().getByText(/새 닉네임.*온라인.*\(나\)/).waitFor();
    assert.equal(snapshot.me.nickname, "새 닉네임");
    assert.equal(snapshot.me.color, "#aabbcc");
    snapshot.members.push({
      ...other,
      id: "55555555-5555-4555-8555-555555555555",
      nickname: "강퇴 대상",
    });
    snapshot.room.member_count++;
    await page.getByRole("button", { name: "새로고침", exact: true }).click();
    await page.getByRole("button", { name: "강퇴 대상 강퇴" }).click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "강퇴하기", exact: true })
      .click();
    await page
      .getByRole("button", { name: "강퇴 대상 강퇴" })
      .waitFor({ state: "detached" });
    assert.equal(
      snapshot.members.find((m) => m.nickname === "강퇴 대상").status,
      "kicked",
    );
    console.log("PASS member profile and kick");
    await page.getByRole("button", { name: "파티원 방장 양도" }).click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "양도하기", exact: true })
      .click();
    await page
      .getByRole("button", { name: "방 설정", exact: true })
      .waitFor({ state: "detached" });
    console.log("PASS versioned delete, owner settings and transfer");
    await page.getByRole("button", { name: "퇴장", exact: true }).click();
    await page
      .getByRole("alertdialog")
      .getByRole("button", { name: "퇴장하기", exact: true })
      .click();
    await page
      .getByRole("button", { name: "방 만들기", exact: true })
      .waitFor();
    assert.equal(
      await page.evaluate(() =>
        localStorage.getItem(
          "live-map-party:v3:party-test@example.invalid:customs",
        ),
      ),
      null,
    );
    await page.getByRole("button", { name: "입장", exact: true }).click();
    await page.getByLabel("비밀번호", { exact: true }).fill("wrong");
    await page.getByRole("button", { name: "입장", exact: true }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "비밀번호가 맞지 않습니다" })
      .waitFor();
    await page.getByLabel("비밀번호", { exact: true }).fill("secret");
    rateLimit = true;
    await page.getByRole("button", { name: "입장", exact: true }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "요청이 너무 많습니다" })
      .waitFor();
    assert.equal(
      await page
        .getByRole("button", { name: "입장", exact: true })
        .isDisabled(),
      true,
    );
    await page
      .getByRole("button", { name: "입장", exact: true })
      .click({ timeout: 6000 });
    await page.getByRole("heading", { name: /공유 마커/ }).waitFor();
    console.log("PASS leave, wrong password, Retry-After, join");
    closed = true;
    await page.getByRole("button", { name: "새로고침", exact: true }).click();
    await page
      .getByRole("alert")
      .filter({ hasText: "파티가 종료되었습니다" })
      .waitFor();
    await page
      .getByRole("button", { name: "방 만들기", exact: true })
      .waitFor();
    console.log("PASS remote room closure");
    assert.deepEqual(pageErrors, []);
    console.log(
      "ALL PASSED",
      requests.length,
      "party requests, zero browser errors",
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
