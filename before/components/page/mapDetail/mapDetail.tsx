import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapDetail from "@/components/page/mapDetail/data/getMapDetail";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { interactiveMapI18N } from "@/lib/consts/i18nConsts";

export default function MapDetail() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <div className={"flex flex-col justify-center items-center gap-2"}>
        <h1 className="text-white text-4xl font-bold text-center">
          {interactiveMapI18N.title[localeKey]}
        </h1>
      </div>
      <GetMapDetail />
    </ContentsWrapper>
  );
}
