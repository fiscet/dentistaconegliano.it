"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Calendar, Menu, X, ChevronDown } from "lucide-react";
import Logo from "@/components/logo";
import { site } from "@/lib/site";
import { fallbackNav, type NavItem } from "@/lib/nav";

export default function SiteHeader({ items = fallbackNav }: { items?: NavItem[] }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : !href.includes("#") && pathname.startsWith(href);

  return (
    <header className="w-full bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/" aria-label={site.name}>
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigazione principale">
            {items.map((item) =>
              item.children?.length ? (
                <div key={item.key} className="relative group">
                  <Link
                    href={item.href}
                    target={item.newTab ? "_blank" : undefined}
                    className={
                      isActive(item.href)
                        ? "text-sm font-semibold text-primary border-b-2 border-primary pb-1 flex items-center gap-1"
                        : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                    }
                  >
                    {item.label}
                    <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block">
                    <div className="bg-background border border-border rounded-xl shadow-lg py-2 min-w-55">
                      {item.children.map((child) => (
                        <Link
                          key={child.key}
                          href={child.href}
                          target={child.newTab ? "_blank" : undefined}
                          className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={item.key}
                  href={item.href}
                  target={item.newTab ? "_blank" : undefined}
                  className={
                    isActive(item.href)
                      ? "text-sm font-semibold text-primary border-b-2 border-primary pb-1"
                      : "text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  }
                >
                  {item.label}
                </Link>
              ),
            )}
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
          {items.map((item) => (
            <div key={item.key}>
              <Link
                href={item.href}
                target={item.newTab ? "_blank" : undefined}
                className="block px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-secondary hover:text-primary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.key}
                  href={child.href}
                  target={child.newTab ? "_blank" : undefined}
                  className="block pl-8 pr-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-primary transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
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
