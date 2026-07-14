import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Phone, HeartPulse } from "lucide-react";
import PortableTextBody from "@/components/portable-text";
import { resolveIcon } from "@/components/home/icon-map";
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/lib/settings";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { LOCATION_PAGE_QUERY, LOCATION_PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await client.fetch(LOCATION_PAGE_SLUGS_QUERY);
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
  const { data: location } = await sanityFetch({
    query: LOCATION_PAGE_QUERY,
    params: { slug },
    stega: false,
  });
  if (!location) return {};
  const title = location.seoTitle ?? location.title ?? "Zona servita";
  const description = location.seoDescription ?? location.intro ?? undefined;
  return {
    title,
    description,
    ...(await socialMeta({
      title,
      description,
      image: ogImageUrl(location.seoImage, location.image),
      type: "article",
    })),
    ...(await canonicalUrl(`/zona/${slug}`)),
    ...robotsMeta(location.noIndex),
  };
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const [{ data: location }, settings] = await Promise.all([
    sanityFetch({ query: LOCATION_PAGE_QUERY, params: { slug } }),
    getSiteSettings(),
  ]);

  if (!location) notFound();

  const url = new URL(`/zona/${slug}`, settings.url).toString();
  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "Home", url: settings.url },
    { name: "Zone servite", url: new URL("/zona", settings.url).toString() },
    { name: location.cityName ?? location.title ?? "Zona", url },
  ]);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLdData) }}
      />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/zona"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Tutte le zone servite
        </Link>

        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          {location.title}
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-6 rounded-full" aria-hidden="true" />

        {location.intro && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{location.intro}</p>
        )}

        {location.image?.asset && (
          <div className="relative rounded-2xl overflow-hidden border border-border mb-10">
            <Image
              src={urlFor(location.image).width(1200).height(675).url()}
              alt={location.image.alt ?? location.title ?? ""}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {location.body && (
          <div className="mb-12">
            <PortableTextBody value={location.body} />
          </div>
        )}

        {location.featuredServices && location.featuredServices.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Trattamenti richiesti da {location.cityName}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {location.featuredServices.map((service) => {
                if (!service) return null;
                const Icon = resolveIcon(service.icon, HeartPulse);
                return (
                  <Link
                    key={service._id}
                    href={service.slug ? `/servizi/${service.slug}` : "/servizi"}
                    className="flex items-start gap-4 bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center text-primary shrink-0">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">{service.title}</h3>
                      {service.excerpt && (
                        <p className="text-sm text-muted-foreground">{service.excerpt}</p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
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
