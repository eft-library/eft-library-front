import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";
import { MapInfoData } from "../_components/map.types";

export async function fetchMapData(id: string): Promise<MapInfoData> {
  "use cache";
  cacheLife({
    stale: 86400,
    revalidate: 86400,
    expire: 172800,
  });

  const res = await fetch(`${API_ENDPOINTS.GET_MAP}/${id}`);

  if (!res.ok) throw new Error("Failed to fetch map data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
