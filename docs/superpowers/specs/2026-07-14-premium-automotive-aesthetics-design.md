# 🚗 Premium Automotive Aesthetics Overhaul - Design Specification

**Dátum:** 2026-07-14  
**Projekt:** CARS SR99 Kft. Prémium Autókereskedés Weboldal  
**Státusz:** Tervezés (Jóváhagyásra vár)

---

## 🎯 1. Célkitűzés & Dizájn Filozófia
A weboldal vizuális színvonalának emelése a prémium és luxus kategóriás autómárkák online jelenlétének mintájára. A korábbi harsány cián-sárga színkombináció helyett egy mélyebb, elegánsabb, tech-orientált **Electric Blue** (`sky-400`, `sky-500`, `indigo-500`) arculat kialakítása, gyémánt-vágott térhatású üvegkártyákkal és finom mikro-interakciókkal.

---

## 🏛️ 2. Tipográfia & Címsorok Finomítása
- **Globális tracking (letter-spacing):** 
  - Minden `h1` és `h2` elemre globális szinten alkalmazzuk a `letter-spacing: -0.02em` (`tracking-tight`) stílust a prémium, tömör és elegáns hatás érdekében a `globals.css` fájlban.
- **Hero H1 Címsor:**
  - Asztali nézetben (`md` és `lg` töréspontokon) a címsor méretét növeljük `text-5xl md:text-6xl lg:text-7xl` szintekre.
  - Sorköznek beállítjuk a `leading-tight` értéket, elkerülve a túl nagy hézagokat a sorok között.
- **Alcímek & Címkék:**
  - A szekciók feletti kis feliratokat (pl. *Rólunk*, *Social Proof*, *Márka szűrő*) átalakítjuk: `font-extralight tracking-widest uppercase` formátumra, megteremtve a kontrasztot a nehéz címsorokkal.

---

## 💎 3. Glassmorphism & Szegélyek (Gyémánt-vágott hatás)
A `CarCard.tsx` járműkártyáinak és a `CarFilter.tsx` kínálati szűrő konténerének szegélyeit és árnyékait finomítjuk:
- **Gyémánt-vágott szegélyek:** A homogén `border-white/10` helyett aszimmetrikus, felül erősebb, oldalt és alul halványabb szegélyt kapnak:
  - `border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5`
- **Térhatás / Belső árnyék:** 
  - Hozzáadunk egy finom belső fehér ragyogást a kártyák tetejéhez: `shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]`.
  - A fő doboz árnyéka megmarad mélynek: `shadow-[0_20px_45px_rgba(2,8,23,0.45)]`.
- **Hátterek & Elmosódás:** 
  - A háttér elmosódás erejét növeljük: `backdrop-blur-md` -> `backdrop-blur-lg` (16px).
- **Kép Zoom Animáció:**
  - A `CarCard` képének tárolója garantáltan `overflow-hidden` lesz.
  - A képre a lassú, prémium hatás érdekében a `transition-transform duration-700 ease-out hover:scale-110` stílust alkalmazzuk.

---

## ⚡ 4. Színvilág & CTA Gombok (Electric Blue & Shimmer)
- **Accentszín csere:**
  - A túl harsány `cyan-400` és `cyan-300` osztályokat lecseréljük a prémiumabb `sky-400` (Electric Blue) és `sky-500` / `indigo-500` színekre.
  - A `yellow-300` sárga elemet (`EventBanner.tsx`) lecseréljük egy visszafogottabb, prémium Electric Blue háttérre (`bg-sky-500` vagy `bg-gradient-to-r from-sky-600 to-indigo-600` fehér vagy fekete szöveggel).
- **CTA Gombok Shimmer Animációja:**
  - A fő CTA gombok (Hero gombjai, kapcsolatfelvételi gombok) megkapják a `.btn-shimmer` osztályt.
  - A globális CSS-ben definiáljuk a `::after` pszeudo-elemes fénycsík animációt, ami 6 másodperces időközönként finoman végigfut a gombon.
- **Hover & Ragyogás:**
  - Hover állapotban a gombok megkapják a `hover:scale-[1.02] active:scale-[0.98] transition-transform` transzformációkat.
  - Lágy, elmosódott Electric Blue ragyogást adunk a gombok alá: `hover:shadow-[0_0_32px_rgba(56,189,248,0.45)]`.

---

## 🌅 5. Hero Gradiens Overlay
- A Hero szekcióban lévő nehéz, fix `bg-black/60` maszkot lecseréljük egy rétegzett gradiensre:
  - `bg-gradient-to-b from-black/80 via-black/30 to-black/90`.
- Ez tökéletesen megőrzi a videó kontrasztos részleteit a középső tartományban, de a felső menü és az alsó statisztikai sáv mögött megfelelő sötétséget biztosít az olvashatósághoz.

---

## 🚀 6. Görgetési Reveal & View Transitions
- **Framer Motion animációk:**
  - Ellenőrizzük a `TrustBadges`, `AboutSection`, `SocialProofWall` és `Testimonials` komponensek `initial` és `whileInView` beállításait, biztosítva az egységes `y: 20 -> y: 0` és `opacity: 0 -> 1` beúszást `easeOut` átmenettel.
- **View Transitions API:**
  - A `globals.css` fájlban engedélyezzük a natív Cross-Document View Transitions-t a modern böngészők számára:
    ```css
    @view-transition {
      navigation: auto;
    }
    ```

---

## 🏛️ 7. Fejléc Tuning (Sticky Header)
- A scrolled állapotú fejléc aljára finom `border-b border-white/10` szegélyt teszünk.
- Az elmozdulás/ugrás elkerülése érdekében a fejléc alapállapotában is jelen van a szegély, de `border-transparent` színnel, ami scrolled állapotban `border-white/10` színre vált át 300ms-os átmenettel (`transition-colors duration-300`).
