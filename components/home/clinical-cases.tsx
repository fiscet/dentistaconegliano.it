import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import {
  clinicalCasesFallback as fallback,
  clinicalCasesItemsFallback as fallbackCases,
} from "@/lib/fallback/home";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";

export type ClinicalCasesData = NonNullable<HOME_PAGE_QUERY_RESULT>["clinicalCases"];

export default function ClinicalCases({ data }: { data?: ClinicalCasesData | null }) {
  const sanityCases = data?.items?.length ? data.items : null;

  return (
    <section className="py-20 lg:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              {data?.eyebrow ?? fallback.eyebrow}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {data?.title ?? fallback.title}
            </h2>
            <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            {data?.description ?? fallback.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sanityCases
            ? sanityCases.map((clinicalCase) => (
                <Link
                  key={clinicalCase._key}
                  href={clinicalCase.href ?? "/interventi-realizzati"}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block"
                >
                  <div className="relative h-56 bg-muted overflow-hidden">
                    {clinicalCase.image?.asset && (
                      <Image
                        src={urlFor(clinicalCase.image).width(800).height(450).url()}
                        alt={clinicalCase.image.alt ?? clinicalCase.title ?? ""}
                        width={800}
                        height={450}
                        className="w-full h-full object-cover"
                      />
                    )}
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {clinicalCase.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {clinicalCase.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      {clinicalCase.description}
                    </p>
                    <div className="flex justify-between items-center text-xs font-bold text-primary border-t border-border pt-4">
                      <span>VEDI DETTAGLI CLINICI</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))
            : fallbackCases.map((clinicalCase) => (
                <Link
                  key={clinicalCase._key}
                  href={clinicalCase.href}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block"
                >
                  <div className="relative h-56 bg-muted overflow-hidden">
                    <Image
                      src={clinicalCase.staticImage}
                      alt={clinicalCase.imageAlt}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      {clinicalCase.badge}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                      {clinicalCase.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mb-4">
                      {clinicalCase.description}
                    </p>
                    <div className="flex justify-between items-center text-xs font-bold text-primary border-t border-border pt-4">
                      <span>VEDI DETTAGLI CLINICI</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
