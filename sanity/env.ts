export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "wqblxiv7";

// In produzione su Vercel la variabile DEVE essere impostata: niente
// fallback silenzioso, altrimenti si rischia di servire il dataset
// "development" al pubblico se la env var è stata dimenticata.
function resolveDataset() {
  const configured = process.env.NEXT_PUBLIC_SANITY_DATASET;
  if (configured) return configured;
  if (process.env.VERCEL_ENV === "production") {
    throw new Error(
      "NEXT_PUBLIC_SANITY_DATASET non impostata: obbligatoria in produzione per evitare di servire il dataset development.",
    );
  }
  return "development";
}

export const dataset = resolveDataset();

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-07-01";

// URL dello Studio hosted, con basePath del workspace corretto (development
// in locale, production in prod). Usato per collegare gli overlay del
// Visual Editing al documento/campo giusto nello Studio.
export const studioUrl =
  process.env.NEXT_PUBLIC_SANITY_STUDIO_URL ??
  "https://dentistaconegliano.sanity.studio/development";
