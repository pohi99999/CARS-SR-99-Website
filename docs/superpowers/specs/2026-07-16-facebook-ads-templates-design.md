# Design Spec: Facebook Marketplace Hirdetési Sablonok Generálása

## 1. Cél
Létrehozni egy egységes, prémium minőségű, vevőszerző Facebook Marketplace hirdetési szöveggyűjteményt a `sablon.md` fájlban a CARS SR99 Kft. aktuális 10 darabos járműkínálatához.

## 2. Autók és Forrásadatok
Az alábbi 10 autót dolgozzuk fel a `data/inventory.ts` és a `public/geppark/*/adatlap.md`, illetve `szoveg.txt` alapján:
1. **Audi A4 Avant Design S-tronic (2017)** - 5 300 000 Ft, 187 143 km, dízel, automata.
2. **BMW 525d Touring F11 (2011)** - 3 000 000 Ft, 328 000 km, dízel, manuális.
3. **BMW 5-ös sorozat F11 Touring N47 (2011)** - 3 599 999 Ft, km óra állás: telefonon egyeztethető (N/A), dízel, automata (rendszám alapján/leírás alapján).
4. **BMW 5-ös sorozat F11 Touring xDrive (2011)** - 4 200 000 Ft, 249 000 km, dízel, automata.
5. **Citroën Jumpy Spacetourer 8 személyes (2017)** - 7 600 000 Ft, 154 000 km, dízel, manuális (vagy automata, a leírás szerint 2.0 BlueHDi 150 LE).
6. **Ford Kuga 2.0 TDCi Titanium 4WD (2011)** - 2 549 000 Ft, 237 965 km, dízel, Powershift automata.
7. **Jaguar F-Pace 20d AWD (2017)** - 6 999 999 Ft, 87 800 km, dízel, automata.
8. **Seat Alhambra 2.0 TDI S&S (2015)** - 2 999 999 Ft, 290 000 km, dízel, manuális (vagy automata, leírás szerint jól karbantartott családi).
9. **Skoda Octavia Combi 2.0 TDI DSG (2020)** - 5 000 000 Ft, 293 600 km, dízel, DSG automata.
10. **Skoda Octavia Combi (2022, kézi váltó)** - 5 300 000 Ft, 217 700 km, dízel, kézi váltó.

## 3. Formátum és Kötelező Elemek
Minden autóhoz elkészítjük az alábbi blokkot:
- **Cím**: Figyelemfelkeltő, Marketplace-re optimalizált (pl. sérülésmentes, szervizelt stb.)
- **Főbb adatok**: Évjárat, kilométeróra állás, üzemanyag, váltó, kulcsok száma (alapértelmezetten 2 db gyári kulcs), okmányok állapota.
- **Vágykeltő leírás**: 2-3 bekezdés az autó valós előnyeiről, a ságodi telephelyi tesztvezetésről, és a Real Garant garancia lehetőségéről.
- **Pénzügyek**: Lízing (20% önerőtől) és autóbeszámítás.
- **Kötelező zárás**:
  ```markdown
  📞 Érdeklődni kizárólag telefonon: +36 70 907-0669
  📍 Megtekinthető: Zalaegerszeg, Ságodi Iparterület (hrsz. 807/15)
  🚗 Tekintse meg a teljes, 16 darabos autó kínálatunkat a vadiúj weboldalunkon: https://cars-sr99.vercel.app/
  ```

## 4. Git és Verifikáció
A `sablon.md` elkészítése után git commit és push történik:
`git add . && git commit -m "docs: add unified facebook marketplace ads templates to sablon.md" && git push origin main`
