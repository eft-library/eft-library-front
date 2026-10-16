"use client";

import { signIn } from "next-auth/react";
import { useWsStore } from "@/store/ws-store";
import { cn } from "@/lib/utils/class-name";
import { partyText, type PartyLocale } from "../party/copy";

export function LocationConnectionNotice({ locale }: { locale: PartyLocale }) {
  const status = useWsStore((state) => state.locationConnection);
  const connectionId = useWsStore((state) => state.locationConnectionId);
  const screenshot = useWsStore((state) => state.latestLocation);
  const log = useWsStore((state) => state.latestLogLocation);
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  if (status === "disabled") return null;
  const restored = screenshot?.metadata?.replayed ? screenshot : log?.metadata?.replayed ? log : null;
  const observedAt = log?.metadata?.replayed ? Date.parse(log.value.observed_at) : restored?.metadata?.publishedAt;
  const time = observedAt !== undefined && Number.isFinite(observedAt)
    ? new Intl.DateTimeFormat(locale, { hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(observedAt)
    : null;
  return (
    <div data-location-connection-id={connectionId ?? undefined} data-location-event-id={(screenshot ?? log)?.metadata?.eventId} data-location-request-id={(screenshot ?? log)?.metadata?.requestId} className={cn("flex shrink-0 flex-wrap items-center gap-x-3 gap-y-1 border-b px-3 py-1.5 text-xs sm:px-4", status === "ready" ? "border-gray-200 bg-white text-gray-600 dark:border-[#3a3d41] dark:bg-[#25282c] dark:text-gray-300" : "border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-200")}>
      <p role="status" className="flex items-center gap-1.5">
        <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", status === "ready" ? "bg-emerald-500" : "bg-amber-500")} />
        {status === "ready" ? t("위치 수신 준비 완료", "Ready to receive locations", "位置受信の準備完了") : status === "auth-required" ? t("위치 연결 인증이 필요합니다. 다시 로그인해 주세요.", "Location authentication required. Sign in again.", "位置接続の認証が必要です。再ログインしてください。") : status === "reconnecting" ? t("위치 연결 복구 중", "Recovering location connection…", "位置接続を復旧中") : t("위치 수신 연결 확인 중", "Preparing location connection…", "位置受信接続を確認中")}
      </p>
      {restored && <p className="text-gray-500 dark:text-gray-400">{t("이전 위치 복원", "Previous location restored", "以前の位置を復元")}{time ? ` · ${time}` : ""}</p>}
      {status === "auth-required" && <button type="button" onClick={() => void signIn("google")} className="rounded font-semibold underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500">{t("다시 로그인", "Sign in again", "再ログイン")}</button>}
    </div>
  );
}
