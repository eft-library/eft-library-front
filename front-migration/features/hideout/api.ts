import { apiGet } from "@/lib/api/api-client";
import {
  apiEndpoints,
  getHideoutDetailEndpoint,
} from "@/lib/config/api-endpoints";
import type {
  HideoutDetailResponse,
  HideoutStationListResponse,
} from "@/types/api/hideout";

export function getHideoutStations() {
  return apiGet<HideoutStationListResponse>(apiEndpoints.hideoutStation, {
    revalidate: 60 * 60,
  });
}

export function getHideoutDetail(normalizedName: string) {
  return apiGet<HideoutDetailResponse>(getHideoutDetailEndpoint(normalizedName), {
    revalidate: 60 * 60,
  });
}
