import { HomePage } from "@/features/home/components/home-page";
import { getHomeMain } from "@/features/home/api";
import { getUserLocale } from "@/i18n/locale";
import { getUICopy } from "@/lib/constants/ui-copy";
import { createPageMetadata } from "@/lib/seo/metadata";

export const metadata = createPageMetadata({
  title: "타르코프 도서관",
  description:
    "Escape from Tarkov 퀘스트, 지도, 아이템, 은신처, 보스, 시세 정보를 한곳에서 확인할 수 있는 타르코프 도서관입니다.",
  path: "/",
});

export default async function Page() {
  const [home, locale] = await Promise.all([
    getHomeMain(),
    getUserLocale(),
  ]);
  const copy = getUICopy(locale);

  return (
    <HomePage
      home={home}
      labels={{
        recommendationFeature: copy.home.recommendationFeature,
        event: copy.home.event,
        comingSoon: copy.home.comingSoon,
        patchNotes: copy.home.patchNotes,
        tarkovInfo: copy.home.tarkovInfo,
        notice: copy.home.notice,
        recentPosts: copy.home.recentPosts,
        noNotice: copy.home.noNotice,
        noPosts: copy.home.noPosts,
      }}
      locale={locale}
    />
  );
}
