import { apiEndpoints } from "@/lib/config/api-endpoints";
import { apiGet } from "@/lib/api/api-client";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
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

  return apiGet<ProgressItemResponse>(apiEndpoints.progressItem, {
    revalidate: 60 * 10,
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
