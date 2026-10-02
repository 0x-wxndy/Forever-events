import { ServiceBrowse } from "@/components/event/ServiceBrowse";
import { setRequestLocale } from "next-intl/server";

export default async function BrowsePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ service?: string; q?: string }>;
}) {
  const { locale } = await params;
  const query = await searchParams;
  setRequestLocale(locale);
  return <ServiceBrowse serviceSlug={query.service} initialQuery={query.q} />;
}
