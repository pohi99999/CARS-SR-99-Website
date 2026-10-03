"use client";

import Image from "next/image";
import { Award } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

// Arany Vállalkozás 2026 (Péter, 2026-10-03). The text only says what the plaque itself says;
// the plaque does not name the organisation behind the ranking, so neither does this block.
export default function AwardBand() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        aria-labelledby="award-title"
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid items-center gap-8 rounded-2xl border border-black/10 bg-black/5 p-6 shadow-lg backdrop-blur-md transition-all duration-300 sm:p-8 md:grid-cols-[minmax(0,300px)_1fr] dark:border-white/10 dark:bg-white/5">
          <div className="mx-auto w-full max-w-[300px] overflow-hidden rounded-2xl border border-amber-300/30 shadow-xl">
            <Image
              src="/dijak/arany-vallalkozas-2026.webp"
              alt="Arany Vállalkozás 2026 plakett: Rangsor díjazottja, CARS SR99 Kft."
              width={906}
              height={958}
              sizes="(max-width: 768px) 80vw, 300px"
              className="h-auto w-full"
            />
          </div>

          <div>
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Elismerés</p>
            <h2
              id="award-title"
              className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400"
            >
              Arany Vállalkozás 2026
            </h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-sm font-semibold text-amber-300">
              <Award size={16} aria-hidden="true" />
              Rangsor díjazottja
            </p>
            <p className="mt-5 max-w-2xl leading-7 font-light text-slate-300">
              A díjat a hiteles értékeléseket tartalmazó webhelyek értékelései alapján ítélik oda. Az
              adatok összegyűjtése és elemzése után a CARS SR99 Kft. a legjobban értékelt
              magyarországi vállalkozások közé került.
            </p>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
