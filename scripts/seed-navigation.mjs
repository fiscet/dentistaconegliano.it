// Seed del singleton "navigation": popola il menu principale del sito.
// Impostazione SEO-first:
// - "Servizi" è un hub (/servizi) con dropdown che linka INTERNAMENTE ogni
//   scheda servizio (reference -> /servizi/<slug>): buon internal linking e i
//   link non si rompono se cambia lo slug.
// - Home usa il riferimento al singleton homePage; le pagine statiche
//   (/prezzi, /video, /#contatti) usano percorsi espliciti.
//
// Uso: node --env-file=.env.local scripts/seed-navigation.mjs [dataset...]
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

const ref = (id) => ({ _type: "reference", _ref: id });

// Voce che punta a un contenuto Sanity (reference).
const internal = (key, label, id) => ({
  _key: key,
  _type: "navLink",
  label,
  linkType: "internal",
  internalLink: ref(id),
  openInNewTab: false,
});

// Voce che punta a un percorso statico del sito.
const path = (key, label, p) => ({
  _key: key,
  _type: "navLink",
  label,
  linkType: "path",
  path: p,
  openInNewTab: false,
});

const items = [
  { ...internal("home", "Home", "homePage"), _type: "navItem" },
  {
    ...path("servizi", "Servizi", "/servizi"),
    _type: "navItem",
    children: [
      internal("srv-carico", "Carico Immediato (Denti in 24h)", "service-carico-immediato"),
      internal("srv-allon4", "All-on-4 & All-on-6", "service-all-on-4"),
      internal("srv-guidata", "Implantologia Computer Guidata", "service-computer-guidata"),
      path("srv-tutti", "Tutti i servizi", "/servizi"),
    ],
  },
  { ...internal("prezzi", "Prezzi", "pricePage"), _type: "navItem" },
  { ...path("video", "Video", "/video"), _type: "navItem" },
  { ...path("contatti", "Contatti", "/#contatti"), _type: "navItem" },
];

async function seed(dataset) {
  const client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-07-01",
    token,
    useCdn: false,
  });

  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    title: "Menu principale",
    items,
  });
  console.log(`[${dataset}] menu di navigazione creato e pubblicato (${items.length} voci).`);
}

for (const dataset of datasets) {
  await seed(dataset);
}
