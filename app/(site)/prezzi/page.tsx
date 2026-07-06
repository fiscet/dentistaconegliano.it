import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Monitor, Activity, Check, Phone } from "lucide-react";
import { formatServicePrice } from "@/lib/format";
import { getSiteSettings } from "@/lib/settings";
import { sanityFetch } from "@/sanity/lib/live";
import { PRICED_SERVICES_QUERY } from "@/sanity/lib/queries";
import qualityImage from "@/public/images/caso-carico-immediato.png";

export const metadata: Metadata = {
  title: "Prezzi e Trasparenza",
  description:
    "Prezzi indicativi dei trattamenti implantari dello Studio Dentistico Dott. Gianluca Marin a Conegliano. Ogni piano di cura è personalizzato dopo la visita.",
};

// Fattori che influenzano il costo — contenuto editoriale neutro.
const costFactors = [
  {
    icon: ShieldCheck,
    title: "Qualità e certificazione dei materiali",
    text: "Utilizziamo impianti in titanio di grado medicale con tracciabilità e garanzia. La qualità dei componenti incide sul risultato e sulla durata nel tempo.",
  },
  {
    icon: Monitor,
    title: "Pianificazione digitale e tecnologie 3D",
    text: "La chirurgia computer-guidata richiede software avanzati e dime chirurgiche personalizzate: più precisione, interventi mininvasivi e tempi di recupero ridotti.",
  },
  {
    icon: Activity,
    title: "Condizioni cliniche del paziente",
    text: "Lo stato dell'osso e delle gengive può richiedere procedure preliminari. Ogni piano di cura viene definito dopo una valutazione clinica e radiografica.",
  },
];

export default async function PrezziPage() {
  const [{ data: services }, settings] = await Promise.all([
    sanityFetch({ query: PRICED_SERVICES_QUERY }),
    getSiteSettings(),
  ]);

  const plans = services ?? [];

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="bg-linear-to-br from-secondary/50 via-background to-secondary/30 py-14 lg:py-16 border-b border-border relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex text-xs font-bold text-muted-foreground uppercase tracking-wider gap-2 mb-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-primary">Prezzi e Trasparenza</span>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Prezzi chiari e trasparenza clinica
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground mt-3 max-w-3xl leading-relaxed">
            I prezzi in questa pagina sono indicativi e servono a darti un ordine di grandezza. Il
            preventivo definitivo viene sempre concordato dopo la visita, in base al tuo caso
            clinico.
          </p>
        </div>
      </section>

      {/* COSA INFLUENZA IL COSTO */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-14">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Guida alla scelta
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Cosa influenza il costo di un trattamento
            </h2>
            <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 flex flex-col gap-6">
              {costFactors.map((factor) => (
                <div
                  key={factor.title}
                  className="flex gap-4 bg-secondary/40 p-6 rounded-2xl border border-border/60"
                >
                  <div className="w-12 h-12 rounded-xl bg-background flex items-center justify-center text-primary shadow-sm shrink-0">
                    <factor.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                      {factor.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{factor.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div
                className="absolute -bottom-4 -left-4 w-[95%] h-[95%] bg-sky-100 rounded-3xl -rotate-3 -z-10 border border-sky-200"
                aria-hidden="true"
              />
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-border max-w-sm">
                <Image
                  src={qualityImage}
                  alt="Trattamento implantare presso lo studio"
                  className="w-full h-95 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RANGE DI PREZZO */}
      <section className="py-16 lg:py-24 bg-secondary/30 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Listino indicativo
            </span>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Range di prezzo di riferimento
            </h2>
            <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full" aria-hidden="true" />
            <p className="text-sm text-muted-foreground mt-4">
              Ogni piano di cura viene personalizzato dopo la valutazione clinica. Di seguito i
              prezzi medi di riferimento per le principali soluzioni.
            </p>
          </div>

          {!plans.length ? (
            <p className="text-center text-muted-foreground">Listino in aggiornamento.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
              {plans.map((plan) => (
                <div
                  key={plan._id}
                  className={`bg-background rounded-3xl overflow-hidden relative flex flex-col justify-between ${
                    plan.popular
                      ? "border-2 border-sky-400 shadow-md lg:-translate-y-2"
                      : "border border-border shadow-sm hover:shadow-md transition-shadow"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-4 right-4 bg-sky-500 text-primary-foreground text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                      Più richiesto
                    </div>
                  )}
                  <div className="p-8">
                    {plan.priceBadge && (
                      <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest bg-sky-50 px-2.5 py-1 rounded-full">
                        {plan.priceBadge}
                      </span>
                    )}
                    <h3 className="font-heading text-xl font-bold text-foreground mt-4">
                      {plan.title}
                    </h3>
                    {plan.excerpt && (
                      <p className="text-xs text-muted-foreground mt-2">{plan.excerpt}</p>
                    )}

                    <div className="my-6 pt-6 border-t border-border">
                      <span className="text-xs text-muted-foreground uppercase tracking-widest block">
                        Range di riferimento
                      </span>
                      <span className="text-3xl font-extrabold text-primary font-heading">
                        {formatServicePrice(plan.priceMin, plan.priceMax, plan.priceNote)}
                      </span>
                      {plan.priceNote && (
                        <span className="text-xs text-muted-foreground block mt-1">
                          {plan.priceNote}
                        </span>
                      )}
                    </div>

                    {plan.priceFeatures && plan.priceFeatures.length > 0 && (
                      <ul className="flex flex-col gap-2.5 text-xs text-muted-foreground">
                        {plan.priceFeatures.map((feature) => (
                          <li key={feature} className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-sky-500 shrink-0" aria-hidden="true" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div
                    className={`p-6 border-t border-border ${plan.popular ? "bg-sky-50/50" : "bg-secondary/50"}`}
                  >
                    <Link
                      href="/#contatti"
                      className="w-full bg-primary hover:bg-primary/95 text-primary-foreground py-3 rounded-xl text-center font-bold text-xs block uppercase tracking-wider transition"
                    >
                      Richiedi preventivo
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA PREVENTIVO */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              <div className="lg:col-span-7">
                <span className="text-xs font-bold text-sky-300 uppercase tracking-widest">
                  Il tuo preventivo
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold mt-2">
                  Un preventivo su misura, senza sorprese
                </h2>
                <p className="text-sm sm:text-base text-sky-100 mt-4 leading-relaxed">
                  Ogni situazione è diversa. Durante la prima visita valutiamo il tuo caso e ti
                  forniamo un piano di cura chiaro e dettagliato, con un preventivo definitivo e
                  trasparente.
                </p>
              </div>
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <div className="bg-background text-foreground p-8 rounded-2xl shadow-lg max-w-xs w-full text-center">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    Prenota una consulenza
                  </p>
                  <p className="font-heading text-lg font-bold text-foreground my-2">
                    {settings.name}
                  </p>
                  <a
                    href={settings.phoneHref}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-primary-foreground py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 mt-4 transition-colors"
                  >
                    <Phone className="w-4 h-4" aria-hidden="true" />
                    {settings.phone}
                  </a>
                  <Link
                    href="/#contatti"
                    className="block text-xs font-semibold text-primary mt-3 hover:underline"
                  >
                    Oppure scrivici dal modulo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
