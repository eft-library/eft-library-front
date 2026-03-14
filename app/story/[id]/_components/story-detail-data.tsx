import StoryView from "./story-detail-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function StoryDetailData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(`${API_ENDPOINTS.GET_STORY}/${id}`);
    return <StoryView story={data.data} />;
  } catch (error) {
    notFound();
  }
}
