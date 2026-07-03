import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import Providers from "@/app/providers";
import AIChatAssistant from "@/components/AIChatAssistant";
import CompareDock from "@/components/CompareDock";
import CookieBanner from "@/components/CookieBanner";
import EventBanner from "@/components/EventBanner";
import FomoNotification from "@/components/FomoNotification";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cars-sr99.vercel.app"),
  title: {
    default: "CARS SR99 Kft. – Prémium Autók Toyota és Kia Kínálattal",
    template: "%s | CARS SR99 Kft.",
  },
  description:
    "Toyota és Kia modellek gondosan válogatva – hibrid, benzin és diesel kínálattal, értékálló garanciával. Ismerje meg prémium autókínálatunkat.",
  keywords: [
    "Prémium használtautó kereskedés Zalaegerszeg",
    "CARS SR99 Kft.",
    "Autóbeszámítás",
    "JSZP ellenőrzött járművek",
    "hibrid autók",
    "használtautó",
  ],
  openGraph: {
    title: "CARS SR99 Kft. – Prémium Autók Toyota és Kia Kínálattal",
    description:
      "Toyota és Kia modellek gondosan válogatva – hibrid, benzin és diesel kínálattal, értékálló garanciával. Ismerje meg prémium autókínálatunkat.",
    url: "https://cars-sr99.vercel.app",
    siteName: "CARS SR99 Kft.",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "CARS SR99 Kft. hivatalos logó",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARS SR99 Kft. – Prémium Autók Toyota és Kia Kínálattal",
    description:
      "Toyota és Kia modellek gondosan válogatva – hibrid, benzin és diesel kínálattal, értékálló garanciával. Ismerje meg prémium autókínálatunkat.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="hu"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="sr99-bg-video pointer-events-none fixed inset-0 -z-50 h-full w-full object-cover opacity-60"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none fixed inset-0 -z-40 bg-black/20" />
        <Providers>
          <FomoNotification />
          <Header />
          <EventBanner />
          <main className="relative z-10 flex-1 bg-[#121212]/45 backdrop-blur-md">{children}</main>
          <Footer />
          <AIChatAssistant />
          <CompareDock />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
