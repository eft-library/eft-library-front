import { notFound } from "next/navigation";
import { connection } from "next/server";

import { MapOfTarkovPage } from "@/features/map-of-tarkov/components/map-of-tarkov-page";
import { getMapOfTarkovDetail } from "@/features/map-of-tarkov/api";
import { getUserLocale } from "@/i18n/locale";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

function getParentMapSlug(mapData: MapOfTarkovDetailResponse) {
  const currentSlug = mapData.map_info.normalized_name;
  const topLevelSlugs = mapData.map_selector.map((entry) => entry.normalized_name);

  if (topLevelSlugs.includes(currentSlug)) {
    return currentSlug;
  }

  return (
    [...topLevelSlugs]
      .sort((left, right) => right.length - left.length)
      .find((slug) => currentSlug.startsWith(`${slug}-`)) ?? currentSlug
  );
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const locale = await getUserLocale();
  const mapData = await getMapOfTarkovDetail(id);

  if (!mapData.map_info) {
    notFound();
  }

  const parentMapSlug = getParentMapSlug(mapData);
  const contentMapData =
    parentMapSlug === mapData.map_info.normalized_name
      ? mapData
      : await getMapOfTarkovDetail(parentMapSlug);

  return (
    <MapOfTarkovPage
      contentMapData={contentMapData}
      locale={locale}
      selectedMapData={mapData}
    />
  );
}
