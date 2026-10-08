"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils/class-name";
import { partyButton } from "../party/party-forms";
import { partyText, type PartyLocale } from "../party/copy";
import { ChatModerationNotice } from "./chat-moderation-notice";
import { useLiveMapChat } from "./use-live-map-chat";

export function PartyChatSection({ roomId, locale }: { roomId: string; locale: PartyLocale }) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const [message, setMessage] = useState("");
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const loadedRoomRef = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const atBottomRef = useRef(true);
  const loadingOlderRef = useRef(false);
  const previousCountRef = useRef(0);
  const messages = useMemo(
    () => chat.messages.party.filter((entry) => entry.room_id === roomId).reverse(),
    [chat.messages.party, roomId],
  );
  const outgoing = chat.outgoing
    .filter((entry) => entry.channel === "party" && entry.roomId === roomId)
    .sort((a, b) => a.createdAt - b.createdAt);

  useEffect(() => {
    if (loadedRoomRef.current === roomId) return;
    loadedRoomRef.current = roomId;
    void chat.loadLatest("party", roomId).catch(() => { loadedRoomRef.current = null; });
  }, [chat, roomId]);

  useEffect(() => {
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
  }, [messages.length, outgoing.length]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value || value.length > 300) return;
    if (chat.sendMessage("party", value, roomId)) setMessage("");
  }

  async function loadOlder() {
    const list = listRef.current;
    const previousHeight = list?.scrollHeight ?? 0;
    const previousTop = list?.scrollTop ?? 0;
    loadingOlderRef.current = true;
    try {
      await chat.loadOlder("party", roomId);
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
    <section className="min-w-0 border-t border-gray-200 pt-3 dark:border-[#3a3d41]">
      <div className="flex items-center gap-2 pb-2">
        <span role="status" aria-label={chat.connected ? t("연결됨", "Connected", "接続済み") : t("연결 중", "Connecting", "接続中")} className={cn("h-2 w-2 shrink-0 rounded-full", chat.connected ? "bg-emerald-500" : "bg-amber-500")} />
        <MessageCircle className="h-4 w-4 text-orange-500" />
        <h3 className="flex-1 text-sm font-bold">{t("파티 채팅", "Party chat", "パーティーチャット")}</h3>
      </div>
      <div ref={listRef} onScroll={(event) => { const element = event.currentTarget; atBottomRef.current = element.scrollHeight - element.scrollTop - element.clientHeight < 40; if (atBottomRef.current) setHasNewMessage(false); }} className="relative h-52 overflow-y-auto overscroll-contain px-1 py-3">
        {chat.nextBefore.party && (
          <button type="button" className={`${partyButton} mx-auto mb-3 flex`} disabled={chat.busy} onClick={() => void loadOlder()}>
            {chat.busy && <LoaderCircle className="h-3.5 w-3.5 animate-spin" />}
            {t("이전 메시지", "Older messages", "以前のメッセージ")}
          </button>
        )}
        {messages.length ? (
          <ul className="space-y-3">
            {messages.map((entry) => {
              const mine = entry.user.id === chat.me?.id;
              const time = new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit" }).format(new Date(entry.create_time));
              return (
                  <li key={entry.id} className={cn("flex flex-col", mine ? "items-end" : "items-start")}>
                    <div className="mb-1 flex max-w-full items-center gap-1.5 px-1 text-[10px] text-gray-500 dark:text-gray-400">
                      <span className="min-w-0 truncate text-xs font-bold text-gray-800 dark:text-gray-100">{entry.user.nickname}</span>
                      <time className="shrink-0" dateTime={entry.create_time}>{time}</time>
                    </div>
                    <p className={cn("max-w-[90%] whitespace-pre-wrap break-words [overflow-wrap:anywhere] rounded-xl px-3 py-2 text-xs leading-5", mine ? "rounded-br-sm bg-orange-500 text-white dark:text-[#1e2124]" : "rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-[#2a2d31] dark:text-gray-100")}>
                      {entry.message}
                    </p>
                  </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-14 text-center text-xs text-gray-500 dark:text-gray-400">{t("파티원과 대화를 시작해 보세요.", "Start chatting with your party.", "パーティーメンバーと会話しましょう。")}</p>
        )}
        {outgoing.length > 0 && (
          <ul className="mt-3 space-y-3">
            {outgoing.map((entry) => (
              <li key={entry.requestId} className="flex flex-col items-end opacity-75">
                <p className={cn("max-w-[90%] whitespace-pre-wrap break-words rounded-xl rounded-br-sm px-3 py-2 text-xs leading-5", entry.status === "failed" ? "border border-red-300 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200" : "bg-orange-500 text-white dark:text-[#1e2124]")}>{entry.message}</p>
                <div className="mt-1 flex items-center gap-2 text-[10px] text-gray-500 dark:text-gray-400">
                  <span>{entry.status === "sending" ? t("전송 중…", "Sending…", "送信中…") : entry.status === "sent" ? t("전송됨", "Sent", "送信済み") : t("전송 실패", "Failed", "送信失敗")}</span>
                  {entry.status === "failed" && <button disabled={!chat.canSend} type="button" className="font-bold text-orange-600 hover:underline dark:text-orange-400" onClick={() => chat.retryMessage(entry.requestId)}>{t("다시 보내기", "Retry", "再送")}</button>}
                </div>
              </li>
            ))}
          </ul>
        )}
        {hasNewMessage && <button type="button" onClick={scrollToLatest} className="sticky bottom-1 mx-auto mt-3 flex rounded-full bg-orange-500 px-3 py-1.5 text-xs font-bold text-white shadow-lg dark:text-[#1e2124]">{t("새 메시지 ↓", "New message ↓", "新着メッセージ ↓")}</button>}
      </div>
      <ChatModerationNotice locale={locale} />
      <form onSubmit={submit} className="flex gap-2 pt-2">
        <textarea disabled={!chat.canSend} aria-label={t("파티 메시지", "Party message", "パーティーメッセージ")} rows={1} maxLength={300} value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={t("파티 메시지", "Party message", "パーティーメッセージ")} className="min-h-9 flex-1 resize-none rounded-md border border-gray-300 bg-white disabled:cursor-not-allowed disabled:opacity-60 px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a]" />
        <button type="submit" disabled={!chat.canSend || !message.trim()} className={`${partyButton} !px-3`} aria-label={t("보내기", "Send", "送信")}><Send className="h-4 w-4" /></button>
      </form>
    </section>
  );
}
