"use client";

import {
  ClipboardList,
  Home,
  LogOut,
  Mail,
  Store,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const links = [
  { href: "/admin", key: "overview", icon: Home },
  { href: "/admin/requests", key: "requests", icon: ClipboardList },
  { href: "/admin/vendors", key: "vendors", icon: Store },
  { href: "/admin/messages", key: "messages", icon: Mail },
] as const;

export function AdminNav({ incoming = 0 }: { incoming?: number }) {
  const t = useTranslations("admin");
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <aside className="rounded-[1.8rem] bg-gradient-to-b from-[#8d5a63] to-[#5f3d45] p-5 text-white shadow-soft">
      <nav className="grid gap-1 text-sm">
        {links.map((link) => {
          const active =
            link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center justify-between rounded-full px-4 py-2.5 transition",
                active ? "bg-white/20" : "hover:bg-white/10",
              )}
            >
              <span className="inline-flex items-center gap-2">
                <link.icon className="h-4 w-4" />
                {t(link.key)}
              </span>
              {link.key === "requests" && incoming > 0 && (
                <span className="grid h-5 min-w-5 place-items-center rounded-full bg-rose-deep px-1.5 text-[11px]">
                  {incoming}
                </span>
              )}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={logout}
          className="mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-left hover:bg-white/10"
        >
          <LogOut className="h-4 w-4" />
          {t("signOut")}
        </button>
      </nav>
    </aside>
  );
}
