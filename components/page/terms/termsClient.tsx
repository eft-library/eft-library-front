import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";

interface TermsClient {
  terms: TermsObject;
}

interface TermsObject {
  id: string;
  json_value: JsonValue;
}

interface JsonValue {
  en: string;
  ko: string;
  ja: string;
}

export default function TermsClient({ terms }: TermsClient) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div>
      <div
        className="ql-editor font-bold text-lg"
        dangerouslySetInnerHTML={{ __html: terms.json_value[localeKey] }}
      />
    </div>
  );
}
