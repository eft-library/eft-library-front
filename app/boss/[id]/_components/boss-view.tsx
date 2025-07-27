import type { BossDetail } from "./boss.types";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { boss18N } from "@/lib/consts/i18nConsts";
import BossSelector from "./BossSelector/boss-selector";
import BossLocation from "./BossLocation/boss-location";
import BossHealth from "./BossHealth/boss-health";
import BossLoot from "./BossLoot/boss-loot";

export default function BossView({ bossData }: BossDetail) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-4 sm:py-8 space-y-6 sm:space-y-8 max-w-6xl">
        <h1 className="text-xl sm:text-4xl font-bold text-center mb-8">
          {boss18N.title[localeKey]}
        </h1>
        <BossSelector bossData={bossData} />
        <div className="space-y-6 sm:space-y-8">
          <BossLocation bossData={bossData} />
          <BossHealth subFollowers={bossData.boss.children} />
          <BossLoot follower={bossData.boss} />
        </div>
      </div>
    </div>
  );
}
