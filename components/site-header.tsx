"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X } from "lucide-react";
import Logo from "@/components/logo";
import { nav, site } from "@/lib/site";

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" aria-label={site.name}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigazione principale">
            {nav.map((item) => {
              const isActive = item.href === "/"
                ? pathname === "/"
                : !item.href.includes("#") && pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={
                    isActive
                      ? "text-sm font-semibold text-primary border-b-2 border-primary pb-1"
                      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex flex-col text-right">
              <span className="text-[11px] font-bold text-sky-600 uppercase tracking-widest">
                {site.yearsBadge}
              </span>
              <a
                href={site.phoneHref}
                className="text-base font-bold text-primary flex items-center gap-1 justify-end"
              >
                <Phone className="w-4 h-4 text-sky-500" aria-hidden="true" />
                {site.phone}
              </a>
            </div>
            <Link
              href="/#contatti"
              className="hidden sm:flex bg-primary hover:bg-primary/95 text-primary-foreground px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-md hover:shadow-lg items-center gap-2"
            >
              <Calendar className="w-4 h-4" aria-hidden="true" />
              Prenota Visita
            </Link>
            <button
              type="button"
              className="lg:hidden p-2 text-primary"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Chiudi menu" : "Apri menu"}
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="lg:hidden border-t border-border bg-background px-4 py-4 flex flex-col gap-1"
          aria-label="Navigazione mobile"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={site.phoneHref}
            className="mt-2 px-3 py-2.5 rounded-lg text-sm font-bold text-primary flex items-center gap-2 bg-secondary"
          >
            <Phone className="w-4 h-4 text-sky-500" aria-hidden="true" />
            {site.phone} · {site.yearsBadge}
          </a>
        </nav>
      )}
    </header>
  );
}
