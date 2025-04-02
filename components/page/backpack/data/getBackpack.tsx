"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import BackpackClient from "./backpackClient";

export default async function GetBackpack() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/backpack");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch back data:", data?.msg || "Unknown error");
    return null;
  }

  return <BackpackClient backpackList={data.data} />;
}
