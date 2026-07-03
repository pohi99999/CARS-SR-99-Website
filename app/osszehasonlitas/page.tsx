"use client";

import { useCompareStore } from "@/store/compareStore";

const rows = [
  { key: "marka", label: "Márka" },
  { key: "modell", label: "Modell" },
  { key: "ar", label: "Ár" },
  { key: "futasteljesitmeny", label: "Futásteljesítmény" },
  { key: "uzemanyag", label: "Üzemanyag" },
] as const;

export default function ComparePage() {
  const { cars } = useCompareStore();

  return (
    <section className="mx-auto w-full max-w-7xl px-6 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-slate-100">Gépjármű-összehasonlító</h1>
      <p className="mt-3 text-sm text-slate-300">
        Vesse össze a kiválasztott autókat egyetlen táblázatban.
      </p>

      {cars.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
          Még nincs kiválasztott autó az összehasonlításhoz.
        </div>
      ) : (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-44 border-b border-white/10 px-4 py-3 text-left font-semibold text-slate-200">
                  Tulajdonság
                </th>
                {cars.map((car) => (
                  <th
                    key={car.id}
                    className="border-b border-white/10 px-4 py-3 text-left font-semibold text-cyan-300"
                  >
                    {car.marka} {car.modell}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.key}>
                  <td className="border-b border-white/10 px-4 py-3 font-medium text-slate-300">
                    {row.label}
                  </td>
                  {cars.map((car) => (
                    <td key={`${car.id}-${row.key}`} className="border-b border-white/10 px-4 py-3 text-slate-100">
                      {car[row.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
