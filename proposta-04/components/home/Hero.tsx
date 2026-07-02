import Image from "next/image";
import { Check, Phone } from "lucide-react";
import Button from "@/components/Button";

const points = [
  "Denti fissi anche in 24 ore",
  "Diagnostica 3D di ultima generazione",
  "Preventivo chiaro e senza impegno",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="container-page grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
            Implantologia dentale a Conegliano
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Ritrova il piacere di sorridere
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Impianti dentali fissi con tecnologie avanzate e protocolli
            personalizzati. Risultati naturali, sicuri e duraturi, con la cura di
            un team con oltre 20 anni di esperienza.
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-foreground">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm font-medium">{p}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/contatti">
              <Phone className="h-4 w-4" />
              Prenota la prima visita
            </Button>
            <Button href="/implantologia" variant="outline">
              Scopri l&apos;implantologia
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-xl sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/hero-implantologia.png"
              alt="Paziente sorridente in uno studio dentistico moderno a Conegliano"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-2xl border border-border bg-card px-6 py-4 shadow-lg">
            <p className="font-display text-3xl font-bold text-brand">+2.500</p>
            <p className="text-xs text-muted-foreground">
              impianti inseriti con successo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
