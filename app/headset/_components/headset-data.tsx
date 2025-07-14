"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeadsetView from "./headset-view";

export default async function HeadsetData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/headset");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch headset data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <HeadsetView headsetList={data.data} />;
}
