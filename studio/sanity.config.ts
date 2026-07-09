import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { vercelProtectionBypassTool } from "@sanity/vercel-protection-bypass";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { resolve } from "./presentation/resolve";
import { apiVersion, projectId } from "./env";

const shared = {
  projectId,
  schema: { types: schemaTypes },
};

// Origini di frontend consentite per la comunicazione Comlink/postMessage
// col Presentation Tool. Senza questa lista, lo Studio si fida SOLO
// dell'origine impostata in previewUrl.origin del workspace attivo, e
// qualsiasi altro dominio (es. preview Vercel) fallisce con "Unable to
// connect to visual editing" anche se CORS e draft mode funzionano.
const allowOrigins = [
  "http://localhost:*",
  "https://dev.dentistaconegliano.it",
  "https://www.dentistaconegliano.it",
];

// Due workspace: stesso schema, dataset diversi. Nello Studio si passa
// dall'uno all'altro col selettore workspace in alto a sinistra. Ogni
// workspace punta il Presentation Tool al proprio frontend (locale per
// development, sito live per production).
export default defineConfig([
  {
    ...shared,
    name: "production",
    title: "Sito (Produzione)",
    basePath: "/production",
    dataset: "production",
    plugins: [
      structureTool({ structure }),
      presentationTool({
        resolve,
        previewUrl: {
          origin: "https://www.dentistaconegliano.it",
          previewMode: { enable: "/api/draft-mode/enable" },
        },
        allowOrigins,
      }),
      // Innocuo se www.dentistaconegliano.it non è protetto da Vercel; se
      // in futuro lo diventa (es. pre-lancio), basta impostare il secret
      // qui sotto senza altre modifiche.
      vercelProtectionBypassTool(),
      visionTool({ defaultApiVersion: apiVersion }),
      media(),
    ],
  },
  {
    ...shared,
    name: "development",
    title: "Sviluppo (Test)",
    basePath: "/development",
    dataset: "development",
    plugins: [
      structureTool({ structure }),
      presentationTool({
        resolve,
        previewUrl: {
          origin: "https://dev.dentistaconegliano.it",
          previewMode: { enable: "/api/draft-mode/enable" },
        },
        allowOrigins,
      }),
      // dev.dentistaconegliano.it è protetto da Vercel Deployment
      // Protection: senza questo, l'iframe del Presentation Tool viene
      // rediretto alla pagina di login di vercel.com e rifiutato.
      vercelProtectionBypassTool(),
      visionTool({ defaultApiVersion: apiVersion }),
      media(),
    ],
  },
]);
