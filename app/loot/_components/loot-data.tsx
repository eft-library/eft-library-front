"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import LootView from "./loot-view";

export default async function LootData() {
  const data = await requestData(API_ENDPOINTS.GET_ITEM_LIST + "/loot");

  if (!data || data.status !== 200) {
    console.error("Failed to fetch loot data:", data?.msg || "Unknown error");
    return null;
  }

  return <LootView lootList={data.data} />;
}
