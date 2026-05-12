import { connection } from "next/server";

import { getMapDetail } from "@/features/map/api";
import { MapRoute } from "@/features/map/route";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getMapDetail(id);
    const name = data.map.name_ko || data.map.name_en;

    return createPageMetadata({
      title: `타르코프 ${name} 3D 지도`,
      description: `Escape from Tarkov ${name} 3D 지도와 아이템 스폰 위치 정보를 제공합니다.`,
      path: `/map/${id}`,
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

  return <MapRoute mapId={id} />;
}
