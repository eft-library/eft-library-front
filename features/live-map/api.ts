import { apiGet } from "@/lib/api/api-client";
import {
  getLiveMapDetailEndpoint,
  getLiveMapEventDetailEndpoint,
  getLiveMapQuestDetailEndpoint,
  getLiveMapStoryDetailEndpoint,
  questEndpoints,
} from "@/lib/config/api-endpoints";
import { getSiteUrl } from "@/lib/config/app-env";
import type { QuestCompletionGraphNode } from "@/types/api/quest";
import type {
  EventInfo,
  LiveMapDetailResponse,
  LiveMapPageData,
  LiveMapQuestInfo,
  StoryInfo,
} from "@/types/api/live-map";

interface StaticEnvelope<T> {
  status: number;
  msg: string;
  data: T | null;
}

interface LiveMapStaticIndex {
  generated_at: string;
}

const LIVE_MAP_STATIC_REVALIDATE_SECONDS = 60 * 60 * 24;
const LIVE_MAP_STATIC_INDEX_REVALIDATE_SECONDS = 60 * 5;
const LIVE_MAP_STATIC_INDEX_PATH = "/live-map/v3/index.json";

function getPublicFileUrl(path: string) {
  if (typeof window !== "undefined") {
    return path;
  }

  const baseUrl = process.env.NEXTAUTH_URL || getSiteUrl();

  return `${baseUrl}${path}`;
}

async function getStaticLiveMapJson<T>(path: string): Promise<T> {
  const version = await getLiveMapStaticVersion();
  const url = getPublicFileUrl(`${path}?v=${encodeURIComponent(version)}`);
  const response = await fetch(url, {
    next: { revalidate: LIVE_MAP_STATIC_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Static live-map JSON request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as StaticEnvelope<T>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`Static live-map JSON returned invalid payload for ${path}`);
  }

  return payload.data;
}

async function getLiveMapStaticVersion() {
  const response = await fetch(getPublicFileUrl(LIVE_MAP_STATIC_INDEX_PATH), {
    next: { revalidate: LIVE_MAP_STATIC_INDEX_REVALIDATE_SECONDS },
  });

  if (!response.ok) {
    throw new Error(`Static live-map index request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as LiveMapStaticIndex;

  if (!payload.generated_at) {
    throw new Error("Static live-map index returned invalid payload");
  }

  return payload.generated_at;
}

async function getLiveMapStaticOrApi<T>({
  apiPath,
  staticPath,
}: {
  apiPath: string;
  staticPath: string;
}) {
  try {
    return await getStaticLiveMapJson<T>(staticPath);
  } catch {
    return apiGet<T>(apiPath, {
      revalidate: 60 * 30,
    });
  }
}

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
  const liveMap = await getLiveMapStaticOrApi<LiveMapDetailResponse>({
    apiPath: getLiveMapDetailEndpoint(normalizedName),
    staticPath: `/live-map/v3/maps/${normalizedName}.json`,
  });

  return withCoordinateInfo(liveMap);
}

export function getLiveMapQuestDetail(questIdOrNormalizedName: string) {
  return getLiveMapStaticOrApi<LiveMapQuestInfo>({
    apiPath: getLiveMapQuestDetailEndpoint(questIdOrNormalizedName),
    staticPath: `/live-map/v3/quests/${questIdOrNormalizedName}.json`,
  });
}

export function getLiveMapStoryDetail(storyId: string) {
  return getLiveMapStaticOrApi<StoryInfo>({
    apiPath: getLiveMapStoryDetailEndpoint(storyId),
    staticPath: `/live-map/v3/stories/${storyId}.json`,
  });
}

export function getLiveMapEventDetail(eventId: string) {
  return getLiveMapStaticOrApi<EventInfo>({
    apiPath: getLiveMapEventDetailEndpoint(eventId),
    staticPath: `/live-map/v3/events/${eventId}.json`,
  });
}

export function getLiveMapCompletionGraph() {
  return getLiveMapStaticOrApi<QuestCompletionGraphNode[]>({
    apiPath: questEndpoints.completionGraph,
    staticPath: "/live-map/v3/completion-graph.json",
  });
}
