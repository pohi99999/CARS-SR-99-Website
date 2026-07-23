import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Összehasonlítás",
  description: "Vesse össze a kiválasztott gépjárművek műszaki adatait és árait egymás mellett.",
  alternates: {
    canonical: "https://cars-sr99.vercel.app/osszehasonlitas",
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
