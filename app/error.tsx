"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4 bg-background text-foreground">
      <p className="text-sm font-semibold text-destructive">Errore</p>
      <h1 className="text-3xl sm:text-4xl font-bold">Qualcosa è andato storto</h1>
      <p className="text-muted-foreground max-w-md">
        Si è verificato un errore imprevisto. Riprova o torna alla home.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mt-2">
        <button
          type="button"
          onClick={() => reset()}
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
        >
          Riprova
        </button>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border font-semibold hover:bg-muted transition"
        >
          Torna alla home
        </Link>
      </div>
    </main>
  );
}
