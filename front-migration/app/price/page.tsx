import { getUserLocale } from "@/i18n/locale";
import { PricePage } from "@/features/price/components/price-page";

export default async function Page() {
  const locale = await getUserLocale();

  return <PricePage locale={locale} />;
}
