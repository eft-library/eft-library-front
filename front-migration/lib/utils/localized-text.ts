import type { Locale } from "@/i18n/config";
import type { LocalizedName } from "@/types/api/home";

export type SupportedLocale = Locale;

export function pickLocalizedText(
  value: LocalizedName,
  locale: SupportedLocale = "ko",
) {
  switch (locale) {
    case "en":
      return value.name_en;
    case "ja":
      return value.name_ja;
    case "ko":
    default:
      return value.name_ko;
  }
}

export function pickLocalizedField<T extends Record<string, unknown>>(
  value: T,
  locale: SupportedLocale,
  prefix: string,
) {
  const key = `${prefix}_${locale}` as keyof T;
  return value[key];
}
