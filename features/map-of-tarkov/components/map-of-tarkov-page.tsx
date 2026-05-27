"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Clipboard,
  Clock,
  ExternalLink,
  Heart,
  Lightbulb,
  Map,
  MapPin,
  Navigation2,
  Percent,
  Repeat,
  Shield,
  Skull,
  Tag,
  Users,
  X,
} from "lucide-react";

import { HorizontalAdBanner } from "@/components/shared/ad-banner";
import { ZoomableImagePopup } from "@/components/shared/zoomable-image-popup";
import { pickLocalizedField } from "@/lib/utils/localized-text";
import type { Locale } from "@/i18n/config";
import type {
  MapBossInfo,
  MapOfTarkovDetailResponse,
  MapPointInfo,
  MapSelectorEntry,
} from "@/types/api/map-of-tarkov";
import { FindLocation } from "./find-location";

const copyByLocale = {
  ko: {
    title: "타르코프 지도",
    map: "지도",
    subMap: "하위 지도",
    findLocation: "내 위치 찾기",
    extractionInfo: "탈출구",
    transitInfo: "Transits",
    bossInfo: "보스",
    photo: "사진",
    name: "이름",
    affiliation: "소속",
    location: "위치",
    spawnRate: "스폰확률",
    hp: "체력",
    followers: "추종자",
    alwaysOpen: "항상 열림",
    oneTimeUse: "일회용",
    requirements: "필요 조건",
    tips: "Tip",
    mapBounds: "지도 좌표",
    imageBounds: "이미지 좌표",
    defaultZoom: "기본 줌",
    none: "-",
  },
  en: {
    title: "Tarkov Map",
    map: "Map",
    subMap: "Sub Map",
    findLocation: "Find My Location",
    extractionInfo: "Extraction",
    transitInfo: "Transits",
    bossInfo: "Boss",
    photo: "Photo",
    name: "Name",
    affiliation: "Affiliation",
    location: "Location",
    spawnRate: "Spawn Rate",
    hp: "HP",
    followers: "Followers",
    alwaysOpen: "Always Open",
    oneTimeUse: "One-time Use",
    requirements: "Requirements",
    tips: "Tip",
    mapBounds: "Map Bounds",
    imageBounds: "Image Bounds",
    defaultZoom: "Default Zoom",
    none: "-",
  },
  ja: {
    title: "タルコフの地図",
    map: "マップ",
    subMap: "サブマップ",
    findLocation: "私の位置を探す",
    extractionInfo: "脱出ポイント",
    transitInfo: "Transits",
    bossInfo: "ボス",
    photo: "写真",
    name: "名前",
    affiliation: "所属",
    location: "位置",
    spawnRate: "出現率",
    hp: "体力",
    followers: "フォロワー",
    alwaysOpen: "常時開放",
    oneTimeUse: "使い捨て",
    requirements: "必要条件",
    tips: "ヒント",
    mapBounds: "マップ座標",
    imageBounds: "画像座標",
    defaultZoom: "デフォルトズーム",
    none: "-",
  },
} as const;

function localized(value: Record<string, unknown>, locale: Locale, prefix: string) {
  return String(pickLocalizedField(value, locale, prefix) ?? value[`${prefix}_en`] ?? "");
}

function getLocalizedName(value: Record<string, unknown>, locale: Locale) {
  return localized(value, locale, "name");
}

function formatBounds(bounds: [[number, number], [number, number]]) {
  return `${bounds[0][0].toFixed(2)}, ${bounds[0][1].toFixed(2)} / ${bounds[1][0].toFixed(2)}, ${bounds[1][1].toFixed(2)}`;
}

function getFactionClass(faction: string) {
  switch (faction) {
    case "ALL":
      return "bg-purple-600 text-white";
    case "PMC":
      return "bg-blue-600 text-white";
    case "Scav":
      return "bg-orange-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
}

function BooleanIcon({ value }: { value: boolean }) {
  return value ? (
    <Check className="mx-auto h-5 w-5 text-green-500" />
  ) : (
    <X className="mx-auto h-5 w-5 text-red-500" />
  );
}

interface ImagePopupState {
  src: string;
  alt: string;
}

export function MapOfTarkovPage({
  contentMapData,
  locale,
  selectedMapData,
}: {
  contentMapData: MapOfTarkovDetailResponse;
  locale: Locale;
  selectedMapData: MapOfTarkovDetailResponse;
}) {
  const copy = copyByLocale[locale];
  const [imagePopup, setImagePopup] = useState<ImagePopupState | null>(null);
  const localizedMapName = getLocalizedName(
    selectedMapData.map_info as unknown as Record<string, unknown>,
    locale,
  );
  const localizedMapImage =
    localized(selectedMapData.map_info as unknown as Record<string, unknown>, locale, "mot_image") ||
    selectedMapData.map_info.mot_image_en;

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 dark:bg-[#1e2124] dark:text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <section className="text-center">
          <h1 className="text-3xl font-black sm:text-4xl">{copy.title}</h1>
          <HorizontalAdBanner />
        </section>

        <MapSelector
          contentMapData={contentMapData}
          locale={locale}
          selectedMapData={selectedMapData}
        />

        <section className="space-y-4">
          <h2 className="flex items-center text-xl font-black">
            <Map className="mr-2 h-6 w-6 text-orange-500" />
            {localizedMapName}
          </h2>
          <button
            type="button"
            onClick={() => setImagePopup({ src: localizedMapImage, alt: localizedMapName })}
            className="block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-[#252830]"
          >
            <img
              src={localizedMapImage}
              alt={localizedMapName}
              className="h-auto w-full object-contain"
            />
          </button>
        </section>

        {contentMapData.find_info ? (
          <FindLocation
            key={contentMapData.map_info.normalized_name}
            findInfo={contentMapData.find_info}
            locale={locale}
            mapKey={contentMapData.map_info.normalized_name}
          />
        ) : null}

        <BossSection bosses={contentMapData.boss_info} copy={copy} locale={locale} />
        <PointSection
          title={copy.extractionInfo}
          items={contentMapData.extraction_info}
          copy={copy}
          locale={locale}
          onOpenImage={setImagePopup}
        />
        <PointSection
          title={copy.transitInfo}
          items={contentMapData.transit_info}
          copy={copy}
          locale={locale}
          onOpenImage={setImagePopup}
        />
      </div>

      <ZoomableImagePopup image={imagePopup} onClose={() => setImagePopup(null)} />
    </main>
  );
}

function MapSelector({
  contentMapData,
  locale,
  selectedMapData,
}: {
  contentMapData: MapOfTarkovDetailResponse;
  locale: Locale;
  selectedMapData: MapOfTarkovDetailResponse;
}) {
  const router = useRouter();
  const copy = copyByLocale[locale];
  const selectedMap =
    contentMapData.map_selector.find(
      (entry) => entry.normalized_name === contentMapData.map_info.normalized_name,
    ) ?? contentMapData.map_selector[0];
  const subMaps = uniqueByNormalizedName([
    contentMapData.map_info,
    ...contentMapData.child_maps,
  ]);

  function moveToMap(normalizedName: string) {
    router.push(`/map-of-tarkov/${normalizedName}`);
  }

  return (
    <section className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#252830] lg:flex-row lg:items-center">
      <SelectorField
        icon={<Map className="h-4 w-4" />}
        label={copy.map}
        value={selectedMap?.normalized_name ?? contentMapData.map_info.normalized_name}
        entries={contentMapData.map_selector}
        locale={locale}
        onChange={moveToMap}
      />
      {subMaps.length > 1 ? (
        <>
          <ChevronRight className="hidden h-4 w-4 text-gray-400 lg:block" />
          <SelectorField
            icon={<MapPin className="h-4 w-4" />}
            label={copy.subMap}
            value={selectedMapData.map_info.normalized_name}
            entries={subMaps}
            locale={locale}
            onChange={moveToMap}
          />
        </>
      ) : null}
    </section>
  );
}

function SelectorField({
  icon,
  label,
  value,
  entries,
  locale,
  onChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  entries: MapSelectorEntry[];
  locale: Locale;
  onChange: (value: string) => void;
}) {
  return (
    <label className="grid w-full gap-2 sm:w-64">
      <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
        {icon}
        {label}
      </span>
      <span className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-11 w-full appearance-none rounded-md border border-gray-200 bg-white px-3 pr-9 text-sm font-semibold outline-none transition hover:border-orange-300 focus:border-orange-400 dark:border-gray-700 dark:bg-[#1e2124] dark:text-white"
        >
          {entries.map((entry) => (
            <option key={entry.normalized_name} value={entry.normalized_name}>
              {getLocalizedName(entry as unknown as Record<string, unknown>, locale)}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
      </span>
    </label>
  );
}

function uniqueByNormalizedName(entries: MapSelectorEntry[]) {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.normalized_name)) {
      return false;
    }
    seen.add(entry.normalized_name);
    return true;
  });
}

function InfoStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 dark:border-gray-700 dark:bg-[#1e2124]">
      <div className="text-xs font-bold uppercase tracking-[0.16em] text-gray-400">{label}</div>
      <div className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">{value}</div>
    </div>
  );
}

function BossSection({
  bosses,
  copy,
  locale,
}: {
  bosses: MapBossInfo[];
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
}) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center text-xl font-black">
        <Skull className="mr-2 h-5 w-5 text-orange-500" />
        {copy.bossInfo}
      </h2>
      <div className="hidden rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-bold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#252830] dark:text-gray-300 md:grid md:grid-cols-6">
        <div>{copy.photo}</div>
        <div>{copy.name}</div>
        <div>{copy.affiliation}</div>
        <div>{copy.spawnRate}</div>
        <div>{copy.hp}</div>
        <div>{copy.followers}</div>
      </div>
      <div className="space-y-3">
        {bosses.map((boss) => {
          const name = getLocalizedName(boss as unknown as Record<string, unknown>, locale);

          return (
            <article
              key={boss.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#252830]"
            >
              <div className="grid gap-4 md:grid-cols-6 md:items-center md:text-center">
                <div className="flex justify-center">
                  <img src={boss.image} alt={name} className="h-20 w-20 rounded-xl object-cover md:h-24 md:w-24" />
                </div>
                <Link
                  href={`/boss/${boss.normalized_name}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-gray-900 hover:text-orange-500 dark:text-white"
                >
                  {name}
                </Link>
                <div className="text-sm text-gray-600 dark:text-gray-300">{boss.faction ?? copy.none}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {Math.round(boss.spawn_chance * 100)} %
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{boss.health_total}</div>
                <div className="flex flex-wrap justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
                  {boss.followers.length > 0
                    ? boss.followers.map((follower) => (
                        <span key={follower.id}>
                          {getLocalizedName(follower as unknown as Record<string, unknown>, locale)}
                        </span>
                      ))
                    : copy.none}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function PointSection({
  title,
  items,
  copy,
  locale,
  onOpenImage,
}: {
  title: string;
  items: MapPointInfo[];
  copy: (typeof copyByLocale)[Locale];
  locale: Locale;
  onOpenImage: (image: ImagePopupState) => void;
}) {
  return (
    <section className="space-y-4">
      <h2 className="flex items-center text-xl font-black">
        <Navigation2 className="mr-2 h-5 w-5 text-orange-500" />
        {title}
      </h2>
      <div className="hidden gap-4 rounded-lg border border-gray-200 bg-white p-4 text-center text-sm font-bold text-gray-700 shadow-sm dark:border-gray-700 dark:bg-[#252830] dark:text-gray-300 md:grid md:grid-cols-[minmax(220px,1.8fr)_minmax(120px,0.9fr)_90px_72px_72px_minmax(240px,1.7fr)_minmax(240px,1.7fr)] md:items-center">
        <div>{copy.photo}</div>
        <div>{copy.name}</div>
        <div>{copy.affiliation}</div>
        <div>{copy.alwaysOpen}</div>
        <div>{copy.oneTimeUse}</div>
        <div>{copy.requirements}</div>
        <div>{copy.tips}</div>
      </div>
      <div className="space-y-3">
        {items.map((item) => {
          const name = getLocalizedName(item as unknown as Record<string, unknown>, locale);
          const requirements = localized(
            item as unknown as Record<string, unknown>,
            locale,
            "requirements",
          );
          const tips = localized(item as unknown as Record<string, unknown>, locale, "tip");

          return (
            <article
              key={item.id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#252830]"
            >
              <div className="grid gap-4 md:grid-cols-[minmax(220px,1.8fr)_minmax(120px,0.9fr)_90px_72px_72px_minmax(240px,1.7fr)_minmax(240px,1.7fr)] md:items-center md:text-center">
                <button
                  type="button"
                  onClick={() => onOpenImage({ src: item.image, alt: name })}
                  className="group relative block overflow-hidden rounded-lg"
                >
                  <img src={item.image} alt={name} className="h-36 w-full object-cover md:h-32" />
                  <ExternalLink className="absolute right-2 top-2 h-4 w-4 rounded bg-black/50 p-0.5 text-white opacity-0 transition group-hover:opacity-100" />
                </button>
                <div className="font-bold text-gray-900 dark:text-white">
                  <span className="md:hidden">{copy.name}: </span>
                  {name}
                </div>
                <div>
                  <span className={`inline-flex rounded-full px-2 py-1 text-xs font-bold ${getFactionClass(item.faction)}`}>
                    {item.faction}
                  </span>
                </div>
                <BooleanIcon value={item.is_unlimited_use} />
                <BooleanIcon value={item.is_one_time_use} />
                <HtmlBlock
                  value={requirements}
                  fallback={copy.none}
                  alt={name}
                  onOpenImage={onOpenImage}
                />
                <HtmlBlock
                  value={tips}
                  fallback={copy.none}
                  alt={name}
                  onOpenImage={onOpenImage}
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function HtmlBlock({
  value,
  fallback,
  alt,
  onOpenImage,
}: {
  value: string;
  fallback: string;
  alt: string;
  onOpenImage: (image: ImagePopupState) => void;
}) {
  if (!value) {
    return <span className="text-sm text-gray-500 dark:text-gray-400">{fallback}</span>;
  }

  return (
    <div
      className="prose prose-sm max-w-none text-sm dark:prose-invert [&_img]:mx-auto [&_img]:max-h-16 [&_img]:max-w-16 [&_img]:cursor-zoom-in [&_img]:rounded-md"
      onClick={(event) => {
        const target = event.target;

        if (!(target instanceof HTMLImageElement) || !target.src) {
          return;
        }

        event.preventDefault();
        onOpenImage({
          src: target.currentSrc || target.src,
          alt: target.alt || alt,
        });
      }}
      dangerouslySetInnerHTML={{ __html: value }}
    />
  );
}
