import Image from "next/image";

import type { Locale } from "@/i18n/config";
import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { ProgressItemResponse } from "@/types/api/minigame";
import type { RngItemEntry, RngRankEntry } from "@/types/api/price";

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

function ItemCard({
  item,
  locale,
}: {
  item: RngItemEntry;
  locale: Locale;
}) {
  return (
    <article className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
      <div className="relative mx-auto h-24 w-24 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f222a]">
        <Image src={item.image} alt={getLocalizedName(item, locale)} fill className="object-contain p-2" />
      </div>
      <h3 className="mt-4 line-clamp-2 text-sm font-semibold">{getLocalizedName(item, locale)}</h3>
      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">{item.category}</p>
      <p className="mt-3 text-lg font-bold">
        {(item.flea_market_price ?? 0).toLocaleString()}
      </p>
    </article>
  );
}

function ProgressColumn({
  title,
  items,
  locale,
}: {
  title: string;
  items: ProgressItemResponse["allKappaItemList"];
  locale: Locale;
}) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-[#1f222a]">
          {items.length}
        </span>
      </div>
      <div className="mt-4 grid gap-3">
        {items.slice(0, 10).map((entry) => (
          <div
            key={entry.id}
            className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-3 py-3 dark:border-gray-700 dark:bg-[#1f222a]"
          >
            <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-[#252830]">
              <Image
                src={entry.item.image}
                alt={getLocalizedName(entry.item, locale)}
                fill
                className="object-contain p-1.5"
              />
            </div>
            <div className="min-w-0">
              <p className="line-clamp-2 text-sm font-medium">
                {getLocalizedName(entry.item, locale)}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formatIsoDateTime(entry.update_time, locale)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function MinigamePage({
  items,
  rankEntries,
  progress,
  locale,
}: {
  items: RngItemEntry[];
  rankEntries: RngRankEntry[];
  progress: ProgressItemResponse;
  locale: Locale;
}) {
  const topItems = [...items]
    .sort((left, right) => (right.flea_market_price ?? 0) - (left.flea_market_price ?? 0))
    .slice(0, 12);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            Minigame
          </p>
          <h1 className="mt-2 text-3xl font-bold">RNG Item Snapshot</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            현재 V3 minigame 응답은 RNG 아이템 전체 목록과 진행 컬렉션이 중심입니다. 주간 랭킹은
            아직 빈 배열이라 빈 상태를 그대로 보여줍니다.
          </p>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-semibold">Top RNG Items</h2>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium dark:bg-[#1f222a]">
              {items.length} items
            </span>
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {topItems.map((item) => (
              <ItemCard key={item.id} item={item} locale={locale} />
            ))}
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-2">
          <ProgressColumn title="Kappa Collection" items={progress.allKappaItemList} locale={locale} />
          <ProgressColumn title="Rebirth Collection" items={progress.allRebirthList} locale={locale} />
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-[#252830]">
          <h2 className="text-lg font-semibold">Weekly Ranking</h2>
          {rankEntries.length === 0 ? (
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              현재 `/api/minigame/v3/rng-item/all-rank` 응답이 빈 배열이라 랭킹 보드는 비워둡니다.
            </p>
          ) : null}
        </section>
      </div>
    </main>
  );
}
