"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmBandView from "./arm-band-view";

export default async function ArmBandData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/arm-band");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch arm band data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ArmBandView armBandList={data.data} />;
}
