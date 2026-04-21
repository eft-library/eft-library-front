import type { Locale } from "@/i18n/config";

const intlLocaleMap: Record<Locale, string> = {
  ko: "ko-KR",
  en: "en-US",
  ja: "ja-JP",
};

export function formatIsoDate(isoDateString: string, locale: Locale = "ko") {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat(intlLocaleMap[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function formatIsoDateTime(
  isoDateString: string,
  locale: Locale = "ko",
) {
  const date = new Date(isoDateString);

  return new Intl.DateTimeFormat(intlLocaleMap[locale], {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function getMsUntilNext20MinuteMark() {
  const now = new Date();
  const next = new Date(now);

  next.setMinutes(20, 0, 0);

  if (now.getMinutes() >= 20) {
    next.setHours(next.getHours() + 1);
  }

  return next.getTime() - now.getTime();
}
