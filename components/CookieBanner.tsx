"use client";

import { useState, useSyncExternalStore } from "react";

const consentStorageKey = "cars-sr99-cookie-consent";
const serverConsentSnapshot = "__server__";

export default function CookieBanner() {
  const [isDismissed, setIsDismissed] = useState(false);
  const consentValue = useSyncExternalStore(
    () => () => {},
    () => window.localStorage.getItem(consentStorageKey) ?? "",
    () => serverConsentSnapshot,
  );

  function handleDecision(decision: "accepted" | "rejected") {
    window.localStorage.setItem(consentStorageKey, decision);
    window.dispatchEvent(new Event("cookie_consent_updated"));
    setIsDismissed(true);
  }

  if (consentValue === serverConsentSnapshot || isDismissed || consentValue.length > 0) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#2B2B2B]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="text-sm leading-6 text-slate-200">
          Oldalunk sütiket használ a legjobb felhasználói élmény és a webes analitika (látogatottság
          mérése) biztosítása érdekében.
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            aria-label="Cookie-k elutasítása"
            onClick={() => handleDecision("rejected")}
            className="rounded-full bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-500"
          >
            Elutasítom
          </button>
          <button
            type="button"
            aria-label="Cookie-k elfogadása"
            onClick={() => handleDecision("accepted")}
            className="rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-sky-400 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_15px_rgba(56,189,248,0.35)]"
          >
            Elfogadom
          </button>
        </div>
      </div>
    </section>
  );
}
