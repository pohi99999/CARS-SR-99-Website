# Design Spec: Kerékcsere / Gumicsere Szolgáltatás Oldal

## 1. Cél

A CARS SR99 Kft. új tevékenységet indít: kerékcsere / gumicsere / gumiszerviz szolgáltatás (saját beruházású gép- és eszközparkkal). Ezt a meglévő weboldalba építjük be új aloldalként (`/kerekcsere`), a jelenlegi dizájnrendszert és kódkonvenciókat követve — **nem** külön weboldal.

Kiemelt cél: a Google keresőben a "kerékcsere Zalaegerszeg" / "gumicsere Zalaegerszeg" / "gumiszerviz Zalaegerszeg" típusú keresésekre a CARS SR99 Kft. is megjelenjen, mivel a térségben kevés ilyen szolgáltató van.

**Fontos kontextus:** a szolgáltatás engedélyeztetése kb. 1 hét múlva zárul le, ezért az oldal most **"Hamarosan indul"** jelzéssel megy élesre — nem élő, azonnal foglalható szolgáltatásként. Cél, hogy a Google már most elkezdje indexelni/rangsorolni az oldalt, majd kb. egy hét múlva csak a szöveg frissül élesre (a badge eltávolításával), új indexelési várakozás nélkül.

## 2. Oldal tartalom (`app/kerekcsere/page.tsx`)

Az `app/autoberles/page.tsx` szerkezetét követi 1:1 (glass card hero, step-grid, CTA sáv, ugyanazok a Tailwind osztályok: `bg-[#121212]`, `sky-400/500` accent, `backdrop-blur-lg bg-black/40` kártyák, `.btn-shimmer` gombok).

- **Hero:** cím *"Kerékcsere és Gumicsere Zalaegerszegen"*, alcím a beruházott géppark említésével. Jól látható, de visszafogott **"Hamarosan indul"** badge/felirat a hero szekcióban — konkrét dátum nélkül.
- **Szolgáltatáslista** (kártyás grid, "hamarosan elérhető" jelleggel bemutatva, nem "foglaljon most" hangnemben):
  1. Szezonális gumicsere (nyári/téli)
  2. Kiegyensúlyozás
  3. Defektjavítás / gumiszerviz
  4. Gumihotel (szezonális tárolás)
- **"Hogyan fog működni?"** 3 lépéses folyamat blokk (az autóbérlés oldal step-grid mintája alapján).
- **Bizalmi elem:** rövid sáv a modern géppark / tapasztalt szerelők / gyors kiszolgálás üzenetekkel (TrustBadges-szerű, de nem szükséges önálló komponens, beépíthető inline blokk).
- **CTA sáv:** *"Érdeklődöm / Értesítést kérek"* gomb → `/kapcsolat`, plusz telefonszám gomb (`tel:` link) kérdések esetére. Nincs "Időpontkérés" vagy foglalás jellegű szöveg, mivel a szolgáltatás még nem él.
- Nincs dedikált űrlap ezen az oldalon (CTA-k a meglévő `/kapcsolat` oldalra mutatnak).

## 3. SEO & Schema

- `metadata.title`: *"Kerékcsere és Gumicsere Zalaegerszeg | CARS SR99 Kft."*
- `metadata.description`: természetes megfogalmazásban tartalmazza a "kerékcsere Zalaegerszeg", "gumicsere Zalaegerszeg", "gumiszerviz" kulcsszavakat, és jelzi, hogy a szolgáltatás hamarosan indul.
- `alternates.canonical`: `${siteUrl}/kerekcsere`
- Oldal-szintű **Service JSON-LD** (az autóbérlés oldal mintája szerint): `serviceType: "Kerékcsere és gumicsere"`, `provider`: ugyanaz az `AutoDealer` entitás mint a globális schema, `areaServed`: Zalaegerszeg és környéke. Nincs konkrét ár vagy azonnali elérhetőség feltüntetve a schema-ban.
- A root layout (`app/layout.tsx`) globális `keywords` mezője bővül a kerékcsere/gumicsere kulcsszavakkal, hogy a fő céges schema is jelezze ezt a tevékenységet.

## 4. Integráció a meglévő oldalba

- `components/Header.tsx`: új `{ href: "/kerekcsere", label: "Kerékcsere" }` elem a `navItems` tömbben (ez vezérli mind a desktop, mind a mobil menüt).
- `components/Footer.tsx`: új link a "Gyors linkek" listában.
- `app/sitemap.ts`: új route bejegyzés (`priority: 0.8`, `changeFrequency: "weekly"`).
- **Főoldali teaser:** `components/TireChangeTeaser.tsx`, a meglévő `components/CarRentalTeaser.tsx` mintájára, ugyanazzal a "Hamarosan indul" jelzéssel. Beillesztve az `app/page.tsx`-be, a `TrustBadges` / `CarRentalTeaser` után, dinamikus importtal.

## 5. Deploy utáni ellenőrzés (böngészőben)

1. Commit + push a `main` ágra → Vercel automatikus deploy.
2. Élő oldal ellenőrzése böngészőben (megjelenés, linkek, mobil nézet, "Hamarosan" jelzés láthatósága).
3. **Google Search Console:** friss sitemap beküldése, majd az új `/kerekcsere` URL indexelésének kérése ("Request Indexing" / "Indexelés kérése").
4. **Google Cégprofil (Google Business Profile):** ellenőrzés, hogy szerepel-e szolgáltatásként a "Kerékcsere"/"Gumiszerviz" kategória vagy szolgáltatás-elem; ha nincs, hozzáadás, hogy a cégprofil összhangban legyen az oldal tartalmával.

## 6. Later follow-up (nem része ennek a munkának)

Kb. egy hét múlva, az engedélyek megérkezése után: a "Hamarosan indul" badge és a hozzá kapcsolódó szövegezés (hero, szolgáltatáslista bevezető, CTA gombszövegek, teaser) frissítése élő, foglalható szolgáltatásra. Ez egy különálló, gyors szövegfrissítő feladat lesz, nem igényel új oldalstruktúrát.
