import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";

const team = [
  {
    name: "Dott. Mario Rossi",
    role: "Direttore Sanitario · Implantologo",
    image: "/images/dottore.png",
    bio: "Specializzato in chirurgia implantare e riabilitazioni complesse, con oltre 20 anni di esperienza.",
  },
  {
    name: "D.ssa Laura Bianchi",
    role: "Odontoiatra · Protesi ed estetica",
    image: "/images/dottoressa.png",
    bio: "Dedicata all'estetica del sorriso e alla protesi su impianti, per risultati naturali e armoniosi.",
  },
];

export default function Team() {
  return (
    <section className="bg-muted py-20">
      <div className="container-page">
        <SectionHeading
          eyebrow="Chi siamo"
          title="Il team che si prende cura del tuo sorriso"
          description="Due professionisti con oltre 20 anni di esperienza in campo odontoiatrico, al tuo servizio per valorizzare la tua salute e la tua bellezza."
        />

        <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
          {team.map((member) => (
            <article
              key={member.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={member.image}
                  alt={`${member.name}, ${member.role}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 400px"
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm font-medium text-brand">
                  {member.role}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
