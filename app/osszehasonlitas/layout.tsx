import type { Metadata } from "next";

import { siteUrl } from "@/utils/site";

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
