import type { Metadata } from "next";
import { socialMeta, canonicalUrl } from "@/lib/seo";
import { sanityFetch } from "@/sanity/lib/live";
import { VIDEOS_QUERY } from "@/sanity/lib/queries";

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

function youtubeId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/,
  );
  return match?.[1] ?? null;
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
              const id = video.youtubeUrl ? youtubeId(video.youtubeUrl) : null;
              if (!id) return null;
              return (
                <article key={video._id} className="flex flex-col gap-3">
                  <div className="aspect-video rounded-xl overflow-hidden border border-border shadow-sm">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${id}`}
                      title={video.title ?? "Video"}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      loading="lazy"
                      className="w-full h-full"
                    />
                  </div>
                  <h2 className="text-lg font-semibold text-foreground">{video.title}</h2>
                  {video.description && (
                    <p className="text-sm text-muted-foreground">{video.description}</p>
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
