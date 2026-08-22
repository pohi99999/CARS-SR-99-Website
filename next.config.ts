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

  async redirects() {
    // A weboldal korábban a cars-sr99.vercel.app címen élt, és az adatlapok a
    // gyökérben voltak (pl. /skoda-octavia-2022-kezi) a mai /kinalat/... helyett.
    // A Google indexében máig szerepelnek ilyen régi URL-ek. Ezek 308-as
    // átirányítása átvezeti a felhalmozott rangsorolási jelzéseket az élő
    // adatlapokra ahelyett, hogy 404-en vesznének el.
    const legacyFlatUrls = inventory.map((car) => ({
      source: `/${car.id}`,
      destination: `/kinalat/${car.id}`,
      permanent: true,
    }));

    return [
      ...legacyFlatUrls,
      // Az autóbérlés szolgáltatás megszűnt, az oldal 2026.08.22-én kikerült a
      // kínálatból. A már indexelt URL-t a kínálati listára irányítjuk, hogy a
      // Google ne 404-et lásson, és az esetleges látogató is releváns tartalomra
      // érkezzen.
      {
        source: "/autoberles",
        destination: "/kinalat",
        permanent: true,
      },
      // A BMW X6 hirdetés helyes BMW-elnevezése "xDrive30d" (3.0 literes biturbó
      // dízelmotor, 306 LE) – a korábbi "xDrive40d" azonosító félreérthető volt.
      // Az URL 2026.08.22-én megváltozott, ez tartja életben a Google-nél már
      // felhalmozott rangsorolási jelzéseket.
      {
        source: "/kinalat/bmw-x6-xdrive40d-2012",
        destination: "/kinalat/bmw-x6-xdrive30d-2012",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
