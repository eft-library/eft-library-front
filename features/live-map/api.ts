import { apiGet } from "@/lib/api/api-client";
import {
  getLiveMapDetailEndpoint,
  getMapOfTarkovDetailEndpoint,
} from "@/lib/config/api-endpoints";
import type { LiveMapDetailResponse, LiveMapPageData } from "@/types/api/live-map";
import type { MapOfTarkovDetailResponse } from "@/types/api/map-of-tarkov";

export async function getLiveMapDetail(normalizedName: string): Promise<LiveMapPageData> {
  const [liveMap, mapOfTarkov] = await Promise.all([
    apiGet<LiveMapDetailResponse>(getLiveMapDetailEndpoint(normalizedName), {
      revalidate: 60 * 5,
    }),
    apiGet<MapOfTarkovDetailResponse>(getMapOfTarkovDetailEndpoint(normalizedName), {
      revalidate: 60 * 10,
    }).catch(() => null),
  ]);

  return {
    ...liveMap,
    coordinate_info: mapOfTarkov?.find_info ?? null,
  };
}
