import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import {
  getLiveMapDetailEndpoint,
  getLiveMapEventDetailEndpoint,
  getLiveMapQuestDetailEndpoint,
  getLiveMapStoryDetailEndpoint,
  getLiveMapRaidDurationEndpoint,
  questEndpoints,
} from "@/lib/config/api-endpoints";
import { apiGet } from "@/lib/api/api-client";
import type { QuestCompletionGraphNode } from "@/types/api/quest";
import type {
  EventInfo,
  LiveMapDetailResponse,
  LiveMapPageData,
  LiveMapQuestInfo,
  StoryInfo,
} from "@/types/api/live-map";

function withCoordinateInfo(liveMap: LiveMapDetailResponse): LiveMapPageData {
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

export async function getLiveMapDetail(normalizedName: string): Promise<LiveMapPageData> {
  const liveMap = await staticJsonGetWithFallback<LiveMapDetailResponse>(
    "live-map",
    `/static/live-map/v3/maps/${normalizedName}.json`,
    {
      apiPath: getLiveMapDetailEndpoint(normalizedName),
      revalidate: 60 * 60 * 24,
    },
  );

  const supportsBtr = normalizedName === "woods" || normalizedName === "streets-of-tarkov";
  const btrRoutes = supportsBtr && Array.isArray(liveMap.btr_routes)
    ? liveMap.btr_routes
    : [];

  return withCoordinateInfo({ ...liveMap, btr_routes: btrRoutes });
}

export function getLiveMapQuestDetail(questIdOrNormalizedName: string) {
  return staticJsonGetWithFallback<LiveMapQuestInfo>("live-map", `/static/live-map/v3/quests/${questIdOrNormalizedName}.json`, {
    apiPath: getLiveMapQuestDetailEndpoint(questIdOrNormalizedName),
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapStoryDetail(storyId: string) {
  return staticJsonGetWithFallback<StoryInfo>("live-map", `/static/live-map/v3/stories/${storyId}.json`, {
    apiPath: getLiveMapStoryDetailEndpoint(storyId),
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapEventDetail(eventId: string) {
  return staticJsonGetWithFallback<EventInfo>("live-map", `/static/live-map/v3/events/${eventId}.json`, {
    apiPath: getLiveMapEventDetailEndpoint(eventId),
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapCompletionGraph() {
  return staticJsonGetWithFallback<QuestCompletionGraphNode[]>("live-map", "/static/live-map/v3/completion-graph.json", {
    apiPath: questEndpoints.completionGraph,
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapRaidDuration(normalizedName: string) {
  return apiGet<{ normalized_name: string; minutes: number }>(
    getLiveMapRaidDurationEndpoint(normalizedName),
    { revalidate: 60 * 15 },
  );
}
