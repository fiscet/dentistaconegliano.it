import { Phone, MapPin, Clock } from "lucide-react";
import { site } from "@/lib/site";
import ContactForm from "@/components/contact-form";

export default function ContactSection() {
  return (
    <section
      id="contatti"
      className="py-20 lg:py-28 bg-secondary/50 relative overflow-hidden border-t border-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
                Parla con noi
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Richiedi una Consulenza Gratuita
              </h2>
              <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
              <p className="text-base text-muted-foreground mt-4">
                Siamo qui per darti tutte le risposte. Compila il modulo o
                chiamaci direttamente per fissare un appuntamento diagnostico.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <a
                href={site.phoneHref}
                className="flex items-center gap-4 bg-background p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-primary shrink-0">
                  <Phone className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                    Telefono Urgenze &amp; Info
                  </p>
                  <p className="text-lg font-extrabold text-primary">{site.phone}</p>
                </div>
              </a>

              <div className="flex items-center gap-4 bg-background p-5 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                    Indirizzo dello Studio
                  </p>
                  <p className="text-sm font-bold text-foreground">{site.addressLine}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-background p-5 rounded-2xl border border-border shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-primary shrink-0">
                  <Clock className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                    Orari di Apertura
                  </p>
                  <p className="text-sm font-bold text-foreground">{site.openingHours}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 relative">
            <div
              className="absolute -bottom-4 -left-4 w-full h-full bg-primary/5 rounded-3xl transform -rotate-2 -z-10 border border-primary/10"
              aria-hidden="true"
            />

            <div className="bg-background p-8 sm:p-10 rounded-3xl border border-border shadow-xl relative">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                Invia una richiesta immediata
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
