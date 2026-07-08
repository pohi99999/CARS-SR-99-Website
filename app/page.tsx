import dynamic from "next/dynamic";
import HeroCTAButtons from "@/components/HeroCTAButtons";
import InventorySection from "@/components/InventorySection";
import { fetchInventory } from "@/services/inventoryService";

const CarFilter = dynamic(() => import("@/components/CarFilter"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const SocialProofWall = dynamic(() => import("@/components/SocialProofWall"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

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
          poster="/hero-poster.webp"
          {...{ fetchPriority: "high" }}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source
            src="https://videos.pexels.com/video-files/3802518/3802518-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/60" />

        <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-6 py-20 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
              CARS SR99 Kft.
            </p>
            <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl lg:text-6xl">
              Prémium Autók. Megbízható Kereskedés.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Toyota és Kia modellek gondosan válogatva – hibrid, benzin és diesel kínálattal, értékálló garanciával.
            </p>
            <HeroCTAButtons />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-slate-700/50 pt-8">
              <div>
                <p className="text-3xl font-bold text-cyan-400">500+</p>
                <p className="mt-1 text-sm text-slate-400">Eladott autó</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">15+</p>
                <p className="mt-1 text-sm text-slate-400">Év tapasztalat</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-cyan-400">4.9</p>
                <p className="mt-1 text-sm text-slate-400">Ügyfélelégedettség</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CarFilter initialMarka={selectedMarka} initialUzemanyag={selectedUzemanyag} />
      <InventorySection cars={filteredCars} />
      <TrustBadges />
      <AboutSection />
      <SocialProofWall />
      <Testimonials />
    </>
  );
}

