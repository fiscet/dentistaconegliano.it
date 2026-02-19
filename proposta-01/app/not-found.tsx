import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center px-4">
      <div className="text-center">
        {/* 404 Number */}
        <div className="relative mb-8">
          <h1 className="text-[12rem] md:text-[16rem] font-display font-bold text-primary-200 leading-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-4">
          Pagina Non Trovata
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Mi dispiace, la pagina che stai cercando non esiste o è stata
          spostata.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-primary-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Torna alla Home
          </Link>
          <Link
            href="/contatti"
            className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium border-2 border-primary-600 hover:bg-primary-50 transition-all duration-300"
          >
            Contattaci
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 mb-4">
            Altre pagine che potrebbero interessarti:
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/servizi"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              → I Nostri Servizi
            </Link>
            <Link
              href="/studio"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              → Lo Studio
            </Link>
            <Link
              href="/pazienti/recensioni"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              → Recensioni
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
