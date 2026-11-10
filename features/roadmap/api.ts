import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import { privateRead, invalidatePrivateRead } from "@/lib/api/private-read-cache";

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
