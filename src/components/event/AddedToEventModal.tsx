"use client";

import { CalendarDays, Heart, MapPin, Sparkles, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getCity, getService, getVendor } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useEventStore } from "@/store/event-store";

export function AddedToEventModal() {
  const t = useTranslations("flow");
  const locale = useLocale() as Locale;
  const lastAdded = useEventStore((state) => state.lastAdded);
  const clearLastAdded = useEventStore((state) => state.clearLastAdded);

  if (!lastAdded) return null;

  const vendor = getVendor(lastAdded.vendorSlug);
  const service = getService(lastAdded.serviceSlug);
  const city = getCity(lastAdded.citySlug);
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-[#4a3538]/25 px-4 backdrop-blur-[3px]">
      <div className="relative w-full max-w-md rounded-[2rem] bg-gradient-to-b from-white to-[#fff4f6] p-6 text-center shadow-soft">
        <button
          type="button"
          onClick={clearLastAdded}
          className="absolute right-4 top-4 text-muted hover:text-ink"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="mx-auto grid h-12 w-12 -mt-10 place-items-center rounded-full bg-rose-deep text-white shadow-soft">
          <Heart className="h-5 w-5 fill-white" />
        </span>
        <h2 className="mt-4 font-script text-4xl text-dusty">{t("addedTitle")}</h2>
        <p className="mt-2 text-sm text-muted">{t("addedBody", { name: vendor.name })}</p>
        <div className="mt-5 flex items-center gap-3 rounded-2xl bg-white/80 p-3 text-left">
          <div className="relative h-14 w-14 overflow-hidden rounded-xl">
            <Image src={vendor.coverImage} alt="" fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-ink">{vendor.name}</p>
            <p className="text-xs text-muted">
              {service ? localized(service.name, locale) : lastAdded.serviceSlug}
            </p>
            <p className="mt-1 flex items-center gap-1 text-xs text-dusty">
              <MapPin className="h-3 w-3" />
              {city ? localized(city.name, locale) : lastAdded.citySlug}
            </p>
          </div>
          <CalendarDays className="h-5 w-5 text-rose-deep" />
        </div>
        <Link
          href="/my-event/review"
          onClick={clearLastAdded}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-rose-deep py-3 text-sm text-white"
        >
          {t("viewEvent")}
          <Sparkles className="h-4 w-4" />
        </Link>
        <button type="button" onClick={clearLastAdded} className="mt-3 text-sm text-rose-deep">
          {t("continueBrowsing")}
        </button>
      </div>
    </div>
  );
}
