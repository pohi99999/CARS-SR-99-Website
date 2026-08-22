export interface Car {
  id: string;
  marka: string;
  modell: string;
  evjarat: number;
  ar: string;
  futasteljesitmeny: string;
  uzemanyag: string;
  images: string[];
  leiras?: string;
  /** Karosszéria színe (forgalmi/adatlap alapján), ha ismert. Ld. public/geppark/{id}/adatlap.md. */
  szin?: string;
}

export const inventory: Car[] = [
  {
    "id": "audi-a4-avant-2017",
    "marka": "Audi",
    "modell": "A4 Avant Design S-tronic",
    "evjarat": 2017,
    "ar": "5 300 000 Ft",
    "futasteljesitmeny": "187 143 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Audi-A4-Avant-2017-kész/kepek/fo.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0775.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0776.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0777.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0778.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0779.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0780.webp",
      "/geppark/Audi-A4-Avant-2017-kész/kepek/IMG_0781.webp"
    ],
    "leiras": "Kifogástalan esztétikai és műszaki állapotban lévő, mélykék metálfényezésű Audi A4 Avant Design. A megbízható és rendkívül dinamikus, 190 lóerős 2.0 TDI erőforrással és a precíz S-tronic hétfokozatú automataváltóval szerelve. Garantált, leinformálható 187 143 km-es futásteljesítmény. Az autó karcmentes, újszerű állapotú, külföldi okmányokkal rendelkezik, a vételár pedig a magyarországi forgalomba helyezés teljes költségét tartalmazza."
  },
  {
    "id": "bmw-f11-n47-feher-2011",
    "marka": "BMW",
    "modell": "5-ös sorozat (F11) Touring (N47)",
    "evjarat": 2011,
    "ar": "3 599 999 Ft",
    "futasteljesitmeny": "N/A",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/BMW-F11-N47-Feher-2011/kepek/fo.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/0d1fcf53-cb73-4842-ae69-03f0b3cf2d04.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/27bfa191-74dc-4f2a-a8d8-b525a3cc12e9.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/2a365b6a-9750-4c3a-938c-7fc71be2423f.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/3fa07d3e-8846-4b88-b519-a4dfd6f5c7f2.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/486863d9-af06-4edb-82fe-a06a75294ab9.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/54da2283-f742-44ec-9f9b-7d3d1ca2281c.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/6933a1f3-cbde-4103-9fac-7322b84d7fec.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/76694ad0-2d52-4243-ae59-73cd476e00ba.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/7763b2c0-67a1-4b16-ad42-5e75d9f5370f.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/78e09fc5-bd26-49b4-a0ab-4cc66eda867a.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/947e9655-c492-4946-817d-5349519a4505.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/b896f66e-349f-4d8a-ae8d-21ba8107ba0a.webp",
      "/geppark/BMW-F11-N47-Feher-2011/kepek/d6337bbb-e8f8-4b6d-8ca0-146cbd275213.webp"
    ],
    "leiras": "Elegáns alpesi fehér fényezésű BMW 5-ös sorozat (F11) Touring, a közkedvelt és megbízható N47-es dízelmotorral (218 LE). Kiváló esztétikai és műszaki állapot, tágas és kényelmes utastér jellemzi. Kiváló utazóautó mindennapi használatra vagy hosszabb távokra egyaránt. A gépjármű érvényes magyar okmányokkal, friss magyar forgalmi engedéllyel és rendszámmal (AO-TM-039) rendelkezik, így azonnal, várakozás és további papírmunka nélkül elvihető."
  },
  {
    "id": "citroen-jumpy-spacetourer-2017",
    "marka": "Citroën",
    "modell": "Jumpy Spacetourer (8 személyes)",
    "evjarat": 2017,
    "ar": "7 600 000 Ft",
    "futasteljesitmeny": "154 000 km",
    "uzemanyag": "Dízel",
    "szin": "Fekete",
    "images": [
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/fo.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/744274759_1593426068810512_62443435036008230_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/744819797_1576311977490537_6194933287690889823_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/745235798_2283580042475077_553780261190129874_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/746528250_2109653139955940_1460504853168810034_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/746648590_1019200844153373_5272462772383059265_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/747962051_2224654521666863_4862507255607421810_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/748043639_2726650611065975_1477736940090135847_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/748175729_1036167785527219_2049127727718372007_n.webp",
      "/geppark/Citroen-Jumpy-Spacetourer-2017/kepek/748175729_893242940503310_2539838661510690519_n.webp"
    ],
    "leiras": "Luxus felszereltségű, 8 személyes Citroën Jumpy Spacetourer kiváló esztétikai és műszaki állapotban. Megbízható és dinamikus 2.0 BlueHDi motorral (150 LE), 154 000 km-es garantált futásteljesítménnyel. Gazdag extrafelszereltség: prémium teljes bőrbelső, panorámatető, valamint elektromosan és távirányítással is működtethető tolóajtók. Az autó esztétikailag és műszakilag is hibátlan, minden létező extra tökéletesen funkcionál. A vételár a magyarországi forgalomba helyezés és rendszámozás teljes költségét tartalmazza."
  },
  {
    "id": "ford-kuga-titanium-2011",
    "marka": "Ford",
    "modell": "Kuga 2.0 TDCi Titanium 4WD",
    "evjarat": 2011,
    "ar": "2 549 000 Ft",
    "futasteljesitmeny": "237 965 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Ford-Kuga-Titanium-2011/kepek/fo.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180567.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180568.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180569.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180646.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180649.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180655.webp",
      "/geppark/Ford-Kuga-Titanium-2011/kepek/28180668.webp"
    ],
    "leiras": "Megkímélt állapotú, elegáns fekete metálfényezésű Ford Kuga a legmagasabb Titanium felszereltséggel és intelligens 4WD összkerékhajtással. A megbízható 2.0 TDCi (140 LE) motorral és kényelmes Powershift automataváltóval szerelve. Rendszeresen karbantartott, rozsdamentes karosszéria, esztétikai apróbb használati nyomokkal. Kulcs nélküli indítás, kétzónás digitális klíma, navigáció, tempomat és tolatóradar jellemzi. Költségmentes, megbízható crossover, érvényes magyar rendszámmal (AOTM-051) és okmányokkal, 2028-ig tartó műszaki vizsgával, azonnal elvihető."
  },
  {
    "id": "jaguar-f-pace-2017",
    "marka": "Jaguar",
    "modell": "F-Pace 20d AWD",
    "evjarat": 2017,
    "ar": "6 999 999 Ft",
    "futasteljesitmeny": "87 800 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Jaguar-F-Pace-2017/kepek/fo.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/742147574_876690065511822_6677725380578176679_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/743363924_1021119744103216_4930224388117762161_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747468442_1565313195246252_6006482302127875363_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747468479_2112302309668383_6928431191053720670_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747507740_964523986631729_2482206926073766647_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747514036_881257345054740_7140188331048968278_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747549404_4663344890618591_8553671993712318651_n.webp",
      "/geppark/Jaguar-F-Pace-2017/kepek/747605435_1768912067435475_9068798865791099745_n.webp"
    ],
    "leiras": "Gyönyörű, sérülésmentes Jaguar F-Pace 2.0d AWD vezetett szervizkönyvvel, garantált és leinformálható 87 800 km-es futásteljesítménnyel. Rendkívül elegáns megjelenés, prémium vezetési élmény és megbízható összkerékhajtás. Jelenleg még külföldi okmányokkal rendelkezik, de a vételár már a magyarországi forgalomba helyezés és regisztráció minden költségét tartalmazza."
  },
  {
    "id": "seat-alhambra-2015",
    "marka": "Seat",
    "modell": "Alhambra 2.0 TDI S&S",
    "evjarat": 2015,
    "ar": "2 999 999 Ft",
    "futasteljesitmeny": "290 000 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Seat-Alhambra-2015/kepek/fo.webp",
      "/geppark/Seat-Alhambra-2015/kepek/743282710_1751326392853702_6377459396269776274_n.webp",
      "/geppark/Seat-Alhambra-2015/kepek/747505217_1565056614972752_4266052568904685950_n.webp",
      "/geppark/Seat-Alhambra-2015/kepek/747530660_2579782709115349_1032856940276771584_n.webp",
      "/geppark/Seat-Alhambra-2015/kepek/747536084_1478636474301092_5683994041271014871_n.webp",
      "/geppark/Seat-Alhambra-2015/kepek/747561659_1475935837883010_4697401629169117369_n.webp"
    ],
    "leiras": "Kiváló állapotban lévő, gondosan karbantartott Seat Alhambra, amely tökéletes választás nagycsaládosoknak. Praktikus, dupla tolóajtós kialakítással, tágas 5 személyes utastérrel, nagy navigációs rendszerrel és tolatókamerával szerelve. Motorikusan és esztétikailag is szép, megkímélt állapot. A vételár a magyarországi forgalomba helyezés költségeit már tartalmazza. Megtekinthető Zalaegerszegen."
  },
  {
    "id": "skoda-octavia-2020-dsg",
    "marka": "Skoda",
    "modell": "Octavia Combi 2.0 TDI DSG",
    "evjarat": 2020,
    "ar": "5 000 000 Ft",
    "futasteljesitmeny": "293 600 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Skoda-Octavia-2020-DSG/kepek/fo.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0795.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0796.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0797.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0798.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0799.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0800.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0801.webp",
      "/geppark/Skoda-Octavia-2020-DSG/kepek/IMG_0803.webp"
    ],
    "leiras": "Rendkívül népszerű, modern Skoda Octavia Combi DSG automataváltóval és a rendkívül takarékos 2.0 TDI (150 LE) motorral. 293 600 km-t futott, folyamatosan karbantartott és megbízható állapotú jármű. Tágas, funkcionális belső tér, kiváló ergonómia és gazdag felszereltség jellemzi, amely ideálissá teszi akár üzleti, akár családi használatra. A gépjármű érvényes magyar okmányokkal, friss magyar forgalmi engedéllyel és rendszámmal (AO-TM-038) rendelkezik, így azonnal, várakozás és további papírmunka nélkül elvihető."
  },
  {
    "id": "skoda-octavia-2022-kezi",
    "marka": "Skoda",
    "modell": "Octavia Combi (kézi váltó)",
    "evjarat": 2022,
    "ar": "5 300 000 Ft",
    "futasteljesitmeny": "217 700 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/fo.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/742147578_1306771008107610_8851609630085681517_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/742730650_2189113575270620_4843642439006249235_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/743341629_1356634383103017_6112546118821989826_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/746908930_4309277012719718_6901980217075200397_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/747450760_1026014679918281_2426737065883425569_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/747513017_1724935181876612_3556337482417964153_n.webp",
      "/geppark/Skoda-Octavia-2022-Kezi/kepek/747536807_2152638612338568_324321531159673310_n.webp"
    ],
    "leiras": "Gyönyörű, újszerű esztétikai és műszaki állapotban lévő Skoda Octavia Combi kézi sebességváltóval. Kívül-belül karcmentes, szinte új autó benyomását kelti. 217 700 km-es futással, gazdaságos dízel hajtáslánccal. A vételár a magyarországi forgalomba helyezés és a friss műszaki vizsga költségeit már tartalmazza. Megtekinthető Zalaegerszegen."
  },
  {
    "id": "bmw-x6-xdrive30d-2012",
    "marka": "BMW",
    "modell": "X6 xDrive30d",
    "evjarat": 2012,
    "ar": "5 000 000 Ft",
    "futasteljesitmeny": "259 000 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/BMW-X6-xDrive30d-2012/kepek/fo.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/01.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/02.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/03.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/04.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/05.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/06.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/07.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/08.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/09.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/10.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/11.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/12.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/13.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/14.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/15.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/16.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/17.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/18.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/19.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/20.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/21.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/22.webp",
      "/geppark/BMW-X6-xDrive30d-2012/kepek/23.webp"
    ],
    "leiras": "Lenyűgöző megjelenésű, mélyfekete BMW X6 xDrive30d, krómozott oldalsó lépcsőkkel, könnyűfém felnikkel és krémszínű, prémium bőrbelsővel. Erőteljes, 3.0 literes biturbó dízelmotorral (225 kW / 306 LE), precíz ZF nyolcfokozatú automataváltóval és állandó xDrive összkerékhajtással szerelve — igazi luxus-crossover, amely a terepjáró magabiztosságát ötvözi a sportkupé eleganciájával. 259 000 km-es futásteljesítménnyel. Érvényes magyar rendszámmal (AORA-792), magyar forgalomba helyezve, rendezett magyar okmányokkal kerül átadásra."
  },
  {
    "id": "subaru-xv-2012",
    "marka": "Subaru",
    "modell": "XV",
    "evjarat": 2012,
    "ar": "2 000 000 Ft",
    "futasteljesitmeny": "237 170 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/Subaru-XV-2012/kepek/fo.webp",
      "/geppark/Subaru-XV-2012/kepek/01.webp",
      "/geppark/Subaru-XV-2012/kepek/02.webp",
      "/geppark/Subaru-XV-2012/kepek/03.webp",
      "/geppark/Subaru-XV-2012/kepek/04.webp",
      "/geppark/Subaru-XV-2012/kepek/05.webp",
      "/geppark/Subaru-XV-2012/kepek/06.webp",
      "/geppark/Subaru-XV-2012/kepek/07.webp",
      "/geppark/Subaru-XV-2012/kepek/08.webp"
    ],
    "leiras": "Praktikus, ezüst színű Subaru XV crossover, a márkára jellemző szimmetrikus, állandó összkerékhajtással (Symmetrical AWD) és megbízható, gazdaságos 2.0 literes dízelmotorral (80 kW / 109 LE). Magasított terepjáró alapon, robusztus küszöb- és sárvédőidomokkal, könnyűfém felnikkel — kiváló választás mindenes, időjárástól független napi használatra. Garantált, leinformálható 237 170 km-es futásteljesítmény. Érvényes magyar rendszámmal (AOTM-241) és teljes, rendezett magyar okmányokkal, azonnal, várakozás nélkül elvihető."
  },
  {
    "id": "bmw-530d-xdrive-2011",
    "marka": "BMW",
    "modell": "530d xDrive Touring (F11)",
    "evjarat": 2011,
    "ar": "4 200 000 Ft",
    "futasteljesitmeny": "249 000 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/fo.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/0c459ba9-c459-4a3a-be4c-275e80d82eff.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/1bcf3656-78aa-4f87-a1aa-88f99e8b0d39.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/2e60c3e9-01ff-4630-8453-6a163a669604.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/2ee2d804-2f73-4b59-86ca-6ebd5555ecdd.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/35637593-6099-4b69-927b-7feaa9485982.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/6760a834-285b-484f-85b4-aee962b8f42b.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/6e0a238a-6971-4621-93ec-87dfc43fb73e.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/7b8838b9-aa39-4bac-ad22-e1157c60c217.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/81b9fea9-0d96-4a65-b955-e835416b0b89.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/a967a5b1-2fda-407f-ab14-48ba2146ea0b.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/b43e3f06-7d9f-438a-8d5a-90de4de8e24c.webp",
      "/geppark/BMW-F11-530d-xDrive-2011-zold/kepek/c9c55166-6d09-401c-badc-3944ee285fc7.webp"
    ],
    "leiras": "Ritkaságszámba menő, zöld metálfényezésű BMW 530d xDrive Touring (F11), a sorozat legerősebb és legjobban felszerelt dízel-összkerekes változata. Erőteljes, 3.0 literes dízelmotorral (190 kW / 258 LE) és állandó xDrive összkerékhajtással szerelve, amely minden évszakban biztos tapadást és magabiztos vezetést garantál. 249 000 km-es futásteljesítmény. Érvényes magyar rendszámmal (AORA-931), magyar forgalomba helyezve, rendben lévő magyar okmányokkal kerül értékesítésre."
  }
];

export function getCarById(id: string): Car | undefined {
  return inventory.find((car) => car.id === id);
}

export function parsePriceToNumber(price: string): number {
  const normalized = price.replace(/[^\d]/g, "");
  if (!normalized) return 0;
  return Number.parseInt(normalized, 10);
}

/**
 * A "187 143 km" alakú futásteljesítményt számmá alakítja a strukturált adathoz.
 *
 * A Google jármű-hirdetés sémája a `mileageFromOdometer` mezőben tiszta számot
 * vár, mértékegységgel külön megadva. Ahol az adat "N/A", ott `null`-t adunk
 * vissza, és a mezőt egyszerűen kihagyjuk a sémából – a hiányzó mező sokkal
 * jobb, mint egy kitalált vagy nullás érték.
 */
export function parseMileageToNumber(mileage: string): number | null {
  const normalized = mileage.replace(/[^\d]/g, "");
  if (!normalized) return null;
  return Number.parseInt(normalized, 10);
}
