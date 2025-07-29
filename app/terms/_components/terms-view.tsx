import { TermsViewTypes } from "./terms.types";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function TermsView({ terms }: TermsViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ViewWrapper>
      <div
        className="ql-editor font-bold text-lg"
        dangerouslySetInnerHTML={{ __html: terms.json_value[localeKey] }}
      />
    </ViewWrapper>
  );
}
