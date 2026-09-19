import { getLocale, getTranslations } from "next-intl/server";
import { listContacts } from "@/lib/inbox";
import type { Locale } from "@/i18n/routing";
import { formatAdminDate } from "@/lib/admin-format";

export default async function AdminMessagesPage() {
  const t = await getTranslations("admin");
  const locale = (await getLocale()) as Locale;
  const contacts = await listContacts();

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">{t("messages")}</h1>
      <div className="mt-8 space-y-4">
        {contacts.length === 0 && <p className="text-sm text-muted">{t("emptyMessages")}</p>}
        {contacts.map((item) => (
          <article key={item.id} className="rounded-[1.6rem] bg-white p-6 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-medium text-ink">{item.name}</h2>
              <p className="text-xs text-muted">{formatAdminDate(item.createdAt, locale)}</p>
            </div>
            <p className="mt-2 text-sm text-dusty">
              <a href={`mailto:${item.email}`}>{item.email}</a>
              {item.phone ? ` · ${item.phone}` : ""}
            </p>
            <p className="mt-3 text-sm leading-7 text-muted">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
