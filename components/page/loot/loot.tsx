import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetLoot from "./data/getLoot";
import AdBanner from "../../custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";

export default function Loot() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {itemI18N.loot.title[localeKey]}
      </h1>

      <div className="w-full flex items-center justify-center">
        <div className="w-[1200px]">
          <AdBanner
            dataAdFormat={"auto"}
            dataFullWidthResponsive={true}
            dataAdSlot="2690838054"
          />
        </div>
      </div>
      <GetLoot />
    </ContentsWrapper>
  );
}
