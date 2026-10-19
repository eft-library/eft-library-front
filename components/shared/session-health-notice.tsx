"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import type { Locale } from "@/i18n/config";
import { useWsStore } from "@/store/ws-store";

const copy = {
  ko: { expired: "로그인이 만료되어 위치를 받을 수 없습니다. 다시 로그인해주세요.", temporary: "로그인 상태를 확인하지 못했습니다. 연결을 복구하고 있습니다.", login: "다시 로그인", retry: "다시 확인", checking: "확인 중…" },
  en: { expired: "Your sign-in has expired. Sign in again to receive your location.", temporary: "We could not verify your sign-in. Reconnecting…", login: "Sign in again", retry: "Retry", checking: "Checking…" },
  ja: { expired: "ログインの有効期限が切れました。位置を受信するには再ログインしてください。", temporary: "ログイン状態を確認できませんでした。接続を復旧しています。", login: "再ログイン", retry: "再確認", checking: "確認中…" },
};

export function SessionHealthNotice({ locale }: { locale: Locale }) {
  const { data: session, status, update } = useSession();
  const connection = useWsStore((state) => state.locationConnection);
  const [pending, setPending] = useState(false);
  const [retryFailed, setRetryFailed] = useState(false);
  const expired = session?.error === "ReauthenticationRequired" || (status === "authenticated" && connection === "auth-required");
  if (!expired && !session?.error) return null;
  const text = copy[locale];
  const retry = async () => {
    setPending(true);
    setRetryFailed(false);
    try { if (!await update({ refreshAccessToken: true })) setRetryFailed(true); }
    catch { setRetryFailed(true); }
    finally { setPending(false); }
  };
  return (
    <div role="status" aria-live="polite" className="border-b border-amber-500/40 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:bg-amber-950/40 dark:text-amber-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        <p>{expired ? text.expired : text.temporary}{retryFailed ? ` ${text.retry}` : ""}</p>
        <button type="button" disabled={pending} onClick={() => expired
          ? void signIn("google", { callbackUrl: window.location.href }) : void retry()}
          className="rounded-md border border-current px-3 py-1.5 font-medium hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 dark:hover:bg-amber-900/50">
          {pending ? text.checking : expired ? text.login : text.retry}
        </button>
      </div>
    </div>
  );
}
