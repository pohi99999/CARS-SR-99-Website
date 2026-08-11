import { fetchInventory } from "@/services/inventoryService";
import type { Car } from "@/data/inventory";

// Canonical (non-redirecting) domain - avoids the apex->www 308 redirect that crawlers may not follow.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cars-sr99.com";

const dealer = {
  addr1: "Ságod hrsz. 807/15",
  city: "Zalaegerszeg",
  region: "Zala",
  country: "HU",
  postalCode: "8900",
  latitude: 46.862,
  longitude: 16.835,
};

// Revalidate the feed once an hour so Meta always sees fresh data on its next crawl.
export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function parseNumber(value: string): number | null {
  const digitsOnly = value.replace(/[^\d]/g, "");
  return digitsOnly ? Number(digitsOnly) : null;
}

// Meta Automotive Inventory Ads fuel_type enum: DIESEL, ELECTRIC, FLEX, GASOLINE, HYBRID, OTHER.
function toFuelType(uzemanyag: string): string {
  const normalized = uzemanyag.trim().toLowerCase();
  if (normalized.includes("dízel") || normalized.includes("diesel")) return "DIESEL";
  if (normalized.includes("benzin") || normalized.includes("gasoline") || normalized.includes("petrol")) return "GASOLINE";
  if (normalized.includes("hibrid") || normalized.includes("hybrid")) return "HYBRID";
  if (normalized.includes("elektrom") || normalized.includes("electric")) return "ELECTRIC";
  return "OTHER";
}

// Meta Automotive Inventory Ads body_style enum: CONVERTIBLE, COUPE, HATCHBACK, MINIVAN, TRUCK, SUV, SEDAN, VAN, WAGON, CROSSOVER, SMALL_CAR, OTHER.
function inferBodyStyle(modell: string): string {
  const normalized = modell.toLowerCase();
  if (normalized.includes("touring") || normalized.includes("avant") || normalized.includes("combi") || normalized.includes("kombi")) return "WAGON";
  if (normalized.includes("spacetourer") || normalized.includes("alhambra")) return "MINIVAN";
  if (normalized.includes("f-pace") || normalized.includes("x6") || normalized.includes("kuga") || normalized.includes("xv")) return "SUV";
  return "SEDAN";
}

// Best-effort color detection from the free-text description (required field, no color data in inventory.ts yet).
function inferExteriorColor(leiras: string | undefined): string {
  const text = (leiras ?? "").toLowerCase();
  if (text.includes("mélykék") || text.includes("kék")) return "Kék";
  if (text.includes("fehér")) return "Fehér";
  if (text.includes("fekete")) return "Fekete";
  if (text.includes("zöld")) return "Zöld";
  if (text.includes("ezüst")) return "Ezüst";
  if (text.includes("szürke")) return "Szürke";
  if (text.includes("piros") || text.includes("vörös")) return "Piros";
  return "Ismeretlen";
}

function inferTransmission(modell: string, leiras: string | undefined): string {
  const text = `${modell} ${leiras ?? ""}`.toLowerCase();
  if (text.includes("kézi")) return "Manual";
  return "Automatic";
}

function inferDrivetrain(modell: string, leiras: string | undefined): string | null {
  const text = `${modell} ${leiras ?? ""}`.toLowerCase();
  if (text.includes("xdrive") || text.includes("awd") || text.includes("4wd") || text.includes("quattro")) return "AWD";
  return null;
}

function toAbsoluteImageUrl(imagePath: string): string {
  return imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;
}

function buildListingXml(car: Car): string {
  const title = escapeXml(`${car.evjarat} ${car.marka} ${car.modell}`);
  const description = escapeXml(car.leiras ?? `${car.marka} ${car.modell} (${car.evjarat})`);
  const url = `${siteUrl}/kinalat/${car.id}`;
  const priceValue = parseNumber(car.ar);
  const mileageValue = parseNumber(car.futasteljesitmeny) ?? 0;
  const drivetrain = inferDrivetrain(car.modell, car.leiras);

  const imageTags = car.images
    .slice(0, 20)
    .map((image) => `      <image>\n        <url>${escapeXml(toAbsoluteImageUrl(image))}</url>\n      </image>`)
    .join("\n");

  return `  <listing>
    <vehicle_id>${escapeXml(car.id)}</vehicle_id>
    <title>${title}</title>
    <description>${description}</description>
    <url>${escapeXml(url)}</url>
    <make>${escapeXml(car.marka)}</make>
    <model>${escapeXml(car.modell)}</model>
    <year>${car.evjarat}</year>
    <mileage>
      <value>${mileageValue}</value>
      <unit>KM</unit>
    </mileage>
${imageTags}
    <body_style>${inferBodyStyle(car.modell)}</body_style>
    <fuel_type>${toFuelType(car.uzemanyag)}</fuel_type>
    <transmission>${inferTransmission(car.modell, car.leiras)}</transmission>
${drivetrain ? `    <drivetrain>${drivetrain}</drivetrain>` : ""}
    <price>${priceValue !== null ? priceValue : 0} HUF</price>
    <exterior_color>${escapeXml(inferExteriorColor(car.leiras))}</exterior_color>
    <state_of_vehicle>Used</state_of_vehicle>
    <availability>available</availability>
    <vehicle_type>car_truck</vehicle_type>
    <address format="simple">
      <component name="addr1">${escapeXml(dealer.addr1)}</component>
      <component name="city">${escapeXml(dealer.city)}</component>
      <component name="region">${escapeXml(dealer.region)}</component>
      <component name="postal_code">${escapeXml(dealer.postalCode)}</component>
      <component name="country">${escapeXml(dealer.country)}</component>
    </address>
    <latitude>${dealer.latitude}</latitude>
    <longitude>${dealer.longitude}</longitude>
  </listing>`;
}

export async function GET() {
  const inventory = await fetchInventory();

  const listings = inventory.map(buildListingXml).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<listings>
  <title>CARS SR99 Kft. - Jármű Katalógus</title>
  <link rel="self" href="${siteUrl}/facebook-feed.xml" />
${listings}
</listings>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
