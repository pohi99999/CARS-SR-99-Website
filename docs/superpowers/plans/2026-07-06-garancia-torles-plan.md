# "SR99 Garancia" kivezetése - Implementációs Terv

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Az "SR99 Garancia" navigációs menüpont, a lábléc hivatkozás és az `/garancia` aloldal végleges kivezetése a navigációból és a fájlrendszerből.

**Architecture:** A `/garancia` link eltávolítása a `Header` navigációs tömbjéből és a `Footer` gyors linkjei közül. Az `app/garancia` könyvtár és annak tartalmának törlése.

**Tech Stack:** Next.js 16 (Turbopack), TypeScript.

---

### Task 1: Navigáció és lábléc tisztítása

**Files:**
- Modify: `components/Header.tsx:9-15`
- Modify: `components/Footer.tsx:46-50`

- [ ] **Step 1: Módosítsuk a `components/Header.tsx` fájlt.** Töröljük a `href: "/garancia"` bejegyzést a `navItems` tömbből.
- [ ] **Step 2: Módosítsuk a `components/Footer.tsx` fájlt.** Töröljük a `/garancia` linket tartalmazó `<li>` blokkot.

### Task 2: Garancia aloldal könyvtárának törlése

**Files:**
- Delete: `app/garancia/page.tsx`

- [ ] **Step 1: Töröljük az `app/garancia` könyvtárat a tartalmával együtt.** Futtassuk a törlő parancsot.

### Task 3: Naplózás és ellenőrzés

**Files:**
- Modify: `AGENT.md`
- Modify: `status.log`

- [ ] **Step 1: Frissítsük az `AGENT.md` fejlesztési naplót.** Adjunk hozzá egy új bejegyzést a táblázathoz a mai dátummal: `2026-07-06 | "SR99 Garancia" menüpont és aloldal végleges kivezetése a navigációból és a fájlrendszerből | Kész`.
- [ ] **Step 2: Frissítsük a `status.log` fájlt.** Írjuk be a rendszerállapot-változást: `[2026-07-06] - Rendszerállapot: Garancia aloldal törölve, navigáció tisztítva.`.
- [ ] **Step 3: Futtassuk az ellenőrzést.** Futtassuk az `npm run lint` parancsot a terminálban.

### Task 4: Változások verziókezelése

- [ ] **Step 1: Git parancsok végrehajtása.** Futtassuk:
  ```powershell
  git add .
  git commit -m "chore: Remove SR99 Garancia menu item and page"
  git push origin main
  ```
