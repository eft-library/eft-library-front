"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import MapSelectorClient from "@/components/page/mapDetail/data/mapSelectorClient";

export default async function GetMapSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.map}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch map data:", data?.msg || "Unknown error");
    return null;
  }

  return <MapSelectorClient mapType={data.data} />;
}
