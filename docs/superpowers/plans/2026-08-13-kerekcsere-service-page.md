# Kerékcsere / Gumicsere Szolgáltatás Oldal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Új `/kerekcsere` aloldal létrehozása a CARS SR99 Kft. weboldalán, amely bemutatja az új kerékcsere/gumicsere szolgáltatást "Hamarosan indul" jelzéssel, teljes SEO-integrációval (menü, lábléc, sitemap, JSON-LD, kulcsszavak, főoldali teaser).

**Architecture:** Az `app/autoberles/page.tsx` meglévő szerkezetét klónozzuk 1:1 (ugyanazok a Tailwind osztályok, glass-card layout, Service JSON-LD minta), új tartalommal. A meglévő navigációs, lábléc- és sitemap-tömbökbe egy-egy sort adunk hozzá. Egy új `TireChangeTeaser.tsx` komponens a `CarRentalTeaser.tsx` mintáját követi és a főoldalra kerül.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, TailwindCSS 4, lucide-react ikonok, framer-motion (`LazyMotion`/`m.section`) a teaser animációhoz.

## Global Constraints

- Design forrás: `docs/superpowers/specs/2026-08-13-kerekcsere-service-page-design.md` — minden feladat ennek felel meg.
- A projektben **nincs automatizált teszt-keretrendszer** (nincs `npm test`, nincs Vitest/Jest konfiguráció ehhez a Next.js oldalhoz — csak `npm run build` és `npm run lint`). Ezért minden feladat "teszt" lépése: `npm run build` sikeres lefutása (TypeScript típusellenőrzés + Next build hibák nélkül) és vizuális ellenőrzés `npm run dev` futtatásával a böngészőben. Ez helyettesíti a szokásos TDD ciklust ebben a repóban.
- Szín/stílus konvenció: `bg-[#121212]` alap, `sky-400`/`sky-500` accent (NEM indigo/cyan), `backdrop-blur-lg bg-black/40` glass kártyák, `.btn-shimmer` a CTA gombokon (definiálva: `app/globals.css:109-129`, semmilyen módosítás nem szükséges rajta).
- `siteUrl` minta minden oldalon: `const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";`
- A szolgáltatás **még nem él** (engedélyeztetés ~1 hét). Az oldal szövegezése sehol nem sugallhat azonnali foglalhatóságot ("Időpontkérés", "Foglaljon most" TILOS). Helyette: "Érdeklődöm / Értesítést kérek".
- Cégadatok (AutoDealer JSON-LD provider blokk) pontosan az `app/autoberles/page.tsx:41-52`-ben látható adatokkal egyezzenek meg (telefonszám, cím).

---

### Task 1: Header navigáció bővítése

**Files:**
- Modify: `components/Header.tsx:9-15`

**Interfaces:**
- Consumes: semmi új
- Produces: `/kerekcsere` route mostantól elérhető a desktop és mobil menüből is (mindkettő ugyanazt a `navItems` tömböt olvassa)

- [ ] **Step 1: Módosítsd a `navItems` tömböt**

`components/Header.tsx:9-15` jelenlegi tartalma:

```tsx
const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/kinalat", label: "Kínálatunk" },
  { href: "/autobeszamitas", label: "Autóbeszámítás" },
  { href: "/autoberles", label: "Autóbérlés" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];
```

Cseréld erre (a "Kerékcsere" elem az "Autóbérlés" és a "Kapcsolat" közé kerül):

```tsx
const navItems = [
  { href: "/", label: "Főoldal" },
  { href: "/kinalat", label: "Kínálatunk" },
  { href: "/autobeszamitas", label: "Autóbeszámítás" },
  { href: "/autoberles", label: "Autóbérlés" },
  { href: "/kerekcsere", label: "Kerékcsere" },
  { href: "/kapcsolat", label: "Kapcsolat" },
];
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build, nincs TypeScript/lint hiba. (Az oldal maga még nem létezik, de a Header önmagában attól még helyesen buildel — a linkek csak 404-et adnának, amíg a Task 5 el nem készül. Ha a build ezen a ponton külön ellenőrizhető, rendben; ha nem, folytasd, és a végső `npm run build` a Task 8-ban úgyis lefedi.)

- [ ] **Step 3: Commit**

```bash
git add components/Header.tsx
git commit -m "feat: add Kerékcsere nav item to header menu"
```

---

### Task 2: Lábléc "Gyors linkek" bővítése

**Files:**
- Modify: `components/Footer.tsx:74-78`

**Interfaces:**
- Consumes: semmi új
- Produces: `/kerekcsere` link elérhető a lábléc "Gyors linkek" listájában is

- [ ] **Step 1: Adj hozzá egy új `<li>` elemet**

`components/Footer.tsx:74-78` jelenlegi tartalma (az "Autóbérlés" link után, "Kapcsolat" előtt):

```tsx
            <li>
              <Link href="/autoberles" className="transition-colors duration-200 hover:text-sky-400">
                Autóbérlés
              </Link>
            </li>
            <li>
              <Link href="/kapcsolat" className="transition-colors duration-200 hover:text-sky-400">
                Kapcsolat
              </Link>
            </li>
```

Cseréld erre:

```tsx
            <li>
              <Link href="/autoberles" className="transition-colors duration-200 hover:text-sky-400">
                Autóbérlés
              </Link>
            </li>
            <li>
              <Link href="/kerekcsere" className="transition-colors duration-200 hover:text-sky-400">
                Kerékcsere
              </Link>
            </li>
            <li>
              <Link href="/kapcsolat" className="transition-colors duration-200 hover:text-sky-400">
                Kapcsolat
              </Link>
            </li>
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add Kerékcsere link to footer quick links"
```

---

### Task 3: Sitemap bejegyzés hozzáadása

**Files:**
- Modify: `app/sitemap.ts:35-40`

**Interfaces:**
- Consumes: semmi új
- Produces: `${siteUrl}/kerekcsere` szerepel a generált `sitemap.xml`-ben, `priority: 0.8`, `changeFrequency: "weekly"`

- [ ] **Step 1: Adj hozzá egy új route objektumot a `staticRoutes` tömbben**

`app/sitemap.ts:35-40` jelenlegi tartalma (az `/autoberles` bejegyzés után, `/osszehasonlitas` előtt):

```ts
    {
      url: `${siteUrl}/autoberles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/osszehasonlitas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
```

Cseréld erre:

```ts
    {
      url: `${siteUrl}/autoberles`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/kerekcsere`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/osszehasonlitas`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build.

- [ ] **Step 3: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add /kerekcsere route to sitemap"
```

---

### Task 4: Root layout SEO kulcsszavak bővítése

**Files:**
- Modify: `app/layout.tsx:40-47`

**Interfaces:**
- Consumes: semmi új
- Produces: a globális `metadata.keywords` tömb tartalmazza a "kerékcsere Zalaegerszeg", "gumicsere Zalaegerszeg", "gumiszerviz Zalaegerszeg" kulcsszavakat

- [ ] **Step 1: Bővítsd a `keywords` tömböt**

`app/layout.tsx:40-47` jelenlegi tartalma:

```tsx
  keywords: [
    "autókereskedés Zalaegerszeg",
    "használt autó Zalaegerszeg",
    "CARS SR99",
    "autó lízing",
    "autóbeszámítás Zalaegerszeg",
    "prémium autók",
  ],
```

Cseréld erre:

```tsx
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
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build.

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: extend global SEO keywords with kerékcsere/gumicsere terms"
```

---

### Task 5: `/kerekcsere` oldal létrehozása

Ez a terv fő eleme — az `app/autoberles/page.tsx` szerkezetét és stílusát követi, "Hamarosan indul" jelzéssel.

**Files:**
- Create: `app/kerekcsere/page.tsx`

**Interfaces:**
- Consumes: `lucide-react` ikonok (`RefreshCw`, `Gauge`, `Wrench`, `Warehouse`, `CalendarClock`, `CheckCircle2`, `Clock`) — mind léteznek a telepített `lucide-react` csomagban (ellenőrizve).
- Produces: `/kerekcsere` route, `export const metadata: Metadata`, default export `KerekcserePage` — semmilyen más fájl nem importálja ezt közvetlenül (Next.js file-based routing).

- [ ] **Step 1: Hozd létre a fájlt a következő teljes tartalommal**

```tsx
import type { Metadata } from "next";
import Link from "next/link";
import { RefreshCw, Gauge, Wrench, Warehouse, CalendarClock, CheckCircle2, Clock } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Kerékcsere és Gumicsere Zalaegerszeg | CARS SR99 Kft.",
  description:
    "Hamarosan induló kerékcsere és gumicsere szolgáltatásunk Zalaegerszegen: szezonális gumicsere, kiegyensúlyozás, defektjavítás és gumihotel a CARS SR99 Kft. ságodi telephelyén.",
  alternates: {
    canonical: `${siteUrl}/kerekcsere`,
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

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/kapcsolat"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-300 ease-in-out hover:bg-sky-400 hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] btn-shimmer hover:scale-[1.02] active:scale-[0.98]"
            >
              Érdeklődöm / Értesítést kérek →
            </Link>
            <a
              href="tel:+36709070669"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-sky-400 px-7 py-3.5 text-sm font-semibold text-sky-400 transition-all duration-300 ease-in-out hover:bg-sky-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] btn-shimmer hover:scale-[1.02] active:scale-[0.98]"
            >
              Hívjon minket: +36 70 907-0669
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build, nincs TypeScript hiba.

Run: `npm run dev` (majd nyisd meg böngészőben: `http://localhost:3000/kerekcsere`)
Expected: az oldal betöltődik, a "Hamarosan indul" badge látható a hero szekcióban, a 4 szolgáltatáskártya és a 3 lépéses folyamat helyesen jelenik meg, a két CTA gomb (`/kapcsolat` link és `tel:` link) működik, mobil nézetben (DevTools responsive mód) a grid egy oszlopra vált.

- [ ] **Step 3: Commit**

```bash
git add app/kerekcsere/page.tsx
git commit -m "feat: add /kerekcsere service page with coming-soon messaging and Service schema"
```

---

### Task 6: Főoldali teaser komponens létrehozása

**Files:**
- Create: `components/TireChangeTeaser.tsx`

**Interfaces:**
- Consumes: `lucide-react` (`Wrench`, `Clock`), `framer-motion` (`LazyMotion`, `domAnimation`, `m`) — mindkettő már használt függőség a projektben (lásd `components/CarRentalTeaser.tsx`)
- Produces: default export `TireChangeTeaser` React komponens, paraméter nélkül hívható, `/kerekcsere`-re mutató linkkel

- [ ] **Step 1: Hozd létre a fájlt a következő teljes tartalommal**

```tsx
"use client";

import Link from "next/link";
import { Wrench, Clock } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function TireChangeTeaser() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="bg-[#111827] py-12 text-slate-100 border-y border-slate-800/80"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Kerékcsere és gumicsere</h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
                  <Clock className="h-3 w-3" />
                  Hamarosan
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Új szolgáltatásunk hamarosan indul: szezonális gumicsere, kiegyensúlyozás és gumiszerviz
                a ságodi telephelyen.
              </p>
            </div>
          </div>
          <Link
            href="/kerekcsere"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full border-2 border-sky-400 px-6 py-3 text-sm font-semibold text-sky-400 transition-all duration-300 ease-in-out hover:bg-sky-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] btn-shimmer hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Kerékcsere részletei →
          </Link>
        </div>
      </m.section>
    </LazyMotion>
  );
}
```

- [ ] **Step 2: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build. (A komponens még nincs importálva sehol, ezért vizuálisan a Task 7 után ellenőrizhető, de a TypeScript build-nek magában is hibamentesnek kell lennie.)

- [ ] **Step 3: Commit**

```bash
git add components/TireChangeTeaser.tsx
git commit -m "feat: add TireChangeTeaser component"
```

---

### Task 7: Teaser bekötése a főoldalba

**Files:**
- Modify: `app/page.tsx:1-13` (import blokk)
- Modify: `app/page.tsx:130-137` (JSX render blokk)

**Interfaces:**
- Consumes: `components/TireChangeTeaser.tsx` (Task 6-ból, default export, props nélkül)
- Produces: a `TireChangeTeaser` szekció megjelenik a főoldalon, a `CarRentalTeaser` után

- [ ] **Step 1: Bővítsd a dinamikus import blokkot**

`app/page.tsx:8-13` jelenlegi tartalma:

```tsx
const CarFilter = dynamic(() => import("@/components/CarFilter"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const CarRentalTeaser = dynamic(() => import("@/components/CarRentalTeaser"));
const SocialProofWall = dynamic(() => import("@/components/SocialProofWall"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
```

Cseréld erre:

```tsx
const CarFilter = dynamic(() => import("@/components/CarFilter"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const CarRentalTeaser = dynamic(() => import("@/components/CarRentalTeaser"));
const TireChangeTeaser = dynamic(() => import("@/components/TireChangeTeaser"));
const SocialProofWall = dynamic(() => import("@/components/SocialProofWall"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
```

- [ ] **Step 2: Illeszd be a komponenst a JSX-be**

`app/page.tsx:130-137` jelenlegi tartalma:

```tsx
      <CarFilter initialMarka={selectedMarka} initialUzemanyag={selectedUzemanyag} initialMaxPrice={maxPriceParam} />
      <InventorySection cars={filteredCars} />
      <TrustBadges />
      <CarRentalTeaser />
      <AboutSection />
      <SocialProofWall />
      <Testimonials />
    </>
  );
}
```

Cseréld erre:

```tsx
      <CarFilter initialMarka={selectedMarka} initialUzemanyag={selectedUzemanyag} initialMaxPrice={maxPriceParam} />
      <InventorySection cars={filteredCars} />
      <TrustBadges />
      <CarRentalTeaser />
      <TireChangeTeaser />
      <AboutSection />
      <SocialProofWall />
      <Testimonials />
    </>
  );
}
```

- [ ] **Step 3: Ellenőrzés**

Run: `npm run build`
Expected: sikeres build.

Run: `npm run dev` (majd nyisd meg böngészőben: `http://localhost:3000/`)
Expected: a főoldalon, közvetlenül az "Autóbérlés" teaser sáv alatt megjelenik az új "Kerékcsere és gumicsere" teaser sáv, "Hamarosan" jelzéssel, a "Kerékcsere részletei →" gomb a `/kerekcsere` oldalra navigál.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire TireChangeTeaser into homepage"
```

---

### Task 8: Végső build-ellenőrzés, push és deploy figyelése

**Files:**
- Nincs fájlmódosítás — csak parancsok.

**Interfaces:**
- Consumes: Task 1-7 összes commitja
- Produces: a `main` ágra push-olt, Vercel által automatikusan deployolt élő oldal

- [ ] **Step 1: Teljes build és lint futtatása a legfrissebb állapoton**

Run: `npm run build && npm run lint`
Expected: mindkettő hibamentesen lefut.

- [ ] **Step 2: Git log ellenőrzése — minden commit megvan-e**

Run: `git log --oneline -8`
Expected: a Task 1-7 commitjai sorban szerepelnek, a working tree tiszta (`git status` nem mutat staged/unstaged változást).

- [ ] **Step 3: Push a main ágra**

```bash
git push origin main
```

Expected: sikeres push, Vercel automatikusan elindítja a deployt (a felhasználó ezt korábban jelezte, hogy elvárja).

- [ ] **Step 4: Élő oldal ellenőrzése böngészőben deploy után**

Ez már nem kódfeladat, hanem manuális/böngészős lépés (a plan végrehajtója, vagy a fő agent végzi közvetlenül böngésző-eszközökkel a deploy lezárulta után):
1. Nyisd meg az élő `/kerekcsere` oldalt, ellenőrizd a megjelenést és a "Hamarosan" jelzést.
2. Ellenőrizd a menüben és láblécben az új linket.
3. Google Search Console: friss sitemap beküldése, majd az új `/kerekcsere` URL indexelésének kérése.
4. Google Cégprofil: ellenőrizd, hogy szerepel-e a "Kerékcsere"/"Gumiszerviz" szolgáltatás; ha nem, add hozzá.

(Ez a lépés a design spec 5. szakaszának felel meg — nem igényel kódot, ezért nincs hozzá checkbox-os kód-lépés, de a végrehajtást a plan lezárása előtt el kell végezni.)

---

## Self-Review Summary

- **Spec lefedettség:** design spec 2. szakasz (oldal tartalom) → Task 5; 3. szakasz (SEO/schema) → Task 4 + Task 5 (metadata, JSON-LD); 4. szakasz (integráció) → Task 1, 2, 3, 6, 7; 5. szakasz (deploy utáni ellenőrzés) → Task 8. A 6. szakasz (jövőbeli "élesítés" a hamarosan-szöveg eltávolításával) explicit módon **nem** része ennek a tervnek, ahogy a spec is jelzi — külön, jövőbeli feladat lesz.
- **Placeholder-ellenőrzés:** nincs TBD/TODO, minden kódblokk teljes, másolható tartalom.
- **Típus-konzisztencia:** `KerekcserePage` és `TireChangeTeaser` elnevezések következetesek a Task 5-7 között; a `services`/`steps` tömbök mezőnevei (`icon`, `title`, `description`) megegyeznek az `autoberles/page.tsx` mintájával.
