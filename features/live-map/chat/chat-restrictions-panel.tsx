"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { partyText, type PartyLocale } from "../party/copy";
import { partyButton } from "../party/party-forms";
import { useLiveMapChat } from "./use-live-map-chat";
import { ChatUserMenu } from "./chat-user-menu";
import { chatErrorText } from "./copy";

export function ChatRestrictionsPanel({
  locale,
  onClose,
}: {
  locale: PartyLocale;
  onClose: () => void;
}) {
  const chat = useLiveMapChat();
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const [offset, setOffset] = useState(0);
  const query = useQuery({
    queryKey: ["chat-restrictions", chat.me?.id, offset],
    queryFn: () => chat.getRestrictions(offset),
    enabled: chat.canModerate,
    staleTime: 0,
  });
  return (
    <section
      aria-label={t("채팅 밴 관리", "Chat ban management", "チャット禁止管理")}
      className="absolute inset-x-3 top-14 z-20 rounded-lg border border-gray-300 bg-white p-4 shadow-xl dark:border-gray-600 dark:bg-[#25282c]"
    >
      <header className="mb-3 flex items-center justify-between gap-2">
        <h3 className="text-sm font-bold">
          {t("채팅 밴 관리", "Chat ban management", "チャット禁止管理")}
        </h3>
        <button
          type="button"
          className={partyButton}
          aria-label={t("닫기", "Close", "閉じる")}
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </button>
      </header>
      {query.isPending ? (
        <p role="status" className="text-xs">
          {t("불러오는 중…", "Loading…", "読み込み中…")}
        </p>
      ) : query.isError ? (
        <p role="alert" className="text-xs text-red-700 dark:text-red-300">
          {chatErrorText(query.error, locale)}
          <button
            type="button"
            onClick={() => void query.refetch()}
            className="ml-2 underline"
          >
            {t("다시 시도", "Retry", "再試行")}
          </button>
        </p>
      ) : query.data?.length ? (
        <ul className="max-h-72 space-y-3 overflow-y-auto">
          {query.data.map((entry) => (
            <li
              key={entry.user.id}
              className="rounded border border-gray-200 p-2 dark:border-gray-600"
            >
              <ChatUserMenu
                user={entry.user}
                locale={locale}
                interactive={chat.canModerate}
                onChanged={() => void query.refetch()}
              />
              <p className="mt-1 break-words text-xs text-gray-600 dark:text-gray-300">
                {entry.reason}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {entry.expires_at
                  ? formatIsoDateTime(entry.expires_at, locale)
                  : t("영구 밴", "Permanent ban", "無期限禁止")}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-4 text-center text-xs text-gray-500 dark:text-gray-400">
          {t(
            "현재 밴된 사용자가 없습니다.",
            "No active chat bans.",
            "現在禁止されたユーザーはいません。",
          )}
        </p>
      )}
      <div className="mt-3 flex justify-between gap-2">
        <button
          type="button"
          className={partyButton}
          disabled={!offset || query.isFetching}
          onClick={() => setOffset(Math.max(0, offset - 50))}
        >
          {t("이전", "Previous", "前へ")}
        </button>
        <button
          type="button"
          className={partyButton}
          disabled={
            offset >= 10000 || query.data?.length !== 50 || query.isFetching
          }
          onClick={() => setOffset(offset + 50)}
        >
          {t("다음", "Next", "次へ")}
        </button>
      </div>
    </section>
  );
}
