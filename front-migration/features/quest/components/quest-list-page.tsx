import Link from "next/link";

import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { QuestListWithTraderResponse } from "@/types/api/quest";

const copyByLocale = {
  ko: {
    title: "퀘스트",
    description: "트레이더별 퀘스트 목록을 V3 기준으로 확인할 수 있습니다.",
    minLevel: "최소 레벨",
    kappa: "Kappa",
  },
  en: {
    title: "Quest",
    description: "Browse trader quest lists based on the V3 quest data.",
    minLevel: "Min level",
    kappa: "Kappa",
  },
  ja: {
    title: "クエスト",
    description: "トレーダー別のクエスト一覧を V3 データ基準で確認できます。",
    minLevel: "最低レベル",
    kappa: "Kappa",
  },
} as const;

export function QuestListPage({
  traderId,
  data,
  locale,
}: {
  traderId: string;
  data: QuestListWithTraderResponse;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">{copy.title}</p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{copy.title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {data.trader_list.map((trader) => (
              <Link
                key={trader.id}
                href={`/quest/${trader.normalized_name}`}
                className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                  trader.normalized_name === traderId
                    ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                    : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200"
                }`}
              >
                {String(
                  pickLocalizedField(trader as unknown as Record<string, unknown>, locale, "name") ??
                    trader.name_en,
                )}
              </Link>
            ))}
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {data.quest_list.map((quest) => {
            const name = String(
              pickLocalizedField(quest as unknown as Record<string, unknown>, locale, "name") ??
                quest.name_en,
            );

            return (
              <Link
                key={quest.id}
                href={`/quest/detail/${quest.normalized_name}`}
                className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:border-orange-300 dark:border-gray-700/50 dark:bg-gray-800/30 dark:hover:border-orange-400"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  {quest.kappa_required ? (
                    <span className="rounded-full bg-orange-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                      {copy.kappa}
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                  {copy.minLevel}: {quest.min_player_level ?? "-"}
                </p>
                <p className="mt-2 font-mono text-xs text-gray-500 dark:text-gray-400">
                  {quest.normalized_name}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}
