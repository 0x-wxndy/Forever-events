import { EventConfirmation } from "@/components/event/EventConfirmation";
import { setRequestLocale } from "next-intl/server";

export default async function ConfirmationPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventConfirmation />;
}
