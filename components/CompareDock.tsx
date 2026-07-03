"use client";

import Image from "next/image";
import Link from "next/link";
import { Scale, Trash2 } from "lucide-react";
import { useCompareStore } from "@/store/compareStore";

export default function CompareDock() {
  const { cars, clearCompare } = useCompareStore();

  if (cars.length === 0) {
    return null;
  }

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/10 bg-[#141414]/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 overflow-x-auto">
          {cars.map((car) => (
            <div key={car.id} className="flex min-w-[120px] items-center gap-2 rounded-lg bg-white/5 p-2">
              <Image
                src={car.image}
                alt={`${car.marka} ${car.modell}`}
                width={56}
                height={40}
                className="h-10 w-14 rounded object-cover"
              />
              <p className="line-clamp-2 text-xs font-medium text-slate-100">
                {car.marka} {car.modell}
              </p>
            </div>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className="inline-flex items-center gap-1 rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-slate-200 transition hover:border-white/40"
          >
            <Trash2 size={14} />
            Törlés
          </button>
          <Link
            href="/osszehasonlitas"
            className="inline-flex items-center gap-1 rounded-full bg-cyan-400 px-4 py-2 text-xs font-semibold text-[#1f2937] transition hover:bg-cyan-300"
          >
            <Scale size={14} />
            Összehasonlítás ({cars.length}/3)
          </Link>
        </div>
      </div>
    </aside>
  );
}
