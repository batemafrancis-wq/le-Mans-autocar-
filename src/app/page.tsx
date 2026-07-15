import Link from "next/link";
import Image from "next/image";
import { db } from "@/db";
import { services, mechanics, reviews } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";
import { Flag, ShieldCheck, Timer, Trophy, MessageSquareText } from "lucide-react";
import HeroScrollVideo from "@/components/HeroScrollVideo";
import StatsMarquee from "@/components/StatsMarquee";
import RevealSection from "@/components/RevealSection";
import ServiceCard from "@/components/ServiceCard";
import MechanicCard from "@/components/MechanicCard";
import ReviewsGrid from "@/components/ReviewsGrid";
import { ENDURANCE_IMAGES } from "@/lib/media";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [serviceRows, mechanicRows, reviewRows] = await Promise.all([
    db.select().from(services).orderBy(asc(services.id)).limit(6),
    db.select().from(mechanics).where(eq(mechanics.active, true)).orderBy(asc(mechanics.id)).limit(3),
    db.select().from(reviews).where(eq(reviews.approved, true)).orderBy(desc(reviews.createdAt)).limit(6),
  ]);

  return (
    <main className="bg-bg">
      <HeroScrollVideo />
      <StatsMarquee />

      {/* Endurance story */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <RevealSection>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-race-red">
              The Le Mans Philosophy
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-racing)] text-[clamp(1.8rem,4vw,2.75rem)] font-black uppercase leading-tight text-text">
              Endurance isn&apos;t a race distance —
              <br /> it&apos;s <span className="text-race-red">how we build.</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-text-muted">
              For over 100 years, the 24 Hours of Le Mans has tested cars and crews against
              relentless time, brutal conditions, and zero margin for error. We bring that same
              obsession to every bay in our garage: meticulous diagnostics, race-proven parts,
              and mechanics trained to work with pit-crew precision — whether we&apos;re
              changing your oil or building a track-ready engine from the ground up.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "Certified Precision", text: "Factory-trained crew" },
                { icon: Timer, label: "24/7 Turnaround", text: "Endurance-shift service" },
                { icon: Trophy, label: "Race-Proven Parts", text: "Motorsport-grade builds" },
              ].map(({ icon: Icon, label, text }) => (
                <div key={label} className="rounded-xl border border-border bg-surface p-4">
                  <Icon className="text-race-red" size={22} />
                  <p className="mt-2 text-sm font-bold text-text">{label}</p>
                  <p className="text-xs text-text-muted">{text}</p>
                </div>
              ))}
            </div>
          </RevealSection>

          <RevealSection delay={0.15} className="relative">
            <div className="perspective-container">
              <div className="tilt-card relative grid grid-cols-2 gap-4">
                <div className="relative h-64 overflow-hidden rounded-2xl shadow-xl">
                  <Image src={ENDURANCE_IMAGES.paddock} alt="Le Mans paddock racing car" fill className="object-cover" />
                </div>
                <div className="relative mt-8 h-64 overflow-hidden rounded-2xl shadow-xl">
                  <Image src={ENDURANCE_IMAGES.garage} alt="Race car prepared in garage" fill className="object-cover" />
                </div>
                <div className="relative col-span-2 h-48 overflow-hidden rounded-2xl shadow-xl">
                  <Image src={ENDURANCE_IMAGES.nightRace} alt="Endurance racing at night" fill className="object-cover" />
                </div>
              </div>
              <span className="absolute -top-5 -right-5 flex h-20 w-20 items-center justify-center rounded-full bg-race-red text-white shadow-xl">
                <Flag size={26} />
              </span>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* Services preview */}
      <section className="carbon-texture py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <RevealSection className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-race-red">
              Pit Lane Services
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-racing)] text-[clamp(1.8rem,4vw,2.75rem)] font-black uppercase text-white">
              From Oil Changes to Race Builds
            </h2>
            <p className="mt-4 max-w-2xl text-sm text-white/60">
              Every service is delivered with the same discipline our crew would bring to a
              24-hour endurance pit stop.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {serviceRows.map((service, i) => (
              <RevealSection key={service.id} delay={i * 0.05}>
                <ServiceCard service={service} />
              </RevealSection>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/services"
              className="rounded-md border border-white/25 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-race-red hover:text-race-red"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Mechanics preview */}
      <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
        <RevealSection className="mb-12 flex flex-col items-center text-center">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-race-red">
            Meet the Crew
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-racing)] text-[clamp(1.8rem,4vw,2.75rem)] font-black uppercase text-text">
            Choose Your Mechanic
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-text-muted">
            Pick the specialist who fits your build — every booking lets you choose exactly who
            turns the wrench.
          </p>
        </RevealSection>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mechanicRows.map((mechanic, i) => (
            <RevealSection key={mechanic.id} delay={i * 0.06}>
              <MechanicCard mechanic={mechanic} />
            </RevealSection>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/mechanics"
            className="rounded-md bg-race-red px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark"
          >
            Meet the Full Crew
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-border bg-surface-2/40 py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <RevealSection className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-race-red">
              Victory Lane Reviews
            </span>
            <h2 className="mt-3 font-[family-name:var(--font-racing)] text-[clamp(1.8rem,4vw,2.75rem)] font-black uppercase text-text">
              What Our Drivers Say
            </h2>
          </RevealSection>
          <ReviewsGrid reviews={reviewRows.map((r) => ({ ...r, createdAt: r.createdAt.toISOString() }))} />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-ink py-24 text-white">
        <div className="checkered-strip absolute inset-x-0 top-0 h-2 opacity-70" />
        <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
          <RevealSection>
            <MessageSquareText className="mx-auto mb-4 text-race-red" size={36} />
            <h2 className="font-[family-name:var(--font-racing)] text-[clamp(1.8rem,4.5vw,2.75rem)] font-black uppercase leading-tight">
              Have a Question for the Pit Wall?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
              Reach any department directly — Service, Parts, Sales, or Support — and our crew
              will respond before your next lap.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="rounded-md bg-race-red px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark"
              >
                Send an Inquiry
              </Link>
              <Link
                href="/booking"
                className="rounded-md border border-white/25 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-race-red hover:text-race-red"
              >
                Book a Bay
              </Link>
            </div>
          </RevealSection>
        </div>
        <div className="checkered-strip absolute inset-x-0 bottom-0 h-2 opacity-70" />
      </section>
    </main>
  );
}
