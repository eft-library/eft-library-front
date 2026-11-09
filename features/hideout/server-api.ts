import "server-only";

import { cacheLife } from "next/cache";

import { apiGet } from "@/lib/api/api-client";
import { apiEndpoints, getHideoutDetailEndpoint } from "@/lib/config/api-endpoints";
import type {
  HideoutAllItemRequirementsResponse,
  HideoutDetailResponse,
  HideoutStationListResponse,
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

export async function getHideoutStations() {
  "use cache";
  cacheLife("days");

  return apiGet<HideoutStationListResponse>(apiEndpoints.hideoutStation, {
    revalidate: 60 * 60 * 24,
  });
}

export async function getHideoutAllItemRequirements() {
  "use cache";
  cacheLife("days");

  return apiGet<HideoutAllItemRequirementsResponse>(apiEndpoints.hideoutAllItemRequirements, {
    revalidate: 60 * 60 * 24,
  });
}

export async function getHideoutDetail(normalizedName: string) {
  "use cache";
  cacheLife("days");

  const response = await apiGet<HideoutDetailResponse>(getHideoutDetailEndpoint(normalizedName), {
    revalidate: 60 * 60 * 24,
  });

  return normalizeCraftDurations(response);
}

