import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/lib/settings";
import { sanityFetch } from "@/sanity/lib/live";
import { CASES_PAGE_QUERY, CASES_QUERY } from "@/sanity/lib/queries";
import type { CASES_QUERY_RESULT } from "@/sanity.types";
import { heroFallback } from "@/lib/fallback/cases";
import { clinicalCasesItemsFallback as fallbackCases } from "@/lib/fallback/home";

const fallbackTitle =
  "Interventi Realizzati e Casi Clinici | Studio Dentistico Dott. Gianluca Marin";
const fallbackDescription =
  "Casi clinici reali di implantologia trattati a Conegliano dallo Studio Dentistico Dott. Gianluca Marin: documentazione fotografica prima e dopo.";

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({ query: CASES_PAGE_QUERY });
  const title = page?.seoTitle ?? fallbackTitle;
  const description = page?.seoDescription ?? fallbackDescription;
  return {
    title: { absolute: title },
    description,
    ...(await socialMeta({ title, description, image: ogImageUrl(page?.seoImage) })),
    ...(await canonicalUrl("/interventi-realizzati")),
    ...robotsMeta(page?.noIndex),
  };
}

export default async function InterventiPage() {
  const [{ data: page }, { data: cases }, settings] = await Promise.all([
    sanityFetch({ query: CASES_PAGE_QUERY }),
    sanityFetch({ query: CASES_QUERY }),
    getSiteSettings(),
  ]);

  const hero = page?.hero;
  const items = cases ?? [];

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="bg-linear-to-br from-secondary/50 via-background to-secondary/30 py-14 lg:py-16 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            {hero?.eyebrow ?? heroFallback.eyebrow}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
            {hero?.title ?? heroFallback.title}
          </h1>
          <div className="w-24 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base sm:text-lg text-muted-foreground mt-4 max-w-3xl leading-relaxed">
            {hero?.description ?? heroFallback.description}
          </p>
        </div>
      </section>

      {/* GALLERIA */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map((item) => (
                <CaseCard key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fallbackCases.map((c) => (
                <article
                  key={c._key}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
                >
                  <div className="relative h-56 bg-muted overflow-hidden">
                    <Image
                      src={c.staticImage}
                      alt={c.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {c.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {c.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">{c.description}</p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-16 bg-secondary/50 border border-border rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                Vuoi valutare il tuo caso?
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Prenota una prima visita: analizziamo la tua situazione e ti proponiamo il percorso
                di cura più adatto.
              </p>
            </div>
            <a
              href={settings.phoneHref}
              className="sm:ml-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shrink-0"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              {settings.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

type Case = CASES_QUERY_RESULT[number];

function CaseCard({ item }: { item: Case }) {
  const before = item.imageBefore;
  const after = item.imageAfter;
  const hasBoth = Boolean(before?.asset && after?.asset);
  const single = after?.asset ? after : before?.asset ? before : null;

  return (
    <article className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
      {hasBoth ? (
        <div className="grid grid-cols-2">
          {[
            { img: before!, label: "Prima" },
            { img: after!, label: "Dopo" },
          ].map(({ img, label }) => (
            <figure key={label} className="relative h-48 bg-muted overflow-hidden m-0">
              <Image
                src={urlFor(img).width(400).height(400).url()}
                alt={img.alt ?? `${item.title ?? "Caso"} — ${label}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
              <figcaption className="absolute bottom-2 left-2 bg-background/90 text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded">
                {label}
              </figcaption>
            </figure>
          ))}
        </div>
      ) : (
        <div className="relative h-56 bg-muted overflow-hidden">
          {single && (
            <Image
              src={urlFor(single).width(800).height(450).url()}
              alt={single.alt ?? item.title ?? ""}
              width={800}
              height={450}
              className="w-full h-full object-cover"
            />
          )}
        </div>
      )}
      <div className="p-6">
        {item.badge && (
          <span className="inline-block bg-sky-50 text-sky-600 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">
            {item.badge}
          </span>
        )}
        <h3 className="font-heading text-lg font-bold text-foreground mb-2">{item.title}</h3>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        )}
      </div>
    </article>
  );
}
