"use client";

import { useLocale, useTranslations } from "next-intl";
import { eventTypes } from "@/data/catalog";
import { eventDisplayId, formatEventDate, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { Link, useRouter } from "@/i18n/navigation";
import { detailsComplete, useEventStore } from "@/store/event-store";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { FloralScreen } from "@/components/event/FloralScreen";
import { FlowBack } from "@/components/event/FlowBack";

export function EventsList() {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const hydrated = useHasHydrated();
  const router = useRouter();
  const pastEvents = useEventStore((state) => state.pastEvents);
  const details = useEventStore((state) => state.details);
  const startNewDraft = useEventStore((state) => state.startNewDraft);
  const hasDraft = detailsComplete(details);

  if (!hydrated) {
    return <div className="px-5 py-32 text-center text-muted">…</div>;
  }

  return (
    <FloralScreen>
      <div className="mx-auto max-w-2xl">
        <FlowBack href={hasDraft ? "/my-event" : "/"} />
        <h1 className="mt-4 font-script text-5xl text-dusty">{t("myEventsTitle")}</h1>
        <p className="mt-2 text-sm text-muted">{t("myEventsLead")}</p>

        <button
          type="button"
          onClick={() => {
            startNewDraft();
            router.push("/create");
          }}
          className="mt-6 w-full rounded-full bg-rose-deep py-3 text-sm text-white"
        >
          {t("newEvent")}
        </button>

        <div className="mt-6 space-y-3">
          {pastEvents.length === 0 && (
            <p className="rounded-[1.4rem] bg-white/90 p-5 text-sm text-muted shadow-soft">
              {t("noPastEvents")}
            </p>
          )}
          {pastEvents.map((item) => {
            const type = eventTypes.find((entry) => entry.slug === item.details.eventType);
            return (
              <Link
                key={item.id}
                href={`/my-event/events/${item.id}`}
                className="block rounded-[1.4rem] bg-white/90 p-5 shadow-soft"
              >
                <p className="text-xs uppercase tracking-wide text-dusty">
                  {eventDisplayId(item.id)}
                </p>
                <p className="mt-1 font-medium text-ink">
                  {type ? localized(type.name, locale) : t("eventDetails")} ·{" "}
                  {formatEventDate(item.details.eventDate, locale)}
                </p>
                <p className="mt-1 text-xs text-muted">
                  {item.selections.length} {t("selectedCount").toLowerCase()}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </FloralScreen>
  );
}
