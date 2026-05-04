import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { CarterDigitalsJsonLd } from "@/components/json-ld";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carter Digitals | High-Agility Digital Infrastructure & AI-Enabled Solutions — Soshanguve, Pretoria",
  description:
    "100% Black-owned, 100% Youth-owned, B-BBEE Level 1 digital services studio from Soshanguve, Pretoria. Websites, web apps, business tools, brand identity & more. From R3,999. 5–7 day delivery.",
  keywords: [
    "web design Pretoria",
    "Soshanguve web design",
    "B-BBEE Level 1 agency",
    "business dashboards South Africa",
    "SME websites Pretoria",
    "Carter Digitals",
    "Next.js web design",
    "digital services studio Pretoria",
    "school websites South Africa",
    "pitch decks Pretoria",
    "brand identity Soshanguve",
    "CSD registered supplier",
    "100% Black-owned agency",
    "100% Youth-owned agency",
  ],
  authors: [{ name: "Carter Digitals (Pty) Ltd" }],
  icons: {
    icon: "/carter-digitals-logo.png",
  },
  openGraph: {
    title: "Carter Digitals | High-Agility Digital Infrastructure — Soshanguve, Pretoria",
    description:
      "100% Black-owned, B-BBEE Level 1 digital services studio. Websites, web apps, business tools, brand identity. 5–7 day delivery. From R3,999.",
    url: "https://carterdigitals.co.za",
    siteName: "Carter Digitals",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carter Digitals | High-Agility Digital Infrastructure",
    description:
      "100% Black-owned, B-BBEE Level 1 digital services studio from Soshanguve, Pretoria. 5–7 day delivery.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} ${jetbrainsMono.variable} antialiased bg-[#080808] text-[#F0EFE8] font-sans`}
      >
        <CarterDigitalsJsonLd />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
