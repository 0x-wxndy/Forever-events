"use client";

import { useLocale, useTranslations } from "next-intl";
import { FormEvent, useMemo, useState } from "react";
import { Link } from "@/i18n/navigation";
import { cities, eventTypes, getService, getVendor } from "@/data/catalog";
import { formatPrice, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useEventStore } from "@/store/event-store";

export function MyEventClient() {
  const t = useTranslations("myEvent");
  const formT = useTranslations("contactPage");
  const locale = useLocale() as Locale;
  const hydrated = useHasHydrated();
  const selections = useEventStore((state) => state.selections);
  const citySlug = useEventStore((state) => state.citySlug);
  const removeVendor = useEventStore((state) => state.removeVendor);
  const clear = useEventStore((state) => state.clear);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [pending, setPending] = useState(false);

  const items = useMemo(
    () =>
      selections
        .map((selection) => {
          const vendor = getVendor(selection.vendorSlug);
          const service = getService(selection.serviceSlug);
          if (!vendor) return null;
          return { selection, vendor, service };
        })
        .filter(Boolean),
    [selections],
  );

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (selections.length === 0) return;
    setPending(true);
    setStatus("idle");
    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          eventType: form.get("eventType"),
          eventDate: form.get("eventDate"),
          guests: form.get("guests"),
          message: form.get("message"),
          citySlug,
          vendors: selections,
        }),
      });
      if (response.ok) {
        setStatus("success");
        clear();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setPending(false);
    }
  }

  if (!hydrated) {
    return <div className="mx-auto max-w-5xl px-5 py-16 text-muted">…</div>;
  }

  if (status === "success") {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="font-script text-4xl text-dusty">{t("success")}</p>
        <Link href="/services" className="mt-8 inline-flex rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white">
          {t("browse")}
        </Link>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-16 text-center">
        <p className="text-muted">{t("empty")}</p>
        <Link href="/services" className="mt-6 inline-flex rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white">
          {t("browse")}
        </Link>
      </section>
    );
  }

  const city = cities.find((item) => item.slug === citySlug);

  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-4">
        {items.map((item) => {
          if (!item) return null;
          return (
            <article key={item.vendor.slug} className="rounded-[1.6rem] bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {item.service ? localized(item.service.name, locale) : item.vendor.serviceSlug}
              </p>
              <div className="mt-1 flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-serif text-2xl text-ink">{item.vendor.name}</h3>
                  <p className="mt-1 text-sm text-dusty">
                    {formatPrice(item.vendor.startingPrice, locale)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeVendor(item.vendor.slug)}
                  className="text-sm text-muted hover:text-dusty"
                >
                  ×
                </button>
              </div>
            </article>
          );
        })}
        <Link
          href="/services"
          className="inline-flex items-center justify-center rounded-full border border-rose/30 bg-white px-5 py-2.5 text-sm text-dusty hover:bg-blush"
        >
          {t("addMore")}
        </Link>
      </div>

      <form onSubmit={onSubmit} className="h-fit rounded-[1.8rem] bg-white p-6 shadow-soft">
        <h2 className="font-serif text-2xl text-ink">{t("formTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("formLead")}</p>
        <p className="mt-3 text-sm text-dusty">
          {t("cityLabel")}: {city ? localized(city.name, locale) : citySlug}
        </p>
        <div className="mt-5 grid gap-3">
          <input required name="name" placeholder={formT("name")} className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none" />
          <input required type="email" name="email" placeholder={formT("email")} className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none" />
          <input required name="phone" placeholder={formT("phone")} className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none" />
          <select name="eventType" className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none">
            {eventTypes.map((type) => (
              <option key={type.slug} value={type.slug}>
                {localized(type.name, locale)}
              </option>
            ))}
          </select>
          <input type="date" name="eventDate" className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none" />
          <input name="guests" placeholder={t("guests")} className="rounded-full border border-rose/20 bg-ivory px-4 py-2.5 outline-none" />
          <textarea name="message" rows={4} placeholder={formT("message")} className="rounded-3xl border border-rose/20 bg-ivory px-4 py-3 outline-none" />
        </div>
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-full bg-rose-deep py-3 text-sm text-white disabled:opacity-60"
        >
          {t("submit")}
        </button>
        {status === "error" && <p className="mt-3 text-sm text-dusty">{t("error")}</p>}
      </form>
    </section>
  );
}
