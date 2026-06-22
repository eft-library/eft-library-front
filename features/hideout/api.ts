import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { staticJsonGet } from "@/lib/api/static-json-client";
import {
  apiEndpoints,
} from "@/lib/config/api-endpoints";
import type {
  HideoutDetailResponse,
  HideoutStationListResponse,
  HideoutUserItem,
} from "@/types/api/hideout";

export function getHideoutStations() {
  return staticJsonGet<HideoutStationListResponse>("hideout", "/static/hideout/v3/get-station.json", {
    revalidate: 60 * 60 * 24,
  });
}

export function getHideoutDetail(normalizedName: string) {
  return staticJsonGet<HideoutDetailResponse>("hideout", `/static/hideout/v3/details/${normalizedName}.json`, {
    revalidate: 60 * 60 * 24,
  });
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
