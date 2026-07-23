import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cars-sr99.com";

export const metadata: Metadata = {
  title: "Összehasonlítás",
  description: "Vesse össze a kiválasztott gépjárművek műszaki adatait és árait egymás mellett.",
  alternates: {
    canonical: `${siteUrl}/osszehasonlitas`,
  },
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
