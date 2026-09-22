"use client";

import { useState } from "react";
import { Copy, Check, Eye, EyeOff } from "lucide-react";
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
  const [visible, setVisible] = useState(false);
  const t = (ko: string, en: string, ja: string) =>
    partyText(locale, ko, en, ja);
  if (password !== null) {
    return (
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg border border-gray-200 px-2.5 py-2 dark:border-[#3a3d41]">
        <span className="text-xs font-semibold">
          {t(
            "방 비밀번호",
            "Room password",
            "部屋のパスワード",
          )}
        </span>
        <code
          aria-label={t("방 비밀번호", "Room password", "部屋のパスワード")}
          className="min-w-8 flex-1 select-text whitespace-nowrap text-sm"
        >
          {visible ? password : "••••"}
        </code>
        <div className="ml-auto flex gap-1">
          <button
            type="button"
            className={partyButton}
            aria-pressed={visible}
            aria-label={
              visible
                ? t("비밀번호 숨기기", "Hide password", "パスワードを隠す")
                : t("비밀번호 보기", "Show password", "パスワードを表示")
            }
            onClick={() => setVisible((current) => !current)}
          >
            {visible ? (
              <EyeOff className="h-3.5 w-3.5" />
            ) : (
              <Eye className="h-3.5 w-3.5" />
            )}
          </button>
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
        {status === "error" && (
          <p
            role="alert"
            className="w-full text-xs text-red-600 dark:text-red-400"
          >
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

  return (
    <div className="space-y-1 rounded-lg border border-gray-200 px-2.5 py-2 dark:border-[#3a3d41]">
      <p className="text-xs font-semibold">
        {t(
          "방 비밀번호",
          "Room password",
          "部屋のパスワード",
        )}
      </p>
      <p className="text-xs text-gray-600 dark:text-gray-300">
        {t(
          "이 탭에 저장된 비밀번호가 없습니다. 방장에게 확인하거나 방 설정에서 새 비밀번호를 지정해 주세요.",
          "No password is saved in this tab. Ask the owner or set a new password in room settings.",
          "このタブにパスワードがありません。リーダーに確認するか部屋設定で変更してください。",
        )}
      </p>
    </div>
  );
}
