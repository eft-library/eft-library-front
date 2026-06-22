import Image from "next/image";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { RichHtmlImageViewer } from "@/components/shared/rich-html-image-viewer";
import type { Locale } from "@/i18n/config";
import { pickLocalizedField, pickLocalizedText } from "@/lib/utils/localized-text";
import type { getBossPageCopy } from "@/features/boss/config";
import type {
  BossCharacter,
  BossDetailResponse,
  BossItemEntry,
  BossSpawnEntry,
} from "@/types/api/boss";

import { BossFollowerSection } from "./boss-follower-section";
import { BossHealthSection } from "./boss-health-section";
import { BossItemGrid } from "./boss-item-grid";
import { BossSelector } from "./boss-selector";

interface BossPageProps {
  bossId: string;
  bossData: BossDetailResponse;
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}

function formatPercent(value: number) {
  return `${Math.round(value * 100)} %`;
}

function getSortedSpawns(spawns: BossSpawnEntry[]) {
  return [...spawns].sort((a, b) => b.spawn_chance - a.spawn_chance);
}

function normalizeGuideHtml(value: unknown) {
  return typeof value === "string" ? value.replaceAll('\\"', '"') : "";
}

function BossProfileSummary({
  boss,
  spawns,
  followers,
  locale,
  labels,
}: {
  boss: BossCharacter;
  spawns: BossSpawnEntry[];
  followers: BossCharacter[];
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}) {
  const bossName = pickLocalizedText(boss, locale);
  const sortedSpawns = getSortedSpawns(spawns);

  return (
    <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-[#33404c] dark:bg-[#20252b]">
      <div className="grid gap-0 lg:grid-cols-[360px_minmax(0,1fr)]">
        <div className="flex flex-col gap-5 border-b border-gray-200 p-6 dark:border-[#33404c] sm:flex-row sm:items-center lg:flex-col lg:items-start lg:border-b-0 lg:border-r">
          <Image
            src={boss.image}
            alt={bossName}
            width={160}
            height={160}
            className="h-28 w-28 rounded-lg object-cover shadow-sm sm:h-32 sm:w-32"
            priority
          />

          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase text-orange-500">
              {labels.pageTitle}
            </p>
            <h2 className="mt-2 text-3xl font-bold">{bossName}</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300">
              {boss.faction ?? "-"}
            </p>

            <div className="mt-5 inline-flex items-end gap-2 rounded-lg bg-orange-50 px-4 py-3 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
              <span className="text-xs font-semibold uppercase">
                {labels.totalHealthLabel}
              </span>
              <span className="text-3xl font-bold leading-none">
                {boss.health_total}
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6 lg:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)]">
          <div>
            <div className="flex items-center justify-between gap-3 border-b border-gray-200 pb-3 dark:border-[#33404c]">
              <h3 className="text-base font-bold">{labels.spawnLabel}</h3>
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {labels.spawnRateLabel}
              </span>
            </div>

            <div className="mt-3 grid gap-2">
              {sortedSpawns.length > 0 ? (
                sortedSpawns.map((spawn, index) => (
                  <div
                    key={`${spawn.name_en}-${spawn.spawn_chance}-${index}`}
                    className="flex items-center justify-between gap-4 rounded-md bg-gray-50 px-4 py-3 dark:bg-[#1d2228]"
                  >
                    <span className="font-semibold">
                      {pickLocalizedText(spawn, locale)}
                    </span>
                    <span className="font-mono text-sm text-gray-500 dark:text-gray-300">
                      {formatPercent(spawn.spawn_chance)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="rounded-md bg-gray-50 px-4 py-3 text-sm text-gray-500 dark:bg-[#1d2228] dark:text-gray-400">
                  {labels.noSpawnLabel}
                </p>
              )}
            </div>
          </div>

          <div>
            <h3 className="border-b border-gray-200 pb-3 text-base font-bold dark:border-[#33404c]">
              {labels.followersLabel}
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {followers.length > 0 ? (
                followers.map((follower) => (
                  <span
                    key={follower.id}
                    className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-semibold dark:border-[#33404c] dark:bg-[#1d2228]"
                  >
                    {pickLocalizedText(follower, locale)}
                  </span>
                ))
              ) : (
                <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 dark:border-[#33404c] dark:bg-[#1d2228] dark:text-gray-400">
                  -
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BossLocationGuide({
  guideHtml,
  bossName,
  labels,
}: {
  guideHtml: unknown;
  bossName: string;
  labels: ReturnType<typeof getBossPageCopy>;
}) {
  const normalizedGuideHtml = normalizeGuideHtml(guideHtml);

  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm dark:border-[#33404c] dark:bg-[#20252b] dark:text-white sm:p-7">
      <h2 className="text-2xl font-bold">{labels.locationLabel}</h2>
      {normalizedGuideHtml ? (
        <RichHtmlImageViewer
          html={normalizedGuideHtml}
          imageAltFallback={bossName}
          className="mt-8 [&_img]:mt-4 [&_img]:h-auto [&_img]:w-full [&_img]:rounded-none"
        />
      ) : (
        <p className="mt-6 text-sm text-gray-400">{labels.noGuideLabel}</p>
      )}
    </section>
  );
}

export function BossPage({ bossId, bossData, locale, labels }: BossPageProps) {
  const bossName = pickLocalizedText(bossData.boss, locale);
  const guideHtml = pickLocalizedField(
    bossData.boss as unknown as Record<string, unknown>,
    locale,
    "guide",
  );
  const followerItemsByBossId = Object.fromEntries(
    bossData.followers_item.map((group) => [group.boss_id, group.items]),
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <h1 className="text-center text-3xl font-bold sm:text-4xl">
          {labels.pageTitle}
        </h1>
        <HorizontalAdBanner />

        <div className="mt-4">
          <BossSelector
            bossId={bossId}
            entries={bossData.boss_selector}
            label={labels.selectorLabel}
            locale={locale}
          />
        </div>

        <BossProfileSummary
          boss={bossData.boss}
          spawns={bossData.spawn}
          followers={bossData.followers}
          locale={locale}
          labels={labels}
        />

        <BossLocationGuide
          guideHtml={guideHtml}
          bossName={bossName}
          labels={labels}
        />

        <BossHealthSection
          boss={bossData.boss}
          followers={bossData.followers}
          locale={locale}
          labels={labels}
        />

        <section className="rounded-lg border border-gray-200 bg-white p-6 text-gray-900 shadow-sm dark:border-[#33404c] dark:bg-[#20252b] dark:text-white sm:p-7">
          <h2 className="text-2xl font-bold">{labels.lootLabel}</h2>
          <div className="mt-5">
            <BossItemGrid
              items={bossData.items}
              locale={locale}
              emptyLabel={labels.noLootLabel}
            />
          </div>
        </section>

        <BossFollowerSection
          followers={bossData.followers}
          followerItemsByBossId={followerItemsByBossId}
          locale={locale}
          labels={labels}
        />
      </div>
    </main>
  );
}
