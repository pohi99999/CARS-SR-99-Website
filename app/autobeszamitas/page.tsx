import type { Metadata } from "next";
import TradeInForm from "@/components/TradeInForm";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Autóbeszámítás",
  description: "Kényelmes, gyors és korrekt autóbeszámítás Zalaegerszegen. Kérjen előzetes értékbecslést a CARS SR99 Kft.-től!",
  alternates: {
    canonical: `${siteUrl}/autobeszamitas`,
  },
};

export default function TradeInPage() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/hatter1.webp')] bg-cover bg-center bg-no-repeat py-12">
      {/* Sötét gradiens overlay réteg elmosás nélkül */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/30 to-[#121212]/60 pointer-events-none" />
      
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-6 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-8">
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
              Autóbeszámítás
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Kényelmes, gyors és korrekt értékbecslés
            </h1>
            <p className="mt-4 leading-7 text-slate-300">
              A CARS SR99 Kft.-nél egyszerűen beszámíttathatja jelenlegi autóját új járműve
              vásárlásába. Előzetes adatai alapján gyors visszajelzést adunk, majd személyes
              állapotfelméréssel pontos ajánlatot készítünk.
            </p>

            <div className="mt-8 space-y-4 text-sm text-slate-300">
              <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
                <h2 className="font-semibold text-sky-300">Miért érdemes nálunk beszámíttatni?</h2>
                <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-300">
                  <li>Gyors folyamat és transzparens, piaci értékbecslés.</li>
                  <li>Egyszerű ügyintézés, egy helyen minden papírmunka.</li>
                  <li>Prémium ügyfélélmény és korrekt hozzáállás.</li>
                </ul>
              </div>

              <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
                <h2 className="font-semibold text-sky-300">Ságodi telephelyi állapotfelmérés</h2>
                <p className="mt-2 leading-6 text-slate-300">
                  A végső állapotfelmérés a ságodi telephelyen történik, ahol biztonságos, rendezett
                  környezetben végezzük el a részletes vizsgálatot.
                </p>
              </div>
            </div>
          </div>

          <TradeInForm />
        </div>
      </section>
    </div>
  );
}
