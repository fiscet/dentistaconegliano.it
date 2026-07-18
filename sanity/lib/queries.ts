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
    testimonials{
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
    seoImage,
    noIndex
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
    seoTitle,
    seoDescription,
    seoImage,
    noIndex,
    "relatedVideos": *[_type == "video" && references(^._id) && defined(slug.current)] | order(order asc, publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      youtubeUrl,
      duration,
      thumbnail{ ..., "alt": alt }
    },
    "relatedFaqs": *[_type == "faq" && references(^._id)] | order(order asc){
      _id,
      question,
      answer
    }
  }
`);

// Slug di tutti i servizi per generateStaticParams (+ _updatedAt per la sitemap).
export const SERVICE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "service" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
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

// Testimonianze in evidenza mostrate in home.
export const HOME_TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial" && featured == true] | order(date desc){
    _id,
    authorName,
    text,
    rating,
    date,
    source
  }
`);

// Tutte le testimonianze: usate per l'aggregateRating nel JSON-LD (Dentist),
// non solo quelle in evidenza, per non gonfiare artificialmente la media.
export const TESTIMONIALS_QUERY = defineQuery(/* groq */ `
  *[_type == "testimonial"] | order(date desc){
    _id,
    authorName,
    text,
    rating,
    date,
    source
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
    seoImage,
    noIndex
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
    seoImage,
    noIndex
  }
`);

export const PATH_PAGE_QUERY = defineQuery(/* groq */ `
  *[_id == "pathPage"][0]{
    hero{ eyebrow, title, description },
    steps[]{ _key, icon, title, text },
    cta{ title, description, buttonLabel },
    seoTitle,
    seoDescription,
    seoImage,
    noIndex
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

// Pagina di contenuto generica (tipo "page"): route /[slug].
export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    intro,
    body,
    seoTitle,
    seoDescription,
    seoImage,
    noIndex
  }
`);

export const PAGE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

// Elenco landing di zona: /zona.
export const LOCATION_PAGES_QUERY = defineQuery(/* groq */ `
  *[_type == "locationPage" && defined(slug.current)] | order(cityName asc){
    _id,
    title,
    "slug": slug.current,
    cityName,
    intro,
    image{ ..., "alt": alt }
  }
`);

// Dettaglio singola landing di zona: /zona/[slug].
export const LOCATION_PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "locationPage" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    cityName,
    intro,
    image{ ..., "alt": alt },
    featuredServices[]->{ _id, title, "slug": slug.current, excerpt, icon, image{ ..., "alt": alt } },
    body,
    seoTitle,
    seoDescription,
    seoImage,
    noIndex
  }
`);

export const LOCATION_PAGE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "locationPage" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

// Elenco articoli del blog (più recenti prima).
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage{ ..., "alt": alt },
    "author": author->name
  }
`);

// Dettaglio articolo: /blog/[slug].
export const POST_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    mainImage{ ..., "alt": alt },
    author->{ name, role, photo{ ..., "alt": alt } },
    body,
    seoTitle,
    seoDescription,
    seoImage,
    noIndex
  }
`);

export const POST_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "post" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

export const VIDEOS_QUERY = defineQuery(/* groq */ `
  *[_type == "video"] | order(order asc, publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    youtubeUrl,
    description,
    duration,
    thumbnail{ ..., "alt": alt },
    publishedAt,
    relatedService->{ title, "slug": slug.current }
  }
`);

// Dettaglio singolo video: /video/[slug].
export const VIDEO_QUERY = defineQuery(/* groq */ `
  *[_type == "video" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    youtubeUrl,
    description,
    duration,
    thumbnail{ ..., "alt": alt },
    publishedAt,
    relatedService->{ title, "slug": slug.current }
  }
`);

export const VIDEO_SLUGS_QUERY = defineQuery(/* groq */ `
  *[_type == "video" && defined(slug.current)]{ "slug": slug.current, _updatedAt }
`);

// Elenco completo delle FAQ: pagina /faq.
export const FAQS_QUERY = defineQuery(/* groq */ `
  *[_type == "faq"] | order(order asc){
    _id,
    question,
    answer,
    relatedService->{ title, "slug": slug.current }
  }
`);
