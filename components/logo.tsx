import { site } from "@/lib/site";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-12 h-12 flex items-center justify-center" aria-hidden="true">
        <div className="absolute w-8 h-8 rounded-full bg-primary/20 -left-1 top-1" />
        <div className="absolute w-8 h-8 rounded-full bg-primary/30 left-2 top-0" />
        <div className="absolute w-8 h-8 rounded-full bg-sky-400/20 left-4 top-2" />
        <svg
          className="absolute bottom-2 left-1 w-10 h-3 text-primary"
          viewBox="0 0 40 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 2C10 10 30 10 38 2"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div>
        <span className="block font-heading text-lg font-bold tracking-tight text-primary leading-tight">
          {site.shortName}
        </span>
        <span className="block text-xs font-medium text-muted-foreground tracking-wider uppercase">
          {site.doctor}
        </span>
      </div>
    </div>
  );
}
