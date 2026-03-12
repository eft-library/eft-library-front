import MapOfTarkovView from "./map-of-tarkov-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function MapOfTarkovData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(
      `${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`,
    );
    return <MapOfTarkovView mapData={data.data} />;
  } catch (error) {
    console.error(error);
    notFound();
  }
}
