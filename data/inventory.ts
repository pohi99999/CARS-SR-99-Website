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
    id: "toyota-corolla-hybrid-2020",
    marka: "Toyota",
    modell: "Corolla 1.8 Hybrid Comfort",
    evjarat: 2020,
    ar: "7 990 000 Ft",
    futasteljesitmeny: "78 500 km",
    uzemanyag: "Hibrid",
    images: [
      "https://images.unsplash.com/photo-1549924231-f129b911e442?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1611242320536-f12d3541249b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "toyota-c-hr-hybrid-2021",
    marka: "Toyota",
    modell: "C-HR 2.0 Hybrid Selection",
    evjarat: 2021,
    ar: "10 490 000 Ft",
    futasteljesitmeny: "62 300 km",
    uzemanyag: "Hibrid",
    images: [
      "https://images.unsplash.com/photo-1606016159991-35b57f59f8d6?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "kia-ceed-2021",
    marka: "Kia",
    modell: "Ceed 1.5 T-GDi Gold",
    evjarat: 2021,
    ar: "8 490 000 Ft",
    futasteljesitmeny: "54 900 km",
    uzemanyag: "Benzin",
    images: [
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1617195737496-0f9e6a8322d8?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    id: "toyota-rav4-hybrid-2019",
    marka: "Toyota",
    modell: "RAV4 2.5 Hybrid Executive",
    evjarat: 2019,
    ar: "12 990 000 Ft",
    futasteljesitmeny: "96 100 km",
    uzemanyag: "Hibrid",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1592853598062-87a00fc193ed?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];

export function getCarById(id: string): Car | undefined {
  return inventory.find((car) => car.id === id);
}

export function parsePriceToNumber(price: string): number {
  const normalized = price.replace(/[^\d]/g, "");
  return Number.parseInt(normalized, 10);
}
