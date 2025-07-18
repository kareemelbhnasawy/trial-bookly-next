// This file is temporarily renamed to avoid conflicts with next-intl
// We'll implement a simpler i18n solution

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export function getDirection(locale: string): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getFontFamily(locale: string): string {
  return locale === "ar" ? "font-arabic" : "font-english";
}
