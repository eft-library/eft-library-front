import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { getMapDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapDetailResponse } from "@/types/api/map";

export async function getMapDetail(normalizedName: string) {
  "use cache";
  cacheLife("days");

  return apiGet<MapDetailResponse>(getMapDetailEndpoint(normalizedName), {
    revalidate: 60 * 60 * 24,
  });
}
