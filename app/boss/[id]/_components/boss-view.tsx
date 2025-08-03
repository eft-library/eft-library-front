import type { BossDetail } from "./boss.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { boss18N } from "@/lib/consts/i18nConsts";
import BossSelector from "./BossSelector/boss-selector";
import BossLocation from "./BossLocation/boss-location";
import BossHealth from "./BossHealth/boss-health";
import BossLoot from "./BossLoot/boss-loot";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import AdBanner from "@/components/custom/Adsense/ad-banner";

export default function BossView({ bossData }: BossDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <ViewWrapper>
      <div className="min-h-screen dark:bg-[#1e2124] dark:text-white bg-gray-50 text-black">
        <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-7xl">
          <h1 className="text-xl sm:text-4xl font-bold text-center mb-8">
            {boss18N.title[localeKey]}
          </h1>
          <BossSelector bossData={bossData} />
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
            maxWidth={1220}
          />
          <div className="space-y-6 sm:space-y-8 mt-4">
            <BossLocation bossData={bossData} />
            <BossHealth subFollowers={bossData.boss.children} />
            <BossLoot follower={bossData.boss} />
          </div>
        </div>
      </div>
    </ViewWrapper>
  );
}
