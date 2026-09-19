import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("howPage");
  const home = await getTranslations("homeHow");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
      />
      <section className="mx-auto grid max-w-5xl gap-6 px-5 py-16 md:grid-cols-3">
        {[
          { n: "01", title: home("step1"), text: home("step1Text") },
          { n: "02", title: home("step2"), text: home("step2Text") },
          { n: "03", title: home("step3"), text: home("step3Text") },
        ].map((step) => (
          <article key={step.n} className="rounded-[1.8rem] bg-white p-6 shadow-soft">
            <p className="font-serif text-2xl text-rose-deep">{step.n}</p>
            <h2 className="mt-2 font-serif text-2xl text-ink">{step.title}</h2>
            <p className="mt-3 text-sm leading-6 text-muted">{step.text}</p>
          </article>
        ))}
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-16">
        <h2 className="font-serif text-3xl text-ink">{t("afterTitle")}</h2>
        <ol className="mt-6 space-y-3 text-sm leading-7 text-muted">
          <li>1. {t("after1")}</li>
          <li>2. {t("after2")}</li>
          <li>3. {t("after3")}</li>
          <li>4. {t("after4")}</li>
        </ol>
        <div className="mt-8">
          <ButtonLink href="/create">{home("step1")}</ButtonLink>
        </div>
      </section>
    </>
  );
}
