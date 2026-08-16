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
import { businessId, siteUrl, websiteId } from "@/utils/site";

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

const baseUrl = siteUrl;

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
    "kerékcsere Zalaegerszeg",
    "gumicsere Zalaegerszeg",
    "gumiszerviz Zalaegerszeg",
  ],
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
    other: {
      "facebook-domain-verification": "5kz83ci65r1i338w8p5o3hzkgh415o",
    },
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
  "@id": businessId,
  name: "CARS SR99 Kft.",
  legalName: "CARS SR99 Kft.",
  description:
    "Ellenőrzött előéletű prémium használt autók értékesítése, beszámítás, autóbérlés, valamint kerék- és gumiszerviz Zalaegerszegen, a ságodi telephelyen.",
  image: `${baseUrl}/og-image.png`,
  logo: `${baseUrl}/logo.png`,
  url: baseUrl,
  telephone: "+36-70-907-0669",
  email: "carssr99@gmail.com",
  // A sameAs köti össze a weboldalt a cég többi hiteles profiljával. Ez az egyik
  // legfontosabb jelzés a Google-nak arról, hogy a weboldal és a Cégprofil
  // ugyanaz a valós vállalkozás.
  sameAs: ["https://www.facebook.com/profile.php?id=61592011856759"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ságod hrsz. 807/15",
    addressLocality: "Zalaegerszeg",
    addressRegion: "Zala",
    postalCode: "8900",
    addressCountry: "HU",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 46.862,
    longitude: 16.835,
  },
  // Milyen földrajzi területet szolgálunk ki – segít a környékbeli keresésekben.
  areaServed: [
    { "@type": "City", name: "Zalaegerszeg" },
    { "@type": "AdministrativeArea", name: "Zala vármegye" },
  ],
  // A szolgáltatáskatalógus explicit módon megmondja a Google-nak, hogy nem csak
  // autót adunk el: bérlés és gumiszerviz is van. Enélkül a kereső csak az
  // autókereskedés tevékenységet társítja a céghez.
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "CARS SR99 szolgáltatások",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Használt autó értékesítés",
          areaServed: { "@type": "City", name: "Zalaegerszeg" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Autóbeszámítás és autófelvásárlás",
          areaServed: { "@type": "City", name: "Zalaegerszeg" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Autóbérlés",
          areaServed: { "@type": "City", name: "Zalaegerszeg" },
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Kerékcsere és gumicsere",
          areaServed: { "@type": "City", name: "Zalaegerszeg" },
        },
      },
    ],
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
  currenciesAccepted: "HUF",
  paymentAccepted: "Készpénz, Átutalás, Bankkártya, Lízing",
  priceRange: "$$",
};

// Külön WebSite entitás. Ez mondja meg a Google-nak, hogy a "CARS SR99" nevű
// weboldal melyik céghez tartozik – ez erősíti a márkanévre indított kereséseket.
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: baseUrl,
  name: "CARS SR99 Kft.",
  inLanguage: "hu-HU",
  publisher: { "@id": businessId },
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
      {/*
        A Google Analytics és a Meta Pixel betöltése szándékosan NEM itt történik.
        GDPR: minden mérőkód a <TrackingScripts /> komponensben él, amely csak
        a süti banner kifejezett elfogadása után tölti be őket.
      */}
      <body className={`${inter.className} relative flex min-h-full flex-col bg-transparent text-foreground max-w-full overflow-x-hidden`}>
        <TrackingScripts />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
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
