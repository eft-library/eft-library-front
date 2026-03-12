import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ArmBandView from "./arm-band-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function ArmBandData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/arm-band",
    );
    return <ArmBandView armBandList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
