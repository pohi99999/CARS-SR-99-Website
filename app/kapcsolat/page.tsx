import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Clock, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Lépjen kapcsolatba a CARS SR99 Kft. csapatával! Telephelyünk Zalaegerszeg Ságod hrsz. 807/15 alatt található.",
  alternates: {
    canonical: `${siteUrl}/kapcsolat`,
  },
};

export default function ContactPage() {
  return (
    <div className="relative w-full min-h-screen bg-[url('/hatter1.webp')] bg-cover bg-center bg-no-repeat py-12">
      {/* Sötét gradiens overlay réteg elmosás nélkül */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/50 via-[#121212]/30 to-[#121212]/60 pointer-events-none" />
      
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-6 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-8">
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Kapcsolat</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
              Vegye fel velünk a kapcsolatot
            </h1>
            <p className="mt-3 text-sm text-slate-300">
              Kérdése van valamelyik járművünkről, vagy tesztvezetést egyeztetne? Szakértő csapatunk készséggel áll rendelkezésére.
            </p>

            <div className="mt-8 space-y-6 text-sm text-slate-300">
              <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5 space-y-3">
                <h2 className="text-base font-semibold text-sky-300 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-sky-400" /> Elérhetőség & Telephely
                </h2>
                <p className="leading-6 text-slate-300">
                  <strong>CARS SR99 Kft.</strong>
                  <br />
                  8900 Zalaegerszeg, Ságod hrsz. 807/15
                </p>
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Phone className="h-4 w-4 text-sky-400" />
                  <a href="tel:+36709070669" className="hover:text-sky-300 transition">06-70 907-06-69</a>
                </div>
                <div className="flex items-center gap-2 text-slate-200 font-medium">
                  <Mail className="h-4 w-4 text-sky-400" />
                  <a href="mailto:carssr99@gmail.com" className="hover:text-sky-300 transition">carssr99@gmail.com</a>
                </div>
              </div>

              <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-white/5 p-5">
                <h2 className="text-base font-semibold text-sky-300 flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-400" /> Nyitvatartási idő
                </h2>
                <p className="mt-2 leading-6 text-slate-300">
                  Hétfő-Péntek: 09:00-17:00
                  <br />
                  Szombat: Előre egyeztetett időpontban
                  <br />
                  Vasárnap: Zárva
                </p>
              </div>

              <div className="rounded-xl border-t border-l border-r border-b border-t-white/15 border-l-white/10 border-r-white/5 border-b-white/5 bg-sky-500/10 p-5 space-y-2 text-slate-200">
                <h2 className="text-base font-semibold text-sky-300 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-sky-400" /> Bizalomépítő garanciáink
                </h2>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-slate-300">
                  <li>⚡ <strong>Garantált válaszidő:</strong> Munkanapokon 24 órán belül válaszolunk.</li>
                  <li>🚗 <strong>Nyugodt környezet:</strong> A Ságodi Iparterületen tágas, biztonságos megtekintés és tesztvezetés várja.</li>
                  <li>📄 <strong>Teljes átláthatóság:</strong> Hivatalos JSZP lekérdezés minden autónkhoz.</li>
                </ul>
              </div>

              <div>
                <h2 className="text-base font-semibold text-slate-100 mb-3">Telephely térképen</h2>
                <div className="overflow-hidden rounded-xl border border-white/10">
                  <iframe
                    title="CARS SR99 Kft. telephely - Zalaegerszeg, Ságod"
                    src="https://maps.google.com/maps?q=Zalaegerszeg%20S%C3%A1god&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    className="h-64 w-full [filter:invert(90%)_hue-rotate(180deg)_saturate(90%)_contrast(92%)]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>

          <Suspense fallback={<div className="text-sky-400 animate-pulse p-8">Űrlap betöltése...</div>}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
