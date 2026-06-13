import { apiGet } from "@/lib/api/api-client";
import {
  getLiveMapDetailEndpoint,
  getLiveMapEventDetailEndpoint,
  getLiveMapQuestDetailEndpoint,
  getLiveMapStoryDetailEndpoint,
} from "@/lib/config/api-endpoints";
import type {
  EventInfo,
  LiveMapDetailResponse,
  LiveMapPageData,
  LiveMapQuestInfo,
  StoryInfo,
} from "@/types/api/live-map";

export async function getLiveMapDetail(normalizedName: string): Promise<LiveMapPageData> {
  const liveMap = await apiGet<LiveMapDetailResponse>(getLiveMapDetailEndpoint(normalizedName), {
    revalidate: 60 * 30,
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

export function getLiveMapQuestDetail(questIdOrNormalizedName: string) {
  return apiGet<LiveMapQuestInfo>(getLiveMapQuestDetailEndpoint(questIdOrNormalizedName), {
    revalidate: 60 * 30,
  });
}

export function getLiveMapStoryDetail(storyId: string) {
  return apiGet<StoryInfo>(getLiveMapStoryDetailEndpoint(storyId), {
    revalidate: 60 * 30,
  });
}

export function getLiveMapEventDetail(eventId: string) {
  return apiGet<EventInfo>(getLiveMapEventDetailEndpoint(eventId), {
    revalidate: 60 * 30,
  });
}
