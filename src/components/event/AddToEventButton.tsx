"use client";

import { ArrowRight, Check, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useEventStore } from "@/store/event-store";

export function AddToEventButton({
  vendorSlug,
  serviceSlug,
  citySlug,
}: {
  vendorSlug: string;
  serviceSlug: string;
  citySlug: string;
}) {
  const t = useTranslations("vendor");
  const hydrated = useHasHydrated();
  const addVendor = useEventStore((state) => state.addVendor);
  const removeVendor = useEventStore((state) => state.removeVendor);
  const selected = useEventStore((state) =>
    state.selections.some((item) => item.vendorSlug === vendorSlug),
  );

  if (!hydrated) {
    return (
      <span className="inline-flex h-11 min-w-48 items-center justify-center rounded-full bg-blush text-sm text-dusty">
        …
      </span>
    );
  }

  if (selected) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => removeVendor(vendorSlug)}
          className="inline-flex items-center gap-2 rounded-full border border-rose/40 bg-white px-5 py-2.5 text-sm text-dusty"
        >
          <Check className="h-4 w-4" />
          {t("added")}
        </button>
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-sm text-rose-deep hover:text-dusty"
        >
          {t("addAnother")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addVendor({ vendorSlug, serviceSlug, citySlug })}
      className="inline-flex items-center gap-2 rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white shadow-[0_10px_24px_rgba(201,120,144,0.28)]"
    >
      <Plus className="h-4 w-4" />
      {t("add")}
    </button>
  );
}
