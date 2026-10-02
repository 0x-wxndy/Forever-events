"use client";

import { CalendarDays, MapPin, Phone, Sparkles, User } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { FormEvent } from "react";
import { cities, eventTypes } from "@/data/catalog";
import { EventStepper } from "@/components/event/EventStepper";
import { FloralScreen } from "@/components/event/FloralScreen";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link, useRouter } from "@/i18n/navigation";
import { detailsComplete, useEventStore } from "@/store/event-store";

export function CreateEventForm() {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const details = useEventStore((state) => state.details);
  const startEvent = useEventStore((state) => state.startEvent);
  const alreadyOpen = detailsComplete(details);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    startEvent({
      name: String(form.get("name") || "").trim(),
      phone: String(form.get("phone") || "").trim(),
      citySlug: String(form.get("citySlug") || "oran"),
      eventDate: String(form.get("eventDate") || ""),
      eventType: String(form.get("eventType") || ""),
      guests: String(form.get("guests") || "").trim(),
      budget: String(form.get("budget") || "").trim(),
      notes: String(form.get("notes") || "").trim(),
    });
    router.push("/my-event");
  }

  return (
    <FloralScreen>
      <div className="mx-auto max-w-xl rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-soft backdrop-blur-md md:p-8">
        <EventStepper
          current={1}
          backHref="/"
          labels={{
            details: t("stepDetails"),
            services: t("stepServices"),
            review: t("stepReview"),
            confirm: t("stepConfirm"),
          }}
        />
        <h1 className="text-center font-script text-5xl text-dusty md:text-6xl">
          {t("createTitle")} <span className="text-rose-deep">♥</span>
        </h1>
        <p className="mt-2 text-center text-sm text-muted">{t("createLead")}</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <Field icon={User} label={t("name")}>
            <input
              required
              name="name"
              defaultValue={details.name}
              placeholder={t("namePlaceholder")}
              className="field-input"
            />
          </Field>
          <Field icon={Phone} label={t("phone")}>
            <input
              required
              name="phone"
              defaultValue={details.phone}
              placeholder={t("phonePlaceholder")}
              className="field-input"
            />
          </Field>
          <Field icon={MapPin} label={t("city")}>
            <select name="citySlug" defaultValue={details.citySlug} className="field-input">
              {cities.map((city) => (
                <option key={city.slug} value={city.slug}>
                  {localized(city.name, locale)}
                </option>
              ))}
            </select>
          </Field>
          <Field icon={CalendarDays} label={t("date")}>
            <input
              required
              type="date"
              name="eventDate"
              defaultValue={details.eventDate}
              className="field-input"
            />
          </Field>
          <label className="grid items-center gap-2 text-sm text-ink sm:grid-cols-[9.5rem_1fr]">
            <span className="font-medium text-dusty">{t("eventType")}</span>
            <select name="eventType" defaultValue={details.eventType} className="field-input">
              <option value="">{t("chooseType")}</option>
              {eventTypes.map((type) => (
                <option key={type.slug} value={type.slug}>
                  {localized(type.name, locale)}
                </option>
              ))}
            </select>
          </label>
          <label className="grid items-center gap-2 text-sm text-ink sm:grid-cols-[9.5rem_1fr]">
            <span className="font-medium text-dusty">{t("budget")}</span>
            <input
              name="budget"
              defaultValue={details.budget}
              placeholder={t("budgetPlaceholder")}
              className="field-input"
            />
          </label>
          <label className="grid items-center gap-2 text-sm text-ink sm:grid-cols-[9.5rem_1fr]">
            <span className="font-medium text-dusty">{t("guests")}</span>
            <input
              name="guests"
              defaultValue={details.guests}
              placeholder={t("guestsPlaceholder")}
              className="field-input"
            />
          </label>
          <label className="grid items-start gap-2 text-sm text-ink sm:grid-cols-[9.5rem_1fr]">
            <span className="pt-2 font-medium text-dusty">{t("notes")}</span>
            <textarea
              name="notes"
              defaultValue={details.notes}
              rows={3}
              placeholder={t("notesPlaceholder")}
              className="field-input"
            />
          </label>
          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-rose-deep py-3.5 text-sm text-white shadow-[0_12px_30px_rgba(201,120,144,0.3)]"
          >
            {t("openEvent")}
            <Sparkles className="h-4 w-4" />
          </button>
        </form>
        {alreadyOpen && (
          <p className="mt-4 text-center text-sm">
            <Link href="/my-event" className="text-dusty hover:text-rose-deep">
              {t("goToEvent")}
            </Link>
          </p>
        )}
      </div>
    </FloralScreen>
  );
}

function Field({
  icon: Icon,
  label,
  children,
}: {
  icon: typeof User;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid items-center gap-2 text-sm text-ink sm:grid-cols-[9.5rem_1fr]">
      <span className="flex items-center gap-2 font-medium text-dusty">
        <Icon className="h-4 w-4" />
        {label}
      </span>
      {children}
    </label>
  );
}
