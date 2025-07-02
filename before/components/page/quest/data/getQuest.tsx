"use client";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import QuestClient from "./questClient";
import { Quest } from "./questTypes";
import { useEffect, useState } from "react";
import Loading from "@/components/custom/loading/loading";
import { useAppStore } from "@/store/provider";

export default function GetQuest() {
  const { npcId } = useAppStore((state) => state);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questList, setQuestList] = useState<Quest[]>();

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

      setQuestList(data.data);
      setIsLoading(false);
    };

    getQuestById();
  }, [npcId]);

  return (
    <>
      {questList && <QuestClient questList={questList} />}
      {isLoading && <Loading />}
    </>
  );
}
