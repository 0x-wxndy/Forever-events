"use client";

import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useEventStore } from "@/store/event-store";
import { FloralScreen } from "@/components/event/FloralScreen";
import { EventFiche } from "@/components/event/EventFiche";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function EventFichePage({ id }: { id: string }) {
  const t = useTranslations("flow");
  const hydrated = useHasHydrated();
  const event = useEventStore((state) => state.pastEvents.find((item) => item.id === id));

  if (!hydrated) {
    return <div className="px-5 py-32 text-center text-muted">…</div>;
  }

  if (!event) {
    return (
      <FloralScreen>
        <div className="mx-auto max-w-lg rounded-[2rem] bg-white/90 p-8 text-center shadow-soft">
          <p className="text-muted">{t("ficheMissing")}</p>
          <Link href="/my-event/events" className="mt-4 inline-block text-sm text-dusty">
            {t("myEventsTitle")}
          </Link>
        </div>
      </FloralScreen>
    );
  }

  return (
    <FloralScreen>
      <EventFiche event={event} />
    </FloralScreen>
  );
}
