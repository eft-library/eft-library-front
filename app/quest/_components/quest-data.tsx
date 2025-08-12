"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useAppStore } from "@/store/provider";
import type { QuestDataTypes } from "./quest.types";
import QuestView from "./quest-view";
import Loading from "@/components/custom/Loading/loading";
import { useQuery } from "@tanstack/react-query";

export default function QuestData() {
  const { npcId } = useAppStore((state) => state);

  const fetchQuestData = async (id: string): Promise<QuestDataTypes> => {
    const res = await fetch(`${API_ENDPOINTS.GET_QUEST_BY_NPC}/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch quest data");
    }
    const json = await res.json();

    if (json.status !== 200) {
      throw new Error(json.msg || "Unknown error");
    }

    return json.data;
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["questData", npcId],
    queryFn: () => fetchQuestData(npcId),
    enabled: !!npcId,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  return <>{data && <QuestView questData={data} />}</>;
}
