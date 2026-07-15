"use client";

import { Star, Quote } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import type { Review } from "@/lib/types";

export default function ReviewsGrid({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <p className="text-center text-sm text-text-muted">
        No approved reviews yet — be the first to rate your experience!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {reviews.map((review, i) => (
        <RevealSection key={review.id} delay={i * 0.06}>
          <div className="h-full rounded-2xl border border-border bg-surface p-6 shadow-sm">
            <Quote className="text-race-red/40" size={26} />
            <div className="mt-3 flex gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <Star
                  key={idx}
                  size={15}
                  className={idx < review.rating ? "fill-race-red text-race-red" : "text-border"}
                />
              ))}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              &ldquo;{review.comment}&rdquo;
            </p>
            <p className="mt-4 font-[family-name:var(--font-racing)] text-sm font-bold uppercase tracking-wide text-text">
              — {review.name}
            </p>
          </div>
        </RevealSection>
      ))}
    </div>
  );
}
