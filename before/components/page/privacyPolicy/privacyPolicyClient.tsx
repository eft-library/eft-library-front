import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

interface PrivacyPolicyClient {
  privacyPolicy: PrivacyPolicyObject;
}

interface PrivacyPolicyObject {
  id: string;
  json_value: JsonValue;
}

interface JsonValue {
  en: string;
  ko: string;
  ja: string;
}

export default function PrivacyPolicyClient({
  privacyPolicy,
}: PrivacyPolicyClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div>
      <div
        className="ql-editor font-bold text-lg"
        dangerouslySetInnerHTML={{
          __html: privacyPolicy.json_value[localeKey],
        }}
      />
    </div>
  );
}
