import {
  PortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import type { BlockContent } from "@/sanity.types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base text-muted-foreground leading-relaxed mb-4">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-heading text-xl font-bold text-foreground mt-8 mb-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-500 pl-4 italic text-muted-foreground my-6">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 text-muted-foreground space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 text-muted-foreground space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
  },
};

export default function PortableTextBody({ value }: { value: BlockContent }) {
  return <PortableText value={value} components={components} />;
}
