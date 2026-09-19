import { ArrowRight, Plus } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Petals } from "@/components/home/Petals";
import { TrustBar } from "@/components/home/TrustBar";

export async function Hero() {
  const t = await getTranslations();
  const locale = await getLocale();

  return (
    <section className="relative min-h-[920px] overflow-hidden md:min-h-screen">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff3f0]/25 via-transparent to-[#fff8f4]" />
      <Petals />

      <div className="relative mx-auto flex min-h-[920px] max-w-4xl flex-col items-center justify-center px-5 pb-40 pt-28 text-center md:min-h-screen">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.42em] text-ink/55">
          {t("hero.eyebrow")}
        </p>
        <span className="mt-4 text-rose-deep">♥</span>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.15] text-ink sm:text-5xl md:text-[3.5rem]">
          {t("hero.title")}
          <span className="mt-2 block font-script text-5xl text-dusty sm:text-6xl md:text-[4.2rem]">
            {t("hero.titleScript")}
          </span>
        </h1>
        <p className="mt-5 text-base text-ink/70 md:text-lg">{t("hero.subtitle")}</p>

        <Link
          href="/create"
          className="mt-8 inline-flex items-center rounded-full bg-rose-deep pl-6 pr-2 py-2 text-white shadow-[0_12px_30px_rgba(201,120,144,0.35)] transition hover:bg-dusty"
        >
          <span className="flex items-center gap-2 text-sm md:text-base">
            {t("nav.create")}
            <Plus className="h-4 w-4" />
          </span>
          <span className="ml-4 grid h-10 w-10 place-items-center rounded-full bg-white/20">
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>

        {locale === "en" && (
          <p className="pointer-events-none absolute right-6 bottom-48 hidden max-w-[8rem] rotate-[-8deg] font-script text-2xl text-white/80 md:block lg:right-16">
            Beautiful Moments Last Forever
          </p>
        )}
      </div>

      <TrustBar />
    </section>
  );
}
