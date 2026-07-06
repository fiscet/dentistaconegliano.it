import type { StaticImageData } from "next/image";
import casoCaricoImmediato from "@/public/images/caso-carico-immediato.png";
import casoMininvasivo from "@/public/images/caso-mininvasivo.png";
import casoAllOn4 from "@/public/images/gianluca-marin-home.jpg";

// Contenuti di fallback della home: usati quando il documento homePage su
// Sanity manca o un campo è vuoto, così il sito non mostra mai sezioni vuote.
// Rispecchiano il contenuto originale hardcoded dei componenti.

export const heroFallback = {
  badge: "Specialisti in Implantologia Dentale a Conegliano",
  title: "Ritrova il tuo sorriso.",
  titleHighlight: "In sole 24 ore",
  titleSuffix: "con il carico immediato.",
  description:
    "Da oltre 20 anni, lo Studio Dentistico Marin restituisce sicurezza e funzionalità masticatoria con impianti dentali di altissima qualità svizzera e svedese. Procedure mininvasive e indolori.",
  features: [
    { _key: "f1", label: "Senza dolore (sedazione)", icon: "check" },
    { _key: "f2", label: "Denti fissi in un giorno", icon: "clock" },
  ],
  ctaPrimaryLabel: "Consulenza Personalizzata",
  ctaSecondaryLabel: "Chiama Ora",
  experienceCard: {
    value: "20+",
    label: "Anni di Attività",
    sublabel: "Esperienza Clinica Certificata",
  },
};

export const statsFallback = [
  { _key: "s1", value: "99.4%", label: "Percentuale di Successo degli Impianti" },
  { _key: "s2", value: "12.000+", label: "Impianti Inseriti con Successo" },
  { _key: "s3", value: "24 Ore", label: "Tempo medio per i Denti Fissi" },
  { _key: "s4", value: "Zero", label: "Dolore grazie alla Sedazione Cosciente" },
];

export const treatmentsFallback = {
  eyebrow: "Eccellenza in Chirurgia Orale",
  title: "Tecniche Implantari Avanzate e Mininvasive",
  description:
    "Utilizziamo protocolli moderni per ridurre al minimo i tempi di guarigione, il gonfiore e il fastidio post-operatorio.",
  items: [
    {
      _key: "t1",
      icon: "zap",
      title: "Carico Immediato (Denti in 24h)",
      description:
        "Consente di posizionare gli impianti e la protesi fissa provvisoria nella stessa seduta o entro il giorno successivo. Masticazione e sorriso ripristinati subito.",
      href: "/servizi/impianti-carico-immediato",
    },
    {
      _key: "t2",
      icon: "layers",
      title: "All-on-4 & All-on-6",
      description:
        "Soluzioni ideali per intere arcate prive di denti o con denti gravemente compromessi. Con soli 4 o 6 impianti si ancora stabilmente una protesi fissa completa.",
      href: "/servizi/all-on-4",
    },
    {
      _key: "t3",
      icon: "monitor",
      title: "Implantologia Computer Guidata",
      description:
        "Pianificazione 3D al computer che permette di inserire gli impianti con precisione millimetrica senza tagliare la gengiva e senza punti di sutura.",
      href: "/servizi/implantologia-computer-guidata",
    },
  ],
};

export const doctorProfileFallback = {
  eyebrow: "Chi ti curerà",
  title: "L'esperienza clinica e accademica del Dott. Gianluca Marin",
  roleLabel: "Direttore Sanitario e Chirurgo Implantologo",
  paragraphs: [
    "Laureato con lode e specializzato in chirurgia orale avanzata, il Dott. Gianluca Marin vanta oltre 20 anni di attività professionale e migliaia di interventi di implantologia a carico immediato eseguiti con successo.",
    "Socio attivo delle più importanti società scientifiche di implantologia italiane ed europee, perfeziona costantemente le metodiche mininvasive per garantire il massimo comfort ai pazienti.",
  ],
  highlights: [
    {
      _key: "h1",
      icon: "shield",
      title: "Formazione Internazionale",
      subtitle: "Master in Svezia e Stati Uniti",
    },
    {
      _key: "h2",
      icon: "award",
      title: "Certificazioni Nobel Biocare",
      subtitle: "Partner ufficiale implantologia premium",
    },
  ],
  ctaLabel: "Leggi la biografia e scopri il team",
  ctaHref: "/studio",
};

export const clinicalCasesFallback = {
  eyebrow: "Risultati Reali",
  title: "Interventi Realizzati & Casi Clinici",
  description:
    "Presentiamo la documentazione fotografica e clinica di casi reali trattati presso la nostra clinica a Conegliano. Risultati funzionali ed estetici duraturi.",
};

export type FallbackClinicalCase = {
  _key: string;
  staticImage: StaticImageData;
  imageAlt: string;
  badge: string;
  title: string;
  description: string;
  href: string;
};

export const clinicalCasesItemsFallback: FallbackClinicalCase[] = [
  {
    _key: "c1",
    staticImage: casoCaricoImmediato,
    imageAlt: "Caso clinico arcata completa",
    badge: "Carico Immediato",
    title: "Riabilitazione Arcata Superiore",
    description:
      "Paziente di 54 anni con grave parodontite. Posizionamento di 6 impianti e protesi fissa in 24 ore.",
    href: "/interventi-realizzati",
  },
  {
    _key: "c2",
    staticImage: casoMininvasivo,
    imageAlt: "Caso clinico dente singolo",
    badge: "Mininvasivo",
    title: "Impianto Singolo in Zona Estetica",
    description:
      "Paziente di 29 anni con perdita dell'incisivo centrale. Chirurgia computer-guidata senza punti.",
    href: "/interventi-realizzati",
  },
  {
    _key: "c3",
    staticImage: casoAllOn4,
    imageAlt: "Caso clinico All on 4",
    badge: "All-on-4",
    title: "Riabilitazione Totale Mandibolare",
    description:
      "Paziente di 67 anni portatore di protesi mobile instabile. Protesi fissa ancorata su 4 impianti.",
    href: "/interventi-realizzati",
  },
];

export const contactFallback = {
  eyebrow: "Parla con noi",
  title: "Richiedi una Consulenza Personalizzata",
  description:
    "Siamo qui per darti tutte le risposte. Compila il modulo o chiamaci direttamente per fissare un appuntamento diagnostico.",
  formTitle: "Invia una richiesta immediata",
};
