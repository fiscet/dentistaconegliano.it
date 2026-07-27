'use client';

import { useCallback, useEffect, useState } from 'react';
import Image, { type StaticImageData } from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type HeroSlide = {
  src: string | StaticImageData;
  alt: string;
};

export function HeroCarousel({ slides }: { slides: HeroSlide[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative w-full h-[450px] overflow-hidden group">
      <div className="w-full h-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {slides.map((slide, index) => (
            <div key={index} className="relative flex-[0_0_100%] h-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Immagine precedente"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-md text-foreground flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Immagine successiva"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/80 backdrop-blur-md text-foreground flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollTo(index)}
                aria-label={`Vai all'immagine ${index + 1}`}
                aria-current={index === selectedIndex}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-primary w-6'
                    : 'bg-background/70 hover:bg-background'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
