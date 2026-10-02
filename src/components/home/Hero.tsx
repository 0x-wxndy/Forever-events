import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Petals } from "@/components/home/Petals";
import { TrustBar } from "@/components/home/TrustBar";

export async function Hero() {
  const t = await getTranslations();

  return (
    <section className="relative min-h-[920px] overflow-hidden md:min-h-screen">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff3f0]/20 via-transparent to-[#fff8f4]" />
      <Petals />

      <div className="relative mx-auto flex min-h-[920px] max-w-4xl flex-col items-center justify-center px-5 pb-40 pt-28 text-center md:min-h-screen">
        <h1 className="font-script leading-[0.9] text-[#c4a574] text-7xl sm:text-8xl md:text-[7.5rem]">
          Forever
          <span className="mt-1 block font-script text-dusty">
            Events <span className="text-rose-deep">♥</span>
          </span>
        </h1>
        <p className="mt-8 max-w-xl font-serif text-2xl text-ink md:text-3xl">
          {t("hero.title")}
          <span className="mt-1 block">{t("hero.titleScript")}</span>
        </p>
        <p className="mt-4 text-base text-ink/70">{t("hero.subtitle")}</p>
        <Link
          href="/create"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-rose-deep px-8 py-3 text-white shadow-[0_12px_30px_rgba(201,120,144,0.35)] transition hover:bg-dusty"
        >
          {t("nav.create")}
          <Sparkles className="h-4 w-4" />
        </Link>
      </div>

      <TrustBar />
    </section>
  );
}
