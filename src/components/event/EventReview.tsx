"use client";

import { Headphones, Shield, Sparkles, Trash2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FormEvent, useState } from "react";
import { EventStepper } from "@/components/event/EventStepper";
import { FloralScreen } from "@/components/event/FloralScreen";
import { RequireEventDetails } from "@/components/event/RequireEventDetails";
import { cities, eventTypes, getCity, getService, getVendor } from "@/data/catalog";
import { formatEventDate, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link, useRouter } from "@/i18n/navigation";
import { useEventStore } from "@/store/event-store";

export function EventReview() {
  return (
    <RequireEventDetails>
      <ReviewBody />
    </RequireEventDetails>
  );
}

function ReviewBody() {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const details = useEventStore((state) => state.details);
  const setDetails = useEventStore((state) => state.setDetails);
  const selections = useEventStore((state) => state.selections);
  const removeVendor = useEventStore((state) => state.removeVendor);
  const markSubmitted = useEventStore((state) => state.markSubmitted);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (selections.length === 0) return;
    setPending(true);
    setError(false);
    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: details.name,
          phone: details.phone,
          email: details.email,
          citySlug: details.citySlug,
          eventType: details.eventType,
          eventDate: details.eventDate,
          guests: details.guests,
          budget: details.budget,
          message: details.notes,
          vendors: selections,
        }),
      });
      if (!response.ok) {
        setError(true);
        return;
      }
      markSubmitted();
      router.push("/my-event/confirmation");
    } catch {
      setError(true);
    } finally {
      setPending(false);
    }
  }

  const city = cities.find((item) => item.slug === details.citySlug);

  return (
    <FloralScreen>
      <EventStepper
        current={3}
        backHref="/my-event/browse"
        labels={{
          details: t("stepDetails"),
          services: t("stepServices"),
          review: t("stepReview"),
          confirm: t("stepConfirm"),
        }}
      />
      <div className="mt-2 mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-serif text-3xl text-ink md:text-4xl">{t("reviewTitle")}</h1>
          <p className="text-sm text-muted">{t("reviewLead")}</p>
        </div>
        <p className="font-script text-2xl text-dusty">{t("turnMoments")}</p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.8rem] bg-white/90 p-5 shadow-soft">
          <h2 className="text-dusty">
            {t("selectedVendors")} ({selections.length})
          </h2>
          <div className="mt-4 divide-y divide-rose/10">
            {selections.length === 0 && <p className="py-6 text-sm text-muted">{t("emptyCart")}</p>}
            {selections.map((item) => {
              const vendor = getVendor(item.vendorSlug);
              const service = getService(item.serviceSlug);
              const vendorCity = getCity(item.citySlug);
              if (!vendor) return null;
              return (
                <div key={vendor.slug} className="flex items-center gap-3 py-3">
                  <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                    <Image src={vendor.coverImage} alt="" fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-ink">{vendor.name}</p>
                    <p className="text-xs text-muted">
                      {service ? localized(service.name, locale) : item.serviceSlug}
                      <span className="mt-0.5 block">
                        {vendorCity ? localized(vendorCity.name, locale) : item.citySlug}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeVendor(vendor.slug)}
                    className="text-rose-deep"
                    aria-label={t("remove")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              );
            })}
          </div>
          <Link
            href="/my-event/browse"
            className="mt-4 inline-flex rounded-full border border-rose/25 px-4 py-2 text-sm text-dusty"
          >
            ← {t("backToSearch")}
          </Link>
        </section>

        <section className="rounded-[1.8rem] bg-white/90 p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="text-dusty">{t("eventSummary")}</h2>
            <Link href="/create" className="text-xs text-rose-deep">
              {t("edit")}
            </Link>
          </div>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label={t("eventType")}>
              <select
                value={details.eventType}
                onChange={(event) => setDetails({ eventType: event.target.value })}
                className="field-input py-1.5"
              >
                <option value="">{t("chooseType")}</option>
                {eventTypes.map((type) => (
                  <option key={type.slug} value={type.slug}>
                    {localized(type.name, locale)}
                  </option>
                ))}
              </select>
            </Row>
            <Row label={t("date")} value={formatEventDate(details.eventDate, locale)} />
            <Row
              label={t("city")}
              value={city ? localized(city.name, locale) : details.citySlug}
            />
            <Row label={t("budget")}>
              <input
                value={details.budget}
                onChange={(event) => setDetails({ budget: event.target.value })}
                placeholder="100 000 - 150 000"
                className="field-input py-1.5"
              />
            </Row>
            <Row label={t("guests")}>
              <input
                value={details.guests}
                onChange={(event) => setDetails({ guests: event.target.value })}
                placeholder="50 - 100"
                className="field-input py-1.5"
              />
            </Row>
            <Row label={t("selectedCount")} value={String(selections.length)} />
            <Row label={t("notes")}>
              <textarea
                value={details.notes}
                onChange={(event) => setDetails({ notes: event.target.value })}
                rows={3}
                className="field-input"
              />
            </Row>
          </dl>
          <button
            type="submit"
            disabled={pending || selections.length === 0}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-deep py-3 text-sm text-white disabled:opacity-50"
          >
            {t("submitEvent")}
            <Sparkles className="h-4 w-4" />
          </button>
          {error && <p className="mt-2 text-sm text-dusty">{t("submitError")}</p>}
        </section>
      </form>

      <div className="mt-8 grid gap-4 text-center text-xs text-muted sm:grid-cols-3">
        <p className="flex items-center justify-center gap-2">
          <Shield className="h-4 w-4 text-dusty" /> {t("secure")}
        </p>
        <p className="flex items-center justify-center gap-2">
          <Headphones className="h-4 w-4 text-dusty" /> {t("support")}
        </p>
        <p>{t("unforgettable")}</p>
      </div>
    </FloralScreen>
  );
}

function Row({
  label,
  value,
  children,
}: {
  label: string;
  value?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-rose/10 pb-2">
      <dt className="pt-2 text-muted">{label}</dt>
      <dd className="flex-1 text-right text-ink">{children ?? value}</dd>
    </div>
  );
}
