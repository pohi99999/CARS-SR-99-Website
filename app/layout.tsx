import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import dynamic from "next/dynamic";
import Providers from "@/app/providers";
import EventBanner from "@/components/EventBanner";
import Header from "@/components/Header";
import TrackingScripts from "@/components/TrackingScripts";
import {
  AIChatAssistant,
  CompareDock,
  CookieBanner,
  FomoNotification,
} from "@/components/DynamicClientComponents";

const Footer = dynamic(() => import("@/components/Footer"));
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

const baseUrl = "https://cars-sr99.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "CARS SR99 Kft. | Minőségi Autókereskedés Zalaegerszeg",
    template: "%s | CARS SR99 Kft.",
  },
  description:
    "Megbízható, ellenőrzött prémium használt autók Zalaegerszegen, a Ságodi Iparterületen. Kedvező autóbeszámítás, lízing ügyintézés és transzparens előélet.",
  keywords: [
    "autókereskedés Zalaegerszeg",
    "használt autó Zalaegerszeg",
    "CARS SR99",
    "autó lízing",
    "autóbeszámítás Zalaegerszeg",
    "prémium autók",
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "CARS SR99 Kft. | Minőségi Autókereskedés Zalaegerszeg",
    description:
      "Megbízható, ellenőrzött prémium használt autók Zalaegerszegen, a Ságodi Iparterületen. Kedvező autóbeszámítás, lízing ügyintézés és transzparens előélet.",
    url: baseUrl,
    siteName: "CARS SR99 Kft.",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: `${baseUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CARS SR99 Kft. - Prémium Használtautó Kereskedés",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CARS SR99 Kft. | Minőségi Autókereskedés Zalaegerszeg",
    description:
      "Megbízható, ellenőrzött prémium használt autók Zalaegerszegen, a Ságodi Iparterületen. Kedvező autóbeszámítás, lízing ügyintézés és transzparens előélet.",
    images: [`${baseUrl}/og-image.png`],
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDealer",
  name: "CARS SR99 Kft.",
  image: `${baseUrl}/og-image.png`,
  logo: `${baseUrl}/logo.png`,
  url: baseUrl,
  telephone: "+36-70-907-0669",
  email: "carssr99@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ságod hrsz. 807/15",
    addressLocality: "Zalaegerszeg",
    postalCode: "8900",
    addressCountry: "HU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.862,
    longitude: 16.835,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "$$$",
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
      className={`${inter.variable} ${montserrat.variable} h-full antialiased max-w-full overflow-x-hidden`}
    >
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2YGHS313GC" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-2YGHS313GC');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} relative flex min-h-full flex-col bg-transparent text-foreground max-w-full overflow-x-hidden`}>
        <TrackingScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="sr99-bg-video pointer-events-none fixed inset-0 -z-50 h-full w-full object-cover opacity-100"
        >
          <source src="/bg-video.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none fixed inset-0 -z-40 bg-black/5" />
        <Providers>
          <FomoNotification />
          <Header />
          <EventBanner />
          <main className="relative z-10 flex-1 bg-transparent w-full max-w-full overflow-x-hidden">{children}</main>
          <Footer />
          <AIChatAssistant />
          <CompareDock />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
