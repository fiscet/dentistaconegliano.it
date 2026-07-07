import type { Metadata } from "next";
import Image from "next/image";
import { CircleCheck, User } from "lucide-react";
import { resolveIcon } from "@/components/home/icon-map";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/lib/settings";
import { sanityFetch } from "@/sanity/lib/live";
import { STUDIO_PAGE_QUERY, STAFF_QUERY } from "@/sanity/lib/queries";
import type { STAFF_QUERY_RESULT } from "@/sanity.types";
import {
  heroFallback,
  profileFallback,
  teamFallback,
  studioFallback,
} from "@/lib/fallback/studio";

const fallbackTitle = "Lo Studio e il Team | Studio Dentistico Dott. Gianluca Marin";
const fallbackDescription =
  "Conosci lo Studio Dentistico Dott. Gianluca Marin a Conegliano: il team di odontoiatri specializzati, la filosofia di cura e le tecnologie dello studio.";

export async function generateMetadata(): Promise<Metadata> {
  const { data: studio } = await sanityFetch({ query: STUDIO_PAGE_QUERY });
  return {
    title: { absolute: studio?.seoTitle ?? fallbackTitle },
    description: studio?.seoDescription ?? fallbackDescription,
  };
}

export default async function StudioPage() {
  const [{ data: studio }, { data: staff }, settings] = await Promise.all([
    sanityFetch({ query: STUDIO_PAGE_QUERY }),
    sanityFetch({ query: STAFF_QUERY }),
    getSiteSettings(),
  ]);

  const hero = studio?.hero;
  const heroHighlights = hero?.highlights?.length ? hero.highlights : heroFallback.highlights;
  const profile = studio?.profile;
  const profileCards = profile?.cards?.length ? profile.cards : profileFallback.cards;
  const team = studio?.team;
  const studioSection = studio?.studio;
  const studioFeatures = studioSection?.features?.length
    ? studioSection.features
    : studioFallback.features;

  const members = staff ?? [];
  const medici = members.filter((m) => (m.category ?? "medico") === "medico");
  const altriStaff = members.filter((m) => m.category === "staff");

  return (
    <main className="flex-1">
      {/* HERO */}
      <section className="bg-linear-to-br from-background via-secondary/30 to-background py-16 lg:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                {hero?.eyebrow ?? heroFallback.eyebrow}
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight leading-tight">
                {hero?.title ?? heroFallback.title}
              </h1>
              <div className="w-20 h-1 bg-sky-500 rounded-full" aria-hidden="true" />
              <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
                {hero?.description ?? heroFallback.description}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 mt-2">
                {heroHighlights.map((h) => (
                  <div key={h} className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center text-primary shrink-0">
                      <CircleCheck className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-border max-w-sm">
                <Image
                  src={
                    hero?.image?.asset
                      ? urlFor(hero.image).width(800).height(1000).url()
                      : heroFallback.staticImage
                  }
                  alt={hero?.image?.alt ?? heroFallback.imageAlt}
                  width={800}
                  height={1000}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    Direzione sanitaria
                  </p>
                  <p className="text-base font-extrabold text-foreground">{settings.doctor}</p>
                  <p className="text-xs text-primary font-semibold">
                    {hero?.imageRole ?? heroFallback.imageRole}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROFILO DOTTORE */}
      {profile?.enabled !== false && (
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
                {profile?.eyebrow ?? profileFallback.eyebrow}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                {profile?.title ?? profileFallback.title}
              </h2>
              <div className="w-20 h-1 bg-sky-500 mx-auto mt-4 rounded-full" aria-hidden="true" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {profileCards.map((card) => {
                const Icon = resolveIcon(card.icon, CircleCheck);
                return (
                  <div
                    key={card._key}
                    className="bg-card border border-border p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow flex flex-col gap-4"
                  >
                    <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center text-primary mb-2">
                      <Icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading text-lg font-bold text-foreground">{card.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{card.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* TEAM */}
      {team?.enabled !== false && members.length > 0 && (
        <section className="py-20 lg:py-28 bg-secondary/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mb-16">
              <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
                {team?.eyebrow ?? teamFallback.eyebrow}
              </span>
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                {team?.title ?? teamFallback.title}
              </h2>
              <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
              {(team?.description ?? teamFallback.description) && (
                <p className="text-base text-muted-foreground mt-4 max-w-2xl">
                  {team?.description ?? teamFallback.description}
                </p>
              )}
            </div>

            <TeamGrid members={medici} />
            {altriStaff.length > 0 && (
              <div className="mt-16">
                <h3 className="font-heading text-xl font-bold text-foreground mb-8">
                  Staff e assistenza
                </h3>
                <TeamGrid members={altriStaff} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* AMBIENTE STUDIO */}
      {studioSection?.enabled !== false && (
        <section className="py-20 lg:py-28 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-5 relative flex justify-center">
                <div
                  className="absolute -bottom-4 -right-4 w-[95%] h-[95%] bg-sky-100 rounded-3xl rotate-3 -z-10 border border-sky-200"
                  aria-hidden="true"
                />
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-border max-w-sm">
                  <Image
                    src={
                      studioSection?.image?.asset
                        ? urlFor(studioSection.image).width(800).height(840).url()
                        : studioFallback.staticImage
                    }
                    alt={studioSection?.image?.alt ?? studioFallback.imageAlt}
                    width={800}
                    height={840}
                    className="w-full h-105 object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col gap-6">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
                  {studioSection?.eyebrow ?? studioFallback.eyebrow}
                </span>
                <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                  {studioSection?.title ?? studioFallback.title}
                </h2>
                <div className="w-20 h-1 bg-sky-500 rounded-full" aria-hidden="true" />
                <p className="text-base text-muted-foreground leading-relaxed">
                  {studioSection?.description ?? studioFallback.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {studioFeatures.map((feature) => {
                    const Icon = resolveIcon(feature.icon, CircleCheck);
                    return (
                      <div
                        key={feature._key}
                        className="flex items-start gap-3 bg-secondary/40 p-4 rounded-xl border border-border/60"
                      >
                        <Icon className="w-6 h-6 text-sky-500 mt-1 shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-foreground">{feature.title}</p>
                          <p className="text-xs text-muted-foreground">{feature.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

type Member = STAFF_QUERY_RESULT[number];

function TeamGrid({ members }: { members: Member[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {members.map((m) => (
        <article
          key={m._id}
          className="bg-background border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
        >
          <div className="aspect-4/5 bg-muted overflow-hidden">
            {m.photo?.asset ? (
              <Image
                src={urlFor(m.photo).width(600).height(750).url()}
                alt={m.photo.alt ?? m.name ?? ""}
                width={600}
                height={750}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <User className="w-12 h-12" aria-hidden="true" />
              </div>
            )}
          </div>
          <div className="p-5 flex flex-col gap-1">
            <h3 className="font-heading text-lg font-bold text-foreground">{m.name}</h3>
            {m.role && <p className="text-xs text-primary font-semibold">{m.role}</p>}
            {m.excerpt && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{m.excerpt}</p>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
