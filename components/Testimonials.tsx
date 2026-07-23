"use client";

import { Star } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const testimonials = [
  {
    title: "Gördülékeny ügyintézés",
    quote:
      "A teljes folyamat gyors és professzionális volt, a csapat minden kérdésemre azonnal reagált.",
    author: "Kovács Ádám",
  },
  {
    title: "Korrekt autóbeszámítás",
    quote:
      "Pontos, tiszta ajánlatot kaptam beszámításra. Nincs rejtett költség, csak korrekt hozzáállás.",
    author: "Tóth Réka",
  },
  {
    title: "Valós JSZP adatok",
    quote:
      "A JSZP-ben látott információk teljesen egyeztek a helyszíni állapottal, ez nagy bizalmat adott.",
    author: "Nagy Gábor",
  },
];

export default function Testimonials() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
      <div className="mb-8">
        <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Ügyfélvélemények</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-white to-slate-400">
          Visszajelzések, amelyek igazolják a minőséget
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {testimonials.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-black/10 bg-black/5 p-6 shadow-md backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5"
          >
            <div className="mb-3 flex items-center gap-1 text-amber-400">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={`${item.title}-${index}`} size={16} fill="currentColor" />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-slate-100">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 font-light text-slate-300">“{item.quote}”</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-sky-300">{item.author}</p>
          </article>
        ))}
      </div>
      </m.section>
    </LazyMotion>
  );
}
