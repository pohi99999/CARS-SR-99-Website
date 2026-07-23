import { getUTMParams } from "./utmTracker";

declare global {
  interface Window {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
    fbq?: (trackType: string, eventName: string, params?: Record<string, unknown>) => void;
    dataLayer?: unknown[];
  }
}

export function trackGA4Event(eventName: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || !window.gtag) return;

  const utms = getUTMParams();
  window.gtag("event", eventName, {
    ...utms,
    ...params,
  });
}

export function trackPixelEvent(eventName: string, params: Record<string, unknown> = {}, isCustom = false): void {
  if (typeof window === "undefined" || !window.fbq) return;

  const utms = getUTMParams();
  const payload = {
    ...utms,
    ...params,
  };

  if (isCustom) {
    window.fbq("trackCustom", eventName, payload);
  } else {
    window.fbq("track", eventName, payload);
  }
}

export function trackFormSubmission(formType: "kapcsolat" | "beszamitas", extraData: Record<string, unknown> = {}): void {
  const gaEventName = formType === "kapcsolat" ? "kapcsolat_form_elkuldve" : "beszamitas_form_elkuldve";

  // Track GA4
  trackGA4Event(gaEventName, extraData);

  // Track Meta Pixel Lead standard event
  trackPixelEvent("Lead", {
    content_name: formType === "kapcsolat" ? "Kapcsolatfelvétel" : "Autóbeszámítás ajánlatkérés",
    ...extraData,
  });
}

export function trackViewContent(contentName: string, category = "Autó", extraData: Record<string, unknown> = {}): void {
  trackGA4Event("auto_reszletek_megtekintve", {
    content_name: contentName,
    content_category: category,
    ...extraData,
  });

  trackPixelEvent("ViewContent", {
    content_name: contentName,
    content_category: category,
    ...extraData,
  });
}

export function trackContactClick(method: "phone" | "email"): void {
  trackGA4Event(method === "phone" ? "telefon_kattintas" : "email_kattintas", { method });
  trackPixelEvent("Contact", { method });
}
