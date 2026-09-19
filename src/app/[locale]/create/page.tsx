import { CityPicker } from "@/components/event/CityPicker";
import { PageHero } from "@/components/ui/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function CreatePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("createPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
      />
      <section className="mx-auto max-w-4xl px-5 py-16">
        <h2 className="mb-6 font-serif text-2xl text-ink">{t("city")}</h2>
        <CityPicker />
      </section>
    </>
  );
}
