import { API_ENDPOINTS } from "@/lib/config/endpoint";
import WipeView from "./wipe-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function WipeData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_WIPE);
    return <WipeView wipeList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
