# Premium Automotive Aesthetics Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Weboldal prémium autós esztétikai szintlépése tipográfiai, glassmorphism szegély-gradiens, shimmer CTA gomb animáció és hero gradiens overlay frissítésekkel, valamint a színvilág Electric Blue-ra való hangolásával.

**Architecture:** A globális CSS-ben (`globals.css`) definiáljuk a címsorok tracking-jét, a Cross-Document View Transitions beállítást, a shimmer gomb effekteket. A komponensekben (`page.tsx`, `CarCard.tsx`, `CarFilter.tsx`, `Header.tsx` stb.) manuálisan elvégezzük az esztétikai, szegély és szín-átmeneti módosításokat.

**Tech Stack:** Next.js 16 (Turbopack), TailwindCSS 4, React 19, Framer Motion.

---

### Task 1: Globális CSS Tuning
**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Globális címsor letter-spacing, shimmer effekt és view transitions hozzáadása**
  Módosítsd a `app/globals.css` fájlt:
  - Adj hozzá `letter-spacing: -0.02em;` beállítást a `h1, h2` szelektorhoz.
  - Definiáld a `.btn-shimmer` gomb osztályt és a `@keyframes shimmer` animációt.
  - Definiáld a `@view-transition { navigation: auto; }` cross-document transitions beállítást.
  - Definiáld a gombok hover Electric Blue izzását és skálázási transition osztályait, ha szükséges.

  Kód részlet a `app/globals.css` végéhez:
  ```css
  /* h1, h2 tracking-tight */
  h1,
  h2 {
    letter-spacing: -0.02em;
  }

  /* Natív Cross-Document View Transitions */
  @view-transition {
    navigation: auto;
  }

  /* Premium Shimmer CTA Gomb */
  .btn-shimmer {
    position: relative;
    overflow: hidden;
  }

  .btn-shimmer::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -60%;
    width: 30%;
    height: 200%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shimmer 6s infinite ease-in-out;
  }

  @keyframes shimmer {
    0% {
      left: -60%;
    }
    30% {
      left: 140%;
    }
    100% {
      left: 140%;
    }
  }
  ```

- [ ] **Step 2: Commit**
  ```bash
  git add app/globals.css
  git commit -m "style: add global h1/h2 tracking, shimmer animations, and view transitions"
  ```

---

### Task 2: Hero szekció & Gradiens Overlay
**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Hero videó overlay és H1 méretezés módosítása**
  Nyisd meg a `app/page.tsx` fájlt és hajtsd végre a módosításokat:
  - Cseréld ki a `bg-black/60` overlay-t `bg-gradient-to-b from-black/80 via-black/30 to-black/90`-re a Hero videó felett.
  - A `h1` méretét és sorközét frissítsd asztali nézetben: `text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl` -> `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-slate-100`.
  - Alcím "CARS SR99 Kft." styling: `text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400` -> `text-sm font-extralight uppercase tracking-[0.25em] text-sky-400`.
  - A statisztikai sávban lévő `text-cyan-400` színeket cseréld le `text-sky-400`-re.
  - A statisztikai sáv feliratait finomítsd (pl. `text-slate-400` -> `font-light tracking-wide text-slate-400`).

- [ ] **Step 2: Commit**
  ```bash
  git add app/page.tsx
  git commit -m "design: update hero gradient overlay, h1 sizing and typography contrast"
  ```

---

### Task 3: CTA gombok Shimmer effekt
**Files:**
- Modify: `components/HeroCTAButtons.tsx`

- [ ] **Step 1: Shimmer effekt és Electric Blue színek integrálása a fő gombokra**
  Nyisd meg a `components/HeroCTAButtons.tsx` fájlt:
  - Cseréld ki a `bg-cyan-400`, `text-[#2B2B2B]`, `shadow-[0_0_24px_rgba(34,211,238,0.35)]`, `hover:bg-cyan-300`, `hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]` osztályokat az alábbiakra:
    - Primary CTA: `bg-sky-500 text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:bg-sky-400 hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] btn-shimmer hover:scale-[1.02] active:scale-[0.98] transition-all`
  - Cseréld ki a secondary CTA gombot: `border-cyan-400 text-cyan-400 hover:bg-cyan-400/10` -> `border-sky-400 text-sky-400 hover:bg-sky-400/10 btn-shimmer hover:scale-[1.02] active:scale-[0.98] transition-all hover:shadow-[0_0_20px_rgba(56,189,248,0.2)]`.

- [ ] **Step 2: Commit**
  ```bash
  git add components/HeroCTAButtons.tsx
  git commit -m "design: apply shimmer and scale-up micro-interactions to Hero CTA buttons"
  ```

---

### Task 4: Járműkártya (CarCard) Tuning
**Files:**
- Modify: `components/CarCard.tsx`

- [ ] **Step 1: Kártya szegélyek, belső árnyék és kép-zoom beállítása**
  Nyisd meg a `components/CarCard.tsx` fájlt:
  - Cseréld le az `article` kártya szegély- és háttér- és árnyék osztályait:
    `border border-white/10 bg-black/40 shadow-[0_20px_45px_rgba(2,8,23,0.45)] backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-cyan-400/40 hover:shadow-[0_0_15px_rgba(34,211,238,0.5)]`
    ->
    `border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg transition-all duration-300 hover:scale-[1.03] hover:border-sky-500/40 hover:shadow-[0_24px_55px_rgba(56,189,248,0.25)]`
  - A kártya képén a transition-t módosítsd prémium zoomra:
    `transition duration-500 hover:scale-105` -> `transition-transform duration-700 ease-out hover:scale-110`.
  - Cseréld ki az összes `cyan-400` / `cyan-300` színt a kártya belsejében (pl. ikonok, vételár, kártya címke border) a prémium `sky-400` és `sky-300` / `sky-500` színekre.
  - A részletek gombra tegyél shimmer effektet és prémium hover transzformációkat: `bg-cyan-400 hover:bg-cyan-300` -> `bg-sky-500 hover:bg-sky-400 btn-shimmer hover:scale-[1.02] active:scale-[0.98] transition-all text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]`.
  - A Compare/Mérleg gombot is frissítsd: `hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300` -> `hover:border-sky-400 hover:bg-sky-400/10 hover:text-sky-300`.

- [ ] **Step 2: Commit**
  ```bash
  git add components/CarCard.tsx
  git commit -m "design: update CarCard with diamond-cut borders, blur-lg, white glow, and slow-zoom image"
  ```

---

### Task 5: Kínálati szűrő tuning
**Files:**
- Modify: `components/CarFilter.tsx`

- [ ] **Step 1: Kínálati szűrő üveghatása és színvilága**
  Nyisd meg a `components/CarFilter.tsx` fájlt:
  - Cseréld ki a konténer osztályait:
    `rounded-2xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur-md`
    ->
    `rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-4 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg sm:p-6`
  - Cseréld ki az összes `cyan-400` / `cyan-300` elemet (szövegek, range slider accent) `sky-400` / `sky-300` színekre.
  - A hangalapú mikrofon gomb színeit is frissítsd: `border-cyan-400 bg-cyan-400/20 text-cyan-300` -> `border-sky-400 bg-sky-400/20 text-sky-300`, valamint `hover:border-cyan-400 hover:text-cyan-300` -> `hover:border-sky-400 hover:text-sky-300`.
  - A form inputok focus-ját frissítsd: `focus:border-cyan-400 focus:ring-cyan-400/30` -> `focus:border-sky-400 focus:ring-sky-400/30`.
  - A szűrő címkéit tedd vékonyabbá: `text-xs font-semibold uppercase tracking-wider` -> `text-xs font-light uppercase tracking-widest`.

- [ ] **Step 2: Commit**
  ```bash
  git add components/CarFilter.tsx
  git commit -m "design: refine CarFilter wrapper style and switch accents to Electric Blue"
  ```

---

### Task 6: Sticky Fejléc (Header) Tuning
**Files:**
- Modify: `components/Header.tsx`

- [ ] **Step 1: Fejléc szegély scrolled állapothoz**
  Nyisd meg a `components/Header.tsx` fájlt:
  - Alaphelyzetben tegyél rá egy transzparens alsó szegélyt a magasságugrás elkerülésére:
    `className="sticky top-0 z-40 w-full text-white transition-all duration-300 border-b border-transparent"`
  - Amikor scrolled igaz, a szegély színe váltson `border-white/10` értékre:
    `scrolled ? "backdrop-blur-md bg-black/40 border-b-white/10 shadow-lg" : "border-b-transparentbg-transparent"` -> itt is a szegélyszín változzon.
  - Cseréld le a `cyan-400` szelektorokat (pl. aktív navigációs link színe, hamburger menü focus színei) `sky-400` szelektorokra.

- [ ] **Step 2: Commit**
  ```bash
  git add components/Header.tsx
  git commit -m "design: add header transition border and update accents to sky-400"
  ```

---

### Task 7: Szekciók, Úrlapok és Oldalak Színvilág Cseréi (Electric Blue)
**Files:**
- Modify:
  - `components/AboutSection.tsx`
  - `components/TrustBadges.tsx`
  - `components/SocialProofWall.tsx`
  - `components/Testimonials.tsx`
  - `components/EventBanner.tsx`
  - `components/ContactForm.tsx`
  - `components/TradeInForm.tsx`
  - `components/CompareDock.tsx`
  - `components/LeasingCalculator.tsx`
  - `components/AIChatAssistant.tsx`
  - `components/Footer.tsx`
  - `components/CookieBanner.tsx`
  - `components/FomoNotification.tsx`
  - `components/Vehicle360Viewer.tsx`
  - `components/ImageGallery.tsx`
  - `components/PdfBrochureButton.tsx`
  - `app/kinalat/[id]/page.tsx`
  - `app/autobeszamitas/page.tsx`
  - `app/kapcsolat/page.tsx`
  - `app/loading.tsx`

- [ ] **Step 1: Színcserék és gomb shimmer / micro-interaction tuning az összes többi fájlban**
  Nyisd meg a felsorolt fájlokat egyenként, és cseréld le:
  - A `cyan-400` és `cyan-300` és `cyan-500` szöveg/háttér/szegély szelektorokat a megfelelő `sky-400` és `sky-300` és `sky-500` / `indigo-500` szelektorokra.
  - A `yellow-300` hátteret az `EventBanner.tsx` fájlban: `bg-yellow-300 text-black` -> `bg-sky-500 text-white` vagy `bg-gradient-to-r from-sky-500 to-indigo-600 text-white`.
  - A gombokon és interaktív elemeken alkalmazd a `hover:scale-[1.02] active:scale-[0.98] transition-transform` transzformációkat és shimmer osztályt, ha fő CTA (pl. TradeInForm elküldése, ContactForm elküldése, LeasingCalculator kalkuláció gombja).
  - Alcímek formázása a TrustBadges, AboutSection, SocialProofWall és Testimonials szekciókban: `font-semibold uppercase tracking-[0.16em]` -> `font-extralight uppercase tracking-[0.25em]`.

- [ ] **Step 2: Commit**
  ```bash
  git add .
  git commit -m "design: replace all remaining cyan-400/300/500 and yellow-300 colors with Electric Blue (sky/indigo) accents across all pages and forms"
  ```

---

### Task 8: Lint, Build és Ellenőrzés
- [ ] **Step 1: Lint futtatása**
  Futtasd a `npm run lint` parancsot, és javítsd a felmerülő hibákat.
- [ ] **Step 2: Production Build futtatása**
  Futtasd a `npm run build` parancsot a sikeres statikus generálás és fordítás ellenőrzésére.
- [ ] **Step 3: Status & Progress naplózás**
  Írd be az `AGENT.md` és `status.log` fájlokba az elvégzett fejlesztést.
- [ ] **Step 4: Git push**
  Pushold a commitokat a GitHub repóba: `git push origin main`.
