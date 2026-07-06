import { nav as staticNav } from "@/lib/site";

export type NavItem = {
  key: string;
  label: string;
  href: string;
  newTab?: boolean;
  children?: NavItem[];
};

type SanityNavLink = {
  _key: string;
  label: string | null;
  linkType: "path" | "internal" | "external" | null;
  path: string | null;
  externalUrl: string | null;
  openInNewTab: boolean | null;
  internalLink: { _type: string; slug: string | null } | null;
  children?: SanityNavLink[] | null;
};

// Mappa tipo documento → route del sito. Le pagine singleton hanno route
// fisse (niente slug); ogni nuovo singleton va aggiunto qui e tra i tipi
// referenziabili in studio/schemaTypes/objects/navLink.ts.
const singletonRoutes: Record<string, string> = {
  homePage: "/",
};

function internalHref(link: NonNullable<SanityNavLink["internalLink"]>): string | null {
  const singletonRoute = singletonRoutes[link._type];
  if (singletonRoute) return singletonRoute;
  if (!link.slug) return null;
  switch (link._type) {
    case "page":
      return `/${link.slug}`;
    case "service":
      return `/servizi/${link.slug}`;
    case "post":
      return `/blog/${link.slug}`;
    default:
      return null;
  }
}

function hrefFor(item: SanityNavLink): string | null {
  switch (item.linkType) {
    case "path":
      return item.path;
    case "external":
      return item.externalUrl;
    case "internal":
      return item.internalLink ? internalHref(item.internalLink) : null;
    default:
      return null;
  }
}

function toNavItem(item: SanityNavLink): NavItem | null {
  const href = hrefFor(item);
  if (!href || !item.label) return null;
  const children = (item.children ?? [])
    .map(toNavItem)
    .filter((child): child is NavItem => child !== null);
  return {
    key: item._key,
    label: item.label,
    href,
    newTab: item.openInNewTab ?? false,
    ...(children.length > 0 ? { children } : {}),
  };
}

export const fallbackNav: NavItem[] = staticNav.map((item) => ({
  key: item.href,
  label: item.label,
  href: item.href,
}));

// Converte il menu di Sanity in voci pronte per l'header;
// se il documento non esiste ancora, usa il menu statico di lib/site.ts.
export function resolveNavItems(items: SanityNavLink[] | null | undefined): NavItem[] {
  if (!items?.length) return fallbackNav;
  const resolved = items
    .map(toNavItem)
    .filter((item): item is NavItem => item !== null);
  return resolved.length > 0 ? resolved : fallbackNav;
}
