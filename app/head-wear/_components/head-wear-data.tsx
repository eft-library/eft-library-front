import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeadWearView from "./head-wear-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function HeadWearData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/headwear",
    );
    return <HeadWearView headWearData={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
