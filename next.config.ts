import type { NextConfig } from "next";
import { inventory } from "./data/inventory";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  async headers() {
    return [
      {
        // A public/ mappában lévő belső értékesítési akcióterv nyilvánosan
        // elérhető az éles domainen. A fájl eltávolítása üzleti döntés, de amíg
        // ott van, legalább ne kerüljön be a Google indexébe.
        // (Robots.txt-vel NEM tiltjuk: az maga is nyilvános, és csak felhívná
        // a figyelmet az útvonalra – a noindex fejléc a helyes eszköz.)
        source: "/CARS-SR99-Akcioterv.html",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    // A weboldal korábban a cars-sr99.vercel.app címen élt, és az adatlapok a
    // gyökérben voltak (pl. /skoda-octavia-2022-kezi) a mai /kinalat/... helyett.
    // A Google indexében máig szerepelnek ilyen régi URL-ek. Ezek 308-as
    // átirányítása átvezeti a felhalmozott rangsorolási jelzéseket az élő
    // adatlapokra ahelyett, hogy 404-en vesznének el.
    return inventory.map((car) => ({
      source: `/${car.id}`,
      destination: `/kinalat/${car.id}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
