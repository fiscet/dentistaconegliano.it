// Seed del singleton homePage: carica le immagini attuali di public/images
// come asset Sanity e crea/sostituisce il documento pubblicato con il
// contenuto oggi hardcoded nei componenti della home.
//
// Uso: node --env-file=.env.local scripts/seed-home.mjs [dataset...]
// Senza argomenti popola development e production.
import { createClient } from "@sanity/client";
import { createReadStream } from "node:fs";
import path from "node:path";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wqblxiv7";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN mancante (usa --env-file=.env.local)");
  process.exit(1);
}

const datasets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["development", "production"];

const imagesDir = path.resolve("public/images");

async function uploadImage(client, filename) {
  const asset = await client.assets.upload(
    "image",
    createReadStream(path.join(imagesDir, filename)),
    { filename },
  );
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

function withAlt(image, alt) {
  return { ...image, alt };
}

async function seed(dataset) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-07-01",
    token,
    useCdn: false,
  });

  console.log(`[${dataset}] carico immagini...`);
  const [doctor, casoCarico, casoMininvasivo] = await Promise.all([
    uploadImage(client, "gianluca-marin-home.jpg"),
    uploadImage(client, "caso-carico-immediato.png"),
    uploadImage(client, "caso-mininvasivo.png"),
  ]);

  const doc = {
    _id: "homePage",
    _type: "homePage",
    hero: {
      enabled: true,
      badge: "Specialisti in Implantologia Dentale a Conegliano",
      title: "Ritrova il tuo sorriso.",
      titleHighlight: "In sole 24 ore",
      titleSuffix: "con il carico immediato.",
      description:
        "Da oltre 20 anni, lo Studio Dentistico Marin restituisce sicurezza e funzionalità masticatoria con impianti dentali di altissima qualità svizzera e svedese. Procedure mininvasive e indolori.",
      features: [
        { _key: "f1", _type: "feature", label: "Senza dolore (sedazione)", icon: "check" },
        { _key: "f2", _type: "feature", label: "Denti fissi in un giorno", icon: "clock" },
      ],
      ctaPrimaryLabel: "Consulenza Personalizzata",
      ctaSecondaryLabel: "Chiama Ora",
      image: withAlt(doctor, "Dott. Gianluca Marin"),
      experienceCard: {
        value: "20+",
        label: "Anni di Attività",
        sublabel: "Esperienza Clinica Certificata",
      },
    },
    stats: {
      enabled: true,
      items: [
        { _key: "s1", _type: "stat", value: "99.4%", label: "Percentuale di Successo degli Impianti" },
        { _key: "s2", _type: "stat", value: "12.000+", label: "Impianti Inseriti con Successo" },
        { _key: "s3", _type: "stat", value: "24 Ore", label: "Tempo medio per i Denti Fissi" },
        { _key: "s4", _type: "stat", value: "Zero", label: "Dolore grazie alla Sedazione Cosciente" },
      ],
    },
    treatments: {
      enabled: true,
      eyebrow: "Eccellenza in Chirurgia Orale",
      title: "Tecniche Implantari Avanzate e Mininvasive",
      description:
        "Utilizziamo protocolli moderni per ridurre al minimo i tempi di guarigione, il gonfiore e il fastidio post-operatorio.",
      items: [
        {
          _key: "t1",
          _type: "treatment",
          icon: "zap",
          title: "Carico Immediato (Denti in 24h)",
          description:
            "Consente di posizionare gli impianti e la protesi fissa provvisoria nella stessa seduta o entro il giorno successivo. Masticazione e sorriso ripristinati subito.",
          href: "/impianti-carico-immediato",
        },
        {
          _key: "t2",
          _type: "treatment",
          icon: "layers",
          title: "All-on-4 & All-on-6",
          description:
            "Soluzioni ideali per intere arcate prive di denti o con denti gravemente compromessi. Con soli 4 o 6 impianti si ancora stabilmente una protesi fissa completa.",
          href: "/all-on-4",
        },
        {
          _key: "t3",
          _type: "treatment",
          icon: "monitor",
          title: "Implantologia Computer Guidata",
          description:
            "Pianificazione 3D al computer che permette di inserire gli impianti con precisione millimetrica senza tagliare la gengiva e senza punti di sutura.",
          href: "/implantologia-dentale-conegliano",
        },
      ],
    },
    doctorProfile: {
      enabled: true,
      eyebrow: "Chi ti curerà",
      title: "L'esperienza clinica e accademica del Dott. Gianluca Marin",
      roleLabel: "Direttore Sanitario e Chirurgo Implantologo",
      paragraphs: [
        "Laureato con lode e specializzato in chirurgia orale avanzata, il Dott. Gianluca Marin vanta oltre 20 anni di attività professionale e migliaia di interventi di implantologia a carico immediato eseguiti con successo.",
        "Socio attivo delle più importanti società scientifiche di implantologia italiane ed europee, perfeziona costantemente le metodiche mininvasive per garantire il massimo comfort ai pazienti.",
      ],
      image: withAlt(doctor, "Dott. Gianluca Marin"),
      highlights: [
        {
          _key: "h1",
          _type: "highlight",
          icon: "shield",
          title: "Formazione Internazionale",
          subtitle: "Master in Svezia e Stati Uniti",
        },
        {
          _key: "h2",
          _type: "highlight",
          icon: "award",
          title: "Certificazioni Nobel Biocare",
          subtitle: "Partner ufficiale implantologia premium",
        },
      ],
      ctaLabel: "Leggi la biografia e scopri il team",
      ctaHref: "/studio",
    },
    clinicalCases: {
      enabled: true,
      eyebrow: "Risultati Reali",
      title: "Interventi Realizzati & Casi Clinici",
      description:
        "Presentiamo la documentazione fotografica e clinica di casi reali trattati presso la nostra clinica a Conegliano. Risultati funzionali ed estetici duraturi.",
      items: [
        {
          _key: "c1",
          _type: "clinicalCase",
          image: withAlt(casoCarico, "Caso clinico arcata completa"),
          badge: "Carico Immediato",
          title: "Riabilitazione Arcata Superiore",
          description:
            "Paziente di 54 anni con grave parodontite. Posizionamento di 6 impianti e protesi fissa in 24 ore.",
          href: "/interventi-realizzati",
        },
        {
          _key: "c2",
          _type: "clinicalCase",
          image: withAlt(casoMininvasivo, "Caso clinico dente singolo"),
          badge: "Mininvasivo",
          title: "Impianto Singolo in Zona Estetica",
          description:
            "Paziente di 29 anni con perdita dell'incisivo centrale. Chirurgia computer-guidata senza punti.",
          href: "/interventi-realizzati",
        },
        {
          _key: "c3",
          _type: "clinicalCase",
          image: withAlt(doctor, "Caso clinico All on 4"),
          badge: "All-on-4",
          title: "Riabilitazione Totale Mandibolare",
          description:
            "Paziente di 67 anni portatore di protesi mobile instabile. Protesi fissa ancorata su 4 impianti.",
          href: "/interventi-realizzati",
        },
      ],
    },
    contact: {
      enabled: true,
      eyebrow: "Parla con noi",
      title: "Richiedi una Consulenza Personalizzata",
      description:
        "Siamo qui per darti tutte le risposte. Compila il modulo o chiamaci direttamente per fissare un appuntamento diagnostico.",
      formTitle: "Invia una richiesta immediata",
    },
    seoTitle:
      "Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin",
    seoDescription:
      "Impianti dentali a carico immediato a Conegliano: denti fissi in 24 ore, All-on-4, chirurgia computer guidata e sedazione cosciente. Consulenza personalizzata con il Dott. Gianluca Marin.",
  };

  await client.createOrReplace(doc);
  console.log(`[${dataset}] documento homePage creato e pubblicato.`);
}

for (const dataset of datasets) {
  await seed(dataset);
}
