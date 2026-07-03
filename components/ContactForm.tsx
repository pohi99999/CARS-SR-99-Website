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

  const prefilledMessage = useMemo(() => {
    const carName = searchParams.get("car");
    if (!carName) {
      return "";
    }

    return `Érdeklődöm a ${carName} modell iránt.`;
  }, [searchParams]);

  const displayedMessage = formData.message.length > 0 ? formData.message : prefilledMessage;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  function handleFieldChange(field: keyof ContactFormData, value: string) {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    setIsSubmitted(false);
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-md sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-[#2B2B2B]">Írjon nekünk</h2>
      <p className="mt-2 text-sm text-slate-600">
        Töltse ki az űrlapot, és rövid időn belül felvesszük Önnel a kapcsolatot.
      </p>

      <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-sm font-medium text-slate-700">
            Név
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={(event) => handleFieldChange("name", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1 block text-sm font-medium text-slate-700">
            E-mail cím
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={(event) => handleFieldChange("email", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
          />
        </div>

        <div>
          <label htmlFor="contact-phone" className="mb-1 block text-sm font-medium text-slate-700">
            Telefonszám
          </label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            required
            value={formData.phone}
            onChange={(event) => handleFieldChange("phone", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1 block text-sm font-medium text-slate-700">
            Üzenet
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            value={displayedMessage}
            onChange={(event) => handleFieldChange("message", event.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-[#2B2B2B] focus:ring-2 focus:ring-[#2B2B2B]/20"
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
        >
          Üzenet küldése
        </button>
      </form>

      {isSubmitted && (
        <p className="mt-4 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700">
          Köszönjük! Üzenetét rögzítettük, hamarosan jelentkezünk.
        </p>
      )}
    </section>
  );
}
