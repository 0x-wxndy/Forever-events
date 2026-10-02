import { EventReview } from "@/components/event/EventReview";
import { setRequestLocale } from "next-intl/server";

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <EventReview />;
}
