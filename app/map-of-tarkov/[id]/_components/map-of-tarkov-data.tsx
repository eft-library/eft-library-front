"use server";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import type { MapOfTarkov } from "./map-of-tarkov.types";
import MapOfTarkovView from "./map-of-tarkov-view";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";

async function fetchMotData(id: string): Promise<MapOfTarkov> {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 604800, // 7일 후 완전 만료
  });

  const res = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch mot data");
  }

  const json = await res.json();

  if (json.status !== 200) {
    throw new Error(json.msg || "Unknown error");
  }

  return json.data;
}

export default async function MapOfTarkovData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const data = await fetchMotData(id);

    if (!data) {
      notFound();
    }

    return <MapOfTarkovView mapData={data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
