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
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

      if (!webhookUrl) {
        console.info(
          "[SR99 TradeInForm] NEXT_PUBLIC_WEBHOOK_URL nincs beállítva. Lokális fejlesztési mód: UX sikeresen tesztelhető.",
        );
        setIsSubmitted(true);
        return;
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source: "trade-in-form",
          submittedAt: new Date().toISOString(),
          ...formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("[SR99 TradeInForm] Webhook küldési hiba:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function setField<K extends keyof TradeInFormData>(field: K, value: TradeInFormData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setIsSubmitted(false);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-100">Autóbeszámítási űrlap</h2>
      <p className="mt-2 text-sm text-slate-300">
        Adja meg autója főbb adatait, és kötelezettségmentes előzetes értékbecslést küldünk.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Jármű adatai</legend>

          <div>
            <label htmlFor="trade-brand" className="mb-1 block text-sm font-medium text-slate-200">
              Márka
            </label>
            <input
              id="trade-brand"
              name="brand"
              type="text"
              required
              placeholder="pl. Toyota"
              value={formData.brand}
              onChange={(event) => setField("brand", event.target.value)}
              className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          <div>
            <label htmlFor="trade-model" className="mb-1 block text-sm font-medium text-slate-200">
              Modell
            </label>
            <input
              id="trade-model"
              name="model"
              type="text"
              required
              placeholder="pl. RAV4"
              value={formData.model}
              onChange={(event) => setField("model", event.target.value)}
              className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trade-year" className="mb-1 block text-sm font-medium text-slate-200">
                Évjárat
              </label>
              <input
                id="trade-year"
                name="year"
                type="number"
                min={1980}
                max={2030}
                required
                placeholder="2020"
                value={formData.year}
                onChange={(event) => setField("year", event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <div>
              <label htmlFor="trade-mileage" className="mb-1 block text-sm font-medium text-slate-200">
                Futásteljesítmény (km)
              </label>
              <input
                id="trade-mileage"
                name="mileage"
                type="number"
                min={0}
                required
                placeholder="120000"
                value={formData.mileage}
                onChange={(event) => setField("mileage", event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          </div>

          <div>
            <label htmlFor="trade-condition" className="mb-1 block text-sm font-medium text-slate-200">
              Állapot
            </label>
            <select
              id="trade-condition"
              name="condition"
              value={formData.condition}
              onChange={(event) =>
                setField("condition", event.target.value as TradeInFormData["condition"])
              }
              className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            >
              <option value="Kitűnő" className="bg-slate-900 text-slate-100">Kitűnő</option>
              <option value="Normál" className="bg-slate-900 text-slate-100">Normál</option>
              <option value="Sérült" className="bg-slate-900 text-slate-100">Sérült</option>
            </select>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold uppercase tracking-wider text-cyan-400">Kapcsolati adatok</legend>

          <div>
            <label htmlFor="trade-name" className="mb-1 block text-sm font-medium text-slate-200">
              Név
            </label>
            <input
              id="trade-name"
              name="name"
              type="text"
              required
              placeholder="Kovács János"
              value={formData.name}
              onChange={(event) => setField("name", event.target.value)}
              className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="trade-email" className="mb-1 block text-sm font-medium text-slate-200">
                E-mail
              </label>
              <input
                id="trade-email"
                name="email"
                type="email"
                required
                placeholder="janos@example.com"
                value={formData.email}
                onChange={(event) => setField("email", event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>

            <div>
              <label htmlFor="trade-phone" className="mb-1 block text-sm font-medium text-slate-200">
                Telefon
              </label>
              <input
                id="trade-phone"
                name="phone"
                type="tel"
                required
                placeholder="+36 30 123 4567"
                value={formData.phone}
                onChange={(event) => setField("phone", event.target.value)}
                className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
              />
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          aria-label="Autóbeszámítási űrlap beküldése"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300"
        >
          {isSubmitting
            ? "Küldés..."
            : isSubmitted
              ? "Sikeres küldés!"
              : "Előzetes értékbecslés kérése"}
        </button>
      </form>

      {isSubmitted && (
        <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          Köszönjük! Hamarosan visszajelzünk az előzetes értékbecsléssel.
        </p>
      )}
    </section>
  );
}
