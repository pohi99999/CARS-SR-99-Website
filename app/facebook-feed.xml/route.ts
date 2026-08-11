import { fetchInventory } from "@/services/inventoryService";
import type { Car } from "@/data/inventory";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

const dealerAddress = {
  addr1: "Ságod hrsz. 807/15",
  city: "Zalaegerszeg",
  region: "Zala",
  country: "HU",
  postalCode: "8900",
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

function toFuelType(uzemanyag: string): string {
  const normalized = uzemanyag.trim().toLowerCase();
  if (normalized.includes("dízel") || normalized.includes("diesel")) return "DIESEL";
  if (normalized.includes("benzin")) return "GASOLINE";
  if (normalized.includes("hibrid") || normalized.includes("hybrid")) return "HYBRID";
  if (normalized.includes("elektrom") || normalized.includes("electric")) return "ELECTRIC";
  return "OTHER";
}

function toAbsoluteImageUrl(imagePath: string): string {
  return imagePath.startsWith("http") ? imagePath : `${siteUrl}${imagePath}`;
}

function buildListingXml(car: Car): string {
  const title = escapeXml(`${car.evjarat} ${car.marka} ${car.modell}`);
  const description = escapeXml(car.leiras ?? `${car.marka} ${car.modell} (${car.evjarat})`);
  const link = `${siteUrl}/kinalat/${car.id}`;
  const priceValue = parseNumber(car.ar);
  const mileageValue = parseNumber(car.futasteljesitmeny);
  const [mainImage, ...additionalImages] = car.images;

  const additionalImageTags = additionalImages
    .slice(0, 9)
    .map((image) => `      <g:additional_image_link>${escapeXml(toAbsoluteImageUrl(image))}</g:additional_image_link>`)
    .join("\n");

  return `    <item>
      <g:id>${escapeXml(car.id)}</g:id>
      <g:vehicle_id>${escapeXml(car.id)}</g:vehicle_id>
      <g:title>${title}</g:title>
      <g:description>${description}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(toAbsoluteImageUrl(mainImage))}</g:image_link>
${additionalImageTags}
      <g:price>${priceValue !== null ? `${priceValue} HUF` : ""}</g:price>
      <g:make>${escapeXml(car.marka)}</g:make>
      <g:model>${escapeXml(car.modell)}</g:model>
      <g:year>${car.evjarat}</g:year>
${mileageValue !== null
      ? `      <g:mileage>\n        <g:value>${mileageValue}</g:value>\n        <g:unit>KM</g:unit>\n      </g:mileage>`
      : ""}
      <g:fuel_type>${toFuelType(car.uzemanyag)}</g:fuel_type>
      <g:vehicle_type>car_truck</g:vehicle_type>
      <g:condition>used</g:condition>
      <g:state_of_vehicle>USED</g:state_of_vehicle>
      <g:availability>available</g:availability>
      <g:address>
        <g:addr1>${escapeXml(dealerAddress.addr1)}</g:addr1>
        <g:city>${escapeXml(dealerAddress.city)}</g:city>
        <g:region>${escapeXml(dealerAddress.region)}</g:region>
        <g:country>${escapeXml(dealerAddress.country)}</g:country>
        <g:postal_code>${escapeXml(dealerAddress.postalCode)}</g:postal_code>
      </g:address>
    </item>`;
}

export async function GET() {
  const inventory = await fetchInventory();

  const items = inventory.map(buildListingXml).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>CARS SR99 Kft. - Jármű Katalógus</title>
    <link>${siteUrl}</link>
    <description>CARS SR99 Kft. aktuális jármű készlete - Meta Automotive XML Feed</description>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
