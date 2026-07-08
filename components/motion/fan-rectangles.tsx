"use client";

import { motion } from "motion/react";

export type FanRectangleSpec = {
  className: string;
  rotate: number;
  delay?: number;
};

type Trigger = "mount" | "inView";

// Rettangoli decorativi dietro una foto: partono piatti (rotate 0, scale
// ridotta, invisibili) e si aprono "a ventaglio" verso la loro rotazione
// finale, con un piccolo stagger tra i due.
//
// trigger="mount" (default): parte subito al render — adatto a sezioni sopra
// la piega, sempre visibili al caricamento (es. hero).
// trigger="inView": parte quando la sezione entra nel viewport durante lo
// scroll — adatto a sezioni più in basso nella pagina, altrimenti
// l'animazione finirebbe prima che l'utente ci arrivi.
export function FanRectangles({
  rects,
  trigger = "mount",
}: {
  rects: FanRectangleSpec[];
  trigger?: Trigger;
}) {
  return (
    <>
      {rects.map((rect, index) => {
        const target = { rotate: rect.rotate, scale: 1, opacity: 1 };
        const triggerProps =
          trigger === "inView"
            ? { whileInView: target, viewport: { once: true, margin: "-100px" } }
            : { animate: target };
        return (
          <motion.div
            key={index}
            initial={{ rotate: 0, scale: 0.6, opacity: 0 }}
            {...triggerProps}
            transition={{
              duration: 0.7,
              delay: rect.delay ?? 0.1 + index * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={rect.className}
            aria-hidden="true"
          />
        );
      })}
    </>
  );
}
