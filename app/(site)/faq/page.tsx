import type { Metadata } from "next";
import Link from "next/link";
import { socialMeta, canonicalUrl } from "@/lib/seo";
import { faqPageJsonLd } from "@/lib/json-ld";
import { sanityFetch } from "@/sanity/lib/live";
import { FAQS_QUERY } from "@/sanity/lib/queries";

const title = "Domande frequenti";
const description =
  "Le risposte alle domande più frequenti sui trattamenti e sull'organizzazione dello Studio Dentistico Dott. Gianluca Marin a Conegliano.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    ...(await socialMeta({ title, description })),
    ...(await canonicalUrl("/faq")),
  };
}

export default async function FaqPage() {
  const { data: faqs } = await sanityFetch({ query: FAQS_QUERY });

  const jsonLd = faqs?.length
    ? faqPageJsonLd(
        faqs
          .filter((faq): faq is typeof faq & { question: string; answer: string } =>
            Boolean(faq.question && faq.answer),
          )
          .map((faq) => ({ question: faq.question, answer: faq.answer })),
      )
    : null;

  return (
    <main className="flex-1">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          Domande frequenti
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-8 rounded-full" aria-hidden="true" />
        <p className="text-lg text-muted-foreground leading-relaxed mb-10">
          Le risposte alle domande che ci vengono rivolte più spesso. Non trovi la tua? Contattaci
          direttamente.
        </p>

        {!faqs?.length ? (
          <p className="text-muted-foreground">Nessuna domanda pubblicata al momento.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {faqs.map((faq) => {
              if (!faq.question || !faq.answer) return null;
              return (
                <details
                  key={faq._id}
                  className="group bg-card border border-border rounded-2xl px-6 py-4 open:shadow-sm transition-shadow"
                >
                  <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-foreground">
                    {faq.question}
                    <span
                      className="shrink-0 text-primary text-xl leading-none transition-transform group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <p className="text-muted-foreground leading-relaxed mt-3">{faq.answer}</p>
                  {faq.relatedService?.slug && (
                    <Link
                      href={`/servizi/${faq.relatedService.slug}`}
                      className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 mt-4 text-xs font-semibold text-primary hover:bg-secondary/80 transition-colors"
                    >
                      {faq.relatedService.title}
                    </Link>
                  )}
                </details>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
