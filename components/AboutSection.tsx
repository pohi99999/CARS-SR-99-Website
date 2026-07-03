import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
        <div className="relative overflow-hidden rounded-2xl border border-black/10 bg-black/5 shadow-xl backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#121212]/70 via-transparent to-cyan-500/20" />
          <Image
            src="https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=1600&q=80"
            alt="CARS SR99 Kft. telephely és csapat"
            width={1600}
            height={1000}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl border border-black/10 bg-black/5 p-7 shadow-lg backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Rólunk</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Szakértelem, transzparencia, modern infrastruktúra
          </h2>
          <p className="mt-4 leading-7 text-slate-300">
            A CARS SR99 Kft.-nél hiszünk abban, hogy egy prémium autóvásárlási élmény alapja a
            szakmailag felkészült támogatás és a teljes átláthatóság.
          </p>
          <p className="mt-4 leading-7 text-slate-300">
            Járműveinknél kiemelten kezeljük a JSZP ellenőrzött előéletet, hogy ügyfeleink valós és
            megbízható információk alapján dönthessenek.
          </p>
          <p className="mt-4 leading-7 text-slate-300">
            A Ságodi Iparterület kiváló infrastruktúrája biztonságos megtekintést, kényelmes
            tesztvezetést és gördülékeny ügyintézést biztosít minden érdeklődőnek.
          </p>
        </div>
      </div>
    </section>
  );
}
