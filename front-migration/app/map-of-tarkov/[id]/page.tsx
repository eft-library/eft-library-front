import { notFound } from "next/navigation";
import { connection } from "next/server";

import { MapOfTarkovPage } from "@/features/map-of-tarkov/components/map-of-tarkov-page";
import { getMapOfTarkovDetail } from "@/features/map-of-tarkov/api";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getMapOfTarkovDetail(id);
    const name = data.map_info.name_ko || data.map_info.name_en;

    return createPageMetadata({
      title: `타르코프 지도 ${name}`,
      description: `Escape from Tarkov ${name} 한글 지도, 탈출구, 보스, Transit 정보를 제공합니다.`,
      path: `/map-of-tarkov/${id}`,
      image: data.map_info.mot_image_ko || data.map_info.mot_image_en,
    });
  } catch {
    return fallbackMetadata();
  }
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
