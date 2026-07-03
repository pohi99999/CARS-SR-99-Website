"use client";

import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type LeasingCalculatorProps = {
  price: number;
};

const annualInterestRate = 0.1;

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("hu-HU", {
    style: "currency",
    currency: "HUF",
    maximumFractionDigits: 0,
  }).format(Math.round(value));
}

export default function LeasingCalculator({ price }: LeasingCalculatorProps) {
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [termMonths, setTermMonths] = useState(48);

  const downPaymentAmount = useMemo(
    () => (price * downPaymentPercent) / 100,
    [price, downPaymentPercent],
  );

  const monthlyPayment = useMemo(() => {
    const financedAmount = Math.max(price - downPaymentAmount, 0);
    const years = termMonths / 12;
    const totalRepayment = financedAmount * (1 + annualInterestRate * years);
    return totalRepayment / termMonths;
  }, [price, downPaymentAmount, termMonths]);

  const amortizationData = useMemo(() => {
    const financedAmount = Math.max(price - downPaymentAmount, 0);
    const termOptions = [12, 24, 36, 48, 60, 72, 84].filter((months) => months <= 84);

    return termOptions.map((months) => {
      const years = months / 12;
      const interestAmount = financedAmount * annualInterestRate * years;

      return {
        term: `${months} hó`,
        toke: Math.round(financedAmount),
        kamat: Math.round(interestAmount),
      };
    });
  }, [price, downPaymentAmount]);

  return (
    <section className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur-md">
      <h2 className="text-xl font-bold text-slate-100">Lízing kalkulátor</h2>
      <p className="mt-2 text-sm text-slate-300">
        Indikatív kalkuláció 10%-os fix kamattal. A pontos ajánlat egyedi elbírálás alapján készül.
      </p>

      <form className="mt-6 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="down-payment" className="text-sm font-medium text-slate-200">
              Önerő ({downPaymentPercent}%)
            </label>
            <span className="text-sm font-semibold text-cyan-400">
              {formatCurrency(downPaymentAmount)}
            </span>
          </div>
          <input
            id="down-payment"
            type="range"
            min={20}
            max={70}
            step={1}
            value={downPaymentPercent}
            onChange={(event) => setDownPaymentPercent(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-400"
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label htmlFor="term-months" className="text-sm font-medium text-slate-200">
              Futamidő
            </label>
            <span className="text-sm font-semibold text-cyan-400">{termMonths} hónap</span>
          </div>
          <input
            id="term-months"
            type="range"
            min={12}
            max={84}
            step={12}
            value={termMonths}
            onChange={(event) => setTermMonths(Number(event.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700 accent-cyan-400"
          />
        </div>
      </form>

      <div className="mt-8 rounded-xl border border-cyan-500/20 bg-cyan-500/10 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">Becsült havi törlesztő</p>
        <p className="mt-2 text-3xl font-extrabold tracking-tight text-cyan-300 sm:text-4xl">
          {formatCurrency(monthlyPayment)}
          <span className="ml-2 text-base font-medium text-slate-300">/ hó</span>
        </p>
      </div>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Tőke és kamat arány futamidő szerint
        </p>
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={amortizationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="term" tick={{ fontSize: 12, fill: "#94a3b8" }} />
              <YAxis
                tick={{ fontSize: 12, fill: "#94a3b8" }}
                tickFormatter={(value) =>
                  new Intl.NumberFormat("hu-HU", { notation: "compact" }).format(Number(value))
                }
              />
              <Tooltip
                contentStyle={{ backgroundColor: "#0f172a", borderColor: "#334155", color: "#f8fafc" }}
                formatter={(value, name) => [
                  formatCurrency(Number(value ?? 0)),
                  name === "toke" ? "Tőke" : "Kamat",
                ]}
              />
              <Bar dataKey="toke" name="Tőke" fill="#22d3ee" radius={[6, 6, 0, 0]} />
              <Bar dataKey="kamat" name="Kamat" fill="#fb923c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="mt-2 text-xs text-slate-400">
          Kiválasztott futamidő: <span className="font-semibold text-cyan-300">{termMonths} hónap</span>
        </p>
      </div>
    </section>
  );
}
