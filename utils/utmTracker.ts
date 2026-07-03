export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_page?: string;
}

const STORAGE_KEY = "cars_sr99_utm_params";

export function initUTMTracker(): void {
  if (typeof window === "undefined") return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existing = getUTMParams();

    const newUtms: UTMParams = {
      utm_source: urlParams.get("utm_source") || existing.utm_source || undefined,
      utm_medium: urlParams.get("utm_medium") || existing.utm_medium || undefined,
      utm_campaign: urlParams.get("utm_campaign") || existing.utm_campaign || undefined,
      utm_term: urlParams.get("utm_term") || existing.utm_term || undefined,
      utm_content: urlParams.get("utm_content") || existing.utm_content || undefined,
      referrer: existing.referrer || document.referrer || undefined,
      landing_page: existing.landing_page || window.location.href,
    };

    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newUtms));
  } catch {
    // SessionStorage unavailable fallback
  }
}

export function getUTMParams(): UTMParams {
  if (typeof window === "undefined") return {};

  try {
    const data = window.sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}
