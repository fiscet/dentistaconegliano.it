import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-white">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10">
                <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-display font-bold text-gray-800 leading-tight mb-6">
                  Il Tuo Sorriso
                  <br />
                  <span className="text-gradient">in Buone Mani</span>
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-lg">
                  Studio dentistico specializzato nel trattamento di{' '}
                  <strong>pazienti odontofobici</strong>. Protocolli terapeutici
                  innovativi per garantire il
                  <strong>minimo fastidio o dolore</strong>. Trattiamo il
                  sorriso di tutta la famiglia, dai più piccoli agli adulti.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contatti" className="btn-primary">
                    Prenota Ora
                  </Link>
                  <Link href="/servizi" className="btn-secondary">
                    Scopri i Servizi
                  </Link>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary-200 rounded-full opacity-50 blur-3xl"></div>
            </div>
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden">
                <Image
                  src="/images/foto-dentista-conegliano.png"
                  alt="Studio Dentistico Marin Conegliano"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-secondary-200 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold text-gray-800 mb-4">
              I Nostri Servizi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Offriamo una gamma completa di trattamenti dentali per tutta la
              famiglia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Odontoiatria Generale
              </h3>
              <p className="text-gray-600 mb-6">
                Trattamenti di base per la salute orale
              </p>
              <Link
                href="/servizi/odontoiatria-generale"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Scopri di Più →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Ortopedia Dentale
              </h3>
              <p className="text-gray-600 mb-6">
                Trattamenti per allineare i denti
              </p>
              <Link
                href="/servizi/ortopedia"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Scopri di Più →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Estetica</h3>
              <p className="text-gray-600 mb-6">
                Trattamenti per un sorriso perfetto
              </p>
              <Link
                href="/servizi/estetica"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Scopri di Più →
              </Link>
            </div>

            <div className="bg-gray-50 rounded-xl p-8 text-center card-hover">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Pedodonzia
              </h3>
              <p className="text-gray-600 mb-6">
                Trattamenti per i piccoli pazienti
              </p>
              <Link
                href="/servizi/pedodonzia"
                className="text-primary-600 font-medium hover:text-primary-700"
              >
                Scopri di Più →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 section-padding">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/foto-equipe.jpeg"
                  alt="Il nostro team"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div>
              <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold text-gray-800 mb-6">
                Il Nostro Studio
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Uno studio moderno e accogliente situato in centro a Conegliano.
                Specializzati nel trattamento odontofobici con protocolli
                terapeutici innovativi per ridurre il fastidio e il dolore.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Paziente odontofobici benvenuti
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">Tecnologie all'avanguardia</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg
                      className="w-4 h-4 text-primary-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-600">
                    Equipe professionale e qualificata
                  </p>
                </div>
              </div>
              <Link href="/studio" className="btn-primary inline-block">
                Scopri di Più
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold text-gray-800 mb-4">
              Cosa Dicono i Nostri Pazienti
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Numerosi pazienti hanno scelto il nostro studio per il loro
              sorriso
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Ho avuto paura dei dentisti per anni, ma qui mi hanno fatto
                sentire a mio agio. Il dottore è molto paziente e competente."
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">MG</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Maria G.</p>
                  <p className="text-sm text-gray-500">Conegliano</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Studio molto moderno e pulito. Il personale è gentile e
                professionale. Consigliato!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">FS</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Francesco S.</p>
                  <p className="text-sm text-gray-500">Conegliano</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Ho fatto un odontoiatria estetica e sono molto soddisfatta. Il
                sorriso che avevo sempre desiderato!"
              </p>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-bold">LR</span>
                </div>
                <div>
                  <p className="font-bold text-gray-800">Laura R.</p>
                  <p className="text-sm text-gray-500">Treviso</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-700 section-padding">
        <div className="container-custom text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-display font-bold text-white mb-6">
            Pronto per il Tuo Nuovo Sorriso?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Prenota un appuntamento oggi e scopri come possiamo aiutarti a
            ottenere il sorriso dei tuoi sogni.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contatti"
              className="bg-white text-primary-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Prenota Ora
            </Link>
            <Link
              href="tel:+39043821456"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-primary-600 transition-colors"
            >
              Chiama Ora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
