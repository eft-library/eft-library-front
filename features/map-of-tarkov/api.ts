import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { getMapOfTarkovDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

export async function getMapOfTarkovDetail(normalizedName: string) {
  "use cache";
  cacheLife("days");

  return apiGet<MapOfTarkovDetailResponse>(getMapOfTarkovDetailEndpoint(normalizedName), {
    revalidate: 60 * 60 * 24,
  });
}
