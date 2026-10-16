import { VendorCard } from "@/components/vendors/VendorCard";
import { PageHero } from "@/components/ui/PageHero";
import { localized } from "@/lib/format";
import { readCatalog } from "@/lib/catalog-store";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const catalog = await readCatalog();
  const service = catalog.services.find((item) => item.slug === slug);
  if (!service) notFound();

  const currentLocale = (await getLocale()) as Locale;
  const t = await getTranslations("service");
  const list = catalog.vendors.filter((vendor) => vendor.serviceSlug === service.slug);

  return (
    <>
      <PageHero
        eyebrow={localized(service.name, currentLocale)}
        title={localized(service.name, currentLocale)}
        titleScript={localized(service.tagline, currentLocale)}
        lead={localized(service.description, currentLocale)}
      />
      <section className="mx-auto max-w-6xl px-5 py-16">
        <Link
          href="/services"
          className="mb-6 inline-flex items-center text-sm text-dusty hover:text-rose-deep"
        >
          ← {t("backToServices")}
        </Link>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-ink">
            {t("inCity", { city: "Oran" })}
          </h2>
        </div>
        {list.length === 0 ? (
          <p className="text-muted">{t("empty")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {list.map((vendor) => (
              <VendorCard key={vendor.slug} vendor={vendor} service={service} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
