"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/navigation";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { detailsComplete, useEventStore } from "@/store/event-store";

export function RequireEventDetails({ children }: { children: React.ReactNode }) {
  const hydrated = useHasHydrated();
  const details = useEventStore((state) => state.details);
  const ready = detailsComplete(details);

  if (!hydrated) {
    return <div className="px-5 py-32 text-center text-muted">…</div>;
  }

  if (!ready) {
    return <RedirectToCreate />;
  }

  return <>{children}</>;
}

function RedirectToCreate() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/create");
  }, [router]);
  return <div className="px-5 py-32 text-center text-muted">…</div>;
}
