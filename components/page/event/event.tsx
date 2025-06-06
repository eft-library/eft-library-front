import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetEvent from "@/components/page/event/data/getEvent";
import AdBanner from "../../custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";

export default function Event() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {information18N.event.title[localeKey]}
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
      <GetEvent />
    </ContentsWrapper>
  );
}
