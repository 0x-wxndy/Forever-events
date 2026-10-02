import { getLocale } from "next-intl/server";
import { RequestsBoard } from "@/components/admin/RequestsBoard";
import { listRequests } from "@/lib/inbox";
import { vendors, getVendor } from "@/data/catalog";
import type { Locale } from "@/i18n/routing";
import { cityLabel, eventTypeLabel, formatAdminDate } from "@/lib/admin-format";

export default async function AdminRequestsPage() {
  const locale = (await getLocale()) as Locale;
  const requests = await listRequests();

  const rows = requests.map((item) => ({
    id: item.id,
    name: item.name,
    phone: item.phone,
    city: cityLabel(item.citySlug, locale),
    date: formatAdminDate(item.eventDate, locale),
    eventType: eventTypeLabel(item.eventType, locale),
    budget: item.budget || "—",
    status: item.status,
    vendors: item.vendors.map((vendor) => {
      const found = getVendor(vendor.vendorSlug);
      return {
        slug: vendor.vendorSlug,
        name: found?.name || vendor.vendorSlug,
        image: found?.coverImage || "/images/photographers.jpg",
      };
    }),
  }));

  return <RequestsBoard rows={rows} vendorCount={vendors.length} />;
}
