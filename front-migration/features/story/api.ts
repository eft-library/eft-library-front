import { apiGet } from "@/lib/api/api-client";
import {
  apiEndpoints,
  getStoryDetailEndpoint,
} from "@/lib/config/api-endpoints";
import type {
  StoryDetailResponse,
  StoryRoadmapNode,
} from "@/types/api/story";

export function getStoryDetail(storyId: string) {
  return apiGet<StoryDetailResponse>(getStoryDetailEndpoint(storyId), {
    revalidate: 60 * 10,
  });
}

export function getStoryRoadmap() {
  return apiGet<StoryRoadmapNode[]>(apiEndpoints.storyRoadmap, {
    revalidate: 60 * 10,
  });
}
