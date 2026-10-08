// Requires Playwright and a local frontend. All party/chat writes and sockets use contract fixtures.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const { tmpdir } = require("node:os");
const { join } = require("node:path");
const base = process.env.PARTY_TEST_BASE_URL ?? "http://localhost:4000";
const now = new Date().toISOString();
const roomId = "11111111-1111-4111-8111-111111111111";
const memberId = "22222222-2222-4222-8222-222222222222";
const kickedId = "33333333-3333-4333-8333-333333333333";
const me = {
  id: "44444444-4444-4444-8444-444444444444",
  nickname: "방장테스트",
};
const other = {
  id: "55555555-5555-4555-8555-555555555555",
  nickname: "강퇴테스터",
};
const mapId = "56f40101d2720b2a4d8b45d6";
const room = {
  id: roomId,
  name: "연동 테스트 파티",
  map_id: mapId,
  is_locked: false,
  max_members: 5,
  member_count: 1,
  create_time: now,
  update_time: now,
};
const member = {
  id: memberId,
  nickname: me.nickname,
  color: "#FF8800",
  role: "owner",
  status: "joined",
  joined_at: now,
};
const kicked = {
  ...member,
  id: kickedId,
  nickname: other.nickname,
  role: "member",
  status: "kicked",
};
const snapshot = { room, me: member, members: [member, kicked], markers: [] };
const message = {
  id: "66666666-6666-4666-8666-666666666666",
  channel: "lobby",
  room_id: null,
  user: other,
  message: "같이 플레이해요",
  create_time: now,
};
const invitation = {
  id: "77777777-7777-4777-8777-777777777777",
  invitation_id: "77777777-7777-4777-8777-777777777777",
  room_id: roomId,
  inviter: other,
  invitee_user_id: me.id,
  status: "pending",
  status_reason: null,
  notification_tab: "party",
  expires_at: new Date(Date.now() + 600000).toISOString(),
  party: { ...room, closed: false, can_join: true },
};
(async () => {
  const browser = await chromium.launch();
  try {
    for (const admin of [null, false, true]) {
      const context = await browser.newContext({
        viewport: { width: 1280, height: 900 },
      });
      context.setDefaultTimeout(10000);
      let moderation = {
        is_admin: admin === true,
        restricted: false,
        reason: null,
        expires_at: null,
      };
      let notifications = {
        party_invitation_count: 1,
        notification_tab: "party",
      };
      let banned = false,
        block = false,
        unkick = false,
        chatConnections = 0;
      const requests = [],
        chatSockets = new Set(),
        partySockets = new Set();
      const frame = (type, data) =>
        JSON.stringify({
          type,
          room_id: roomId,
          event_id: crypto.randomUUID(),
          server_time: now,
          data,
        });
      const chatSnapshot = () => ({
        user: admin === null ? null : me,
        lobby: [message],
        party: admin === null ? [] : [{ ...message, channel: "party", room_id: roomId }],
        party_room_id: admin === null ? null : roomId,
        lobby_next_before: null,
        party_next_before: null,
        party_invitations: [
          invitation,
          {
            ...invitation,
            id: "outgoing",
            invitation_id: "outgoing",
            invitee_user_id: other.id,
            inviter: me,
          },
        ],
        heartbeat_interval_seconds: 30,
        moderation,
        notifications,
      });
      const partySnapshot = () => ({
        ...snapshot,
        presence: { online_member_ids: [memberId], online_count: 1 },
        positions: [],
        view_maps: [],
        heartbeat_interval_seconds: 15,
        reconnect_grace_seconds: 90,
        reason: "connected",
      });
      await context.route("**/api/auth/session", (r) =>
        r.fulfill({
          json:
            admin === null
              ? {}
              : {
                  user: { email: "controls@example.invalid" },
                  userInfo: {
                    email: "controls@example.invalid",
                    is_admin: admin,
                  },
                  accessToken: "test-token",
                  expires: "2099-01-01T00:00:00Z",
                },
        }),
      );
      await context.addInitScript(
        (id) =>
          localStorage.setItem(
            "live-map-party:v3:controls@example.invalid",
            id,
          ),
        roomId,
      );
      await context.routeWebSocket("**/api/live-map/v3/chat/ws", (s) => {
        chatConnections++;
        chatSockets.add(s);
        s.onClose(() => chatSockets.delete(s));
        s.onMessage((raw) => {
          if (["auth", "guest", "heartbeat"].includes(JSON.parse(raw).type))
            s.send(frame("snapshot", chatSnapshot()));
        });
      });
      await context.routeWebSocket(
        "**/api/live-map/v3/party/rooms/*/ws",
        (s) => {
          partySockets.add(s);
          s.onClose(() => partySockets.delete(s));
          s.onMessage((raw) => {
            if (["auth", "guest", "heartbeat"].includes(JSON.parse(raw).type))
              s.send(frame("snapshot", partySnapshot()));
          });
        },
      );
      await context.route("**/api/live-map/v3/**", async (r) => {
        const req = r.request(),
          url = new URL(req.url()),
          path = url.pathname.replace("/api/live-map/v3", ""),
          method = req.method();
        if (!path.startsWith("/chat") && !path.startsWith("/party"))
          return r.continue();
        const body = req.postDataJSON();
        requests.push({ path, method, body, query: url.search });
        const ok = (data) =>
          r.fulfill({ json: { status: 200, msg: "OK", data } });
        if (path === "/chat/me/moderation") return ok(moderation);
        if (path === "/party-invitations/notifications")
          return ok(notifications);
        if (path === "/chat/messages")
          return ok({
            messages: [{ ...message, channel: "party", room_id: roomId }],
            next_before: null,
          });
        if (path.endsWith("/actions"))
          return ok({
            user: other,
            blocked: block,
            can_block: true,
            can_restrict: admin === true,
            can_invite: !!url.searchParams.get("room_id") && unkick,
            invite_disabled_reason: unkick ? null : "PARTY_MEMBER_KICKED",
            member_id: kickedId,
            can_unkick: !!url.searchParams.get("room_id") && !unkick,
          });
        if (path === "/chat/admin/restrictions")
          return ok(
            banned
              ? [
                  {
                    user: other,
                    reason: "도배",
                    expires_at: null,
                    create_time: now,
                  },
                ]
              : [],
          );
        if (path.startsWith("/chat/admin/restrictions/")) {
          assert.equal(path.split("/").at(-1), other.id);
          banned = method === "PUT";
          return ok({ user_id: other.id, restricted: banned });
        }
        if (path.startsWith("/chat/blocks")) {
          block = method === "POST";
          return ok({ user_id: other.id, blocked: block });
        }
        if (path === "/party-invitations" && method === "POST") {
          assert.equal(body.invitee_user_id, other.id);
          assert(unkick);
          return ok({ ...invitation, invitee_user_id: other.id, inviter: me });
        }
        if (path.endsWith("/reject")) {
          notifications = { ...notifications, party_invitation_count: 0 };
          return ok({ ...invitation, status: "rejected" });
        }
        if (path === "/party/rooms")
          return ok({ rooms: [room], total: 1, limit: 20, offset: 0 });
        if (path.endsWith("/kick") && method === "DELETE") {
          assert.equal(path.split("/").at(-2), kickedId);
          unkick = true;
          kicked.status = "left";
          for (const s of partySockets)
            s.send(frame("snapshot", partySnapshot()));
          return ok(snapshot);
        }
        if (path.startsWith("/party/rooms/")) return ok(snapshot);
        throw Error("Unexpected mock request " + method + " " + path);
      });
      const page = await context.newPage();
      const errors = [];
      page.on("pageerror", (e) => {
        if (e.message !== "W") errors.push(e.message);
      });
      await page.goto(base + "/live-map/customs");
      await page
        .getByRole("button", { name: "파티", exact: false })
        .first()
        .waitFor();
      if (admin !== true) {
        await page.getByRole("button", { name: "모집 채팅", exact: true }).click();
        await page.getByText(message.message, { exact: true }).waitFor();
        assert.equal(chatConnections, 1);
        assert.equal(await page.getByRole("button", { name: "채팅 밴 관리", exact: true }).count(), 0);
        if (admin === null) {
          await page.getByText("메시지를 보내려면 로그인해 주세요.", { exact: true }).waitFor();
          assert.equal(await page.getByRole("textbox", { name: "메시지", exact: true }).count(), 0);
        } else {
          await page.getByRole("button", { name: other.nickname + " 사용자 메뉴", exact: true }).click();
          await page.getByRole("button", { name: "차단", exact: true }).waitFor();
          assert.equal(await page.getByRole("button", { name: "채팅 밴", exact: true }).count(), 0);
          assert.equal(await page.getByRole("button", { name: "밴 해제", exact: true }).count(), 0);
          assert.equal(await page.getByRole("textbox", { name: "메시지", exact: true }).isDisabled(), false);
          await page.keyboard.press("Escape");
          await page.getByRole("button", { name: "파티", exact: false }).first().click();
          await page.getByRole("textbox", { name: "파티 메시지", exact: true }).waitFor();
          assert.equal(await page.getByRole("textbox", { name: "파티 메시지", exact: true }).isDisabled(), false);
        }
        assert(!requests.some(r => r.path.startsWith("/chat/admin/")));
        console.log("PASS public chat, admin controls hidden", admin === null ? "anonymous" : "regular");
        await context.close();
        continue;
      }
      const partyButton = page
        .getByRole("button", { name: "파티", exact: false })
        .first();
      await page.getByLabel("받은 파티 초대 1개", { exact: true }).waitFor();
      assert.equal(
        await page.getByLabel("받은 파티 초대 2개", { exact: true }).count(),
        0,
      );
      await page
        .getByRole("button", { name: "모집 채팅", exact: true })
        .click();
      const messageBefore = await page
        .getByText(message.message, { exact: true })
        .boundingBox();
      await page
        .getByRole("button", {
          name: other.nickname + " 사용자 메뉴",
          exact: true,
        })
        .click();
      const messageAfter = await page
        .getByText(message.message, { exact: true })
        .boundingBox();
      assert.equal(
        messageAfter.y,
        messageBefore.y,
        "Opening a user menu must not move messages",
      );
      await page
        .getByRole("button", { name: "강퇴 해제", exact: true })
        .waitFor();
      assert(
        await page
          .getByRole("button", { name: "파티 초대", exact: true })
          .isDisabled(),
      );
      const indicator = page.getByRole("status", {
        name: "연결됨",
        exact: true,
      });
      for (const theme of ["light", "dark"]) {
        await page.evaluate(
          (t) =>
            document.documentElement.classList.toggle("dark", t === "dark"),
          theme,
        );
        await page.waitForTimeout(300);
        await page.setViewportSize({ width: 1280, height: 900 });
        await page.screenshot({
          path: join(tmpdir(), `chat-controls-${theme}-desktop.png`),
        });
        await page.setViewportSize({ width: 390, height: 844 });
        assert(
          await indicator.evaluate((e) => {
            const r = e.getBoundingClientRect();
            return e.contains(
              document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2),
            );
          }),
          "Connection status must be visible above map controls",
        );
        await page.screenshot({
          path: join(tmpdir(), `chat-controls-${theme}-mobile.png`),
        });
        assert(
          await page
            .locator("main")
            .evaluate((e) => e.getBoundingClientRect().right <= innerWidth + 1),
        );
      }
      await page
        .getByRole("button", { name: "강퇴 해제", exact: true })
        .click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "확인", exact: true })
        .click();
      await page
        .getByText("강퇴를 해제했습니다. 새 초대를 보낼 수 있습니다.", {
          exact: true,
        })
        .waitFor();
      await page
        .getByRole("button", {
          name: other.nickname + " 사용자 메뉴",
          exact: true,
        })
        .click();
      await page
        .getByRole("button", { name: "파티 초대", exact: true })
        .click();
      await page
        .getByText("파티 초대를 보냈습니다.", { exact: true })
        .waitFor();
      await page.getByRole("button", { name: "채팅 밴", exact: true }).waitFor();
      assert.equal(await page.getByRole("button", { name: "밴 해제", exact: true }).count(), 0);
      await page.getByRole("button", { name: "채팅 밴", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByLabel("사유", { exact: true })
        .fill("도배");
      await page
        .getByRole("dialog")
        .getByLabel("기간", { exact: true })
        .selectOption("permanent");
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "확인", exact: true })
        .click();
      await page
        .getByText("채팅 밴을 적용했습니다.", { exact: true })
        .waitFor();
      assert(banned);
      assert.equal(
        requests.find(
          (x) => x.method === "PUT" && x.path.includes("restrictions/"),
        ).body.expires_at,
        null,
      );
      await page
        .getByRole("button", { name: "채팅 밴 관리", exact: true })
        .click();
      const panel = page.getByRole("region", { name: "채팅 밴 관리" });
      await panel.getByText("도배", { exact: true }).waitFor();
      await panel
        .getByRole("button", {
          name: other.nickname + " 사용자 메뉴",
          exact: true,
        })
        .click();
      await page.getByRole("button", { name: "밴 해제", exact: true }).waitFor();
      assert.equal(await page.getByRole("button", { name: "채팅 밴", exact: true }).count(), 0);
      await page.getByRole("button", { name: "밴 해제", exact: true }).click();
      await page
        .getByRole("dialog")
        .getByRole("button", { name: "확인", exact: true })
        .click();
      await panel
        .getByText("현재 밴된 사용자가 없습니다.", { exact: true })
        .waitFor();
      assert(!banned);
      await panel.getByRole("button", { name: "닫기", exact: true }).click();
      moderation = { ...moderation, restricted: true, reason: "테스트 제한" };
      for (const s of chatSockets)
        s.send(frame("chat_moderation_updated", moderation));
      await page
        .getByText("채팅 전송이 제한되었습니다. 메시지 읽기는 가능합니다.", {
          exact: true,
        })
        .waitFor();
      assert(
        await page
          .getByRole("textbox", { name: "메시지", exact: true })
          .isDisabled(),
      );
      await partyButton.click();
      await page
        .getByRole("textbox", { name: "파티 메시지", exact: true })
        .waitFor();
      assert(
        await page
          .getByRole("textbox", { name: "파티 메시지", exact: true })
          .isDisabled(),
      );
      moderation = { ...moderation, restricted: false, reason: null };
      for (const s of chatSockets)
        s.send(frame("chat_moderation_updated", moderation));
      await page.waitForFunction(
        () =>
          !document.querySelector('textarea[aria-label="파티 메시지"]')
            .disabled,
      );
      notifications = { ...notifications, party_invitation_count: 0 };
      for (const s of chatSockets)
        s.send(frame("party_notifications_updated", notifications));
      await page
        .getByLabel("받은 파티 초대 1개", { exact: true })
        .waitFor({ state: "detached" });
      assert.deepEqual(errors, []);
      console.log(
        "PASS admin actions, ban/unban, kick/reinvite, badge, moderation events, themes and mobile",
      );
      await context.close();
    }
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
