"use client";

import { Fragment, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import {
  LoaderCircle,
  Ban,
  MessageCircle,
  Send,
  ShieldAlert,
  UserRoundX,
  UserPlus,
  WifiOff,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/class-name";
import type { LiveMapChatMessageV3, PartyInvitationV3 } from "@/types/api/live-map-chat";
import { partyButton } from "../party/party-forms";
import { partyText, type PartyLocale } from "../party/copy";
import type { LiveMapPartyController } from "../party/use-live-map-party";
import { LiveMapChatApiError } from "./api";
import { useLiveMapChat } from "./use-live-map-chat";

function chatErrorText(error: Error | null, locale: PartyLocale) {
  if (!error) return null;
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const code = error instanceof LiveMapChatApiError ? error.code : "CHAT_UNAVAILABLE";
  const messages: Record<string, string> = {
    CHAT_RATE_LIMITED: t("메시지를 너무 빠르게 보내고 있습니다.", "You are sending messages too quickly.", "メッセージの送信が速すぎます。"),
    CHAT_REPEATED_MESSAGE: t("같은 메시지는 잠시 후 다시 보낼 수 있습니다.", "Wait before sending the same message again.", "同じメッセージは少し待ってから送信してください。"),
    CHAT_RESTRICTED: t("현재 채팅을 보낼 수 없습니다.", "You cannot send chat messages right now.", "現在チャットを送信できません。"),
    PARTY_OWNER_REQUIRED: t("방장만 파티에 초대할 수 있습니다.", "Only the party owner can invite players.", "パーティーリーダーのみ招待できます。"),
    PARTY_INVITATION_DUPLICATED: t("이미 이 사용자에게 초대를 보냈습니다.", "This user already has an invitation.", "このユーザーはすでに招待されています。"),
    PARTY_ROOM_FULL: t("파티 정원이 찼습니다.", "The party is full.", "パーティーは満員です。"),
    PARTY_ROOM_LOCKED: t("현재 파티 입장이 잠겨 있습니다.", "The party is locked.", "パーティーはロックされています。"),
    PARTY_ALREADY_JOINED: t("이미 다른 파티에 참여 중입니다.", "This player is already in a party.", "すでに別のパーティーに参加しています。"),
    PARTY_INVITATION_EXPIRED: t("초대가 만료되었습니다.", "The invitation has expired.", "招待の有効期限が切れました。"),
    REGISTERED_USER_REQUIRED: t("사이트 계정 등록을 완료해 주세요.", "Complete your site registration first.", "サイト登録を完了してください。"),
    CHAT_ALREADY_REPORTED: t("이미 신고한 메시지입니다.", "You already reported this message.", "このメッセージはすでに通報済みです。"),
  };
  return messages[code] ?? t("요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.", "Could not complete the request. Please try again.", "処理できませんでした。しばらくしてから再試行してください。");
}

function MessageRow({
  message,
  mine,
  canInvite,
  inviting,
  locale,
  onInvite,
  onBlock,
  onReport,
  interactive,
  invitation,
}: {
  message: LiveMapChatMessageV3;
  mine: boolean;
  canInvite: boolean;
  inviting: boolean;
  locale: PartyLocale;
  onInvite: () => void;
  onBlock: () => void;
  onReport: () => void;
  interactive: boolean;
  invitation?: PartyInvitationV3;
}) {
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const [menu, setMenu] = useState(false);
  const time = new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(message.create_time));
  return (
    <li className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
      <div className="mb-1 flex items-center gap-1.5 px-1 text-[11px] text-gray-500 dark:text-gray-400">
        <button
          type="button"
          disabled={mine || !interactive}
          onClick={() => setMenu((value) => !value)}
          title={message.user.nickname}
          className={cn("max-w-40 truncate text-xs font-bold text-gray-700 dark:text-gray-200", !mine && interactive && "rounded hover:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500")}
        >
          {message.user.nickname}
        </button>
        <time dateTime={message.create_time}>{time}</time>
      </div>
      {menu && !mine && interactive && (
        <div className="mb-1 flex flex-wrap gap-1 rounded-md border border-gray-200 bg-white p-1 shadow-md dark:border-[#3a3d41] dark:bg-[#25282c]">
          {invitation && invitation.status !== "pending" && (
            <span className="w-full px-2 py-1 text-[10px] font-semibold text-gray-500 dark:text-gray-400">
              {invitation.status === "accepted"
                ? t("파티 참가 완료", "Joined the party", "パーティー参加済み")
                : invitation.status === "rejected"
                  ? t("초대 거절됨", "Invitation declined", "招待が拒否されました")
                  : invitation.status === "expired"
                    ? t("초대 만료됨", "Invitation expired", "招待期限切れ")
                    : t("초대 취소됨", "Invitation cancelled", "招待キャンセル")}
            </span>
          )}
          <button
            type="button"
            disabled={!canInvite || inviting || invitation?.status === "pending" || invitation?.status === "accepted"}
            onClick={() => {
              onInvite();
              setMenu(false);
            }}
            className={`${partyButton} !min-h-8`}
            title={!canInvite ? t("파티 방장만 초대할 수 있습니다.", "Only the party owner can invite.", "リーダーのみ招待できます。") : undefined}
          >
            <UserPlus className="h-3.5 w-3.5" />
            {invitation?.status === "pending"
              ? t("초대 보냄", "Invited", "招待済み")
              : invitation?.status === "accepted"
                ? t("참가 완료", "Joined", "参加済み")
              : t("파티 초대", "Invite to party", "パーティー招待")}
          </button>
          <button
            type="button"
            disabled={inviting}
            onClick={() => {
              onBlock();
              setMenu(false);
            }}
            className={`${partyButton} !min-h-8`}
          >
            <UserRoundX className="h-3.5 w-3.5" />
            {t("차단", "Block", "ブロック")}
          </button>
          <button
            type="button"
            disabled={inviting}
            onClick={() => {
              onReport();
              setMenu(false);
            }}
            className={`${partyButton} !min-h-8`}
          >
            <ShieldAlert className="h-3.5 w-3.5" />
            {t("신고", "Report", "通報")}
          </button>
        </div>
      )}
      <p
        className={cn(
          "max-w-[88%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-xl px-3 py-2 text-sm leading-5",
          mine
            ? "rounded-br-sm bg-orange-500 text-white dark:text-[#1e2124]"
            : "rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-[#2a2d31] dark:text-gray-100",
        )}
      >
        {message.message}
      </p>
    </li>
  );
}

export function LiveMapChatPanel({
  party,
  locale,
}: {
  party: LiveMapPartyController;
  locale: PartyLocale;
}) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const [message, setMessage] = useState("");
  const [notice, setNotice] = useState<string | null>(null);
  const [invitingId, setInvitingId] = useState<string | null>(null);
  const [reporting, setReporting] = useState<LiveMapChatMessageV3 | null>(null);
  const [reportReason, setReportReason] = useState<"spam" | "abuse" | "inappropriate" | "personal_info" | "other">("spam");
  const [reportDetail, setReportDetail] = useState("");
  const [blockedOpen, setBlockedOpen] = useState(false);
  const [blockedUsers, setBlockedUsers] = useState<Array<{ id: string; nickname: string }>>([]);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const loadingOlderRef = useRef(false);
  const previousCountRef = useRef(0);
  const messages = chat.messages.lobby;
  const outgoing = chat.outgoing
    .filter((entry) => entry.channel === "lobby")
    .sort((a, b) => a.createdAt - b.createdAt);
  const canInvite = party.snapshot?.me.role === "owner" && Boolean(party.roomId);
  const chronological = useMemo(() => [...messages].reverse(), [messages]);

  useEffect(() => {
    if (!chat.open) return;
    requestAnimationFrame(() => {
      const list = listRef.current;
      if (!list) return;
      const count = messages.length + outgoing.length;
      if (loadingOlderRef.current) {
        loadingOlderRef.current = false;
        previousCountRef.current = count;
        return;
      }
      if (atBottomRef.current || previousCountRef.current === 0) {
        list.scrollTop = list.scrollHeight;
        setHasNewMessage(false);
      } else if (count > previousCountRef.current) {
        setHasNewMessage(true);
      }
      previousCountRef.current = count;
    });
  }, [chat.open, messages.length, outgoing.length]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(null), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value || value.length > 300) return;
    if (chat.sendMessage("lobby", value)) setMessage("");
  }

  async function invite(userId: string) {
    if (!party.roomId) return;
    setInvitingId(userId);
    try {
      await chat.invite(party.roomId, userId);
      setNotice(t("파티 초대를 보냈습니다.", "Party invitation sent.", "パーティー招待を送りました。"));
    } catch {
      // The shared error banner displays the API error.
    } finally {
      setInvitingId(null);
    }
  }

  async function block(userId: string) {
    try {
      await chat.blockUser(userId);
      setNotice(t("사용자를 차단했습니다.", "User blocked.", "ユーザーをブロックしました。"));
    } catch {
      // The shared error banner displays the API error.
    }
  }

  async function report(event: FormEvent) {
    event.preventDefault();
    if (!reporting) return;
    try {
      await chat.reportMessage(reporting.id, reportReason, reportDetail);
      setReporting(null);
      setReportDetail("");
      setNotice(t("신고가 접수되었습니다.", "Report submitted.", "通報を受け付けました。"));
    } catch {
      // Keep the form open so the user can retry.
    }
  }

  async function openBlockedUsers() {
    setBlockedOpen(true);
    try {
      setBlockedUsers(await chat.getBlockedUsers());
    } catch {
      // The shared error banner displays the API error.
    }
  }

  async function unblock(userId: string) {
    try {
      await chat.unblockUser(userId);
      setBlockedUsers((current) => current.filter((entry) => entry.id !== userId));
      setNotice(t("차단을 해제했습니다.", "User unblocked.", "ブロックを解除しました。"));
    } catch {
      // Keep the list open so the user can retry.
    }
  }

  async function loadOlder() {
    const list = listRef.current;
    const previousHeight = list?.scrollHeight ?? 0;
    const previousTop = list?.scrollTop ?? 0;
    loadingOlderRef.current = true;
    try {
      await chat.loadOlder("lobby");
      requestAnimationFrame(() => {
        if (list) list.scrollTop = previousTop + list.scrollHeight - previousHeight;
        loadingOlderRef.current = false;
      });
    } catch {
      loadingOlderRef.current = false;
    }
  }

  function scrollToLatest() {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
    atBottomRef.current = true;
    setHasNewMessage(false);
  }

  return (
    <div className="pointer-events-none absolute right-[8.75rem] top-3 z-[1210] flex flex-col items-end">
      {chat.open && (
        <section className="pointer-events-auto absolute right-[-8rem] top-11 flex h-[min(70dvh,38rem)] w-[22rem] max-w-[calc(100vw-1.5rem)] flex-col overflow-hidden rounded-xl border border-gray-300 bg-white text-gray-900 shadow-xl dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100">
          {reporting && (
            <form onSubmit={report} className="absolute inset-x-3 top-14 z-20 space-y-3 rounded-lg border border-gray-300 bg-white p-4 shadow-xl dark:border-[#4a4d51] dark:bg-[#25282c]">
              <div className="flex items-center justify-between gap-2">
                <strong className="text-sm">{t("메시지 신고", "Report message", "メッセージを通報")}</strong>
                <button type="button" className={partyButton} aria-label={t("취소", "Cancel", "キャンセル")} onClick={() => setReporting(null)}><X className="h-3.5 w-3.5" /></button>
              </div>
              <select value={reportReason} onChange={(event) => setReportReason(event.target.value as typeof reportReason)} className="min-h-9 w-full rounded-md border border-gray-300 bg-white px-2 text-sm dark:border-[#3a3d41] dark:bg-[#15171a]">
                <option value="spam">{t("도배·광고", "Spam", "スパム")}</option>
                <option value="abuse">{t("욕설·괴롭힘", "Abuse", "暴言・嫌がらせ")}</option>
                <option value="inappropriate">{t("부적절한 내용", "Inappropriate content", "不適切な内容")}</option>
                <option value="personal_info">{t("개인정보 노출", "Personal information", "個人情報")}</option>
                <option value="other">{t("기타", "Other", "その他")}</option>
              </select>
              <textarea value={reportDetail} onChange={(event) => setReportDetail(event.target.value)} maxLength={1000} rows={3} placeholder={t("추가 설명 (선택)", "Details (optional)", "詳細（任意）")} className="w-full resize-none rounded-md border border-gray-300 bg-white p-2 text-sm dark:border-[#3a3d41] dark:bg-[#15171a]" />
              <div className="flex justify-end gap-2">
                <button type="button" className={partyButton} onClick={() => setReporting(null)}>{t("취소", "Cancel", "キャンセル")}</button>
                <button type="submit" className={`${partyButton} !border-red-400 !text-red-700 dark:!text-red-300`} disabled={chat.busy}>{t("신고하기", "Submit report", "通報する")}</button>
              </div>
            </form>
          )}
          {blockedOpen && (
            <div className="absolute inset-x-3 top-14 z-20 rounded-lg border border-gray-300 bg-white p-4 shadow-xl dark:border-[#4a4d51] dark:bg-[#25282c]">
              <div className="mb-3 flex items-center justify-between gap-2">
                <strong className="text-sm">{t("차단한 사용자", "Blocked users", "ブロックしたユーザー")}</strong>
                <button type="button" className={partyButton} aria-label={t("닫기", "Close", "閉じる")} onClick={() => setBlockedOpen(false)}><X className="h-3.5 w-3.5" /></button>
              </div>
              {blockedUsers.length ? (
                <ul className="max-h-64 space-y-2 overflow-y-auto">
                  {blockedUsers.map((user) => (
                    <li key={user.id} className="flex items-center gap-2 rounded-md bg-gray-100 p-2 dark:bg-[#2a2d31]">
                      <span title={user.nickname} className="min-w-0 flex-1 truncate text-sm font-semibold">{user.nickname}</span>
                      <button type="button" className={partyButton} disabled={chat.busy} onClick={() => void unblock(user.id)}>{t("차단 해제", "Unblock", "解除")}</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-6 text-center text-xs text-gray-500 dark:text-gray-400">{t("차단한 사용자가 없습니다.", "No blocked users.", "ブロックしたユーザーはいません。")}</p>
              )}
            </div>
          )}
          <header className="flex items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-[#3a3d41]">
            <MessageCircle className="h-4 w-4 text-orange-500" />
            <h2 className="flex-1 font-bold">{t("채팅", "Chat", "チャット")}</h2>
            {chat.token && (
              <>
                <button type="button" className={partyButton} aria-label={t("차단한 사용자", "Blocked users", "ブロックしたユーザー")} title={t("차단한 사용자", "Blocked users", "ブロックしたユーザー")} onClick={() => void openBlockedUsers()}><Ban className="h-3.5 w-3.5" /></button>
                <span title={chat.connected ? t("연결됨", "Connected", "接続済み") : t("연결 중", "Connecting", "接続中")} className={cn("h-2.5 w-2.5 rounded-full", chat.connected ? "bg-emerald-500" : "bg-amber-500")} />
              </>
            )}
            <button className={partyButton} aria-label={t("닫기", "Close", "閉じる")} onClick={() => chat.setOpen(false)}>
              <X className="h-4 w-4" />
            </button>
          </header>
          <>
              <div className="border-b border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 dark:border-[#3a3d41] dark:text-gray-300">
                {t("공개 모집 채팅", "Public recruitment chat", "公開募集チャット")}
              </div>
              {(notice || chat.error) && (
                <p role={chat.error ? "alert" : "status"} className={cn("mx-3 mt-3 rounded-md border px-3 py-2 text-xs font-semibold", chat.error ? "border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200" : "border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-200")}>
                  {chat.error ? chatErrorText(chat.error, locale) : notice}
                </p>
              )}
              {!chat.connected && (
                <div className="mx-3 mt-3 flex items-center gap-2 rounded-md bg-amber-50 p-2 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-200">
                  <WifiOff className="h-3.5 w-3.5" />
                  <span className="flex-1">{t("채팅 서버에 연결 중입니다.", "Connecting to chat…", "チャットに接続中です。")}</span>
                  <button className={partyButton} onClick={chat.reconnect}>{t("재연결", "Retry", "再接続")}</button>
                </div>
              )}
              <div ref={listRef} onScroll={(event) => { const element = event.currentTarget; atBottomRef.current = element.scrollHeight - element.scrollTop - element.clientHeight < 48; if (atBottomRef.current) setHasNewMessage(false); }} className="relative min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
                {chat.nextBefore.lobby && (
                  <button className={`${partyButton} mx-auto mb-3 flex`} disabled={chat.busy} onClick={() => void loadOlder()}>
                    {chat.busy && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
                    {t("이전 메시지", "Older messages", "以前のメッセージ")}
                  </button>
                )}
                {chronological.length ? (
                  <ul className="space-y-3">
                    {chronological.map((entry, index) => {
                      const date = new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(new Date(entry.create_time));
                      const previousDate = index > 0 ? new Intl.DateTimeFormat(locale, { year: "numeric", month: "long", day: "numeric" }).format(new Date(chronological[index - 1].create_time)) : null;
                      return (
                        <Fragment key={entry.id}>
                          {date !== previousDate && <li className="flex items-center gap-2 py-1 text-[10px] font-semibold text-gray-400 before:h-px before:flex-1 before:bg-gray-200 after:h-px after:flex-1 after:bg-gray-200 dark:text-gray-500 dark:before:bg-[#3a3d41] dark:after:bg-[#3a3d41]">{date}</li>}
                          <MessageRow message={entry} mine={entry.user.id === chat.me?.id} interactive={Boolean(chat.token)} canInvite={canInvite} inviting={invitingId === entry.user.id || chat.busy} invitation={chat.invitations.find((invitation) => invitation.room_id === party.roomId && invitation.invitee_user_id === entry.user.id)} locale={locale} onInvite={() => void invite(entry.user.id)} onBlock={() => void block(entry.user.id)} onReport={() => { chat.clearError(); setReporting(entry); }} />
                        </Fragment>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">{t("첫 모집 글을 남겨보세요.", "Start the first recruitment message.", "最初の募集メッセージを送りましょう。")}</p>
                )}
                {outgoing.length > 0 && (
                  <ul className="mt-3 space-y-3">
                    {outgoing.map((entry) => (
                      <li key={entry.requestId} className="flex flex-col items-end opacity-75">
                        <p className={cn("max-w-[88%] whitespace-pre-wrap break-words rounded-xl rounded-br-sm px-3 py-2 text-sm leading-5", entry.status === "failed" ? "border border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200" : "bg-orange-500 text-white dark:text-[#1e2124]")}>{entry.message}</p>
                        <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                          <span>{entry.status === "sending" ? t("전송 중…", "Sending…", "送信中…") : entry.status === "sent" ? t("전송됨", "Sent", "送信済み") : t("전송 실패", "Failed", "送信失敗")}</span>
                          {entry.status === "failed" && <button type="button" className="font-bold text-orange-600 hover:underline dark:text-orange-400" onClick={() => chat.retryMessage(entry.requestId)}>{t("다시 보내기", "Retry", "再送")}</button>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {hasNewMessage && <button type="button" onClick={scrollToLatest} className="sticky bottom-1 mx-auto mt-3 flex rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:text-[#1e2124]">{t("새 메시지 ↓", "New message ↓", "新着メッセージ ↓")}</button>}
              </div>
              {chat.token ? (
                <form onSubmit={submit} className="flex gap-2 border-t border-gray-200 p-3 dark:border-[#3a3d41]">
                  <textarea aria-label={t("메시지", "Message", "メッセージ")} rows={1} maxLength={300} value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={t("같이 플레이할 사람을 찾아보세요", "Find players to join you", "一緒にプレイする人を探しましょう")} className="min-h-9 flex-1 resize-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a]" />
                  <button type="submit" disabled={!chat.connected || !message.trim()} className={`${partyButton} !px-3`} aria-label={t("보내기", "Send", "送信")}><Send className="h-4 w-4" /></button>
                </form>
              ) : (
                <div className="flex items-center gap-2 border-t border-gray-200 p-3 dark:border-[#3a3d41]">
                  <p className="min-w-0 flex-1 text-xs text-gray-600 dark:text-gray-300">{t("메시지를 보내려면 로그인해 주세요.", "Sign in to send messages.", "メッセージを送るにはログインしてください。")}</p>
                  <button className={partyButton} disabled={chat.authStatus === "loading"} onClick={() => void signIn("google")}>{t("로그인", "Sign in", "ログイン")}</button>
                </div>
              )}
            </>
        </section>
      )}
      {!party.open && <button type="button" aria-label={t("모집 채팅", "Recruitment chat", "募集チャット")} title={t("모집 채팅", "Recruitment chat", "募集チャット")} aria-expanded={chat.open} onClick={() => { chat.setOpen(!chat.open); if (!chat.open) party.setOpen(false); }} className="pointer-events-auto relative inline-flex h-9 w-[4.5rem] items-center justify-center gap-1.5 rounded-lg border border-gray-300 bg-white px-2 text-sm font-bold text-gray-800 shadow-lg transition hover:bg-orange-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100 dark:hover:bg-[#2a2d31]">
        <MessageCircle className="h-4 w-4 text-orange-500" />
        <span>{t("모집", "Recruit", "募集")}</span>
        {chat.receivedInvitations.length > 0 && <span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-orange-500 px-1 py-0.5 text-center text-[9px] leading-none text-white dark:text-[#1e2124]">{chat.receivedInvitations.length}</span>}
      </button>}
    </div>
  );
}
