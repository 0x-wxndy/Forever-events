"use client";

import { Check, Eye, Phone, Search, Users } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export type RequestRow = {
  id: string;
  name: string;
  phone: string;
  city: string;
  date: string;
  eventType: string;
  budget: string;
  status: "new" | "inProgress" | "contacted" | "confirmed";
  vendors: { slug: string; name: string; image: string }[];
};

export function RequestsBoard({
  rows,
  vendorCount,
}: {
  rows: RequestRow[];
  vendorCount: number;
}) {
  const t = useTranslations("admin");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) return rows;
    return rows.filter((row) =>
      [row.name, row.phone, row.city, row.eventType, row.budget]
        .join(" ")
        .toLowerCase()
        .includes(needle),
    );
  }, [query, rows]);

  const incoming = rows.filter((item) => item.status === "new").length;
  const progress = rows.filter((item) => item.status === "inProgress").length;
  const confirmed = rows.filter((item) => item.status === "confirmed").length;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl text-ink">{t("requests")}</h1>
          <p className="text-sm text-muted">{t("manageRequests")}</p>
        </div>
        <label className="relative min-w-[16rem] flex-1 md:max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={t("searchEvents")}
            className="field-input pl-10"
          />
        </label>
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
                  {t("emptyRequests")}
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
                  <span
                    className={cn(
                      "rounded-full px-2.5 py-1 text-xs",
                      item.status === "new" && "bg-rose/20 text-dusty",
                      item.status === "inProgress" && "bg-amber-100 text-amber-800",
                      item.status === "contacted" && "bg-sky-100 text-sky-800",
                      item.status === "confirmed" && "bg-emerald-100 text-emerald-800",
                    )}
                  >
                    {t(item.status)}
                  </span>
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
          extra={`${incoming} ${t("new")}`}
        />
        <Stat label={t("inProgress")} value={progress} extra={`${incoming} ${t("newToday")}`} />
        <Stat label={t("confirmed")} value={confirmed} extra={t("thisWeek")} icon="check" />
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

function Stat({
  label,
  value,
  extra,
  icon,
}: {
  label: string;
  value: number;
  extra?: string;
  icon?: "check" | "users";
}) {
  return (
    <div className="rounded-[1.4rem] bg-white/90 p-5 shadow-soft">
      <p className="text-sm text-muted">{label}</p>
      <p className="mt-1 font-serif text-3xl text-ink">{value}</p>
      {extra && (
        <p className="mt-1 flex items-center gap-1 text-xs text-dusty">
          {icon === "users" ? <Users className="h-3 w-3" /> : <Check className="h-3 w-3" />}
          {extra}
        </p>
      )}
    </div>
  );
}
