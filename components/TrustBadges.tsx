"use client";

import { useEffect, useRef, useState } from "react";
import { ShieldCheck, FileText, Wrench, CreditCard } from "lucide-react";

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
    icon: Wrench,
    title: "Szerviz garancia",
    description: "12 hónapos szervizgarancia",
  },
  {
    icon: CreditCard,
    title: "Rugalmas finanszírozás",
    description: "Leasing és hitelkonstrukciók",
  },
];

export default function TrustBadges() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (sectionRef.current) observer.unobserve(sectionRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`bg-[#111827] py-12 text-slate-100 border-y border-slate-800/80 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, idx) => {
            const IconComponent = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 rounded-xl border border-white/5 bg-white/5 p-5 backdrop-blur-sm transition hover:border-cyan-500/30 hover:bg-white/[0.08]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
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
    </section>
  );
}
