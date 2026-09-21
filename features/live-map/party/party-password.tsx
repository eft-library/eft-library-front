"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { partyText, type PartyLocale } from "./copy";
import { partyButton } from "./party-forms";

export function PartyPassword({
  password,
  locale,
}: {
  password: string | null;
  locale: PartyLocale;
}) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  return (
    <div className="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-[#3a3d41]">
      <p className="text-xs font-semibold">
        {t(
          "입력한 방 비밀번호",
          "Entered room password",
          "入力した部屋のパスワード",
        )}
      </p>
      {password !== null ? (
        <div className="flex items-center gap-2">
          <code className="min-w-0 flex-1 select-text whitespace-pre-wrap break-all text-sm">
            {password}
          </code>
          <button
            type="button"
            className={partyButton}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(password);
                setStatus("copied");
              } catch {
                setStatus("error");
              }
            }}
          >
            {status === "copied" ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            {status === "copied"
              ? t("복사됨", "Copied", "コピー済み")
              : t("복사", "Copy", "コピー")}
          </button>
        </div>
      ) : (
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {t(
            "이 탭에 저장된 비밀번호가 없습니다. 방장에게 확인하거나 방 설정에서 새 비밀번호를 지정해 주세요.",
            "No password is saved in this tab. Ask the owner or set a new password in room settings.",
            "このタブにパスワードがありません。リーダーに確認するか部屋設定で変更してください。",
          )}
        </p>
      )}
      {password !== null && (
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t(
            "이 탭에서 마지막으로 입력한 값입니다. 다른 곳에서 변경한 비밀번호는 반영되지 않습니다.",
            "Last entered in this tab. Password changes elsewhere are not reflected here.",
            "このタブで最後に入力した値です。他の場所での変更は反映されません。",
          )}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="text-xs text-red-600 dark:text-red-400">
          {t(
            "복사하지 못했습니다. 비밀번호를 선택해 직접 복사해 주세요.",
            "Copy failed. Select the password and copy it manually.",
            "コピーできませんでした。文字を選択してコピーしてください。",
          )}
        </p>
      )}
    </div>
  );
}
