"use client";

import { ChevronDown, Map, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

import type { Locale } from "@/i18n/config";
import { pickLocalizedText } from "@/lib/utils/localized-text";
import type { MapDetailResponse, MapSelectorEntry } from "@/types/api/map";

const selectorCopy = {
  ko: {
    map: "지도",
    subMap: "하위 지도",
  },
  en: {
    map: "Map",
    subMap: "Sub Map",
  },
  ja: {
    map: "マップ",
    subMap: "サブマップ",
  },
} as const;

function getMainMap(mapId: string, topLevelMaps: MapSelectorEntry[]) {
  const sortedMaps = [...topLevelMaps].sort(
    (left, right) => right.normalized_name.length - left.normalized_name.length,
  );

  return (
    sortedMaps.find(
      (entry) =>
        mapId === entry.normalized_name ||
        mapId.startsWith(`${entry.normalized_name}-`),
    ) ?? topLevelMaps[0]
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

export function MapSelector({
  mapId,
  mapDetail,
  locale,
}: {
  mapId: string;
  mapDetail: MapDetailResponse;
  locale: Locale;
}) {
  const router = useRouter();
  const copy = selectorCopy[locale];
  const currentMainMap = getMainMap(mapId, mapDetail.top_level_map);
  const subMaps = uniqueByNormalizedName([
    currentMainMap,
    ...mapDetail.related_maps,
  ]);

  function moveToMap(normalizedName: string) {
    router.push(`/map/${normalizedName}`);
  }

  return (
    <section className="flex flex-col gap-5 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700/60 dark:bg-[#252830] lg:flex-row lg:items-center">
      <label className="grid w-full min-w-0 gap-2 lg:w-64">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
          <Map className="h-4 w-4" />
          {copy.map}
        </span>
        <span className="relative">
          <Map className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            value={currentMainMap?.normalized_name ?? mapDetail.map.normalized_name}
            onChange={(event) => moveToMap(event.target.value)}
            className="h-11 w-full appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-9 text-sm font-semibold text-gray-900 outline-none transition hover:border-orange-300 focus:border-orange-400 dark:border-gray-700 dark:bg-[#1e2124] dark:text-white"
          >
            {mapDetail.top_level_map.map((entry) => (
              <option key={entry.normalized_name} value={entry.normalized_name}>
                {pickLocalizedText(entry, locale)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </span>
      </label>

      <ChevronDown className="hidden h-4 w-4 -rotate-90 text-gray-400 lg:block" />

      <label className="grid w-full min-w-0 gap-2 lg:w-64">
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4" />
          {copy.subMap}
        </span>
        <span className="relative">
          <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <select
            value={mapDetail.map.normalized_name}
            onChange={(event) => moveToMap(event.target.value)}
            className="h-11 w-full appearance-none rounded-md border border-gray-200 bg-white pl-10 pr-9 text-sm font-semibold text-gray-900 outline-none transition hover:border-orange-300 focus:border-orange-400 dark:border-gray-700 dark:bg-[#1e2124] dark:text-white"
          >
            {subMaps.map((entry) => (
              <option key={entry.normalized_name} value={entry.normalized_name}>
                {pickLocalizedText(entry, locale)}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </span>
      </label>
    </section>
  );
}
