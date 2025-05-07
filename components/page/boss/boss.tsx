import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetBoss from "./data/getBoss";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { boss18N } from "@/lib/consts/i18nConsts";

export default function Boss() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {boss18N.title[localeKey]}
      </h1>
      <GetBoss />
    </ContentsWrapper>
  );
}
