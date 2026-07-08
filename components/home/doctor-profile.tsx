import Image from "next/image";
import Link from "next/link";
import { Shield, Award, ArrowRight } from "lucide-react";
import { getSiteSettings } from "@/lib/settings";
import { doctorProfileFallback as fallback } from "@/lib/fallback/home";
import { urlFor } from "@/sanity/lib/image";
import { resolveIcon } from "@/components/home/icon-map";
import { FanRectangles } from "@/components/motion/fan-rectangles";
import { RevealFrame } from "@/components/motion/reveal-frame";
import type { HOME_PAGE_QUERY_RESULT } from "@/sanity.types";
import doctorImage from "@/public/images/gianluca-marin-home.jpg";

export type DoctorProfileData = NonNullable<HOME_PAGE_QUERY_RESULT>["doctorProfile"];

const fallbackIcons = [Shield, Award];

export default async function DoctorProfile({ data }: { data?: DoctorProfileData | null }) {
  const settings = await getSiteSettings();

  const paragraphs = data?.paragraphs?.length ? data.paragraphs : fallback.paragraphs;
  const highlights = data?.highlights?.length ? data.highlights : fallback.highlights;
  const sanityImage = data?.image?.asset ? data.image : null;

  return (
    <section className="py-20 lg:py-28 bg-secondary/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 relative flex justify-center">
            <FanRectangles
              rects={[
                {
                  className:
                    "absolute -bottom-4 -right-4 w-[95%] h-[95%] bg-primary rounded-3xl -z-10",
                  rotate: 3,
                  delay: 0.1,
                },
                {
                  className:
                    "absolute -top-4 -left-4 w-[90%] h-[90%] bg-sky-200/50 rounded-3xl -z-10",
                  rotate: -3,
                  delay: 0.25,
                },
              ]}
              trigger="inView"
            />

            <RevealFrame
              className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-border max-w-sm"
              trigger="inView"
            >
              {sanityImage ? (
                <Image
                  src={urlFor(sanityImage).width(800).height(1000).url()}
                  alt={sanityImage.alt ?? settings.doctor}
                  width={800}
                  height={1000}
                  className="w-full h-[500px] object-cover"
                />
              ) : (
                <Image
                  src={doctorImage}
                  alt={settings.doctor}
                  className="w-full h-[500px] object-cover"
                />
              )}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent p-6 text-primary-foreground text-center">
                <p className="text-lg font-bold font-heading">{settings.doctor}</p>
                <p className="text-xs text-sky-300">
                  {data?.roleLabel ?? fallback.roleLabel}
                </p>
              </div>
            </RevealFrame>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest">
              {data?.eyebrow ?? fallback.eyebrow}
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {data?.title ?? fallback.title}
            </h2>
            <div className="w-20 h-1 bg-sky-500 rounded-full" aria-hidden="true" />

            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={
                  index === 0
                    ? "text-base text-muted-foreground leading-relaxed"
                    : "text-sm text-muted-foreground leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {highlights.map((highlight, index) => {
                const Icon = resolveIcon(highlight.icon, fallbackIcons[index % fallbackIcons.length]);
                return (
                  <div
                    key={highlight._key}
                    className="flex items-start gap-3 bg-background p-4 rounded-xl border border-border shadow-sm"
                  >
                    <Icon className="w-6 h-6 text-sky-500 mt-1 shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-bold text-foreground">{highlight.title}</p>
                      <p className="text-xs text-muted-foreground">{highlight.subtitle}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4">
              <Link
                href={data?.ctaHref ?? fallback.ctaHref}
                className="inline-flex items-center gap-2 text-primary font-bold hover:text-sky-600 transition-colors"
              >
                {data?.ctaLabel ?? fallback.ctaLabel}
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
