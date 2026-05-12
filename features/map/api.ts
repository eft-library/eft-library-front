import { apiGet } from "@/lib/api/api-client";
import { getMapDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapDetailResponse } from "@/types/api/map";

export function getMapDetail(normalizedName: string) {
  return apiGet<MapDetailResponse>(getMapDetailEndpoint(normalizedName), {
    revalidate: 60 * 30,
  });
}
