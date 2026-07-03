import type { Metadata } from "next";
import WarrantySection from "@/components/WarrantySection";

export const metadata: Metadata = {
  title: "SR99 Garancia",
  description: "12 hónapos Real Garant védelem és biztonságos autóvásárlás a CARS SR99 Kft.-nél Zalaegerszegen.",
  alternates: {
    canonical: "https://cars-sr99.vercel.app/garancia",
  },
};

export default function GaranciaPage() {
  return (
    <div className="py-10">
      <WarrantySection />
    </div>
  );
}
