import { EventFichePage } from "@/components/event/EventFichePage";
import { setRequestLocale } from "next-intl/server";

export default async function EventSheetPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);
  return <EventFichePage id={id} />;
}
