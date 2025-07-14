"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmorVestView from "./armor-vest-view";

export default async function ArmorVestData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/armor-vest");

  if (!data || data.status !== 200) {
    console.error(
      "Failed to fetch armor vest data:",
      data?.msg || "Unknown error"
    );
    return null;
  }

  return <ArmorVestView armorVestList={data.data} />;
}
