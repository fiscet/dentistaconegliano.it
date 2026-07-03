import Image from "next/image";
import logo from "@/public/logo.png";
import { site } from "@/lib/site";

export default function Logo() {
  return (
    <Image
      src={logo}
      alt={site.name}
      priority
      className="h-16 w-auto"
    />
  );
}
