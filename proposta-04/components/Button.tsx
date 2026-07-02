import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "outline" | "white";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold font-display transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-brand-foreground hover:bg-brand-dark",
  outline: "border border-brand text-brand hover:bg-brand-light",
  white: "bg-white text-brand hover:bg-brand-light",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
