import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetHeadset from "./data/getHeadset";
import AdBanner from "../../custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";

export default function Headset() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {itemI18N.headset.title[localeKey]}
      </h1>
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetHeadset />
    </ContentsWrapper>
  );
}
