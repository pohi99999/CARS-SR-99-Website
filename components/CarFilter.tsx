"use client";

import { Mic } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type CarFilterProps = {
  initialMarka: string;
  initialUzemanyag: string;
};

const markaOptions = ["Összes", "Toyota", "Kia"] as const;
const uzemanyagOptions = ["Összes", "Hibrid", "Benzin", "Diesel"] as const;
type MarkaOption = (typeof markaOptions)[number];

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

export default function CarFilter({ initialMarka, initialUzemanyag }: CarFilterProps) {
  const router = useRouter();
  const [marka, setMarka] = useState(initialMarka);
  const [uzemanyag, setUzemanyag] = useState(initialUzemanyag);
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

  function pushWithFilters(nextMarka: string, nextUzemanyag: string) {
    const params = new URLSearchParams();

    if (nextMarka !== "Összes") {
      params.set("marka", nextMarka);
    }
    if (nextUzemanyag !== "Összes") {
      params.set("uzemanyag", nextUzemanyag);
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
        const normalized = matchedMarka as MarkaOption;
        setMarka(normalized);
        const params = new URLSearchParams();
        params.set("marka", normalized);
        if (uzemanyag !== "Összes") {
          params.set("uzemanyag", uzemanyag);
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
  }, [router, uzemanyag]);

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

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl border border-white/10 bg-black/40 p-4 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="filter-marka" className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Márka szűrő
            </label>
            <div className="flex items-center gap-2">
              <select
                id="filter-marka"
                value={marka}
                onChange={(event) => {
                  const value = event.target.value;
                  setMarka(value);
                  pushWithFilters(value, uzemanyag);
                }}
                className="w-full rounded-xl border border-white/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
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
                    ? "border-cyan-400 bg-cyan-400/20 text-cyan-300 animate-pulse"
                    : "border-white/20 bg-white/10 text-slate-200 hover:border-cyan-400 hover:text-cyan-300"
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
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-cyan-400"
            >
              Üzemanyag szűrő
            </label>
            <select
              id="filter-uzemanyag"
              value={uzemanyag}
              onChange={(event) => {
                const value = event.target.value;
                setUzemanyag(value);
                pushWithFilters(marka, value);
              }}
              className="w-full rounded-xl border border-white/20 bg-slate-900/90 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            >
              {uzemanyagOptions.map((option) => (
                <option key={option} value={option} className="bg-slate-900 text-slate-100">
                  {option === "Összes" ? "Minden üzemanyag" : option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
