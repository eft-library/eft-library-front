import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints, getStoryDetailEndpoint } from "@/lib/config/api-endpoints";
import type {
  StoryDetailResponse,
  StoryRoadmapNode,
} from "@/types/api/story";

export async function getStoryDetail(storyId: string) {
  "use cache";
  cacheLife("days");

  return apiGet<StoryDetailResponse>(getStoryDetailEndpoint(storyId), {
    revalidate: 60 * 60 * 24,
  });
}

export async function getStoryRoadmap() {
  "use cache";
  cacheLife("days");

  return apiGet<StoryRoadmapNode[]>(apiEndpoints.storyRoadmap, {
    revalidate: 60 * 60 * 24,
  });
}
