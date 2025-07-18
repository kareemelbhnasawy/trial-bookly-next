import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

export function getDirection(locale: string): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getFontFamily(locale: string): string {
  return locale === "ar" ? "font-arabic" : "font-english";
}

export function getDateFormat(locale: string): Intl.DateTimeFormatOptions {
  return {
    year: "numeric",
    month: "long",
    day: "numeric",
    calendar: locale === "ar" ? "islamic-umalqura" : "gregory",
  };
}

export function getNumberFormat(locale: string): Intl.NumberFormatOptions {
  return {
    numberingSystem: locale === "ar" ? "arab" : "latn",
  };
}

export function getCurrencyFormat(
  locale: string,
  currency: string = "SAR",
): Intl.NumberFormatOptions {
  return {
    style: "currency",
    currency,
    numberingSystem: locale === "ar" ? "arab" : "latn",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };
}

// Language switcher utilities
export function getAlternateLocale(currentLocale: string): string {
  return currentLocale === "ar" ? "en" : "ar";
}

export function getLocalizedPath(path: string, locale: string): string {
  // Remove existing locale prefix if any
  const cleanPath = path.replace(/^\/(ar|en)/, "") || "/";

  // Add new locale prefix
  return `/${locale}${cleanPath === "/" ? "" : cleanPath}`;
}

// RTL/LTR specific utilities
export function getTextAlign(locale: string): "right" | "left" {
  return locale === "ar" ? "right" : "left";
}

export function getMarginClass(
  locale: string,
  position: "start" | "end",
): string {
  if (locale === "ar") {
    return position === "start" ? "mr-" : "ml-";
  } else {
    return position === "start" ? "ml-" : "mr-";
  }
}

export function getPaddingClass(
  locale: string,
  position: "start" | "end",
): string {
  if (locale === "ar") {
    return position === "start" ? "pr-" : "pl-";
  } else {
    return position === "start" ? "pl-" : "pr-";
  }
}

// Validation for Arabic text
export function isArabicText(text: string): boolean {
  const arabicRegex =
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
  return arabicRegex.test(text);
}

// Format phone numbers for different locales
export function formatPhoneNumber(phone: string, locale: string): string {
  if (!phone) return "";

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Format for Saudi/GCC numbers
  if (digits.startsWith("966") || digits.startsWith("0")) {
    const cleanNumber = digits.startsWith("966")
      ? digits.slice(3)
      : digits.slice(1);
    if (locale === "ar") {
      return `+٩٦٦ ${cleanNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")}`;
    } else {
      return `+966 ${cleanNumber.replace(/(\d{2})(\d{3})(\d{4})/, "$1 $2 $3")}`;
    }
  }

  return phone;
}

// Convert numbers to Arabic-Indic numerals
export function toArabicNumerals(text: string): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return text.replace(/[0-9]/g, (digit) => arabicNumerals[parseInt(digit)]);
}

// Convert Arabic-Indic numerals to Western
export function toWesternNumerals(text: string): string {
  const arabicToWestern: { [key: string]: string } = {
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9",
  };
  return text.replace(/[٠-٩]/g, (digit) => arabicToWestern[digit] || digit);
}
