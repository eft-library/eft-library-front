import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { getMapDetailEndpoint } from "@/lib/config/api-endpoints";
import type { MapDetailResponse } from "@/types/api/map";

export function getMapDetail(normalizedName: string) {
  return staticJsonGetWithFallback<MapDetailResponse>("map", `/static/map/v3/details/${normalizedName}.json`, {
    apiPath: getMapDetailEndpoint(normalizedName),
    revalidate: 60 * 60 * 24,
  });
}
