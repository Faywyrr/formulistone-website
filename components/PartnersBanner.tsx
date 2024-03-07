import PARTNERS from "@/lib/partners";
import Image from "next/image";
import Link from "next/link";
import ScrollBanner from "./ScrollBanner";

export function PartnersBanner() {
  return (
    <ScrollBanner>
      <Link
        className="inline-flex shrink-0 animate-loop-scroll flex-row items-center gap-6"
        href="/partenaires"
      >
        {PARTNERS.map((partner, i) => (
          <div key={i} className="h-12 rounded">
            <Image
              src={partner.logo}
              alt={partner.name}
              className="h-full w-fit object-contain"
            />
          </div>
        ))}
      </Link>
    </ScrollBanner>
  );
}
