import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { RoadmapResponse } from "@/types/api/roadmap";

export function getRoadmap() {
  return staticJsonGetWithFallback<RoadmapResponse>("roadmap", "/static/roadmap/v3/get-roadmap.json", {
    apiPath: apiEndpoints.roadmap,
    revalidate: 60 * 60 * 24,
  });
}

export function getUserRoadmap(accessToken: string) {
  return authenticatedApiRequest<string[]>(apiEndpoints.roadmapUser, {
    accessToken,
    method: "GET",
  });
}

export function saveRoadmap(questList: string[], accessToken: string) {
  return authenticatedApiRequest<string[]>(apiEndpoints.roadmapSave, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ questList }),
  });
}
