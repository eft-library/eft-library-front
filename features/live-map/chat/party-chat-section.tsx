"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { LoaderCircle, MessageCircle, Send } from "lucide-react";
import { cn } from "@/lib/utils/class-name";
import { partyButton } from "../party/party-forms";
import { partyText, type PartyLocale } from "../party/copy";
import { useLiveMapChat } from "./use-live-map-chat";

export function PartyChatSection({ roomId, locale }: { roomId: string; locale: PartyLocale }) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const [message, setMessage] = useState("");
  const loadedRoomRef = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const messages = useMemo(
    () => chat.messages.party.filter((entry) => entry.room_id === roomId).reverse(),
    [chat.messages.party, roomId],
  );

  useEffect(() => {
    if (loadedRoomRef.current === roomId) return;
    loadedRoomRef.current = roomId;
    void chat.loadLatest("party", roomId).catch(() => { loadedRoomRef.current = null; });
  }, [chat, roomId]);

  useEffect(() => {
    requestAnimationFrame(() => {
      const list = listRef.current;
      if (list) list.scrollTop = list.scrollHeight;
    });
  }, [messages.length]);

  function submit(event: FormEvent) {
    event.preventDefault();
    const value = message.trim();
    if (!value || value.length > 300) return;
    if (chat.sendMessage("party", value, roomId)) setMessage("");
  }

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 dark:border-[#3a3d41]">
      <div className="flex items-center gap-2 border-b border-gray-200 px-3 py-2 dark:border-[#3a3d41]">
        <MessageCircle className="h-4 w-4 text-orange-500" />
        <h3 className="flex-1 text-sm font-bold">{t("파티 채팅", "Party chat", "パーティーチャット")}</h3>
        <span title={chat.connected ? t("연결됨", "Connected", "接続済み") : t("연결 중", "Connecting", "接続中")} className={cn("h-2 w-2 rounded-full", chat.connected ? "bg-emerald-500" : "bg-amber-500")} />
      </div>
      <div ref={listRef} className="h-52 overflow-y-auto overscroll-contain p-3">
        {chat.nextBefore.party && (
          <button type="button" className={`${partyButton} mx-auto mb-3 flex`} disabled={chat.busy} onClick={() => void chat.loadOlder("party", roomId)}>
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
                  <div className="mb-1 flex items-center gap-1.5 px-1 text-[10px] text-gray-500 dark:text-gray-400">
                    <strong className="text-xs text-gray-700 dark:text-gray-200">{entry.user.nickname}</strong>
                    <time dateTime={entry.create_time}>{time}</time>
                  </div>
                  <p className={cn("max-w-[90%] whitespace-pre-wrap break-words rounded-xl px-3 py-2 text-xs leading-5", mine ? "rounded-br-sm bg-orange-500 text-white dark:text-[#1e2124]" : "rounded-bl-sm bg-gray-100 text-gray-900 dark:bg-[#2a2d31] dark:text-gray-100")}>
                    {entry.message}
                  </p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="py-14 text-center text-xs text-gray-500 dark:text-gray-400">{t("파티원과 대화를 시작해 보세요.", "Start chatting with your party.", "パーティーメンバーと会話しましょう。")}</p>
        )}
      </div>
      <form onSubmit={submit} className="flex gap-2 border-t border-gray-200 p-2 dark:border-[#3a3d41]">
        <textarea aria-label={t("파티 메시지", "Party message", "パーティーメッセージ")} rows={1} maxLength={300} value={message} onChange={(event) => setMessage(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing && event.nativeEvent.keyCode !== 229) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder={t("파티 메시지", "Party message", "パーティーメッセージ")} className="min-h-9 flex-1 resize-none rounded-md border border-gray-300 bg-white px-2 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a]" />
        <button type="submit" disabled={!chat.connected || !message.trim()} className={`${partyButton} !px-3`} aria-label={t("보내기", "Send", "送信")}><Send className="h-4 w-4" /></button>
      </form>
    </section>
  );
}
