import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Instagram, Facebook } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={150}
            height={42}
            className="h-10 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Implantologia dentale e riabilitazione del sorriso a Conegliano.
            Tecnologie avanzate, protocolli personalizzati e risultati naturali.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.social.instagram}
              aria-label="Instagram"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href={site.social.facebook}
              aria-label="Facebook"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-background text-brand transition-colors hover:bg-brand hover:text-brand-foreground"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
            Navigazione
          </h2>
          <ul className="mt-4 space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-brand"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
            Contatti
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span>
                {site.address.street}
                <br />
                {site.address.city}
              </span>
            </li>
            <li>
              <a href={site.phoneHref} className="flex gap-3 hover:text-brand">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {site.phone}
              </a>
            </li>
            <li>
              <a href={site.emailHref} className="flex gap-3 hover:text-brand">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
            Orari
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            {site.hours.map((h) => (
              <li key={h.day} className="flex items-start gap-3">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>
                  <span className="block font-medium text-foreground">
                    {h.day}
                  </span>
                  {h.time}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} {site.name}. Tutti i diritti
            riservati.
          </p>
          <p>P.IVA 00000000000 &middot; Dir. San. Dott. Mario Rossi</p>
        </div>
      </div>
    </footer>
  );
}
