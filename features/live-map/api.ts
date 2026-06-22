import { staticJsonGet } from "@/lib/api/static-json-client";
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
  const liveMap = await staticJsonGet<LiveMapDetailResponse>("live-map", `/static/live-map/v3/maps/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });

  return withCoordinateInfo(liveMap);
}

export function getLiveMapQuestDetail(questIdOrNormalizedName: string) {
  return staticJsonGet<LiveMapQuestInfo>("live-map", `/static/live-map/v3/quests/${questIdOrNormalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapStoryDetail(storyId: string) {
  return staticJsonGet<StoryInfo>("live-map", `/static/live-map/v3/stories/${storyId}.json`, {
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapEventDetail(eventId: string) {
  return staticJsonGet<EventInfo>("live-map", `/static/live-map/v3/events/${eventId}.json`, {
    revalidate: 60 * 60 * 24,
  });
}

export function getLiveMapCompletionGraph() {
  return staticJsonGet<QuestCompletionGraphNode[]>("live-map", "/static/live-map/v3/completion-graph.json", {
    revalidate: 60 * 60 * 24,
  });
}
