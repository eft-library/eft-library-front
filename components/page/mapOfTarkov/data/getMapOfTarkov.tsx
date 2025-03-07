"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MapOfTarkovWrapper from "./mapOfTarkovWrapper";

export default async function GetMapOfTarkov() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_MAP_OF_TARKOV);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch map of tarkov data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <MapOfTarkovWrapper mapOfTarkovList={data.data} />;
}
