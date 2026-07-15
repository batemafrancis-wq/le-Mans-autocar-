import { db } from "@/db";
import { services } from "@/db/schema";
import { asc } from "drizzle-orm";
import PageHero from "@/components/PageHero";
import ServiceCard from "@/components/ServiceCard";
import RevealSection from "@/components/RevealSection";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services | Le Mans AutoWorks",
};

export default async function ServicesPage() {
  const rows = await db.select().from(services).orderBy(asc(services.id));

  const categories = Array.from(new Set(rows.map((r) => r.category)));

  return (
    <main>
      <PageHero
        eyebrow="Full Service Menu"
        title="Every Service, Race-Team Precision"
        description="From routine maintenance to full endurance-race builds — browse our complete lineup and book the bay that fits your machine."
      />

      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        {categories.map((category) => {
          const items = rows.filter((r) => r.category === category);
          return (
            <div key={category} className="mb-16 last:mb-0">
              <RevealSection>
                <h2 className="mb-6 font-[family-name:var(--font-racing)] text-xl font-bold uppercase tracking-wide text-text">
                  <span className="text-race-red">//</span> {category}
                </h2>
              </RevealSection>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((service, i) => (
                  <RevealSection key={service.id} delay={i * 0.05}>
                    <ServiceCard service={service} />
                  </RevealSection>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </main>
  );
}
