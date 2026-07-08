import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Vercel imposta VERCEL_ENV automaticamente (production/preview/development).
  // Fuori da production blocchiamo tutto il crawling, per evitare che copie
  // di anteprima o sviluppo finiscano indicizzate per errore.
  if (process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
