import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import { getServiceIcon } from "@/lib/service-icons";
import type { Service } from "@/lib/types";

export default function ServiceCard({ service }: { service: Service }) {
  const Icon = getServiceIcon(service.icon);

  return (
    <TiltCard className="group h-full rounded-2xl border border-border bg-surface p-6 shadow-sm transition hover:border-race-red/60 hover:shadow-xl">
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-race-red/10 text-race-red">
          <Icon size={22} />
        </span>
        <span className="rounded-full bg-surface-2 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-text-muted">
          {service.category}
        </span>
      </div>
      <h3 className="mt-5 font-[family-name:var(--font-racing)] text-lg font-bold uppercase tracking-wide text-text">
        {service.name}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{service.description}</p>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-text-muted">From</p>
          <p className="font-[family-name:var(--font-racing)] text-xl font-bold text-race-red">
            ${service.priceFrom}
          </p>
        </div>
        <div className="flex items-center gap-1 text-xs text-text-muted">
          <Clock size={13} /> {service.durationMinutes} min
        </div>
      </div>

      <Link
        href={`/booking?service=${service.id}`}
        className="mt-5 flex items-center justify-center gap-1.5 rounded-md border border-border py-2.5 text-sm font-bold uppercase tracking-wide text-text transition group-hover:border-race-red group-hover:bg-race-red group-hover:text-white"
      >
        Book This Service <ArrowUpRight size={15} />
      </Link>
    </TiltCard>
  );
}
