import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import AdBanner from "../../custom/adsense/adBanner";
import RankClient from "./data/rankClient";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { rankI18N } from "@/lib/consts/i18nConsts";

export default function Rank() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {rankI18N.title[localeKey]}
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
      <RankClient />
    </ContentsWrapper>
  );
}
