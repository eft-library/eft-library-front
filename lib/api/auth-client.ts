import { getApiBaseUrl } from "@/lib/config/app-env";

import type { ApiEnvelope } from "@/lib/api/api-client";

interface AuthenticatedRequestOptions extends RequestInit {
  accessToken: string;
}

export async function authenticatedApiRequest<T>(
  path: string,
  { accessToken, headers, ...init }: AuthenticatedRequestOptions,
) {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Authenticated API request failed: ${response.status}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`Authenticated API returned invalid payload for ${path}`);
  }

  return payload.data;
}
