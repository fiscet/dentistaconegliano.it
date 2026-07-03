import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { resolveNavItems } from "@/lib/nav";

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data } = await sanityFetch({ query: NAVIGATION_QUERY });
  const navItems = resolveNavItems(data?.items);

  return (
    <>
      <SiteHeader items={navItems} />
      {children}
      <SiteFooter />
      <SanityLive />
    </>
  );
}
