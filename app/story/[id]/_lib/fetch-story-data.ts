import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";
import { StoryTypes } from "../_components/story-types";

export async function fetchStoryData(id: string): Promise<StoryTypes> {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 172800, // 2일 후 만료
  });

  const res = await fetch(`${API_ENDPOINTS.GET_STORY}/${id}`);

  if (!res.ok) throw new Error("Failed to fetch story data");

  const json = await res.json();

  if (json.status !== 200) throw new Error(json.msg || "Unknown error");

  return json.data;
}
