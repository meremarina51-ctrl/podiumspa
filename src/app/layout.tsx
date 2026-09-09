import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import { FloatingButton } from "@/components/FloatingButton";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Single site-wide typeface: Manrope, loaded under both the body and
// display variable slots so every existing `var(--font-jost)` /
// `var(--font-cormorant)` reference resolves to the same font family.
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

export const metadata: Metadata = {
  title: "Podium — приватный салон эротического массажа в Москве",
  description: "Podium — салон эротического массажа класса VIP в центре Москвы. Работаем круглосуточно.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable} ${jost.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <FloatingButton />
      </body>
    </html>
  );
};
