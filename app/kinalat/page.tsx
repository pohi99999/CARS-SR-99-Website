import type { Metadata } from "next";
import InventorySection from "@/components/InventorySection";
import { fetchInventory } from "@/services/inventoryService";

export const metadata: Metadata = {
  title: "Kínálatunk",
  description: "Fedezze fel a CARS SR99 Kft. teljes, JSZP-ellenőrzött Toyota és Kia kínálatát Zalaegerszegen!",
  alternates: {
    canonical: "https://cars-sr99.vercel.app/kinalat",
  },
};

export default async function KinalatPage() {
  const cars = await fetchInventory();

  return (
    <div className="py-10">
      <InventorySection cars={cars} />
    </div>
  );
}
