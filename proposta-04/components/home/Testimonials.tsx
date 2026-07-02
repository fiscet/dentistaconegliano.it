import { Star, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/lib/content";

export default function Testimonials() {
  return (
    <section className="bg-background py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Testimonianze"
          title="La parola ai nostri pazienti"
          description="La soddisfazione di chi ha ritrovato il sorriso è la nostra migliore recensione."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-sm"
            >
              <Quote className="h-8 w-8 text-brand-light" aria-hidden />
              <div className="mt-3 flex gap-0.5" aria-label={`${t.rating} stelle su 5`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-brand text-brand"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-display text-sm font-semibold text-foreground">
                  {t.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {t.location}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
