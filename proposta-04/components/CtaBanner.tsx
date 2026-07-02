import { Phone, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function CtaBanner() {
  return (
    <section className="bg-background pb-20">
      <div className="container-page">
        <div className="overflow-hidden rounded-2xl bg-brand px-6 py-14 text-center sm:px-12">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-3xl font-bold text-brand-foreground sm:text-4xl">
            Pronto a ritrovare il tuo sorriso?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty leading-relaxed text-brand-foreground/90">
            Prenota la prima visita di valutazione: analizziamo il tuo caso e ti
            consegniamo un preventivo chiaro, senza impegno.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={site.phoneHref}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold font-display text-brand transition-colors hover:bg-brand-light"
            >
              <Phone className="h-4 w-4" />
              Chiama ora
            </a>
            <a
              href={site.whatsappHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-7 py-3.5 text-sm font-semibold font-display text-white transition-colors hover:bg-white/10"
            >
              <MessageCircle className="h-4 w-4" />
              Scrivici su WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
