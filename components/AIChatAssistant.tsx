"use client";

import { useState } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="z-40">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="AI chat asszisztens megnyitása"
          className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-cyan-400 text-[#2B2B2B] shadow-[0_0_26px_rgba(34,211,238,0.45)] transition hover:scale-105 hover:bg-cyan-300"
        >
          <MessageCircle size={24} />
        </button>
      ) : null}

      {isOpen ? (
        <section className="fixed inset-0 z-40 h-full w-full rounded-none bg-white md:inset-auto md:bottom-20 md:right-6 md:h-[500px] md:w-96 md:rounded-2xl md:shadow-2xl">
          <header className="flex items-center justify-between rounded-none bg-[#2B2B2B] px-4 py-3 text-white md:rounded-t-2xl">
            <div>
              <p className="text-sm font-semibold">SR99 AI Asszisztens</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-200">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Aktív
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Chat bezárása"
              className="rounded-full p-2 text-slate-200 transition hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex h-[calc(100%-128px)] flex-col bg-slate-50 p-4">
            <div className="max-w-[92%] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm leading-6 text-slate-700 shadow-sm">
              Üdvözlöm a CARS SR99 Kft.-nél! Miben segíthetek ma? Keres egy adott modellt, vagy a
              beszámításról érdeklődik?
            </div>
          </div>

          <div className="border-t border-slate-200 bg-white p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Írja ide az üzenetét..."
                className="h-11 flex-1 rounded-full border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-300/30"
              />
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 text-[#2B2B2B] transition hover:bg-cyan-300"
                aria-label="Üzenet küldése"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
