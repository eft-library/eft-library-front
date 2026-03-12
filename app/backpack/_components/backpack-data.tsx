import { API_ENDPOINTS } from "@/lib/config/endpoint";
import BackpackView from "./backpack-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function BackpackData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/backpack",
    );
    return <BackpackView backpackList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
