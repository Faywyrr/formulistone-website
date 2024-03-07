import PARTNERS from "@/lib/partners";
import Image from "next/image";
import Link from "next/link";

export default function Partenaires() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Partenaires</h1>
      <p>Voici la liste de nos partenaires</p>

      <div className="flex flex-row flex-wrap items-center justify-center gap-x-40 gap-y-10 py-2">
        {PARTNERS.map((partner, i) => (
          <Link
            key={i}
            href={partner.url}
            target="_blank"
            className="flex flex-col items-center gap-2"
          >
            <Image
              height={90}
              src={partner.logo}
              alt={partner.name}
              className="rounded"
            />
            {partner.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
