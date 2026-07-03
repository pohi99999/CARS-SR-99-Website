import Image from "next/image";
import type { Car } from "@/data/inventory";

type CarCardProps = {
  car: Car;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[16/10] w-full overflow-hidden bg-slate-200">
        <Image
          src={car.imageUrl}
          alt={`${car.marka} ${car.modell}`}
          width={1200}
          height={800}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-cyan-600">{car.marka}</p>
          <h3 className="mt-1 text-lg font-semibold text-[#2B2B2B]">{car.modell}</h3>
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm text-slate-600">
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Évjárat</dt>
            <dd className="mt-1 font-medium text-slate-700">{car.evjarat}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Üzemanyag</dt>
            <dd className="mt-1 font-medium text-slate-700">{car.uzemanyag}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Futás</dt>
            <dd className="mt-1 font-medium text-slate-700">{car.futasteljesitmeny}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-slate-400">Ár</dt>
            <dd className="mt-1 font-semibold text-[#2B2B2B]">{car.ar}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
        >
          Részletek
        </button>
      </div>
    </article>
  );
}
