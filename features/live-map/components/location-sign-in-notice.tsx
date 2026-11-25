"use client";

import { useState } from "react";
import { LogIn, X } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import { useAppStore } from "@/components/providers/app-store-provider";
import { partyText } from "../party/copy";

export function LocationSignInNotice() {
  const { status } = useSession();
  const locale = useAppStore((state) => state.uiLocale);
  const [dismissed, setDismissed] = useState(false);
  if (status !== "unauthenticated" || dismissed) return null;

  const t = (ko: string, en: string, ja: string) => partyText(locale, ko, en, ja);
  return (
    <aside className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-40 rounded-xl border border-amber-500/50 bg-surface p-3 text-foreground shadow-xl sm:left-auto sm:right-4 sm:w-96">
      <div className="flex items-start justify-between gap-2">
        <div role="status">
          <p className="font-semibold">{t("자동 위치 수신에는 로그인이 필요해요", "Sign in to receive your location automatically", "位置の自動受信にはログインが必要です")}</p>
          <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
            {t("Google로 로그인하면 내 위치를 지도에서 확인할 수 있어요.", "Sign in with Google to see your position on the map.", "Googleでログインすると地図上で自分の位置を確認できます。")}
          </p>
        </div>
        <button type="button" onClick={() => setDismissed(true)}
          aria-label={t("로그인 안내 닫기", "Dismiss sign-in notice", "ログイン案内を閉じる")}
          className="flex size-8 shrink-0 items-center justify-center rounded-lg hover:bg-surface-elevated focus-visible:outline-2 focus-visible:outline-accent">
          <X aria-hidden="true" className="size-4" />
        </button>
      </div>
      <button type="button" onClick={() => void signIn("google", { callbackUrl: window.location.href })}
        className="mt-3 inline-flex min-h-9 items-center gap-2 rounded-lg bg-orange-700 px-3 text-sm font-semibold text-white hover:bg-orange-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent dark:bg-orange-300 dark:text-orange-950 dark:hover:bg-orange-200">
        <LogIn aria-hidden="true" className="size-4" />
        {t("Google로 로그인", "Sign in with Google", "Googleでログイン")}
      </button>
    </aside>
  );
}
