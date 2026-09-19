import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href="/" className={cn("group block leading-none", className)}>
      <span
        className={cn(
          "font-script text-[2.15rem] leading-none",
          light ? "text-white" : "text-[#8a5a4a]",
        )}
      >
        Forever
        <span className="ml-1 inline-block -translate-y-2 text-base text-rose-deep">♥</span>
      </span>
      <span
        className={cn(
          "mt-[-6px] flex items-center gap-1 font-script text-[1.85rem] leading-none",
          light ? "text-white" : "text-[#7a5346]",
        )}
      >
        Events
        <span className="text-sm text-champagne">✦</span>
      </span>
      <span
        className={cn(
          "mt-1 block text-[0.62rem] font-medium uppercase tracking-[0.28em]",
          light ? "text-white/80" : "text-champagne",
        )}
      >
        Plan · Celebrate · Forever
      </span>
    </Link>
  );
}
