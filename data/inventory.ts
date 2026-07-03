export interface Car {
  id: string;
  marka: string;
  modell: string;
  evjarat: number;
  ar: string;
  futasteljesitmeny: string;
  uzemanyag: string;
  imageUrl: string;
}

export const inventory: Car[] = [
  {
    id: "toyota-corolla-hybrid-2020",
    marka: "Toyota",
    modell: "Corolla 1.8 Hybrid Comfort",
    evjarat: 2020,
    ar: "7 990 000 Ft",
    futasteljesitmeny: "78 500 km",
    uzemanyag: "Hibrid",
    imageUrl: "https://placehold.co/1200x800/2B2B2B/FFFFFF?text=Toyota+Corolla+Hybrid",
  },
  {
    id: "toyota-c-hr-hybrid-2021",
    marka: "Toyota",
    modell: "C-HR 2.0 Hybrid Selection",
    evjarat: 2021,
    ar: "10 490 000 Ft",
    futasteljesitmeny: "62 300 km",
    uzemanyag: "Hibrid",
    imageUrl: "https://placehold.co/1200x800/1f2937/FFFFFF?text=Toyota+C-HR+Hybrid",
  },
  {
    id: "kia-ceed-2021",
    marka: "Kia",
    modell: "Ceed 1.5 T-GDi Gold",
    evjarat: 2021,
    ar: "8 490 000 Ft",
    futasteljesitmeny: "54 900 km",
    uzemanyag: "Benzin",
    imageUrl: "https://placehold.co/1200x800/334155/FFFFFF?text=Kia+Ceed",
  },
  {
    id: "toyota-rav4-hybrid-2019",
    marka: "Toyota",
    modell: "RAV4 2.5 Hybrid Executive",
    evjarat: 2019,
    ar: "12 990 000 Ft",
    futasteljesitmeny: "96 100 km",
    uzemanyag: "Hibrid",
    imageUrl: "https://placehold.co/1200x800/111827/FFFFFF?text=Toyota+RAV4+Hybrid",
  },
];

export function getCarById(id: string): Car | undefined {
  return inventory.find((car) => car.id === id);
}

export function parsePriceToNumber(price: string): number {
  const normalized = price.replace(/[^\d]/g, "");
  return Number.parseInt(normalized, 10);
}
