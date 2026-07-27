import { internalHref, type InternalLinkTarget } from "@/lib/nav";

export type CtaStyle = "solid" | "outline" | "soft" | "ghost";

export type SanityCta = {
  _key: string;
  label: string | null;
  icon: string | null;
  style: CtaStyle | null;
  linkType: "path" | "internal" | "external" | "phone" | null;
  path: string | null;
  externalUrl: string | null;
  openInNewTab: boolean | null;
  internalLink: InternalLinkTarget | null;
};

export type ResolvedCta = {
  key: string;
  label: string;
  icon: string | null;
  style: CtaStyle;
  href: string;
  newTab: boolean;
};

// Risolve l'URL di un pulsante hero in base al tipo di destinazione scelto in
// Sanity; il caso "phone" prende sempre il numero aggiornato da Impostazioni
// sito invece di un valore scritto a mano nel pulsante.
function hrefFor(cta: SanityCta, phoneHref: string): string | null {
  switch (cta.linkType) {
    case "path":
      return cta.path;
    case "external":
      return cta.externalUrl;
    case "internal":
      return cta.internalLink ? internalHref(cta.internalLink) : null;
    case "phone":
      return phoneHref;
    default:
      return null;
  }
}

export function resolveCtas(
  ctas: SanityCta[] | null | undefined,
  phoneHref: string,
): ResolvedCta[] {
  if (!ctas?.length) return [];
  return ctas
    .map((cta): ResolvedCta | null => {
      const href = hrefFor(cta, phoneHref);
      if (!href || !cta.label) return null;
      return {
        key: cta._key,
        label: cta.label,
        icon: cta.icon,
        style: cta.style ?? "solid",
        href,
        newTab: cta.linkType === "external" ? (cta.openInNewTab ?? false) : false,
      };
    })
    .filter((cta): cta is ResolvedCta => cta !== null);
}
