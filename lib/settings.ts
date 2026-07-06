import { cache } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { site as fallback } from "@/lib/site";
import type { SITE_SETTINGS_QUERY_RESULT } from "@/sanity.types";

export type SiteSettings = {
  name: string;
  shortName: string;
  doctor: string;
  domain: string;
  url: string;
  phone: string;
  phoneHref: string;
  email?: string;
  whatsapp?: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    province: string;
  };
  addressLine: string;
  openingHours: string;
  yearsBadge: string;
  footerDescription: string;
  legalName: string;
  vatNumber: string;
  shareCapital: string;
  alboRegistration: string;
  socials: NonNullable<NonNullable<SITE_SETTINGS_QUERY_RESULT>["socials"]>;
  seoTitle?: string;
  seoDescription?: string;
};

// "0438 415356" -> "tel:+390438415356"; numeri già internazionali restano invariati.
function toPhoneHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  return `tel:${digits.startsWith("+") ? digits : `+39${digits}`}`;
}

// Fonte primaria: documento siteSettings su Sanity; ogni campo mancante (o
// fetch fallita) ricade sui valori hardcoded di lib/site.ts per non mostrare
// mai NAP vuoti. cache() deduplica la fetch nella singola request.
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  let data: SITE_SETTINGS_QUERY_RESULT = null;
  try {
    ({ data } = await sanityFetch({ query: SITE_SETTINGS_QUERY }));
  } catch {
    data = null;
  }

  const address = {
    street: data?.address?.street ?? fallback.address.street,
    postalCode: data?.address?.postalCode ?? fallback.address.postalCode,
    city: data?.address?.city ?? fallback.address.city,
    province: data?.address?.province ?? fallback.address.province,
  };
  const phone = data?.phone ?? fallback.phone;

  return {
    name: data?.siteName ?? fallback.name,
    shortName: data?.shortName ?? fallback.shortName,
    doctor: data?.doctor ?? fallback.doctor,
    domain: fallback.domain,
    url: fallback.url,
    phone,
    phoneHref: toPhoneHref(phone),
    email: data?.email ?? undefined,
    whatsapp: data?.whatsapp ?? undefined,
    address,
    addressLine: `${address.street} - ${address.postalCode} ${address.city} (${address.province})`,
    openingHours: data?.openingHours ?? fallback.openingHours,
    yearsBadge: data?.yearsBadge ?? fallback.yearsBadge,
    footerDescription: data?.footerDescription ?? fallback.footerDescription,
    legalName: data?.legalName ?? fallback.legalName,
    vatNumber: data?.vatNumber ?? fallback.vatNumber,
    shareCapital: data?.shareCapital ?? fallback.shareCapital,
    alboRegistration: data?.alboRegistration ?? fallback.alboRegistration,
    socials: data?.socials ?? [],
    seoTitle: data?.seoTitle ?? undefined,
    seoDescription: data?.seoDescription ?? undefined,
  };
});
