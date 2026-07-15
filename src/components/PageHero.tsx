import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="carbon-texture relative overflow-hidden py-20">
      <div className="checkered-strip absolute inset-x-0 top-0 h-1.5 opacity-70" />
      <div className="mx-auto max-w-5xl px-6 text-center sm:px-8">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-race-red">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-[family-name:var(--font-racing)] text-[clamp(2rem,5.5vw,3.5rem)] font-black uppercase leading-tight text-white">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-sm text-white/60 sm:text-base">
            {description}
          </p>
        )}
        {children}
      </div>
      <div className="checkered-strip absolute inset-x-0 bottom-0 h-1.5 opacity-70" />
    </section>
  );
}
