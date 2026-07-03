import { getUTMParams } from "@/utils/utmTracker";

export interface LeadWebhookPayload {
  formType: "kapcsolat" | "beszamitas";
  data: Record<string, unknown>;
  timestamp: string;
  sourceUrl: string;
  utmParams: Record<string, unknown>;
}

export async function sendLeadWebhook(
  formType: "kapcsolat" | "beszamitas",
  formData: Record<string, unknown>
): Promise<boolean> {
  const webhookUrl = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;

  if (!webhookUrl) {
    // Feature flag / graceful fallback if webhook URL is not configured
    return false;
  }

  const targetUrl: string = webhookUrl;

  const payload: LeadWebhookPayload = {
    formType,
    data: formData,
    timestamp: new Date().toISOString(),
    sourceUrl: typeof window !== "undefined" ? window.location.href : "",
    utmParams: getUTMParams() as Record<string, unknown>,
  };

  async function attemptFetch(attemptsLeft: number): Promise<boolean> {
    try {
      const response = await fetch(targetUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        return true;
      }

      if (attemptsLeft > 0) {
        console.warn(`Lead webhook failed (status ${response.status}). Retrying...`);
        await new Promise((res) => setTimeout(res, 1000));
        return attemptFetch(attemptsLeft - 1);
      }

      console.error(`Lead webhook failed after retries with status ${response.status}`);
      return false;
    } catch (err) {
      if (attemptsLeft > 0) {
        console.warn("Lead webhook network error. Retrying...", err);
        await new Promise((res) => setTimeout(res, 1000));
        return attemptFetch(attemptsLeft - 1);
      }

      console.error("Lead webhook exception after retries:", err);
      return false;
    }
  }

  // 2 attempts total (initial + 1 retry)
  return attemptFetch(1);
}
