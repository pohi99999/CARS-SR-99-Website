/**
 * A weboldal alap-URL-je és a hozzá tartozó, SEO szempontból fontos azonosítók.
 *
 * Miért egy helyen? Korábban a `siteUrl` konstans hat különböző fájlban volt
 * lemásolva, és a `components/Breadcrumbs.tsx`-ben egy elgépelt, nem létező
 * domain szerepelt ("cars-sr99-website.vercel.app"). Emiatt a morzsamenü
 * strukturált adata halott URL-eket hirdetett a Google felé. Egyetlen forrásból
 * dolgozva ez a hibaosztály nem fordulhat elő újra.
 *
 * A `NEXT_PUBLIC_SITE_URL` a Vercelen `https://www.cars-sr99.com` értékre van
 * állítva. FONTOS: a www-s és a www nélküli alak nem cserélhető fel – az éles
 * kiszolgáló a www nélkülit 308-cal a www-sre irányítja, így a kanonikus
 * URL-eknek is a www-s alakot kell hirdetniük.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cars-sr99.com";

/**
 * A cég stabil entitás-azonosítója a schema.org gráfban.
 *
 * Minden aloldal sémája (jármű, szolgáltatás, morzsamenü) erre hivatkozik
 * vissza, így a Google egyetlen valós vállalkozásként fűzi össze az oldalakat,
 * nem pedig egymástól független adattöredékekként.
 */
export const businessId = `${siteUrl}/#autodealer`;

/** A weboldal mint entitás azonosítója (WebSite séma). */
export const websiteId = `${siteUrl}/#website`;

/**
 * Relatív útvonalból abszolút, URL-biztos címet készít a strukturált adatokhoz.
 *
 * Miért kell? A képmappák egy része ékezetes nevű (pl.
 * "/geppark/Audi-A4-Avant-2017-kész/..."). A böngésző és a Next.js Metadata API
 * ezeket automatikusan százalékkódolja, a JSON-LD-be viszont eddig nyers
 * sztringösszefűzéssel kerültek be – az így hirdetett képcímek élesben 404-et
 * adtak, vagyis a Google a járműhirdetések képeit nem tudta letölteni.
 *
 * Az `encodeURI` csak a nem megengedett karaktereket kódolja, a "/" és a ":"
 * érintetlen marad. Kizárólag NYERS (még nem kódolt) útvonalra hívjuk, különben
 * a "%" jelek duplán kódolódnának.
 */
export function absoluteUrl(path: string): string {
  return encodeURI(`${siteUrl}${path}`);
}
