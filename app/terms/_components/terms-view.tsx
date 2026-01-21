import { TermsViewTypes } from "./terms.types";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { ruleI18N } from "@/lib/consts/i18nConsts";

export default function TermsView({ terms }: TermsViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ViewWrapper>
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-7xl">
        <div className="text-center mb-4">
          <h1 className="text-3xl md:text-3xl lg:text-4xl font-bold mb-2 dark:text-white text-gray-900">
            {ruleI18N.terms[localeKey]}
          </h1>
        </div>
        <div
          className="ql-editor font-bold text-lg"
          dangerouslySetInnerHTML={{ __html: terms.json_value[localeKey] }}
        />
      </div>
    </ViewWrapper>
  );
}
