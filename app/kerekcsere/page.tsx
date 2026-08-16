import type { Metadata } from "next";
import { RefreshCw, Gauge, Wrench, Warehouse, CalendarClock, CheckCircle2, Clock } from "lucide-react";
import KerekcsereCTAButtons from "@/components/KerekcsereCTAButtons";

import { siteUrl } from "@/utils/site";

export const metadata: Metadata = {
  title: "Kerékcsere és Gumicsere Zalaegerszeg",
  description:
    "Hamarosan induló kerékcsere és gumicsere szolgáltatásunk Zalaegerszegen: szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel a CARS SR99 Kft. ságodi telephelyén.",
  alternates: {
    canonical: `${siteUrl}/kerekcsere`,
  },
  openGraph: {
    title: "Kerékcsere és Gumicsere Zalaegerszeg | CARS SR99 Kft.",
    description:
      "Hamarosan induló kerékcsere és gumicsere szolgáltatásunk Zalaegerszegen: szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel a CARS SR99 Kft. ságodi telephelyén.",
    url: `${siteUrl}/kerekcsere`,
    siteName: "CARS SR99 Kft.",
    locale: "hu_HU",
    type: "website",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "CARS SR99 Kft. - Kerékcsere és Gumicsere",
      },
    ],
  },
};

const services = [
  {
    icon: RefreshCw,
    title: "Szezonális gumicsere",
    description: "Nyári-téli gumicsere gyorsan és pontosan, korszerű berendezéseinkkel.",
  },
  {
    icon: Gauge,
    title: "Kiegyensúlyozás",
    description: "Pontos kerékkiegyensúlyozás a nyugodt, vibrációmentes vezetésért.",
  },
  {
    icon: Wrench,
    title: "Defektjavítás",
    description: "Defektjavítás és gumiszerviz szakszerűen, rövid átfutási idővel.",
  },
  {
    icon: Warehouse,
    title: "Gumihotel",
    description: "Szezonon kívüli gumi- és kerék-tárolás biztonságos körülmények között.",
  },
];

const steps = [
  {
    icon: CalendarClock,
    title: "Érdeklődés",
    description: "Jelezze igényét telefonon vagy a kapcsolati űrlapon, és elsők között értesítjük az induláskor.",
  },
  {
    icon: Wrench,
    title: "Kerékcsere a helyszínen",
    description: "Korszerű géppel végzünk gyors és pontos kerékcserét és kiegyensúlyozást.",
  },
  {
    icon: CheckCircle2,
    title: "Gyors átvétel",
    description: "Ellenőrzött, pontosan beállított kerekekkel veheti át autóját.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kerékcsere és gumicsere",
  name: "CARS SR99 Kerékcsere és Gumicsere",
  description:
    "Szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel szolgáltatás Zalaegerszegen, hamarosan induló CARS SR99 kerék- és gumiszervizben.",
  provider: {
    "@type": "AutoDealer",
    name: "CARS SR99 Kft.",
    telephone: "+36-70-907-0669",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Ságod hrsz. 807/15",
      addressLocality: "Zalaegerszeg",
      postalCode: "8900",
      addressCountry: "HU",
    },
  },
  areaServed: {
    "@type": "City",
    name: "Zalaegerszeg",
  },
  url: `${siteUrl}/kerekcsere`,
};

export default function KerekcserePage() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/hero-poster.webp')] bg-cover bg-center bg-no-repeat py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sötét gradiens overlay réteg elmosás nélkül */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/30 to-[#121212]/60 pointer-events-none" />

      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-8 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
              Új szolgáltatás
            </p>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              <Clock className="h-3.5 w-3.5" />
              Hamarosan indul
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
            Kerékcsere és Gumicsere Zalaegerszegen
          </h1>
          <p className="mt-6 leading-7 text-slate-300">
            A CARS SR99 Kft. új beruházású kerék- és gumiszerviz eszközparkkal bővíti szolgáltatásait.
            Hamarosan Öntől is várjuk autóját szezonális gumicserére, kiegyensúlyozásra és gumiszervizre
            – ugyanazon a megbízható, ságodi telephelyen, ahol autóját is megvásárolta vagy vásárolná.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
              <h2 className="font-semibold text-sky-300">Korszerű géppark</h2>
              <p className="mt-2 leading-6 text-slate-300">
                Új beruházású kerék- és gumicsere berendezéseinkkel gyors, pontos és biztonságos
                kiszolgálást biztosítunk minden autótípushoz.
              </p>
            </div>

            <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
              <h2 className="font-semibold text-sky-300">Ismert, megbízható telephely</h2>
              <p className="mt-2 leading-6 text-slate-300">
                A szolgáltatás a ságodi telephelyünkön érhető majd el, ugyanott, ahol autókereskedési
                és autóbeszámítási tevékenységünket is folytatjuk.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Szolgáltatásaink (hamarosan elérhető)
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.title}
                    className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <h3 className="mt-3 font-semibold text-white">{service.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-300">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Hogyan fog működni?
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {steps.map((step, idx) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.title}
                    className="relative rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <p className="mt-3 text-xs font-semibold uppercase tracking-widest text-sky-400">
                      {idx + 1}. lépés
                    </p>
                    <h3 className="mt-1 font-semibold text-white">{step.title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-slate-300">{step.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <KerekcsereCTAButtons />
        </div>
      </section>
    </div>
  );
}
