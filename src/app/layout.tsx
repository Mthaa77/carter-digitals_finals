import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
  title: "Carter Digitals | Web Design & Business Tools — Pretoria, Soshanguve",
  description:
    "100% Black-owned B-BBEE Level 1 digital agency based in Soshanguve, Pretoria. We build SME websites, business dashboards, and internal tools that make your business run. From R7,950.",
  keywords: [
    "web design Pretoria",
    "Soshanguve web design",
    "B-BBEE Level 1 agency",
    "business dashboards South Africa",
    "SME websites Pretoria",
    "Carter Digitals",
    "Next.js web design",
    "digital agency Pretoria",
  ],
  authors: [{ name: "Carter Digitals (Pty) Ltd" }],
  icons: {
    icon: "/carter-digitals-logo.png",
  },
  openGraph: {
    title: "Carter Digitals | Web Design & Business Tools — Pretoria, Soshanguve",
    description:
      "100% Black-owned B-BBEE Level 1 digital agency. Premium websites and business tools for SMEs done waiting to be seen.",
    url: "https://www.carterdigitals.co.za",
    siteName: "Carter Digitals",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carter Digitals | Web Design & Business Tools",
    description:
      "100% Black-owned B-BBEE Level 1 digital agency from Soshanguve, Pretoria.",
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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
