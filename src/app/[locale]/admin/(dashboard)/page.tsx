import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { readCatalog } from "@/lib/catalog-store";
import { listContacts, listRequests } from "@/lib/inbox";
import type { Locale } from "@/i18n/routing";
import { formatAdminDate } from "@/lib/admin-format";

export default async function AdminHomePage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;
  const requests = await listRequests();
  const contacts = await listContacts();
  const catalog = await readCatalog();
  const incoming = requests.filter((item) => item.status === "new").length;

  const cards = [
    { label: t("requests"), value: requests.length, href: "/admin/requests" },
    { label: t("new"), value: incoming, href: "/admin/requests" },
    { label: t("messages"), value: contacts.length, href: "/admin/messages" },
    { label: t("vendors"), value: catalog.vendors.length, href: "/admin/vendors" },
  ];

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">{t("overview")}</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="rounded-[1.6rem] bg-white p-6 shadow-soft"
          >
            <p className="text-sm text-muted">{card.label}</p>
            <p className="mt-2 font-serif text-4xl text-rose-deep">{card.value}</p>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-2xl text-ink">{t("requests")}</h2>
      <div className="mt-4 space-y-3">
        {requests.slice(0, 5).map((item) => (
          <Link
            key={item.id}
            href={`/admin/requests/${item.id}`}
            className="block rounded-[1.4rem] bg-white px-5 py-4 shadow-soft"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium text-ink">{item.name}</p>
              <p className="text-xs uppercase tracking-wide text-dusty">{t(item.status)}</p>
            </div>
            <p className="mt-1 text-sm text-muted">
              {item.email} · {formatAdminDate(item.createdAt, locale)}
            </p>
          </Link>
        ))}
        {requests.length === 0 && <p className="text-sm text-muted">{t("emptyRequests")}</p>}
      </div>
    </div>
  );
}
