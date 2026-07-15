"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarRange, Fuel, Gauge, Scale } from "lucide-react";
import Tilt from "react-parallax-tilt";
import type { Car } from "@/data/inventory";
import { useCompareStore } from "@/store/compareStore";
import { trackViewContent } from "@/utils/analytics";

type CarCardProps = {
  car: Car;
};

const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWEyODMzIi8+PC9zdmc+";

export default function CarCard({ car }: CarCardProps) {
  const addCar = useCompareStore((state) => state.addCar);

  return (
    <Tilt tiltMaxAngleX={4} tiltMaxAngleY={4} glareEnable glareMaxOpacity={0.08} className="h-full">
      <article className="flex w-full max-w-full h-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-sky-500/40 hover:shadow-[inset_0_0_20px_rgba(56,189,248,0.15),0_24px_55px_rgba(0,0,0,0.5)] dark:border-white/10 dark:bg-white/5">
        <div className="relative w-full aspect-[16/10] sm:aspect-auto sm:h-56 md:h-64 overflow-hidden bg-slate-900 rounded-t-xl">
          <Image
            src={car.images[0]}
            alt={`${car.marka} ${car.modell} - CARS SR99 Kft. Zalaegerszeg`}
            width={1200}
            height={800}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-110"
          />
          <div className="absolute top-3 left-3 rounded-full border border-sky-400/30 bg-black/60 px-3 py-1 text-xs font-light uppercase tracking-widest text-sky-300 backdrop-blur-sm z-10">
            {car.marka}
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between space-y-5 p-5">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-bold tracking-tight text-slate-100">{car.modell}</h3>
              <button
                type="button"
                aria-label="Autó hozzáadása az összehasonlításhoz"
                onClick={() =>
                  addCar({
                    id: car.id,
                    marka: car.marka,
                    modell: car.modell,
                    ar: car.ar,
                    futasteljesitmeny: car.futasteljesitmeny,
                    uzemanyag: car.uzemanyag,
                    image: car.images[0],
                  })
                }
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/20 text-slate-300 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400/10 hover:text-sky-300"
              >
                <Scale size={16} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 text-xs font-light text-slate-200">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <CalendarRange size={13} className="text-sky-400" />
                {car.evjarat}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <Gauge size={13} className="text-sky-400" />
                {car.futasteljesitmeny}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                <Fuel size={13} className="text-sky-400" />
                {car.uzemanyag}
              </span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex items-baseline justify-between border-t border-white/10 pt-3">
              <span className="text-xs font-light uppercase tracking-wider text-slate-400">Vételár:</span>
              <p className="text-2xl font-extrabold tracking-tight text-sky-400">{car.ar}</p>
            </div>

            <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2 text-xs font-medium text-emerald-300">
              ✓ JSZP ellenőrzött futásteljesítmény & kártörténet
            </div>

            <Link
              href={`/kinalat/${car.id}`}
              onClick={() =>
                trackViewContent(`${car.marka} ${car.modell}`, car.marka, {
                  car_id: car.id,
                  price: car.ar,
                })
              }
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(56,189,248,0.25)] transition-all duration-300 hover:bg-sky-400 hover:shadow-[0_0_28px_rgba(56,189,248,0.45)] btn-shimmer hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              Részletek megtekintése
            </Link>
          </div>
        </div>
      </article>
    </Tilt>
  );
}
