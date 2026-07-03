"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";

type ImageGalleryProps = {
  images: string[];
};

const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxMCI+PHJlY3Qgd2lkdGg9IjE2IiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGYxNzJhIi8+PC9zdmc+";

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [mainEmblaRef, mainEmblaApi] = useEmblaCarousel({ loop: true });
  const [modalEmblaRef, modalEmblaApi] = useEmblaCarousel({ loop: true });

  const updateSelectedIndex = useCallback(() => {
    if (!mainEmblaApi) {
      return;
    }
    setSelectedIndex(mainEmblaApi.selectedScrollSnap());
  }, [mainEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi) {
      return;
    }
    mainEmblaApi.on("select", updateSelectedIndex);
    return () => {
      mainEmblaApi.off("select", updateSelectedIndex);
    };
  }, [mainEmblaApi, updateSelectedIndex]);

  useEffect(() => {
    if (!modalEmblaApi) {
      return;
    }
    modalEmblaApi.scrollTo(selectedIndex);
  }, [modalEmblaApi, selectedIndex]);

  useEffect(() => {
    if (!isFullscreenOpen) {
      return;
    }
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsFullscreenOpen(false);
      }
    };
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("keydown", onEscape);
    };
  }, [isFullscreenOpen]);

  const scrollToSlide = (index: number) => {
    mainEmblaApi?.scrollTo(index);
  };

  const openFullscreen = () => {
    setIsFullscreenOpen(true);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="relative overflow-hidden rounded-2xl bg-slate-900">
          <div className="overflow-hidden" ref={mainEmblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div key={image} className="min-w-0 shrink-0 grow-0 basis-full">
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={image}
                      alt={`Jármű fotó ${index + 1}`}
                      fill
                      priority={index === 0}
                      placeholder="blur"
                      blurDataURL={blurDataUrl}
                      className="object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="Galéria megnyitása teljes képernyőn"
            onClick={openFullscreen}
            className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/65 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-black/80"
          >
            <Expand size={14} aria-hidden="true" />
            Nagyítás
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => {
            const isActive = selectedIndex === index;
            return (
              <button
                key={`${image}-thumb`}
                type="button"
                aria-label={`${index + 1}. kép kiválasztása`}
                onClick={() => scrollToSlide(index)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                  isActive ? "border-cyan-400" : "border-slate-300"
                }`}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL={blurDataUrl}
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>

      {isFullscreenOpen ? (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/90 p-4">
          <button
            type="button"
            onClick={() => setIsFullscreenOpen(false)}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Bezárás"
          >
            <X size={22} />
          </button>

          <button
            type="button"
            onClick={() => modalEmblaApi?.scrollPrev()}
            className="absolute left-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Előző kép"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="w-full max-w-6xl">
            <div className="overflow-hidden rounded-2xl" ref={modalEmblaRef}>
              <div className="flex">
                {images.map((image, index) => (
                  <div key={`${image}-modal`} className="min-w-0 shrink-0 grow-0 basis-full">
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={image}
                        alt={`Nagyított jármű fotó ${index + 1}`}
                        fill
                        placeholder="blur"
                        blurDataURL={blurDataUrl}
                        className="object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => modalEmblaApi?.scrollNext()}
            className="absolute right-4 rounded-full bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Következő kép"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      ) : null}
    </>
  );
}
