import ContentsWrapper from "@/components/custom/contentsWrapper/contentsWrapper";
import GetEventDetail from "@/components/page/eventDetail/data/getEventDetail";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { information18N } from "@/lib/consts/i18nConsts";

export default function EventDetail() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ContentsWrapper>
      <h1 className="text-white text-4xl font-bold text-center">
        {information18N.event.title[localeKey]}
      </h1>
      <GetEventDetail />
    </ContentsWrapper>
  );
}
