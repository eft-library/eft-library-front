import { getApiBaseUrl } from "@/lib/config/app-env";

export class PartyApiError extends Error {
  constructor(
    public status: number,
    public code: string,
    public retryAfter: number = 0,
  ) {
    super(code);
  }
}

export async function partyRequest<T>(
  path: string,
  token?: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
): Promise<T> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/live-map/v3/party/rooms${path}`,
    {
      method,
      signal: signal
        ? AbortSignal.any([signal, AbortSignal.timeout(15000)])
        : AbortSignal.timeout(15000),
      cache: "no-store",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    },
  );
  const payload = await response.json();
  if (!response.ok || payload.msg !== "OK" || payload.data == null) {
    const retryAfter = Number(response.headers.get("Retry-After"));
    throw new PartyApiError(
      response.status,
      payload.msg ?? "INVALID_REQUEST",
      Number.isFinite(retryAfter) ? retryAfter : 0,
    );
  }
  return payload.data as T;
}
