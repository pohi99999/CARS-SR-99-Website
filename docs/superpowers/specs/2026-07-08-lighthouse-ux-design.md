# CARS SR99 Kft. – Lighthouse 100/100 és Prémium UX Overhaul Design Specifikáció

**Dátum:** 2026-07-08  
**Téma:** Teljesítmény-optimalizálás és vizuális minőségjavítás (Glassmorphism, WebP, Dynamic Imports, Framer Motion)

---

## 1. LCP & Hálózati Optimalizálás

A Hero szekcióban található nagyméretű médiaelemek töltik be a Largest Contentful Paint (LCP) szerepét. Ezt a következőképpen optimalizáljuk:

### A. WebP Képkonverzió
- A `public/hero-poster.jpg` fallback képet átkonvertáltuk modern WebP formátumba (`public/hero-poster.webp`), ami a fájlméretet **36.9 KB-ról 5.5 KB-ra csökkentette (kb. 85%-os megtakarítás)**.
- A kódban (elsősorban az [app/page.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/app/page.tsx) fájlban) az összes hivatkozást átirányítjuk az új `.webp` képre.

### B. LCP Prioritás a Videónál
- A Hero videó (`<video>`) elemhez hozzáadjuk a `fetchPriority="high"` (illetve react specifikusan `fetchpriority="high"`) attribútumot, hogy a böngésző a kezdeti renderelésnél kiemelten kezelje a videó poster képének letöltését.

### C. Script Betöltési Stratégiák
- A [components/TrackingScripts.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/components/TrackingScripts.tsx) fájlban a Google Analytics 4 és a Meta Pixel külső scriptek betöltéséhez a Next.js `<Script>` komponensének `strategy="lazyOnload"` attribútumát fogjuk használni a `afterInteractive` helyett. Ez megszünteti a kezdeti JavaScript blokkolást a fő szálon.

---

## 2. JavaScript & Main Thread (Dynamic Imports)

Az initial bundle méretének és a hidratációs idő csökkentése érdekében dinamikus importokat (`dynamic(() => import(...))`) alkalmazunk a nem kritikus és a hajtás alatti (below-the-fold) komponensekre:

### A. Globális Layout Komponensek
Az [app/layout.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/app/layout.tsx) fájlban dinamikusan töltjük be a következőket, szerveroldali renderelés (SSR) nélkül (`{ ssr: false }`), mivel ezek tisztán interaktív, kliensoldali felugrók/elemek:
- `AIChatAssistant`
- `CompareDock`
- `CookieBanner`
- `FomoNotification`
- `Footer` (ez sima dynamic importként tölthető be, hogy a hajtás alatt töltődjön be)

### B. Főoldali Szekciók
Az [app/page.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/app/page.tsx) fájlban a hajtás alatti szakaszokat dinamikusan importáljuk:
- `AboutSection`
- `TrustBadges`
- `SocialProofWall`
- `Testimonials`

---

## 3. Prémium Vizuális Tuning (Glassmorphism & Animációk)

### A. Navbar Glassmorphism
- A [components/Header.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/components/Header.tsx) sticky fejlécében a görgetett (`scrolled`) állapot stílusát lecseréljük a következőre:  
  `backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg`
- A mobil navigáció hátterét szintén glassmorphism stílusúra szabjuk.

### B. Autó Kártyák Glow és Skálázás
- A [components/CarCard.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/components/CarCard.tsx) kártyáján a hover effekteket áthangoljuk:
  - Alkalmazzuk a `hover:scale-105 transition-all duration-300` skálázást a korábbi `hover:-translate-y-1` helyett.
  - Bevezetünk egy luxusérzetet nyújtó cyan glow árnyékot: `hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]`.

### C. Framer Motion Scroll Revelations
- Az egyedi, manuális `IntersectionObserver` megvalósításokat (amik a `TrustBadges.tsx`, `AboutSection.tsx` és `Testimonials.tsx` fájlokban vannak) lecseréljük az `InventorySection.tsx`-ben már bevált `LazyMotion` mintára.
- A szekciók beúszásának paraméterei:
  - `initial={{ opacity: 0, y: 20 }}`
  - `whileInView={{ opacity: 1, y: 0 }}`
  - `viewport={{ once: true, margin: "-100px" }}`
  - `transition={{ duration: 0.6, ease: "easeOut" }}`

---

## 4. Tipográfia (Inter Font)

- Az [app/layout.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/app/layout.tsx) fájlban a Google-féle `Inter` betűtípust a `className={inter.className}` tulajdonsággal közvetlenül a `<body>` elemre vezetjük rá globálisként.
- A `Montserrat` betűtípust megtartjuk a címsorokhoz a [app/globals.css](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/app/globals.css) fájlon keresztül.

---

## 5. Rendszerintegráció, Ellenőrzés és Git Log

- **AGENT.md:** Frissítés a `11. Fázis: Lighthouse 100/100 optimalizáció és prémium UX (Glassmorphism, WebP, Dynamic Imports) | Kész.` sorral.
- **status.log:** `[2026-07-08] - Rendszerállapot: Teljesítmény és vizuális overhaul befejezve.`
- **Git Commit:** `git add . && git commit -m "perf: Optimize LCP, implement glassmorphism, and boost UX"`
- **Git Push:** `git push origin main`
- **Lint ellenőrzés:** `npm run lint` futtatása lokálisan a sikeres build garantálása érdekében.
