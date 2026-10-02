import type { Locale } from "@/i18n/routing";

export function formatPrice(amount: number, locale: Locale) {
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-DZ" : "en-DZ", {
    maximumFractionDigits: 0,
  }).format(amount);

  return locale === "fr" ? `${formatted} DA` : `${formatted} DZD`;
}

export function localized<T extends { fr: string; en: string }>(
  value: T,
  locale: Locale,
) {
  return value[locale];
}

export function formatEventDate(value: string, locale: Locale) {
  if (!value) return "—";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-DZ" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}
