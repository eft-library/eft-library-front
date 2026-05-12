import { notFound } from "next/navigation";

import { getBossDetail } from "@/features/boss/api";
import { BossPage } from "@/features/boss/components/boss-page";
import { getBossPageCopy } from "@/features/boss/config";
import { getUserLocale } from "@/i18n/locale";

export async function BossRoute({ bossId }: { bossId: string }) {
  const locale = await getUserLocale();
  const labels = getBossPageCopy(locale);
  const bossData = await getBossDetail(bossId);

  if (!bossData.boss) {
    notFound();
  }

  return <BossPage bossId={bossId} bossData={bossData} locale={locale} labels={labels} />;
}
