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
    },
    footerLinks[]{ ${navLinkFragment} }
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
      description
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
      description
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

export const PRICE_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "pricePage"][0]{
    hero{ eyebrow, title, description },
    factors{
      enabled,
      eyebrow,
      title,
      items[]{ _key, icon, title, text }
    },
    list{ enabled, eyebrow, title, description },
    cta{ enabled, eyebrow, title, description, boxTitle },
    seoTitle,
    seoDescription,
    seoImage
  }
`);

// Card dei servizi mostrati nella sezione Trattamenti della home.
// title/excerpt usano l'override home se presente (coalesce), altrimenti i
// valori "ufficiali" del servizio.
export const HOME_SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && showInHome == true] | order(order asc, title asc){
    _id,
    "slug": slug.current,
    "title": coalesce(homeTitle, title),
    "description": coalesce(homeExcerpt, excerpt),
    icon
  }
`);

// Elenco completo dei servizi: pagina /servizi.
export const SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service"] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    icon,
    image{ ..., "alt": alt }
  }
`);

// Servizi da elencare nella colonna «I Nostri Servizi» del footer.
export const FOOTER_SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && showInFooter == true] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current
  }
`);

// Servizi con prezzo indicativo: card della pagina /prezzi.
export const PRICED_SERVICES_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(priceMin)] | order(order asc, title asc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    priceBadge,
    priceMin,
    priceMax,
    priceNote,
    priceFeatures,
    popular
  }
`);

// Dettaglio singolo servizio: /servizi/[slug].
export const SERVICE_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    icon,
    image{ ..., "alt": alt },
    body,
    priceBadge,
    priceMin,
    priceMax,
    priceNote,
    seoTitle,
    seoDescription,
    seoImage
  }
`);

// Slug di tutti i servizi per generateStaticParams.
export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current }
`);

// Casi clinici mostrati nella sezione della home (usa l'immagine "Dopo").
export const HOME_CASES_QUERY = defineQuery(/* groq */ `
  *[_type == "clinicalCase" && showInHome == true] | order(order asc, title asc){
    _id,
    badge,
    title,
    description,
    "image": imageAfter{ ..., "alt": alt }
  }
`);

// Tutti i casi clinici: galleria /interventi-realizzati (prima/dopo).
export const CASES_QUERY = defineQuery(/* groq */ `
  *[_type == "clinicalCase"] | order(order asc, title asc){
    _id,
    badge,
    title,
    description,
    imageBefore{ ..., "alt": alt },
    imageAfter{ ..., "alt": alt }
  }
`);

export const CASES_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "casesPage"][0]{
    hero{ eyebrow, title, description },
    seoTitle,
    seoDescription,
    seoImage
  }
`);

export const STUDIO_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "studioPage"][0]{
    hero{
      eyebrow,
      title,
      description,
      highlights,
      image{ ..., "alt": alt },
      imageRole
    },
    profile{ enabled, eyebrow, title, cards[]{ _key, icon, title, text } },
    team{ enabled, eyebrow, title, description },
    studio{
      enabled,
      eyebrow,
      title,
      description,
      image{ ..., "alt": alt },
      features[]{ _key, icon, title, text }
    },
    seoTitle,
    seoDescription,
    seoImage
  }
`);

// Membri del team per la pagina Lo Studio.
export const STAFF_QUERY = defineQuery(/* groq */ `
  *[_type == "staffMember"] | order(order asc, name asc){
    _id,
    name,
    role,
    category,
    excerpt,
    photo{ ..., "alt": alt }
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
