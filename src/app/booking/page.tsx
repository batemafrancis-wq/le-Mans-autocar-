import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import BookingForm from "@/components/BookingForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Bay | Le Mans AutoWorks",
};

export default function BookingPage() {
  return (
    <main>
      <PageHero
        eyebrow="Reserve Your Bay"
        title="Book a Repair or Build"
        description="Choose your service, pick your preferred mechanic, and lock in a time — just like scheduling a pit stop."
      />
      <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
        <Suspense fallback={<p className="text-center text-text-muted">Loading booking form…</p>}>
          <BookingForm />
        </Suspense>
      </section>
    </main>
  );
}
