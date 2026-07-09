"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/site";
import { motion } from "motion/react";
import { AlertCircle, RefreshCw, Home, Phone } from "lucide-react";
import AmbientBackground from "@/components/ambient-background";

export default function SiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error("Site Page Error:", error);
  }, [error]);

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      reset();
      setIsResetting(false);
    }, 600);
  };

  return (
    <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 sm:py-28 bg-background text-foreground overflow-hidden">
      {/* Sfondo Decorativo Condiviso */}
      <AmbientBackground variant="error" />

      {/* Box Centrale Contenuto */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl flex flex-col items-center gap-8 text-center z-10"
      >
        {/* Icona Errore Animata */}
        <div className="relative flex items-center justify-center bg-destructive/10 w-20 h-20 rounded-full border border-destructive/20">
          <motion.div
            className="absolute inset-0 rounded-full bg-destructive/5"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <AlertCircle className="w-10 h-10 text-destructive relative z-10" />
        </div>

        {/* Testo */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-bold uppercase tracking-widest text-destructive bg-destructive/10 px-3 py-1.5 rounded-full border border-destructive/20">
            Errore Caricamento Pagina
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">
            Impossibile caricare la pagina
          </h1>
          <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-md">
            Si è verificato un problema nel caricamento di questa sezione del sito. Puoi provare a ricaricare la pagina o tornare alla navigazione principale.
          </p>
        </div>

        {/* Azioni */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md active:scale-95 text-xs sm:text-sm cursor-pointer disabled:opacity-80"
          >
            <motion.div
              animate={isResetting ? { rotate: 360 } : {}}
              transition={{ repeat: isResetting ? Infinity : 0, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            Ricarica pagina
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-bold hover:bg-muted hover:border-primary/20 transition-all shadow-xs active:scale-95 text-xs sm:text-sm"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
            Torna alla home
          </Link>
        </div>

        {/* Info di Contatto */}
        <div className="w-full mt-2 p-4 rounded-xl border border-border bg-card/50 text-left text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xs">
          <div>
            <p className="font-bold text-foreground">Hai bisogno di assistenza o vuoi prenotare?</p>
            <p className="text-muted-foreground text-xs">Siamo a disposizione negli orari di apertura.</p>
          </div>
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5" />
            {site.phone}
          </a>
        </div>
      </motion.div>
    </main>
  );
}
