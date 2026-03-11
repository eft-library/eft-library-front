import { MapOfTarkov } from "../_components/map-of-tarkov.types";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";

export async function fetchMotData(id: string): Promise<MapOfTarkov> {
  "use cache";
  cacheLife({
    stale: 86400,
    revalidate: 86400,
    expire: 172800,
  });

  const res = await fetch(`${API_ENDPOINTS.GET_MAP_OF_TARKOV}/${id}`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) throw new Error("Failed to fetch mot data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
