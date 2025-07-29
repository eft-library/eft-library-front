import { PrivacyPolicyViewTypes } from "./privacy-policy.types";
import ViewWrapper from "@/components/custom/ViewWrapper/view-wrapper";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

export default function PrivacyPolicyView({
  privacyPolicy,
}: PrivacyPolicyViewTypes) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <ViewWrapper>
      <div
        className="ql-editor font-bold text-lg"
        dangerouslySetInnerHTML={{
          __html: privacyPolicy.json_value[localeKey],
        }}
      />
    </ViewWrapper>
  );
}
