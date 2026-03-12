import { API_ENDPOINTS } from "@/lib/config/endpoint";
import RigView from "./rig-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function RigData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_ITEM_LIST + "/rig");
    return <RigView rig_data={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
