"use client";

import { useState } from "react";
import { Star, X, Loader2, CheckCircle2 } from "lucide-react";

export default function RatingModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  if (!open) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !comment || rating === 0) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, rating, comment }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setStatus("idle");
      setName("");
      setRating(0);
      setComment("");
    }, 300);
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-surface p-7 shadow-2xl">
        <button
          onClick={handleClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-text-muted transition hover:bg-surface-2 hover:text-race-red"
        >
          <X size={18} />
        </button>

        {status === "done" ? (
          <div className="flex flex-col items-center py-8 text-center">
            <CheckCircle2 className="mb-4 text-race-red" size={48} />
            <h3 className="font-[family-name:var(--font-racing)] text-xl font-bold uppercase text-text">
              Checkered Flag!
            </h3>
            <p className="mt-2 text-sm text-text-muted">
              Thanks for the feedback — our team reviews every rating before it hits the home
              page.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 rounded-md bg-race-red px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-race-red-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <h3 className="font-[family-name:var(--font-racing)] text-xl font-bold uppercase text-text">
              Rate Your Pit Stop
            </h3>
            <p className="mt-1 text-sm text-text-muted">
              Tell us how we performed. Approved reviews are featured on our home page.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div className="flex justify-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    aria-label={`Rate ${star} stars`}
                  >
                    <Star
                      size={30}
                      className={
                        star <= (hoverRating || rating)
                          ? "fill-race-red text-race-red"
                          : "text-text-muted"
                      }
                    />
                  </button>
                ))}
              </div>

              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
              />
              <textarea
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience with our crew..."
                rows={4}
                className="w-full resize-none rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
              />

              {status === "error" && (
                <p className="text-sm text-race-red">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-race-red px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark disabled:opacity-60"
              >
                {status === "loading" && <Loader2 size={16} className="animate-spin" />}
                Submit Rating
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
