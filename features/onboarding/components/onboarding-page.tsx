"use client";

import { useMemo, useState } from "react";
import { signIn, useSession } from "next-auth/react";

import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { Locale } from "@/i18n/config";

const copyByLocale = {
  ko: {
    title: "닉네임 설정",
    description: "커뮤니티와 마이페이지에서 사용할 닉네임을 먼저 설정합니다.",
    subDescription: "닉네임은 30일에 한 번만 변경할 수 있습니다.",
    nicknameLabel: "닉네임",
    placeholder: "닉네임을 입력하세요",
    checkDuplicate: "중복 확인",
    checking: "확인 중...",
    submit: "닉네임 저장",
    signIn: "로그인 후 진행",
    signInNotice: "온보딩은 로그인된 사용자만 진행할 수 있습니다.",
    duplicateError: "이미 사용 중인 닉네임입니다.",
    available: "사용 가능한 닉네임입니다.",
    resultTitle: "처리 결과",
  },
  en: {
    title: "Set Your Nickname",
    description: "Choose the nickname you want to use across community and profile pages.",
    subDescription: "Nicknames can only be changed once every 30 days.",
    nicknameLabel: "Nickname",
    placeholder: "Enter your nickname",
    checkDuplicate: "Check availability",
    checking: "Checking...",
    submit: "Save nickname",
    signIn: "Continue with login",
    signInNotice: "You need to sign in before onboarding.",
    duplicateError: "This nickname is already in use.",
    available: "This nickname is available.",
    resultTitle: "Result",
  },
  ja: {
    title: "ニックネーム設定",
    description: "コミュニティやマイページで使用するニックネームを先に設定します。",
    subDescription: "ニックネームは30日に1回だけ変更できます。",
    nicknameLabel: "ニックネーム",
    placeholder: "ニックネームを入力してください",
    checkDuplicate: "重複確認",
    checking: "確認中...",
    submit: "ニックネーム保存",
    signIn: "ログインして続行",
    signInNotice: "オンボーディングはログイン後に利用できます。",
    duplicateError: "すでに使用されているニックネームです。",
    available: "使用可能なニックネームです。",
    resultTitle: "結果",
  },
} as const;

function validateNickname(nickname: string) {
  const errors: string[] = [];

  if (nickname.length < 2) {
    errors.push("min-length");
  } else if (nickname.length > 12) {
    errors.push("max-length");
  }

  if (nickname.includes(" ")) {
    errors.push("space");
  }

  const allowedPattern = /^[가-힣a-zA-Z0-9_-]+$/;
  if (nickname && !allowedPattern.test(nickname)) {
    errors.push("pattern");
  }

  const forbiddenWords = ["관리자", "운영자", "admin", "moderator", "시발", "개새끼"];
  const hasForbiddenWord = forbiddenWords.some((word) =>
    nickname.toLowerCase().includes(word.toLowerCase()),
  );

  if (hasForbiddenWord) {
    errors.push("forbidden");
  }

  return errors;
}

function getValidationMessage(code: string, locale: Locale) {
  const messages = {
    "min-length": {
      ko: "닉네임은 최소 2글자 이상이어야 합니다.",
      en: "Nickname must be at least 2 characters long.",
      ja: "ニックネームは2文字以上である必要があります。",
    },
    "max-length": {
      ko: "닉네임은 최대 12글자까지 가능합니다.",
      en: "Nickname can be at most 12 characters long.",
      ja: "ニックネームは12文字以内で入力してください。",
    },
    space: {
      ko: "띄어쓰기는 사용할 수 없습니다.",
      en: "Spaces are not allowed.",
      ja: "スペースは使用できません。",
    },
    pattern: {
      ko: "한글, 영문, 숫자, _, - 만 사용할 수 있습니다.",
      en: "Use only Korean, English letters, numbers, underscores, or hyphens.",
      ja: "韓国語、英字、数字、_、- のみ使用できます。",
    },
    forbidden: {
      ko: "사용할 수 없는 단어가 포함되어 있습니다.",
      en: "The nickname contains a forbidden word.",
      ja: "使用できない単語が含まれています。",
    },
  } as const;

  return messages[code as keyof typeof messages]?.[locale] ?? code;
}

export function OnboardingPage({ locale }: { locale: Locale }) {
  const copy = copyByLocale[locale];
  const { data: session, status, update } = useSession();

  const [nickname, setNickname] = useState("");
  const [duplicateState, setDuplicateState] = useState<"idle" | "available" | "duplicate">(
    "idle",
  );
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validationErrors = useMemo(() => validateNickname(nickname), [nickname]);
  const isValid = validationErrors.length === 0 && nickname.length >= 2 && nickname.length <= 12;

  async function handleCheckDuplicate() {
    if (!session?.accessToken || !isValid) {
      return;
    }

    try {
      setIsChecking(true);
      setErrorMessage(null);

      const data = await authenticatedApiRequest<{ result: number }>(
        apiEndpoints.userCheckNicknameDuplicate,
        {
          accessToken: session.accessToken,
          method: "POST",
          body: JSON.stringify({ nickname }),
        },
      );

      setDuplicateState(data.result === 0 ? "available" : "duplicate");
    } catch {
      setErrorMessage(copy.duplicateError);
      setDuplicateState("duplicate");
    } finally {
      setIsChecking(false);
    }
  }

  async function handleSubmit() {
    if (!session?.accessToken || !isValid || duplicateState !== "available") {
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      const data = await authenticatedApiRequest<{
        success: boolean;
        ko: string;
        en: string;
        jp?: string;
      }>(apiEndpoints.userUpdateNickname, {
        accessToken: session.accessToken,
        method: "POST",
        body: JSON.stringify({ nickname }),
      });

      const message = locale === "ja" ? data.jp ?? data.en : data[locale];
      setResultMessage(message);

      if (data.success) {
        await update({
          ...session,
          userInfo: {
            ...session.userInfo,
            nickname,
          },
        });
      }
    } catch {
      setErrorMessage(copy.duplicateError);
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status !== "authenticated" || !session?.accessToken) {
    return (
      <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
        <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-12 sm:px-6 lg:px-8">
          <section className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <h1 className="text-2xl font-bold">{copy.title}</h1>
            <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
              {copy.signInNotice}
            </p>
            <button
              type="button"
              onClick={() => signIn("google")}
              className="mt-6 inline-flex rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400"
            >
              {copy.signIn}
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-2xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="w-full rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h1 className="text-2xl font-bold">{copy.title}</h1>

          <div className="mt-8">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {copy.nicknameLabel}
            </label>
            <input
              value={nickname}
              onChange={(event) => {
                setNickname(event.target.value);
                setDuplicateState("idle");
                setResultMessage(null);
              }}
              maxLength={12}
              placeholder={copy.placeholder}
              className="mt-2 h-11 w-full rounded-lg border border-gray-200 bg-white px-4 text-sm outline-none transition focus:border-orange-400 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-white"
            />
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">{nickname.length}/12</div>
          </div>

          {validationErrors.length > 0 ? (
            <div className="mt-4 space-y-2">
              {validationErrors.map((error) => (
                <p key={error} className="text-sm text-red-500">
                  {getValidationMessage(error, locale)}
                </p>
              ))}
            </div>
          ) : null}

          {duplicateState === "duplicate" ? (
            <p className="mt-4 text-sm text-red-500">{copy.duplicateError}</p>
          ) : null}
          {duplicateState === "available" ? (
            <p className="mt-4 text-sm text-emerald-500">{copy.available}</p>
          ) : null}
          {errorMessage ? <p className="mt-4 text-sm text-red-500">{errorMessage}</p> : null}

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheckDuplicate}
              disabled={!isValid || isChecking}
              className="rounded-lg border border-orange-400 px-4 py-2 text-sm font-semibold text-orange-500 transition hover:bg-orange-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400 dark:hover:bg-orange-500/10 dark:disabled:border-gray-700"
            >
              {isChecking ? copy.checking : copy.checkDuplicate}
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isValid || duplicateState !== "available" || isSubmitting}
              className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:bg-gray-300 dark:disabled:bg-gray-700"
            >
              {copy.submit}
            </button>
          </div>

          {resultMessage ? (
            <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#252830]">
              <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                {copy.resultTitle}
              </div>
              <p className="mt-2 text-sm">{resultMessage}</p>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
