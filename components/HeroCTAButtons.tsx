"use client";

import Link from "next/link";
import { trackGA4Event, trackPixelEvent } from "@/utils/analytics";

export default function HeroCTAButtons() {
  function handleKinalatClick() {
    trackGA4Event("cta_kinalat_kattintas", { position: "hero_primary" });
    trackPixelEvent("ViewContent", { content_name: "Hero Kínálat CTA" });
  }

  function handleVisszahivasClick() {
    trackGA4Event("cta_visszahivas_kattintas", { position: "hero_secondary" });
  }

  return (
    <div className="mt-10 flex flex-col sm:flex-row gap-4">
      <Link
        href="/kinalat"
        onClick={handleKinalatClick}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-cyan-400 px-7 py-3.5 text-sm font-semibold text-[#2B2B2B] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_32px_rgba(34,211,238,0.5)]"
      >
        Fedezze fel kínálatunkat →
      </Link>
      <Link
        href="/kapcsolat"
        onClick={handleVisszahivasClick}
        className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-cyan-400 px-7 py-3.5 text-sm font-semibold text-cyan-400 transition-all duration-300 hover:bg-cyan-400/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]"
      >
        Kérjen visszahívást
      </Link>
    </div>
  );
}
