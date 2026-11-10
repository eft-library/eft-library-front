import { apiEndpoints } from "@/lib/config/api-endpoints";
import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { privateRead, invalidatePrivateRead } from "@/lib/api/private-read-cache";
import type { ApiEnvelope } from "@/lib/api/api-client";
import type {
  ProgressItemResponse,
  ProgressItemSaveRequest,
} from "@/types/api/progress";

export async function getProgressItems(accessToken?: string) {
  if (accessToken) {
    return privateRead(apiEndpoints.progressItem, accessToken, () => authenticatedApiRequest<ProgressItemResponse>(apiEndpoints.progressItem, {
      accessToken,
      method: "GET",
    }));
  }

  const response = await fetch("/api/progress/items");

  if (!response.ok) {
    throw new Error(`Progress items request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<ProgressItemResponse>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error("Progress items returned invalid payload");
  }

  return payload.data;
}

export async function saveProgressItems(
  payload: ProgressItemSaveRequest,
  accessToken: string,
) {
  const data = await authenticatedApiRequest<ProgressItemResponse>(apiEndpoints.progressSave, {
    accessToken,
    method: "POST",
    body: JSON.stringify(payload),
  });
  invalidatePrivateRead(apiEndpoints.progressItem, accessToken);
  return data;
}
