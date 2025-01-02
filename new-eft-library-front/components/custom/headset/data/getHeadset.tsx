"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeadsetClient from "./headsetClient";

export default async function GetHeadset() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_HEADSET);

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch headset data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <HeadsetClient headsetList={data.data} />;
}
