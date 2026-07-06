import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { resolveNavItems } from "@/lib/nav";
import { getSiteSettings } from "@/lib/settings";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [{ data }, settings] = await Promise.all([
    sanityFetch({ query: NAVIGATION_QUERY }),
    getSiteSettings(),
  ]);
  const navItems = resolveNavItems(data?.items);

  return (
    <>
      <SiteHeader items={navItems} settings={settings} />
      {children}
      <SiteFooter settings={settings} />
      <SanityLive />
    </>
  );
}
