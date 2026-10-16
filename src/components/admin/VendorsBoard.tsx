"use client";

import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { CategoryManager } from "@/components/admin/CategoryManager";
import type { Service, Vendor } from "@/data/catalog";
import { formatPrice, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function VendorsBoard({
  services,
  vendors,
}: {
  services: Service[];
  vendors: Vendor[];
}) {
  const t = useTranslations("admin");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [tab, setTab] = useState<"vendors" | "categories">("vendors");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  const vendorCounts = useMemo(() => {
    return vendors.reduce<Record<string, number>>((acc, vendor) => {
      acc[vendor.serviceSlug] = (acc[vendor.serviceSlug] ?? 0) + 1;
      return acc;
    }, {});
  }, [vendors]);

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vendors.filter((vendor) => {
      if (category && vendor.serviceSlug !== category) return false;
      if (!needle) return true;
      const service = services.find((item) => item.slug === vendor.serviceSlug);
      return [vendor.name, vendor.citySlug, service ? localized(service.name, locale) : ""]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [category, locale, query, services, vendors]);

  async function remove(slug: string) {
    if (!confirm(t("confirmDeleteVendor"))) return;
    const response = await fetch(`/api/admin/vendors/${slug}`, { method: "DELETE" });
    if (response.ok) router.refresh();
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink">{t("catalogTitle")}</h1>
          <p className="mt-1 text-sm text-muted">{t("catalogLead")}</p>
        </div>
        {tab === "vendors" && (
          <Link
            href="/admin/vendors/new"
            className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-2.5 text-sm text-white"
          >
            <Plus className="h-4 w-4" /> {t("addVendor")}
          </Link>
        )}
      </div>

      <div className="mt-6 flex gap-2">
        {(["vendors", "categories"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={cn(
              "rounded-full px-4 py-2 text-sm",
              tab === item ? "bg-rose-deep text-white" : "bg-white text-dusty shadow-soft",
            )}
          >
            {t(item === "vendors" ? "vendors" : "categories")}
          </button>
        ))}
      </div>

      {tab === "categories" ? (
        <div className="mt-6">
          <CategoryManager services={services} vendorCounts={vendorCounts} />
        </div>
      ) : (
        <>
          <div className="mt-6 flex flex-col gap-3 md:flex-row">
            <label className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("searchVendors")}
                className="field-input pl-11"
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="field-input md:w-56"
            >
              <option value="">{t("allCategories")}</option>
              {services.map((service) => (
                <option key={service.slug} value={service.slug}>
                  {localized(service.name, locale)}
                </option>
              ))}
            </select>
          </div>
          <p className="mt-3 text-xs text-muted">
            {list.length} / {vendors.length} {t("vendors")}
          </p>
          <div className="mt-4 space-y-4">
            {list.map((vendor) => {
              const service = services.find((item) => item.slug === vendor.serviceSlug);
              return (
                <article
                  key={vendor.slug}
                  className="flex flex-wrap items-center gap-4 rounded-[1.6rem] bg-white p-5 shadow-soft"
                >
                  <div className="relative h-20 w-24 overflow-hidden rounded-2xl bg-blush/40">
                    {vendor.coverImage ? (
                      vendor.coverImage.startsWith("http") ? (
                        <img src={vendor.coverImage} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <Image src={vendor.coverImage} alt="" fill className="object-cover" />
                      )
                    ) : null}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs uppercase tracking-[0.18em] text-muted">
                      {service ? localized(service.name, locale) : vendor.serviceSlug} · {vendor.citySlug}
                    </p>
                    <h2 className="font-serif text-2xl text-ink">{vendor.name}</h2>
                    <p className="mt-1 text-sm text-dusty">{formatPrice(vendor.startingPrice, locale)}</p>
                    <p className="mt-1 line-clamp-2 text-sm text-muted">{localized(vendor.bio, locale)}</p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/admin/vendors/${vendor.slug}`}
                      className="inline-flex items-center gap-1 rounded-full border border-rose/20 px-3 py-2 text-sm text-dusty"
                    >
                      <Pencil className="h-3.5 w-3.5" /> {t("edit")}
                    </Link>
                    <button
                      type="button"
                      onClick={() => remove(vendor.slug)}
                      className="inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm text-rose-deep"
                    >
                      <Trash2 className="h-3.5 w-3.5" /> {t("delete")}
                    </button>
                  </div>
                </article>
              );
            })}
            {list.length === 0 && <p className="text-sm text-muted">{t("emptyVendors")}</p>}
          </div>
        </>
      )}
    </div>
  );
}
