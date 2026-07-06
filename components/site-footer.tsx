import type { SiteSettings } from '@/lib/settings';
import type { NavItem } from '@/lib/nav';
import type { SERVICES_QUERY_RESULT } from '@/sanity.types';
import Link from 'next/link';

export default function SiteFooter({
  settings,
  services,
  quickLinks
}: {
  settings: SiteSettings;
  services: SERVICES_QUERY_RESULT;
  // Colonna «Link Rapidi»: dal campo footerLinks del menu Sanity (con
  // fallback all'array statico di lib/site.ts se non compilato).
  quickLinks: NavItem[];
}) {
  // Colonna "I Nostri Servizi": generata dai servizi di Sanity, così resta
  // sempre allineata (nessun link scritto a mano).
  const serviceLinks = services
    .filter((service) => service.slug)
    .map((service) => ({
      label: service.title ?? '',
      href: `/servizi/${service.slug}`
    }));

  return (
    <footer className="bg-slate-900 text-primary-foreground py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-bold tracking-tight text-primary-foreground leading-tight">
                {settings.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {settings.name}. {settings.footerDescription}
            </p>
            <p className="text-xs text-slate-400">
              Direttore Sanitario: {settings.doctor}
              <br />
              {settings.alboRegistration}
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-sky-400 mb-4">
              Link Rapidi
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    target={link.newTab ? '_blank' : undefined}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-sky-400 mb-4">
              I Nostri Servizi
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-sky-400 mb-4">
              Trasparenza &amp; Note Legali
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {settings.legalName}
              <br />
              P.IVA {settings.vatNumber} | Cap. Soc. {settings.shareCapital}
              <br />
              Sede Legale: {settings.address.street} - {settings.address.city}
            </p>
            <div className="flex gap-4 text-xs text-slate-400">
              <Link
                href="/privacy-policy"
                className="hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookie-policy"
                className="hover:text-primary-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {settings.name}. Tutti i diritti
            riservati. Realizzato per {settings.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
