import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-16 h-16 relative">
                <Image
                  src="/images/logo.png"
                  alt="Studio Dentistico Marin"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-lg">Studio Marin</h3>
                <p className="text-xs text-gray-400">Dentista Conegliano</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Studio dentistico specializzato nel trattamento odontofobici con
              protocolli terapeutici innovativi.
            </p>
            <div className="flex space-x-4">
              {/* Social Media Links */}
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Link Veloci</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/studio"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Il Nostro Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Servizi
                </Link>
              </li>
              <li>
                <Link
                  href="/pazienti"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Per i Pazienti
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contatti"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contatti
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Servizi</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/servizi/odontoiatria-generale"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Odontoiatria Generale
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi/ortopedia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Ortopedia Dentale
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi/estetica"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Estetica
                </Link>
              </li>
              <li>
                <Link
                  href="/servizi/pedodonzia"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pedodonzia
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contatti</h4>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Via XX Settembre, 123</p>
              <p>31015 Conegliano (TV)</p>
              <p>Italy</p>
              <p className="mt-4">
                <a
                  href="tel:+39043821456"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +39 0438 21456
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@dentistaconegliano.it"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  info@dentistaconegliano.it
                </a>
              </p>
            </address>
            <div className="mt-4">
              <p className="text-gray-400 text-sm">
                Orari: Lunedì - Venerdì 08:00 - 19:00
              </p>
              <p className="text-gray-400 text-sm">Sabato: 08:00 - 13:00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p className="text-sm">
            © 2024 Studio Dentistico Dr. Gianluca Marin. Tutti i diritti
            riservati.
          </p>
          <div className="mt-2 space-x-4 text-xs">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/termini"
              className="hover:text-white transition-colors"
            >
              Termini e Condizioni
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
