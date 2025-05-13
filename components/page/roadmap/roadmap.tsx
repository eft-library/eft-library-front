import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetRoadmap from "./data/getRoadmap";
import AdBanner from "@/components/custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { roadmapI18N } from "@/lib/consts/i18nConsts";

export default function Roadmap() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center -[mb-2]">
        {roadmapI18N.title[localeKey]}
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
      <GetRoadmap />
    </ContentsWrapper>
  );
}
