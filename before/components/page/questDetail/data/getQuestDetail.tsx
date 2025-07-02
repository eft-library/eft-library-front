"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import QuestDetailClient from "./questDetailClient";
import type { Quest } from "../../quest/data/questTypes";
import Loading from "@/components/custom/loading/loading";

export default function GetQuestDetail() {
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

  if (!questInfo) return <Loading />;

  return <QuestDetailClient questInfo={questInfo} />;
}
