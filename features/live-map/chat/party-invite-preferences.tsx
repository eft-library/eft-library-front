"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/class-name";
import { partyText, type PartyLocale } from "../party/copy";
import { chatErrorText } from "./copy";
import { useLiveMapChat } from "./use-live-map-chat";

export function PartyInvitePreferences({ locale }: { locale: PartyLocale }) {
  const chat = useLiveMapChat();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  if (!chat.token) return null;
  const preferences = chat.invitePreferences;

  async function toggle() {
    if (!preferences || saving) return;
    setSaving(true);
    setError(null);
    try {
      await chat.setInvitePreferences(!preferences.allow_party_invites);
    } catch (failure) {
      setError(failure instanceof Error ? failure : new Error("CHAT_UNAVAILABLE"));
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="shrink-0 border-b border-gray-200 px-3 py-3 dark:border-[#3a3d41]">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold">{t("파티 초대 받기", "Receive party invites", "パーティー招待を受け取る")}</span>
        <button type="button" role="switch" aria-label={t("파티 초대 받기", "Receive party invites", "パーティー招待を受け取る")} aria-checked={preferences?.allow_party_invites ?? false} aria-busy={saving || !preferences} disabled={saving || !preferences} onClick={() => void toggle()} className={cn("inline-flex h-6 w-10 shrink-0 items-center rounded-full border p-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:focus-visible:ring-offset-[#1f2124]", preferences?.allow_party_invites ? "border-orange-500 bg-orange-500" : "border-gray-300 bg-gray-300 dark:border-gray-600 dark:bg-gray-600")}>
          <span className={cn("h-4 w-4 rounded-full bg-white shadow-sm transition-transform", preferences?.allow_party_invites ? "translate-x-4" : "translate-x-0")} />
        </button>
      </div>
      <p className="mt-2 text-[11px] leading-4 text-gray-500 dark:text-gray-400">{!preferences ? t("설정을 확인하고 있습니다.", "Checking preferences…", "設定を確認中です。") : t("끄면 받은 대기 초대도 취소됩니다.", "Turning off also cancels pending invites you received.", "オフにすると受信した保留中の招待も取り消されます。")}</p>
      {error && <p role="alert" className="mt-2 text-xs text-red-700 dark:text-red-300">{chatErrorText(error, locale)}</p>}
      {!preferences && <button type="button" onClick={() => void chat.refreshStatus().catch((failure: unknown) => setError(failure instanceof Error ? failure : new Error("CHAT_UNAVAILABLE")))} className="mt-1 text-xs text-orange-700 underline dark:text-orange-300">{t("다시 확인", "Retry", "再確認")}</button>}
    </div>
  );
}
