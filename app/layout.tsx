import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/app/providers";
import AIChatAssistant from "@/components/AIChatAssistant";
import CompareDock from "@/components/CompareDock";
import CookieBanner from "@/components/CookieBanner";
import EventBanner from "@/components/EventBanner";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cars-sr99-website.vercel.app"),
  title: {
    default: "CARS SR99 Kft. | Prémium használtautó kereskedés Zalaegerszeg",
    template: "%s | CARS SR99 Kft.",
  },
  description:
    "Prémium használtautó kereskedés Zalaegerszegen: JSZP ellenőrzött járművek, autóbeszámítás, transzparens ügyintézés és gyors kapcsolatfelvétel.",
  keywords: [
    "Prémium használtautó kereskedés Zalaegerszeg",
    "CARS SR99 Kft.",
    "Autóbeszámítás",
    "JSZP ellenőrzött járművek",
    "hibrid autók",
    "használtautó",
  ],
  openGraph: {
    title: "CARS SR99 Kft. | Prémium használtautó kereskedés Zalaegerszeg",
    description:
      "Fedezze fel JSZP ellenőrzött kínálatunkat, kérjen gyors kapcsolatfelvételt vagy autóbeszámítási ajánlatot.",
    url: "https://cars-sr99-website.vercel.app",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" suppressHydrationWarning className={`${inter.variable} h-full antialiased`}>
      <body className="relative flex min-h-full flex-col bg-background text-foreground">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="pointer-events-none fixed inset-0 -z-50 h-full w-full object-cover opacity-20"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <Providers>
          <EventBanner />
          <Header />
          <main className="relative z-10 flex-1 bg-[#121212]/70 backdrop-blur-md">{children}</main>
          <Footer />
          <AIChatAssistant />
          <CompareDock />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
