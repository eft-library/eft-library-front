import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ProvisionsView from "./provisions-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function ProvisionsData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/provisions",
    );
    return <ProvisionsView provisionsList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
