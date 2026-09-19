import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { RequestActions } from "@/components/admin/RequestActions";
import { getRequest } from "@/lib/inbox";
import type { Locale } from "@/i18n/routing";
import {
  cityLabel,
  eventTypeLabel,
  formatAdminDate,
  serviceLabel,
  vendorLabel,
} from "@/lib/admin-format";

export default async function AdminRequestDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { id } = await params;
  const item = await getRequest(id);
  if (!item) notFound();

  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;

  return (
    <div>
      <Link href="/admin/requests" className="text-sm text-dusty">
        ← {t("back")}
      </Link>
      <h1 className="mt-4 font-serif text-4xl text-ink">{item.name}</h1>
      <p className="mt-2 text-sm text-muted">{formatAdminDate(item.createdAt, locale)}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <section className="rounded-[1.6rem] bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl text-ink">{t("client")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            {item.name}
            <br />
            <a href={`mailto:${item.email}`} className="text-dusty">
              {item.email}
            </a>
            <br />
            <a href={`tel:${item.phone}`} className="text-dusty">
              {item.phone}
            </a>
          </p>
        </section>
        <section className="rounded-[1.6rem] bg-white p-6 shadow-soft">
          <h2 className="font-serif text-2xl text-ink">{t("event")}</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            {t("city")}: {cityLabel(item.citySlug, locale)}
            <br />
            {eventTypeLabel(item.eventType, locale)}
            <br />
            {t("date")}: {item.eventDate || "—"}
            <br />
            {t("guests")}: {item.guests || "—"}
          </p>
          {item.message && <p className="mt-4 text-sm text-ink">{item.message}</p>}
        </section>
      </div>

      <section className="mt-4 rounded-[1.6rem] bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-ink">{t("selected")}</h2>
        <ul className="mt-4 space-y-3">
          {item.vendors.map((vendor) => (
            <li key={vendor.vendorSlug} className="text-sm text-muted">
              <span className="font-medium text-ink">{vendorLabel(vendor.vendorSlug)}</span>
              {" · "}
              {serviceLabel(vendor.serviceSlug, locale)}
            </li>
          ))}
        </ul>
      </section>

      <RequestActions id={item.id} status={item.status} notes={item.notes} />
    </div>
  );
}
