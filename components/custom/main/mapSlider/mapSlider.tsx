"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MapSliderClient from "./mapSliderClient";

export default async function MapSlider() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_MAP);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch map slider data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <MapSliderClient mapList={data.data} />;
}
