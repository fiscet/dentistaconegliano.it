"use client";

import { motion } from "motion/react";

interface AmbientBackgroundProps {
  variant?: "default" | "error";
}

export default function AmbientBackground({ variant = "default" }: AmbientBackgroundProps) {
  const isError = variant === "error";

  // Impostiamo classi e sfocature a seconda della variante
  const firstCircleBg = isError ? "bg-destructive/10" : "bg-secondary/50";
  const secondCircleBg = isError ? "bg-secondary/40" : "bg-accent/40";
  const firstCircleBlur = isError ? "blur-[100px]" : "blur-[120px]";
  const secondCircleBlur = isError ? "blur-[110px]" : "blur-[130px]";

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Cerchio fluttuante in alto a sinistra */}
      <motion.div
        className={`absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full ${firstCircleBg} ${firstCircleBlur}`}
        animate={{
          x: [0, 30, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      {/* Cerchio fluttuante in basso a destra */}
      <motion.div
        className={`absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full ${secondCircleBg} ${secondCircleBlur}`}
        animate={{
          x: [0, -40, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
