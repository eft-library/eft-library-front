import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetQuest from "./data/getQuest";
import GetQuestSelector from "./data/getQuestSelector";
import AdBanner from "../../custom/adsense/adBanner";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { questI18N } from "@/lib/consts/i18nConsts";

export default function Quest() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {questI18N.title[localeKey]}
      </h1>
      <GetQuestSelector />
      <div className="w-[1200px]">
        <AdBanner
          dataAdFormat={"auto"}
          dataFullWidthResponsive={true}
          dataAdSlot="2690838054"
        />
      </div>
      <GetQuest />
    </ContentsWrapper>
  );
}
