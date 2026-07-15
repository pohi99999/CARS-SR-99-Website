"use client";

import { ShieldCheck, FileText, CreditCard } from "lucide-react";
import { LazyMotion, domAnimation, m } from "framer-motion";

const badges = [
  {
    icon: ShieldCheck,
    title: "Átvilágított járművek",
    description: "Minden autó műszaki vizsgával",
  },
  {
    icon: FileText,
    title: "Átlátható dokumentáció",
    description: "Teljes papírok, nulla meglepetés",
  },
  {
    icon: CreditCard,
    title: "Rugalmas finanszírozás",
    description: "Leasing és hitelkonstrukciók",
  },
];

export default function TrustBadges() {
  return (
    <LazyMotion features={domAnimation}>
      <m.section
        className="bg-[#111827] py-12 text-slate-100 border-y border-slate-800/80"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {badges.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition hover:border-sky-500/30 hover:bg-white/[0.08]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{badge.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </m.section>
    </LazyMotion>
  );
}
