import { API_ENDPOINTS } from "@/lib/config/endpoint";
import KeyView from "./key-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function KeyData() {
  try {
    const data = await cacheRequestData(API_ENDPOINTS.GET_ITEM_LIST + "/key");
    return <KeyView keyList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
