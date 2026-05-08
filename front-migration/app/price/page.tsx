import { getUserLocale } from "@/i18n/locale";
import { PricePage } from "@/features/price/components/price-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 아이템 시세",
  description: "Escape from Tarkov 아이템 시세와 최근 가격 변동을 PVP/PVE 기준으로 확인할 수 있습니다.",
  path: "/price",
});

export default async function Page() {
  const locale = await getUserLocale();

  return <PricePage locale={locale} />;
}
