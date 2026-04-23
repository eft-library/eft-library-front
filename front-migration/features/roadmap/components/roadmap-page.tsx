import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { RoadmapResponse, RoadmapTraderNode } from "@/types/api/roadmap";

function getLocalizedName(
  value: { name_en: string; name_ko: string; name_ja: string },
  locale: Locale,
) {
  const localized = pickLocalizedField(
    value as unknown as Record<string, unknown>,
    locale,
    "name",
  );

  return typeof localized === "string" && localized ? localized : value.name_en;
}

export function RoadmapPage({
  roadmap,
  locale,
}: {
  roadmap: RoadmapResponse;
  locale: Locale;
}) {
  const traders = [...roadmap.node_info].sort((left, right) => left.sort_order - right.sort_order);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            Roadmap
          </p>
          <h1 className="mt-2 text-3xl font-bold">Quest Progress Tree</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            V3 roadmap는 트레이더 노드와 퀘스트 의존성을 함께 내려줍니다. 우선은 React Flow 없이
            트레이더별 진행 순서와 선행 퀘스트 정보를 읽기 좋게 재구성했습니다.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-gray-500 dark:text-gray-400">
            <span>{roadmap.node_info.length} traders</span>
            <span>{roadmap.edge_info.length} edges</span>
          </div>
        </section>

        <div className="grid gap-6">
          {traders.map((trader) => (
            <TraderSection key={trader.id} trader={trader} locale={locale} />
          ))}
        </div>
      </div>
    </main>
  );
}

function TraderSection({
  trader,
  locale,
}: {
  trader: RoadmapTraderNode;
  locale: Locale;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
      <div className="flex items-center gap-4">
        <img
          src={trader.image}
          alt={getLocalizedName(trader, locale)}
          className="h-16 w-16 rounded-xl border border-gray-200 bg-gray-50 object-cover dark:border-gray-700 dark:bg-[#1f222a]"
        />
        <div>
          <h2 className="text-2xl font-semibold">{getLocalizedName(trader, locale)}</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {trader.quests.length} quests
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {trader.quests.map((quest) => (
          <article
            key={quest.id}
            className="rounded-xl border border-gray-100 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#1f222a]"
          >
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                Lv.{quest.min_player_level}
              </span>
              <span className="rounded-full bg-gray-200 px-2.5 py-1 text-xs font-medium dark:bg-[#252830]">
                {quest.kappa_required ? "Kappa" : "Optional"}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold">{getLocalizedName(quest, locale)}</h3>
            <p className="mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
              {quest.normalized_name}
            </p>
            <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
              <p>Requires: {quest.task_requirements.length}</p>
              <p>Unlocks: {quest.task_next.length}</p>
              <p>
                Position: {quest.total_x_coordinate}, {quest.total_y_coordinate}
              </p>
            </div>
            <Link
              href={`/quest/detail/${quest.normalized_name}`}
              className="mt-4 inline-flex text-sm font-medium text-orange-500 hover:text-orange-400"
            >
              Open quest detail
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
