import { PageHero } from "@/components/ui/PageHero";
import { services } from "@/data/catalog";
import { localized } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import type { Locale } from "@/i18n/routing";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("servicesPage");
  const currentLocale = locale as Locale;

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        titleScript={t("titleScript")}
        lead={t("lead")}
      />
      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-16 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group overflow-hidden rounded-[1.8rem] bg-white shadow-soft"
          >
            <div className="relative h-56">
              <Image
                src={service.image}
                alt={localized(service.name, currentLocale)}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </div>
            <div className="p-5">
              <h2 className="font-serif text-2xl text-ink">
                {localized(service.name, currentLocale)}
              </h2>
              <p className="mt-2 text-sm text-muted">
                {localized(service.description, currentLocale)}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
