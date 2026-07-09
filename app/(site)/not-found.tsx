"use client";

import NotFoundContent from "@/components/not-found-content";
import AmbientBackground from "@/components/ambient-background";

export default function NotFound() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center px-4 py-20 sm:py-28 bg-background text-foreground overflow-hidden">
      {/* Sfondo Decorativo Condiviso */}
      <AmbientBackground />

      {/* Corpo Condiviso 404 */}
      <NotFoundContent />
    </main>
  );
}
