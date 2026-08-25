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
      // A cars-sr99.vercel.app alapértelmezett Vercel-domain a saját domainnel
      // párhuzamosan, ugyanazzal a tartalommal is elérhető marad, és a Google ezt
      // önállóan indexelte (pl. a régi, lapos /skoda-octavia-2022-kezi URL-t) – ez
      // a saját domainnel versengő duplikált tartalom, ami megosztja a rangsorolási
      // jelzéseket. Minden kérést 308-cal a kanonikus www.cars-sr99.com domainre
      // irányítunk, hogy a Google fokozatosan kivezesse a vercel.app URL-eket.
      {
        source: "/:path*",
        has: [{ type: "host" as const, value: "cars-sr99.vercel.app" }],
        destination: "https://www.cars-sr99.com/:path*",
        permanent: true,
      },
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
