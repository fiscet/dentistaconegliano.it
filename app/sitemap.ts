import type { MetadataRoute } from "next";
import { client } from "@/sanity/lib/client";
import { site } from "@/lib/site";
import { SERVICE_SLUGS_QUERY, POST_SLUGS_QUERY, PAGE_SLUGS_QUERY } from "@/sanity/lib/queries";

const staticRoutes = [
  "",
  "/servizi",
  "/studio",
  "/interventi-realizzati",
  "/contatti",
  "/video",
  "/blog",
];

function entriesFor(prefix: string, items: { slug: string | null }[]): MetadataRoute.Sitemap {
  return items
    .filter((item): item is { slug: string } => Boolean(item.slug))
    .map((item) => ({ url: `${site.url}${prefix}/${item.slug}` }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, posts, pages] = await Promise.all([
    client.fetch(SERVICE_SLUGS_QUERY),
    client.fetch(POST_SLUGS_QUERY),
    client.fetch(PAGE_SLUGS_QUERY),
  ]);

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${site.url}${path}`,
  }));

  return [
    ...staticEntries,
    ...entriesFor("/servizi", services),
    ...entriesFor("/blog", posts),
    ...entriesFor("", pages),
  ];
}
