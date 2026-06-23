import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { getMapOfTarkovDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

export function getMapOfTarkovDetail(normalizedName: string) {
  return staticJsonGetWithFallback<MapOfTarkovDetailResponse>("map-of-tarkov", `/static/map-of-tarkov/v3/details/${normalizedName}.json`, {
    apiPath: getMapOfTarkovDetailEndpoint(normalizedName),
    revalidate: 60 * 60 * 24,
  });
}
