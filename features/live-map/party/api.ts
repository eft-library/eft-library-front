import { queryOptions } from "@tanstack/react-query";
import { apiGet } from "@/lib/api/api-client";
import { fetchWithAuthRecovery } from "@/lib/auth/auth-recovery";
import { getApiBaseUrl } from "@/lib/config/app-env";
import { getLiveMapDetailEndpoint } from "@/lib/config/api-endpoints";
import type { LiveMapDetailResponse } from "@/types/api/live-map";

export function partyMapQueryOptions(normalizedName: string) {
  return queryOptions({
    queryKey: ["live-map-party-map-detail", normalizedName],
    queryFn: async () => {
      const detail = await apiGet<LiveMapDetailResponse>(
        getLiveMapDetailEndpoint(encodeURIComponent(normalizedName)),
      );
      const mapId = detail.map_selector.find(
        (map) => map.normalized_name === normalizedName,
      )?.id;
      if (!mapId) throw new Error(`Map ID missing for ${normalizedName}`);

      return {
        mapId,
        floors: detail.floors.filter((floor) => floor.map_id === mapId),
      };
    },
    staleTime: 60 * 60 * 1000,
  });
}

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
  const response = await fetchWithAuthRecovery(
    `${getApiBaseUrl()}/api/live-map/v3/party/rooms${path}`,
    token ?? "",
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
  if (!response.ok || payload.status >= 400 || payload.msg !== "OK" || payload.data == null) {
    const retryAfter = Number(response.headers.get("Retry-After"));
    throw new PartyApiError(
      payload.status >= 400 ? payload.status : response.status,
      payload.msg ?? "INVALID_REQUEST",
      Number.isFinite(retryAfter) ? retryAfter : 0,
    );
  }
  return payload.data as T;
}
