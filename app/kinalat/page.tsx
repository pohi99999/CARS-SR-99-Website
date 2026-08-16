import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import InventorySection from "@/components/InventorySection";
import { parsePriceToNumber } from "@/data/inventory";
import { fetchInventory } from "@/services/inventoryService";
import { absoluteUrl, businessId, siteUrl } from "@/utils/site";

export const metadata: Metadata = {
  title: "Használt autók Zalaegerszegen – Teljes kínálat",
  description:
    "Eladó használt autók Zalaegerszegen: BMW, Audi, Skoda, Toyota és további JSZP-ellenőrzött járművek a CARS SR99 Kft. kínálatában. Beszámítás és lízing ügyintézés helyben.",
  alternates: {
    canonical: `${siteUrl}/kinalat`,
  },
  openGraph: {
    title: "Használt autók Zalaegerszegen – CARS SR99 Kft. kínálata",
    description:
      "Eladó használt autók Zalaegerszegen: BMW, Audi, Skoda, Toyota és további JSZP-ellenőrzött járművek a CARS SR99 Kft. kínálatában.",
    url: `${siteUrl}/kinalat`,
    siteName: "CARS SR99 Kft.",
    locale: "hu_HU",
    type: "website",
  },
};

export default async function KinalatPage() {
  const cars = await fetchInventory();

  // Strukturált járműlista. Ennek két haszna van:
  // 1. A Google explicit, gépi olvasható listát kap mind a 12 adatlap URL-jéről,
  //    árral és képpel együtt – ez segít abban, hogy a "felfedezve, de nem
  //    indexelt" állapotban ragadt adatlapokat végre feltérképezze.
  // 2. A kínálat oldal ettől nem pusztán egy linkgyűjtemény, hanem egy
  //    értelmezhető készlet, amit a kereső a keresési szándékhoz tud mérni.
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "CARS SR99 Kft. használt autó kínálat – Zalaegerszeg",
    description:
      "A CARS SR99 Kft. zalaegerszegi telephelyén elérhető, ellenőrzött előéletű használt autók aktuális készlete.",
    numberOfItems: cars.length,
    itemListElement: cars.map((car, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Car",
        "@id": `${siteUrl}/kinalat/${car.id}`,
        url: `${siteUrl}/kinalat/${car.id}`,
        name: `${car.marka} ${car.modell}`,
        brand: { "@type": "Brand", name: car.marka },
        vehicleModelDate: String(car.evjarat),
        fuelType: car.uzemanyag,
        image: absoluteUrl(car.images[0]),
        offers: {
          "@type": "Offer",
          priceCurrency: "HUF",
          price: parsePriceToNumber(car.ar),
          availability: "https://schema.org/InStock",
          itemCondition: "https://schema.org/UsedCondition",
          seller: { "@id": businessId },
        },
      },
    })),
  };

  return (
    <div className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <div className="mx-auto mb-6 w-full max-w-7xl px-6 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ name: "Főoldal", href: "/" }, { name: "Kínálatunk" }]} />
        <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Kínálatunk</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Használt autók Zalaegerszegen
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Böngéssze a CARS SR99 Kft. ellenőrzött, prémium használt autóinak teljes választékát.
        </p>
      </div>
      <InventorySection cars={cars} />
    </div>
  );
}
