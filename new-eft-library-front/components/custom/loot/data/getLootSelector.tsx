"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { COLUMN_KEY } from "@/lib/consts/columnConsts";
import LootSelectorClient from "./lootSelectorClient";

export default async function GetLootSelector() {
  const data = await requestData(
    `${API_ENDPOINTS.GET_COLUMN}/${COLUMN_KEY.lootType}`
  );

  if (!data || data.status !== 200) {
    console.error("Failed to fetch loot data:", data?.msg || "Unknown error");
    return null;
  }

  return <LootSelectorClient lootType={data.data} />;
}
