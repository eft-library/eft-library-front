import { getUserLocale } from "@/i18n/locale";
import { RankPage } from "@/features/rank/components/rank-page";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 아이템 랭크",
  description: "Escape from Tarkov 아이템을 가격대와 카테고리별 랭킹으로 확인할 수 있습니다.",
  path: "/rank",
});

export default async function Page() {
  const locale = await getUserLocale();

  return <RankPage locale={locale} />;
}
