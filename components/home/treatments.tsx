import Image from "next/image";
import Link from "next/link";
import { Zap, Layers, Monitor, ArrowRight } from "lucide-react";
import { resolveIcon } from "@/components/home/icon-map";
import { treatmentsFallback as fallback } from "@/lib/fallback/home";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";
import logoMotif from "@/public/images/logo-motif.png";

export type TreatmentsData = NonNullable<HOME_PAGE_QUERY_RESULT>["treatments"];

const fallbackIcons = [Zap, Layers, Monitor];

export default function Treatments({ data }: { data?: TreatmentsData | null }) {
  const items = data?.items?.length ? data.items : fallback.items;

  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute -top-16 -left-10 w-80 lg:w-[28rem]">
          <Image src={logoMotif} alt="" className="w-full h-auto object-contain" />
        </div>
        <div className="absolute bottom-10 -right-16 w-72 lg:w-80 rotate-180">
          <Image src={logoMotif} alt="" className="w-full h-auto object-contain" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            {data?.eyebrow ?? fallback.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {data?.title ?? fallback.title}
          </h2>
          <div className="w-24 h-1 bg-sky-500 mx-auto mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base text-muted-foreground mt-4">
            {data?.description ?? fallback.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((treatment, index) => {
            const Icon = resolveIcon(treatment.icon, fallbackIcons[index % fallbackIcons.length]);
            const number = String(index + 1).padStart(2, "0");
            return (
              <Link
                key={treatment._key}
                href={treatment.href ?? "/"}
                className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between backdrop-blur-sm"
              >
                <div
                  className="absolute -top-3 -right-3 w-12 h-12 bg-sky-50 rounded-full flex items-center justify-center text-primary font-bold text-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  aria-hidden="true"
                >
                  {number}
                </div>
                <div>
                  <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center text-primary mb-6">
                    <Icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">
                    {treatment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {treatment.description}
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">
                    Scopri di più
                  </span>
                  <ArrowRight
                    className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
