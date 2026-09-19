import {
  Camera,
  Flower2,
  Headphones,
  MapPin,
  Sparkles,
  Cake,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { services } from "@/data/catalog";
import { localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

const icons = {
  camera: Camera,
  flower: Flower2,
  cake: Cake,
  music: Headphones,
  sparkles: Sparkles,
  map: MapPin,
};

export async function HomeServices() {
  const t = await getTranslations("homeServices");
  const locale = (await getLocale()) as Locale;

  return (
    <section className="relative overflow-hidden bg-ivory px-5 py-20 lg:px-8">
      <div className="pointer-events-none absolute right-0 top-10 h-56 w-56 rounded-full bg-[url('/images/blossoms.jpg')] bg-cover opacity-30" />
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-center text-[0.72rem] font-medium uppercase tracking-[0.34em] text-muted lg:text-left">
              {t("eyebrow")}
            </p>
            <div className="mx-auto mt-2 h-px w-16 bg-rose/70 lg:mx-0" />
            <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
              {t("title")}
              <span className="mt-1 block font-script text-4xl text-dusty md:text-5xl">
                {t("titleScript")}
              </span>
            </h2>
          </div>
          <div className="max-w-md text-sm leading-6 text-muted lg:text-right">
            <p>{t("intro")}</p>
            <Link
              href="/services"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose/30 px-4 py-2 text-dusty transition hover:bg-blush"
            >
              {t("explore")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group"
              >
                <article className="overflow-hidden rounded-[1.6rem] bg-white shadow-soft transition duration-500 group-hover:-translate-y-1">
                  <div className="relative h-44">
                    <Image
                      src={service.image}
                      alt={localized(service.name, locale)}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative px-3 pb-5 pt-8 text-center">
                    <span className="absolute left-1/2 top-0 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-soft">
                      <Icon className="h-5 w-5 text-champagne" strokeWidth={1.4} />
                    </span>
                    <h3 className="text-sm font-medium text-ink">
                      {localized(service.name, locale)}
                    </h3>
                    <p className="mt-1 text-xs text-muted">
                      {localized(service.tagline, locale)}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
