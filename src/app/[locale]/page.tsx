import { Hero } from "@/components/home/Hero";
import { HomeAbout } from "@/components/home/HomeAbout";
import { HomeHow } from "@/components/home/HomeHow";
import { HomeServices } from "@/components/home/HomeServices";
import { setRequestLocale } from "next-intl/server";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <HomeServices />
      <HomeAbout />
      <HomeHow />
    </>
  );
}
