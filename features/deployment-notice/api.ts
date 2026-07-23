import type { ApiEnvelope } from "@/lib/api/api-client";
import { getApiBaseUrl } from "@/lib/config/app-env";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { DeploymentNoticeStatus } from "@/types/api/deployment-notice";

export async function getDeploymentNoticeStatus(signal?: AbortSignal) {
  const response = await fetch(
    `${getApiBaseUrl()}${apiEndpoints.deploymentNoticeStatus}`,
    {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
      signal,
    },
  );

  if (!response.ok) {
    throw new Error(`Deployment notice request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<DeploymentNoticeStatus>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error("Deployment notice returned an invalid payload");
  }

  return payload.data;
}
