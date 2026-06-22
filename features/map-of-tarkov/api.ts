import { staticJsonGet } from "@/lib/api/static-json-client";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

export function getMapOfTarkovDetail(normalizedName: string) {
  return staticJsonGet<MapOfTarkovDetailResponse>("map-of-tarkov", `/static/map-of-tarkov/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
