"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { site } from "@/lib/site";
import NotFoundContent from "@/components/not-found-content";
import AmbientBackground from "@/components/ambient-background";

export default function RootNotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-between px-4 py-12 bg-background text-foreground overflow-hidden">
      {/* Sfondo Decorativo Condiviso */}
      <AmbientBackground />

      {/* Header con Logo */}
      <header className="w-full max-w-6xl flex justify-center z-10">
        <Link href="/" className="hover:opacity-90 transition-opacity">
          <Logo />
        </Link>
      </header>

      {/* Corpo Condiviso 404 */}
      <NotFoundContent />

      {/* Footer in fondo */}
      <footer className="w-full max-w-4xl text-center text-xs text-muted-foreground/80 mt-12 z-10 pt-4 border-t border-border/40">
        <p className="font-medium text-muted-foreground mb-1">{site.legalName}</p>
        <p>{site.addressLine} | Tel: {site.phone} | P.IVA {site.vatNumber}</p>
      </footer>
    </main>
  );
}
