import Link from "next/link";
import { site } from "@/lib/site";

const quickLinks = [
  { label: "Home Page", href: "/" },
  { label: "Prezzi e Trasparenza", href: "/costo-impianto-dentale-conegliano" },
  { label: "Lo Studio e il Team", href: "/studio" },
  { label: "Video", href: "/video" },
  { label: "Casi Clinici", href: "/interventi-realizzati" },
  { label: "Terapie", href: "/terapie" },
  { label: "Blog", href: "/blog" },
];

const serviceLinks = [
  { label: "Carico Immediato", href: "/impianti-carico-immediato" },
  { label: "All-on-4 / All-on-6", href: "/all-on-4" },
  { label: "Chirurgia Computer Guidata", href: "/implantologia-dentale-conegliano" },
  { label: "Sedazione Cosciente", href: "/sedazione-cosciente" },
  { label: "Rigenerazione Ossea", href: "/rigenerazione-ossea-mascellare" },
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-primary-foreground py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-bold tracking-tight text-primary-foreground leading-tight">
                {site.shortName}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {site.name}. Esperienza ventennale e soluzioni implantari
              d&apos;avanguardia per ripristinare il tuo sorriso in sicurezza.
            </p>
            <p className="text-xs text-slate-400">
              Direttore Sanitario: {site.doctor}
              <br />
              Iscrizione Albo Odontoiatri TV n. 1234
            </p>
          </div>

          <div>
            <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-sky-400 mb-4">
              Link Rapidi
            </h4>
            <ul className="flex flex-col gap-2.5 text-xs text-slate-400">
              {quickLinks.map((link) => (
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
              Studio Dentistico dott. Gianluca Marin S.r.l.
              <br />
              P.IVA 01234567890 | Cap. Soc. € 10.000 i.v.
              <br />
              Sede Legale: {site.address.street} - {site.address.city}
            </p>
            <div className="flex gap-4 text-xs text-slate-400">
              <Link href="/privacy-policy" className="hover:text-primary-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="hover:text-primary-foreground transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 text-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Tutti i diritti
            riservati. Realizzato per {site.domain}
          </p>
        </div>
      </div>
    </footer>
  );
}
