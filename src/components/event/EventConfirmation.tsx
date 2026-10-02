"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { EventStepper } from "@/components/event/EventStepper";
import { FloralScreen } from "@/components/event/FloralScreen";
import { Link, useRouter } from "@/i18n/navigation";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useEventStore } from "@/store/event-store";

export function EventConfirmation() {
  const t = useTranslations("flow");
  const hydrated = useHasHydrated();
  const submitted = useEventStore((state) => state.submitted);
  const router = useRouter();

  useEffect(() => {
    if (hydrated && !submitted) {
      router.replace("/my-event/review");
    }
  }, [hydrated, submitted, router]);

  if (!hydrated || !submitted) {
    return <div className="px-5 py-32 text-center text-muted">…</div>;
  }

  return (
    <FloralScreen>
      <div className="mx-auto max-w-xl rounded-[2rem] bg-white/90 p-8 text-center shadow-soft">
        <EventStepper
          current={4}
          backHref="/my-event/review"
          labels={{
            details: t("stepDetails"),
            services: t("stepServices"),
            review: t("stepReview"),
            confirm: t("stepConfirm"),
          }}
        />
        <h1 className="font-script text-5xl text-dusty">{t("confirmTitle")}</h1>
        <p className="mt-3 text-sm leading-7 text-muted">{t("confirmBody")}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/my-event" className="rounded-full bg-rose-deep px-5 py-2.5 text-sm text-white">
            {t("dashboard")}
          </Link>
          <Link href="/" className="rounded-full border border-rose/30 px-5 py-2.5 text-sm text-dusty">
            {t("backHome")}
          </Link>
        </div>
      </div>
    </FloralScreen>
  );
}
