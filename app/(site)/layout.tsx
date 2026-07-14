import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { DisableDraftMode } from "@/components/disable-draft-mode";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { updateSanityLiveTags } from "@/lib/actions/sanity-live";
import { NAVIGATION_QUERY, FOOTER_SERVICES_QUERY } from "@/sanity/lib/queries";
import { resolveNavItems } from "@/lib/nav";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ data }, { data: services }, settings] = await Promise.all([
    sanityFetch({ query: NAVIGATION_QUERY }),
    sanityFetch({ query: FOOTER_SERVICES_QUERY }),
    getSiteSettings(),
  ]);
  const navItems = resolveNavItems(data?.items);
  const footerItems = resolveNavItems(data?.footerLinks);
  const isDraftMode = (await draftMode()).isEnabled;

  return (
    <>
      <SiteHeader items={navItems} settings={settings} />
      {children}
      <SiteFooter settings={settings} services={services} quickLinks={footerItems} />
      <SanityLive action={updateSanityLiveTags} />
      {isDraftMode && (
        <>
          <VisualEditing />
          <DisableDraftMode />
        </>
      )}
    </>
  );
}
