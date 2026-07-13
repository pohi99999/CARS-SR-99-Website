import type { Metadata } from "next";
import { Suspense } from "react";
import ContactForm from "@/components/ContactForm";
import { Clock, ShieldCheck, MapPin, Phone, Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Kapcsolat",
  description: "Lépjen kapcsolatba a CARS SR99 Kft. csapatával! Telephelyünk Zalaegerszeg Ságod hrsz. 807/15 alatt található.",
  alternates: {
    canonical: "https://cars-sr99.vercel.app/kapcsolat",
  },
};

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-400">Kapcsolat</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Vegye fel velünk a kapcsolatot
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            Kérdése van valamelyik járművünkről, vagy tesztvezetést egyeztetne? Szakértő csapatunk készséggel áll rendelkezésére.
          </p>

          <div className="mt-8 space-y-6 text-sm text-slate-300">
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 space-y-3">
              <h2 className="text-base font-semibold text-cyan-300 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-cyan-400" /> Elérhetőség & Telephely
              </h2>
              <p className="leading-6 text-slate-300">
                <strong>CARS SR99 Kft.</strong>
                <br />
                8900 Zalaegerszeg, Ságod hrsz. 807/15
              </p>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Phone className="h-4 w-4 text-cyan-400" />
                <a href="tel:+36709070669" className="hover:text-cyan-300 transition">06-70 907-06-69</a>
              </div>
              <div className="flex items-center gap-2 text-slate-200 font-medium">
                <Mail className="h-4 w-4 text-cyan-400" />
                <a href="mailto:carssr99@gmail.com" className="hover:text-cyan-300 transition">carssr99@gmail.com</a>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-base font-semibold text-cyan-300 flex items-center gap-2">
                <Clock className="h-5 w-5 text-cyan-400" /> Nyitvatartási idő
              </h2>
              <p className="mt-2 leading-6 text-slate-300">
                Hétfő-Péntek: 09:00-17:00
                <br />
                Szombat: Előre egyeztetett időpontban
                <br />
                Vasárnap: Zárva
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5 space-y-2 text-slate-200">
              <h2 className="text-base font-semibold text-cyan-300 flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-cyan-400" /> Bizalomépítő garanciáink
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

        <Suspense fallback={<div className="text-cyan-400 animate-pulse p-8">Űrlap betöltése...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </section>
  );
}
