import { Sparkles, Check, Clock, ArrowRight } from 'lucide-react';
import { getSiteSettings } from '@/lib/settings';
import { heroFallback as fallback } from '@/lib/fallback/home';
import { urlFor } from '@/sanity/lib/image';
import { resolveIcon } from '@/components/home/icon-map';
import { resolveCtas, type CtaStyle } from '@/lib/cta';
import { FanRectangles } from '@/components/motion/fan-rectangles';
import { RevealFrame } from '@/components/motion/reveal-frame';
import { HeroCarousel, type HeroSlide } from '@/components/home/hero-carousel';
import type { HOME_PAGE_QUERY_RESULT } from '@/sanity.types';
import doctorImage from '@/public/images/gianluca-marin-home.jpg';

export type HeroData = NonNullable<HOME_PAGE_QUERY_RESULT>['hero'];

const ctaStyleClasses: Record<CtaStyle, string> = {
  solid: 'bg-primary hover:bg-primary/95 text-primary-foreground shadow-lg hover:shadow-xl',
  outline: 'border-2 border-primary/20 hover:border-primary text-primary',
  soft: 'bg-sky-100 hover:bg-sky-200 text-primary',
  ghost: 'text-primary hover:text-sky-600',
};

export default async function Hero({ data }: { data?: HeroData | null }) {
  const settings = await getSiteSettings();

  const features = data?.features?.length ? data.features : fallback.features;
  const ctas = resolveCtas(data?.ctas?.length ? data.ctas : fallback.ctas, settings.phoneHref);
  const experienceCard = data?.experienceCard ?? fallback.experienceCard;
  const sanityImages = data?.images?.filter((image) => image.asset) ?? [];
  const slides: HeroSlide[] = sanityImages.length
    ? sanityImages.map((image) => ({
        src: urlFor(image).width(1200).height(900).url(),
        alt: image.alt ?? settings.doctor,
      }))
    : [{ src: doctorImage, alt: settings.doctor }];

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Motivo di sfondo a tre cerchi (logo) */}
      <div
        className="absolute right-0 top-1/4 opacity-10 pointer-events-none transform translate-x-1/3"
        aria-hidden="true"
      >
        <svg
          className="w-[600px] h-[600px] text-primary"
          viewBox="0 0 300 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="100"
            cy="150"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
          <circle
            cx="170"
            cy="120"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
          <circle
            cx="210"
            cy="180"
            r="80"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="10 5"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-sky-100 text-primary px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider w-fit">
              <Sparkles
                className="w-3.5 h-3.5 text-sky-600"
                aria-hidden="true"
              />
              {data?.badge ?? fallback.badge}
            </div>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-none">
              {data?.title ?? fallback.title} <br />
              <span className="text-primary">
                {data?.titleHighlight ?? fallback.titleHighlight}
              </span>{' '}
              {data?.titleSuffix ?? fallback.titleSuffix}
            </h1>

            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
              {data?.description ?? fallback.description}
            </p>

            <div className="grid grid-cols-2 gap-4 my-2">
              {features.map((feature, index) => {
                const Icon = resolveIcon(feature.icon, index === 0 ? Check : Clock);
                return (
                  <div key={feature._key} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="text-sm font-semibold text-foreground">
                      {feature.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-4 max-w-95 w-full">
              {ctas.map((cta) => {
                const Icon = resolveIcon(cta.icon, ArrowRight);
                return (
                  <a
                    key={cta.key}
                    href={cta.href}
                    target={cta.newTab ? '_blank' : undefined}
                    rel={cta.newTab ? 'noopener noreferrer' : undefined}
                    className={`${ctaStyleClasses[cta.style]} px-8 py-4 rounded-xl text-base font-bold transition-all flex items-center justify-center gap-2 w-full`}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    {cta.label}
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 relative flex justify-center items-center">
            <FanRectangles
              rects={[
                {
                  className:
                    'absolute -bottom-4 -left-4 w-[90%] h-[90%] bg-sky-100/80 rounded-3xl -z-10 border border-sky-200',
                  rotate: -3,
                  delay: 0.1,
                },
                {
                  className:
                    'absolute -top-4 -right-4 w-[85%] h-[85%] bg-primary/10 rounded-3xl -z-10',
                  rotate: 6,
                  delay: 0.25,
                },
              ]}
            />

            <RevealFrame className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-border max-w-md md:max-w-full">
              <HeroCarousel slides={slides} />
              <div className="absolute bottom-6 left-6 bg-background/95 backdrop-blur-md p-4 rounded-xl shadow-lg border border-border flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-sky-500 text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {experienceCard.value ?? fallback.experienceCard.value}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">
                    {experienceCard.label ?? fallback.experienceCard.label}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {experienceCard.sublabel ?? fallback.experienceCard.sublabel}
                  </p>
                </div>
              </div>
            </RevealFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
