"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import LootClient from "./lootClient";

export default async function GetLoot() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_LOOT);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch loot data:", data?.msg || "Unknown error");
    return null;
  }

  return <LootClient lootList={data.data} />;
}
