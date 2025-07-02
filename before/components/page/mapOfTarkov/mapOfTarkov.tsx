import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetMapOfTarkov from "./data/getMapOfTarkov";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { mapOfTarkovI18n } from "@/lib/consts/i18nConsts";

export default function MapOfTarkov() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {mapOfTarkovI18n.title[localeKey]}
      </h1>
      <GetMapOfTarkov />
    </ContentsWrapper>
  );
}
