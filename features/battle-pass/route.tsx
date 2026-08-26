import { getUserLocale } from "@/i18n/locale";
import { getActiveBattlePass } from "@/features/battle-pass/api";
import { BattlePassPage } from "@/features/battle-pass/components/battle-pass-page";

export async function BattlePassRoute() {
  const locale = await getUserLocale();
  let data: Awaited<ReturnType<typeof getActiveBattlePass>> = null;

  try {
    data = await getActiveBattlePass();
  } catch {}

  return <BattlePassPage data={data} locale={locale} />;
}
