"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmBandClient from "./armBandClient";

export default async function GetArmBand() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/arm-band");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch arm band data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ArmBandClient armBandList={data.data} />;
}
