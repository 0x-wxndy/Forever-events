import { ArrowRight, Heart, Star, Users } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

export async function HomeAbout() {
  const t = await getTranslations("homeAbout");

  return (
    <section className="relative overflow-hidden px-5 py-16 lg:px-8">
      <div className="pointer-events-none absolute left-0 top-10 h-72 w-40 bg-[url('/images/blossoms.jpg')] bg-cover opacity-40" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.05fr_0.7fr]">
        <div>
          <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-muted">
            {t("eyebrow")}
          </p>
          <div className="mt-2 h-px w-16 bg-rose/70" />
          <h2 className="mt-4 font-serif text-4xl text-ink md:text-5xl">
            {t("title")}
            <span className="mt-2 block font-script text-4xl text-dusty md:text-5xl">
              {t("titleScript")}
            </span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-muted">{t("body")}</p>
          <Link
            href="/about"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <p className="absolute -left-2 top-10 z-10 max-w-[7rem] font-script text-3xl leading-tight text-dusty md:-left-10">
            {t("story")}
          </p>
          <div className="relative mx-auto aspect-[4/5] max-w-sm overflow-hidden rounded-t-full">
            <Image
              src="/images/about-bride.jpg"
              alt=""
              fill
              className="object-cover object-center"
            />
          </div>
          <div className="pointer-events-none absolute -left-6 bottom-8 h-28 w-36 bg-[url('/images/blossoms.jpg')] bg-contain bg-no-repeat" />
          <div className="pointer-events-none absolute -right-4 bottom-16 h-24 w-32 bg-[url('/images/blossoms-2.jpg')] bg-contain bg-no-repeat" />
        </div>

        <div className="flex flex-row justify-center gap-6 lg:flex-col lg:items-start">
          {[
            { icon: Users, value: "100+", label: t("statVendors") },
            { icon: Heart, value: "500+", label: t("statEvents") },
            { icon: Star, value: "100%", label: t("statSatisfaction") },
          ].map((stat) => (
            <div key={stat.value} className="flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-blush text-dusty">
                <stat.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="font-serif text-2xl text-ink">{stat.value}</p>
                <p className="text-xs text-muted">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
