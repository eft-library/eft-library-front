export interface TermsViewTypes {
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
