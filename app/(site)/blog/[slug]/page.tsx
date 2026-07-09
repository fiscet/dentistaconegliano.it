import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import PortableTextBody from "@/components/portable-text";
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from "@/lib/seo";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { formatDate } from "@/lib/format";
import { getSiteSettings } from "@/lib/settings";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await client.fetch(POST_SLUGS_QUERY);
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
  const { data: post } = await sanityFetch({
    query: POST_QUERY,
    params: { slug },
    stega: false,
  });
  if (!post) return {};
  const title = post.seoTitle ?? post.title ?? "Articolo";
  const description = post.seoDescription ?? post.excerpt ?? undefined;
  return {
    title,
    description,
    ...(await socialMeta({
      title,
      description,
      image: ogImageUrl(post.seoImage, post.mainImage),
      type: "article",
    })),
    ...(await canonicalUrl(`/blog/${slug}`)),
    ...robotsMeta(post.noIndex),
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [{ data: post }, settings] = await Promise.all([
    sanityFetch({ query: POST_QUERY, params: { slug } }),
    getSiteSettings(),
  ]);

  if (!post) notFound();

  const postUrl = new URL(`/blog/${slug}`, settings.url).toString();
  const jsonLd = articleJsonLd({
    title: post.seoTitle ?? post.title ?? "Articolo",
    description: post.seoDescription ?? post.excerpt ?? undefined,
    image: ogImageUrl(post.seoImage, post.mainImage),
    publishedAt: post.publishedAt ?? undefined,
    authorName: post.author?.name ?? undefined,
    url: postUrl,
  });
  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "Home", url: settings.url },
    { name: "Blog", url: new URL("/blog", settings.url).toString() },
    { name: post.title ?? "Articolo", url: postUrl },
  ]);

  return (
    <main className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLdData) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Tutti gli articoli
        </Link>

        <div className="text-xs text-muted-foreground mb-3">
          {formatDate(post.publishedAt)}
          {post.author?.name ? ` · ${post.author.name}` : ""}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          {post.title}
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-8 rounded-full" aria-hidden="true" />

        {post.mainImage?.asset && (
          <div className="relative rounded-2xl overflow-hidden border border-border mb-10">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.mainImage.alt ?? post.title ?? ""}
              width={1200}
              height={675}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {post.body && <PortableTextBody value={post.body} />}
      </article>
    </main>
  );
}
