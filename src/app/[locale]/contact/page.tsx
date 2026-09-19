import { ContactForm } from "@/components/contact/ContactForm";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const nav = await getTranslations("nav");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
      />
      <section className="mx-auto grid max-w-5xl gap-10 px-5 py-16 lg:grid-cols-[0.8fr_1.1fr]">
        <div>
          <p className="text-sm leading-7 text-muted">{t("lead")}</p>
          <div className="mt-6">
            <ButtonLink href="/create">{nav("create")}</ButtonLink>
          </div>
        </div>
        <ContactForm />
      </section>
    </>
  );
}
