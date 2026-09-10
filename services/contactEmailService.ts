export interface SendContactEmailParams {
  formType: "kapcsolat" | "beszamitas";
  name: string;
  email: string;
  phone: string;
  message?: string;
  carInterest?: string;
  extra?: Record<string, string>;
}

/**
 * Az űrlap tartalmának elküldése e-mailben a kereskedésnek.
 *
 * A visszatérési érték a küldés VALÓDI eredménye. A hívó erre alapozza a
 * visszajelzést, ezért itt nincs "graceful true" fallback: ha nem ment el,
 * a látogatónak ezt látnia kell.
 */
export async function sendContactEmail(params: SendContactEmailParams): Promise<boolean> {
  try {
    const response = await fetch("/api/contact-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      console.error("[Contact Email] Sikertelen küldés, státusz:", response.status);
      return false;
    }

    const data = await response.json();
    return Boolean(data?.success);
  } catch (error) {
    console.error("[Contact Email] Hálózati hiba küldés közben:", error);
    return false;
  }
}
