import { cities, eventTypes, getService, getVendor, type Service, type Vendor } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export function formatAdminDate(value?: string, locale: Locale = "fr") {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-DZ" : "en-GB", {
    dateStyle: "medium",
    timeStyle: value.includes("T") ? "short" : undefined,
  }).format(date);
}

export function eventTypeLabel(slug: string | undefined, locale: Locale) {
  const found = eventTypes.find((item) => item.slug === slug);
  return found ? localized(found.name, locale) : slug || "—";
}

export function cityLabel(slug: string | undefined, locale: Locale) {
  const found = cities.find((item) => item.slug === slug);
  return found ? localized(found.name, locale) : slug || "—";
}

export function vendorLabel(slug: string, vendors?: Vendor[]) {
  return vendors?.find((item) => item.slug === slug)?.name || getVendor(slug)?.name || slug;
}

export function serviceLabel(slug: string, locale: Locale, services?: Service[]) {
  const found = services?.find((item) => item.slug === slug) || getService(slug);
  return found ? localized(found.name, locale) : slug;
}
