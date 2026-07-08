import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HeartPulse } from "lucide-react";
import { resolveIcon } from "@/components/home/icon-map";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICES_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Servizi e Trattamenti",
  description:
    "I trattamenti dello Studio Dentistico Dott. Gianluca Marin a Conegliano: implantologia a carico immediato, All-on-4, chirurgia computer guidata e altro.",
};

export default async function ServiziPage() {
  const { data: services } = await sanityFetch({ query: SERVICES_QUERY });

  return (
    <main className="flex-1">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Eccellenza in Chirurgia Orale
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Servizi e Trattamenti
          </h1>
          <div className="w-24 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base text-muted-foreground mt-4">
            Soluzioni implantari e protesiche moderne, mininvasive e su misura per ogni esigenza.
          </p>
        </div>

        {!services?.length ? (
          <p className="text-muted-foreground">
            Elenco dei servizi in aggiornamento. Torna a trovarci presto!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = resolveIcon(service.icon, HeartPulse);
              return (
                <Link
                  key={service._id}
                  href={service.slug ? `/servizi/${service.slug}` : "/servizi"}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
                >
                  {service.image?.asset ? (
                    <div className="relative h-48 bg-muted overflow-hidden">
                      <Image
                        src={urlFor(service.image).width(800).height(450).url()}
                        alt={service.image.alt ?? service.title ?? ""}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-sky-50 flex items-center justify-center">
                      <Icon className="w-12 h-12 text-primary" aria-hidden="true" />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                      {service.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {service.excerpt}
                    </p>
                    <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary uppercase tracking-wider">
                      <span>Scopri di più</span>
                      <ArrowRight
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
