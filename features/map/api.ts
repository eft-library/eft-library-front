import { staticJsonGet } from "@/lib/api/static-json-client";
import type { MapDetailResponse } from "@/types/api/map";

export function getMapDetail(normalizedName: string) {
  return staticJsonGet<MapDetailResponse>("map", `/static/map/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}
