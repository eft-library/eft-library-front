"use client";

import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";

import { getDeploymentNoticeStatus } from "@/features/deployment-notice/api";
import type { Locale } from "@/i18n/config";
import type { DeploymentNoticeStatus } from "@/types/api/deployment-notice";

const POLL_INTERVAL_MS = 5_000;

const fallbackMessages: Record<Locale, string> = {
  ko: "곧 웹사이트 배포로 접속이 일시적으로 끊길 수 있습니다.",
  en: "The website may briefly disconnect soon due to deployment.",
  ja: "まもなくサイトのデプロイにより一時的に接続が切れる可能性があります。",
};

const noticeTitles: Record<Locale, string> = {
  ko: "배포 안내",
  en: "Deployment notice",
  ja: "デプロイのお知らせ",
};

function getLocalizedMessage(notice: DeploymentNoticeStatus, locale: Locale) {
  const localizedMessage = {
    ko: notice.messageKo,
    en: notice.messageEn,
    ja: notice.messageJa,
  }[locale]?.trim();

  return localizedMessage || fallbackMessages[locale];
}

export function DeploymentNotice({ locale }: { locale: Locale }) {
  const [notice, setNotice] = useState<DeploymentNoticeStatus | null>(null);

  useEffect(() => {
    let activeController: AbortController | null = null;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const checkStatus = async () => {
      activeController?.abort();
      activeController = new AbortController();

      try {
        const nextNotice = await getDeploymentNoticeStatus(activeController.signal);
        setNotice(nextNotice.isActive ? nextNotice : null);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        if (process.env.NODE_ENV !== "production") {
          console.warn("[deployment-notice] Failed to check status", error);
        }
      }
    };

    const stopPolling = () => {
      if (intervalId !== null) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };

    const startPolling = () => {
      stopPolling();

      if (document.visibilityState !== "visible") {
        return;
      }

      void checkStatus();
      intervalId = setInterval(() => {
        void checkStatus();
      }, POLL_INTERVAL_MS);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
        activeController?.abort();
      }
    };

    startPolling();
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      stopPolling();
      activeController?.abort();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  if (!notice) {
    return null;
  }

  return (
    <aside
      aria-atomic="true"
      aria-live="assertive"
      className="pointer-events-none fixed bottom-4 left-4 right-4 z-50 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 sm:bottom-6 sm:left-auto sm:right-6 sm:w-full sm:max-w-md"
      role="alert"
    >
      <div className="relative flex items-start gap-3.5 overflow-hidden rounded-xl border-2 border-orange-400 bg-orange-50/98 px-4 py-3.5 text-orange-950 shadow-[0_16px_40px_-12px_rgba(234,88,12,0.55)] ring-1 ring-orange-300/50 backdrop-blur dark:border-orange-500 dark:bg-[#332418]/98 dark:text-orange-50 dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] dark:ring-orange-400/30">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 bg-orange-500 dark:bg-orange-400"
        />
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm shadow-orange-700/30 dark:bg-orange-400 dark:text-orange-950">
          <AlertTriangle aria-hidden="true" className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-extrabold leading-5">
            {noticeTitles[locale]}
          </p>
          <p className="mt-0.5 text-sm font-medium leading-5 text-orange-900 dark:text-orange-100">
            {getLocalizedMessage(notice, locale)}
          </p>
        </div>
      </div>
    </aside>
  );
}
