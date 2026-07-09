import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center gap-4">
      <p className="text-sm font-semibold text-primary">Errore 404</p>
      <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Pagina non trovata</h1>
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
