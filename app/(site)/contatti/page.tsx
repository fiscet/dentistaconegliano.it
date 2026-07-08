import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import ContactForm from "@/components/contact-form";
import { getSiteSettings } from "@/lib/settings";

export const metadata: Metadata = {
  title: "Contatti",
  description:
    "Contatta lo Studio Dentistico Dott. Gianluca Marin a Conegliano: telefono, email, indirizzo e modulo per prenotare una visita.",
};

export default async function ContattiPage() {
  const settings = await getSiteSettings();

  const mapQuery = `${settings.address.street}, ${settings.address.postalCode} ${settings.address.city} ${settings.address.province}`;
  const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;
  const whatsappHref = settings.whatsapp
    ? `https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`
    : null;

  const details = [
    {
      icon: Phone,
      label: "Telefono",
      value: settings.phone,
      href: settings.phoneHref,
    },
    whatsappHref
      ? { icon: MessageCircle, label: "WhatsApp", value: settings.whatsapp!, href: whatsappHref }
      : null,
    settings.email
      ? { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` }
      : null,
    { icon: MapPin, label: "Indirizzo", value: settings.addressLine, href: null },
    { icon: Clock, label: "Orari", value: settings.openingHours, href: null },
  ].filter((d): d is NonNullable<typeof d> => d !== null);

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="bg-linear-to-br from-secondary/50 via-background to-secondary/30 py-14 lg:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Contatti
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            Prenota una visita o richiedi informazioni
          </h1>
          <div className="w-24 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-3xl leading-relaxed">
            Siamo a Conegliano, in {settings.address.street}. Chiamaci, scrivici o compila il modulo:
            ti ricontattiamo per fissare la tua consulenza.
          </p>
        </div>
      </section>

      {/* DETTAGLI + FORM */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-5 flex flex-col gap-4">
              {details.map((d) => {
                const content = (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center text-primary shrink-0">
                      <d.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">
                        {d.label}
                      </p>
                      <p className="text-sm font-bold text-foreground">{d.value}</p>
                    </div>
                  </>
                );
                return d.href ? (
                  <a
                    key={d.label}
                    href={d.href}
                    className="flex items-center gap-4 bg-card p-5 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow"
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={d.label}
                    className="flex items-center gap-4 bg-card p-5 rounded-2xl border border-border shadow-sm"
                  >
                    {content}
                  </div>
                );
              })}
            </div>

            <div className="lg:col-span-7">
              <div className="bg-card p-6 sm:p-8 rounded-3xl border border-border shadow-sm">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                  Richiedi una consulenza
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAPPA */}
      <section aria-label="Mappa dello studio" className="border-t border-border">
        <iframe
          title={`Mappa — ${settings.name}`}
          src={mapSrc}
          className="w-full h-96 border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </main>
  );
}
