# Design Specifikáció: Garanciális modul és Real Garant utalások eltávolítása

**Dátum:** 2026-07-06  
**Státusz:** Jóváhagyva  
**Megközelítés:** C megközelítés (WarrantySection teljes eltávolítása, garancia oldal egyszerűsítése)

---

## 1. Cél és Összefoglalás
A weboldalról el kell távolítani a "12 hónapos Real Garant kiterjesztett védelem" konstrukció minden említését, mivel ez jelenleg nem elérhető. A Real Garant-hoz köthető specifikus garanciális elemeket (motor- és váltógarancia kártyák a főoldalon) eltávolítjuk a hiteles tájékoztatás érdekében. Helyette a weboldal többi részén is említett általános 12 hónapos szervizgaranciára és a JSZP járműellenőrzésre helyezzük a hangsúlyt.

## 2. Érintett Fájlok és Változtatások

### 2.1. components/WarrantySection.tsx
* **Művelet:** Teljes törlés.
* **Indoklás:** A komponens kifejezetten a Real Garant konstrukció bemutatására épült, így feleslegessé válik.

### 2.2. app/page.tsx (Főoldal)
* **Művelet:** A `WarrantySection` importjának és használatának eltávolítása.
* **Módosítandó sorok:**
  * Eltávolítani: `import WarrantySection from "@/components/WarrantySection";`
  * Eltávolítani: `<WarrantySection />` a fájl végéről.

### 2.3. components/AIChatAssistant.tsx
* **Művelet:** A garanciával kapcsolatos válasz frissítése.
* **Módosítandó sor:**
  * Régi: `reply = "Kiemelt autóinkhoz 12 hónapos Real Garant kiterjesztett garanciát biztosítunk motor- és váltóvédelemmel.";`
  * Új: `reply = "Minden nálunk vásárolt gépjárműhöz 12 hónapos szervizgaranciát biztosítunk a gondtalan használat érdekében. Részletekről érdeklődjön munkatársainknál!";`

### 2.4. app/garancia/page.tsx (Garancia aloldal)
* **Művelet:** Az oldal teljes redesignja és az utalások törlése.
* **Dizájn részletei:**
  * Dark Luxury Glassmorphism stílus megőrzése (`bg-[#121212]`, neon-cyan kiemelések, sötét üvegkártyás háttér).
  * 3 oszlopos grid elrendezés a valós bizalmi elemek bemutatására:
    1. **12 hónap szervizgarancia** - Általános szervizgarancia a járművek mellé.
    2. **JSZP előélet-ellenőrzés** - Biztonságos és átlátható autóvásárlás államilag ellenőrzött kilométeróra-állással és kártörténettel.
    3. **Telephelyi tesztvezetés** - Személyes kipróbálási lehetőség zalaegerszegi telephelyünkön vásárlás előtt.
  * Metadata description módosítása (Real Garant utalás törlése).

## 3. Minőségbiztosítás és Ellenőrzés
1. **Linter futtatása:** `npm run lint` parancs futtatása annak ellenőrzésére, hogy ne maradjon árva import (főleg a `WarrantySection` törlése után).
2. **Manuális kódellenőrzés:** Meggyőződni róla, hogy sehol nem maradt a codebase-ben "Real Garant" említés (kivéve az archivált `elemzes.md` és a fejlesztési naplók).

## 4. Naplózás és Verziókezelés
* **AGENT.md:** Frissítés a mai dátummal: `2026-07-06 | Garanciális modul eltávolítása (Real Garant kiterjesztett védelem törlése) | Kész`
* **status.log:** Frissítés a mai dátummal: `[2026-07-06] - Rendszerállapot: Garanciális tartalom (Real Garant) törölve, oldal frissítve.`
* **Git commit üzenet:** `fix: Refactor warranty content and UI for transparency`
* **Push:** Feltöltés a `main` ágra.
