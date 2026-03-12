import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WeaponView from "./weapon-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function WeaponData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/weapon-new",
    );
    return <WeaponView weaponList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
