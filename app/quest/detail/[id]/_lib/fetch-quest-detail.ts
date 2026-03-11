import { Quest } from "@/app/quest/[id]/_components/quest.types";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";

export async function fetchQusetDetailData(id: string): Promise<Quest> {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(`${API_ENDPOINTS.GET_QUEST}/${id}`, {
    signal: AbortSignal.timeout(5000),
  });

  if (!res.ok) throw new Error("Failed to fetch quest data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
