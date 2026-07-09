import Link from "next/link";

// Fallback globale per URL che non ricadono in nessuna route (root
// app-level): niente header/footer perché fuori dal layout (site).
export default function RootNotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 text-center gap-4 bg-background text-foreground">
      <p className="text-sm font-semibold text-primary">Errore 404</p>
      <h1 className="text-3xl sm:text-4xl font-bold">Pagina non trovata</h1>
      <p className="text-muted-foreground max-w-md">
        La pagina che cerchi non esiste o è stata spostata.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
      >
        Torna alla home
      </Link>
    </main>
  );
}
