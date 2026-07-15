import Link from "next/link";
import Image from "next/image";
import { Wrench, Award } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import type { Mechanic } from "@/lib/types";

export default function MechanicCard({ mechanic }: { mechanic: Mechanic }) {
  return (
    <TiltCard className="group overflow-hidden rounded-2xl border border-border bg-surface shadow-sm transition hover:border-race-red/60 hover:shadow-xl">
      <div className="relative h-72 w-full overflow-hidden bg-surface-2">
        <Image
          src={mechanic.photoUrl}
          alt={mechanic.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-4 right-4 text-white">
          <h3 className="font-[family-name:var(--font-racing)] text-lg font-bold uppercase tracking-wide">
            {mechanic.name}
          </h3>
          <p className="text-xs font-semibold uppercase tracking-widest text-race-red">
            {mechanic.role}
          </p>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-text-muted">{mechanic.bio}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-text-muted">
          <span className="flex items-center gap-1.5">
            <Wrench size={13} className="text-race-red" /> {mechanic.specialty}
          </span>
          <span className="flex items-center gap-1.5">
            <Award size={13} className="text-race-red" /> {mechanic.yearsExperience} yrs
          </span>
        </div>
        <Link
          href={`/booking?mechanic=${mechanic.id}`}
          className="mt-5 block rounded-md border border-border py-2.5 text-center text-sm font-bold uppercase tracking-wide text-text transition group-hover:border-race-red group-hover:bg-race-red group-hover:text-white"
        >
          Book With {mechanic.name.split(" ")[0]}
        </Link>
      </div>
    </TiltCard>
  );
}
