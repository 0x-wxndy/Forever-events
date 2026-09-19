"use client";

import { usePathname } from "@/i18n/navigation";
import { EventDock } from "@/components/event/EventDock";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdmin) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <EventDock />
    </>
  );
}
