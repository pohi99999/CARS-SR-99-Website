import CarCard from "@/components/CarCard";
import { inventory } from "@/data/inventory";

export default function InventorySection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">Kínálatunk</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#2B2B2B] sm:text-4xl">
          Kiemelt járművek
        </h2>
        <p className="mt-3 max-w-2xl text-slate-600">
          Válogatott, ellenőrzött állapotú autók, amelyek azonnal elérhetők a CARS SR99 Kft.
          kínálatában.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {inventory.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
