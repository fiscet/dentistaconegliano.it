import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { socialMeta, canonicalUrl } from "@/lib/seo";
import { videoObjectJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";
import { formatDate } from "@/lib/format";
import { getSiteSettings } from "@/lib/settings";
import { urlFor } from "@/sanity/lib/image";
import { client } from "@/sanity/lib/client";
import { sanityFetch } from "@/sanity/lib/live";
import { VIDEO_QUERY, VIDEO_SLUGS_QUERY } from "@/sanity/lib/queries";
import { LiteYouTube } from "@/components/lite-youtube";

type Params = { slug: string };

export async function generateStaticParams() {
  const slugs = await client.fetch(VIDEO_SLUGS_QUERY);
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
  const { data: video } = await sanityFetch({
    query: VIDEO_QUERY,
    params: { slug },
    stega: false,
  });
  if (!video) return {};
  const title = video.title ?? "Video";
  const description = video.description ?? undefined;
  return {
    title,
    description,
    ...(await socialMeta({
      title,
      description,
      image: video.thumbnail ? urlFor(video.thumbnail).width(1200).height(630).fit("crop").url() : undefined,
    })),
    ...(await canonicalUrl(`/video/${slug}`)),
  };
}

export default async function VideoDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const [{ data: video }, settings] = await Promise.all([
    sanityFetch({ query: VIDEO_QUERY, params: { slug } }),
    getSiteSettings(),
  ]);

  if (!video || !video.youtubeUrl) notFound();

  const thumbnailUrl = video.thumbnail
    ? urlFor(video.thumbnail).width(1280).height(720).fit("crop").url()
    : undefined;

  const videoUrl = new URL(`/video/${slug}`, settings.url).toString();
  const jsonLd = videoObjectJsonLd({
    title: video.title ?? "Video",
    description: video.description ?? undefined,
    youtubeUrl: video.youtubeUrl,
    publishedAt: video.publishedAt ?? undefined,
    duration: video.duration ?? undefined,
    thumbnailUrl,
  });
  const breadcrumbJsonLdData = breadcrumbJsonLd([
    { name: "Home", url: settings.url },
    { name: "Video", url: new URL("/video", settings.url).toString() },
    { name: video.title ?? "Video", url: videoUrl },
  ]);

  return (
    <main className="flex-1">
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLdData) }}
      />
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <Link
          href="/video"
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:gap-3 transition-all"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Tutti i video
        </Link>

        <div className="text-xs text-muted-foreground mb-3">
          {formatDate(video.publishedAt)}
          {video.duration ? ` · ${video.duration}` : ""}
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
          {video.title}
        </h1>
        <div className="w-24 h-1 bg-sky-500 mt-4 mb-8 rounded-full" aria-hidden="true" />

        <LiteYouTube
          url={video.youtubeUrl}
          caption={video.title ?? undefined}
          thumbnailUrl={thumbnailUrl}
          duration={video.duration ?? undefined}
        />

        {video.description && (
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mt-8">
            {video.description}
          </p>
        )}

        {video.relatedService?.slug && (
          <Link
            href={`/servizi/${video.relatedService.slug}`}
            className="inline-flex w-fit items-center rounded-full bg-secondary px-4 py-2 mt-8 text-sm font-semibold text-primary hover:bg-secondary/80 transition-colors"
          >
            Scopri di più su {video.relatedService.title}
          </Link>
        )}
      </article>
    </main>
  );
}
