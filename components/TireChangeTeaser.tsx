"use client";

import Link from "next/link";
import { Wrench, Clock } from "lucide-react";
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
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
              <Wrench className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-white">Kerékcsere és gumicsere</h2>
                <span className="inline-flex items-center gap-1 rounded-full border border-sky-400/40 bg-sky-400/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-sky-300">
                  <Clock className="h-3 w-3" />
                  Hamarosan
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                Új szolgáltatásunk hamarosan indul: szezonális gumicsere, kiegyensúlyozás és gumiszerviz
                a ságodi telephelyen.
              </p>
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
