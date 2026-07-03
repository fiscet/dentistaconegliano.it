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
    yearsBadge,
    phone,
    email,
    whatsapp,
    address,
    openingHours,
    socials[]{ _key, platform, url },
    seoTitle,
    seoDescription
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
