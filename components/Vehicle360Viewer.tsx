"use client";

import Image from "next/image";
import { MousePointer2, X } from "lucide-react";
import { useRef, useState } from "react";

type Vehicle360ViewerProps = {
  imageUrl: string;
  carName: string;
};

export default function Vehicle360Viewer({ imageUrl, carName }: Vehicle360ViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [rotationY, setRotationY] = useState(0);
  const [zoom, setZoom] = useState(1.05);
  const dragStartXRef = useRef<number | null>(null);

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    dragStartXRef.current = event.clientX;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (dragStartXRef.current === null) {
      return;
    }

    const deltaX = event.clientX - dragStartXRef.current;
    const nextRotation = Math.max(-16, Math.min(16, rotationY + deltaX * 0.05));
    const nextZoom = Math.max(1.02, Math.min(1.2, 1.05 + Math.abs(nextRotation) * 0.004));
    setRotationY(nextRotation);
    setZoom(nextZoom);
    dragStartXRef.current = event.clientX;
  }

  function handlePointerUp() {
    dragStartXRef.current = null;
  }

  return (
    <>
      <button
        type="button"
        aria-label="360 fokos nézet megnyitása"
        onClick={() => setIsOpen(true)}
        className="mt-4 inline-flex w-full items-center justify-center rounded-full border border-cyan-400/50 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:border-cyan-300 hover:bg-cyan-400/10"
      >
        360° Nézet megnyitása
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/90 p-4">
          <div className="relative w-full max-w-5xl rounded-2xl border border-white/10 bg-[#121212] p-4 sm:p-6">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-3 top-3 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
              aria-label="360 nézet bezárása"
            >
              <X size={20} />
            </button>

            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-cyan-300">360° Demo</p>
            <h3 className="text-xl font-semibold text-slate-100">{carName}</h3>
            <p className="mt-1 flex items-center gap-2 text-sm text-slate-300">
              <MousePointer2 size={14} />
              Húzza az egeret a körbenézéshez
            </p>

            <div
              className="mt-4 relative h-[52vh] w-full cursor-grab overflow-hidden rounded-xl border border-white/10 bg-[#0f172a] active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <Image
                src={imageUrl}
                alt={`${carName} 360 nézet`}
                fill
                className="object-cover transition-transform duration-75"
                style={{
                  transform: `perspective(1200px) rotateY(${rotationY}deg) scale(${zoom})`,
                  transformOrigin: "center center",
                }}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
