"use client";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import type { Quest } from "@/app/quest/_components/quest.types";
import QuestDetailView from "./quest-detail-view";
import Loading from "@/components/custom/Loading/loading";
import { useQuery } from "@tanstack/react-query";

export default function QuestDetailData() {
  const { id } = useParams<{ id: string }>();

  const fetchQuestData = async (id: string): Promise<Quest> => {
    const res = await fetch(`${API_ENDPOINTS.GET_QUEST}/${id}`);
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
    queryKey: ["questData", id],
    queryFn: () => fetchQuestData(id),
    enabled: !!id,
  });

  if (isLoading) return <Loading />;

  if (error) {
    console.error(error);
    return <div>데이터를 불러오는 데 실패했습니다.</div>;
  }

  if (!data) return <div />;

  return <QuestDetailView quest={data} />;
}
