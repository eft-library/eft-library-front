import { apiGet } from "@/lib/api/api-client";
import { getLiveMapDetailEndpoint } from "@/lib/config/api-endpoints";
import type { LiveMapDetailResponse, LiveMapPageData } from "@/types/api/live-map";

export async function getLiveMapDetail(normalizedName: string): Promise<LiveMapPageData> {
  const liveMap = await apiGet<LiveMapDetailResponse>(getLiveMapDetailEndpoint(normalizedName), {
    revalidate: 60 * 5,
  });
  const coordinateFloor = liveMap.floors.find((floor) => floor.map_bounds);
  const coordinateInfo = coordinateFloor?.map_bounds
    ? {
        default_zoom_level: coordinateFloor.default_zoom_level ?? 0,
        id: coordinateFloor.map_id,
        image_bounds: coordinateFloor.map_bounds,
        map_bounds: coordinateFloor.map_bounds,
      }
    : null;

  return {
    ...liveMap,
    coordinate_info: coordinateInfo,
  };
}
