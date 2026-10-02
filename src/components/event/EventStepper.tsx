"use client";

import { ArrowLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

const steps = [
  { n: 1, key: "details", href: "/create" },
  { n: 2, key: "services", href: "/my-event/browse" },
  { n: 3, key: "review", href: "/my-event/review" },
  { n: 4, key: "confirm", href: "/my-event/confirmation" },
] as const;

export function EventStepper({
  current,
  labels,
  backHref,
}: {
  current: 1 | 2 | 3 | 4;
  labels: Record<(typeof steps)[number]["key"], string>;
  backHref?: string;
}) {
  const t = useTranslations("flow");

  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-5 inline-flex items-center gap-2 rounded-full border border-rose/25 bg-white/85 px-4 py-2 text-sm text-dusty shadow-soft hover:bg-blush"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("back")}
        </Link>
      )}
      <ol className="flex items-center justify-between gap-2">
        {steps.map((step, index) => {
          const active = current === step.n;
          const done = current > step.n;
          return (
            <li key={step.n} className="flex flex-1 items-center gap-2">
              <Link
                href={step.href}
                className="flex flex-col items-center text-center"
                aria-current={active ? "step" : undefined}
              >
                <span
                  className={cn(
                    "grid h-8 w-8 place-items-center rounded-full text-sm font-medium transition",
                    active || done ? "bg-rose-deep text-white" : "bg-blush text-muted hover:bg-rose/30",
                  )}
                >
                  {step.n}
                </span>
                <span
                  className={cn(
                    "mt-2 hidden text-xs sm:block",
                    active ? "text-rose-deep" : "text-muted hover:text-dusty",
                  )}
                >
                  {labels[step.key]}
                </span>
              </Link>
              {index < steps.length - 1 && (
                <span
                  className={cn("mb-5 h-px flex-1", done ? "bg-rose-deep/70" : "bg-rose/25")}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
