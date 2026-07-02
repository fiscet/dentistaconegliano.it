import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import BeforeAfter from "@/components/home/BeforeAfter";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import CtaBanner from "@/components/CtaBanner";
import SectionHeading from "@/components/SectionHeading";
import Faq from "@/components/Faq";
import { faqs } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <BeforeAfter />
      <WhyChooseUs />
      <Team />
      <Testimonials />

      <section className="bg-muted py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Domande frequenti"
            title="Le risposte alle tue domande"
            description="Tutto quello che c'è da sapere sull'implantologia dentale. Se hai altri dubbi, siamo a tua disposizione."
          />
          <div className="mt-12">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
