import type { Metadata } from "next";
import Link from "next/link";
import { Check, CreditCard, FileText, ShieldCheck, Percent } from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";

export const metadata: Metadata = {
  title: "Costo Impianto Dentale a Conegliano | Prezzi Trasparenti",
  description:
    "Quanto costa un impianto dentale a Conegliano? Prezzi chiari e trasparenti per impianto singolo, ponti e arcata completa. Prima visita gratuita e pagamenti dilazionati.",
};

const plans = [
  {
    name: "Impianto singolo",
    price: "da 900€",
    unit: "a impianto",
    description:
      "Sostituzione di un dente mancante con impianto in titanio e corona in ceramica su misura.",
    features: [
      "Impianto in titanio certificato",
      "Corona in ceramica personalizzata",
      "Chirurgia guidata mini-invasiva",
      "Controlli post-operatori inclusi",
    ],
    featured: false,
  },
  {
    name: "Arcata completa · All-on-4",
    price: "da 6.500€",
    unit: "ad arcata",
    description:
      "Denti fissi su 4 impianti, ideale per chi ha perso molti denti. Anche a carico immediato.",
    features: [
      "4 impianti per arcata",
      "Protesi fissa completa",
      "Carico immediato in casi selezionati",
      "Diagnosi 3D e chirurgia guidata",
      "Piano di mantenimento dedicato",
    ],
    featured: true,
  },
  {
    name: "Ponte su impianti",
    price: "da 2.500€",
    unit: "indicativo",
    description:
      "Sostituzione di più denti adiacenti con un ponte fisso sostenuto da impianti.",
    features: [
      "2 o più impianti di supporto",
      "Ponte fisso in ceramica",
      "Soluzione stabile e duratura",
      "Preventivo su misura",
    ],
    featured: false,
  },
];

const factors = [
  {
    icon: FileText,
    title: "Numero di impianti",
    text: "Il costo varia in base a quanti denti devono essere sostituiti e al tipo di riabilitazione.",
  },
  {
    icon: ShieldCheck,
    title: "Materiali e tecnologia",
    text: "Impianti e corone di qualità, diagnosi 3D e chirurgia guidata garantiscono risultati duraturi.",
  },
  {
    icon: Percent,
    title: "Eventuali trattamenti aggiuntivi",
    text: "In alcuni casi servono innesti d'osso o estrazioni, che incidono sul preventivo finale.",
  },
];

const pricingFaq = [
  {
    q: "Perché i prezzi sono indicati 'a partire da'?",
    a: "Ogni bocca è diversa: il costo finale dipende dal numero di impianti, dai materiali e da eventuali trattamenti preliminari. Solo dopo una visita con diagnosi 3D possiamo darti un preventivo preciso e definitivo.",
  },
  {
    q: "La prima visita è davvero gratuita?",
    a: "Sì. La prima visita di valutazione, comprensiva dell'analisi del caso e del preventivo personalizzato, è senza impegno e senza costi.",
  },
  {
    q: "È possibile pagare a rate?",
    a: "Certamente. Offriamo piani di pagamento dilazionato e finanziamenti a tasso agevolato, così da rendere il trattamento sostenibile senza rinunciare alla qualità.",
  },
  {
    q: "Il preventivo può cambiare in corso d'opera?",
    a: "Il preventivo che consegniamo è dettagliato e trasparente. Eventuali variazioni vengono sempre concordate e comunicate in anticipo, senza sorprese.",
  },
];

export default function CostoImpiantoPage() {
  return (
    <>
      <PageHero
        eyebrow="Costi e trasparenza"
        breadcrumb="Costi"
        title="Quanto costa un impianto dentale a Conegliano?"
        description="Crediamo nella trasparenza: ecco i prezzi indicativi delle nostre soluzioni implantari. Il preventivo definitivo è sempre personalizzato dopo la prima visita gratuita."
      />

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-3xl border p-8 shadow-sm ${
                  plan.featured
                    ? "border-brand bg-brand text-brand-foreground shadow-lg"
                    : "border-border bg-card"
                }`}
              >
                {plan.featured ? (
                  <span className="mb-4 inline-block w-fit rounded-full bg-brand-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    Più richiesto
                  </span>
                ) : null}
                <h3
                  className={`font-display text-xl font-semibold ${
                    plan.featured ? "" : "text-foreground"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-bold">
                    {plan.price}
                  </span>
                  <span
                    className={
                      plan.featured
                        ? "text-sm text-brand-foreground/80"
                        : "text-sm text-muted-foreground"
                    }
                  >
                    {plan.unit}
                  </span>
                </div>
                <p
                  className={`mt-4 text-sm leading-relaxed ${
                    plan.featured
                      ? "text-brand-foreground/90"
                      : "text-muted-foreground"
                  }`}
                >
                  {plan.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured ? "" : "text-brand"
                        }`}
                        aria-hidden="true"
                      />
                      <span
                        className={
                          plan.featured ? "" : "text-muted-foreground"
                        }
                      >
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href="/contatti"
                    variant={plan.featured ? "secondary" : "primary"}
                    className="w-full justify-center"
                  >
                    Richiedi preventivo
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            I prezzi indicati sono indicativi e non costituiscono preventivo. Il
            costo definitivo viene stabilito dopo la visita clinica.
          </p>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Da cosa dipende il prezzo"
            title="Cosa determina il costo del tuo trattamento"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {factors.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <f.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-8 text-center shadow-sm md:p-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand">
              <CreditCard className="h-7 w-7" aria-hidden="true" />
            </div>
            <h2 className="mt-6 text-balance font-display text-2xl font-bold text-foreground md:text-3xl">
              Paga a rate, senza pensieri
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              Offriamo piani di pagamento dilazionato e finanziamenti a tasso
              agevolato, per prenderti cura del tuo sorriso in modo sostenibile.
              Parlane con noi durante la prima visita gratuita.
            </p>
            <div className="mt-8">
              <Button href="/contatti">Prenota la prima visita gratuita</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Domande sui costi"
            title="Le risposte alle tue domande sui prezzi"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Faq items={pricingFaq} />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
            Vuoi un preventivo su misura?{" "}
            <Link
              href="/contatti"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              Contattaci
            </Link>{" "}
            senza impegno.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
