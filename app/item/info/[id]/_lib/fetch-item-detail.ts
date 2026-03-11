import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { ItemDetail } from "../_components/item.types";
import { cacheLife } from "next/cache";

export async function fetchItemData(id: string): Promise<ItemDetail> {
  "use cache";
  cacheLife({
    stale: 86400,
    revalidate: 86400,
    expire: 172800,
  });

  const res = await fetch(`${API_ENDPOINTS.GET_ITEM_DETAIL}/${id}`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) throw new Error("Failed to fetch quest data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
