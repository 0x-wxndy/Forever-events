import { EventsList } from "@/components/event/EventsList";
import { setRequestLocale } from "next-intl/server";

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventsList />;
}
