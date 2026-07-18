import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { site } from "@/lib/site";
import {
  SERVICE_SLUGS_QUERY,
  POST_SLUGS_QUERY,
  PAGE_SLUGS_QUERY,
  VIDEO_SLUGS_QUERY,
  LOCATION_PAGE_SLUGS_QUERY,
} from "@/sanity/lib/queries";

const staticRoutes = [
  "",
  "/servizi",
  "/studio",
  "/percorso-di-cura",
  "/interventi-realizzati",
  "/contatti",
  "/video",
  "/blog",
  "/faq",
  "/zona",
];

function entriesFor(
  prefix: string,
  items: { slug: string | null; _updatedAt: string }[],
): MetadataRoute.Sitemap {
  return items
    .filter((item): item is { slug: string; _updatedAt: string } => Boolean(item.slug))
    .map((item) => ({
      url: `${site.url}${prefix}/${item.slug}`,
      lastModified: item._updatedAt,
    }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, pages, videos, locations] = await Promise.all([
    client.fetch(SERVICE_SLUGS_QUERY),
    client.fetch(POST_SLUGS_QUERY),
    client.fetch(PAGE_SLUGS_QUERY),
    client.fetch(VIDEO_SLUGS_QUERY),
    client.fetch(LOCATION_PAGE_SLUGS_QUERY),
  ]);

  // Contenuto statico/hardcoded: usa il momento del build come lastModified.
  const buildTime = new Date();
  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: buildTime,
  }));

  return [
    ...staticEntries,
    ...entriesFor("/servizi", services),
    ...entriesFor("/blog", posts),
    ...entriesFor("/video", videos),
    ...entriesFor("/zona", locations),
    ...entriesFor("", pages),
  ];
}
