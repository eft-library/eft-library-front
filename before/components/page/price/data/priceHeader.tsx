import CenterContents from "@/components/custom/gridContents/centerContents";
import TextSpan from "@/components/custom/gridContents/textSpan";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { price18N } from "@/lib/consts/i18nConsts";

export default function PriceHeader() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="grid grid-cols-5 border-b border-white p-2">
      <CenterContents>
        <TextSpan>{price18N.image[localeKey]}</TextSpan>
      </CenterContents>
      <CenterContents colSpan="2">
        <TextSpan>{price18N.name[localeKey]}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{price18N.traderPrice[localeKey]}</TextSpan>
      </CenterContents>
      <CenterContents>
        <TextSpan>{price18N.fleaMarketPrice[localeKey]}</TextSpan>
      </CenterContents>
    </div>
  );
}
