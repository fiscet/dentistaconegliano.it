import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import StatsBar from "@/components/home/stats-bar";
import Treatments from "@/components/home/treatments";
import DoctorProfile from "@/components/home/doctor-profile";
import ClinicalCases from "@/components/home/clinical-cases";
import ContactSection from "@/components/home/contact-section";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title:
    "Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin",
  description:
    "Impianti dentali a carico immediato a Conegliano: denti fissi in 24 ore, All-on-4, chirurgia computer guidata e sedazione cosciente. Consulenza gratuita con il Dott. Gianluca Marin.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "MedicalBusiness"],
  name: site.name,
  url: site.url,
  telephone: "+390438123456",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCode,
    addressLocality: site.address.city,
    addressRegion: site.address.province,
    addressCountry: "IT",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "13:00",
    },
  ],
  founder: {
    "@type": "Person",
    name: site.doctor,
    jobTitle: "Direttore Sanitario e Chirurgo Implantologo",
  },
  medicalSpecialty: "Dentistry",
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <StatsBar />
      <Treatments />
      <DoctorProfile />
      <ClinicalCases />
      <ContactSection />
    </main>
  );
}
