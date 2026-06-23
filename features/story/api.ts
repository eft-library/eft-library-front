import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints, getStoryDetailEndpoint } from "@/lib/config/api-endpoints";
import type {
  StoryDetailResponse,
  StoryRoadmapNode,
} from "@/types/api/story";

export function getStoryDetail(storyId: string) {
  return staticJsonGetWithFallback<StoryDetailResponse>("story", `/static/story/v3/details/${storyId}.json`, {
    apiPath: getStoryDetailEndpoint(storyId),
    revalidate: 60 * 60 * 24,
  });
}

export function getStoryRoadmap() {
  return staticJsonGetWithFallback<StoryRoadmapNode[]>("story", "/static/story/v3/roadmap.json", {
    apiPath: apiEndpoints.storyRoadmap,
    revalidate: 60 * 60 * 24,
  });
}
