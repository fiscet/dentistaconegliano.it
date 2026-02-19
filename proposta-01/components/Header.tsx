'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: '/', label: 'Home' },
    {
      href: '/studio',
      label: 'Il Nostro Studio',
      submenu: [
        { href: '/studio/chi-siamo', label: 'Chi Siamo' },
        { href: '/studio/team', label: 'Team' },
        { href: '/studio/tecnologie', label: 'Tecnologie' }
      ]
    },
    {
      href: '/servizi',
      label: 'Servizi',
      submenu: [
        {
          href: '/servizi/odontoiatria-generale',
          label: 'Odontoiatria Generale'
        },
        { href: '/servizi/ortopedia', label: 'Ortopedia Dentale' },
        { href: '/servizi/estetica', label: 'Estetica' },
        { href: '/servizi/pedodonzia', label: 'Pedodonzia' }
      ]
    },
    {
      href: '/pazienti',
      label: 'Per i Pazienti',
      submenu: [
        { href: '/pazienti/recensioni', label: 'Recensioni' },
        { href: '/pazienti/casi-clinici', label: 'Casi Clinici' }
      ]
    },
    { href: '/blog', label: 'Blog' },
    { href: '/contatti', label: 'Contatti' }
  ];

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary-800 to-primary-500 shadow-sm">
      <div className="container-custom py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-48 h-16 lg:h-20">
              <Image
                src="/images/logo.png"
                alt="Studio Dentistico Marin"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.href} className="relative group">
                {item.submenu ? (
                  <>
                    <button className="flex items-center space-x-1 font-medium text-white hover:text-primary-200 transition-colors">
                      <span>{item.label}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-gradient-to-r from-primary-800 to-primary-600 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-white hover:bg-primary-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="font-medium text-white hover:text-primary-200 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contatti"
              className="bg-white text-primary-600 px-6 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Prenota
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-r from-primary-800 to-primary-600 border-t border-primary-700">
          <div className="container-custom py-4">
            {menuItems.map((item) => (
              <div key={item.href} className="mb-4">
                {item.submenu ? (
                  <div>
                    <button className="flex items-center justify-between w-full font-medium text-white">
                      <span>{item.label}</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <div className="mt-2 pl-4 space-y-2">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block py-1 text-sm text-gray-600 hover:text-primary-600 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="block py-1 text-white hover:text-primary-200 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            <Link
              href="/contatti"
              className="bg-white text-primary-600 w-full py-3 rounded-lg font-medium text-center block mt-4"
            >
              Prenota
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
