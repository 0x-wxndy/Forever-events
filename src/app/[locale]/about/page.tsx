import { PageHero } from "@/components/ui/PageHero";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("aboutPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
      />
      <section className="mx-auto max-w-3xl px-5 py-16 text-sm leading-7 text-muted">
        <p>{t("p1")}</p>
        <p className="mt-6">{t("p2")}</p>
        <p className="mt-6">{t("p3")}</p>
      </section>
    </>
  );
}
