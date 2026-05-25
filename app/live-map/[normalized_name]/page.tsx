import { notFound } from "next/navigation";

import { LiveMapPage } from "@/features/live-map/components/live-map-page";
import { getLiveMapDetail } from "@/features/live-map/api";
import { getQuestCompletionGraph } from "@/features/quest/api";
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
  const { normalized_name: normalizedName } = await params;
  const [data, completionGraph] = await Promise.all([
    getLiveMapDetail(normalizedName),
    getQuestCompletionGraph(),
  ]);

  if (!data.floors.length) {
    notFound();
  }

  return (
    <LiveMapPage
      data={data}
      initialCompletionGraph={completionGraph}
      normalizedName={normalizedName}
    />
  );
}
