import { EventDashboard } from "@/components/event/EventDashboard";
import { setRequestLocale } from "next-intl/server";

export default async function MyEventPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventDashboard />;
}
