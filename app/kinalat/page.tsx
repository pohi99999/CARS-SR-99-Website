import InventorySection from "@/components/InventorySection";
import { fetchInventory } from "@/services/inventoryService";

export const metadata = {
  title: "Kínálatunk",
  description: "A CARS SR99 Kft. teljes, JSZP-ellenőrzött járműkínálata.",
};

export default async function KinalatPage() {
  const cars = await fetchInventory();

  return (
    <div className="py-10">
      <InventorySection cars={cars} />
    </div>
  );
}
