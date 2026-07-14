"use client";

import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore, useMemo } from "react";
import { inventory, parsePriceToNumber } from "@/data/inventory";

type CarFilterProps = {
  initialMarka: string;
  initialUzemanyag: string;
  initialMaxPrice: number;
};

type SpeechRecognitionResultItem = {
  transcript: string;
};

type SpeechRecognitionResultLike = {
  0: SpeechRecognitionResultItem;
};

type SpeechRecognitionEventLike = {
  results: ArrayLike<SpeechRecognitionResultLike>;
};

type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionConstructor = new () => SpeechRecognitionLike;

export default function CarFilter({ initialMarka, initialUzemanyag, initialMaxPrice }: CarFilterProps) {
  const router = useRouter();
  const [marka, setMarka] = useState(initialMarka);
  const [uzemanyag, setUzemanyag] = useState(initialUzemanyag);
  
  // Calculate dynamic filter options based on real inventory
  const markaOptions = useMemo(() => {
    return ["Összes", ...Array.from(new Set(inventory.map((car) => car.marka)))];
  }, []);

  const uzemanyagOptions = useMemo(() => {
    return ["Összes", ...Array.from(new Set(inventory.map((car) => car.uzemanyag)))];
  }, []);

  // Dynamic price calculation
  const { minPrice, maxPrice } = useMemo(() => {
    const validPrices = inventory
      .map((car) => parsePriceToNumber(car.ar))
      .filter((price) => price > 0);
    return {
      minPrice: validPrices.length > 0 ? Math.min(...validPrices) : 0,
      maxPrice: validPrices.length > 0 ? Math.max(...validPrices) : 10000000,
    };
  }, []);

  const [selectedMaxPrice, setSelectedMaxPrice] = useState(initialMaxPrice);
  const [prevInitialMaxPrice, setPrevInitialMaxPrice] = useState(initialMaxPrice);

  if (initialMaxPrice !== prevInitialMaxPrice) {
    setPrevInitialMaxPrice(initialMaxPrice);
    setSelectedMaxPrice(initialMaxPrice);
  }

  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const voiceSupported = useSyncExternalStore(
    () => () => {},
    () => {
      const speechWindow = window as Window & {
        SpeechRecognition?: SpeechRecognitionConstructor;
        webkitSpeechRecognition?: SpeechRecognitionConstructor;
      };
      return Boolean(speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition);
    },
    () => false,
  );

  function pushWithFilters(nextMarka: string, nextUzemanyag: string, nextMaxPrice: number) {
    const params = new URLSearchParams();

    if (nextMarka !== "Összes") {
      params.set("marka", nextMarka);
    }
    if (nextUzemanyag !== "Összes") {
      params.set("uzemanyag", nextUzemanyag);
    }
    if (nextMaxPrice < maxPrice) {
      params.set("maxPrice", nextMaxPrice.toString());
    }

    const query = params.toString();
    router.push(query.length > 0 ? `/?${query}` : "/");
  }

  useEffect(() => {
    const speechWindow = window as Window & {
      SpeechRecognition?: SpeechRecognitionConstructor;
      webkitSpeechRecognition?: SpeechRecognitionConstructor;
    };
    const recognitionConstructor =
      speechWindow.SpeechRecognition ?? speechWindow.webkitSpeechRecognition;

    if (!recognitionConstructor) {
      return;
    }

    const recognition = new recognitionConstructor();
    recognition.lang = "hu-HU";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.toLowerCase();
      const matchedMarka = markaOptions.find(
        (option) => option !== "Összes" && transcript.includes(option.toLowerCase()),
      );

      if (matchedMarka) {
        setMarka(matchedMarka);
        const params = new URLSearchParams();
        params.set("marka", matchedMarka);
        if (uzemanyag !== "Összes") {
          params.set("uzemanyag", uzemanyag);
        }
        if (selectedMaxPrice < maxPrice) {
          params.set("maxPrice", selectedMaxPrice.toString());
        }
        const query = params.toString();
        router.push(query.length > 0 ? `/?${query}` : "/");
      }
    };

    recognition.onerror = (event) => {
      console.error("[SR99 VoiceSearch] SpeechRecognition hiba:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
      recognitionRef.current = null;
    };
  }, [router, uzemanyag, selectedMaxPrice, maxPrice, markaOptions]);

  function startVoiceSearch() {
    if (!recognitionRef.current) {
      console.info("[SR99 VoiceSearch] SpeechRecognition API nem támogatott ebben a böngészőben.");
      return;
    }

    try {
      recognitionRef.current.start();
      setIsListening(true);
    } catch (error) {
      console.error("[SR99 VoiceSearch] Hangalapú keresés indítási hiba:", error);
      setIsListening(false);
    }
  }

  function formatPrice(value: number): string {
    return new Intl.NumberFormat("hu-HU", {
      style: "currency",
      currency: "HUF",
      maximumFractionDigits: 0,
    }).format(value);
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border-t border-l border-r border-b border-t-white/20 border-l-white/10 border-r-white/5 border-b-white/5 bg-black/40 p-4 shadow-[0_20px_45px_rgba(2,8,23,0.45),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-lg dark:bg-white/5 sm:p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <label htmlFor="filter-marka" className="mb-1.5 block text-xs font-light uppercase tracking-widest text-sky-400">
              Márka szűrő
            </label>
            <div className="flex items-center gap-2">
              <select
                id="filter-marka"
                value={marka}
                onChange={(event) => {
                  const value = event.target.value;
                  setMarka(value);
                  pushWithFilters(value, uzemanyag, selectedMaxPrice);
                }}
                className="w-full rounded-xl border border-white/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
              >
                {markaOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900 text-slate-100">
                    {option === "Összes" ? "Minden márka" : option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={startVoiceSearch}
                disabled={!voiceSupported || isListening}
                aria-label="Hangalapú márka keresés"
                className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                  isListening
                    ? "border-sky-400 bg-sky-400/20 text-sky-300 animate-pulse"
                    : "border-white/20 bg-white/10 text-slate-200 hover:border-sky-400 hover:text-sky-300"
                } disabled:cursor-not-allowed disabled:opacity-50`}
                title={
                  voiceSupported
                    ? isListening
                      ? "Figyelek..."
                      : "Hangalapú márka keresés"
                    : "A böngésző nem támogatja a hangfelismerést"
                }
              >
                <Mic size={16} />
              </button>
            </div>
            <p className="mt-1.5 text-xs text-slate-400">
              {voiceSupported
                ? isListening
                  ? "Hallgatás... mondja ki a márkát (pl. Toyota)."
                  : "Tipp: kattintson a mikrofonra a hangalapú kereséshez."
                : "Hangalapú keresés ezen az eszköszön nem elérhető."}
            </p>
          </div>

          <div>
            <label
              htmlFor="filter-uzemanyag"
              className="mb-1.5 block text-xs font-light uppercase tracking-widest text-sky-400"
            >
              Üzemanyag szűrő
            </label>
            <select
              id="filter-uzemanyag"
              value={uzemanyag}
              onChange={(event) => {
                const value = event.target.value;
                setUzemanyag(value);
                pushWithFilters(marka, value, selectedMaxPrice);
              }}
              className="w-full rounded-xl border border-white/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
            >
              {uzemanyagOptions.map((option) => (
                <option key={option} value={option} className="bg-slate-900 text-slate-100">
                  {option === "Összes" ? "Minden üzemanyag" : option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="filter-price" className="text-xs font-light uppercase tracking-widest text-sky-400">
                Maximális ár
              </label>
              <span className="text-sm font-semibold text-sky-400">
                {selectedMaxPrice >= maxPrice ? "Bármely ár" : formatPrice(selectedMaxPrice)}
              </span>
            </div>
            <input
              id="filter-price"
              type="range"
              min={minPrice}
              max={maxPrice}
              step={100000}
              value={selectedMaxPrice}
              onChange={(event) => {
                const value = Number(event.target.value);
                setSelectedMaxPrice(value);
              }}
              onMouseUp={() => pushWithFilters(marka, uzemanyag, selectedMaxPrice)}
              onTouchEnd={() => pushWithFilters(marka, uzemanyag, selectedMaxPrice)}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-sky-400"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-400">
              <span>{formatPrice(minPrice)}</span>
              <span>{formatPrice(maxPrice)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
