"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitToHubSpot } from "@/services/hubspotService";
import { sendLeadWebhook } from "@/services/webhookService";
import { sendContactEmail } from "@/services/contactEmailService";
import { trackFormSubmission } from "@/utils/analytics";

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
  const [sendFailed, setSendFailed] = useState(false);

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
    const submissionData = {
      ...formData,
      message,
      carInterest: searchParams.get("car") || undefined,
    };

    try {
      // 1. Fire GA4 & Meta Pixel Lead event
      const carId = searchParams.get("carId");
      trackFormSubmission("kapcsolat", {
        car_interest: submissionData.carInterest,
        ...(carId ? { content_type: "vehicle", content_ids: [carId] } : {}),
      });

      // 2. Parallel Lead Webhook call (with automatic retry)
      sendLeadWebhook("kapcsolat", submissionData).catch((err) =>
        console.error("[SR99 ContactForm] Webhook call failed:", err)
      );

      // 3. Parallel HubSpot Forms API call
      submitToHubSpot({
        formType: "kapcsolat",
        fields: [
          { name: "firstname", value: formData.name },
          { name: "email", value: formData.email },
          { name: "phone", value: formData.phone },
          { name: "message", value: message },
        ],
      }).catch((err) => console.error("[SR99 ContactForm] HubSpot call failed:", err));

      // Legacy fallback webhook if configured
      const legacyUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
      if (legacyUrl) {
        await fetch(legacyUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "contact-form",
            submittedAt: new Date().toISOString(),
            ...submissionData,
          }),
        }).catch(() => {});
      }

      // 4. E-mail a kereskedesnek. EZ a donto ag: a visszajelzes ennek az
      // eredmenyet koveti, mert a masik ket ut kulso konfiguraciotol fugg.
      const emailSent = await sendContactEmail({
        formType: "kapcsolat",
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message,
        carInterest: submissionData.carInterest,
      });

      setSendFailed(!emailSent);
      setIsSubmitted(emailSent);
    } catch (error) {
      console.error("[SR99 ContactForm] Form submit error:", error);
      setSendFailed(true);
      setIsSubmitted(false);
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
    setSendFailed(false);
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
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
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
            className="w-full rounded-xl border border-white/20 bg-slate-900/80 px-4 py-3 text-sm text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/30"
          />
        </div>

        <button
          type="submit"
          aria-label="Kapcsolati űrlap beküldése"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_rgba(56,189,248,0.35)] transition-all duration-300 ease-in-out hover:bg-sky-400 hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] btn-shimmer hover:scale-[1.02] active:scale-[0.98]"
        >
          {isSubmitting ? "Küldés..." : isSubmitted ? "Sikeres küldés!" : "Üzenet küldése"}
        </button>
      </form>

      {isSubmitted && (
        <p className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300">
          Köszönjük! Üzenetét megkaptuk, munkanapokon 24 órán belül jelentkezünk.
        </p>
      )}

      {sendFailed && (
        <p className="mt-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200">
          Az üzenetet most nem sikerült elküldeni. Kérjük, hívjon minket a{" "}
          <a href="tel:+36709070669" className="underline hover:text-amber-100">
            06-70 907-06-69
          </a>{" "}
          számon, vagy írjon a{" "}
          <a href="mailto:carssr99@gmail.com" className="underline hover:text-amber-100">
            carssr99@gmail.com
          </a>{" "}
          címre.
        </p>
      )}
    </section>
  );
}
