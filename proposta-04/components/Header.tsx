"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import { navLinks, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
          <Image
            src="/images/logo.png"
            alt={site.name}
            width={140}
            height={40}
            className="h-9 w-auto"
            priority
          />
          <span className="hidden text-sm font-semibold font-display text-foreground sm:block">
            {site.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Principale">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand ${
                  active ? "text-brand" : "text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold font-display text-brand-foreground transition-colors hover:bg-brand-dark"
          >
            <Phone className="h-4 w-4" />
            Prenota una visita
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-brand-foreground lg:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="container-page flex flex-col py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border py-4 text-base font-medium text-foreground last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.phoneHref}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold font-display text-brand-foreground"
            >
              <Phone className="h-4 w-4" />
              Prenota una visita
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
