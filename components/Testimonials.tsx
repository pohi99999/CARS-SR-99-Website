import { Star } from "lucide-react";

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
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Ügyfélvélemények</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
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
            <p className="mt-3 text-sm leading-6 text-slate-300">“{item.quote}”</p>
            <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-cyan-300">{item.author}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
