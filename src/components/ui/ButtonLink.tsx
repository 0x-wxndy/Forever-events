import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "ghost" | "soft";
};

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition duration-500",
        variant === "primary" &&
          "bg-rose-deep text-white shadow-[0_10px_24px_rgba(201,120,144,0.28)] hover:bg-dusty",
        variant === "ghost" &&
          "border border-rose/40 bg-white/50 text-ink hover:bg-white",
        variant === "soft" && "bg-blush text-dusty hover:bg-rose/30",
        className,
      )}
    >
      {children}
    </Link>
  );
}
