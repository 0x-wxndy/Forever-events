"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/layout/Logo";

function SocialIcons() {
  const iconClass = "h-4 w-4";
  return (
    <div className="flex items-center gap-3 text-dusty">
      <svg viewBox="0 0 24 24" className={iconClass} fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
      </svg>
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M14 8h3V4h-3c-2.8 0-5 2.2-5 5v2H7v4h2v9h4v-9h3l1-4h-4V9c0-.6.4-1 1-1Z" />
      </svg>
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M14.5 3c.2 2.4 1.5 4.2 3.5 5v3c-1.3-.1-2.5-.6-3.5-1.4V15a6.5 6.5 0 1 1-6.5-6.5c.3 0 .7 0 1 .1v3.2A3.5 3.5 0 1 0 12 15V3h2.5Z" />
      </svg>
      <svg viewBox="0 0 24 24" className={iconClass} fill="currentColor">
        <path d="M23 12.2s0-3.4-.4-5c-.3-1.2-1.2-2.1-2.4-2.4C18.4 4.3 12 4.3 12 4.3s-6.4 0-8.2.5C2.6 5.1 1.7 6 1.4 7.2.9 8.8.9 12.2.9 12.2s0 3.4.5 5c.3 1.2 1.2 2.1 2.4 2.4 1.8.5 8.2.5 8.2.5s6.4 0 8.2-.5c1.2-.3 2.1-1.2 2.4-2.4.4-1.6.4-5 .4-5ZM9.8 15.6V8.8l6.4 3.4-6.4 3.4Z" />
      </svg>
    </div>
  );
}

export function Footer() {
  const t = useTranslations();

  return (
    <footer className="relative overflow-hidden border-t border-rose/15 bg-gradient-to-b from-[#fff7f8] to-[#fdeef2] pt-12 pb-6">
      <div className="pointer-events-none absolute -left-8 bottom-0 h-40 w-40 rounded-full bg-[url('/images/blossoms.jpg')] bg-cover opacity-40 blur-[1px]" />
      <div className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-[url('/images/blossoms-2.jpg')] bg-cover opacity-30" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-8 px-5 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <Logo />

        <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-ink/70">
          <Link href="/">{t("nav.home")}</Link>
          <Link href="/about">{t("nav.about")}</Link>
          <Link href="/services">{t("nav.services")}</Link>
          <Link href="/how-it-works">{t("nav.how")}</Link>
          <Link href="/contact">{t("nav.contact")}</Link>
        </nav>

        <div className="flex items-center gap-4">
          <SocialIcons />
          <Link
            href="/create"
            className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-4 py-2 text-sm text-white"
          >
            {t("nav.create")}
            <Plus className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="relative mx-auto mt-8 flex max-w-7xl flex-col items-center justify-between gap-2 px-5 text-xs text-muted lg:flex-row lg:px-8">
        <p>{t("footer.rights")}</p>
        <p className="font-script text-lg text-dusty">{t("brand.moments")}</p>
      </div>
    </footer>
  );
}
