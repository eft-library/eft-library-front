"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Quest } from "@/app/quest/_components/quest.types";
import QuestDetailView from "./quest-detail-view";

export default function QuestDetailData() {
  const [questInfo, setQuestInfo] = useState<Quest>();
  const param = useParams<{ id: string }>();

  useEffect(() => {
    const getQuestById = async () => {
      const data = await requestData(`${API_ENDPOINTS.GET_QUEST}/${param.id}`);

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        return null;
      }

      setQuestInfo(data.data);
    };

    getQuestById();
  }, [param.id]);

  if (!questInfo) return null;

  return <QuestDetailView quest={questInfo} />;
}
