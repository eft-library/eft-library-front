import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import { privateRead, invalidatePrivateRead } from "@/lib/api/private-read-cache";
import type { RoadmapResponse } from "@/types/api/roadmap";

export function getRoadmap() {
  return staticJsonGetWithFallback<RoadmapResponse>("roadmap", "/static/roadmap/v3/get-roadmap.json", {
    apiPath: apiEndpoints.roadmap,
    revalidate: 60 * 60 * 24,
  });
}

export function getUserRoadmap(accessToken: string) {
  return privateRead(apiEndpoints.roadmapUser, accessToken, () => authenticatedApiRequest<string[]>(apiEndpoints.roadmapUser, {
    accessToken,
    method: "GET",
  }));
}

export async function saveRoadmap(questList: string[], accessToken: string) {
  const data = await authenticatedApiRequest<string[]>(apiEndpoints.roadmapSave, {
    accessToken,
    method: "POST",
    body: JSON.stringify({ questList }),
  });
  invalidatePrivateRead(apiEndpoints.roadmapUser, accessToken);
  return data;
}
