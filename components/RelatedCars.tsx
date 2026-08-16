import Image from "next/image";
import Link from "next/link";
import { CalendarRange, Fuel } from "lucide-react";
import type { Car } from "@/data/inventory";

type RelatedCarsProps = {
  /** Az éppen megtekintett jármű – ez sosem szerepelhet a javaslatok között. */
  currentCar: Car;
  /** A teljes készlet, amiből válogatunk. */
  inventory: Car[];
  /** Hány javaslatot jelenítsünk meg. */
  limit?: number;
};

const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMWEyODMzIi8+PC9zdmc+";

/**
 * A megjelenítendő javaslatok kiválasztása: először azonos márka, utána azonos
 * üzemanyagtípus, végül a készlet többi eleme tölti fel a helyet. Így a lista
 * akkor is mindig tele van, ha egy márkából csak egy autó van raktáron.
 */
function pickRelated(currentCar: Car, inventory: Car[], limit: number): Car[] {
  const candidates = inventory.filter((car) => car.id !== currentCar.id);

  const score = (car: Car): number => {
    if (car.marka === currentCar.marka) return 0;
    if (car.uzemanyag === currentCar.uzemanyag) return 1;
    return 2;
  };

  return [...candidates]
    .sort((a, b) => score(a) - score(b) || b.evjarat - a.evjarat)
    .slice(0, limit);
}

/**
 * "Hasonló autók" blokk a jármű adatlapok alján.
 *
 * SEO-indok: a Search Console szerint az adatlapok "Felfedezve – jelenleg nincs
 * indexelve" állapotban ragadtak. Ennek egyik tipikus oka, hogy az aloldalak
 * zsákutcák: korábban egyetlen adatlapról sem vezetett link másik adatlapra,
 * csak a főoldalról és a kínálat oldalról lehetett elérni őket. Az oldalankénti
 * néhány oldalirányú hivatkozás bejárási útvonalat ad a keresőrobotnak, és
 * elosztja a belső hivatkozási súlyt a járművek között.
 */
export default function RelatedCars({ currentCar, inventory, limit = 3 }: RelatedCarsProps) {
  const related = pickRelated(currentCar, inventory, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-16" aria-labelledby="hasonlo-autok-cim">
      <h2
        id="hasonlo-autok-cim"
        className="text-2xl font-bold tracking-tight text-slate-100 sm:text-3xl"
      >
        Hasonló autók a kínálatunkból
      </h2>
      <p className="mt-2 text-sm text-slate-400">
        További ellenőrzött előéletű használt autók a CARS SR99 Kft. zalaegerszegi telephelyéről.
      </p>

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((car) => (
          <li key={car.id} className="h-full">
            <Link
              href={`/kinalat/${car.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] backdrop-blur-xl transition-all duration-300 hover:border-sky-500/40 hover:shadow-[inset_0_0_20px_rgba(56,189,248,0.15),0_24px_55px_rgba(0,0,0,0.5)]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-900">
                <Image
                  src={car.images[0]}
                  alt={`Eladó ${car.marka} ${car.modell} (${car.evjarat}) – CARS SR99 Kft. Zalaegerszeg`}
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

      <Link
        href="/kinalat"
        className="mt-8 inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
      >
        Teljes kínálat megtekintése
      </Link>
    </section>
  );
}
