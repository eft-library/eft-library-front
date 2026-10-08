"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Ban,
  ChevronDown,
  ShieldCheck,
  UserPlus,
  UserRoundX,
  ShieldAlert,
} from "lucide-react";
import type { LiveMapChatUserV3 } from "@/types/api/live-map-chat";
import { partyText, type PartyLocale } from "../party/copy";
import { partyButton } from "../party/party-forms";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { LiveMapPartyController } from "../party/use-live-map-party";
import { chatErrorText } from "./copy";
import { LiveMapChatApiError } from "./api";
import { useLiveMapChat } from "./use-live-map-chat";

export function ChatUserMenu({
  user,
  locale,
  interactive,
  party,
  onReport,
  onChanged,
}: {
  user: LiveMapChatUserV3;
  locale: PartyLocale;
  interactive: boolean;
  party?: LiveMapPartyController;
  onReport?: () => void;
  onChanged?: () => void;
}) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<"ban" | "unban" | "unkick" | null>(null);
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState("60");
  const [notice, setNotice] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, maxHeight: 320 });
  const dialogRef = useRef<HTMLDialogElement>(null);
  const menuId = useId();
  const titleId = useId();

  const roomId =
    party?.snapshot?.me.role === "owner"
      ? (party.roomId ?? undefined)
      : undefined;
  const actionsQuery = useQuery({
    queryKey: ["chat-user-actions", chat.me?.id, user.id, roomId],
    queryFn: () => chat.getUserActions(user.id, roomId),
    enabled: open && interactive && chat.enabled,
    staleTime: 0,
  });
  const actions = actionsQuery.data;
  const queryClient = useQueryClient();
  const restrictionQuery = useQuery({
    queryKey: ["chat-user-restriction", chat.me?.id, user.id],
    queryFn: async ({ signal }) => {
      for (let offset = 0; offset <= 10000; offset += 50) {
        const entries = await chat.getRestrictions(offset, signal);
        const restriction = entries.find((entry) => entry.user.id === user.id);
        if (restriction) return restriction;
        if (entries.length < 50) return null;
      }
      throw new Error("CHAT_RESTRICTION_LOOKUP_LIMIT");
    },
    enabled: open && interactive && actions?.can_restrict === true && chat.canModerate,
    staleTime: 0,
    refetchInterval: open ? 30000 : false,
  });
  const [pending, setPending] = useState(false);
  const [menuError, setMenuError] = useState<Error | null>(null);

  async function runMenu(operation: () => Promise<unknown>, success: string) {
    setPending(true);
    setMenuError(null);
    try {
      await operation();
      setNotice(success);
      await actionsQuery.refetch();
      onChanged?.();
    } catch (error) {
      setMenuError(
        error instanceof Error ? error : new Error("CHAT_UNAVAILABLE"),
      );
    } finally {
      setPending(false);
    }
  }

  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (
        !rootRef.current?.contains(event.target as Node) &&
        !menuRef.current?.contains(event.target as Node)
      )
        setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);

  useLayoutEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const anchor = buttonRef.current;
    if (!menu || !anchor) return;
    function reposition() {
      if (!menu || !anchor) return;
      const rect = anchor.getBoundingClientRect();
      const margin = 12;
      const gap = 6;
      const below = window.innerHeight - rect.bottom - margin - gap;
      const above = rect.top - margin - gap;
      const height = Math.min(
        menu.scrollHeight,
        window.innerHeight - margin * 2,
      );
      const placeBelow = below >= height || below >= above;
      const maxHeight = Math.max(80, placeBelow ? below : above);
      const left = Math.max(
        margin,
        Math.min(rect.left, window.innerWidth - menu.offsetWidth - margin),
      );
      const top = placeBelow
        ? rect.bottom + gap
        : Math.max(margin, rect.top - gap - Math.min(height, maxHeight));
      setPosition({ top, left, maxHeight });
    }
    reposition();
    const observer = new ResizeObserver(reposition);
    observer.observe(menu);
    window.addEventListener("resize", reposition);
    window.addEventListener("scroll", reposition, true);
    menu.focus({ preventScroll: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", reposition);
      window.removeEventListener("scroll", reposition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!action) return;
    const button = buttonRef.current;
    dialogRef.current?.showModal();
    return () => button?.focus();
  }, [action]);

  function begin(next: "ban" | "unban" | "unkick") {
    setOpen(false);
    setFailed(false);
    setAction(next);
    setReason("");
  }

  async function confirm() {
    setPending(true);
    try {
      if (action === "ban") {
        const expiresAt =
          duration === "permanent"
            ? null
            : new Date(Date.now() + Number(duration) * 60000).toISOString();
        await chat.restrictUser(user.id, reason.trim(), expiresAt);
        setNotice(
          t(
            "채팅 밴을 적용했습니다.",
            "Chat ban applied.",
            "チャット禁止を適用しました。",
          ),
        );
      } else if (action === "unkick") {
        if (!party || !roomId || !actions?.member_id)
          throw new Error("PARTY_OWNER_REQUIRED");
        const success = await party.run(
          `/${roomId}/members/${actions.member_id}/kick`,
          "DELETE",
        );
        if (!success) throw new Error("PARTY_UNKICK_FAILED");
        setNotice(
          t(
            "강퇴를 해제했습니다. 새 초대를 보낼 수 있습니다.",
            "Kick removed. You can send a new invitation.",
            "処分を解除しました。再招待できます。",
          ),
        );
      } else {
        await chat.unrestrictUser(user.id);
        setNotice(
          t(
            "채팅 밴을 해제했습니다.",
            "Chat ban removed.",
            "チャット禁止を解除しました。",
          ),
        );
      }
      setAction(null);
      if (action === "ban" || action === "unban") {
        await restrictionQuery.refetch();
        await queryClient.invalidateQueries({ queryKey: ["chat-restrictions"] });
      }
      await actionsQuery.refetch();
      onChanged?.();
    } catch {
      setFailed(true);
    } finally {
      setPending(false);
    }
  }

  return (
    <div ref={rootRef} className="min-w-0">
      <button
        ref={buttonRef}
        type="button"
        disabled={!interactive}
        aria-haspopup={interactive ? "dialog" : undefined}
        aria-expanded={interactive ? open : undefined}
        aria-controls={interactive ? menuId : undefined}
        aria-label={
          interactive
            ? `${user.nickname} ${t("사용자 메뉴", "user actions", "ユーザーメニュー")}`
            : user.nickname
        }
        onClick={() => {
          setOpen(!open);
          setNotice(null);
          setMenuError(null);
        }}
        className="inline-flex max-w-full items-center gap-1 rounded-md border border-transparent px-1.5 py-0.5 text-xs font-bold text-gray-700 transition enabled:border-orange-200 enabled:bg-orange-50 enabled:text-orange-800 enabled:hover:border-orange-400 enabled:hover:bg-orange-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:text-gray-200 dark:enabled:border-orange-800 dark:enabled:bg-orange-950/50 dark:enabled:text-orange-200 dark:enabled:hover:bg-orange-900/50"
      >
        <span className="max-w-40 truncate" title={user.nickname}>
          {user.nickname}
        </span>
        {interactive && (
          <ChevronDown aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
        )}
      </button>
      {open &&
        interactive &&
        createPortal(
          <div
            ref={menuRef}
            id={menuId}
            role="dialog"
            aria-label={`${user.nickname} ${t("사용자 메뉴", "user actions", "ユーザーメニュー")}`}
            tabIndex={-1}
            style={position}
            className="fixed z-[2500] flex w-72 max-w-[calc(100vw-1.5rem)] flex-wrap gap-2 overflow-y-auto rounded-lg border border-orange-300 bg-white p-3 text-gray-900 shadow-xl outline-none dark:border-orange-700 dark:bg-[#25282c] dark:text-gray-100"
          >
            <p className="w-full text-xs font-semibold text-gray-700 dark:text-gray-200">
              {user.nickname}
            </p>
            {actionsQuery.isPending && (
              <p role="status" className="text-xs">
                {t("불러오는 중…", "Loading…", "読み込み中…")}
              </p>
            )}
            {(actionsQuery.isError || menuError) && (
              <p
                role="alert"
                className="w-full text-xs text-red-700 dark:text-red-300"
              >
                {chatErrorText(menuError ?? actionsQuery.error, locale)}
                <button
                  type="button"
                  onClick={() => void actionsQuery.refetch()}
                  className="ml-2 underline"
                >
                  {t("다시 시도", "Retry", "再試行")}
                </button>
              </p>
            )}
            {actions && (
              <>
                {roomId && (
                  <>
                    <button
                      type="button"
                      disabled={!actions.can_invite || pending || chat.busy}
                      onClick={() =>
                        void runMenu(
                          () => chat.invite(roomId, user.id),
                          t(
                            "파티 초대를 보냈습니다.",
                            "Party invitation sent.",
                            "パーティーに招待しました。",
                          ),
                        )
                      }
                      className={partyButton}
                    >
                      <UserPlus className="h-3.5 w-3.5" />
                      {t("파티 초대", "Invite to party", "パーティー招待")}
                    </button>
                    {!actions.can_invite && actions.invite_disabled_reason && (
                      <p className="w-full text-xs text-gray-600 dark:text-gray-300">
                        {chatErrorText(
                          new LiveMapChatApiError(
                            403,
                            actions.invite_disabled_reason,
                          ),
                          locale,
                        )}
                      </p>
                    )}
                    {actions.can_unkick && actions.member_id && (
                      <button
                        type="button"
                        disabled={pending || party?.busy}
                        onClick={() => begin("unkick")}
                        className={partyButton}
                      >
                        {t("강퇴 해제", "Remove kick", "退出処分を解除")}
                      </button>
                    )}
                  </>
                )}
                {actions.can_block && (
                  <button
                    type="button"
                    disabled={pending || chat.busy}
                    onClick={() =>
                      void runMenu(
                        () =>
                          actions.blocked
                            ? chat.unblockUser(user.id)
                            : chat.blockUser(user.id),
                        t(
                          "차단 설정을 변경했습니다.",
                          "Block settings updated.",
                          "ブロック設定を変更しました。",
                        ),
                      )
                    }
                    className={partyButton}
                  >
                    <UserRoundX className="h-3.5 w-3.5" />
                    {actions.blocked
                      ? t("차단 해제", "Unblock", "ブロック解除")
                      : t("차단", "Block", "ブロック")}
                  </button>
                )}
                {onReport && (
                  <button
                    type="button"
                    disabled={pending || chat.busy}
                    onClick={() => {
                      setOpen(false);
                      onReport();
                    }}
                    className={partyButton}
                  >
                    <ShieldAlert className="h-3.5 w-3.5" />
                    {t("신고", "Report", "通報")}
                  </button>
                )}
              </>
            )}
            {actions?.can_restrict && chat.canModerate && (
              restrictionQuery.isPending || restrictionQuery.isFetching ? (
                <p role="status" className="w-full text-xs text-gray-600 dark:text-gray-300">{t("밴 상태 확인 중…", "Checking ban status…", "禁止状態を確認中…")}</p>
              ) : restrictionQuery.isError ? (
                <p role="alert" className="w-full text-xs text-red-700 dark:text-red-300">{t("밴 상태를 확인하지 못했습니다.", "Could not check ban status.", "禁止状態を確認できませんでした。")}
                  <button type="button" onClick={() => void restrictionQuery.refetch()} className="ml-2 underline">{t("다시 시도", "Retry", "再試行")}</button>
                </p>
              ) : restrictionQuery.data ? (
                <button type="button" disabled={chat.busy || pending} onClick={() => begin("unban")} className={partyButton}><ShieldCheck className="h-3.5 w-3.5" />{t("밴 해제", "Remove ban", "禁止解除")}</button>
              ) : (
                <button type="button" disabled={chat.busy || pending} onClick={() => begin("ban")} className={`${partyButton} !text-red-700 dark:!text-red-300`}><Ban className="h-3.5 w-3.5" />{t("채팅 밴", "Ban from chat", "チャット禁止")}</button>
              )
            )}
          </div>,
          document.body,
        )}
      {notice &&
        createPortal(
          <p
            role="status"
            className="fixed bottom-5 right-5 z-[2500] max-w-[calc(100vw-2.5rem)] rounded-lg border border-emerald-300 bg-white p-3 text-xs text-emerald-700 shadow-lg dark:border-emerald-700 dark:bg-[#25282c] dark:text-emerald-300"
          >
            {notice}
          </p>,
          document.body,
        )}
      {action &&
        createPortal(
          <dialog
            ref={dialogRef}
            aria-labelledby={titleId}
            onCancel={(event) => {
              event.preventDefault();
              if (!chat.busy && !pending) setAction(null);
            }}
            className="fixed inset-0 m-auto w-[min(24rem,calc(100vw-2rem))] rounded-xl border border-gray-300 bg-white p-5 text-gray-900 shadow-xl backdrop:bg-black/50 dark:border-gray-600 dark:bg-[#1f2124] dark:text-gray-100"
          >
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (!chat.busy && !pending) void confirm();
              }}
              className="space-y-4"
            >
              <h3 id={titleId} className="font-bold">
                {user.nickname} ·{" "}
                {action === "ban"
                  ? t("채팅 밴", "Chat ban", "チャット禁止")
                  : action === "unkick"
                    ? t("강퇴 해제", "Remove kick", "退出処分を解除")
                    : t("밴 해제", "Remove ban", "禁止解除")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {action === "unkick"
                  ? t(
                      "강퇴를 해제하면 재초대와 비밀번호 입장이 가능합니다. 자동으로 참가하지는 않습니다.",
                      "Removing a kick allows a new invitation or joining with the password. It does not automatically rejoin the player.",
                      "解除後は再招待やパスワードでの参加が可能です。自動では再参加しません。",
                    )
                  : action === "unban" ? t("채팅 밴을 해제하면 모집·파티 채팅에 다시 메시지를 보낼 수 있습니다.", "Removing the ban allows sending messages in recruitment and party chat again.", "禁止を解除すると募集・パーティーチャットで再び送信できます。") : t(
                      "모집·파티 채팅의 메시지 전송을 제한합니다. 파티 참가와 읽기는 유지됩니다.",
                      "This limits sending in recruitment and party chat. Joining parties and reading remain available.",
                      "募集・パーティーチャットの送信を制限します。参加と閲覧は引き続き可能です。",
                    )}
              </p>
              {action === "ban" && (
                <>
                  <label className="block text-sm">
                    {t("사유", "Reason", "理由")}
                    <textarea
                      required
                      maxLength={1000}
                      value={reason}
                      onChange={(event) => setReason(event.target.value)}
                      className="mt-1 w-full rounded border border-gray-300 bg-white p-2 focus-visible:outline-orange-500 dark:border-gray-600 dark:bg-[#15171a]"
                    />
                  </label>
                  <label className="block text-sm">
                    {t("기간", "Duration", "期間")}
                    <select
                      aria-label={t("기간", "Duration", "期間")}
                      value={duration}
                      onChange={(event) => setDuration(event.target.value)}
                      className="ml-2 rounded border border-gray-300 bg-white p-2 dark:border-gray-600 dark:bg-[#15171a]"
                    >
                      <option value="60">
                        {t("1시간", "1 hour", "1時間")}
                      </option>
                      <option value="1440">
                        {t("24시간", "24 hours", "24時間")}
                      </option>
                      <option value="10080">{t("7일", "7 days", "7日")}</option>
                      <option value="permanent">
                        {t("영구", "Permanent", "無期限")}
                      </option>
                    </select>
                  </label>
                </>
              )}
              {failed && (
                <p
                  role="alert"
                  className="text-sm text-red-700 dark:text-red-300"
                >
                  {t(
                    "처리하지 못했습니다. 권한과 연결 상태를 확인하고 다시 시도해 주세요.",
                    "Could not complete the action. Check your permissions and connection, then retry.",
                    "処理できませんでした。権限と接続を確認して再試行してください。",
                  )}
                </p>
              )}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  disabled={chat.busy || pending}
                  className={partyButton}
                  onClick={() => setAction(null)}
                >
                  {t("취소", "Cancel", "キャンセル")}
                </button>
                <button
                  type="submit"
                  disabled={
                    chat.busy || pending || (action === "ban" && !reason.trim())
                  }
                  className={partyButton}
                >
                  {t("확인", "Confirm", "確認")}
                </button>
              </div>
            </form>
          </dialog>,
          document.body,
        )}
    </div>
  );
}
