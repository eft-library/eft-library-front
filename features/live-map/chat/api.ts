import { getApiBaseUrl } from "@/lib/config/app-env";

export class LiveMapChatApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public retryAfter = 0,
  ) {
    super(code);
  }
}

export async function liveMapChatRequest<T>(
  path: string,
  token?: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}/api/live-map/v3${path}`, {
    method,
    cache: "no-store",
    signal: signal
      ? AbortSignal.any([signal, AbortSignal.timeout(15000)])
      : AbortSignal.timeout(15000),
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { "Content-Type": "application/json" }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  let payload: { msg?: string; data?: T | { retry_after?: number } | null } = {};
  try {
    payload = (await response.json()) as typeof payload;
  } catch {
    // Preserve the HTTP status when an upstream error has no JSON body.
  }
  if (!response.ok || payload.data == null) {
    const dataRetryAfter = payload.data && typeof payload.data === "object" && "retry_after" in payload.data ? payload.data.retry_after : undefined;
    const retryAfter = Number(dataRetryAfter ?? response.headers.get("Retry-After"));
    throw new LiveMapChatApiError(
      response.status,
      payload.msg ?? "CHAT_UNAVAILABLE",
      Number.isFinite(retryAfter) ? retryAfter : 0,
    );
  }
  return payload.data as T;
}
