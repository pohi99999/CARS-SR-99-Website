"use client";

import { motion } from "framer-motion";

export default function WarrantySection() {
  return (
    <motion.section
      className="bg-[#2B2B2B]/80 py-16 text-slate-100 backdrop-blur-sm"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">SR99 Garancia</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          12 hónapos Real Garant kiterjesztett védelem
        </h2>
        <p className="mt-4 max-w-3xl text-slate-300">
          Az SR99 Alagút szemlélete szerint ügyfeleink számára az akadálytalan haladás alapérték.
          Ezért a kiválasztott járműveinkhez elérhető 12 hónapos Real Garant programmal extra
          biztonságot nyújtunk.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border border-black/10 bg-black/5 p-5 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold text-cyan-300">Motorvédelem</h3>
            <p className="mt-2 text-sm text-slate-300">
              Kiterjesztett fedezet a fő motoralkatrészekre, hogy hosszú távon is magabiztos legyen
              minden indulás.
            </p>
          </article>

          <article className="rounded-xl border border-black/10 bg-black/5 p-5 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold text-cyan-300">Váltóvédelem</h3>
            <p className="mt-2 text-sm text-slate-300">
              Manuális és automata váltó kritikus elemeinek védelme a váratlan javítási költségek
              csökkentésére.
            </p>
          </article>

          <article className="rounded-xl border border-black/10 bg-black/5 p-5 backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
            <h3 className="text-lg font-semibold text-cyan-300">Akadálytalan haladás</h3>
            <p className="mt-2 text-sm text-slate-300">
              Transzparens tájékoztatás, megbízható háttér és prémium ügyfélélmény az SR99 alagút
              filozófiája mentén.
            </p>
          </article>
        </div>
      </div>
    </motion.section>
  );
}
