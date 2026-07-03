"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormData: ContactFormData = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<ContactFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const prefilledMessage = useMemo(() => {
    const carName = searchParams.get("car");
    if (!carName) {
      return "";
    }

    return `Érdeklődöm a ${carName} modell iránt.`;
  }, [searchParams]);

  const displayedMessage = formData.message.length > 0 ? formData.message : prefilledMessage;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const message = displayedMessage;

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;

      if (!webhookUrl) {
        console.info(
          "[SR99 ContactForm] NEXT_PUBLIC_WEBHOOK_URL nincs beállítva. Lokális fejlesztési mód: UX sikeresen tesztelhető.",
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
          source: "contact-form",
          submittedAt: new Date().toISOString(),
          ...formData,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error(`Webhook request failed: ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("[SR99 ContactForm] Webhook küldési hiba:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleFieldChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSubmitted(false);
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-black/40 p-6 shadow-xl backdrop-blur-md dark:border-white/10 dark:bg-white/5 sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-slate-100">Írjon nekünk</h2>
      <p className="mt-2 text-sm text-slate-300">
        Töltse ki az űrlapot, és munkanapokon 24 órán belül felvesszük Önnel a kapcsolatot.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-slate-200">
            Név
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            placeholder="Nagy Péter"
            value={formData.name}
            onChange={(event) => handleFieldChange("name", event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-slate-200">
            E-mail cím
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            placeholder="peter@example.com"
            value={formData.email}
            onChange={(event) => handleFieldChange("email", event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-slate-200">
            Telefonszám
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            placeholder="+36 30 123 4567"
            value={formData.phone}
            onChange={(event) => handleFieldChange("phone", event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-slate-200">
            Üzenet
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            placeholder="Miben segíthetünk?"
            value={displayedMessage}
            onChange={(event) => handleFieldChange("message", event.target.value)}
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30"
          />
        </div>

        <button
          type="submit"
          aria-label="Kapcsolati űrlap beküldése"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300"
        >
          {isSubmitting ? "Küldés..." : isSubmitted ? "Sikeres küldés!" : "Üzenet küldése"}
        </button>
      </form>

      {isSubmitted && (
        <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          Köszönjük! Üzenetét rögzítettük, hamarosan jelentkezünk.
        </p>
      )}
    </section>
  );
}
