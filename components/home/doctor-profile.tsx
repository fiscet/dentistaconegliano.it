import Image from "next/image";
import Link from "next/link";
import { Shield, Award, ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import doctorImage from "@/public/images/gianluca-marin-home.jpg";

export default function DoctorProfile() {
  return (
    <section className="py-20 lg:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            <div
              className="absolute -bottom-4 -right-4 w-[95%] h-[95%] bg-primary rounded-3xl transform rotate-3 -z-10"
              aria-hidden="true"
            />
            <div
              className="absolute -top-4 -left-4 w-[90%] h-[90%] bg-sky-200/50 rounded-3xl transform -rotate-3 -z-10"
              aria-hidden="true"
            />

            <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-border max-w-sm">
              <Image
                src={doctorImage}
                alt={site.doctor}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent p-6 text-primary-foreground text-center">
                <p className="text-lg font-bold font-heading">{site.doctor}</p>
                <p className="text-xs text-sky-300">
                  Direttore Sanitario e Chirurgo Implantologo
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
              Chi ti curerà
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              L&apos;esperienza clinica e accademica del Dott. Gianluca Marin
            </h2>
            <div className="w-20 h-1 bg-sky-500 rounded-full" aria-hidden="true" />

            <p className="text-base text-muted-foreground leading-relaxed">
              Laureato con lode e specializzato in chirurgia orale avanzata, il
              Dott. Gianluca Marin vanta oltre 20 anni di attività professionale
              e migliaia di interventi di implantologia a carico immediato
              eseguiti con successo.
            </p>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Socio attivo delle più importanti società scientifiche di
              implantologia italiane ed europee, perfeziona costantemente le
              metodiche mininvasive per garantire il massimo comfort ai
              pazienti.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border shadow-sm">
                <Shield className="w-6 h-6 text-sky-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Formazione Internazionale
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Master in Svezia e Stati Uniti
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border shadow-sm">
                <Award className="w-6 h-6 text-sky-500 mt-1 shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Certificazioni Nobel Biocare
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Partner ufficiale implantologia premium
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-sky-600 transition-colors"
              >
                Leggi la biografia e scopri il team
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
