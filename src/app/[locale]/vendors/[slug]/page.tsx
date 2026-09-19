import { AddToEventButton } from "@/components/event/AddToEventButton";
import { getService, getVendor } from "@/data/catalog";
import { formatPrice, localized } from "@/lib/format";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function VendorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const vendor = getVendor(slug);
  if (!vendor) notFound();

  const currentLocale = (await getLocale()) as Locale;
  const t = await getTranslations("vendor");
  const serviceT = await getTranslations("service");
  const service = getService(vendor.serviceSlug);

  return (
    <article className="pt-28">
      <div className="relative h-[420px] w-full">
        <Image
          src={vendor.coverImage}
          alt={vendor.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ivory via-transparent to-black/10" />
      </div>

      <div className="mx-auto max-w-5xl px-5 py-12">
        <nav className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-dusty">
          <Link href="/services" className="hover:text-rose-deep">
            ← {serviceT("backToServices")}
          </Link>
          <span className="text-rose/50">/</span>
          <Link href={`/services/${vendor.serviceSlug}`} className="hover:text-rose-deep">
            {t("back")}
          </Link>
        </nav>
        <p className="mt-4 text-xs uppercase tracking-[0.22em] text-muted">
          {service ? localized(service.name, currentLocale) : vendor.serviceSlug} · Oran
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
          <h1 className="font-serif text-4xl text-ink md:text-5xl">{vendor.name}</h1>
          <AddToEventButton
            vendorSlug={vendor.slug}
            serviceSlug={vendor.serviceSlug}
            citySlug={vendor.citySlug}
          />
        </div>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
          {localized(vendor.bio, currentLocale)}
        </p>
        <p className="mt-3 text-dusty">
          {serviceT("startingFrom")} {formatPrice(vendor.startingPrice, currentLocale)}
        </p>

        <h2 className="mt-12 font-serif text-3xl text-ink">{t("packages")}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {vendor.packages.map((item) => (
            <div key={localized(item.name, currentLocale)} className="rounded-[1.5rem] bg-white p-5 shadow-soft">
              <h3 className="font-serif text-xl">{localized(item.name, currentLocale)}</h3>
              <p className="mt-2 text-dusty">{formatPrice(item.startingPrice, currentLocale)}</p>
              <p className="mt-2 text-sm text-muted">{localized(item.details, currentLocale)}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-12 font-serif text-3xl text-ink">{t("portfolio")}</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {vendor.gallery.map((src) => (
            <div key={src} className="relative h-56 overflow-hidden rounded-[1.5rem]">
              <Image src={src} alt="" fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
