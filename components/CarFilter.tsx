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
      <div className="rounded-2xl border border-black/10 bg-black/5 p-4 shadow-sm backdrop-blur-md transition-all duration-300 dark:border-white/10 dark:bg-white/5 sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="filter-marka" className="mb-1 block text-sm font-medium text-slate-700">
              Márka
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
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
              >
                {markaOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={startVoiceSearch}
                disabled={!voiceSupported || isListening}
                aria-label="Hangalapú márka keresés"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-600 disabled:cursor-not-allowed disabled:opacity-50"
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
            <p className="mt-1 text-xs text-slate-500">
              {voiceSupported
                ? isListening
                  ? "Hallgatás folyamatban... mondja ki a márkát (pl. Toyota)."
                  : "Tipp: kattintson a mikrofonra és mondja ki a kívánt márkát."
                : "A böngészőben nem érhető el SpeechRecognition, fallback: kézi választás."}
            </p>
          </div>

          <div>
            <label
              htmlFor="filter-uzemanyag"
              className="mb-1 block text-sm font-medium text-slate-700"
            >
              Üzemanyag
            </label>
            <select
              id="filter-uzemanyag"
              value={uzemanyag}
              onChange={(event) => {
                const value = event.target.value;
                setUzemanyag(value);
                pushWithFilters(marka, value);
              }}
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
            >
              {uzemanyagOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
