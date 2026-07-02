import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import casoCaricoImmediato from "@/public/images/caso-carico-immediato.png";
import casoMininvasivo from "@/public/images/caso-mininvasivo.png";
import casoAllOn4 from "@/public/images/gianluca-marin-home.jpg";

type ClinicalCase = {
  image: StaticImageData;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  href: string;
};

const cases: ClinicalCase[] = [
  {
    image: casoCaricoImmediato,
    imageAlt: "Caso clinico arcata completa",
    badge: "Carico Immediato",
    title: "Riabilitazione Arcata Superiore",
    description:
      "Paziente di 54 anni con grave parodontite. Posizionamento di 6 impianti e protesi fissa in 24 ore.",
    href: "/interventi-realizzati",
  },
  {
    image: casoMininvasivo,
    imageAlt: "Caso clinico dente singolo",
    badge: "Mininvasivo",
    title: "Impianto Singolo in Zona Estetica",
    description:
      "Paziente di 29 anni con perdita dell'incisivo centrale. Chirurgia computer-guidata senza punti.",
    href: "/interventi-realizzati",
  },
  {
    image: casoAllOn4,
    imageAlt: "Caso clinico All on 4",
    badge: "All-on-4",
    title: "Riabilitazione Totale Mandibolare",
    description:
      "Paziente di 67 anni portatore di protesi mobile instabile. Protesi fissa ancorata su 4 impianti.",
    href: "/interventi-realizzati",
  },
];

export default function ClinicalCases() {
  return (
    <section className="py-20 lg:py-28 bg-background relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-widest block mb-2">
              Risultati Reali
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              Interventi Realizzati &amp; Casi Clinici
            </h2>
            <div className="w-20 h-1 bg-sky-500 mt-4 rounded-full" aria-hidden="true" />
          </div>
          <p className="text-sm text-muted-foreground max-w-md">
            Presentiamo la documentazione fotografica e clinica di casi reali
            trattati presso la nostra clinica a Conegliano. Risultati funzionali
            ed estetici duraturi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cases.map((clinicalCase) => (
            <Link
              key={clinicalCase.title}
              href={clinicalCase.href}
              className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 block"
            >
              <div className="relative h-56 bg-muted overflow-hidden">
                <Image
                  src={clinicalCase.image}
                  alt={clinicalCase.imageAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  {clinicalCase.badge}
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  {clinicalCase.title}
                </h3>
                <p className="text-xs text-muted-foreground mb-4">
                  {clinicalCase.description}
                </p>
                <div className="flex justify-between items-center text-xs font-bold text-primary border-t border-border pt-4">
                  <span>VEDI DETTAGLI CLINICI</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
