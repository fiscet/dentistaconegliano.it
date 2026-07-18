import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDown, ArrowRight, CircleCheck } from "lucide-react";
import { resolveIcon } from "@/components/home/icon-map";
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { PATH_PAGE_QUERY } from "@/sanity/lib/queries";
import { heroFallback, stepsFallback, ctaFallback } from "@/lib/fallback/percorso";

const fallbackTitle =
  "Come Funziona il Percorso di Cura | Studio Dentistico Dott. Gianluca Marin";
const fallbackDescription =
  "Scopri le quattro fasi del percorso di cura dello Studio Dentistico Dott. Gianluca Marin a Conegliano: prima visita, diagnosi, piano di trattamento, intervento e controlli.";

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({ query: PATH_PAGE_QUERY, stega: false });
  const title = page?.seoTitle ?? fallbackTitle;
  const description = page?.seoDescription ?? fallbackDescription;
  return {
    title: { absolute: title },
    description,
    ...(await socialMeta({ title, description, image: ogImageUrl(page?.seoImage) })),
    ...(await canonicalUrl("/percorso-di-cura")),
    ...robotsMeta(page?.noIndex),
  };
}

export default async function PercorsoDiCuraPage() {
  const { data: page } = await sanityFetch({ query: PATH_PAGE_QUERY });

  const hero = page?.hero;
  const steps = page?.steps?.length ? page.steps : stepsFallback;
  const cta = page?.cta;

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

      {/* PASSAGGI */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = resolveIcon(step.icon, CircleCheck);
              const isLast = index === steps.length - 1;
              return (
                <div key={step._key} className="flex flex-1 items-stretch gap-6 lg:gap-4">
                  <div className="flex-1 bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col items-center text-center gap-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-sky-100 flex items-center justify-center text-primary">
                        <Icon className="w-7 h-7" aria-hidden="true" />
                      </div>
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-sky-500 text-white text-sm font-bold flex items-center justify-center shadow">
                        {index + 1}
                      </span>
                    </div>
                    <h2 className="font-heading text-lg font-bold text-foreground">
                      {step.title}
                    </h2>
                    {step.text && (
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.text}</p>
                    )}
                  </div>

                  {!isLast && (
                    <div
                      className="flex items-center justify-center shrink-0 text-sky-400 lg:pt-16"
                      aria-hidden="true"
                    >
                      <ArrowDown className="w-6 h-6 lg:hidden" />
                      <ArrowRight className="w-6 h-6 hidden lg:block" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 lg:pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-secondary/50 border border-border rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row sm:items-center gap-6">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">
                {cta?.title ?? ctaFallback.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {cta?.description ?? ctaFallback.description}
              </p>
            </div>
            <Link
              href="/contatti"
              className="sm:ml-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition shrink-0"
            >
              {cta?.buttonLabel ?? ctaFallback.buttonLabel}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
