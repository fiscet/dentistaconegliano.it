"use client";

import Link from "next/link";
import { site } from "@/lib/site";
import { motion } from "motion/react";
import { Home, Compass, Phone, ArrowRight, MapPin, Sparkles } from "lucide-react";

export default function NotFoundContent() {
  // Varianti di animazione per il caricamento staccato (stagger) degli elementi
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full max-w-4xl flex flex-col items-center gap-8 text-center my-auto z-10"
    >
      {/* Contenitore con animazione infinita fluttuante */}
      <motion.div variants={itemVariants}>
        <motion.div 
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="relative flex items-center justify-center bg-secondary w-28 h-28 sm:w-32 sm:h-32 rounded-full shadow-inner border border-primary/10"
        >
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-primary" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* Outline del dente */}
            <motion.path
              d="M28 35 C28 22, 38 18, 50 28 C62 18, 72 22, 72 35 C72 55, 66 75, 50 85 C34 75, 28 55, 28 35 Z"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {/* Sorriso interno */}
            <motion.path
              d="M38 52 Q50 64 62 52"
              stroke="currentColor"
              strokeWidth="3.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.9, ease: "easeInOut" }}
            />
            {/* Stellina di igiene/brillantezza */}
            <motion.circle
              cx="50"
              cy="28"
              r="3"
              fill="currentColor"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          </svg>
          {/* Stellina decorativa animata in alto a destra con pulsazione infinita */}
          <motion.div
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 text-primary"
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 fill-primary/20" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Testo Principale */}
      <div className="flex flex-col items-center gap-3">
        <motion.p variants={itemVariants} className="text-xs font-bold uppercase tracking-widest text-primary bg-secondary px-3 py-1.5 rounded-full border border-primary/10">
          Errore 404
        </motion.p>
        <motion.h1 variants={itemVariants} className="text-3xl sm:text-5xl font-extrabold text-foreground tracking-tight">
          Pagina non trovata
        </motion.h1>
        <motion.p variants={itemVariants} className="text-muted-foreground max-w-lg text-sm sm:text-lg leading-relaxed">
          Anche nel percorso digitale può capitare di perdere l&apos;orientamento. Ma non preoccuparti, siamo qui per aiutarti a ritrovare il sorriso.
        </motion.p>
      </div>

      {/* Griglia dei Link Rapidi */}
      <motion.div 
        variants={itemVariants} 
        className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full mt-2 sm:mt-4"
      >
        {/* Card Home */}
        <Link href="/" className="group">
          <motion.div 
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="h-full flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/30 hover:shadow-md hover:bg-secondary/10 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4">
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              Home Page
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground flex-1 mb-4">
              Torna alla pagina principale del nostro studio dentistico.
            </p>
            <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
              Vai alla home <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </motion.div>
        </Link>

        {/* Card Servizi */}
        <Link href="/servizi" className="group">
          <motion.div 
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="h-full flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/30 hover:shadow-md hover:bg-secondary/10 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4">
              <Compass className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              I Nostri Servizi
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground flex-1 mb-4">
              Scopri i trattamenti, dall&apos;implantologia a carico immediato alla chirurgia guidata.
            </p>
            <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
              Vedi i servizi <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </motion.div>
        </Link>

        {/* Card Contatti */}
        <Link href="/contatti" className="group">
          <motion.div 
            whileHover={{ y: -5, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="h-full flex flex-col items-start p-6 text-left rounded-2xl bg-card border border-border/80 shadow-xs hover:border-primary/30 hover:shadow-md hover:bg-secondary/10 transition-all duration-300"
          >
            <div className="p-3 rounded-lg bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 mb-4">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h2 className="text-base sm:text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
              Contatti e Orari
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground flex-1 mb-4">
              Orari dello studio, indirizzo e mappa per raggiungerci a Conegliano.
            </p>
            <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary gap-1 group-hover:gap-2 transition-all">
              Dove trovarci <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </span>
          </motion.div>
        </Link>
      </motion.div>

      {/* Card Urgenza / Contatto Diretto */}
      <motion.div 
        variants={itemVariants}
        className="w-full p-6 rounded-2xl bg-secondary/60 border border-primary/20 flex flex-col md:flex-row items-center justify-between gap-4 text-left shadow-xs mt-2"
      >
        <div className="flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          <div>
            <h3 className="font-bold text-sm sm:text-base text-foreground">Urgente o vuoi prenotare telefonicamente?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">La nostra segreteria è a tua disposizione negli orari di studio.</p>
          </div>
        </div>
        <a 
          href={site.phoneHref}
          className="flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all shadow-md active:scale-95 text-xs sm:text-sm shrink-0"
        >
          <Phone className="w-4 h-4 fill-primary-foreground/10" />
          Chiama {site.phone}
        </a>
      </motion.div>
    </motion.div>
  );
}
