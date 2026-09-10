import { NextResponse } from "next/server";

/**
 * A kapcsolati és beszámítási űrlapok e-mailben is megérkeznek a kereskedéshez.
 *
 * Miért kellett ez: 2026-09-10-ig az űrlap csak HubSpotba és egy webhookra
 * küldött, ám EGYIK sem volt beállítva élesben, a látogató mégis "Köszönjük,
 * üzenetét rögzítettük" visszajelzést kapott. Az e-mail az egyetlen út, ami
 * külső szolgáltatás konfigurálása nélkül is ellenőrizhető: vagy megjön a
 * postafiókba, vagy nem.
 *
 * Ez az útvonal SZÁNDÉKOSAN nem ad hamis sikert: ha nincs kulcs vagy a
 * küldés elhasal, hibás státuszkóddal tér vissza, és az űrlap ezt ki is írja.
 */

const RESEND_ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_TO = "carssr99@gmail.com";
const DEFAULT_FROM = "CARS SR99 Weboldal <weboldal@mail.pohankaestarsa.com>";

export interface ContactEmailRequestBody {
  formType: "kapcsolat" | "beszamitas";
  name: string;
  email: string;
  phone: string;
  message?: string;
  carInterest?: string;
  extra?: Record<string, string>;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact-email] RESEND_API_KEY nincs beállítva a szerveren.");
    return NextResponse.json(
      { success: false, reason: "EMAIL_NOT_CONFIGURED" },
      { status: 503 }
    );
  }

  let body: ContactEmailRequestBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ success: false, reason: "INVALID_JSON" }, { status: 400 });
  }

  const name = (body.name || "").trim();
  const email = (body.email || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();
  const formType = body.formType === "beszamitas" ? "beszamitas" : "kapcsolat";

  if (!name || !isEmail(email) || !phone) {
    return NextResponse.json({ success: false, reason: "MISSING_FIELDS" }, { status: 400 });
  }

  const label = formType === "beszamitas" ? "Beszámítási kérés" : "Kapcsolatfelvétel";
  const subject = `${label} a weboldalról: ${name}`;

  const rows: Array<[string, string]> = [
    ["Név", name],
    ["E-mail", email],
    ["Telefon", phone],
  ];
  if (body.carInterest) rows.push(["Érdeklődés", body.carInterest]);
  for (const [key, value] of Object.entries(body.extra || {})) {
    if (value) rows.push([key, value]);
  }

  const html = `
    <div style="font-family:system-ui,Segoe UI,Arial,sans-serif;font-size:15px;color:#111">
      <h2 style="margin:0 0 12px">${escapeHtml(label)} a cars-sr99.com oldalról</h2>
      <table cellpadding="6" style="border-collapse:collapse;margin-bottom:16px">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="border:1px solid #ddd;background:#f6f6f6"><b>${escapeHtml(
                k
              )}</b></td><td style="border:1px solid #ddd">${escapeHtml(v)}</td></tr>`
          )
          .join("")}
      </table>
      ${message ? `<p style="margin:0 0 6px"><b>Üzenet:</b></p><p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>` : ""}
      <hr style="margin:20px 0;border:none;border-top:1px solid #ddd">
      <p style="font-size:13px;color:#666;margin:0">
        Erre a levélre válaszolva közvetlenül az érdeklődőnek írsz (${escapeHtml(email)}).
      </p>
    </div>`;

  const text = [
    `${label} a cars-sr99.com oldalról`,
    "",
    ...rows.map(([k, v]) => `${k}: ${v}`),
    message ? `\nÜzenet:\n${message}` : "",
  ].join("\n");

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_EMAIL_FROM || DEFAULT_FROM,
        to: [process.env.CONTACT_EMAIL_TO || DEFAULT_TO],
        reply_to: email,
        subject,
        html,
        text,
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      console.error(`[contact-email] Resend hiba (${response.status}):`, detail);
      return NextResponse.json(
        { success: false, reason: "SEND_FAILED", status: response.status },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("[contact-email] Kivétel küldés közben:", error);
    return NextResponse.json({ success: false, reason: "EXCEPTION" }, { status: 500 });
  }
}
