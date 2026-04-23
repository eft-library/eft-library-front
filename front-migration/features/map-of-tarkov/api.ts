import { apiGet } from "@/lib/api/api-client";
import { getMapOfTarkovDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

export function getMapOfTarkovDetail(normalizedName: string) {
  return apiGet<MapOfTarkovDetailResponse>(getMapOfTarkovDetailEndpoint(normalizedName), {
    revalidate: 60 * 10,
  });
}
