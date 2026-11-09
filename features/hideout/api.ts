import { authenticatedApiRequest } from "@/lib/api/auth-client";
import { apiEndpoints } from "@/lib/config/api-endpoints";
import type { HideoutStationListResponse, HideoutUserItem } from "@/types/api/hideout";

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
