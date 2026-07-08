"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Disattiva automaticamente le animazioni per chi ha impostato
// prefers-reduced-motion nel sistema operativo/browser, senza doverlo
// controllare in ogni singolo componente motion.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
