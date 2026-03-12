import MapView from "./map-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function MapData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(`${API_ENDPOINTS.GET_MAP}/${id}`);
    return <MapView mapInfo={data.data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
