# CARS SR99 Kft. - Weboldal

Modern, villámgyors és magas konverziójú weboldal a CARS SR99 Kft. prémium autókereskedési márkájához.

## Arculati célok

- Prémium, letisztult megjelenés mély aszfaltszürke (`#2B2B2B`) és tiszta fehér alapszínekkel.
- Erős konverziós fókuszú CTA-k neon-kék és neon-sárga kiemelésekkel.
- Az "SR99 Alagút" vizuális és UX szimbolikája: biztonság, modern technológia, akadálytalan haladás.

## Üzleti célok

- Minőségi érdeklődők számának növelése.
- Gyors és bizalomépítő első benyomás biztosítása.
- Mobilon és asztali gépen egyaránt kiemelkedő felhasználói élmény.

## Technológiai stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint

## Lokális fejlesztés indítása

1. Függőségek telepítése:

```bash
npm install
```

2. Fejlesztői szerver indítása:

```bash
npm run dev
```

3. Megnyitás böngészőben:

```text
http://localhost:3000
```

## Deployment (Vercel)

Ez a projekt Vercel környezetre van optimalizálva (Next.js App Router + server/client komponens felépítés).

1. Importáld a repót a Vercelben: **Add New Project** → válaszd a GitHub repository-t.
2. A Vercel automatikusan felismeri a Next.js beállításokat; indítsd a deploy-t alapértelmezett build konfigurációval.
3. Deploy után állítsd be az egyedi domaint (ha szükséges), majd ellenőrizd a production URL-en a dinamikus járműoldalakat.
