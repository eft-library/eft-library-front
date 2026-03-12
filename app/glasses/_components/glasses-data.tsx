import { API_ENDPOINTS } from "@/lib/config/endpoint";
import GlassesView from "./glasses-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function GlassesData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/glasses",
    );
    return <GlassesView glassesData={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
