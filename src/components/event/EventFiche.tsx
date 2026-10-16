"use client";

import { useLocale, useTranslations } from "next-intl";
import { useCatalog } from "@/components/catalog/CatalogProvider";
import { cities, eventTypes } from "@/data/catalog";
import { eventDisplayId, formatEventDate, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import type { SavedEvent } from "@/store/event-store";
import { siteContact } from "@/lib/site-contact";
import { FlowBack } from "@/components/event/FlowBack";

export function EventFiche({ event }: { event: SavedEvent }) {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const catalog = useCatalog();
  const city = cities.find((item) => item.slug === event.details.citySlug);
  const type = eventTypes.find((item) => item.slug === event.details.eventType);
  const displayId = eventDisplayId(event.id);
  const typeLabel = type ? localized(type.name, locale) : event.details.eventType || "—";
  const cityLabel = city ? localized(city.name, locale) : event.details.citySlug;
  const dateLabel = formatEventDate(event.details.eventDate, locale);
  const vendors = event.selections.map((item) => {
    const vendor = catalog.vendors.find((entry) => entry.slug === item.vendorSlug);
    const service = catalog.services.find((entry) => entry.slug === item.serviceSlug);
    return {
      name: vendor?.name || item.vendorSlug,
      service: service ? localized(service.name, locale) : item.serviceSlug,
    };
  });
  const isFr = locale === "fr";
  const contactTitle = isFr ? "Contact Forever Events" : "Forever Events contact";
  const contactLead = isFr
    ? "Gardez cette référence pour nous écrire ou nous appeler."
    : "Keep this reference when you call or write to us.";
  const downloadLabel = isFr ? "Télécharger le PDF" : "Download PDF";

  async function downloadPdf() {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const left = 18;
    let y = 20;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Forever Events", left, y);
    y += 8;
    doc.setFontSize(12);
    doc.text(isFr ? "Fiche d'evenement" : "Event sheet", left, y);
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text(`${isFr ? "Reference" : "Event ID"}: ${displayId}`, left, y);
    y += 10;

    const rows: [string, string][] = [
      [isFr ? "Nom" : "Name", event.details.name],
      [isFr ? "Telephone" : "Phone", event.details.phone],
      ...(event.details.email ? [[isFr ? "Email" : "Email", event.details.email] as [string, string]] : []),
      [isFr ? "Type" : "Event type", typeLabel],
      [isFr ? "Date" : "Date", dateLabel],
      [isFr ? "Ville" : "City", cityLabel],
      [isFr ? "Invites" : "Guests", event.details.guests || "—"],
      ["Budget", event.details.budget || "—"],
      ["Notes", event.details.notes || "—"],
    ];

    doc.setFontSize(10);
    for (const [label, value] of rows) {
      doc.setFont("helvetica", "bold");
      doc.text(`${label}:`, left, y);
      doc.setFont("helvetica", "normal");
      const lines = doc.splitTextToSize(value, 120);
      doc.text(lines, 58, y);
      y += Math.max(6, lines.length * 5);
    }

    y += 4;
    doc.setFont("helvetica", "bold");
    doc.text(isFr ? `Prestataires (${vendors.length})` : `Vendors (${vendors.length})`, left, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    for (const vendor of vendors) {
      doc.text(`${vendor.name} — ${vendor.service}`, left, y);
      y += 5;
    }

    y += 8;
    doc.setFont("helvetica", "bold");
    doc.text(contactTitle, left, y);
    y += 6;
    doc.setFont("helvetica", "normal");
    doc.text(siteContact.email, left, y);
    y += 5;
    if (siteContact.phone) {
      doc.text(siteContact.phone, left, y);
      y += 5;
    }
    if (siteContact.whatsapp) {
      doc.text(`WhatsApp ${siteContact.whatsapp}`, left, y);
      y += 5;
    }
    doc.setFontSize(9);
    doc.text(contactLead, left, y + 2);

    doc.save(`fiche-${displayId}.pdf`);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-[2rem] bg-white/90 p-6 shadow-soft md:p-8">
      <FlowBack href="/my-event/events" />
      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted">{t("ficheTitle")}</p>
      <h1 className="mt-2 font-script text-5xl text-dusty">{t("ficheHeading")}</h1>
      <p className="mt-2 font-medium text-ink">
        {t("eventRef")}: {displayId}
      </p>
      <p className="text-xs text-muted">{new Date(event.submittedAt).toLocaleString(locale)}</p>

      <dl className="mt-6 space-y-3 text-sm">
        <Row label={t("name")} value={event.details.name} />
        <Row label={t("phone")} value={event.details.phone} />
        {event.details.email && <Row label={t("email")} value={event.details.email} />}
        <Row label={t("eventType")} value={typeLabel} />
        <Row label={t("date")} value={dateLabel} />
        <Row label={t("city")} value={cityLabel} />
        <Row label={t("guests")} value={event.details.guests || "—"} />
        <Row label={t("budget")} value={event.details.budget || "—"} />
        <Row label={t("notes")} value={event.details.notes || "—"} />
      </dl>

      <h2 className="mt-8 font-medium text-ink">
        {t("selectedVendors")} ({event.selections.length})
      </h2>
      <ul className="mt-3 divide-y divide-rose/10">
        {vendors.map((vendor) => (
          <li key={vendor.name} className="py-2 text-sm">
            <p className="font-medium text-ink">{vendor.name}</p>
            <p className="text-xs text-muted">{vendor.service}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-2xl bg-blush/50 p-4 text-sm">
        <p className="font-medium text-dusty">{contactTitle}</p>
        <p className="mt-2 text-ink">{siteContact.email}</p>
        {siteContact.phone && <p className="text-ink">{siteContact.phone}</p>}
        {siteContact.whatsapp && <p className="text-ink">WhatsApp {siteContact.whatsapp}</p>}
        <p className="mt-2 text-xs text-muted">{contactLead}</p>
      </div>

      <button
        type="button"
        onClick={downloadPdf}
        className="mt-6 w-full rounded-full border border-rose/25 py-2.5 text-sm text-dusty"
      >
        {downloadLabel}
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-rose/10 pb-2">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}
