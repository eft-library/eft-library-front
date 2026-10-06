"use client";

import type { Locale } from "@/i18n/config";
import type { PriceSeason } from "@/types/api/price";

const copy = {
  ko: {
    label: "시즌",
    current: "현재",
    empty: "등록된 시즌 없음",
    loading: "시즌 불러오는 중",
    error: "시즌을 불러오지 못했습니다",
    retry: "다시 시도",
  },
  en: {
    label: "Season",
    current: "Current",
    empty: "No seasons available",
    loading: "Loading seasons",
    error: "Failed to load seasons",
    retry: "Retry",
  },
  ja: {
    label: "シーズン",
    current: "現在",
    empty: "シーズンがありません",
    loading: "シーズンを読み込み中",
    error: "シーズンを読み込めませんでした",
    retry: "再試行",
  },
};

export function SeasonSelect({
  locale,
  seasons,
  value,
  onChange,
  isLoading,
  isError,
  onRetry,
}: {
  locale: Locale;
  seasons: PriceSeason[];
  value: string | undefined;
  onChange: (value: string) => void;
  isLoading: boolean;
  isError: boolean;
  onRetry: () => void;
}) {
  const text = copy[locale];
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 text-sm">
      <label className="flex items-center gap-2">
        <span className="font-semibold">{text.label}</span>
        <select
          value={value ?? ""}
          onChange={(event) => onChange(event.target.value)}
          disabled={isLoading || isError || !seasons.length}
          className="min-h-11 max-w-64 rounded-lg border border-gray-300 bg-white px-3 text-gray-900 focus-visible:outline-2 focus-visible:outline-orange-500 disabled:opacity-60 dark:border-gray-600 dark:bg-[#181c21] dark:text-gray-100"
        >
          {!value ? (
            <option value="">
              {isLoading ? text.loading : isError ? text.error : text.empty}
            </option>
          ) : null}
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>
              {season.name ?? season.id}
              {season.is_current ? ` (${text.current})` : ""}
            </option>
          ))}
        </select>
      </label>
      {isError ? (
        <button
          type="button"
          onClick={onRetry}
          className="rounded px-2 py-1 text-orange-700 hover:underline focus-visible:outline-2 dark:text-orange-300"
        >
          {text.retry}
        </button>
      ) : null}
    </div>
  );
}
