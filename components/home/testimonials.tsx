import { Star, Quote } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { HOME_PAGE_QUERY_RESULT, HOME_TESTIMONIALS_QUERY_RESULT } from "@/sanity.types";

export type TestimonialsHeader = NonNullable<HOME_PAGE_QUERY_RESULT>["testimonials"];
export type TestimonialsData = HOME_TESTIMONIALS_QUERY_RESULT;

const headerFallback = {
  eyebrow: "La voce dei pazienti",
  title: "Cosa dicono di noi",
  description:
    "Le esperienze di chi ha già scelto lo Studio Dentistico Marin per il proprio percorso di cura.",
};

export default function Testimonials({
  header,
  items,
}: {
  header?: TestimonialsHeader | null;
  items?: TestimonialsData | null;
}) {
  // Nessuna testimonianza in evidenza: niente sezione, niente contenuto finto.
  if (!items?.length) return null;

  return (
    <section className="py-20 lg:py-28 bg-secondary/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            {header?.eyebrow ?? headerFallback.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            {header?.title ?? headerFallback.title}
          </h2>
          <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-sm text-muted-foreground mt-4 max-w-md">
            {header?.description ?? headerFallback.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((testimonial) => (
            <figure
              key={testimonial._id}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col"
            >
              <Quote className="w-8 h-8 text-sky-200 mb-3" aria-hidden="true" />
              {typeof testimonial.rating === "number" && (
                <div className="flex items-center gap-0.5 mb-3" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating!
                          ? "fill-sky-500 text-sky-500"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
              <blockquote className="text-sm text-muted-foreground leading-relaxed flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </blockquote>
              <figcaption className="mt-5 pt-4 border-t border-border flex items-center justify-between text-xs">
                <span className="font-bold text-foreground">{testimonial.authorName}</span>
                <span className="text-muted-foreground">
                  {[testimonial.source, formatDate(testimonial.date)].filter(Boolean).join(" · ")}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
