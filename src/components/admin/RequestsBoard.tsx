"use client";

import { Check, Eye, Phone, Search, SlidersHorizontal, Users, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cities, eventTypes } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export type RequestRow = {
  id: string;
  name: string;
  phone: string;
  city: string;
  citySlug: string;
  date: string;
  eventDate: string;
  eventType: string;
  eventTypeSlug: string;
  budget: string;
  status: "new" | "inProgress" | "contacted" | "confirmed";
  vendors: { slug: string; name: string; image: string }[];
};

const statuses = ["new", "inProgress", "contacted", "confirmed"] as const;
const whenOptions = ["all", "upcoming", "thisMonth", "past"] as const;

function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

function matchesWhen(eventDate: string, when: (typeof whenOptions)[number]) {
  if (when === "all") return true;
  if (!eventDate) return false;
  const date = new Date(eventDate);
  if (Number.isNaN(date.getTime())) return false;
  const today = startOfToday();
  if (when === "upcoming") return date >= today;
  if (when === "past") return date < today;
  return date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
}

export function RequestsBoard({
  rows,
  vendorCount,
}: {
  rows: RequestRow[];
  vendorCount: number;
}) {
  const t = useTranslations("admin");
  const locale = useLocale() as Locale;
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<"" | (typeof statuses)[number]>("");
  const [city, setCity] = useState("");
  const [eventType, setEventType] = useState("");
  const [when, setWhen] = useState<(typeof whenOptions)[number]>("all");

  const counts = useMemo(() => {
    return {
      all: rows.length,
      new: rows.filter((item) => item.status === "new").length,
      inProgress: rows.filter((item) => item.status === "inProgress").length,
      contacted: rows.filter((item) => item.status === "contacted").length,
      confirmed: rows.filter((item) => item.status === "confirmed").length,
    };
  }, [rows]);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (status && row.status !== status) return false;
      if (city && row.citySlug !== city) return false;
      if (eventType && row.eventTypeSlug !== eventType) return false;
      if (!matchesWhen(row.eventDate, when)) return false;
      if (!needle) return true;
      return [
        row.name,
        row.phone,
        row.city,
        row.eventType,
        row.budget,
        ...row.vendors.map((vendor) => vendor.name),
      ]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [city, eventType, query, rows, status, when]);

  const activeFilters = Boolean(status || city || eventType || when !== "all" || query.trim());

  function clearFilters() {
    setQuery("");
    setStatus("");
    setCity("");
    setEventType("");
    setWhen("all");
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink">{t("requests")}</h1>
          <p className="text-sm text-muted">{t("manageRequests")}</p>
        </div>
        <p className="text-sm text-dusty">
          {t("resultsCount", { shown: filtered.length, total: rows.length })}
        </p>
      </div>

      <div className="mt-5 rounded-[1.6rem] bg-white/90 p-4 shadow-soft">
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-muted" />
          <span className="text-xs uppercase tracking-[0.16em] text-muted">{t("filters")}</span>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <FilterChip active={!status} onClick={() => setStatus("")}>
            {t("allStatuses")} ({counts.all})
          </FilterChip>
          {statuses.map((item) => (
            <FilterChip key={item} active={status === item} tone={item} onClick={() => setStatus(item)}>
              {t(item)} ({counts[item]})
            </FilterChip>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-3 md:flex-row">
          <label className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("searchEvents")}
              className="field-input pl-10"
            />
          </label>
          <select value={city} onChange={(event) => setCity(event.target.value)} className="field-input md:w-44">
            <option value="">{t("allCities")}</option>
            {cities.map((item) => (
              <option key={item.slug} value={item.slug}>
                {localized(item.name, locale)}
              </option>
            ))}
          </select>
          <select
            value={eventType}
            onChange={(event) => setEventType(event.target.value)}
            className="field-input md:w-48"
          >
            <option value="">{t("allEventTypes")}</option>
            {eventTypes.map((item) => (
              <option key={item.slug} value={item.slug}>
                {localized(item.name, locale)}
              </option>
            ))}
          </select>
          <select
            value={when}
            onChange={(event) => setWhen(event.target.value as (typeof whenOptions)[number])}
            className="field-input md:w-44"
          >
            {whenOptions.map((item) => (
              <option key={item} value={item}>
                {t(item === "all" ? "allDates" : item)}
              </option>
            ))}
          </select>
          {activeFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-2 text-sm text-rose-deep"
            >
              <X className="h-4 w-4" />
              {t("clearFilters")}
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 overflow-x-auto rounded-[1.6rem] bg-white/90 shadow-soft">
        <table className="min-w-[960px] w-full text-left text-sm">
          <thead className="border-b border-rose/10 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">{t("client")}</th>
              <th className="px-4 py-3">{t("phone")}</th>
              <th className="px-4 py-3">{t("city")}</th>
              <th className="px-4 py-3">{t("date")}</th>
              <th className="px-4 py-3">{t("eventType")}</th>
              <th className="px-4 py-3">{t("budget")}</th>
              <th className="px-4 py-3">{t("vendorsSelected")}</th>
              <th className="px-4 py-3">{t("status")}</th>
              <th className="px-4 py-3">{t("actions")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={10} className="px-4 py-8 text-muted">
                  {rows.length === 0 ? t("emptyRequests") : t("emptyFiltered")}
                </td>
              </tr>
            )}
            {filtered.map((item, index) => (
              <tr key={item.id} className="border-b border-rose/10">
                <td className="px-4 py-3 text-muted">{index + 1}</td>
                <td className="px-4 py-3">
                  <span className="mr-2 inline-grid h-8 w-8 place-items-center rounded-full bg-blush text-xs text-dusty">
                    {item.name.slice(0, 1).toUpperCase()}
                  </span>
                  {item.name}
                </td>
                <td className="px-4 py-3">{item.phone}</td>
                <td className="px-4 py-3">{item.city}</td>
                <td className="px-4 py-3">{item.date}</td>
                <td className="px-4 py-3">{item.eventType}</td>
                <td className="px-4 py-3">{item.budget || "—"}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center">
                    <span className="flex -space-x-2">
                      {item.vendors.slice(0, 3).map((vendor) => (
                        <span
                          key={vendor.slug}
                          className="relative h-7 w-7 overflow-hidden rounded-full border border-white"
                          title={vendor.name}
                        >
                          <Image src={vendor.image} alt="" fill className="object-cover" />
                        </span>
                      ))}
                    </span>
                    {item.vendors.length > 0 && (
                      <span className="ml-2 text-xs text-muted">+{item.vendors.length}</span>
                    )}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setStatus(item.status)}
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs",
                      item.status === "new" && "bg-rose/20 text-dusty",
                      item.status === "inProgress" && "bg-amber-100 text-amber-800",
                      item.status === "contacted" && "bg-sky-100 text-sky-800",
                      item.status === "confirmed" && "bg-emerald-100 text-emerald-800",
                    )}
                  >
                    {t(item.status)}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 text-dusty">
                    <Link href={`/admin/requests/${item.id}`} aria-label={t("view")}>
                      <Eye className="h-4 w-4" />
                    </Link>
                    <a href={`tel:${item.phone}`}>
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Stat
          label={t("totalRequests")}
          value={rows.length}
          extra={`${counts.new} ${t("new")}`}
          active={!status}
          onClick={() => setStatus("")}
        />
        <Stat
          label={t("inProgress")}
          value={counts.inProgress}
          extra={`${counts.new} ${t("new")}`}
          active={status === "inProgress"}
          onClick={() => setStatus("inProgress")}
        />
        <Stat
          label={t("confirmed")}
          value={counts.confirmed}
          extra={t("thisWeek")}
          icon="check"
          active={status === "confirmed"}
          onClick={() => setStatus("confirmed")}
        />
        <Stat
          label={t("totalVendors")}
          value={vendorCount}
          extra={t("activeVerified")}
          icon="users"
        />
      </div>
    </div>
  );
}

function FilterChip({
  active,
  tone,
  onClick,
  children,
}: {
  active: boolean;
  tone?: RequestRow["status"];
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-sm transition",
        active && !tone && "bg-rose-deep text-white",
        active && tone === "new" && "bg-rose/30 text-dusty",
        active && tone === "inProgress" && "bg-amber-100 text-amber-800",
        active && tone === "contacted" && "bg-sky-100 text-sky-800",
        active && tone === "confirmed" && "bg-emerald-100 text-emerald-800",
        !active && "bg-blush/40 text-dusty hover:bg-blush",
      )}
    >
      {children}
    </button>
  );
}

function Stat({
  label,
  value,
  extra,
  icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  extra?: string;
  icon?: "check" | "users";
  active?: boolean;
  onClick?: () => void;
}) {
  const className = cn(
    "rounded-[1.4rem] bg-white/90 p-5 text-left shadow-soft",
    onClick && "transition hover:-translate-y-0.5",
    active && onClick && "ring-1 ring-rose/40",
  );

  const body = (
    <>
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-serif text-3xl text-ink">{value}</p>
      {extra && (
        <p className="mt-1 flex items-center gap-1 text-xs text-dusty">
          {icon === "users" ? <Users className="h-3 w-3" /> : <Check className="h-3 w-3" />}
          {extra}
        </p>
      )}
    </>
  );

  if (!onClick) {
    return <div className={className}>{body}</div>;
  }

  return (
    <button type="button" onClick={onClick} className={className}>
      {body}
    </button>
  );
}
