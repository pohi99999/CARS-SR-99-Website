"use client";

import { FormEvent, useState } from "react";

type TradeInFormData = {
  brand: string;
  model: string;
  year: string;
  mileage: string;
  condition: "Kitűnő" | "Normál" | "Sérült";
  name: string;
  email: string;
  phone: string;
};

const initialFormData: TradeInFormData = {
  brand: "",
  model: "",
  year: "",
  mileage: "",
  condition: "Normál",
  name: "",
  email: "",
  phone: "",
};

export default function TradeInForm() {
  const [formData, setFormData] = useState<TradeInFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function setField<K extends keyof TradeInFormData>(field: K, value: TradeInFormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSubmitted(false);
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-[#2B2B2B]">Autóbeszámítási űrlap</h2>
      <p className="mt-2 text-sm text-slate-600">
        Adja meg autója főbb adatait, és előzetes értékbecslést küldünk.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-slate-800">Jármű adatai</legend>

          <div>
            <label htmlFor="trade-brand" className="mb-1 block text-sm font-medium text-slate-700">
              Márka
            </label>
            <input
              id="trade-brand"
              name="brand"
              type="text"
              required
              value={formData.brand}
              onChange={(event) => setField("brand", event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
            />
          </div>

          <div>
            <label htmlFor="trade-model" className="mb-1 block text-sm font-medium text-slate-700">
              Modell
            </label>
            <input
              id="trade-model"
              name="model"
              type="text"
              required
              value={formData.model}
              onChange={(event) => setField("model", event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trade-year" className="mb-1 block text-sm font-medium text-slate-700">
                Évjárat
              </label>
              <input
                id="trade-year"
                name="year"
                type="number"
                min={1980}
                max={2030}
                required
                value={formData.year}
                onChange={(event) => setField("year", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
              />
            </div>

            <div>
              <label htmlFor="trade-mileage" className="mb-1 block text-sm font-medium text-slate-700">
                Futásteljesítmény (km)
              </label>
              <input
                id="trade-mileage"
                name="mileage"
                type="number"
                min={0}
                required
                value={formData.mileage}
                onChange={(event) => setField("mileage", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
              />
            </div>
          </div>

          <div>
            <label htmlFor="trade-condition" className="mb-1 block text-sm font-medium text-slate-700">
              Állapot
            </label>
            <select
              id="trade-condition"
              name="condition"
              value={formData.condition}
              onChange={(event) =>
                setField("condition", event.target.value as TradeInFormData["condition"])
              }
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
            >
              <option value="Kitűnő">Kitűnő</option>
              <option value="Normál">Normál</option>
              <option value="Sérült">Sérült</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold text-slate-800">Kapcsolati adatok</legend>

          <div>
            <label htmlFor="trade-name" className="mb-1 block text-sm font-medium text-slate-700">
              Név
            </label>
            <input
              id="trade-name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={(event) => setField("name", event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trade-email" className="mb-1 block text-sm font-medium text-slate-700">
                E-mail
              </label>
              <input
                id="trade-email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(event) => setField("email", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
              />
            </div>

            <div>
              <label htmlFor="trade-phone" className="mb-1 block text-sm font-medium text-slate-700">
                Telefon
              </label>
              <input
                id="trade-phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(event) => setField("phone", event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
        >
          Előzetes értékbecslés kérése
        </button>
      </form>

      {isSubmitted && (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Köszönjük! Hamarosan visszajelzünk az előzetes értékbecsléssel.
        </p>
      )}
    </section>
  );
}
