import AboutSection from "@/components/AboutSection";
import CarFilter from "@/components/CarFilter";
import Link from "next/link";
import InventorySection from "@/components/InventorySection";
import SocialProofWall from "@/components/SocialProofWall";
import Testimonials from "@/components/Testimonials";
import WarrantySection from "@/components/WarrantySection";
import { fetchInventory } from "@/services/inventoryService";

type HomePageProps = {
  searchParams: Promise<{
    marka?: string;
    uzemanyag?: string;
  }>;
};

const allowedMarkak = new Set(["Toyota", "Kia"]);
const allowedUzemanyagok = new Set(["Hibrid", "Benzin", "Diesel"]);

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const selectedMarka = params.marka && allowedMarkak.has(params.marka) ? params.marka : "Összes";
  const selectedUzemanyag =
    params.uzemanyag && allowedUzemanyagok.has(params.uzemanyag) ? params.uzemanyag : "Összes";
  const inventory = await fetchInventory();
  const filteredCars = inventory.filter((car) => {
    const markaMatches = selectedMarka === "Összes" || car.marka === selectedMarka;
    const uzemanyagMatches = selectedUzemanyag === "Összes" || car.uzemanyag === selectedUzemanyag;
    return markaMatches && uzemanyagMatches;
  });

  return (
    <>
      <section className="relative overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3802518/3802518-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />

        <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-4 py-20 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
              CARS SR99 Kft.
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Üdvözöljük a CARS SR99 Kft. új weboldalán
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Prémium választék, biztonságos ügyintézés és modern autóvásárlási élmény egy helyen.
            </p>
            <div className="mt-10">
              <Link
                href="/kinalat"
                className="inline-flex items-center justify-center rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-[#2B2B2B] shadow-[0_0_24px_rgba(34,211,238,0.35)] transition hover:bg-cyan-300"
              >
                Kínálatunk megtekintése
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CarFilter initialMarka={selectedMarka} initialUzemanyag={selectedUzemanyag} />
      <InventorySection cars={filteredCars} />
      <AboutSection />
      <SocialProofWall />
      <Testimonials />
      <WarrantySection />
    </>
  );
}
