import { API_ENDPOINTS } from "@/lib/config/endpoint";
import FaceCoverView from "./face-cover-view";
import { cacheRequestData } from "@/lib/config/api";

export default async function FaceCoverData() {
  try {
    const data = await cacheRequestData(
      API_ENDPOINTS.GET_ITEM_LIST + "/face-cover",
    );
    return <FaceCoverView face_cover_data={data.data} />;
  } catch (e) {
    console.error("Failed to fetch data:", e);
    return null;
  }
}
