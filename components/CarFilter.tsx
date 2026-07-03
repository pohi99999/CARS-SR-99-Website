"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CarFilterProps = {
  initialMarka: string;
  initialUzemanyag: string;
};

const markaOptions = ["Összes", "Toyota", "Kia"] as const;
const uzemanyagOptions = ["Összes", "Hibrid", "Benzin", "Diesel"] as const;

export default function CarFilter({ initialMarka, initialUzemanyag }: CarFilterProps) {
  const router = useRouter();
  const [marka, setMarka] = useState(initialMarka);
  const [uzemanyag, setUzemanyag] = useState(initialUzemanyag);

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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
      <div className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label htmlFor="filter-marka" className="mb-1 block text-sm font-medium text-slate-700">
              Márka
            </label>
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
