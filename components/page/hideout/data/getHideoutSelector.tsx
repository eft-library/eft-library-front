"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import HideoutSelectorClient from "@/components/page/hideout/data/hideoutSelectorClient";

export default async function GetHideoutSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.hideoutType}`
  );

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch hideout data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <HideoutSelectorClient hideoutType={data.data} />;
}
