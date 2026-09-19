"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", key: "overview" },
  { href: "/admin/requests", key: "requests" },
  { href: "/admin/messages", key: "messages" },
  { href: "/admin/vendors", key: "vendors" },
] as const;

export function AdminNav() {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <header className="border-b border-rose/15 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-4">
        <Link href="/admin" className="font-script text-3xl text-[#7a5346]">
          Forever <span className="text-rose-deep">♥</span>
        </Link>
        <nav className="flex flex-wrap items-center gap-4 text-sm">
          {links.map((link) => {
            const active =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition hover:text-dusty",
                  active && "font-medium text-rose-deep",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <Link href="/" className="text-muted hover:text-ink">
            {t("openSite")}
          </Link>
          <button type="button" onClick={logout} className="text-dusty">
            {t("signOut")}
          </button>
        </div>
      </div>
    </header>
  );
}
