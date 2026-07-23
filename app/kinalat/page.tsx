import type { Metadata } from "next";
import InventorySection from "@/components/InventorySection";
import { fetchInventory } from "@/services/inventoryService";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Kínálatunk",
  description: "Fedezze fel a CARS SR99 Kft. teljes, JSZP-ellenőrzött Toyota és Kia kínálatát Zalaegerszegen!",
  alternates: {
    canonical: `${siteUrl}/kinalat`,
  },
};

export default async function KinalatPage() {
  const cars = await fetchInventory();

  return (
    <div className="py-10">
      <div className="mx-auto mb-6 w-full max-w-7xl px-6 sm:px-6 lg:px-8">
        <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Kínálatunk</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Teljes gépjármű kínálat
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-300">
          Böngéssze a CARS SR99 Kft. ellenőrzött, prémium használt autóinak teljes választékát.
        </p>
      </div>
      <InventorySection cars={cars} />
    </div>
  );
}
