import type { Metadata } from "next";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import { FloatingButton } from "@/components/FloatingButton";
import { routing } from "@/i18n/routing";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jost = Manrope({
  variable: "--font-jost",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const cormorant = Manrope({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800"],
});

type Props = LayoutProps<"/[locale]">;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return { title: t("title"), description: t("description") };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  setRequestLocale(locale);

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <NextIntlClientProvider>
          {children}
          <FloatingButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
