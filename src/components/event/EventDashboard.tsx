"use client";

import {
  CalendarDays,
  Camera,
  Flower2,
  Headphones,
  Heart,
  LogOut,
  MapPin,
  MessageCircle,
  Pencil,
  Search,
  Sparkles,
  Cake,
  MapPinned,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { cities, eventTypes, getVendor, services } from "@/data/catalog";
import { formatEventDate, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link, useRouter } from "@/i18n/navigation";
import { EventStepper } from "@/components/event/EventStepper";
import { RequireEventDetails } from "@/components/event/RequireEventDetails";
import { useEventStore } from "@/store/event-store";

const icons = {
  camera: Camera,
  flower: Flower2,
  cake: Cake,
  music: Headphones,
  sparkles: Sparkles,
  map: MapPinned,
};

export function EventDashboard() {
  return (
    <RequireEventDetails>
      <DashboardBody />
    </RequireEventDetails>
  );
}

function DashboardBody() {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const details = useEventStore((state) => state.details);
  const setDetails = useEventStore((state) => state.setDetails);
  const activity = useEventStore((state) => state.activity);
  const selections = useEventStore((state) => state.selections);
  const city = cities.find((item) => item.slug === details.citySlug);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fff1f4] to-ivory px-4 pt-28 pb-16">
      <Image src="/images/hero.jpg" alt="" fill className="object-cover object-center opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f4]/70 via-[#fff7f4]/80 to-ivory/92" />
      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[16rem_1fr]">
        <aside className="rounded-[1.8rem] bg-white/85 p-5 shadow-soft backdrop-blur">
          <p className="font-script text-4xl text-dusty">{t("myEvent")} ♥</p>
          <p className="text-xs text-muted">{t("dashboardLead")}</p>
          <div className="mt-5 rounded-2xl bg-blush/50 p-4">
            <p className="flex items-center gap-2 font-medium text-ink">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-xs text-dusty">
                {details.name.slice(0, 1).toUpperCase()}
              </span>
              {details.name}
            </p>
            <p className="mt-2 flex items-center gap-1 text-xs text-muted">
              <MapPin className="h-3 w-3" /> {city ? localized(city.name, locale) : details.citySlug}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted">
              <CalendarDays className="h-3 w-3" /> {formatEventDate(details.eventDate, locale)}
            </p>
            <Link href="/create" className="mt-3 inline-flex items-center gap-1 text-xs text-rose-deep">
              <Pencil className="h-3 w-3" /> {t("editDetails")}
            </Link>
          </div>
          <nav className="mt-5 grid gap-1 text-sm">
            <Link href="/my-event" className="rounded-full bg-blush px-4 py-2 text-dusty">
              {t("dashboard")}
            </Link>
            <Link href="/my-event/review" className="rounded-full px-4 py-2 hover:bg-blush/50">
              {t("myEventsNav")} ({selections.length})
            </Link>
            <Link href="/my-event/browse" className="rounded-full px-4 py-2 hover:bg-blush/50">
              {t("stepServices")}
            </Link>
            <Link href="/contact?from=my-event" className="inline-flex items-center gap-2 rounded-full px-4 py-2 hover:bg-blush/50">
              <MessageCircle className="h-4 w-4" /> {t("messagesNav")}
            </Link>
            <Link href="/" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-muted hover:bg-blush/50">
              <LogOut className="h-4 w-4" /> {t("backHome")}
            </Link>
          </nav>
        </aside>

        <div>
          <EventStepper
            current={1}
            backHref="/create"
            labels={{
              details: t("stepDetails"),
              services: t("stepServices"),
              review: t("stepReview"),
              confirm: t("stepConfirm"),
            }}
          />
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-script text-5xl text-dusty">{t("dashboardTitle")} ♥</h1>
              <p className="text-sm text-muted">{t("dashboardTag")}</p>
            </div>
            <form
              className="flex min-w-[16rem] flex-1 items-center gap-2 rounded-full bg-white px-3 py-1.5 shadow-soft md:max-w-md"
              onSubmit={(event) => {
                event.preventDefault();
                const q = new FormData(event.currentTarget).get("q");
                router.push(`/my-event/browse?q=${encodeURIComponent(String(q || ""))}`);
              }}
            >
              <input
                name="q"
                placeholder={t("searchServices")}
                className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
              />
              <button
                type="submit"
                className="grid h-9 w-9 place-items-center rounded-full bg-rose-deep text-white"
              >
                <Search className="h-4 w-4" />
              </button>
            </form>
          </div>

          <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-medium text-ink">{t("popular")}</h2>
              <Link href="/my-event/browse" className="text-sm text-rose-deep">
                {t("viewAll")}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {services.map((service) => {
                const Icon = icons[service.icon];
                return (
                  <Link
                    key={service.slug}
                    href={`/my-event/browse?service=${service.slug}`}
                    className="grid place-items-center gap-2 rounded-[1.4rem] bg-white/90 p-4 text-center shadow-soft"
                  >
                    <Icon className="h-6 w-6 text-dusty" />
                    <span className="text-xs text-ink">{localized(service.name, locale)}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-[1.05fr_1.05fr_0.75fr]">
            <article className="rounded-[1.6rem] bg-white/90 p-5 shadow-soft">
              <h2 className="font-medium text-ink">{t("eventDetails")}</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <EditRow label={t("eventType")}>
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
                </EditRow>
                <EditRow label={t("budget")}>
                  <input
                    value={details.budget}
                    onChange={(event) => setDetails({ budget: event.target.value })}
                    placeholder={t("budgetPlaceholder")}
                    className="field-input py-1.5"
                  />
                </EditRow>
                <EditRow label={t("guests")}>
                  <input
                    value={details.guests}
                    onChange={(event) => setDetails({ guests: event.target.value })}
                    placeholder={t("guestsPlaceholder")}
                    className="field-input py-1.5"
                  />
                </EditRow>
                <EditRow label={t("city")}>
                  <select
                    value={details.citySlug}
                    onChange={(event) => setDetails({ citySlug: event.target.value })}
                    className="field-input py-1.5"
                  >
                    {cities.map((item) => (
                      <option key={item.slug} value={item.slug}>
                        {localized(item.name, locale)}
                      </option>
                    ))}
                  </select>
                </EditRow>
                <EditRow label={t("notes")}>
                  <textarea
                    value={details.notes}
                    onChange={(event) => setDetails({ notes: event.target.value })}
                    rows={3}
                    placeholder={t("notesPlaceholder")}
                    className="field-input"
                  />
                </EditRow>
              </dl>
            </article>
            <article className="rounded-[1.6rem] bg-white/90 p-5 shadow-soft">
              <h2 className="font-medium text-ink">{t("recent")}</h2>
              <ul className="mt-4 space-y-3 text-sm">
                {activity.length === 0 && <li className="text-muted">{t("noActivity")}</li>}
                {activity.slice(0, 5).map((item) => {
                  const vendor = item.vendorSlug ? getVendor(item.vendorSlug) : null;
                  return (
                    <li key={item.id} className="flex gap-3 text-muted">
                      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-blush text-dusty">
                        {item.kind === "added" ? (
                          <Heart className="h-3.5 w-3.5" />
                        ) : (
                          <CalendarDays className="h-3.5 w-3.5" />
                        )}
                      </span>
                      <span>
                        {item.kind === "created" && t("activityCreated")}
                        {item.kind === "added" && t("activityAdded", { name: vendor?.name ?? "" })}
                        {item.kind === "removed" && t("activityRemoved", { name: vendor?.name ?? "" })}
                        {item.kind === "submitted" && t("activitySubmitted")}
                        <span className="mt-0.5 block text-xs">
                          {new Date(item.at).toLocaleString(locale)}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <Link
                href="/my-event/review"
                className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-rose-deep py-2.5 text-sm text-white"
              >
                {t("viewEvent")}
              </Link>
            </article>
            <aside className="hidden flex-col gap-4 xl:flex">
              <div className="relative overflow-hidden rounded-[1.6rem] p-5 text-white shadow-soft">
                <Image src="/images/about-bride.jpg" alt="" fill className="object-cover" />
                <div className="absolute inset-0 bg-[#7a5346]/35" />
                <p className="relative font-script text-3xl leading-tight">{t("storyCard")}</p>
              </div>
              <p className="rounded-[1.6rem] bg-white/90 p-5 text-sm italic text-muted shadow-soft">
                {t("quote")}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}

function EditRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1 border-b border-rose/10 pb-2 sm:grid-cols-[8.5rem_1fr] sm:items-start">
      <dt className="pt-2 text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
