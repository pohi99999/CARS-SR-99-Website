export interface Car {
  id: string;
  marka: string;
  modell: string;
  evjarat: number;
  ar: string;
  futasteljesitmeny: string;
  uzemanyag: string;
  images: string[];
}

export const inventory: Car[] = [
  {
    id: "audi-a4-avant-2017",
    marka: "Audi",
    modell: "A4 Avant Design S-tronic",
    evjarat: 2017,
    ar: "3 000 000 Ft",
    futasteljesitmeny: "187 143 km",
    uzemanyag: "Dízel",
    images: [
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0782.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0775.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0776.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0777.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0778.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0779.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0780.webp",
      "/geppark/Audi-A4-Avant-2017/kepek/IMG_0781.webp"
    ]
  },
  {
    id: "bmw-f11-525d-2011",
    marka: "BMW",
    modell: "F11 525d",
    evjarat: 2011,
    ar: "Kérjen ajánlatot",
    futasteljesitmeny: "N/A",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-f11-530d-xdrive-2011",
    marka: "BMW",
    modell: "F11 530d xDrive Aura",
    evjarat: 2011,
    ar: "2 900 000 Ft",
    futasteljesitmeny: "528 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-f11-n47-feher-2011",
    marka: "BMW",
    modell: "F11 (N47 motor)",
    evjarat: 2011,
    ar: "3 800 000 Ft",
    futasteljesitmeny: "N/A",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-f11-xdrive-2011-fekete",
    marka: "BMW",
    modell: "F11 xDrive (fekete)",
    evjarat: 2011,
    ar: "3 300 000 Ft",
    futasteljesitmeny: "210 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-f11-xdrive-2011-zold",
    marka: "BMW",
    modell: "F11 xDrive (zöld)",
    evjarat: 2011,
    ar: "3 800 000 Ft",
    futasteljesitmeny: "249 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-f11-xdrive-2013-fekete",
    marka: "BMW",
    modell: "F11 xDrive (fekete)",
    evjarat: 2013,
    ar: "3 300 000 Ft",
    futasteljesitmeny: "256 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "bmw-x6-4-0d",
    marka: "BMW",
    modell: "X6 4.0D",
    evjarat: 2012,
    ar: "5 000 000 Ft",
    futasteljesitmeny: "325 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "citroen-jumpy-spacetourer-2017",
    marka: "Citroën",
    modell: "Jumpy Spacetourer",
    evjarat: 2017,
    ar: "7 500 000 Ft",
    futasteljesitmeny: "156 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "ford-kuga-titanium-2011",
    marka: "Ford",
    modell: "Kuga Titanium",
    evjarat: 2011,
    ar: "1 549 000 Ft",
    futasteljesitmeny: "138 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "ford-mondeo-2009",
    marka: "Ford",
    modell: "Mondeo",
    evjarat: 2009,
    ar: "860 000 Ft",
    futasteljesitmeny: "211 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "jaguar-f-pace-2017",
    marka: "Jaguar",
    modell: "F-Pace 20d AWD",
    evjarat: 2017,
    ar: "6 900 000 Ft",
    futasteljesitmeny: "88 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "seat-alhambra-2015",
    marka: "Seat",
    modell: "Alhambra",
    evjarat: 2015,
    ar: "3 000 000 Ft",
    futasteljesitmeny: "290 000 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "skoda-octavia-2020-dsg",
    marka: "Skoda",
    modell: "Octavia DSG",
    evjarat: 2020,
    ar: "5 000 000 Ft",
    futasteljesitmeny: "293 600 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "skoda-octavia-2022-kezi",
    marka: "Skoda",
    modell: "Octavia (kézi váltó)",
    evjarat: 2022,
    ar: "5 300 000 Ft",
    futasteljesitmeny: "217 700 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
  },
  {
    id: "subaru-xv-2012",
    marka: "Subaru",
    modell: "XV",
    evjarat: 2012,
    ar: "1 800 000 Ft",
    futasteljesitmeny: "237 170 km",
    uzemanyag: "Dízel",
    images: ["/hero-poster.webp"]
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
