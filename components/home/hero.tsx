import Image from "next/image";
import { Sparkles, Check, Clock, ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import doctorImage from "@/public/images/gianluca-marin-home.jpg";

export default function Hero() {
  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Motivo di sfondo a tre cerchi (logo) */}
      <div
        className="absolute right-0 top-1/4 opacity-10 pointer-events-none transform translate-x-1/3"
        aria-hidden="true"
      >
        <svg
          className="w-[600px] h-[600px] text-primary"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="150" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
          <circle cx="170" cy="120" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
          <circle cx="210" cy="180" r="80" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-primary px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              <Sparkles className="w-3.5 h-3.5 text-sky-600" aria-hidden="true" />
              Specialisti in Implantologia Dentale a Conegliano
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-none">
              Ritrova il tuo sorriso. <br />
              <span className="text-primary">In sole 24 ore</span> con il carico
              immediato.
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              Da oltre 20 anni, lo Studio Dentistico Marin restituisce sicurezza
              e funzionalità masticatoria con impianti dentali di altissima
              qualità svizzera e svedese. Procedure mininvasive e indolori.
            </p>

            <div className="grid grid-cols-2 gap-4 my-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary">
                  <Check className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Senza dolore (sedazione)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="text-sm font-semibold text-foreground">
                  Denti fissi in un giorno
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center mt-4">
              <a
                href="#contatti"
                className="bg-primary hover:bg-primary/95 text-primary-foreground px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Consulenza Gratuita
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href={site.phoneHref}
                className="border-2 border-primary/20 hover:border-primary text-primary px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center gap-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Chiama Ora
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div
              className="absolute -bottom-4 -left-4 w-[90%] h-[90%] bg-sky-100/80 rounded-3xl transform -rotate-3 -z-10 border border-sky-200"
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -right-4 w-[85%] h-[85%] bg-primary/10 rounded-3xl transform rotate-6 -z-10"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-border max-w-md md:max-w-full">
              <Image
                src={doctorImage}
                alt={site.doctor}
                priority
                className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-primary-foreground flex items-center justify-center font-bold text-lg">
                  20+
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    Anni di Attività
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    Esperienza Clinica Certificata
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
