import { getLocale } from "next-intl/server";
import { RequestsBoard } from "@/components/admin/RequestsBoard";
import { listRequests } from "@/lib/inbox";
import { readCatalog } from "@/lib/catalog-store";
import type { Locale } from "@/i18n/routing";
import { cityLabel, eventTypeLabel, formatAdminDate } from "@/lib/admin-format";

export default async function AdminRequestsPage() {
  const locale = (await getLocale()) as Locale;
  const requests = await listRequests();
  const catalog = await readCatalog();

  const rows = requests.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    city: cityLabel(item.citySlug, locale),
    citySlug: item.citySlug || "",
    date: formatAdminDate(item.eventDate, locale),
    eventDate: item.eventDate || "",
    eventType: eventTypeLabel(item.eventType, locale),
    eventTypeSlug: item.eventType || "",
    budget: item.budget || "—",
    status: item.status,
    vendors: item.vendors.map((vendor) => {
      const found = catalog.vendors.find((entry) => entry.slug === vendor.vendorSlug);
      return {
        slug: vendor.vendorSlug,
        name: found?.name || vendor.vendorSlug,
        image: found?.coverImage || "/images/photographers.jpg",
      };
    }),
  }));

  return <RequestsBoard rows={rows} vendorCount={catalog.vendors.length} />;
}
