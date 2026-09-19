import { getLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Vendor } from "@/data/catalog";
import { getService } from "@/data/catalog";
import { formatPrice, localized } from "@/lib/format";
import type { Locale } from "@/i18n/routing";
import { AddToEventButton } from "@/components/event/AddToEventButton";

export async function VendorCard({ vendor }: { vendor: Vendor }) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("service");
  const service = getService(vendor.serviceSlug);

  return (
    <article className="overflow-hidden rounded-[1.8rem] bg-white shadow-soft">
      <Link href={`/vendors/${vendor.slug}`} className="relative block h-56">
        <Image
          src={vendor.coverImage}
          alt={vendor.name}
          fill
          className="object-cover"
        />
      </Link>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {service ? localized(service.name, locale) : vendor.serviceSlug}
        </p>
        <h3 className="mt-1 font-serif text-2xl text-ink">{vendor.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted">
          {localized(vendor.bio, locale)}
        </p>
        <p className="mt-4 text-sm text-dusty">
          {t("startingFrom")} {formatPrice(vendor.startingPrice, locale)}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <AddToEventButton
            vendorSlug={vendor.slug}
            serviceSlug={vendor.serviceSlug}
            citySlug={vendor.citySlug}
          />
          <Link href={`/vendors/${vendor.slug}`} className="text-sm text-ink/70 underline-offset-4 hover:underline">
            {t("viewProfile")}
          </Link>
        </div>
      </div>
    </article>
  );
}
