import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Smile,
  Timer,
  HeartPulse,
  Microscope,
  Award,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Faq from "@/components/Faq";
import CtaBanner from "@/components/CtaBanner";
import { faqImplantologia } from "@/lib/content";

export const metadata: Metadata = {
  title: "Implantologia Dentale a Conegliano | Impianti a Carico Immediato",
  description:
    "Impianti dentali a Conegliano: soluzioni fisse a carico immediato per uno o più denti mancanti. Tecnologia 3D, materiali certificati e risultati naturali e duraturi.",
};

const benefits = [
  {
    icon: Smile,
    title: "Denti fissi e naturali",
    text: "Recuperi la funzione masticatoria e un sorriso esteticamente naturale, senza protesi mobili.",
  },
  {
    icon: Timer,
    title: "Carico immediato",
    text: "In casi selezionati applichiamo i denti provvisori nella stessa giornata dell'intervento.",
  },
  {
    icon: ShieldCheck,
    title: "Materiali certificati",
    text: "Impianti in titanio di grado medicale, biocompatibili e garantiti dalle migliori aziende.",
  },
  {
    icon: HeartPulse,
    title: "Interventi mini-invasivi",
    text: "Chirurgia guidata e protocolli delicati per un decorso post-operatorio confortevole.",
  },
];

const steps = [
  {
    number: "01",
    title: "Prima visita e diagnosi 3D",
    text: "Valutazione clinica completa, TAC cone beam e analisi digitale per pianificare l'intervento con precisione.",
  },
  {
    number: "02",
    title: "Piano di trattamento personalizzato",
    text: "Ti presentiamo la soluzione più adatta, i tempi e un preventivo chiaro e trasparente, senza sorprese.",
  },
  {
    number: "03",
    title: "Inserimento dell'impianto",
    text: "Intervento in anestesia locale con chirurgia guidata: sicuro, preciso e poco invasivo.",
  },
  {
    number: "04",
    title: "Protesi definitiva e controlli",
    text: "Applichiamo la corona definitiva e ti seguiamo con controlli periodici per la salute nel tempo.",
  },
];

const solutions = [
  {
    title: "Dente singolo mancante",
    text: "Un impianto e una corona su misura sostituiscono il dente perso senza intaccare quelli sani vicini.",
  },
  {
    title: "Più denti mancanti",
    text: "Ponti su impianti per ripristinare intere arcate parziali con stabilità e comfort.",
  },
  {
    title: "Arcata completa",
    text: "Soluzioni tipo All-on-4 / All-on-6: denti fissi su pochi impianti, anche a carico immediato.",
  },
];

export default function ImplantologiaPage() {
  return (
    <>
      <PageHero
        eyebrow="Implantologia dentale"
        breadcrumb="Implantologia"
        title="Impianti dentali a Conegliano: denti fissi che durano nel tempo"
        description="Sostituiamo i denti mancanti con impianti in titanio biocompatibile, per ridarti una masticazione naturale e un sorriso sicuro. Con diagnosi 3D e chirurgia guidata."
      />

      <section className="py-16 md:py-20">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Che cos'è"
              title="La soluzione più stabile per i denti mancanti"
            />
            <div className="mt-6 space-y-4 text-pretty leading-relaxed text-muted-foreground">
              <p>
                L&apos;impianto dentale è una piccola vite in titanio che viene
                inserita nell&apos;osso mascellare e svolge la funzione della
                radice del dente naturale. Su di essa viene fissata una corona
                in ceramica indistinguibile dai denti reali.
              </p>
              <p>
                A differenza di protesi mobili e ponti tradizionali,
                l&apos;impianto non danneggia i denti vicini e previene il
                riassorbimento dell&apos;osso, mantenendo il viso giovane e i
                tessuti in salute.
              </p>
            </div>
            <div className="mt-8">
              <Button href="/costo-impianto-dentale">
                Scopri i costi e le soluzioni
              </Button>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-muted">
            <Image
              src="/images/impianto-3d.png"
              alt="Illustrazione 3D di un impianto dentale con vite in titanio, moncone e corona in ceramica"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="I vantaggi"
            title="Perché scegliere gli impianti dentali"
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <b.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Le soluzioni"
            title="Una risposta per ogni esigenza"
            description="Che si tratti di un solo dente o di un'arcata completa, progettiamo il trattamento su misura per te."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {solutions.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-8 shadow-sm"
              >
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {s.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand py-16 text-brand-foreground md:py-20">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-foreground/80">
              Il percorso
            </p>
            <h2 className="mt-3 text-balance font-display text-3xl font-bold md:text-4xl">
              Come funziona, passo dopo passo
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.number}
                className="rounded-2xl bg-brand-foreground/10 p-6 backdrop-blur-sm"
              >
                <span className="font-display text-4xl font-bold text-brand-foreground/60">
                  {step.number}
                </span>
                <h3 className="mt-3 font-display text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-foreground/85">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Tecnologia e sicurezza"
            title="Precisione digitale, risultati prevedibili"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Microscope,
                title: "Diagnosi 3D",
                text: "TAC cone beam e scansioni digitali per pianificare ogni dettaglio prima dell'intervento.",
              },
              {
                icon: ShieldCheck,
                title: "Chirurgia guidata",
                text: "Dime chirurgiche personalizzate per posizionare l'impianto con la massima precisione.",
              },
              {
                icon: Award,
                title: "Esperienza ventennale",
                text: "Oltre 20 anni di casi trattati con successo e un approccio centrato sul paziente.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted py-16 md:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Tutto quello che vuoi sapere sugli impianti"
          />
          <div className="mx-auto mt-10 max-w-3xl">
            <Faq items={faqImplantologia} />
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
            Hai altre domande?{" "}
            <Link
              href="/contatti"
              className="font-semibold text-brand underline-offset-4 hover:underline"
            >
              Contattaci
            </Link>{" "}
            per una prima visita conoscitiva.
          </p>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
