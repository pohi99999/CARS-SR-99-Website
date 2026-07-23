import { NextResponse } from "next/server";

export interface HubSpotFieldValue {
  name: string;
  value: string;
}

export interface HubSpotSubmitRequestBody {
  formType: "kapcsolat" | "beszamitas";
  fields: HubSpotFieldValue[];
  pageUri?: string;
  pageTitle?: string;
  utmParams?: Record<string, string>;
}

export async function POST(request: Request) {
  try {
    const body: HubSpotSubmitRequestBody = await request.json();
    const { formType, fields, pageUri, pageTitle, utmParams } = body;

    const portalId = process.env.HUBSPOT_PORTAL_ID;
    const formGuid =
      formType === "kapcsolat"
        ? process.env.HUBSPOT_CONTACT_FORM_GUID
        : process.env.HUBSPOT_TRADEIN_FORM_GUID;

    if (!portalId || !formGuid) {
      // If HubSpot credentials are not set on server, return graceful success status
      return NextResponse.json(
        {
          success: false,
          reason: "HUBSPOT_NOT_CONFIGURED",
          message: "HubSpot environment variables (HUBSPOT_PORTAL_ID / FORM_GUID) not set on server.",
        },
        { status: 200 }
      );
    }

    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

    const context = {
      pageUri: pageUri || "",
      pageName: pageTitle || "CARS SR99 Weboldal",
    };

    // Enrich fields with UTM parameters if present
    const enrichedFields = [...fields];
    if (utmParams) {
      if (utmParams.utm_source) enrichedFields.push({ name: "utm_source", value: utmParams.utm_source });
      if (utmParams.utm_medium) enrichedFields.push({ name: "utm_medium", value: utmParams.utm_medium });
      if (utmParams.utm_campaign) enrichedFields.push({ name: "utm_campaign", value: utmParams.utm_campaign });
    }

    const hsResponse = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fields: enrichedFields,
        context,
      }),
    });

    if (!hsResponse.ok) {
      const errorText = await hsResponse.text();
      console.error(`[Server API /api/hubspot-submit] HubSpot API failed (${hsResponse.status}):`, errorText);
      return NextResponse.json({ success: false, status: hsResponse.status }, { status: 200 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[Server API /api/hubspot-submit] Exception:", error);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
