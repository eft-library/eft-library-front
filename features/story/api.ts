import { staticJsonGet } from "@/lib/api/static-json-client";
import type {
  StoryDetailResponse,
  StoryRoadmapNode,
} from "@/types/api/story";

export function getStoryDetail(storyId: string) {
  return staticJsonGet<StoryDetailResponse>("story", `/static/story/v3/details/${storyId}.json`, {
    revalidate: 60 * 60 * 24,
  });
}

export function getStoryRoadmap() {
  return staticJsonGet<StoryRoadmapNode[]>("story", "/static/story/v3/roadmap.json", {
    revalidate: 60 * 60 * 24,
  });
}
