import { getLocale, getTranslations } from "next-intl/server";
import { services, vendors } from "@/data/catalog";
import { formatPrice, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";

export default async function AdminVendorsPage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">{t("vendors")}</h1>
      <div className="mt-8 space-y-4">
        {vendors.map((vendor) => {
          const service = services.find((item) => item.slug === vendor.serviceSlug);
          return (
            <article key={vendor.slug} className="rounded-[1.6rem] bg-white p-5 shadow-soft">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">
                {service ? localized(service.name, locale) : vendor.serviceSlug} · {vendor.citySlug}
              </p>
              <h2 className="mt-1 font-serif text-2xl text-ink">{vendor.name}</h2>
              <p className="mt-2 text-sm text-dusty">{formatPrice(vendor.startingPrice, locale)}</p>
              <p className="mt-2 text-sm text-muted">{localized(vendor.bio, locale)}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
