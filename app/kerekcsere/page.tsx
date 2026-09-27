import type { Metadata } from "next";
import { RefreshCw, Gauge, Wrench, Warehouse, CalendarClock, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import KerekcsereCTAButtons from "@/components/KerekcsereCTAButtons";
import TireServicePhone from "@/components/TireServicePhone";

import { siteUrl } from "@/utils/site";

export const metadata: Metadata = {
  title: "Kerékcsere és gumiszerviz Zalaegerszeg-Ságod",
  description:
    "Kerékcsere és gumicsere szolgáltatásunk Zalaegerszegen: szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel a CARS SR99 Kft. ságodi telephelyén.",
  alternates: {
    canonical: `${siteUrl}/kerekcsere`,
  },
  openGraph: {
    title: "Kerékcsere és gumiszerviz Zalaegerszeg-Ságod | CARS SR99 Kft.",
    description:
      "Kerékcsere és gumicsere szolgáltatásunk Zalaegerszegen: szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel a CARS SR99 Kft. ságodi telephelyén.",
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
    title: "Időpontkérés",
    description: "Jelezze igényét telefonon vagy a kapcsolati űrlapon, és egyeztetünk egy Önnek megfelelő időpontot.",
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

// A GYIK a hosszú, informatív kereséseket célozza ("mikor kell téli gumit
// cserélni", "mennyi ideig tart egy kerékcsere"), amelyekre a Search Console
// szerint ma még egyáltalán nem jelenünk meg – a szolgáltatásoldal eddig csak
// a rövid, tranzakciós kulcsszavakra ("kerékcsere zalaegerszeg") volt írva.
const faqs = [
  {
    q: "Mikor kell nyári-téli gumit cserélni Magyarországon?",
    a: "A magyar KRESZ nem ír elő fix naptári határidőt, de hóban, jégen vagy ónos esőben kötelező a téli gumi vagy hólánc használata. A gyakorlatban a legtöbb autós október és április között vált téli gumira, az aktuális időjáráshoz igazodva – erre az időszakra érdemes időben, a szezoncsúcs előtt időpontot foglalni.",
  },
  {
    q: "Mennyi ideig tart egy kerékcsere?",
    a: "Egy szokásos, négykerekes gumi- vagy kerékcsere és kiegyensúlyozás időpontfoglalással jellemzően fél-egy órát vesz igénybe, várakozás nélkül.",
  },
  {
    q: "Kell-e előre időpontot foglalni?",
    a: "Igen, javasoljuk – különösen ősszel és tavasszal, a szezoncsúcsban –, hogy telefonon vagy a kapcsolati űrlapon egyeztessünk Önnek megfelelő időpontot.",
  },
  {
    q: "Csak a náluk vásárolt autókra vehető igénybe a szolgáltatás?",
    a: "Nem, a kerékcsere, gumicsere és gumihotel szolgáltatásunk minden ügyfelünk számára elérhető, függetlenül attól, hogy nálunk vásárolta-e az autóját.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Kerékcsere és gumicsere",
  name: "CARS SR99 Kerékcsere és Gumicsere",
  description:
    "Szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel szolgáltatás Zalaegerszegen, a CARS SR99 Kft. kerék- és gumiszervizében.",
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
  availableChannel: {
    "@type": "ServiceChannel",
    servicePhone: {
      "@type": "ContactPoint",
      telephone: "+36-30-842-7297",
      contactType: "Gumiszerviz, időpontkérés",
      areaServed: "HU",
      availableLanguage: "hu",
    },
  },
  url: `${siteUrl}/kerekcsere`,
};

// A műhely fotói (Robi, 2026-09-27; a vendégautó rendszáma kitakarva). Az alt szöveg azt
// írja le, ami a képen látszik; márkát, gumitípust nem állítunk, amit a kép nem mutat.
const workshopPhotos = [
  { src: "/kerekcsere/2026-09-27-muhely-attekintes.webp", w: 1280, h: 960, alt: "A CARS SR99 gumiszervizének műhelye: oszlopos emelő, centírozógép és gumiszerelő gép" },
  { src: "/kerekcsere/2026-09-27-emelo-jaguar.webp", w: 1280, h: 960, alt: "Emelőre állított fehér SUV a gumiszervizben, előtérben a gumiszerelő gép" },
  { src: "/kerekcsere/2026-09-27-emelo-oldalnezet.webp", w: 1280, h: 960, alt: "Mobil oszlopos emelő fehér SUV-val, háttérben a centírozógép" },
  { src: "/kerekcsere/2026-09-27-centirozo-es-szerelogep.webp", w: 1280, h: 960, alt: "Centírozógép és gumiszerelő gép egymás mellett a műhelyben" },
  { src: "/kerekcsere/2026-09-27-centirozogep-muhely.webp", w: 1280, h: 960, alt: "Centírozógép felfogott kerékkel, mellette szerszámkocsi" },
  { src: "/kerekcsere/2026-09-27-centirozogep-teli-gumi.webp", w: 1280, h: 960, alt: "Centírozógép kerékkel a CARS SR99 gumiszervizében" },
  { src: "/kerekcsere/2026-09-27-szerelogep-kerekkel.webp", w: 1280, h: 960, alt: "Gumiszerelő gép felfogott alufelnis kerékkel" },
  { src: "/kerekcsere/2026-09-27-szerelogep-allo.webp", w: 960, h: 1280, alt: "Gumiszerelő gép a műhelyben" },
];

export default function KerekcserePage() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/hero-poster.webp')] bg-cover bg-center bg-no-repeat py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Sötét gradiens overlay réteg elmosás nélkül */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/30 to-[#121212]/60 pointer-events-none" />

      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-8 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-12">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
              Új szolgáltatás
            </p>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
            Kerékcsere és gumiszerviz Zalaegerszeg-Ságod
          </h1>
          <p className="mt-6 leading-7 text-slate-300">
            A CARS SR99 Kft. új beruházású kerék- és gumiszerviz eszközparkkal bővítette szolgáltatásait.
            Várjuk autóját szezonális gumicserére, kiegyensúlyozásra és gumiszervizre – ugyanazon a
            megbízható, ságodi telephelyen, ahol autóját is megvásárolta vagy vásárolná.
          </p>
          <TireServicePhone className="mt-6" />

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
                A szolgáltatás a ságodi telephelyünkön érhető el, ugyanott, ahol autókereskedési
                és autóbeszámítási tevékenységünket is folytatjuk.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Így talál meg minket
            </h2>
            {/* sm felett a két oszlop a képarányokkal (16:9 és 660:885) arányos, így a két kép
                közel egyforma magas, a keret miatti 1-2 px-t a tábla object-cover vágása veszi fel;
                mobilon egymás alatt. */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-[1.778fr_0.746fr]">
              <figure className="overflow-hidden rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5">
                <Image
                  src="/kerekcsere/2026-09-27-telephely-kivulrol.webp"
                  width={1280}
                  height={720}
                  alt="A CARS SR99 Kft. telephelyének épülete a cégtáblával, előtte három parkoló autó"
                  sizes="(max-width: 639px) 100vw, 620px"
                  className="h-auto w-full"
                />
              </figure>
              <figure className="mx-auto w-full max-w-xs overflow-hidden rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 sm:max-w-none">
                <Image
                  src="/kerekcsere/2026-09-27-utbaigazito-tabla.webp"
                  width={660}
                  height={885}
                  alt="A Ságodi Iparterület útbaigazító táblája, rajta a „CARS SR99 KFT – GUMISZERVIZ” felirat"
                  sizes="(max-width: 639px) 320px, 260px"
                  loading="lazy"
                  className="h-auto w-full sm:h-full sm:object-cover"
                />
              </figure>
            </div>
            <p className="mt-4 text-sm leading-6 text-slate-300">
              8900 Zalaegerszeg, Ságod hrsz. 807/15 (Ságodi Iparterület). Az iparterület
              útbaigazító tábláján a „CARS SR99 KFT – GUMISZERVIZ” feliratot keresse.{" "}
              <Link href="/kapcsolat" className="text-sky-300 underline underline-offset-4 hover:text-sky-200">
                Térkép és elérhetőség
              </Link>
            </p>
            <TireServicePhone className="mt-4" />
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              A műhely
            </h2>
            {/* Mobilon 1, sm felett 2 oszlop: a 8 kép 4 teli sort ad, magányos kép nincs. */}
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {workshopPhotos.map((photo) => (
                <figure
                  key={photo.src}
                  className="overflow-hidden rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5"
                >
                  <Image
                    src={photo.src}
                    width={photo.w}
                    height={photo.h}
                    alt={photo.alt}
                    sizes="(max-width: 639px) 100vw, 440px"
                    loading="lazy"
                    className="aspect-[4/3] h-auto w-full object-cover"
                  />
                </figure>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Szolgáltatásaink
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

          <div className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">
              Gyakori kérdések
            </h2>
            <div className="mt-5 space-y-4">
              {faqs.map((item) => (
                <div
                  key={item.q}
                  className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5"
                >
                  <h3 className="font-semibold text-white">{item.q}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-slate-300">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <KerekcsereCTAButtons />
        </div>
      </section>
    </div>
  );
}
