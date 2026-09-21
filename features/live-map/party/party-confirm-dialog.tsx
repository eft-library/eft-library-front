"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Crown,
  LoaderCircle,
  LogOut,
  Trash2,
  UserMinus,
  X,
} from "lucide-react";
import { partyErrorText, partyText, type PartyLocale } from "./copy";
import { partyButton } from "./party-forms";

export type PartyConfirmKind =
  | "leave"
  | "close"
  | "kick"
  | "transfer"
  | "delete";

export function PartyConfirmDialog({
  kind,
  message,
  locale,
  error,
  onConfirm,
  onDismiss,
}: {
  kind: PartyConfirmKind;
  message: string;
  locale: PartyLocale;
  error: Error | null;
  onConfirm: () => Promise<boolean>;
  onDismiss: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const pendingRef = useRef(false);
  const [pending, setPending] = useState(false);
  const [failed, setFailed] = useState(false);
  const titleId = useId();
  const descriptionId = useId();
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  const title = {
    leave: t("파티 퇴장", "Leave party", "パーティーから退出"),
    close: t("파티 종료", "Close room", "パーティー終了"),
    kick: t("참여자 강퇴", "Remove member", "参加者を退出させる"),
    transfer: t("방장 양도", "Transfer ownership", "リーダーを譲渡"),
    delete: t("공유 마커 삭제", "Delete shared marker", "共有マーカーを削除"),
  }[kind];
  const confirmLabel = {
    leave: t("퇴장하기", "Leave party", "退出する"),
    close: t("종료하기", "Close room", "終了する"),
    kick: t("강퇴하기", "Remove member", "退出させる"),
    transfer: t("양도하기", "Transfer", "譲渡する"),
    delete: t("삭제하기", "Delete marker", "削除する"),
  }[kind];
  const Icon = {
    leave: LogOut,
    close: Trash2,
    kick: UserMinus,
    transfer: Crown,
    delete: Trash2,
  }[kind];
  const destructive = kind === "close" || kind === "kick" || kind === "delete";

  useEffect(() => {
    const dialog = dialogRef.current;
    const previous = document.activeElement;
    dialog?.showModal();
    cancelRef.current?.focus();
    return () => {
      dialog?.close();
      if (previous instanceof HTMLElement && previous.isConnected)
        previous.focus();
    };
  }, []);

  async function submit() {
    if (pendingRef.current) return;
    pendingRef.current = true;
    setPending(true);
    setFailed(false);
    try {
      if (await onConfirm()) onDismiss();
      else setFailed(true);
    } catch {
      setFailed(true);
    } finally {
      pendingRef.current = false;
      setPending(false);
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      role="alertdialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-busy={pending}
      onCancel={(event) => {
        event.preventDefault();
        if (!pendingRef.current) onDismiss();
      }}
      onKeyDown={(event) => event.stopPropagation()}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-sm overflow-y-auto rounded-xl border border-gray-200 bg-white p-0 text-gray-900 shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-sm dark:border-[#3a3d41] dark:bg-[#1f2124] dark:text-gray-100"
    >
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-3">
          <span
            className={`grid h-11 w-11 place-items-center rounded-full ${destructive ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400" : "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400"}`}
          >
            <Icon aria-hidden="true" className="h-5 w-5" />
          </span>
          <button
            type="button"
            disabled={pending}
            aria-label={t("닫기", "Close", "閉じる")}
            onClick={onDismiss}
            className={`${partyButton} !min-h-8 !px-2`}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <h2 id={titleId} className="text-lg font-bold">
          {title}
        </h2>
        <p
          id={descriptionId}
          className="mt-2 break-words text-sm leading-6 text-gray-600 dark:text-gray-300"
        >
          {message}
        </p>
        {failed && (
          <p
            role="alert"
            className="mt-3 rounded-md bg-red-50 p-3 text-xs leading-5 text-red-800 dark:bg-red-500/10 dark:text-red-200"
          >
            {error
              ? partyErrorText(error, locale)
              : t(
                  "처리하지 못했습니다. 다시 시도해 주세요.",
                  "Could not complete the action. Please try again.",
                  "処理できませんでした。再試行してください。",
                )}
          </p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-2">
          <button
            ref={cancelRef}
            type="button"
            disabled={pending}
            className={partyButton}
            onClick={onDismiss}
          >
            {t("취소", "Cancel", "キャンセル")}
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => void submit()}
            className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-60 dark:focus-visible:ring-offset-[#1f2124] ${destructive ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500 dark:bg-red-600 dark:hover:bg-red-500" : "bg-orange-600 hover:bg-orange-700 focus-visible:ring-orange-500 dark:bg-orange-600 dark:hover:bg-orange-500"}`}
          >
            {pending && (
              <LoaderCircle
                aria-hidden="true"
                className="h-4 w-4 animate-spin motion-reduce:animate-none"
              />
            )}
            {pending ? t("처리 중…", "Processing…", "処理中…") : confirmLabel}
          </button>
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
