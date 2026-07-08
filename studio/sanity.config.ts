import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { apiVersion, projectId } from "./env";

const shared = {
  projectId,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
    media(),
  ],
  schema: { types: schemaTypes },
};

// Due workspace: stesso schema, dataset diversi. Nello Studio si passa
// dall'uno all'altro col selettore workspace in alto a sinistra.
export default defineConfig([
  {
    ...shared,
    name: "production",
    title: "Sito (Produzione)",
    basePath: "/production",
    dataset: "production",
  },
  {
    ...shared,
    name: "development",
    title: "Sviluppo (Test)",
    basePath: "/development",
    dataset: "development",
  },
]);
