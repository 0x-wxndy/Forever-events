import type { ReactNode } from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

export async function PageHero({
  eyebrow,
  title,
  titleScript,
  lead,
  back,
}: {
  eyebrow: string;
  title: string;
  titleScript?: string;
  lead?: string;
  back?: ReactNode;
}) {
  const t = await getTranslations();

  return (
    <section className="relative overflow-hidden bg-[#fdeef2] pt-28 pb-16">
      <Image
        src="/images/hero.jpg"
        alt=""
        fill
        className="object-cover object-[center_30%] opacity-50"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#fff7f4]/70 via-[#fff7f4]/80 to-ivory" />
      {back && <div className="relative mx-auto max-w-5xl px-5 pb-6">{back}</div>}
      <div className="relative mx-auto max-w-3xl px-5 text-center">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-muted">
          {eyebrow}
        </p>
        <span className="mt-3 inline-block text-rose-deep">♥</span>
        <h1 className="mt-3 font-serif text-4xl text-ink md:text-5xl">
          {title}
          {titleScript && (
            <span className="mt-2 block font-script text-4xl text-dusty md:text-5xl">
              {titleScript}
            </span>
          )}
        </h1>
        {lead && <p className="mt-5 text-sm leading-7 text-muted md:text-base">{lead}</p>}
        <p className="sr-only">{t("brand.moments")}</p>
      </div>
    </section>
  );
}
