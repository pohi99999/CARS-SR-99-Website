import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FomoNotification from "@/components/FomoNotification";
import ImageGallery from "@/components/ImageGallery";
import LeasingCalculator from "@/components/LeasingCalculator";
import PdfBrochureButton from "@/components/PdfBrochureButton";
import Vehicle360Viewer from "@/components/Vehicle360Viewer";
import { parsePriceToNumber } from "@/data/inventory";
import { getCarByIdAsync } from "@/services/inventoryService";

type CarDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: CarDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const car = await getCarByIdAsync(id);

  if (!car) {
    return {
      title: "Jármű nem található",
      description: "A keresett jármű nem érhető el a CARS SR99 Kft. kínálatában.",
    };
  }

  const carName = `${car.marka} ${car.modell}`;
  const title = `Eladó ${carName} - CARS SR99 Kft.`;
  const description = `${car.evjarat}-es ${carName}, ${car.futasteljesitmeny} futásteljesítménnyel, ${car.uzemanyag} hajtással. JSZP ellenőrzött jármű a CARS SR99 Kft. kínálatában.`;
  const pageUrl = `/kinalat/${car.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "article",
      images: [
        {
          url: car.images[0],
          alt: carName,
        },
      ],
    },
  };
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { id } = await params;
  const car = await getCarByIdAsync(id);

  if (!car) {
    notFound();
  }

  const numericPrice = parsePriceToNumber(car.ar);
  const carName = `${car.marka} ${car.modell}`;
  const carDescription = `${car.evjarat}-es ${carName}, ${car.futasteljesitmeny} futásteljesítménnyel, ${car.uzemanyag} hajtással. JSZP ellenőrzött jármű a CARS SR99 Kft. kínálatában.`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: carName,
    image: car.images,
    description: carDescription,
    category: "Vehicle",
    brand: {
      "@type": "Brand",
      name: car.marka,
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "HUF",
      price: numericPrice,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/UsedCondition",
      url: `https://cars-sr99-website.vercel.app/kinalat/${car.id}`,
    },
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <FomoNotification />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Breadcrumbs
        items={[
          { name: "Főoldal", href: "/" },
          { name: "Kínálatunk", href: "/kinalat" },
          { name: carName },
        ]}
      />
      <div className="mb-6">
        <Link href="/kinalat" className="text-sm font-medium text-cyan-600 hover:text-cyan-500">
          ← Vissza a kínálathoz
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <ImageGallery images={car.images} />

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

          <PdfBrochureButton
            carName={carName}
            price={car.ar}
            year={car.evjarat}
            mileage={car.futasteljesitmeny}
            fuel={car.uzemanyag}
            imageUrl={car.images[0]}
          />
          <Vehicle360Viewer imageUrl={car.images[0]} carName={carName} />

          <Link
            href={`/kapcsolat?car=${encodeURIComponent(`${car.marka} ${car.modell}`)}`}
            className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-[#2B2B2B] transition hover:bg-cyan-300"
          >
            Kapcsolatfelvétel
          </Link>

          <section className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
            <h2 className="text-base font-semibold text-emerald-900">
              Járműelőélet és Transzparencia
            </h2>
            <p className="mt-2 text-sm leading-6 text-emerald-800">
              A jármű futásteljesítménye és kártörténete a JSZP rendszerében ellenőrzött.
              Vásárlás előtt is fontosnak tartjuk a hiteles, átlátható információkat.
            </p>
            <a
              href="https://szuf.magyarorszag.hu/jszp_szuf"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-[#2B2B2B] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#1f1f1f]"
            >
              Lekérdezés a JSZP-ben
            </a>
          </section>

          <LeasingCalculator price={numericPrice} />
        </div>
      </div>
    </section>
  );
}
