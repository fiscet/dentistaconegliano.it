// Seed del singleton "pricePage": contenuto editoriale della pagina Prezzi
// (/costo-impianto-dentale-conegliano). Le card prezzo NON stanno qui: arrivano
// dai Servizi con "Prezzo minimo" compilato. Copy neutro, allineato ai fallback
// di lib/fallback/price.ts.
//
// Uso: node --env-file=.env.local scripts/seed-pricePage.mjs [dataset...]
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

const doc = {
  _id: "pricePage",
  _type: "pricePage",
  hero: {
    title: "Prezzi chiari e trasparenza clinica",
    description:
      "I prezzi in questa pagina sono indicativi e servono a darti un ordine di grandezza. Il preventivo definitivo viene sempre concordato dopo la visita, in base al tuo caso clinico.",
  },
  factors: {
    enabled: true,
    eyebrow: "Guida alla scelta",
    title: "Cosa influenza il costo di un trattamento",
    items: [
      {
        _key: "f1",
        _type: "factor",
        icon: "shield",
        title: "Qualità e certificazione dei materiali",
        text: "Utilizziamo impianti in titanio di grado medicale con tracciabilità e garanzia. La qualità dei componenti incide sul risultato e sulla durata nel tempo.",
      },
      {
        _key: "f2",
        _type: "factor",
        icon: "monitor",
        title: "Pianificazione digitale e tecnologie 3D",
        text: "La chirurgia computer-guidata richiede software avanzati e dime chirurgiche personalizzate: più precisione, interventi mininvasivi e tempi di recupero ridotti.",
      },
      {
        _key: "f3",
        _type: "factor",
        icon: "activity",
        title: "Condizioni cliniche del paziente",
        text: "Lo stato dell'osso e delle gengive può richiedere procedure preliminari. Ogni piano di cura viene definito dopo una valutazione clinica e radiografica.",
      },
    ],
  },
  list: {
    enabled: true,
    eyebrow: "Listino indicativo",
    title: "Range di prezzo di riferimento",
    description:
      "Ogni piano di cura viene personalizzato dopo la valutazione clinica. Di seguito i prezzi medi di riferimento per le principali soluzioni.",
  },
  cta: {
    enabled: true,
    eyebrow: "Il tuo preventivo",
    title: "Un preventivo su misura, senza sorprese",
    description:
      "Ogni situazione è diversa. Durante la prima visita valutiamo il tuo caso e ti forniamo un piano di cura chiaro e dettagliato, con un preventivo definitivo e trasparente.",
    boxTitle: "Prenota una consulenza",
  },
  seoTitle: "Prezzi e Trasparenza | Costo Impianti Dentali a Conegliano",
  seoDescription:
    "Prezzi indicativi dei trattamenti implantari dello Studio Dentistico Dott. Gianluca Marin a Conegliano. Ogni piano di cura è personalizzato dopo la visita.",
};

async function seed(dataset) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-07-01",
    token,
    useCdn: false,
  });
  await client.createOrReplace(doc);
  console.log(`[${dataset}] singleton pricePage creato e pubblicato.`);
}

for (const dataset of datasets) {
  await seed(dataset);
}
