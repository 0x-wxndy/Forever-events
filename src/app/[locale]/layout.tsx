import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Outfit } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteChrome } from "@/components/layout/SiteChrome";
import "../globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

export const metadata: Metadata = {
  title: {
    default: "Forever Events",
    template: "%s · Forever Events",
  },
  description:
    "Forever Events gathers trusted vendors in Oran so you can plan a beautiful event in a few clicks.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body
        className={`${outfit.variable} ${cormorant.variable} ${greatVibes.variable} min-h-screen bg-ivory font-sans text-ink antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <SiteChrome>{children}</SiteChrome>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
