import { getApiBaseUrl } from "@/lib/config/app-env";

export interface ApiEnvelope<T> {
  status: number;
  msg: string;
  data: T | null;
}

interface ApiRequestOptions extends RequestInit {
  revalidate?: number;
}

export async function apiRequest<T>(
  path: string,
  { revalidate = 60 * 30, ...init }: ApiRequestOptions = {},
): Promise<T> {
  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    next: init.method === "GET" || !init.method ? { revalidate } : undefined,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const payload = (await response.json()) as ApiEnvelope<T>;

  if (payload.msg !== "OK" || payload.data === null) {
    throw new Error(`API returned invalid payload for ${path}`);
  }

  return payload.data;
}

export function apiGet<T>(path: string, options?: Omit<ApiRequestOptions, "method">) {
  return apiRequest<T>(path, options);
}

export function apiPost<TRequest, TResponse>(
  path: string,
  body: TRequest,
  options?: Omit<ApiRequestOptions, "method" | "body">,
) {
  return apiRequest<TResponse>(path, {
    ...options,
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers ?? {}),
    },
    body: JSON.stringify(body),
  });
}
