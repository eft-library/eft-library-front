import { API_ENDPOINTS } from "@/lib/config/endpoint";
import ContainerView from "./container-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function ContainerData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/container",
    );
    return <ContainerView containerList={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
