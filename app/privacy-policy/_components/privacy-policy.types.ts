export interface PrivacyPolicyViewTypes {
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
