import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listRequests } from "@/lib/inbox";
import type { Locale } from "@/i18n/routing";
import { cityLabel, eventTypeLabel, formatAdminDate } from "@/lib/admin-format";

export default async function AdminRequestsPage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;
  const requests = await listRequests();

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">{t("requests")}</h1>
      <div className="mt-8 overflow-hidden rounded-[1.6rem] bg-white shadow-soft">
        {requests.length === 0 ? (
          <p className="p-6 text-sm text-muted">{t("emptyRequests")}</p>
        ) : (
          <div className="divide-y divide-rose/10">
            {requests.map((item) => (
              <Link
                key={item.id}
                href={`/admin/requests/${item.id}`}
                className="block px-5 py-4 transition hover:bg-blush/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-medium text-ink">{item.name}</p>
                  <span className="rounded-full bg-blush px-3 py-1 text-xs text-dusty">
                    {t(item.status)}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {eventTypeLabel(item.eventType, locale)} · {cityLabel(item.citySlug, locale)} ·{" "}
                  {item.vendors.length} {t("vendors").toLowerCase()} ·{" "}
                  {formatAdminDate(item.createdAt, locale)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
