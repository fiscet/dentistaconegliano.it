import Image from "next/image";
import logo from "@/public/logo.png";
import { site } from "@/lib/site";

export default function Logo({ alt = site.name }: { alt?: string }) {
  return (
    <Image
      src={logo}
      alt={alt}
      priority
      className="h-16 w-auto"
    />
  );
}
