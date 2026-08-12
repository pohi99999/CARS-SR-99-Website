import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Autóbérlés Zalaegerszeg | Prémium autók bérbeadása - CARS SR99",
  description:
    "Prémium kategóriás autók bérlése Zalaegerszegen a CARS SR99 Kft.-től. Rugalmas feltételek, napi díjas konstrukciók megegyezés szerint. Tekintse meg kínálatunkat!",
  alternates: {
    canonical: `${siteUrl}/autoberles`,
  },
};

export default function CarRentalPage() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/hatter2.jpeg')] bg-cover bg-center bg-no-repeat py-12">
      {/* Sötét gradiens overlay réteg elmosás nélkül */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/30 to-[#121212]/60 pointer-events-none" />

      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 sm:px-6 lg:px-8">
        <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-8 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-12">
          <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
            Autóbérlés
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl lg:text-5xl">
            Prémium autók bérlése Zalaegerszegen
          </h1>
          <p className="mt-6 leading-7 text-slate-300">
            A CARS SR99 Kft. kínálatában szereplő prémium kategóriás Toyota és Kia modellek egyedi
            megegyezés alapján, napi díjas konstrukcióban is bérelhetők. Legyen szó üzleti útról,
            különleges alkalomról vagy átmeneti autóigényről, kollégáink rugalmas feltételekkel és
            személyre szabott ajánlattal állnak rendelkezésére.
          </p>

          <div className="mt-8 space-y-4 text-sm text-slate-300">
            <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
              <h2 className="font-semibold text-sky-300">Rugalmas, megegyezés szerinti feltételek</h2>
              <p className="mt-2 leading-6 text-slate-300">
                A bérlés díja és időtartama minden esetben egyedi egyeztetés eredménye, így pontosan
                az Ön igényeihez igazodó ajánlatot tudunk készíteni.
              </p>
            </div>

            <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
              <h2 className="font-semibold text-sky-300">Válogatott, ellenőrzött állapotú kínálat</h2>
              <p className="mt-2 leading-6 text-slate-300">
                A bérelhető autók ugyanabból a gondosan válogatott, ellenőrzött kártörténetű
                kínálatból kerülnek ki, amelyet értékesítésre is kínálunk.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/kinalat"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-sky-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-300 ease-in-out hover:bg-sky-400 hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] btn-shimmer hover:scale-[1.02] active:scale-[0.98]"
            >
              Kínálatunk megtekintése →
            </Link>
            <Link
              href="/kapcsolat"
              className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-sky-400 px-7 py-3.5 text-sm font-semibold text-sky-400 transition-all duration-300 ease-in-out hover:bg-sky-400/10 hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] btn-shimmer hover:scale-[1.02] active:scale-[0.98]"
            >
              Ajánlatkérés
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
