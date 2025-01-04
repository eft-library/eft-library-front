"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import QuestSelectorClient from "./questSelectorClient";

export default async function GetQuestSelector() {
  const data = await requestData(`${API_ENDPOINTS.GET_NPC}`);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch quest data:", data?.msg || "Unknown error");
    return null;
  }

  return <QuestSelectorClient npcList={data.data} />;
}
