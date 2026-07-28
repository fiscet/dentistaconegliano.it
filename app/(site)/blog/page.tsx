import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from "@/lib/seo";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_PAGE_QUERY, POSTS_QUERY } from "@/sanity/lib/queries";
import { heroFallback } from "@/lib/fallback/blog";
import { BLOG_CATEGORY_LABELS, BLOG_CATEGORY_ORDER } from "@/lib/blog-categories";

const fallbackTitle = "Blog | Studio Dentistico Dott. Gianluca Marin";
const fallbackDescription =
  "Approfondimenti, consigli e novità dallo Studio Dentistico Dott. Gianluca Marin a Conegliano: implantologia, salute orale e tecnologie.";

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch({ query: BLOG_PAGE_QUERY, stega: false });
  const title = page?.seoTitle ?? fallbackTitle;
  const description = page?.seoDescription ?? fallbackDescription;
  return {
    title: { absolute: title },
    description,
    ...(await socialMeta({ title, description, image: ogImageUrl(page?.seoImage) })),
    ...(await canonicalUrl("/blog")),
    ...robotsMeta(page?.noIndex),
  };
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const [{ data: page }, { data: posts }, { categoria }] = await Promise.all([
    sanityFetch({ query: BLOG_PAGE_QUERY }),
    sanityFetch({ query: POSTS_QUERY }),
    searchParams,
  ]);
  const hero = page?.hero;

  // Solo le categorie effettivamente usate da almeno un articolo, nell'ordine
  // canonico definito in BLOG_CATEGORY_ORDER.
  const usedCategories = new Set<string>(
    (posts ?? []).flatMap((p) => (p.category ? [p.category as string] : [])),
  );
  const availableCategories = BLOG_CATEGORY_ORDER.filter((cat) => usedCategories.has(cat));
  const activeCategory = categoria && usedCategories.has(categoria) ? categoria : undefined;
  const filteredPosts = activeCategory
    ? (posts ?? []).filter((p) => p.category === activeCategory)
    : posts;

  return (
    <main className="flex-1">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="max-w-3xl mb-14">
          <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
            {hero?.eyebrow ?? heroFallback.eyebrow}
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            {hero?.title ?? heroFallback.title}
          </h1>
          <div className="w-24 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          <p className="text-base text-muted-foreground mt-4">
            {hero?.description ?? heroFallback.description}
          </p>
        </div>

        {availableCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            <Link
              href="/blog"
              className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                !activeCategory
                  ? "bg-sky-600 border-sky-600 text-white"
                  : "border-border text-muted-foreground hover:border-sky-400 hover:text-sky-600"
              }`}
            >
              Tutti
            </Link>
            {availableCategories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?categoria=${cat}`}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  activeCategory === cat
                    ? "bg-sky-600 border-sky-600 text-white"
                    : "border-border text-muted-foreground hover:border-sky-400 hover:text-sky-600"
                }`}
              >
                {BLOG_CATEGORY_LABELS[cat] ?? cat}
              </Link>
            ))}
          </div>
        )}

        {!filteredPosts?.length ? (
          <p className="text-muted-foreground">
            {activeCategory
              ? "Nessun articolo in questa categoria al momento."
              : "Nessun articolo pubblicato al momento. Torna a trovarci presto!"}
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link
                key={post._id}
                href={`/blog/${post.slug}`}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
              >
                <div className="relative h-48 bg-muted overflow-hidden">
                  {post.mainImage?.asset && (
                    <Image
                      src={urlFor(post.mainImage).width(800).height(450).url()}
                      alt={post.mainImage.alt ?? post.title ?? ""}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="text-xs text-muted-foreground mb-2">
                    {formatDate(post.publishedAt)}
                    {post.author ? ` · ${post.author}` : ""}
                  </div>
                  <h2 className="font-heading text-xl font-bold text-foreground mb-2">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary uppercase tracking-wider">
                    <span>Leggi l&apos;articolo</span>
                    <ArrowRight
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
