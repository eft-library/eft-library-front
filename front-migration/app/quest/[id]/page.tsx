import { connection } from "next/server";

import { QuestListPage } from "@/features/quest/components/quest-list-page";
import { getQuestListWithTrader } from "@/features/quest/api";
import { getUserLocale } from "@/i18n/locale";
import { createPageMetadata, fallbackMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const data = await getQuestListWithTrader(id);
    const trader =
      data.trader_list.find((entry) => entry.normalized_name === id) ??
      data.quest_list.find((entry) => entry.trader)?.trader;
    const name = trader?.name_ko || trader?.name_en || id;

    return createPageMetadata({
      title: `타르코프 퀘스트 ${name}`,
      description: `Escape from Tarkov 전체 퀘스트 중 ${name} 퀘스트와 목표, 보상, 카파 정보를 제공합니다.`,
      path: `/quest/${id}`,
      image: trader?.image,
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
  const data = await getQuestListWithTrader(id);

  return <QuestListPage traderId={id} data={data} locale={locale} />;
}
