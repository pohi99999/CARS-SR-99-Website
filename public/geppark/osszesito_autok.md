# Autó-nyilvántartás összesítő

Ez a táblázat a `E:\OneDrive\Desktop\geppark` mappában található 12 forgalmi engedély PDF, valamint az `osszesito.csv` és `autok_osszesito.csv` fájlok adatai alapján készült. Az adatok OCR-rel (Tesseract, hun+eng nyelvi csomaggal) kerültek kiolvasásra a PDF-ekből, mivel azok szkennelt (nem szöveges) dokumentumok voltak.

## Összes autó

| Autó | Évjárat | Motor | Teljesítmény | Rendszám | Km óra állás | Ár | Kép (van/nincs) |
|---|---|---|---|---|---|---|---|
| Ford Mondeo | 2009 | 1997 ccm dízel | 103 kW / 140 LE | MA-899CN | 211 000 km | 860 000 Ft | nincs |
| Ford Kuga Titanium | 2011 | 1997 ccm dízel | 103 kW / 140 LE | WB-644DJ | 138 000 km | 1 549 000 Ft | nincs |
| Seat Alhambra | 2015 | 1968 ccm dízel | 110 kW / 150 LE | WZ-692CE | 290 000 km | 3 000 000 Ft | nincs |
| Audi A4 Avant | 2017 | 1968 ccm dízel | 140 kW / 190 LE | BR-25110 | 187 143 km | 300 000 Ft (feltehetően hiányos adat) | van |
| Jaguar F-Pace 20d AWD | 2016/2017 | 1999 ccm dízel | 132 kW / 180 LE | BN-404DK | 88 000 km | 6 900 000 Ft | nincs |
| Citroën Jumpy Spacetourer | 2017 | 1997 ccm dízel | 110 kW / 150 LE | NK-837DW | 156 000 km | 7 500 000 Ft | nincs |
| BMW F11 525d | 2011 | 1995 ccm dízel | nincs adat | OW-530CE | nincs adat | nincs megbízható adat (lásd megjegyzés) | nincs |
| BMW F11 530d xDrive Aura | 2011 | 2993 ccm dízel | 190 kW / 258 LE | SO-847DY | 528 000 km (bizonytalan) | 2 900 000 Ft (saját, azonosított adat) | nincs |
| BMW F11 (N47, fehér) | 2011/2012 | 1995 ccm dízel | 160 kW / 218 LE | BL-969FY | nincs adat | 3 800 000 Ft (becsült, nem az árak.md zöld tételéből) | nincs |
| BMW F11 xDrive (fekete) | 2013 | nincs adat | nincs adat | nincs forgalmi dokumentum | 256 000 km | 3 300 000 Ft | nincs |
| BMW F11 xDrive (fekete) | 2011 | nincs adat | nincs adat | nincs forgalmi dokumentum | 210 000 km | 3 300 000 Ft | nincs |
| BMW F11 xDrive (zöld) | 2011 | nincs adat | nincs adat | nincs forgalmi dokumentum | 249 000 km | 3 800 000 Ft | nincs |
| BMW X6 4.0D | nincs adat | nincs adat | nincs adat | nincs forgalmi dokumentum | 325 000 km | 5 000 000 Ft | nincs |
| Skoda Octavia DSG | 2020 | 1968 ccm dízel | 110 kW / 150 LE | HO-534CJ | 293 600 km | 5 000 000 Ft | nincs |
| Skoda Octavia kézi | 2022 | nincs adat | nincs adat | MD-818LI | 217 700 km | 5 300 000 Ft | nincs |
| Subaru XV | 2012 | 1998 ccm dízel | 80 kW / 109 LE | GU-984MR | 237 170 km | 1 800 000 Ft | nincs |

## BMW F11 / X6 párosítási vizsgálat eredménye

A 3 meglévő forgalmival rendelkező BMW F11 mappát (525d, 530d xDrive Aura, N47 fehér) összevetettük az árak.md/osszesito.csv 3 db "BMW F11 xDrive" tételével (2013 fekete - 3 300 000 Ft / 256 000 km; 2011 fekete - 3 300 000 Ft / 210 000 km; 2011 zöld - 3 800 000 Ft / 249 000 km). **Egyik meglévő mappa sem volt egyértelműen párosítható** egyik xDrive tétellel sem:

- **525d**: nem xDrive kivitel (a típusjelzés ezt nem támasztja alá), és színe sem olvasható ki OCR-rel a forgalmiból → nem azonosítható egyik tétellel sem.
- **530d xDrive Aura**: ez az egyetlen ténylegesen xDrive kivitelű meglévő autó, éve (2011) egyezne a "2011 fekete" tétellel, de saját, teljes FIN- és rendszámadatokkal, valamint eltérő (2 900 000 Ft) árral rendelkezik, színe pedig nem igazolható → külön járműnek tekintendő, nem azonos a listás tétellel.
- **N47 fehér**: színe (fehér) alapján egyértelműen kizárható mindhárom tétel (fekete, fekete, zöld) közül.

Emiatt mindhárom "árak.md xDrive" tételhez (2013 fekete, 2011 fekete, 2011 zöld), valamint a BMW X6 4.0D-hez külön mappa készült, "nincs-forgalmi" jelöléssel, mivel egyikükhöz sincs forgalmi engedély a gyökérmappában.

## Egyéb megjegyzések / adateltérések a forrásokban

- **Ford Mondeo / Ford Kuga Titanium**: az alvázszám (FIN) utolsó karaktereiben eltérés van a `autok_osszesito.csv` és a hivatkozott `árak.md` fájl között (betűcsere-jellegű eltérés, pl. `9P79600` vs `G9P79600`).
- **Audi A4 Avant**: a rendszám OCR-olvasata bizonytalan (`BR-25110` vs `BR-251IO`); az ár mező (300 000 Ft) valószínűleg hiányos/hibás rekord, a valós ár feltehetően kb. 3 000 000 Ft lehet a forrás CSV megjegyzése szerint.
- **Jaguar F-Pace**: mind a rendszám, mind az alvázszám eltér a két forrásfájl között.
- **Citroën Jumpy Spacetourer**: mind a rendszám, mind az alvázszám eltér a két forrásfájl között.
- **BMW F11 525d**: a teljesítmény és a km óra állás egyik forrásban sem szerepel; az ár nem állapítható meg megbízhatóan (lásd a "BMW F11 / X6 párosítási vizsgálat eredménye" szekciót).
- **BMW F11 530d xDrive Aura**: a km óra állás bizonytalan (az egyik forrás szerint „528 000 km (?)", a másik szerint „N/A"); a rendszám OCR-olvasata is bizonytalan; a párosítási vizsgálat megerősítette, hogy ez egy önálló, az árak.md xDrive listától eltérő jármű.
- **Skoda Octavia kézi**: a forgalmi 2022-es évjáratot mutat, de az `árak.md` forrás 2011-et jelez ugyanehhez a tételhez — ellentmondás.
- **Subaru XV**: az alvázszám utolsó számjegyében eltérés van a két forrás között (636 vs 638; az OCR a PDF-ből `...005636`-ot olvasott ki).

Minden autó saját mappájában (`[Márka]-[Típus]-[Évjárat]/adatlap.md`) részletesebben is szerepelnek ezek a megjegyzések.
