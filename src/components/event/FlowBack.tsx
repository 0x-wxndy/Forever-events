"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function FlowBack({ href }: { href: string }) {
  const t = useTranslations("flow");

  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/85 px-4 py-2 text-sm text-dusty shadow-soft hover:bg-blush"
    >
      <ArrowLeft className="h-4 w-4" />
      {t("back")}
    </Link>
  );
}
