"use client";

import { Heart, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useEventStore } from "@/store/event-store";

export function EventDock() {
  const t = useTranslations("nav");
  const flow = useTranslations("flow");
  const hydrated = useHasHydrated();
  const count = useEventStore((state) => state.selections.length);
  const pathname = usePathname();
  const onBrowse = pathname.startsWith("/my-event/browse");

  if (!hydrated || count === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2 sm:flex-row">
      {!onBrowse && (
        <Link
          href="/my-event/browse"
          className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/95 px-4 py-3 text-sm text-dusty shadow-soft backdrop-blur"
        >
          <Plus className="h-4 w-4" />
          {flow("addToEvent")}
        </Link>
      )}
      <Link
        href="/my-event/review"
        className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-3 text-sm text-white shadow-[0_12px_30px_rgba(201,120,144,0.4)]"
      >
        <Heart className="h-4 w-4 fill-white" />
        {t("myEvent")}
        <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white/20 px-1.5 text-xs">
          {count}
        </span>
      </Link>
    </div>
  );
}
