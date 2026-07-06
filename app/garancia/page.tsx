import type { Metadata } from "next";
import { ShieldCheck, FileText, Car } from "lucide-react";

export const metadata: Metadata = {
  title: "Garancia & Biztonság | CARS SR99 Kft.",
  description: "Biztonságos autóvásárlás, 12 hónapos szervizgarancia és JSZP ellenőrzött prémium járművek a CARS SR99 Kft.-nél Zalaegerszegen.",
  alternates: {
    canonical: "https://cars-sr99.vercel.app/garancia",
  },
};

export default function GaranciaPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-6 lg:px-8 text-slate-100">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
          CARS SR99 Kft.
        </p>
        <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
          Garancia & Biztonság
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Az SR99 filozófia mentén az Ön biztonsága és a zökkenőmentes használat az elsődleges szempontunk.
          Válogatott modelljeink mellé átlátható és megbízható garanciális hátteret nyújtunk.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mt-12">
        {/* Szervizgarancia Kártya */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col justify-between h-full">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 mb-6">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">12 Hónap Szervizgarancia</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Minden nálunk vásárolt autóhoz 12 hónapos szervizgaranciát biztosítunk. Célunk, hogy az indulástól kezdve teljes biztonságban érezhesse magát az úton, váratlan műszaki hibák nélkül.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-xs text-slate-400 font-medium">Gondtalan használat és biztonság</span>
          </div>
        </div>

        {/* JSZP Ellenőrzés Kártya */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col justify-between h-full">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 mb-6">
              <FileText className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">JSZP Előélet-ellenőrzés</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Nálunk nincs zsákbamacska. Kínálatunk összes járműve ellenőrzött kártörténettel és a Jármű Szolgáltatási Platform (JSZP) által igazolt kilométeróra-állással rendelkezik a teljes transzparencia jegyében.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-xs text-slate-400 font-medium">100% leinformálható járművek</span>
          </div>
        </div>

        {/* Tesztvezetés Kártya */}
        <div className="rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur-md transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] flex flex-col justify-between h-full">
          <div>
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 mb-6">
              <Car className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Ságodi Tesztvezetés</h3>
            <p className="text-sm leading-relaxed text-slate-300">
              Győződjön meg a kiszemelt autó állapotáról személyesen! Zalaegerszeg-Ságod iparterületén fekvő telephelyünkön lehetőséget biztosítunk alapos átvizsgálásra, valamint tesztvezetésre is.
            </p>
          </div>
          <div className="mt-6 pt-4 border-t border-white/5">
            <span className="text-xs text-slate-400 font-medium">Próbálja ki a telephelyünkön</span>
          </div>
        </div>
      </div>
    </div>
  );
}
