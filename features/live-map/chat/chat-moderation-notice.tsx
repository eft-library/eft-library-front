"use client";

import { formatIsoDateTime } from "@/lib/utils/date-time";
import { partyText, type PartyLocale } from "../party/copy";
import { useLiveMapChat } from "./use-live-map-chat";

export function ChatModerationNotice({ locale }: { locale: PartyLocale }) {
  const { moderation } = useLiveMapChat();
  if (!moderation?.restricted) return null;
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <p
      role="status"
      className="mx-3 my-2 rounded-lg border border-red-300 bg-red-50 p-3 text-xs text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200"
    >
      <strong className="block">
        {t(
          "채팅 전송이 제한되었습니다. 메시지 읽기는 가능합니다.",
          "Sending chat messages is restricted. You can still read messages.",
          "チャット送信が制限されています。閲覧は可能です。",
        )}
      </strong>
      {moderation.reason && (
        <span className="mt-1 block break-words">{moderation.reason}</span>
      )}
      <span className="mt-1 block">
        {moderation.expires_at
          ? `${t("해제 예정", "Until", "解除予定")} ${formatIsoDateTime(moderation.expires_at, locale)}`
          : t(
              "관리자가 해제할 때까지",
              "Until an administrator removes the ban",
              "管理者が解除するまで",
            )}
      </span>
    </p>
  );
}
