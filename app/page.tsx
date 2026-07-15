import dynamic from "next/dynamic";
import HeroCTAButtons from "@/components/HeroCTAButtons";
import InventorySection from "@/components/InventorySection";
import { fetchInventory } from "@/services/inventoryService";
import { parsePriceToNumber } from "@/data/inventory";

const CarFilter = dynamic(() => import("@/components/CarFilter"));
const AboutSection = dynamic(() => import("@/components/AboutSection"));
const TrustBadges = dynamic(() => import("@/components/TrustBadges"));
const SocialProofWall = dynamic(() => import("@/components/SocialProofWall"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));

type HomePageProps = {
  searchParams: Promise<{
    marka?: string;
    uzemanyag?: string;
    maxPrice?: string;
  }>;
};

export default async function Home({ searchParams }: HomePageProps) {
  const params = await searchParams;
  
  const inventory = await fetchInventory();

  // Dynamically collect valid options from the actual inventory
  const allowedMarkak = new Set(inventory.map(car => car.marka));
  const allowedUzemanyagok = new Set(inventory.map(car => car.uzemanyag));

  const selectedMarka = params.marka && allowedMarkak.has(params.marka) ? params.marka : "Összes";
  const selectedUzemanyag =
    params.uzemanyag && allowedUzemanyagok.has(params.uzemanyag) ? params.uzemanyag : "Összes";

  // Dynamic price bounds
  const validPrices = inventory
    .map((car) => parsePriceToNumber(car.ar))
    .filter((price) => price > 0);
  const maxPriceLimit = validPrices.length > 0 ? Math.max(...validPrices) : 10000000;

  const maxPriceParam = params.maxPrice ? parseInt(params.maxPrice, 10) : maxPriceLimit;

  const filteredCars = inventory.filter((car) => {
    const markaMatches = selectedMarka === "Összes" || car.marka === selectedMarka;
    const uzemanyagMatches = selectedUzemanyag === "Összes" || car.uzemanyag === selectedUzemanyag;
    
    const numericPrice = parsePriceToNumber(car.ar);
    // Allow cars with "Kérjen ajánlatot" (0 Ft) to pass price limits, filter others
    const priceMatches = numericPrice === 0 || numericPrice <= maxPriceParam;

    return markaMatches && uzemanyagMatches && priceMatches;
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
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40 pointer-events-none" 
          style={{ backgroundImage: "url('/hatter1.webp')" }}
        />
        {/* Texturált pontrács overlay */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none z-10" 
          style={{ 
            backgroundImage: "radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)", 
            backgroundSize: "4px 4px" 
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-[#121212]/40 to-black/90 backdrop-blur-md" />

        <div className="mx-auto flex min-h-[calc(100vh-10rem)] w-full max-w-7xl items-center px-6 py-20 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <p className="text-sm font-extralight uppercase tracking-[0.25em] text-sky-400">
              CARS SR99 Kft.
            </p>
            <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-slate-100">
              Prémium Autók. Megbízható Kereskedés.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 font-light tracking-wide text-slate-300">
              Gondosan válogatott, ellenőrzött prémium gépjárművek – megbízható dízel és benzin kínálattal, transzparens előélettel és professzionális lízing konstrukciókkal.
            </p>
            <HeroCTAButtons />

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 border-t border-slate-700/50 pt-8">
              <div>
                <p className="text-3xl font-bold text-sky-400">500+</p>
                <p className="mt-1 text-sm font-light tracking-wide text-slate-400">Eladott autó</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">15+</p>
                <p className="mt-1 text-sm font-light tracking-wide text-slate-400">Év tapasztalat</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sky-400">4.9</p>
                <p className="mt-1 text-sm font-light tracking-wide text-slate-400">Ügyfélelégedettség</p>
              </div>
            </div>
          </div>
        </div>

        {/* Minimalista Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none">
          <span className="text-[10px] font-extralight uppercase tracking-[0.25em] text-slate-400">
            Görgessen lejjebb
          </span>
          <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center p-1.5">
            <div className="w-1 h-2 rounded-full bg-sky-400 animate-scroll-bounce" />
          </div>
        </div>
      </section>

      <CarFilter initialMarka={selectedMarka} initialUzemanyag={selectedUzemanyag} initialMaxPrice={maxPriceParam} />
      <InventorySection cars={filteredCars} />
      <TrustBadges />
      <AboutSection />
      <SocialProofWall />
      <Testimonials />
    </>
  );
}
