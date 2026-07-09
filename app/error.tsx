"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/logo";
import { site } from "@/lib/site";
import { motion } from "motion/react";
import { AlertCircle, RefreshCw, Home, Phone } from "lucide-react";
import AmbientBackground from "@/components/ambient-background";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      reset();
      setIsResetting(false);
    }, 600);
  };

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between px-4 py-12 bg-background text-foreground overflow-hidden">
      {/* Sfondo Decorativo Error */}
      <AmbientBackground variant="error" />

      {/* Header con Logo */}
      <header className="w-full max-w-6xl flex justify-center z-10">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
      </header>

      {/* Sezione Centrale */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-xl flex flex-col items-center gap-8 text-center my-auto z-10"
      >
        {/* Icona Errore Animata */}
        <div className="relative flex items-center justify-center bg-destructive/10 w-24 h-24 rounded-full border border-destructive/20">
          <motion.div
            className="absolute inset-0 rounded-full bg-destructive/5"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <AlertCircle className="w-12 h-12 text-destructive relative z-10" />
        </div>

        {/* Testo */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-bold uppercase tracking-widest text-destructive bg-destructive/10 px-3 py-1.5 rounded-full border border-destructive/20">
            Errore di Caricamento
          </p>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Qualcosa è andato storto
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-md">
            Si è verificato un inconveniente tecnico imprevisto. Stiamo già verificando l&apos;accaduto per ripristinare il corretto funzionamento il prima possibile.
          </p>
        </div>

        {/* Azioni */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <button
            type="button"
            onClick={handleReset}
            disabled={isResetting}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/95 transition-all shadow-md active:scale-95 text-sm cursor-pointer disabled:opacity-80"
          >
            <motion.div
              animate={isResetting ? { rotate: 360 } : {}}
              transition={{ repeat: isResetting ? Infinity : 0, duration: 1, ease: "linear" }}
            >
              <RefreshCw className="w-4 h-4" />
            </motion.div>
            Riprova
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-card border border-border text-foreground font-bold hover:bg-muted hover:border-primary/20 transition-all shadow-xs active:scale-95 text-sm"
          >
            <Home className="w-4 h-4 text-muted-foreground" />
            Torna alla home
          </Link>
        </div>

        {/* Info di Contatto in caso di persistenza errore */}
        <div className="w-full mt-4 p-4 rounded-xl border border-border bg-card/50 text-left text-xs sm:text-sm flex items-center justify-between gap-3">
          <div>
            <p className="font-bold text-foreground">Serve aiuto immediato?</p>
            <p className="text-muted-foreground text-xs">Contatta direttamente la nostra segreteria telefonica.</p>
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

      {/* Footer */}
      <footer className="w-full max-w-4xl text-center text-xs text-muted-foreground/80 mt-12 z-10 pt-4 border-t border-border/40">
        <p className="font-medium text-muted-foreground mb-1">{site.legalName}</p>
        <p>{site.addressLine} | P.IVA {site.vatNumber}</p>
      </footer>
    </main>
  );
}
