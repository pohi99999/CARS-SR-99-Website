"use client";

import CarCard from "@/components/CarCard";
import { motion } from "framer-motion";
import type { Car } from "@/data/inventory";

type InventorySectionProps = {
  cars: Car[];
};

export default function InventorySection({ cars }: InventorySectionProps) {
  return (
    <motion.section
      id="kinalat"
      className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">Kínálatunk</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
          Kiemelt járművek
        </h2>
        <p className="mt-3 max-w-2xl text-slate-300">
          Válogatott, ellenőrzött állapotú autók, amelyek azonnal elérhetők a CARS SR99 Kft.
          kínálatában.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </motion.section>
  );
}
