"use client";

import { Heart, Menu, Plus, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/how-it-works", key: "how" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const onHome = pathname === "/";

  return (
    <header
      className={cn(
        "absolute inset-x-0 top-0 z-40",
        !onHome && "bg-gradient-to-b from-ivory/90 to-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-7 text-[0.95rem] text-ink/80 lg:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative transition hover:text-dusty",
                  active && "font-medium text-rose-deep",
                )}
              >
                {t(link.key)}
                {active && (
                  <span className="absolute inset-x-1 -bottom-1 h-px bg-rose-deep" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitch />
          <Link href="/my-event" className="text-dusty hover:text-rose-deep" aria-label={t("myEvent")}>
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-2 text-sm text-white shadow-[0_8px_20px_rgba(201,120,144,0.28)] transition hover:bg-dusty"
          >
            {t("create")}
            <Plus className="h-4 w-4" />
          </Link>
        </div>

        <button
          type="button"
          className="rounded-full border border-rose/30 p-2 text-ink lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-5 rounded-3xl border border-white/70 bg-white/90 p-5 shadow-soft backdrop-blur lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-full px-3 py-2 hover:bg-blush"
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitch />
            <Link href="/my-event" onClick={() => setOpen(false)} className="rounded-full px-3 py-2 hover:bg-blush">
              {t("myEvent")}
            </Link>
            <Link
              href="/create"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-rose-deep px-4 py-2.5 text-white"
            >
              {t("create")}
              <Plus className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function LanguageSwitch() {
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <div className="flex items-center gap-1 text-xs tracking-[0.18em] text-muted">
      <Link
        href={pathname}
        locale="en"
        className={cn("px-1 hover:text-ink", locale === "en" && "font-semibold text-ink")}
      >
        EN
      </Link>
      <span>|</span>
      <Link
        href={pathname}
        locale="fr"
        className={cn("px-1 hover:text-ink", locale === "fr" && "font-semibold text-ink")}
      >
        FR
      </Link>
    </div>
  );
}
