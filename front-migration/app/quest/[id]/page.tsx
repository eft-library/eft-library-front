import { connection } from "next/server";

import { QuestListPage } from "@/features/quest/components/quest-list-page";
import { getQuestListWithTrader } from "@/features/quest/api";
import { getUserLocale } from "@/i18n/locale";

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
