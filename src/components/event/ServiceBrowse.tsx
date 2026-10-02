"use client";

import {
  Heart,
  Mail,
  MapPin,
  Search,
  SlidersHorizontal,
  Sparkles,
  Star,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo, useState } from "react";
import { EventStepper } from "@/components/event/EventStepper";
import { FloralScreen } from "@/components/event/FloralScreen";
import { RequireEventDetails } from "@/components/event/RequireEventDetails";
import { cities, getCity, getService, services, vendors } from "@/data/catalog";
import { getVendorMeta } from "@/data/vendor-meta";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { useEventStore } from "@/store/event-store";
import { cn } from "@/lib/cn";

export function ServiceBrowse({
  serviceSlug,
  initialQuery = "",
}: {
  serviceSlug?: string;
  initialQuery?: string;
}) {
  return (
    <RequireEventDetails>
      <BrowseBody serviceSlug={serviceSlug} initialQuery={initialQuery} />
    </RequireEventDetails>
  );
}

function BrowseBody({
  serviceSlug,
  initialQuery,
}: {
  serviceSlug?: string;
  initialQuery: string;
}) {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const details = useEventStore((state) => state.details);
  const addVendor = useEventStore((state) => state.addVendor);
  const setDetails = useEventStore((state) => state.setDetails);
  const selections = useEventStore((state) => state.selections);
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState<string | null>(serviceSlug ?? null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [city, setCity] = useState(details.citySlug || "oran");

  const activeService = category ? getService(category) : null;

  const list = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return vendors.filter((vendor) => {
      if (category && vendor.serviceSlug !== category) return false;
      if (!needle) return true;
      const service = getService(vendor.serviceSlug);
      const haystack = [
        vendor.name,
        localized(vendor.bio, locale),
        service ? localized(service.name, locale) : "",
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(needle);
    });
  }, [category, locale, query]);

  function onQueryChange(value: string) {
    setQuery(value);
    setCategory(null);
  }

  function selectCategory(slug: string | null) {
    setCategory(slug);
    setFilterOpen(false);
    if (!slug) setQuery("");
  }

  return (
    <FloralScreen>
      <EventStepper
        current={2}
        backHref="/my-event"
        labels={{
          details: t("stepDetails"),
          services: t("stepServices"),
          review: t("stepReview"),
          confirm: t("stepConfirm"),
        }}
      />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink md:text-4xl">{t("browseTitle")}</h1>
          <p className="text-sm text-muted">{t("browseLead")}</p>
        </div>
        <p className="hidden max-w-[14rem] text-right font-script text-2xl text-dusty md:block">
          {t("everyDetail")}
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={t("searchPlaceholder")}
            className="field-input pl-11"
          />
        </label>
        <label className="relative md:w-48">
          <MapPin className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <select
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setDetails({ citySlug: event.target.value });
            }}
            className="field-input pl-11"
          >
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {localized(item.name, locale)}
              </option>
            ))}
          </select>
        </label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((open) => !open)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 rounded-[0.9rem] border px-4 py-2.5 text-sm md:w-auto",
              category
                ? "border-rose-deep bg-blush text-dusty"
                : "border-rose/20 bg-white/80 text-dusty",
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {category && activeService ? localized(activeService.name, locale) : t("filter")}
          </button>
          {filterOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10 cursor-default"
                aria-label={t("clearFilter")}
                onClick={() => setFilterOpen(false)}
              />
              <div className="absolute right-0 z-20 mt-2 w-56 rounded-2xl border border-rose/15 bg-white p-2 shadow-soft">
              <button
                type="button"
                onClick={() => selectCategory(null)}
                className={cn(
                  "w-full rounded-xl px-3 py-2 text-left text-sm",
                  !category ? "bg-blush text-dusty" : "text-ink hover:bg-blush/60",
                )}
              >
                {t("allCategories")}
              </button>
              {services.map((service) => (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => selectCategory(service.slug)}
                  className={cn(
                    "w-full rounded-xl px-3 py-2 text-left text-sm",
                    category === service.slug
                      ? "bg-blush text-dusty"
                      : "text-ink hover:bg-blush/60",
                  )}
                >
                  {localized(service.name, locale)}
                </button>
              ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-medium text-ink">
          {t("resultsFor", {
            service: activeService
              ? localized(activeService.name, locale)
              : query || t("allServices"),
          })}
        </h2>
        <p className="text-xs text-muted">
          {list.length} {t("results")}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((vendor) => {
          const meta = getVendorMeta(vendor.slug);
          const selected = selections.some((item) => item.vendorSlug === vendor.slug);
          const cityLabel = getCity(vendor.citySlug);
          return (
            <article
              key={vendor.slug}
              className="overflow-hidden rounded-[1.6rem] bg-white/90 shadow-soft"
            >
              <div className="relative h-44">
                <Image src={vendor.coverImage} alt={vendor.name} fill className="object-cover" />
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] text-dusty">
                  {localized(meta.badge, locale)}
                </span>
                <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-rose-deep">
                  <Heart className={cn("h-4 w-4", selected && "fill-rose-deep")} />
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-ink">{vendor.name}</h3>
                <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                  <MapPin className="h-3 w-3" />{" "}
                  {cityLabel ? localized(cityLabel.name, locale) : vendor.citySlug}
                </p>
                <p className="mt-1 flex items-center gap-1 text-xs text-champagne">
                  <Star className="h-3.5 w-3.5 fill-champagne" />
                  {meta.rating} ({meta.reviews})
                </p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-muted">
                  {localized(vendor.bio, locale)}
                </p>
                <button
                  type="button"
                  onClick={() =>
                    addVendor({
                      vendorSlug: vendor.slug,
                      serviceSlug: vendor.serviceSlug,
                      citySlug: vendor.citySlug,
                    })
                  }
                  className={cn(
                    "mt-4 flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm",
                    selected
                      ? "border border-rose/30 bg-blush text-dusty"
                      : "bg-rose-deep text-white",
                  )}
                >
                  {selected ? t("addedShort") : t("addToEvent")}
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.6rem] bg-white/85 px-5 py-4 shadow-soft sm:flex-row sm:items-center">
        <div>
          <p className="flex items-center gap-2 font-medium text-ink">
            <Sparkles className="h-4 w-4 text-rose-deep" />
            {t("cantFind")}
          </p>
          <p className="mt-1 text-sm text-muted">{t("cantFindLead")}</p>
        </div>
        <Link
          href="/contact?from=browse"
          className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white px-4 py-2.5 text-sm text-dusty"
        >
          <Mail className="h-4 w-4" />
          {t("requestRec")}
        </Link>
      </div>
    </FloralScreen>
  );
}
