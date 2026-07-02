import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  description,
  breadcrumb,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: string;
}) {
  return (
    <section className="border-b border-border bg-muted">
      <div className="container-page py-14 md:py-20">
        <nav className="mb-4 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="transition-colors hover:text-brand">
            Home
          </Link>
          {breadcrumb ? <span className="mx-2 text-border">/</span> : null}
          {breadcrumb ? (
            <span className="text-foreground">{breadcrumb}</span>
          ) : null}
        </nav>
        {eyebrow ? (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="max-w-3xl text-balance font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}
