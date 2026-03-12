import { API_ENDPOINTS } from "@/lib/config/endpoint";
import LootView from "./loot-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function LootData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_ITEM_LIST + "/loot");
    return <LootView lootList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
