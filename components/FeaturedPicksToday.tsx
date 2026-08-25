import Image from "next/image";
import Link from "next/link";
import { CalendarRange, Fuel, Sparkles } from "lucide-react";
import type { Car } from "@/data/inventory";

type FeaturedPicksTodayProps = {
  inventory: Car[];
  limit?: number;
};

const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWEyODMzIi8+PC9zdmc+";

/**
 * Az aznapi kiemelt autók kiválasztása. A napi rotáció (naptári nap sorszáma
 * szerint eltolt kezdőindex) biztosítja, hogy minden jármű rendszeresen sorra
 * kerüljön a főoldal legfelső, legjobban látogatott blokkjában – ez a
 * legerősebb belső hivatkozási pozíció az oldalon.
 *
 * SEO-indok: a Search Console szerint a jármű-adatlapok jelentős része
 * "Felfedezve – jelenleg nincs indexelve" állapotban ragad. Egy statikus
 * főoldal minden nap ugyanazt a HTML-t adja a keresőrobotnak, ami gyengébb
 * újra-feltérképezési jelzés, mint egy naponta változó, friss belső linkelés.
 * A determinisztikus (nem véletlenszerű) rotáció garantálja, hogy ugyanazon a
 * napon minden látogató és a Google is ugyanazt a válogatást látja.
 */
function pickFeatured(inventory: Car[], limit: number): Car[] {
  if (inventory.length === 0) return [];

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000,
  );
  const startIndex = dayOfYear % inventory.length;
  const count = Math.min(limit, inventory.length);

  return Array.from({ length: count }, (_, offset) => inventory[(startIndex + offset) % inventory.length]);
}

export default function FeaturedPicksToday({ inventory, limit = 3 }: FeaturedPicksTodayProps) {
  const featured = pickFeatured(inventory, limit);

  if (featured.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto w-full max-w-7xl px-6 py-12 sm:px-6 lg:px-8" aria-labelledby="mai-kiemelt-cim">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-sky-400" aria-hidden="true" />
        <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">Ma kiemelten ajánljuk</p>
      </div>
      <h2 id="mai-kiemelt-cim" className="mt-2 text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl">
        Naponta frissülő válogatás a kínálatunkból
      </h2>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((car) => (
          <li key={car.id} className="h-full">
            <Link
              href={`/kinalat/${car.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-[inset_0_0_20px_rgba(56,189,248,0.15),0_24px_55px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={car.images[0]}
                  alt={`Eladó használt ${car.marka} ${car.modell} (${car.evjarat}) – CARS SR99 Kft. Zalaegerszeg`}
                  width={800}
                  height={500}
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full border border-sky-400/30 bg-black/60 px-3 py-1 text-xs font-light uppercase tracking-widest text-sky-300 backdrop-blur-sm">
                  {car.marka}
                </span>
              </div>

              <div className="flex flex-1 flex-col justify-between gap-4 p-5">
                <h3 className="text-base font-semibold leading-snug text-slate-100 transition-colors group-hover:text-sky-300">
                  {car.marka} {car.modell}
                </h3>

                <div>
                  <dl className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CalendarRange className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                      <dt className="sr-only">Évjárat</dt>
                      <dd>{car.evjarat}</dd>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Fuel className="h-3.5 w-3.5 text-sky-400" aria-hidden="true" />
                      <dt className="sr-only">Üzemanyag</dt>
                      <dd>{car.uzemanyag}</dd>
                    </div>
                  </dl>
                  <p className="mt-3 text-lg font-extrabold text-sky-400">{car.ar}</p>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
