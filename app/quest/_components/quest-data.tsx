"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { useEffect, useState } from "react";
import { useAppStore } from "@/store/provider";
import type { QuestDataTypes } from "./quest.types";
import QuestView from "./quest-view";

export default function QuestData() {
  const { npcId } = useAppStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questData, setQuestData] = useState<QuestDataTypes>();

  useEffect(() => {
    const getQuestById = async () => {
      setIsLoading(true);
      const data = await requestData(
        `${API_ENDPOINTS.GET_QUEST_BY_NPC}/${npcId}`
      );

      if (!data || data.status !== 200) {
        console.error(
          "Failed to fetch quest data:",
          data?.msg || "Unknown error"
        );
        setIsLoading(false);
        return null;
      }

      setQuestData(data.data);
      setIsLoading(false);
    };

    getQuestById();
  }, [npcId]);

  return questData && <QuestView questData={questData} />;
}
