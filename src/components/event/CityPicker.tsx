"use client";

import { useTranslations } from "next-intl";
import { cities } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useEventStore } from "@/store/event-store";
import { cn } from "@/lib/cn";

export function CityPicker() {
  const t = useTranslations("createPage");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const citySlug = useEventStore((state) => state.citySlug);
  const setCity = useEventStore((state) => state.setCity);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {cities.map((city) => {
          const selected = citySlug === city.slug;
          return (
            <button
              key={city.slug}
              type="button"
              disabled={!city.available}
              onClick={() => setCity(city.slug)}
              className={cn(
                "rounded-[1.6rem] border px-5 py-8 text-center transition",
                city.available
                  ? selected
                    ? "border-rose-deep bg-white shadow-soft"
                    : "border-rose/20 bg-white/70 hover:border-rose"
                  : "cursor-not-allowed border-rose/10 bg-blush/40 opacity-70",
              )}
            >
              <p className="font-serif text-2xl text-ink">{localized(city.name, locale)}</p>
              {!city.available && (
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted">
                  {t("comingSoon")}
                </p>
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => router.push("/services")}
        className="mt-8 rounded-full bg-rose-deep px-6 py-3 text-sm text-white"
      >
        {t("continue")}
      </button>
    </div>
  );
}
