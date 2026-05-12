import { apiGet } from "@/lib/api/api-client";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { RoadmapResponse } from "@/types/api/roadmap";

export function getRoadmap() {
  return apiGet<RoadmapResponse>(apiEndpoints.roadmap, {
    revalidate: 60 * 30,
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
