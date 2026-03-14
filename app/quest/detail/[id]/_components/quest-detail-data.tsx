import QuestDetailView from "./quest-detail-view";
import { notFound } from "next/navigation";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function QuestDetailData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(`${API_ENDPOINTS.GET_QUEST}/${id}`);
    return <QuestDetailView quest={data.data} />;
  } catch (error) {
    notFound();
  }
}
