import { getUTMParams } from "@/utils/utmTracker";

export interface HubSpotFieldValue {
  name: string;
  value: string;
}

export interface SubmitHubSpotFormParams {
  formType: "kapcsolat" | "beszamitas";
  fields: HubSpotFieldValue[];
  pageTitle?: string;
  pageUri?: string;
}

export async function submitToHubSpot({
  formType,
  fields,
  pageTitle,
  pageUri,
}: SubmitHubSpotFormParams): Promise<boolean> {
  try {
    const utmParams = getUTMParams() as Record<string, string>;

    const response = await fetch("/api/hubspot-submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        formType,
        fields,
        pageTitle: pageTitle || (typeof window !== "undefined" ? document.title : ""),
        pageUri: pageUri || (typeof window !== "undefined" ? window.location.href : ""),
        utmParams,
      }),
    });

    if (!response.ok) {
      console.error("[HubSpot Service] Internal API route response not OK:", response.status);
      return false;
    }

    const data = await response.json();
    return Boolean(data?.success);
  } catch (error) {
    console.error("[HubSpot Service] Error calling internal API route:", error);
    return false;
  }
}
