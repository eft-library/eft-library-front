import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetStation from "./data/getStation";
import AdBanner from "../../custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { hideoutI18n } from "@/lib/consts/i18nConsts";

export default function HideoutStation() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {hideoutI18n.title[localeKey]}
      </h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetStation />
    </ContentsWrapper>
  );
}
