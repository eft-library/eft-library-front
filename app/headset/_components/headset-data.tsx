import { API_ENDPOINTS } from "@/lib/config/endpoint";
import HeadsetView from "./headset-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function HeadsetData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/headset",
    );
    return <HeadsetView headsetList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
