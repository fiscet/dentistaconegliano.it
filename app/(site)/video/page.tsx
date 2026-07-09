import type { Metadata } from "next";
import Link from "next/link";
import { socialMeta, canonicalUrl } from "@/lib/seo";
import { videoObjectJsonLd } from "@/lib/json-ld";
import { sanityFetch } from "@/sanity/lib/live";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";
import { LiteYouTube } from "@/components/lite-youtube";
import { urlFor } from "@/sanity/lib/image";

const title = "Video";
const description =
  "I video dello Studio Dentistico Dott. Gianluca Marin: interventi, tecnologie e consigli per la salute dei tuoi denti.";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title,
    description,
    ...(await socialMeta({ title, description })),
    ...(await canonicalUrl("/video")),
  };
}

export default async function VideoPage() {
  const { data: videos } = await sanityFetch({ query: VIDEOS_QUERY });

  return (
    <main className="flex-1">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">Video</h1>
        <p className="text-muted-foreground mb-10 max-w-2xl">
          Interventi, tecnologie e consigli dallo studio.
        </p>

        {!videos?.length ? (
          <p className="text-muted-foreground">
            Nessun video pubblicato al momento. Torna a trovarci presto!
          </p>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2">
            {videos.map((video) => {
              if (!video.youtubeUrl) return null;
              const thumbnailUrl = video.thumbnail
                ? urlFor(video.thumbnail).width(640).height(360).fit("crop").url()
                : undefined;
              const jsonLd = videoObjectJsonLd({
                title: video.title ?? "Video",
                description: video.description ?? undefined,
                youtubeUrl: video.youtubeUrl,
                publishedAt: video.publishedAt ?? undefined,
                duration: video.duration ?? undefined,
                thumbnailUrl,
              });
              return (
                <article key={video._id} className="flex flex-col gap-3 [&_figure]:my-0">
                  {jsonLd && (
                    <script
                      type="application/ld+json"
                      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                    />
                  )}
                  <LiteYouTube
                    url={video.youtubeUrl}
                    thumbnailUrl={thumbnailUrl}
                    duration={video.duration ?? undefined}
                  />
                  <h2 className="text-lg font-semibold text-foreground">
                    {video.slug ? (
                      <Link href={`/video/${video.slug}`} className="hover:text-primary transition-colors">
                        {video.title}
                      </Link>
                    ) : (
                      video.title
                    )}
                  </h2>
                  {video.description && (
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  )}
                  {video.relatedService?.slug && (
                    <Link
                      href={`/servizi/${video.relatedService.slug}`}
                      className="inline-flex w-fit items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary hover:bg-secondary/80 transition-colors"
                    >
                      {video.relatedService.title}
                    </Link>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
