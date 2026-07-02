import { Check } from "lucide-react";
import Button from "@/components/Button";
import SectionHeading from "@/components/SectionHeading";

const services = [
  {
    tag: "Carico immediato",
    title: "Denti fissi in 24 ore",
    description:
      "Un protocollo all-on-4 e all-on-6 per riabilitare intere arcate con una protesi fissa provvisoria applicata già nella prima seduta.",
    points: [
      "Sorriso completo in una sola giornata",
      "Meno impianti, massima stabilità",
      "Recupero rapido della masticazione",
      "Ideale per chi porta la dentiera",
    ],
    cta: "Scopri il carico immediato",
  },
  {
    tag: "Impianto singolo",
    title: "Sostituire un dente mancante",
    description:
      "La soluzione più naturale per sostituire uno o più denti senza intaccare quelli sani. Corona in ceramica indistinguibile dal dente naturale.",
    points: [
      "Risultato estetico naturale",
      "Nessun danno ai denti vicini",
      "Titanio biocompatibile di qualità",
      "Sedute brevi e mini-invasive",
    ],
    cta: "Scopri l'impianto singolo",
  },
];

export default function Services() {
  return (
    <section id="servizi" className="bg-background py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="I nostri trattamenti"
          title="Soluzioni implantari su misura per te"
          description="Ogni sorriso è unico. Studiamo il trattamento più adatto alle tue esigenze, con protocolli sicuri e risultati che durano nel tempo."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {services.map((s) => (
            <article
              key={s.title}
              className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                {s.tag}
              </span>
              <h3 className="mt-2 font-display text-2xl font-bold text-foreground">
                {s.title}
              </h3>
              <div className="mt-4 h-px w-16 bg-brand-light" />
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {s.description}
              </p>
              <ul className="mt-6 space-y-3">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3">
                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-brand-light text-brand">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-sm text-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-2">
                <Button href="/implantologia">{s.cta}</Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
