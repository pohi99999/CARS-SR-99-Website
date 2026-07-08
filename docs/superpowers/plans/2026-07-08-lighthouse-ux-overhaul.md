# Lighthouse 100/100 és Prémium UX Overhaul Implementációs Terv

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A CARS SR99 Kft. weboldal Lighthouse pontszámainak 100/100-ra emelése, az LCP csökkentése, és sötét luxury glassmorphism dizájn, sima animációk és Inter betűtípus bevezetése.

**Architecture:** Kliensoldali nem-kritikus scriptek elhalasztása (`strategy="lazyOnload"`), hajtás alatti (below-the-fold) és interaktív modulok dinamikus importálása a kezdeti bundle méretének radikális csökkentésére. Framer Motion `LazyMotion` és `m.section` beépítése a scroll animációkhoz a kézi IntersectionObserver-ek helyett.

**Tech Stack:** Next.js 16 (Turbopack), React 19, TailwindCSS 4, Framer Motion, TypeScript.

---

### Task 1: LCP Optimalizálás és Képkonverzió

**Files:**
- Modify: `app/page.tsx:34-50`

- [ ] **Step 1: Módosítsd az `app/page.tsx` Hero videóját a WebP poster és fetchpriority beállításához**
  Cseréld le a `hero-poster.jpg` fájlt `hero-poster.webp` formátumra a videó posterénél, és adj hozzá `fetchPriority="high"` (React JSX-ben `fetchpriority="high"`) tulajdonságot.

  Kód részlet:
  ```tsx
  <video
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
    poster="/hero-poster.webp"
    fetchPriority="high"
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source
      src="https://videos.pexels.com/video-files/3802518/3802518-hd_1920_1080_25fps.mp4"
      type="video/mp4"
    />
  </video>
  ```

- [ ] **Step 2: Commitold a Task 1-et**
  ```bash
  git add app/page.tsx public/hero-poster.webp
  git commit -m "perf: use WebP hero poster and set fetchpriority high for LCP"
  ```

---

### Task 2: Script optimalizálás

**Files:**
- Modify: `components/TrackingScripts.tsx:42-80`

- [ ] **Step 1: Állítsd át a harmadik féltől származó követőkódokat `lazyOnload` betöltési stratégiára**
  Módosítsd a `components/TrackingScripts.tsx` fájlt, hogy a GA4 és Meta Pixel külső scripteket elhalasztva töltsd be.

  Kód részlet:
  ```tsx
  {gaId ? (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="lazyOnload"
      />
      <Script id="ga4-init" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_path: window.location.pathname,
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  ) : null}

  {pixelId ? (
    <Script id="meta-pixel-init" strategy="lazyOnload">
      {`
        // Meta Pixel init code
      `}
    </Script>
  ) : null}
  ```

- [ ] **Step 2: Commitold a Task 2-t**
  ```bash
  git add components/TrackingScripts.tsx
  git commit -m "perf: defer non-critical tracking scripts using lazyOnload strategy"
  ```

---

### Task 3: Globális Layout & Kliens modulok Dinamikus Importja

**Files:**
- Modify: `app/layout.tsx:1-12, 134-143`

- [ ] **Step 1: Vezesd be a dynamic importokat az `app/layout.tsx`-ben a hajtás alatti és interaktív felugró komponensekre**
  Importáld dinamikusan az `FomoNotification`, `Footer`, `AIChatAssistant`, `CompareDock`, `CookieBanner` komponenseket. A tisztán kliensoldali modult a `{ ssr: false }` beállítással töltsd be.

  Kód részlet:
  ```tsx
  import dynamic from "next/dynamic";

  const Footer = dynamic(() => import("@/components/Footer"));
  const AIChatAssistant = dynamic(() => import("@/components/AIChatAssistant"), { ssr: false });
  const CompareDock = dynamic(() => import("@/components/CompareDock"), { ssr: false });
  const CookieBanner = dynamic(() => import("@/components/CookieBanner"), { ssr: false });
  const FomoNotification = dynamic(() => import("@/components/FomoNotification"), { ssr: false });
  ```

- [ ] **Step 2: Állítsd be az Inter betűtípust globális alapértelmezettnek**
  Frissítsd a `RootLayout` `<body>` elemének osztályait, hogy tartalmazza az `inter.className`-t.

  Kód részlet:
  ```tsx
  <body className={`${inter.className} relative flex min-h-full flex-col bg-background text-foreground`}>
  ```

- [ ] **Step 3: Commitold a Task 3-at**
  ```bash
  git add app/layout.tsx
  git commit -m "perf: implement dynamic imports in layout and apply global Inter font"
  ```

---

### Task 4: Főoldal Szekcióinak Dinamikus Importja

**Files:**
- Modify: `app/page.tsx:1-9, 81-88`

- [ ] **Step 1: Használj dynamic importot az `app/page.tsx` hajtás alatti szakaszaira**
  A `CarFilter`, `AboutSection`, `TrustBadges`, `SocialProofWall` és `Testimonials` komponenseket dinamikusan importáld.

  Kód részlet:
  ```tsx
  import dynamic from "next/dynamic";
  import HeroCTAButtons from "@/components/HeroCTAButtons";
  import InventorySection from "@/components/InventorySection";
  import { fetchInventory } from "@/services/inventoryService";

  const CarFilter = dynamic(() => import("@/components/CarFilter"));
  const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
  const AboutSection = dynamic(() => import("@/components/AboutSection"));
  const SocialProofWall = dynamic(() => import("@/components/SocialProofWall"));
  const Testimonials = dynamic(() => import("@/components/Testimonials"));
  ```

- [ ] **Step 2: Commitold a Task 4-et**
  ```bash
  git add app/page.tsx
  git commit -m "perf: defer main page components with dynamic imports to shrink initial bundle"
  ```

---

### Task 5: Navbar Glassmorphism Tuning

**Files:**
- Modify: `components/Header.tsx:31-37, 98-100`

- [ ] **Step 1: Módosítsd a Navbar scrolled és mobil menü háttérstílusait glassmorphism hatásra**
  A korábbi tömör háttereket cseréld le a premium sötét luxury glassmorphism-re: `backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg`.

  Kód részlet scrolled fejléc:
  ```tsx
  scrolled
    ? "backdrop-blur-md bg-black/40 border-b border-white/10 shadow-lg"
    : "bg-transparent"
  ```

  Kód részlet mobil menü:
  ```tsx
  <nav className="border-t border-white/10 px-6 pb-4 md:hidden sm:px-6 bg-black/60 backdrop-blur-md border-b border-white/10">
  ```

- [ ] **Step 2: Commitold a Task 5-öt**
  ```bash
  git add components/Header.tsx
  git commit -m "style: apply premium sötét glassmorphism to Header navbar and mobile menu"
  ```

---

### Task 6: CarCard Hover Skálázás és Glow

**Files:**
- Modify: `components/CarCard.tsx:23-24`

- [ ] **Step 1: Állítsd át a `CarCard.tsx` cikk konténerét `hover:scale-105` és cyan glow árnyékra**
  Cseréld le a `hover:-translate-y-1` és a régi shadow-t az új skálázásra és `hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]` glow hatásra.

  Kód részlet:
  ```tsx
  <article className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_45px_rgba(2,8,23,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] dark:border-white/10 dark:bg-white/5">
  ```

- [ ] **Step 2: Commitold a Task 6-ot**
  ```bash
  git add components/CarCard.tsx
  git commit -m "style: configure hover:scale-105 scale-up and cyan shadow glow on CarCard"
  ```

---

### Task 7: Framer Motion Scroll Reveals

**Files:**
- Modify: `components/TrustBadges.tsx`
- Modify: `components/AboutSection.tsx`
- Modify: `components/SocialProofWall.tsx`
- Modify: `components/Testimonials.tsx`

- [ ] **Step 1: Cseréld le a `TrustBadges.tsx`-ben az IntersectionObserver-t `LazyMotion` alapú animációra**
  Töröld a hookokat és az `isVisible` state-et. Csomagold a szekciót `LazyMotion`-be és használj `m.section`-t.
  Kód részlet:
  ```tsx
  import { LazyMotion, domAnimation, m } from "framer-motion";
  // ...
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="bg-[#111827] py-12 text-slate-100 border-y border-slate-800/80"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* badges map */}
      </m.section>
    </LazyMotion>
  );
  ```

- [ ] **Step 2: Cseréld le az `AboutSection.tsx`-ben az IntersectionObserver-t `LazyMotion` alapú animációra**
  Kód részlet:
  ```tsx
  import { LazyMotion, domAnimation, m } from "framer-motion";
  // ...
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* content */}
      </m.section>
    </LazyMotion>
  );
  ```

- [ ] **Step 3: Cseréld le a `SocialProofWall.tsx`-ben a statikus sectiont `LazyMotion` alapú animációra**
  Kód részlet:
  ```tsx
  import { LazyMotion, domAnimation, m } from "framer-motion";
  // ...
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* content */}
      </m.section>
    </LazyMotion>
  );
  ```
  Megjegyzés: Adj hozzá `"use client";` direktívát a `SocialProofWall.tsx` elejére.

- [ ] **Step 4: Cseréld le a `Testimonials.tsx`-ben az IntersectionObserver-t `LazyMotion` alapú animációra**
  Kód részlet:
  ```tsx
  import { LazyMotion, domAnimation, m } from "framer-motion";
  // ...
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* content */}
      </m.section>
    </LazyMotion>
  );
  ```

- [ ] **Step 5: Commitold a Task 7-et**
  ```bash
  git add components/TrustBadges.tsx components/AboutSection.tsx components/SocialProofWall.tsx components/Testimonials.tsx
  git commit -m "perf: unify scroll animations to Framer Motion LazyMotion fade-in-up"
  ```

---

### Task 8: Naplózás, Minőségellenőrzés és Git Push

**Files:**
- Modify: `AGENT.md`
- Modify: `status.log`

- [ ] **Step 1: Frissítsd a naplófájlokat**
  - Adj hozzá a `11. Fázis: Lighthouse 100/100 optimalizáció és prémium UX (Glassmorphism, WebP, Dynamic Imports) | Kész.` sort az `AGENT.md`-hez.
  - Helyezz el egy rendszerállapot bejegyzést a `status.log`-ba: `[DÁTUM] - Rendszerállapot: Teljesítmény és vizuális overhaul befejezve.`

- [ ] **Step 2: Futtasd le a lint parancsot**
  Futtasd az `npm run lint` parancsot a hibák elkerüléséhez.

- [ ] **Step 3: Commitold a naplózást**
  ```bash
  git add AGENT.md status.log
  git commit -m "docs: log performance and UX overhaul achievements"
  ```

- [ ] **Step 4: Git Push és befejezés**
  Pushold a változtatásokat a repóba: `git push origin main`
