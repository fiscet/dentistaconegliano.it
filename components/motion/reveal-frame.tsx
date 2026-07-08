"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type Trigger = "mount" | "inView";

// Entrata della foto in primo piano: fade + leggero scale-up + slide dal
// basso, in ritardo rispetto ai rettangoli decorativi così l'immagine sembra
// "posarsi" sopra il ventaglio già aperto.
//
// trigger="mount" (default) parte subito al render; trigger="inView" parte
// quando la sezione entra nel viewport durante lo scroll (vedi FanRectangles
// per lo stesso concetto).
export function RevealFrame({
  children,
  className,
  delay = 0.4,
  trigger = "mount",
}: {
  children: ReactNode;
  className: string;
  delay?: number;
  trigger?: Trigger;
}) {
  const target = { opacity: 1, scale: 1, y: 0 };
  const triggerProps =
    trigger === "inView"
      ? { whileInView: target, viewport: { once: true, margin: "-100px" } }
      : { animate: target };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      {...triggerProps}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
