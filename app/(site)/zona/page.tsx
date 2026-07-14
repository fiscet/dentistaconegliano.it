import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { socialMeta, canonicalUrl } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATION_PAGES_QUERY } from "@/sanity/lib/queries";

const title = "Zone servite";
const description =
  "Lo Studio Dentistico Dott. Gianluca Marin a Conegliano è facilmente raggiungibile da Treviso, Vittorio Veneto, Oderzo e dagli altri comuni della zona.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    ...(await socialMeta({ title, description })),
    ...(await canonicalUrl("/zona")),
  };
}

export default async function ZonePage() {
  const { data: locations } = await sanityFetch({ query: LOCATION_PAGES_QUERY });

  return (
    <main className="flex-1">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            Dove operiamo
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Zone servite
          </h1>
          <div className="w-24 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base text-muted-foreground mt-4">
            Da Conegliano raggiungiamo pazienti da tutta la zona: ecco come arrivare e cosa
            offriamo a chi viene da queste città.
          </p>
        </div>

        {!locations?.length ? (
          <p className="text-muted-foreground">Pagine di zona in preparazione.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <Link
                key={location._id}
                href={location.slug ? `/zona/${location.slug}` : "/zona"}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col"
              >
                {location.image?.asset ? (
                  <div className="relative h-48 bg-muted overflow-hidden">
                    <Image
                      src={urlFor(location.image).width(800).height(450).url()}
                      alt={location.image.alt ?? location.cityName ?? ""}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-sky-50 flex items-center justify-center">
                    <MapPin className="w-12 h-12 text-primary" aria-hidden="true" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                    {location.cityName}
                  </h2>
                  {location.intro && (
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {location.intro}
                    </p>
                  )}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary uppercase tracking-wider">
                    <span>Scopri di più</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
