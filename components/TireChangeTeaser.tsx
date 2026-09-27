"use client";

import Image from "next/image";
import Link from "next/link";
import { Wrench } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function TireChangeTeaser() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="bg-[#111827] py-12 text-slate-100 border-y border-slate-800/80"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex w-full flex-col gap-5 sm:w-auto sm:flex-row sm:items-center">
            {/* A műhely áttekintő fotója: mobilon teljes szélességben a szöveg fölött, sm felett mellette. */}
            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl border border-slate-700/60 sm:w-56">
              <Image
                src="/kerekcsere/2026-09-27-muhely-attekintes.webp"
                alt="A CARS SR99 gumiszervizének műhelye: oszlopos emelő, centírozógép és gumiszerelő gép"
                fill
                sizes="(max-width: 639px) 100vw, 224px"
                className="object-cover"
              />
            </div>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Kerékcsere és gumicsere</h2>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Új szolgáltatásunk elérhető: szezonális gumicsere, kiegyensúlyozás és gumiszerviz
                a ságodi telephelyen.
              </p>
            </div>
          </div>
          </div>
          <Link
            href="/kerekcsere"
            className="inline-flex w-full shrink-0 items-center justify-center rounded-full border-2 border-sky-400 px-6 py-3 text-sm font-semibold text-sky-400 transition-all duration-300 ease-in-out hover:bg-sky-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] btn-shimmer hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
          >
            Kerékcsere részletei →
          </Link>
        </div>
      </m.section>
    </LazyMotion>
  );
}
