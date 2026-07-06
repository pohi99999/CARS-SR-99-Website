# Garanciális konstrukció módosítása - Implementációs Terv

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Real Garant garanciális konstrukció és minden utalásának teljes eltávolítása a weboldalról, valamint a Garancia aloldal prémium, 3 oszlopos tájékoztató oldallá történő alakítása.

**Architecture:** A `WarrantySection` komponens kivezetése a főoldalról és az aloldalról, a `WarrantySection.tsx` fájl fizikai eltávolítása. A `/garancia` oldal újraírása önálló Next.js 16/React 19 komponensként TailwindCSS 4 stílusban, az AI Chat válaszának frissítése.

**Tech Stack:** Next.js 16 (Turbopack), React 19, TailwindCSS 4, Lucide Icons, TypeScript.

---

### Task 1: Főoldal és WarrantySection tisztítása

**Files:**
- Modify: `app/page.tsx`
- Delete: `components/WarrantySection.tsx`

- [ ] **Step 1: Módosítsuk az `app/page.tsx` fájlt.** Távolítsuk el a `WarrantySection` importot és a hozzá tartozó JSX komponenst.
- [ ] **Step 2: Töröljük a `components/WarrantySection.tsx` fájlt.** 

### Task 2: Garancia aloldal redesign

**Files:**
- Modify: `app/garancia/page.tsx`

- [ ] **Step 1: Írjuk át a metadata-t az `app/garancia/page.tsx` fájlban.** Távolítsuk el a Real Garant kifejezést és frissítsük a leírást.
- [ ] **Step 2: Írjuk át a `GaranciaPage` komponenst.** Készítsük el az új, 3 oszlopos Dark Luxury Glassmorphism kinézetet a 12 hónapos szervizgarancia, a JSZP járműellenőrzés és a telephelyi tesztvezetés bemutatásával.

### Task 3: AI Chat Asszisztens frissítése

**Files:**
- Modify: `components/AIChatAssistant.tsx`

- [ ] **Step 1: Frissítsük a bot válaszát a `components/AIChatAssistant.tsx` fájlban.** A `lower.includes("garancia")` ágban a "12 hónapos Real Garant kiterjesztett garanciát" szöveget cseréljük le az általánosabb "12 hónapos szervizgaranciát" kifejezésre.

### Task 4: Naplózás és ellenőrzés

**Files:**
- Modify: `AGENT.md`
- Modify: `status.log`

- [ ] **Step 1: Frissítsük az `AGENT.md` fejlesztési naplót.** Adjunk hozzá egy új bejegyzést a táblázathoz a mai dátummal: `2026-07-06 | Garanciális modul eltávolítása (Real Garant kiterjesztett védelem törlése) | Kész`.
- [ ] **Step 2: Frissítsük a `status.log` fájlt.** Írjuk be a rendszerállapot-változást: `[2026-07-06] - Rendszerállapot: Garanciális tartalom (Real Garant) törölve, oldal frissítve.`.
- [ ] **Step 3: Futtassuk a minőségbiztosítási parancsot.** Futtassuk a terminálban: `npm run lint` a hibás importok kiszűrésére.

### Task 5: Változások verziókezelése

- [ ] **Step 1: Git parancsok végrehajtása.** Futtassuk:
  ```powershell
  git add .
  git commit -m "fix: Refactor warranty content and UI for transparency"
  git push origin main
  ```
