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
    "id": "bmw-f11-525d-2011",
    "marka": "BMW",
    "modell": "525d Touring",
    "evjarat": 2011,
    "ar": "3 000 000 Ft",
    "futasteljesitmeny": "328 000 km",
    "uzemanyag": "Dízel",
    "images": [
      "/geppark/BMW-F11-525d-2011-kész/kepek/fo.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/700625924_26848240874831794_5695255001336472459_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/701003993_26848240658165149_5815972029683789885_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/701850818_26848240854831796_2671052156454726575_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/701889714_26848240728165142_7969451141186142584_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/701895417_26848240964831785_2913644564449440468_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/701986575_26848240891498459_1566550878782385993_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/702259456_26848240951498453_5406929959027904741_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/702621220_26848240804831801_2868227109319465196_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/702931012_26848240698165145_1724074620596642309_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/703249970_26848240934831788_8489188074172428599_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/703281106_26848240968165118_5780817796379390668_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/703394592_26848240824831799_8332901136968105059_n.webp",
      "/geppark/BMW-F11-525d-2011-kész/kepek/703433759_26848240678165147_4509699988442771353_n.webp"
    ],
    "leiras": "Megkímélt állapotú, elegáns BMW 525d Touring (F11), kényelmes panorámatetővel és sportos, ültetett futóművel szerelve. Hatfokozatú manuális váltóval rendelkező, megbízható 2.0 literes dízel (1995 ccm) változat. A járművön nemrégiben elvégzésre került a hajtókar- és főtengelycsapágyak, valamint a vezérműlánc cseréje, így műszakilag teljesen megbízható. Korának megfelelő, gyönyörű külső és belső állapot. Érvényes magyar okmányokkal rendelkezik, a forgalomba helyezésben teljes körű segítséget nyújtunk."
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
    "leiras": "Elegáns alpesi fehér fényezésű BMW 5-ös sorozat (F11) Touring, a közkedvelt és megbízható N47-es dízelmotorral (218 LE). Kiváló esztétikai és műszaki állapot, tágas és kényelmes utastér jellemzi. Kiváló utazóautó mindennapi használatra vagy hosszabb távokra egyaránt. Rendszáma: BL-969FY."
  },
  {
    "id": "citroen-jumpy-spacetourer-2017",
    "marka": "Citroën",
    "modell": "Jumpy Spacetourer (8 személyes)",
    "evjarat": 2017,
    "ar": "7 600 000 Ft",
    "futasteljesitmeny": "154 000 km",
    "uzemanyag": "Dízel",
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
    "leiras": "Megkímélt állapotú, elegáns fekete metálfényezésű Ford Kuga a legmagasabb Titanium felszereltséggel és intelligens 4WD összkerékhajtással. A megbízható 2.0 TDCi (140 LE) motorral és kényelmes Powershift automataváltóval szerelve. Rendszeresen karbantartott, rozsdamentes karosszéria, esztétikai apróbb használati nyomokkal. Kulcs nélküli indítás, kétzónás digitális klíma, navigáció, tempomat és tolatóradar jellemzi. Költségmentes, megbízható crossover, érvényes magyar okmányokkal és 2028-ig tartó műszaki vizsgával."
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
    "leiras": "Rendkívül népszerű, modern Skoda Octavia Combi DSG automataváltóval és a rendkívül takarékos 2.0 TDI (150 LE) motorral. 293 600 km-t futott, folyamatosan karbantartott és megbízható állapotú jármű. Tágas, funkcionális belső tér, kiváló ergonómia és gazdag felszereltség jellemzi, amely ideálissá teszi akár üzleti, akár családi használatra. Rendszáma: HO-534CJ."
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
