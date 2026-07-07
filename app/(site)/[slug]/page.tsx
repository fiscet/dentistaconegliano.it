import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PortableTextBody from "@/components/portable-text";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await client.fetch(PAGE_SLUGS_QUERY);
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
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug } });
  if (!page) return {};
  return {
    title: page.seoTitle ?? page.title ?? "Pagina",
    description: page.seoDescription ?? page.intro ?? undefined,
  };
}

export default async function CustomPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const { data: page } = await sanityFetch({ query: PAGE_QUERY, params: { slug } });

  if (!page) notFound();

  return (
    <main className="flex-1">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          {page.title}
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-8 rounded-full" aria-hidden="true" />
        {page.intro && (
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">{page.intro}</p>
        )}
        {page.body && <PortableTextBody value={page.body} />}
      </article>
    </main>
  );
}
