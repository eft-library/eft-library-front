import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import AdBanner from "../../custom/adsense/adBanner";
import PriceClient from "./data/priceClient";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { price18N } from "@/lib/consts/i18nConsts";

export default function Price() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {price18N.title[localeKey]}
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
      <PriceClient />
    </ContentsWrapper>
  );
}
