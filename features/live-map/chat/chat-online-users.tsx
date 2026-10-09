"use client";

import { useState } from "react";
import { Search, Users } from "lucide-react";
import { cn } from "@/lib/utils/class-name";
import { partyText, type PartyLocale } from "../party/copy";
import { ChatUserMenu } from "./chat-user-menu";
import { PartyInvitePreferences } from "./party-invite-preferences";
import type { LiveMapPartyController } from "../party/use-live-map-party";
import { useLiveMapChat } from "./use-live-map-chat";

export function ChatOnlineUsers({ locale, className, party }: { locale: PartyLocale; className?: string; party: LiveMapPartyController }) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  const [search, setSearch] = useState("");
  const users = chat.onlineUsers;
  const query = search.trim().normalize("NFKC").toLocaleLowerCase(locale);
  const filteredUsers = users?.filter((user) => user.nickname.normalize("NFKC").toLocaleLowerCase(locale).includes(query)) ?? [];
  const ready = chat.connected && users !== undefined;

  return (
    <section aria-label={t("현재 채팅 접속자", "Online chat users", "チャット接続中のユーザー")} className={cn("min-h-0 shrink-0 flex-col overflow-hidden rounded-xl border border-gray-300 bg-white text-gray-900 shadow-xl dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100", className)}>
      <p role="status" className="flex min-h-14 shrink-0 items-center gap-1.5 border-b border-gray-200 px-3 py-3 text-xs font-bold text-gray-700 dark:border-[#3a3d41] dark:text-gray-200">
        <Users className="h-3.5 w-3.5 shrink-0 text-orange-500" aria-hidden="true" />
        {ready
          ? t(`현재 접속자 ${users.length}명`, `${users.length} users online`, `現在 ${users.length}人が接続中`)
          : chat.connection === "reconnecting" || chat.connection === "auth-required" || chat.error
            ? t("접속자 정보 재연결 중", "Reconnecting online users…", "接続者情報を再接続中")
            : t("접속자 확인 중", "Checking online users…", "接続者を確認中")}
      </p>
      <PartyInvitePreferences locale={locale} />
      <div className="shrink-0 px-2 pt-2">
        <label className="flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-2 focus-within:ring-2 focus-within:ring-orange-500 dark:border-[#3a3d41] dark:bg-[#15171a]">
          <Search className="h-3.5 w-3.5 shrink-0 text-gray-500 dark:text-gray-400" aria-hidden="true" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} aria-label={t("접속자 닉네임 검색", "Search online nicknames", "接続者のニックネームを検索")} placeholder={t("닉네임 검색", "Search nicknames", "名前を検索")} className="min-h-9 min-w-0 w-full bg-transparent text-xs text-gray-900 outline-none placeholder:text-gray-500 dark:text-gray-100 dark:placeholder:text-gray-400" />
        </label>
      </div>
      {ready && (filteredUsers.length > 0 ? (
        <ul className="min-h-0 flex-1 space-y-1.5 overflow-y-auto overscroll-contain p-2 text-xs">
          {filteredUsers.map((user) => (
            <li key={user.id} className={cn("min-w-0 max-w-full", user.id === chat.me?.id || !chat.token ? "rounded-md border px-2.5 py-2 break-words [overflow-wrap:anywhere]" : "", user.id === chat.me?.id ? "border-orange-200 bg-orange-50 font-bold text-orange-800 dark:border-orange-800 dark:bg-orange-950/40 dark:text-orange-200" : "border-gray-200 bg-gray-100 font-medium text-gray-700 dark:border-[#3a3d41] dark:bg-[#2a2d31] dark:text-gray-200")}>
              {user.id === chat.me?.id || !chat.token ? <span>{user.nickname}</span> : <ChatUserMenu user={user} locale={locale} interactive={chat.connected} party={party} variant="row" />}
              {user.id === chat.me?.id && <span className="ml-1 text-orange-600 dark:text-orange-400">{t("(나)", "(you)", "（自分）")}</span>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="p-3 text-xs leading-5 text-gray-500 dark:text-gray-400">{users.length === 0 ? t("현재 접속 중인 로그인 사용자가 없습니다.", "No signed-in users are online.", "現在接続中のログインユーザーはいません。") : t("검색 결과가 없습니다.", "No matching nicknames.", "一致するニックネームがありません。")}</p>
      ))}
    </section>
  );
}
