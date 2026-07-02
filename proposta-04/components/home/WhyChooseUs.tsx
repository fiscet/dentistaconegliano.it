import {
  ShieldCheck,
  ScanLine,
  HeartHandshake,
  Clock,
  Award,
  Wallet,
} from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const items = [
  {
    icon: Award,
    title: "20+ anni di esperienza",
    text: "Un team specializzato in implantologia con migliaia di casi trattati con successo.",
  },
  {
    icon: ScanLine,
    title: "Diagnostica 3D",
    text: "TAC e chirurgia guidata computerizzata per interventi precisi, sicuri e prevedibili.",
  },
  {
    icon: Clock,
    title: "Carico immediato",
    text: "Denti fissi anche in 24 ore, per tornare a sorridere e masticare senza attese.",
  },
  {
    icon: ShieldCheck,
    title: "Materiali certificati",
    text: "Impianti in titanio biocompatibile di primaria qualità, con garanzia sul trattamento.",
  },
  {
    icon: HeartHandshake,
    title: "Percorso personalizzato",
    text: "Ti seguiamo passo dopo passo, dalla prima visita al controllo finale, con empatia.",
  },
  {
    icon: Wallet,
    title: "Preventivi trasparenti",
    text: "Costi chiari fin da subito e piani di pagamento dilazionati su misura.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-background py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Perché sceglierci"
          title="La sicurezza di affidarti a mani esperte"
          description="Uniamo competenza clinica, tecnologia e attenzione alla persona per offrirti un percorso sereno verso il tuo nuovo sorriso."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-border bg-card p-7 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-light text-brand">
                <item.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
