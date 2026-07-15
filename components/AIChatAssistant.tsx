"use client";

import { FormEvent, useRef, useState, useEffect } from "react";
import { MessageCircle, SendHorizontal, X } from "lucide-react";
import { inventory } from "@/data/inventory";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

export default function AIChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Üdvözlöm a CARS SR99 Kft.-nél! Miben segíthetek ma? Keres egy adott modellt, vagy az autóbeszámításról érdeklődik?",
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  function handleSend(e?: FormEvent) {
    if (e) e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    // Generate response based on user query using real inventory data
    setTimeout(() => {
      const lower = trimmed.toLowerCase();
      let reply = "Köszönjük érdeklődését! Munkatársaink készséggel állnak rendelkezésére a 06-70 907-06-69 telefonszámon vagy a Ságodi Iparterületen található telephelyünkön.";

      // Check if user is asking about a specific vehicle in our stock
      let foundCar = null;
      for (const car of inventory) {
        const markaLower = car.marka.toLowerCase();
        const modellLower = car.modell.toLowerCase();
        
        // Match by brand or model name parts
        if (lower.includes(markaLower) || lower.includes(modellLower.split(" ")[0].toLowerCase())) {
          foundCar = car;
          break;
        }
      }

      if (foundCar) {
        reply = `Kínálatunkban elérhető a keresett ${foundCar.marka} ${foundCar.modell} modell. \n\nFőbb jellemzői:\n• Évjárat: ${foundCar.evjarat}\n• Üzemanyag: ${foundCar.uzemanyag}\n• Futásteljesítmény: ${foundCar.futasteljesitmeny}\n• Vételár: ${foundCar.ar}\n\n${foundCar.leiras ? 'Leírás: ' + foundCar.leiras + '\n\n' : ''}Szeretné személyesen is megtekinteni vagy kipróbálni ezt a járművet? Töltse ki a Kapcsolat oldalon található űrlapot a ságodi tesztvezetés egyeztetéséhez, vagy hívjon minket bizalommal a 06-70 907-06-69 számon!`;
      } else if (lower.includes("toyota") || lower.includes("kia") || lower.includes("modell") || lower.includes("kínálat") || lower.includes("autó") || lower.includes("kocsi") || lower.includes("jármű") || lower.includes("géppark")) {
        const carList = inventory.map(car => `• ${car.marka} ${car.modell} (${car.ar})`).join("\n");
        reply = `Jelenlegi prémium járműkínálatunk:\n${carList}\n\nBármelyik modell felkeltette az érdeklődését? Látogasson el hozzánk Zalaegerszeg-Ságodra egy személyes megtekintésre és tesztvezetésre, vagy kérjen visszahívást a Kapcsolat oldali űrlap segítségével!`;
      } else if (lower.includes("beszámítás") || lower.includes("cseré") || lower.includes("eladnám") || lower.includes("beszámít")) {
        reply = "Korrekt és átlátható autóbeszámítást kínálunk! Jelenlegi autóját piaci áron beszámítjuk a nálunk vásárolt jármű vételárába. Kérjük, látogasson el az Autóbeszámítás oldalunkra, és töltse ki az értékbecslési űrlapot az előzetes ajánlathoz, vagy látogasson el hozzánk a ságodi telephelyre személyes felmérésre!";
      } else if (lower.includes("garancia") || lower.includes("szerviz") || lower.includes("biztosítás") || lower.includes("real garant")) {
        reply = "Bár a korábbi Real Garant kiterjesztett garanciát jelenleg kivezettük, minden nálunk található gépjármű hivatalos JSZP háttérellenőrzésen esik át, átvizsgált, garantált állapotúak, és telephelyünkön szakértő kollégáinkkal vagy akár saját szerelőjével is részletesen átnézhető vásárlás előtt. Keressen minket a 06-70 907-06-69 számon a részletekért!";
      } else if (lower.includes("cím") || lower.includes("hol") || lower.includes("zalaegerszeg") || lower.includes("nyitva") || lower.includes("helyileg") || lower.includes("nyitvatartás")) {
        reply = "Telephelyünk címe: 8900 Zalaegerszeg, Ságod hrsz. 807/15. Nyitvatartásunk: Hétfő-Péntek 09:00-17:00. Szombaton előre egyeztetett időpontban is örömmel fogadjuk Önt. Szeretne megtekintési időpontot egyeztetni? Töltse ki kapcsolatfelvételi űrlapunkat!";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: reply,
        },
      ]);
    }, 500);
  }

  return (
    <div className="z-40">
      {!isOpen ? (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="AI chat asszisztens megnyitása"
          className="fixed bottom-6 right-6 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-[0_0_26px_rgba(56,189,248,0.45)] transition hover:scale-105 hover:bg-sky-400 hover:shadow-[0_0_32px_rgba(56,189,248,0.6)]"
        >
          <MessageCircle size={24} />
        </button>
      ) : null}

      {isOpen ? (
        <section className="fixed inset-0 z-40 flex flex-col h-full w-full rounded-none border border-white/10 bg-[#0f172a] backdrop-blur-md md:inset-auto md:bottom-20 md:right-6 md:h-[500px] md:w-96 md:rounded-2xl md:shadow-2xl">
          <header className="flex items-center justify-between rounded-none bg-[#1e293b] px-4 py-3 text-white md:rounded-t-2xl border-b border-white/10">
            <div>
              <p className="text-sm font-semibold text-sky-400">SR99 AI Asszisztens</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                Aktív – Azonnali válasz
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Chat bezárása"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-300 hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-6 shadow-sm ${
                    msg.sender === "user"
                      ? "rounded-br-none bg-sky-500 text-white font-medium shadow-[0_2px_8px_rgba(56,189,248,0.25)]"
                      : "rounded-bl-none border border-white/10 bg-slate-800 text-slate-100"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="border-t border-white/10 bg-[#1e293b] p-3">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                aria-label="Chat üzenet mező"
                placeholder="Írja ide az üzenetét..."
                className="h-11 flex-1 rounded-full border border-white/20 bg-slate-900 px-4 text-sm text-slate-100 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              />
              <button
                type="submit"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky-500 text-white transition hover:bg-sky-400 hover:scale-105 hover:shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                aria-label="Üzenet küldése"
              >
                <SendHorizontal size={18} />
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
