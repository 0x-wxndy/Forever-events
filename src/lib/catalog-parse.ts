import type { Localized, Service, ServiceIcon, Vendor, VendorPackage } from "@/data/catalog";
import { slugify, uniqueSlug } from "@/lib/catalog-store";

const icons: ServiceIcon[] = ["camera", "flower", "cake", "music", "sparkles", "map"];

export function asLocalized(value: unknown, fallback: Localized = { fr: "", en: "" }): Localized {
  const record = value && typeof value === "object" ? (value as Record<string, unknown>) : {};
  return {
    fr: String(record.fr ?? fallback.fr ?? ""),
    en: String(record.en ?? fallback.en ?? ""),
  };
}

export function parseService(body: Record<string, unknown>, taken: string[], previousSlug?: string): Service {
  const name = asLocalized(body.name);
  const slug = uniqueSlug(String(body.slug || name.en || name.fr), taken, previousSlug);
  const icon = icons.includes(body.icon as ServiceIcon) ? (body.icon as ServiceIcon) : "sparkles";
  return {
    slug,
    name,
    tagline: asLocalized(body.tagline),
    description: asLocalized(body.description),
    image: String(body.image || "/images/photographers.jpg"),
    icon,
  };
}

function parsePackages(value: unknown): VendorPackage[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const record = item && typeof item === "object" ? (item as Record<string, unknown>) : {};
    return {
      name: asLocalized(record.name),
      startingPrice: Number(record.startingPrice) || 0,
      details: asLocalized(record.details),
    };
  });
}

export function parseVendor(body: Record<string, unknown>, taken: string[], previousSlug?: string): Vendor {
  const name = String(body.name || "").trim();
  const slug = uniqueSlug(String(body.slug || name), taken, previousSlug);
  const gallery = Array.isArray(body.gallery)
    ? body.gallery.map((item) => String(item)).filter(Boolean)
    : [];
  return {
    slug,
    name: name || slugify(slug) || "Vendor",
    serviceSlug: String(body.serviceSlug || ""),
    citySlug: String(body.citySlug || "oran"),
    startingPrice: Number(body.startingPrice) || 0,
    bio: asLocalized(body.bio),
    coverImage: String(body.coverImage || "/images/photographers.jpg"),
    gallery,
    packages: parsePackages(body.packages),
    rating: Number(body.rating) || 4.8,
    reviews: Number(body.reviews) || 0,
    badge: asLocalized(body.badge, { fr: "Sélectionné", en: "Curated" }),
  };
}
