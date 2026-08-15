import Link from "next/link";
import { CarFront, Phone } from "lucide-react";

export default function CarNotFound() {
  return (
    <div className="py-16">
      <section className="mx-auto w-full max-w-3xl px-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-8 text-center shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg sm:p-12">
          <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
            Ez a jármű már nem elérhető
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Sajnáljuk, ezt az autót időközben eladtuk
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            A keresett jármű már nem szerepel a kínálatunkban. Kínálatunk azonban
            folyamatosan frissül – nézze meg jelenleg elérhető, JSZP-ellenőrzött
            autóinkat, vagy keressen minket, és szólunk, ha érkezik hasonló.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/kinalat"
              className="btn-shimmer inline-flex w-full items-center justify-center gap-2 rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
            >
              <CarFront className="h-4 w-4" aria-hidden="true" />
              Aktuális kínálatunk megtekintése
            </Link>

            <Link
              href="/kapcsolat"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10 sm:w-auto"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Érdeklődöm hasonló autó után
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
