"use client";

import { useState } from "react";

export default function EventBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <section className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-2 sm:px-6 lg:px-8">
        <p className="text-xs font-semibold sm:text-sm">
          🎉 Látogasson el hozzánk a Zalaegerszegi Vásár ideje alatt is! Különleges helyszíni
          hitelkedvezmények a Ságodi Iparterületen.
        </p>
        <button
          type="button"
          aria-label="Rendezvény banner bezárása"
          onClick={() => setIsVisible(false)}
          className="rounded px-2 py-1 text-sm font-bold transition hover:bg-black/10"
        >
          X
        </button>
      </div>
    </section>
  );
}
