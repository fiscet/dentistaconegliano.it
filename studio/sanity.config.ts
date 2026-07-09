import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
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
      }),
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
      }),
      visionTool({ defaultApiVersion: apiVersion }),
      media(),
    ],
  },
]);
