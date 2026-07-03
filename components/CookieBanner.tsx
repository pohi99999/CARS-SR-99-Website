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
    setIsDismissed(true);
  }

  if (consentValue === serverConsentSnapshot || isDismissed || consentValue.length > 0) {
    return null;
  }

  return (
    <section className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[#2B2B2B]/95 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p className="text-sm leading-6 text-slate-200">
          Oldalunk sütiket használ a legjobb felhasználói élmény és a webes analitika (látogatottság
          mérése) biztosítása érdekében.
        </p>

        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => handleDecision("rejected")}
            className="rounded-full bg-slate-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-500"
          >
            Elutasítom
          </button>
          <button
            type="button"
            onClick={() => handleDecision("accepted")}
            className="rounded-full bg-cyan-400 px-4 py-2 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
          >
            Elfogadom
          </button>
        </div>
      </div>
    </section>
  );
}
