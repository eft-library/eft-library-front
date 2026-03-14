import { notFound } from "next/navigation";
import QuestView from "./quest-view";
import { cacheRequestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";

export default async function QuestData({ id }: { id: string }) {
  try {
    const data = await cacheRequestData(
      `${API_ENDPOINTS.GET_QUEST_BY_NPC}/${id}`,
    );
    return <QuestView questData={data.data} />;
  } catch (error) {
    notFound();
  }
}
