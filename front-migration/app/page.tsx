import { HomePage } from "@/features/home/components/home-page";
import { getHomeMain } from "@/features/home/api";
import { getUserLocale } from "@/i18n/locale";
import { getUICopy } from "@/lib/constants/ui-copy";

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
