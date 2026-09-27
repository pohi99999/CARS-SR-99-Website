"use client";

import { Phone } from "lucide-react";
import { trackContactClick } from "@/utils/analytics";

// The tire service has its own booking number (the one on the company sign);
// the general +36 70 number stays everywhere else. Mobile: full-width button,
// sm and up: an inline text link.
export default function TireServicePhone({ className = "" }: { className?: string }) {
  return (
    <p className={className}>
      <a
        href="tel:+36308427297"
        onClick={() => trackContactClick("phone")}
        className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-sky-400 px-5 py-3 text-sm font-semibold text-sky-300 transition-colors hover:bg-sky-400/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300 sm:inline-flex sm:w-auto sm:justify-start sm:rounded-none sm:border-0 sm:px-0 sm:py-0 sm:text-base sm:hover:bg-transparent sm:hover:underline sm:underline-offset-4"
      >
        <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          Gumiszerviz, időpontkérés: <span className="whitespace-nowrap">06 30 842 7297</span>
        </span>
      </a>
    </p>
  );
}
