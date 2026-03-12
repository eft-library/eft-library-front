import { API_ENDPOINTS } from "@/lib/config/endpoint";
import MedicalView from "./medical-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function MedicalData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/medical",
    );
    return <MedicalView medical={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
