const stats = [
  { value: "99.4%", label: "Percentuale di Successo degli Impianti" },
  { value: "12.000+", label: "Impianti Inseriti con Successo" },
  { value: "24 Ore", label: "Tempo medio per i Denti Fissi" },
  { value: "Zero", label: "Dolore grazie alla Sedazione Cosciente" },
];

export default function StatsBar() {
  return (
    <section className="bg-primary text-primary-foreground py-12 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 100 C 300 250, 700 -50, 1100 150 C 1200 200, 1500 100, 1600 80"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-4xl lg:text-5xl font-extrabold font-heading text-sky-300">
                {stat.value}
              </p>
              <p className="text-sm mt-2 text-sky-100">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
