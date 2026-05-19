import { notFound } from "next/navigation";
import { connection } from "next/server";

import { LiveMapPage } from "@/features/live-map/components/live-map-page";
import { getLiveMapDetail } from "@/features/live-map/api";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ normalized_name: string }>;
}) {
  try {
    const { normalized_name: normalizedName } = await params;
    const data = await getLiveMapDetail(normalizedName);
    const map =
      data.map_selector.find((entry) => entry.normalized_name === normalizedName) ??
      data.map_selector[0];
    const name = map?.name_ko || map?.name_en || normalizedName;

    return createPageMetadata({
      title: `${name} Live Map`,
      description: `Escape from Tarkov ${name} 실시간 위치 지도를 제공합니다.`,
      path: `/live-map/${normalizedName}`,
      image: data.floors[0]?.image,
    });
  } catch {
    return fallbackMetadata();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ normalized_name: string }>;
}) {
  await connection();
  const { normalized_name: normalizedName } = await params;
  const [data, locale] = await Promise.all([
    getLiveMapDetail(normalizedName),
    getUserLocale(),
  ]);

  if (!data.floors.length) {
    notFound();
  }

  return <LiveMapPage data={data} locale={locale} normalizedName={normalizedName} />;
}
