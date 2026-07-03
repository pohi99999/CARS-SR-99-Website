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
  const portalId = process.env.HUBSPOT_PORTAL_ID || process.env.NEXT_PUBLIC_HUBSPOT_PORTAL_ID;
  const formGuid =
    formType === "kapcsolat"
      ? process.env.HUBSPOT_CONTACT_FORM_GUID || process.env.NEXT_PUBLIC_HUBSPOT_CONTACT_FORM_GUID
      : process.env.HUBSPOT_TRADEIN_FORM_GUID || process.env.NEXT_PUBLIC_HUBSPOT_TRADEIN_FORM_GUID;

  if (!portalId || !formGuid) {
    // Feature flag / graceful fallback when HubSpot IDs are not configured yet
    return false;
  }

  try {
    const utms = getUTMParams();
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const context = {
      pageUri: pageUri || (typeof window !== "undefined" ? window.location.href : ""),
      pageName: pageTitle || (typeof window !== "undefined" ? document.title : "CARS SR99 Weboldal"),
    };

    // Include UTMs as additional field data if available
    const enrichedFields = [...fields];
    if (utms.utm_source) enrichedFields.push({ name: "utm_source", value: utms.utm_source });
    if (utms.utm_medium) enrichedFields.push({ name: "utm_medium", value: utms.utm_medium });
    if (utms.utm_campaign) enrichedFields.push({ name: "utm_campaign", value: utms.utm_campaign });

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: enrichedFields,
        context,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`HubSpot API submission failed (${response.status}):`, errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("HubSpot submission exception:", error);
    return false;
  }
}
