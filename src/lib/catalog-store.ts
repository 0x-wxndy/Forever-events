import { mkdir, readFile, writeFile } from "fs/promises";
import { unstable_noStore as noStore } from "next/cache";
import path from "path";
import {
  services as seedServices,
  vendors as seedVendors,
  type Service,
  type Vendor,
} from "@/data/catalog";
import { vendorMeta } from "@/data/vendor-meta";

export type LiveCatalog = {
  services: Service[];
  vendors: Vendor[];
};

const dataDir = path.join(process.cwd(), "data");
const catalogFile = path.join(dataDir, "catalog.json");

function withMeta(vendor: Vendor): Vendor {
  const meta = vendorMeta[vendor.slug];
  return {
    ...vendor,
    rating: vendor.rating ?? meta?.rating ?? 4.8,
    reviews: vendor.reviews ?? meta?.reviews ?? 24,
    badge: vendor.badge ?? meta?.badge ?? { fr: "Sélectionné", en: "Curated" },
  };
}

function seedCatalog(): LiveCatalog {
  return {
    services: seedServices,
    vendors: seedVendors.map(withMeta),
  };
}

export async function readCatalog(): Promise<LiveCatalog> {
  noStore();
  try {
    const raw = await readFile(catalogFile, "utf8");
    const parsed = JSON.parse(raw) as LiveCatalog;
    if (!Array.isArray(parsed.services) || !Array.isArray(parsed.vendors)) {
      return seedCatalog();
    }
    return {
      services: parsed.services,
      vendors: parsed.vendors.map(withMeta),
    };
  } catch {
    const seeded = seedCatalog();
    await writeCatalog(seeded);
    return seeded;
  }
}

export async function writeCatalog(catalog: LiveCatalog) {
  await mkdir(dataDir, { recursive: true });
  await writeFile(catalogFile, JSON.stringify(catalog, null, 2));
}

export async function getLiveService(slug: string) {
  const { services } = await readCatalog();
  return services.find((item) => item.slug === slug) ?? null;
}

export async function getLiveVendor(slug: string) {
  const { vendors } = await readCatalog();
  return vendors.find((item) => item.slug === slug) ?? null;
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
}

export function uniqueSlug(value: string, taken: string[], ignore?: string) {
  const base = slugify(value) || "item";
  if (!taken.includes(base) || base === ignore) return base;
  let index = 2;
  while (taken.includes(`${base}-${index}`)) index += 1;
  return `${base}-${index}`;
}

export async function upsertService(service: Service, previousSlug?: string) {
  const catalog = await readCatalog();
  catalog.services = catalog.services.filter(
    (item) => item.slug !== service.slug && item.slug !== previousSlug,
  );
  if (previousSlug && previousSlug !== service.slug) {
    catalog.vendors = catalog.vendors.map((vendor) =>
      vendor.serviceSlug === previousSlug ? { ...vendor, serviceSlug: service.slug } : vendor,
    );
  }
  catalog.services.push(service);
  await writeCatalog(catalog);
  return catalog;
}

export async function deleteService(slug: string) {
  const catalog = await readCatalog();
  const inUse = catalog.vendors.filter((vendor) => vendor.serviceSlug === slug).length;
  if (inUse > 0) {
    return { ok: false as const, inUse };
  }
  catalog.services = catalog.services.filter((item) => item.slug !== slug);
  await writeCatalog(catalog);
  return { ok: true as const, catalog };
}

export async function upsertVendor(vendor: Vendor, previousSlug?: string) {
  const catalog = await readCatalog();
  catalog.vendors = catalog.vendors.filter(
    (item) => item.slug !== vendor.slug && item.slug !== previousSlug,
  );
  catalog.vendors.push(withMeta(vendor));
  await writeCatalog(catalog);
  return catalog;
}

export async function deleteVendor(slug: string) {
  const catalog = await readCatalog();
  catalog.vendors = catalog.vendors.filter((item) => item.slug !== slug);
  await writeCatalog(catalog);
  return catalog;
}
