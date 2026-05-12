import { connection } from "next/server";

import { QuestDetailPage } from "@/features/quest/components/quest-detail-page";
import { getQuestDetail } from "@/features/quest/api";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getQuestDetail(id);
    const name = data.quest.name_ko || data.quest.name_en;

    return createPageMetadata({
      title: `타르코프 ${name}`,
      description: `Escape from Tarkov ${name} 퀘스트 목표, 보상, 카파, 이전/다음 퀘스트, 가이드 정보를 제공합니다.`,
      path: `/quest/detail/${id}`,
      image: data.trader?.image,
    });
  } catch {
    return fallbackMetadata();
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await connection();
  const { id } = await params;
  const locale = await getUserLocale();
  const data = await getQuestDetail(id);

  return <QuestDetailPage data={data} locale={locale} />;
}
