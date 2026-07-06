import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone } from "lucide-react";
import PortableTextBody from "@/components/portable-text";
import { formatServicePrice } from "@/lib/format";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/lib/settings";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { SERVICE_QUERY, SERVICE_SLUGS_QUERY } from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await client.fetch(SERVICE_SLUGS_QUERY);
  return slugs
    .map((s) => s.slug)
    .filter((slug): slug is string => Boolean(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: service } = await sanityFetch({ query: SERVICE_QUERY, params: { slug } });
  if (!service) return {};
  return {
    title: service.seoTitle ?? service.title ?? "Servizio",
    description: service.seoDescription ?? service.excerpt ?? undefined,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [{ data: service }, settings] = await Promise.all([
    sanityFetch({ query: SERVICE_QUERY, params: { slug } }),
    getSiteSettings(),
  ]);

  if (!service) notFound();

  return (
    <main className="flex-1">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/servizi"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Tutti i servizi
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          {service.title}
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-6 rounded-full" aria-hidden="true" />

        {service.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{service.excerpt}</p>
        )}

        {service.image?.asset && (
          <div className="relative rounded-2xl overflow-hidden border border-border mb-10">
            <Image
              src={urlFor(service.image).width(1200).height(675).url()}
              alt={service.image.alt ?? service.title ?? ""}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 mb-10 p-5 bg-sky-50 rounded-2xl">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">Prezzo</span>
          <span className="font-heading text-xl font-bold text-foreground">
            {formatServicePrice(service.priceMin, service.priceMax, service.priceNote)}
          </span>
          <Link
            href="/costo-impianto-dentale-conegliano"
            className="ml-auto text-sm font-semibold text-primary hover:underline"
          >
            Vedi tutti i prezzi
          </Link>
        </div>

        {service.body && (
          <div className="mb-12">
            <PortableTextBody value={service.body} />
          </div>
        )}

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row gap-4">
          <Link
            href="/#contatti"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition"
          >
            Richiedi una consulenza
          </Link>
          <a
            href={settings.phoneHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-border font-semibold text-foreground hover:bg-muted transition"
          >
            <Phone className="w-4 h-4" aria-hidden="true" />
            {settings.phone}
          </a>
        </div>
      </section>
    </main>
  );
}
