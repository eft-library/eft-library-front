import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmorVestView from "./armor-vest-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function ArmorVestData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/armor-vest",
    );
    return <ArmorVestView armorVestList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
