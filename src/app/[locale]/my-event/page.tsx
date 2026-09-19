import { MyEventClient } from "@/components/event/MyEventClient";
import { PageHero } from "@/components/ui/PageHero";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function MyEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("myEvent");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
      />
      <MyEventClient />
    </>
  );
}
