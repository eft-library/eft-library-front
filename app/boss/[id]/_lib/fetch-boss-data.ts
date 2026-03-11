import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";
import { BossData } from "../_components/boss.types";

export async function fetchBossData(id: string): Promise<BossData> {
  "use cache";
  cacheLife({
    stale: 86400,
    revalidate: 86400,
    expire: 172800,
  });

  const res = await fetch(`${API_ENDPOINTS.GET_BOSS}/${id}`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) throw new Error("Failed to fetch boss data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
