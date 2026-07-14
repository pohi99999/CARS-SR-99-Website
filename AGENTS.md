<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🚗 CARS SR99 Kft. – Fejlesztési & Architektúra Haladási Napló (AGENTS.md)

**Projekt:** CARS SR99 Kft. Prémium Autókereskedés Weboldal  
**Live Production URL:** [https://cars-sr99.vercel.app/](https://cars-sr99.vercel.app/)  
**Technológiai Stacks:** Next.js 16 (Turbopack), React 19, TailwindCSS 4, TypeScript, Lucide Icons, Recharts, Zustand.

---

## 🎯 1. Projekt Célja & Dizájn Rendszer

A weboldal feladata a CARS SR99 Kft. (Zalaegerszeg) megbízható, értékesített prémium Toyota és Kia kínálatának (hibrid, benzin, diesel) digitális prezentációja, bizalomépítése és konverzió-orientált lead-szerzése.

- **Theme:** Dark Luxury Glassmorphism (`bg-[#121212]` alap, háttér videóval, aszimmetrikus gyémánt-vágott szegélyekkel és belső árnyékokkal ellátott `backdrop-blur-lg bg-black/40` üveg kártyákkal, elegáns Electric Blue `sky-400` / `sky-500` / `indigo-500` kiemelésekkel és ciklikus `.btn-shimmer` mikro-interakciókkal).
- **SEO & Schema:** Teljes körű `AutoDealer` JSON-LD schema markup, egyedi kanonikus URL-ek aloldalanként, 1200x630 OpenGraph közösségi kép.

---

## ✅ 2. Elvégzett Fejlesztések & Mérföldkövek

### 🏛️ Hero & Főoldal Szekciók
- **Hero Fejlesztés:** 
  - Főcím: *"Prémium Autók. Megbízható Kereskedés."*
  - Alcím: *"Toyota és Kia modellek gondosan válogatva – hibrid, benzin és diesel kínálattal, értékálló garanciával."*
  - Dinamikus 3 oszlopos statisztikai sáv: `500+` Eladott autó, `15+` Év tapasztalat, `4.9` Ügyfélelégedettség.
  - Videó háttér poster fallback kép (`/hero-poster.jpg`) a szaggatásmentes mobil/hálózati betöltéshez.
  - Sticky Header görgetés érzékelővel (`backdrop-blur-md bg-[#0f172a]/90`).
- **Bizalmi Elemek:** `TrustBadges.tsx` szekció (12 hónap Real Garant, JSZP ellenőrzött kártörténet, Ságodi telephelyi tesztvezetés).

### 🎨 Aloldalak & UI Egységesítés
- **Egyenletes Kártyamagasságok (`components/CarCard.tsx`):**
  - Grid elrendezésben `flex h-full flex-col justify-between` szerkezet, így a címek, specifikációk, árak és gombok tökéletesen egy vonalban futnak.
  - Cyan glow hover effektusok (`hover:shadow-[0_24px_55px_rgba(34,211,238,0.22)]`).
- **Sötét Üveghatási Dizájn Az Összes Aloldalon:**
  - `/autobeszamitas` & [TradeInForm.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/components/TradeInForm.tsx): Sötét üvegkártyás űrlap, reszponzív mezőkkel.
  - `/kapcsolat` & [ContactForm.tsx](file:///Z:/001_Workspace/CARS%20SR99%20KFT/CARS%20SR99%20KFT%20-%20Weboldal/components/ContactForm.tsx): Bizalomépítő 24 órás garantált válaszidővel.
  - `/garancia` & `/osszehasonlitas`: Zökkenőmentes összehasonlító dock LocalStorage állapottal.
  - `/kinalat/[id]`: Jármű adatlap 360°-os forgatható nézegetővel (touch pointer capture támogatással) és lízing kalkulátorral (`LeasingCalculator.tsx`).

### ⚡ Audit & Teljesítmény Optimalizálás
- **Szerver Oldali Késleltetések Eltávolítása:** Eltávolítva a mesterséges 800 ms-os várakoztatás az `inventoryService.ts`-ből. A statikus oldalak generálása **2.2s-ról 634ms-ra gyorsult (3.5x gyorsulás)**.
- **AI Chat Assistant (`components/AIChatAssistant.tsx`):** Bekötve az üzenetkezelés, autógörgetés és automatikus válaszok (kínálat, beszámítás, nyitvatartás).
- **Lighthouse Pontszámok (Production):**
  - Mobile: **Performance: 94**, **Accessibility: 98**, **Best Practices: 100**, **SEO: 100**
  - Desktop: **Performance: 99**, **Accessibility: 98**, **Best Practices: 100**, **SEO: 100**

---

## 🔒 3. Mérési, Marketing & Lead Integrációk

- **GDPR Script Guard (`components/TrackingScripts.tsx`):** A GA4 és Meta Pixel scriptek kizárólag a Süti Banner elfogadása után töltődnek be.
- **UTM Tracking (`utils/utmTracker.ts`):** Munkamenet szintű UTM paraméter eltárolás (`sessionStorage`).
- **Google Analytics 4 Események (`utils/analytics.ts`):**
  - `kapcsolat_form_elkuldve`, `beszamitas_form_elkuldve`
  - `cta_kinalat_kattintas`, `cta_visszahivas_kattintas`
  - `auto_reszletek_megtekintve`, `leasing_kalkulator_hasznalat`
  - `telefon_kattintas`, `email_kattintas`
- **Meta Pixel Standard Events:** `PageView`, `Lead`, `ViewContent`, `Contact`.
- **Biztonságos Szerveroldali HubSpot API Route (`app/api/hubspot-submit/route.ts`):**
  - A HubSpot integráció nem kliens oldalon fut, hanem a belső `/api/hubspot-submit` szerveroldali végponton keresztül.
  - A `HUBSPOT_PORTAL_ID`, `HUBSPOT_CONTACT_FORM_GUID` és `HUBSPOT_TRADEIN_FORM_GUID` változók rejtettek maradnak, nem kerülnek ki a kliens JS bundle-be vagy a hálózati forgalomba.
- **Lead Capture Webhook Service (`services/webhookService.ts`):** Automatizált 2x retry logikával rendelkező aszinkron lead továbbító.

---

## 🔑 4. Környezeti Változók (.env.example)

A felületen a következők vannak felkészítve:
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`
- `NEXT_PUBLIC_GSC_VERIFICATION`
- `NEXT_PUBLIC_META_PIXEL_ID`
- `HUBSPOT_PORTAL_ID` (Szerveroldali)
- `HUBSPOT_CONTACT_FORM_GUID` (Szerveroldali)
- `HUBSPOT_TRADEIN_FORM_GUID` (Szerveroldali)
- `NEXT_PUBLIC_LEAD_WEBHOOK_URL`

---

## 📜 5. Git Commit Előzmények

- `16a1c74` - `feat: initial premium hero, header, trust badges, footer and og meta`
- `9ef3943` - `feat: post-deploy QA, premium polish, SEO and conversion improvements`
- `38ae6e2` - `fix: remove artificial server delay in inventoryService for instant SSR`
- `44fff96` - `fix: make AIChatAssistant interactive with message state and auto-responses`
- `da076d3` - `fix: add pointer capture for smooth 360 viewer touch drag`
- `c1b1238` - `feat: UTM tracking and analytics helper`
- `bd5044c` - `feat: GA4 and Meta Pixel integration with GDPR consent`
- `ebfb89a` - `feat: HubSpot submission service`
- `93d4c40` - `feat: lead webhook service with retry logic`
- `525045e` - `feat: wire form events and tracking into components`
- `59dbd80` - `fix: move HubSpot submission to secure server-side API route`
- `design: implement Premium Automotive Aesthetics and micro-interactions` - Kivezetve az összes cyan és yellow szín, megvalósítva az új Electric Blue dizájnpaletta, aszimmetrikus gyémánt-vágott üveghatású kártya szegélyek és belső árnyékok, ciklikus shimmer fénycsík gombanimációk és finomított tracking-tight tipográfia.
