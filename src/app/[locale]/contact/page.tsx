import { ContactForm } from "@/components/contact/ContactForm";
import { FlowBack } from "@/components/event/FlowBack";
import { PageHero } from "@/components/ui/PageHero";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ from?: string }>;
}) {
  const { locale } = await params;
  const { from } = await searchParams;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const nav = await getTranslations("nav");
  const backHref =
    from === "browse" ? "/my-event/browse" : from === "my-event" ? "/my-event" : null;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
        back={backHref ? <FlowBack href={backHref} /> : undefined}
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
