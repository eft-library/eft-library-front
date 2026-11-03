import { getApiBaseUrl } from "@/lib/config/app-env";

import type { ApiEnvelope } from "@/lib/api/api-client";

interface AuthenticatedRequestOptions extends RequestInit {
  accessToken: string;
}

export class AuthenticatedApiError extends Error {
  readonly retryAfterMs: number;
  constructor(readonly status: number, retryAfter: string | null) {
    super(`Authenticated API request failed: ${status}`);
    this.name = "AuthenticatedApiError";
    const seconds = retryAfter === null ? NaN : Number(retryAfter);
    const delay = Number.isFinite(seconds) ? seconds * 1000 : retryAfter ? Date.parse(retryAfter) - Date.now() : NaN;
    this.retryAfterMs = status === 429 ? Math.max(1000, Number.isFinite(delay) ? delay : 30_000) : 0;
  }
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
    throw new AuthenticatedApiError(response.status, response.headers.get("Retry-After"));
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`Authenticated API returned invalid payload for ${path}`);
  }

  return payload.data;
}
