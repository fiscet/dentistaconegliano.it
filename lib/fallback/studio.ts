import type { StaticImageData } from "next/image";
import doctorImage from "@/public/images/gianluca-marin-home.jpg";
import studioImage from "@/public/images/caso-mininvasivo.png";

// Contenuti di fallback della pagina Lo Studio, usati quando il singleton
// studioPage su Sanity manca o un campo è vuoto. I dati del profilo del
// dottore derivano dalla sua biografia reale.

export const heroFallback: {
  eyebrow: string;
  title: string;
  description: string;
  highlights: string[];
  staticImage: StaticImageData;
  imageAlt: string;
  imageRole: string;
} = {
  eyebrow: "Chi siamo",
  title: "Lo Studio, il team e la filosofia di cura su misura",
  description:
    "Un ambiente clinico moderno, protocolli d'avanguardia e una squadra multidisciplinare al tuo servizio, per un'odontoiatria precisa, serena e altamente predicibile.",
  highlights: ["Studio fondato nel 2004 a Conegliano", "Team multidisciplinare specializzato"],
  staticImage: doctorImage,
  imageAlt: "Dott. Gianluca Marin",
  imageRole: "Direttore Sanitario · Implantologo",
};

export const profileFallback = {
  eyebrow: "Percorso clinico e formativo",
  title: "Il profilo professionale del Dott. Gianluca Marin",
  cards: [
    {
      _key: "p1",
      icon: "graduation-cap",
      title: "Laurea e fondazione dello studio",
      text: "Laureato in Odontoiatria e Protesi Dentaria a Padova nel 2001, ha fondato il proprio studio a Conegliano nel 2004.",
    },
    {
      _key: "p2",
      icon: "award",
      title: "Perfezionamenti e Master",
      text: "Perfezionamento in Implantologia Osteointegrata (San Raffaele, 2003) e Master in Implantologia Zigomatica (Università di Pisa, 2021).",
    },
    {
      _key: "p3",
      icon: "file-text",
      title: "Attività accademica",
      text: "Docente di Sedazione Cosciente all'Università Cattolica di Roma.",
    },
    {
      _key: "p4",
      icon: "shield",
      title: "Società scientifiche",
      text: "Socio fondatore dell'Associazione Italiana di Anestesia in Odontoiatria, le cui linee guida sono accreditate al Ministero della Salute.",
    },
  ],
};

export const teamFallback = {
  eyebrow: "La nostra squadra",
  title: "Un team multidisciplinare per accompagnarti in ogni fase del trattamento",
  description:
    "Odontoiatri specializzati, igieniste e personale di assistenza lavorano insieme per offrirti un percorso di cura chiaro e sereno.",
};

export const studioFallback: {
  eyebrow: string;
  title: string;
  description: string;
  staticImage: StaticImageData;
  imageAlt: string;
  features: { _key: string; icon: string; title: string; text: string }[];
} = {
  eyebrow: "Ambiente clinico e tecnologia",
  title: "Uno studio pensato per farti sentire tranquillo, sicuro e seguito",
  description:
    "Dall'accoglienza alle sale operative, ogni ambiente è organizzato per rendere il percorso di cura chiaro, ordinato e rassicurante.",
  staticImage: studioImage,
  imageAlt: "Ambienti dello Studio Dentistico Marin",
  features: [
    {
      _key: "s1",
      icon: "monitor",
      title: "Diagnostica digitale 3D",
      text: "Analisi tridimensionale per una pianificazione precisa dei trattamenti.",
    },
    {
      _key: "s2",
      icon: "shield",
      title: "Sterilizzazione certificata",
      text: "Protocolli rigorosi per la sicurezza di ogni paziente.",
    },
    {
      _key: "s3",
      icon: "volume-2",
      title: "Sedazione cosciente",
      text: "Per affrontare l'intervento in tranquillità, senza ansia.",
    },
    {
      _key: "s4",
      icon: "heart-pulse",
      title: "Percorsi personalizzati",
      text: "Un piano di cura costruito sulle tue esigenze cliniche.",
    },
  ],
};
