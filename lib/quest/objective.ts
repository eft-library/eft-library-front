import type { Locale } from "@/i18n/config";

const optionalObjectiveLabel: Record<Locale, string> = {
  ko: "선택 사항",
  en: "Optional",
  ja: "オプション",
};

export function getOptionalObjectiveLabel(locale: Locale) {
  return optionalObjectiveLabel[locale];
}
