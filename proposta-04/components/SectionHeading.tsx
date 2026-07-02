import { ReactNode } from "react";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "center" | "left";
}) {
  return (
    <div
      className={
        align === "center"
          ? "mx-auto max-w-2xl text-center"
          : "max-w-2xl text-left"
      }
    >
      {eyebrow && (
        <span className="inline-block rounded-full bg-brand-light px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-balance font-display text-3xl font-bold leading-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}
