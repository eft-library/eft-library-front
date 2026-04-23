import { connection } from "next/server";

import { QuestDetailPage } from "@/features/quest/components/quest-detail-page";
import { getQuestDetail } from "@/features/quest/api";
import { getUserLocale } from "@/i18n/locale";

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
