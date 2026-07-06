// Seed dei documenti "service": crea/sostituisce i 3 trattamenti oggi presenti
// nella sezione Trattamenti della home come veri documenti Servizio, con flag
// "Mostra in home" attivo. I prezzi NON vengono impostati (dati sensibili):
// restano "su preventivo" finché non li compili nello Studio.
//
// Uso: node --env-file=.env.local scripts/seed-services.mjs [dataset...]
// Senza argomenti popola development e production.
import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wqblxiv7";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!token) {
  console.error("SANITY_API_WRITE_TOKEN mancante (usa --env-file=.env.local)");
  process.exit(1);
}

const datasets = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ["development", "production"];

// Costruisce un body blockContent minimo a partire da uno o più paragrafi.
function body(...paragraphs) {
  return paragraphs.map((text, i) => ({
    _type: "block",
    _key: `b${i + 1}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `s${i + 1}`, text, marks: [] }],
  }));
}

const services = [
  {
    _id: "service-carico-immediato",
    slug: "impianti-carico-immediato",
    order: 1,
    icon: "zap",
    showInHome: true,
    title: "Carico Immediato (Denti in 24h)",
    excerpt:
      "Consente di posizionare gli impianti e la protesi fissa provvisoria nella stessa seduta o entro il giorno successivo. Masticazione e sorriso ripristinati subito.",
    // Prezzi INDICATIVI placeholder — da rivedere nello Studio.
    priceBadge: "Denti in 24h",
    priceMin: 4500,
    priceMax: 6500,
    priceNote: "ad arcata",
    priceFeatures: [
      "Impianti in titanio certificati",
      "Protesi provvisoria fissa in giornata",
      "Controlli post-operatori inclusi",
    ],
    body: body(
      "La tecnica del carico immediato permette di inserire gli impianti dentali e applicare una protesi fissa provvisoria nella stessa seduta o entro 24 ore, senza i lunghi tempi d'attesa dell'implantologia tradizionale.",
      "È indicata per chi desidera tornare a sorridere e masticare in tempi rapidi, con un intervento mininvasivo e pianificato in modo digitale per la massima precisione.",
    ),
  },
  {
    _id: "service-all-on-4",
    slug: "all-on-4",
    order: 2,
    icon: "layers",
    showInHome: true,
    title: "All-on-4 & All-on-6",
    excerpt:
      "Soluzioni ideali per intere arcate prive di denti o con denti gravemente compromessi. Con soli 4 o 6 impianti si ancora stabilmente una protesi fissa completa.",
    // Prezzi INDICATIVI placeholder — da rivedere nello Studio.
    priceBadge: "Arcata Completa",
    priceMin: 5800,
    priceMax: 7500,
    priceNote: "ad arcata",
    popular: true,
    priceFeatures: [
      "4 o 6 impianti in titanio certificati",
      "Denti fissi provvisori entro 24 ore",
      "Protesi definitiva su misura",
    ],
    body: body(
      "Le tecniche All-on-4 e All-on-6 permettono di riabilitare un'intera arcata dentale sfruttando soltanto 4 o 6 impianti, opportunamente inclinati per ancorare in modo stabile una protesi fissa completa.",
      "Sono la risposta ideale per chi ha perso molti denti o porta una protesi mobile instabile e desidera una soluzione fissa, confortevole e duratura.",
    ),
  },
  {
    _id: "service-computer-guidata",
    slug: "implantologia-computer-guidata",
    order: 3,
    icon: "monitor",
    showInHome: true,
    title: "Implantologia Computer Guidata",
    excerpt:
      "Pianificazione 3D al computer che permette di inserire gli impianti con precisione millimetrica senza tagliare la gengiva e senza punti di sutura.",
    // Prezzi INDICATIVI placeholder — da rivedere nello Studio.
    priceBadge: "Chirurgia Guidata",
    priceMin: 1200,
    priceMax: 1800,
    priceNote: "a impianto",
    priceFeatures: [
      "Pianificazione 3D dell'intervento",
      "Dima chirurgica personalizzata",
      "Chirurgia mininvasiva senza suture",
    ],
    body: body(
      "L'implantologia computer guidata si basa su una pianificazione 3D dell'intervento: dalla TAC del paziente si progetta al computer la posizione ideale di ogni impianto.",
      "Grazie a una dima chirurgica personalizzata, gli impianti vengono inseriti con precisione millimetrica in modo mininvasivo, spesso senza incidere la gengiva e senza punti di sutura, riducendo gonfiore e fastidi post-operatori.",
    ),
  },
];

async function seed(dataset) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-07-01",
    token,
    useCdn: false,
  });

  for (const s of services) {
    const { slug, ...rest } = s;
    await client.createOrReplace({
      _type: "service",
      ...rest,
      slug: { _type: "slug", current: slug },
    });
    console.log(`[${dataset}] servizio "${s.title}" creato e pubblicato.`);
  }
}

for (const dataset of datasets) {
  await seed(dataset);
}
