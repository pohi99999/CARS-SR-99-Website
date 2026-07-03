"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarRange, Fuel, Gauge, Scale } from "lucide-react";
import Tilt from "react-parallax-tilt";
import type { Car } from "@/data/inventory";
import { useCompareStore } from "@/store/compareStore";

type CarCardProps = {
  car: Car;
};

const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWEyODMzIi8+PC9zdmc+";

export default function CarCard({ car }: CarCardProps) {
  const addCar = useCompareStore((state) => state.addCar);

  return (
    <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} glareEnable glareMaxOpacity={0.1} className="h-full">
      <article className="overflow-hidden rounded-2xl border border-white/10 bg-[#161616]/90 shadow-[0_20px_45px_rgba(2,8,23,0.45)] transition duration-300 hover:-translate-y-1 hover:border-cyan-300/35 hover:shadow-[0_24px_55px_rgba(34,211,238,0.18)]">
        <div className="h-56 w-full overflow-hidden bg-slate-900 md:h-64">
          <Image
            src={car.images[0]}
            alt={`${car.marka} ${car.modell}`}
            width={1200}
            height={800}
            placeholder="blur"
            blurDataURL={blurDataUrl}
            className="h-full w-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        <div className="space-y-5 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">{car.marka}</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <h3 className="text-lg font-semibold text-slate-100">{car.modell}</h3>
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
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-500/80 text-slate-200 transition hover:border-cyan-300 hover:text-cyan-300"
              >
                <Scale size={16} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-200">
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/60 bg-slate-800/70 px-3 py-1.5">
              <CalendarRange size={13} className="text-cyan-300" />
              {car.evjarat}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/60 bg-slate-800/70 px-3 py-1.5">
              <Gauge size={13} className="text-cyan-300" />
              {car.futasteljesitmeny}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-slate-500/60 bg-slate-800/70 px-3 py-1.5">
              <Fuel size={13} className="text-cyan-300" />
              {car.uzemanyag}
            </span>
          </div>

          <p className="text-2xl font-extrabold tracking-tight text-cyan-300">{car.ar}</p>

          <div className="rounded-lg border border-emerald-200/35 bg-emerald-300/10 px-3 py-2 text-xs font-medium text-emerald-200">
            JSZP transzparencia: futásteljesítmény és kártörténet ellenőrzött.
          </div>

          <Link
            href={`/kinalat/${car.id}`}
            className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300/95 hover:shadow-[0_0_20px_rgba(34,211,238,0.28)]"
          >
            Részletek
          </Link>
        </div>
      </article>
    </Tilt>
  );
}
