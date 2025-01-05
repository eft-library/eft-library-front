"use server";

import { requestData } from "@/lib/config/api";
import { API_ENDPOINTS } from "@/lib/config/endpoint";
import QuestClient from "./questClient";

export default async function GetQuest() {
  const data = await requestData(API_ENDPOINTS.GET_ALL_QUEST);

  if (!data || data.status !== 200) {
    console.error("Failed to fetch quest data:", data?.msg || "Unknown error");
    return null;
  }

  return <QuestClient questList={data.data} />;
}