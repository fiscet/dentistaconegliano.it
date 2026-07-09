import type { Metadata } from 'next';
import Hero from '@/components/home/hero';
import StatsBar from '@/components/home/stats-bar';
import Treatments from '@/components/home/treatments';
import DoctorProfile from '@/components/home/doctor-profile';
import ClinicalCases from '@/components/home/clinical-cases';
import ContactSection from '@/components/home/contact-section';
import { getSiteSettings } from '@/lib/settings';
import { socialMeta, ogImageUrl, canonicalUrl, robotsMeta } from '@/lib/seo';
import { dentistJsonLd } from '@/lib/json-ld';
import { sanityFetch } from '@/sanity/lib/live';
import {
  HOME_PAGE_QUERY,
  HOME_SERVICES_QUERY,
  HOME_CASES_QUERY
} from '@/sanity/lib/queries';

const fallbackTitle =
  'Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin';
const fallbackDescription =
  'Impianti dentali a carico immediato a Conegliano: denti fissi in 24 ore, All-on-4, chirurgia computer guidata e sedazione cosciente. Consulenza personalizzata con il Dott. Gianluca Marin.';

export async function generateMetadata(): Promise<Metadata> {
  const { data: home } = await sanityFetch({ query: HOME_PAGE_QUERY });

  const title = home?.seoTitle ?? fallbackTitle;
  const description = home?.seoDescription ?? fallbackDescription;
  return {
    title: { absolute: title },
    description,
    ...(await socialMeta({ title, description, image: ogImageUrl(home?.seoImage) })),
    ...(await canonicalUrl('/')),
    ...robotsMeta(home?.noIndex)
  };
}

export default async function Home() {
  const [settings, { data: home }, { data: homeServices }, { data: homeCases }] =
    await Promise.all([
      getSiteSettings(),
      sanityFetch({ query: HOME_PAGE_QUERY }),
      sanityFetch({ query: HOME_SERVICES_QUERY }),
      sanityFetch({ query: HOME_CASES_QUERY })
    ]);

  const jsonLd = dentistJsonLd(settings);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {home?.hero?.enabled !== false && <Hero data={home?.hero} />}
      {home?.stats?.enabled !== false && <StatsBar data={home?.stats} />}
      {home?.treatments?.enabled !== false && (
        <Treatments header={home?.treatments} services={homeServices} />
      )}
      {home?.doctorProfile?.enabled !== false && (
        <DoctorProfile data={home?.doctorProfile} />
      )}
      {home?.clinicalCases?.enabled !== false && (
        <ClinicalCases header={home?.clinicalCases} cases={homeCases} />
      )}
      {home?.contact?.enabled !== false && (
        <ContactSection data={home?.contact} />
      )}
    </main>
  );
}
