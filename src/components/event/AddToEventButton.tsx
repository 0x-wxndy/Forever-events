"use client";

import { Heart } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { detailsComplete, useEventStore } from "@/store/event-store";

export function AddToEventButton({
  vendorSlug,
  serviceSlug,
  citySlug,
}: {
  vendorSlug: string;
  serviceSlug: string;
  citySlug: string;
}) {
  const t = useTranslations("flow");
  const router = useRouter();
  const hydrated = useHasHydrated();
  const details = useEventStore((state) => state.details);
  const addVendor = useEventStore((state) => state.addVendor);
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

  return (
    <button
      type="button"
      onClick={() => {
        if (!detailsComplete(details)) {
          router.push("/create");
          return;
        }
        addVendor({ vendorSlug, serviceSlug, citySlug });
      }}
      className={
        selected
          ? "inline-flex items-center gap-2 rounded-full border border-rose/40 bg-white px-5 py-2.5 text-sm text-dusty"
          : "inline-flex items-center gap-2 rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white shadow-[0_10px_24px_rgba(201,120,144,0.28)]"
      }
    >
      {selected ? t("addedShort") : t("addToEvent")}
      <Heart className="h-4 w-4" />
    </button>
  );
}
