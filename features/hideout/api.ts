import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { staticJsonGetWithFallback } from "@/lib/api/static-json-client";
import {
  apiEndpoints,
  getHideoutDetailEndpoint,
} from "@/lib/config/api-endpoints";
import type {
  HideoutDetailResponse,
  HideoutStationListResponse,
  HideoutUserItem,
} from "@/types/api/hideout";

function normalizeCraftDurations(response: HideoutDetailResponse): HideoutDetailResponse {
  const durations = response.levels.flatMap((level) =>
    level.crafts.map((craft) => craft.duration)
  );
  const usesKiloseconds = durations.length > 0 && Math.max(...durations) < 1000;

  if (!usesKiloseconds) {
    return response;
  }

  return {
    ...response,
    levels: response.levels.map((level) => ({
      ...level,
      crafts: level.crafts.map((craft) => ({
        ...craft,
        duration: Number((craft.duration * 1000).toFixed(6)),
      })),
    })),
  };
}

export function getHideoutStations() {
  return staticJsonGetWithFallback<HideoutStationListResponse>("hideout", "/static/hideout/v3/get-station.json", {
    apiPath: apiEndpoints.hideoutStation,
    revalidate: 60 * 60 * 24,
  });
}

export async function getHideoutDetail(normalizedName: string) {
  const response = await staticJsonGetWithFallback<HideoutDetailResponse>("hideout", `/static/hideout/v3/details/${normalizedName}.json`, {
    apiPath: getHideoutDetailEndpoint(normalizedName),
    revalidate: 60 * 60 * 24,
  });

  return normalizeCraftDurations(response);
}

export function getUserHideoutStations(accessToken: string) {
  return authenticatedApiRequest<HideoutStationListResponse>(
    apiEndpoints.hideoutStation,
    {
      accessToken,
      method: "GET",
    },
  );
}

export function saveHideoutStations(completeList: string[], accessToken: string) {
  return authenticatedApiRequest<HideoutStationListResponse>(
    apiEndpoints.hideoutSaveStation,
    {
      accessToken,
      method: "POST",
      body: JSON.stringify({ complete_list: completeList }),
    },
  );
}

export function saveHideoutStationItems(
  userItemList: HideoutUserItem[],
  accessToken: string,
) {
  return authenticatedApiRequest<HideoutStationListResponse>(
    apiEndpoints.hideoutSaveStationItem,
    {
      accessToken,
      method: "POST",
      body: JSON.stringify({ user_item_list: userItemList }),
    },
  );
}
