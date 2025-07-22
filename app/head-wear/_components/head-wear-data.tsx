"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeadWearView from "./head-wear-view";

export default async function HeadWearData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/headwear");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch head wear data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <HeadWearView headWearData={data.data} />;
}
