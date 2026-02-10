"use server";

import { API_ENDPOINTS } from "@/lib/config/endpoint";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import type { QuestDataTypes } from "./quest.types";
import QuestView from "./quest-view";

async function fetchQuestData(id: string): Promise<QuestDataTypes> {
  "use cache";
  cacheLife({
    stale: 86400, // 24시간 fresh
    revalidate: 86400, // 24시간 후 재검증
    expire: 604800, // 7일 후 완전 만료
  });

  const res = await fetch(`${API_ENDPOINTS.GET_QUEST_BY_NPC}/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch quest data");
  }

  const json = await res.json();

  if (json.status !== 200) {
    throw new Error(json.msg || "Unknown error");
  }

  return json.data;
}

export default async function QuestData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const data = await fetchQuestData(id);

    if (!data) {
      notFound(); // 404 페이지로
    }

    return <QuestView questData={data} />;
  } catch (error) {
    console.error(error);
    notFound(); // 또는 에러 페이지로
  }
}
