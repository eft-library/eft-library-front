import { apiEndpoints } from "@/lib/config/api-endpoints";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import type {
  ProgressItemResponse,
  ProgressItemSaveRequest,
} from "@/types/api/minigame";

export function getProgressItems(accessToken?: string) {
  if (accessToken) {
    return authenticatedApiRequest<ProgressItemResponse>(apiEndpoints.progressItem, {
      accessToken,
      method: "GET",
    });
  }

  return staticJsonGetWithFallback<ProgressItemResponse>("progress", "/static/progress/v3/progress-item.json", {
    apiPath: apiEndpoints.progressItem,
    revalidate: 60 * 60 * 24,
  });
}

export function saveProgressItems(
  payload: ProgressItemSaveRequest,
  accessToken: string,
) {
  return authenticatedApiRequest<ProgressItemResponse>(apiEndpoints.progressSave, {
    accessToken,
    method: "POST",
    body: JSON.stringify(payload),
  });
}
