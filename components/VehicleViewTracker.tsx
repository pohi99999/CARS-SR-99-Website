"use client";

import { useEffect } from "react";
import { trackViewContent } from "@/utils/analytics";

type VehicleViewTrackerProps = {
  carId: string;
  marka: string;
  modell: string;
  evjarat: number;
  price: number;
};

export default function VehicleViewTracker({
  carId,
  marka,
  modell,
  evjarat,
  price,
}: VehicleViewTrackerProps) {
  useEffect(() => {
    trackViewContent(`${marka} ${modell}`, marka, {
      content_type: "vehicle",
      content_ids: [carId],
      make: marka,
      model: modell,
      year: evjarat,
      value: price,
      currency: "HUF",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carId]);

  return null;
}
