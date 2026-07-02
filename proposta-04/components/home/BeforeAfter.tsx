"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

export default function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  return (
    <section className="bg-muted py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Risultati reali"
          title="Il prima e il dopo dei nostri pazienti"
          description="Trascina il cursore per scoprire la trasformazione. Risultati naturali che restituiscono funzione ed estetica al sorriso."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div
            ref={containerRef}
            className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl shadow-xl"
            onMouseMove={(e) => dragging.current && setFromClientX(e.clientX)}
            onMouseUp={() => (dragging.current = false)}
            onMouseLeave={() => (dragging.current = false)}
            onTouchMove={(e) => setFromClientX(e.touches[0].clientX)}
          >
            <Image
              src="/images/dopo.png"
              alt="Sorriso del paziente dopo il trattamento implantare"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${pos}%` }}
            >
              <Image
                src="/images/prima.png"
                alt="Sorriso del paziente prima del trattamento implantare"
                fill
                className="object-cover"
                style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
              <span className="absolute left-4 top-4 rounded-full bg-foreground/70 px-3 py-1 text-xs font-semibold text-white">
                Prima
              </span>
            </div>
            <span className="absolute right-4 top-4 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-brand-foreground">
              Dopo
            </span>

            <button
              type="button"
              aria-label="Trascina per confrontare"
              className="absolute top-0 z-10 flex h-full w-1 cursor-ew-resize items-center justify-center bg-white"
              style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
              onMouseDown={() => (dragging.current = true)}
              onTouchStart={() => (dragging.current = true)}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand shadow-lg">
                <MoveHorizontal className="h-5 w-5" />
              </span>
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Immagini a scopo illustrativo. I risultati possono variare da
            paziente a paziente.
          </p>
        </div>
      </div>
    </section>
  );
}
