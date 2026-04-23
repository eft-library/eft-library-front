import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils/class-name";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { getBossPageCopy } from "@/features/boss/config";
import type {
  BossCharacter,
  BossDetailResponse,
  BossItemEntry,
} from "@/types/api/boss";

interface BossPageProps {
  bossId: string;
  bossData: BossDetailResponse;
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}

const healthParts = [
  { key: "head_hp", shortLabel: "Head" },
  { key: "thorax_hp", shortLabel: "Thorax" },
  { key: "stomach_hp", shortLabel: "Stomach" },
  { key: "left_arm_hp", shortLabel: "L Arm" },
  { key: "right_arm_hp", shortLabel: "R Arm" },
  { key: "left_leg_hp", shortLabel: "L Leg" },
  { key: "right_leg_hp", shortLabel: "R Leg" },
] as const;

function getPreviewFrameSize(width: number, height: number) {
  const safeWidth = Math.max(1, width);
  const safeHeight = Math.max(1, height);
  const maxWidth = 164;
  const maxHeight = 148;
  const preferredCellSize = 28;
  const minWidth = 92;
  const minHeight = 92;

  const fitScale = Math.min(
    maxWidth / safeWidth,
    maxHeight / safeHeight,
    preferredCellSize,
  );

  return {
    width: Math.max(minWidth, Math.round(safeWidth * fitScale)),
    height: Math.max(minHeight, Math.round(safeHeight * fitScale)),
  };
}

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

function BossItemGrid({
  items,
  locale,
  emptyLabel,
}: {
  items: BossItemEntry[];
  locale: Locale;
  emptyLabel: string;
}) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">{emptyLabel}</p>;
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item, index) => {
        const localizedName = getLocalizedName(item, locale);
        const previewSize = getPreviewFrameSize(item.width, item.height);

        return (
          <article
            key={`${item.normalized_name}-${index}`}
            className="flex gap-3 rounded-lg border border-gray-200 bg-white p-3 shadow-sm dark:border-gray-700/50 dark:bg-[#2a2d35]"
          >
            <div
              className="relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-[#1f222a]"
              style={{
                width: `${previewSize.width}px`,
                height: `${previewSize.height}px`,
              }}
            >
              <Image
                src={item.image}
                alt={localizedName}
                fill
                sizes="140px"
                className="object-contain p-1.5"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-semibold">{localizedName}</h3>
              <p className="mt-2 truncate font-mono text-xs text-gray-500 dark:text-gray-400">
                {item.normalized_name}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full bg-orange-50 px-2.5 py-1 font-semibold uppercase tracking-[0.12em] text-orange-700 dark:bg-orange-500/15 dark:text-orange-300">
                  x{item.quantity}
                </span>
                <span className="rounded-full bg-gray-100 px-2.5 py-1 font-medium text-gray-600 dark:bg-gray-700/60 dark:text-gray-200">
                  {item.width}x{item.height}
                </span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function BossFollowerCard({
  follower,
  items,
  locale,
  labels,
}: {
  follower: BossCharacter;
  items: BossItemEntry[];
  locale: Locale;
  labels: ReturnType<typeof getBossPageCopy>;
}) {
  const followerName = getLocalizedName(follower, locale);

  return (
    <article className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
        <div className="flex items-center gap-4">
          <div className="relative h-20 w-20 overflow-hidden rounded-lg border border-gray-200 bg-gray-100 dark:border-gray-700 dark:bg-[#252830]">
            <Image src={follower.image} alt={followerName} fill className="object-cover" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{followerName}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {labels.totalHealthLabel}: {follower.health_total}
            </p>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
          {healthParts.map((part) => (
            <div
              key={part.key}
              className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center dark:border-gray-700 dark:bg-[#252830]"
            >
              <div className="text-[11px] uppercase tracking-[0.12em] text-gray-400">
                {part.shortLabel}
              </div>
              <div className="mt-1 text-sm font-semibold">
                {String(follower[part.key])}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <BossItemGrid items={items} locale={locale} emptyLabel={labels.noLootLabel} />
      </div>
    </article>
  );
}

export function BossPage({ bossId, bossData, locale, labels }: BossPageProps) {
  const bossName = getLocalizedName(bossData.boss, locale);
  const guideHtml = pickLocalizedField(
    bossData.boss as unknown as Record<string, unknown>,
    locale,
    "guide",
  );
  const followerItemsByBossId = new Map(
    bossData.followers_item.map((group) => [group.boss_id, group.items]),
  );

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
                {labels.pageTitle}
              </p>
              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{bossName}</h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
                {labels.pageDescription}
              </p>

              <div className="mt-6">
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  {labels.selectorLabel}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {bossData.boss_selector.map((entry) => (
                    <Link
                      key={entry.id}
                      href={`/boss/${entry.normalized_name}`}
                      className={cn(
                        "rounded-full border px-3 py-2 text-sm font-medium transition",
                        entry.normalized_name === bossId
                          ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                          : "border-gray-200 bg-white text-gray-700 hover:border-orange-300 hover:text-orange-500 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200 dark:hover:border-orange-400 dark:hover:text-orange-300",
                      )}
                    >
                      {getLocalizedName(entry, locale)}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex w-full max-w-md gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-[#252830]">
              <div className="relative h-28 w-28 overflow-hidden rounded-lg border border-gray-200 bg-black/10 dark:border-gray-700">
                <Image src={bossData.boss.image} alt={bossName} fill className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs uppercase tracking-[0.18em] text-gray-400">
                  {labels.factionLabel}
                </div>
                <div className="mt-1 text-lg font-semibold">
                  {bossData.boss.faction ?? "-"}
                </div>
                <div className="mt-4 text-xs uppercase tracking-[0.18em] text-gray-400">
                  {labels.totalHealthLabel}
                </div>
                <div className="mt-1 text-2xl font-semibold text-orange-500">
                  {bossData.boss.health_total}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {bossData.spawn.length > 0 ? (
            bossData.spawn.map((spawn) => (
              <article
                key={`${spawn.name_en}-${spawn.spawn_chance}`}
                className="rounded-lg border border-gray-200 bg-white px-5 py-4 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30"
              >
                <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                  {labels.spawnLabel}
                </div>
                <div className="mt-2 text-lg font-semibold">
                  {getLocalizedName(spawn, locale)}
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {Math.round(spawn.spawn_chance * 100)}%
                </div>
              </article>
            ))
          ) : (
            <article className="rounded-lg border border-dashed border-gray-300 bg-white px-5 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800/30 sm:col-span-2 xl:col-span-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">{labels.noSpawnLabel}</p>
            </article>
          )}
        </section>

        <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold">{labels.healthBreakdownLabel}</h2>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {labels.totalHealthLabel}: {bossData.boss.health_total}
              </span>
            </div>
            {bossData.boss.health_image ? (
              <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-[#111318] dark:border-gray-700">
                <Image
                  src={bossData.boss.health_image}
                  alt={`${bossName} health`}
                  width={900}
                  height={600}
                  className="h-auto w-full object-contain"
                />
              </div>
            ) : null}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 xl:grid-cols-7">
              {healthParts.map((part) => (
                <div
                  key={part.key}
                  className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-center dark:border-gray-700 dark:bg-[#252830]"
                >
                  <div className="text-[11px] uppercase tracking-[0.12em] text-gray-400">
                    {part.shortLabel}
                  </div>
                  <div className="mt-1 text-base font-semibold">
                    {String(bossData.boss[part.key])}
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <h2 className="text-lg font-semibold">{labels.guideLabel}</h2>
            {typeof guideHtml === "string" && guideHtml ? (
              <div
                className={cn(
                  "prose prose-sm mt-5 max-w-none text-gray-700 dark:prose-invert dark:text-gray-200",
                  "prose-headings:text-gray-900 dark:prose-headings:text-white",
                  "prose-a:text-orange-500 prose-a:underline-offset-2 hover:prose-a:text-orange-400",
                  "[&_img]:rounded-lg [&_img]:border [&_img]:border-gray-200 [&_img]:bg-black/20 [&_img]:p-1 dark:[&_img]:border-gray-700",
                )}
                dangerouslySetInnerHTML={{ __html: guideHtml }}
              />
            ) : (
              <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
                {labels.noGuideLabel}
              </p>
            )}
          </article>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-lg font-semibold">{labels.lootLabel}</h2>
          <div className="mt-5">
            <BossItemGrid
              items={bossData.items}
              locale={locale}
              emptyLabel={labels.noLootLabel}
            />
          </div>
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-lg font-semibold">{labels.followersLabel}</h2>
          {bossData.followers.length > 0 ? (
            <div className="mt-5 grid gap-4">
              {bossData.followers.map((follower) => (
                <BossFollowerCard
                  key={follower.id}
                  follower={follower}
                  items={followerItemsByBossId.get(follower.id) ?? []}
                  locale={locale}
                  labels={labels}
                />
              ))}
            </div>
          ) : (
            <p className="mt-5 text-sm text-gray-500 dark:text-gray-400">
              {labels.noFollowersLabel}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
