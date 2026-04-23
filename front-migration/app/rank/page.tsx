import { getUserLocale } from "@/i18n/locale";
import { RankPage } from "@/features/rank/components/rank-page";

export default async function Page() {
  const locale = await getUserLocale();

  return <RankPage locale={locale} />;
}
