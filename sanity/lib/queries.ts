import { defineQuery } from "next-sanity";

const navLinkFragment = /* groq */ `
  _key,
  label,
  linkType,
  path,
  externalUrl,
  openInNewTab,
  internalLink->{ _type, "slug": slug.current }
`;

export const NAVIGATION_QUERY = defineQuery(/* groq */ `
  *[_id == "navigation"][0]{
    items[]{
      ${navLinkFragment},
      children[]{ ${navLinkFragment} }
    }
  }
`);

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_id == "siteSettings"][0]{
    siteName,
    shortName,
    doctor,
    logo,
    yearsBadge,
    footerDescription,
    legalName,
    vatNumber,
    shareCapital,
    alboRegistration,
    phone,
    email,
    whatsapp,
    address,
    openingHours,
    socials[]{ _key, platform, url },
    seoTitle,
    seoDescription,
    seoImage
  }
`);

export const HOME_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "homePage"][0]{
    hero{
      enabled,
      badge,
      title,
      titleHighlight,
      titleSuffix,
      description,
      features[]{ _key, label, icon },
      ctaPrimaryLabel,
      ctaSecondaryLabel,
      image{ ..., "alt": alt },
      experienceCard
    },
    stats{
      enabled,
      items[]{ _key, value, label }
    },
    treatments{
      enabled,
      eyebrow,
      title,
      description,
      items[]{ _key, title, description, href, icon }
    },
    doctorProfile{
      enabled,
      eyebrow,
      title,
      roleLabel,
      paragraphs,
      image{ ..., "alt": alt },
      highlights[]{ _key, title, subtitle, icon },
      ctaLabel,
      ctaHref
    },
    clinicalCases{
      enabled,
      eyebrow,
      title,
      description,
      items[]{ _key, image{ ..., "alt": alt }, badge, title, description, href }
    },
    contact{
      enabled,
      eyebrow,
      title,
      description,
      formTitle
    },
    seoTitle,
    seoDescription,
    seoImage
  }
`);

export const VIDEOS_QUERY = defineQuery(/* groq */ `
  *[_type == "video"] | order(order asc, publishedAt desc){
    _id,
    title,
    youtubeUrl,
    description,
    publishedAt
  }
`);
