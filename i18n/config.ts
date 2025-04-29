export type Locale = (typeof locales)[number];

export const locales = ["en", "ko", "ja"] as const;
export const defaultLocale: Locale = "en";
