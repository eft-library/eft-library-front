import Link from "next/link";

import { formatIsoDateTime } from "@/lib/utils/date-time";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type { MapOfTarkovDetailResponse, MapPointInfo } from "@/types/api/map-of-tarkov";

const copyByLocale = {
  ko: {
    title: "타르코프 지도",
    description: "맵 이미지, 보스, 탈출구와 트랜짓 정보를 V3 응답 기준으로 정리했습니다.",
    childMaps: "하위 지도",
    bossInfo: "보스 정보",
    extractionInfo: "탈출구",
    transitInfo: "트랜짓",
    findInfo: "위치 찾기 정보",
    spawnChance: "스폰 확률",
    requirements: "요구 사항",
    tips: "팁",
    bounds: "좌표 범위",
  },
  en: {
    title: "Map of Tarkov",
    description: "Browse map images, bosses, extractions, and transit information from V3 data.",
    childMaps: "Child maps",
    bossInfo: "Boss info",
    extractionInfo: "Extractions",
    transitInfo: "Transits",
    findInfo: "Find-location info",
    spawnChance: "Spawn chance",
    requirements: "Requirements",
    tips: "Tips",
    bounds: "Bounds",
  },
  ja: {
    title: "Map of Tarkov",
    description: "マップ画像、ボス、脱出地点、トランジット情報を V3 データ基準で確認できます。",
    childMaps: "サブマップ",
    bossInfo: "ボス情報",
    extractionInfo: "脱出地点",
    transitInfo: "トランジット",
    findInfo: "位置検索情報",
    spawnChance: "出現率",
    requirements: "条件",
    tips: "ヒント",
    bounds: "座標範囲",
  },
} as const;

export function MapOfTarkovPage({
  mapData,
  locale,
}: {
  mapData: MapOfTarkovDetailResponse;
  locale: Locale;
}) {
  const copy = copyByLocale[locale];
  const localizedMapName = String(
    pickLocalizedField(mapData.map_info as unknown as Record<string, unknown>, locale, "name") ??
      mapData.map_info.name_en,
  );
  const localizedMapImage =
    String(
      pickLocalizedField(
        mapData.map_info as unknown as Record<string, unknown>,
        locale,
        "mot_image",
      ) ?? "",
    ) || mapData.map_info.mot_image_en;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-orange-500">
            {copy.title}
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">{localizedMapName}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-300">
            {copy.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {mapData.map_selector.map((entry) => {
              const label = String(
                pickLocalizedField(entry as unknown as Record<string, unknown>, locale, "name") ??
                  entry.name_en,
              );

              return (
                <Link
                  key={entry.normalized_name}
                  href={`/map-of-tarkov/${entry.normalized_name}`}
                  className={`rounded-full border px-3 py-2 text-sm font-medium transition ${
                    entry.normalized_name === mapData.map_info.normalized_name
                      ? "border-orange-400 bg-orange-50 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"
                      : "border-gray-200 bg-white text-gray-700 dark:border-gray-700 dark:bg-[#2a2d35] dark:text-gray-200"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </section>

        <section className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <img src={localizedMapImage} alt={localizedMapName} className="h-auto w-full object-contain" />
        </section>

        {mapData.child_maps.length > 0 ? (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <h2 className="text-lg font-semibold">{copy.childMaps}</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {mapData.child_maps.map((entry) => (
                <Link
                  key={entry.normalized_name}
                  href={`/map-of-tarkov/${entry.normalized_name}`}
                  className="rounded-full border border-gray-200 px-3 py-2 text-sm dark:border-gray-700"
                >
                  {String(
                    pickLocalizedField(entry as unknown as Record<string, unknown>, locale, "name") ??
                      entry.name_en,
                  )}
                </Link>
              ))}
            </div>
          </section>
        ) : null}

        {mapData.find_info ? (
          <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
            <h2 className="text-lg font-semibold">{copy.findInfo}</h2>
            <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
              <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                <img src={mapData.find_info.image} alt={`${localizedMapName} overlay`} className="h-auto w-full object-contain" />
              </div>
              <div className="space-y-3">
                <InfoStat
                  label={copy.bounds}
                  value={`${mapData.find_info.map_bounds[0][0]}, ${mapData.find_info.map_bounds[0][1]} / ${mapData.find_info.map_bounds[1][0]}, ${mapData.find_info.map_bounds[1][1]}`}
                />
                <InfoStat
                  label="Default Zoom"
                  value={String(mapData.find_info.default_zoom_level)}
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
          <h2 className="text-lg font-semibold">{copy.bossInfo}</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {mapData.boss_info.map((boss) => (
              <article key={boss.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex items-center gap-4">
                  <img src={boss.image} alt={boss.name_en} className="h-16 w-16 rounded-lg object-cover" />
                  <div>
                    <h3 className="font-semibold">
                      {String(
                        pickLocalizedField(boss as unknown as Record<string, unknown>, locale, "name") ??
                          boss.name_en,
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {copy.spawnChance}: {Math.round(boss.spawn_chance * 100)}%
                    </p>
                  </div>
                </div>
                <Link
                  href={`/boss/${boss.normalized_name}`}
                  className="mt-4 inline-flex text-sm font-medium text-orange-500"
                >
                  {boss.normalized_name}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <MapPointSection title={copy.extractionInfo} items={mapData.extraction_info} locale={locale} copy={copy} />
        <MapPointSection title={copy.transitInfo} items={mapData.transit_info} locale={locale} copy={copy} />
      </div>
    </main>
  );
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-[#252830]">
      <div className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">{label}</div>
      <div className="mt-2 text-sm">{value}</div>
    </div>
  );
}

function MapPointSection({
  title,
  items,
  locale,
  copy,
}: {
  title: string;
  items: MapPointInfo[];
  locale: Locale;
  copy: (typeof copyByLocale)[Locale];
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700/50 dark:bg-gray-800/30">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 grid gap-4">
        {items.map((item) => {
          const name = String(
            pickLocalizedField(item as unknown as Record<string, unknown>, locale, "name") ??
              item.name_en,
          );
          const requirements = String(
            pickLocalizedField(
              item as unknown as Record<string, unknown>,
              locale,
              "requirements",
            ) ?? "",
          );
          const tips = String(
            pickLocalizedField(item as unknown as Record<string, unknown>, locale, "tip") ?? "",
          );

          return (
            <article key={item.id} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
                <img src={item.image} alt={name} className="h-32 w-full rounded-lg object-cover lg:w-72" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    {item.faction} · {item.is_one_time_use ? "One-time" : "Reusable"}
                  </div>
                  {requirements ? (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold">{copy.requirements}</h4>
                      <div
                        className="prose prose-sm mt-2 max-w-none dark:prose-invert [&_img]:max-w-24"
                        dangerouslySetInnerHTML={{ __html: requirements }}
                      />
                    </div>
                  ) : null}
                  {tips ? (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold">{copy.tips}</h4>
                      <div
                        className="prose prose-sm mt-2 max-w-none dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: tips }}
                      />
                    </div>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
