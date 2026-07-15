import { db } from "@/db";
import { mechanics } from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import MechanicCard from "@/components/MechanicCard";
import RevealSection from "@/components/RevealSection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Meet the Crew | Le Mans AutoWorks",
};

export default async function MechanicsPage() {
  const rows = await db
    .select()
    .from(mechanics)
    .where(eq(mechanics.active, true))
    .orderBy(asc(mechanics.id));

  return (
    <main>
      <PageHero
        eyebrow="Our Pit Crew"
        title="Meet the Mechanics"
        description="Every driver has a preferred crew chief. Get to know our specialists and pick who works on your car when you book."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((mechanic, i) => (
            <RevealSection key={mechanic.id} delay={i * 0.06}>
              <MechanicCard mechanic={mechanic} />
            </RevealSection>
          ))}
        </div>
      </section>
    </main>
  );
}
