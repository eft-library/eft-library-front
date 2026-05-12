"use client";

import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { BossSelectorEntry } from "@/types/api/boss";

export function BossSelector({
  bossId,
  entries,
  label,
  locale,
}: {
  bossId: string;
  entries: BossSelectorEntry[];
  label: string;
  locale: Locale;
}) {
  const router = useRouter();

  return (
    <label className="flex flex-col gap-2 text-sm text-gray-500 dark:text-gray-300 sm:flex-row sm:items-center">
      <span className="shrink-0">{label}</span>
      <select
        value={bossId}
        onChange={(event) => {
          router.push(`/boss/${event.target.value}`);
        }}
        className="h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm font-medium text-gray-900 outline-none transition hover:border-orange-300 focus:border-orange-400 dark:border-gray-600 dark:bg-[#25282c] dark:text-white dark:hover:border-gray-500 sm:w-36"
      >
        {entries.map((entry) => (
          <option key={entry.id} value={entry.normalized_name}>
            {pickLocalizedText(entry, locale)}
          </option>
        ))}
      </select>
    </label>
  );
}
