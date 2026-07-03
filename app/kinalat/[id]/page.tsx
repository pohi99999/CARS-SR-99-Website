import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import LeasingCalculator from "@/components/LeasingCalculator";
import { getCarById, parsePriceToNumber } from "@/data/inventory";

type CarDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = getCarById(id);

  if (!car) {
    notFound();
  }

  const numericPrice = parsePriceToNumber(car.ar);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/#kinalat" className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
          ← Vissza a kínálathoz
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          <Image
            src={car.imageUrl}
            alt={`${car.marka} ${car.modell}`}
            width={1200}
            height={800}
            priority
            className="h-full w-full object-cover"
          />
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-600">{car.marka}</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#2B2B2B]">{car.modell}</h1>
          <p className="mt-3 text-3xl font-extrabold text-[#2B2B2B]">{car.ar}</p>

          <dl className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Márka</dt>
              <dd className="mt-1 font-semibold text-slate-800">{car.marka}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Modell</dt>
              <dd className="mt-1 font-semibold text-slate-800">{car.modell}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Évjárat</dt>
              <dd className="mt-1 font-semibold text-slate-800">{car.evjarat}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Futásteljesítmény</dt>
              <dd className="mt-1 font-semibold text-slate-800">{car.futasteljesitmeny}</dd>
            </div>
            <div className="rounded-lg bg-slate-50 p-4 sm:col-span-2">
              <dt className="text-xs uppercase tracking-wide text-slate-500">Üzemanyag</dt>
              <dd className="mt-1 font-semibold text-slate-800">{car.uzemanyag}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
          >
            Kapcsolatfelvétel
          </button>

          <LeasingCalculator price={numericPrice} />
        </div>
      </div>
    </section>
  );
}
