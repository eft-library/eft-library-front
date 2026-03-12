import { API_ENDPOINTS } from "@/lib/config/endpoint";
import AmmoView from "./ammo-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function AmmoData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_ITEM_LIST + "/ammo");
    return <AmmoView ammoList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
