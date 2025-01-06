"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import MapOfTarkovSelectorClient from "./mapOfTarkovSelectorClient";

export default async function GetMapOfTarkovSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.mapOfTarkov}`
  );

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch map of tarkov data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <MapOfTarkovSelectorClient mapOfTarkovType={data.data} />;
}
