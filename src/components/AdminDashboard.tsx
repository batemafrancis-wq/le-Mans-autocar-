"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Star,
  MessageSquare,
  CalendarCheck,
  LogOut,
  Check,
  X,
  Trash2,
  Loader2,
} from "lucide-react";
import type { Review, Inquiry, Booking } from "@/lib/types";

type Tab = "reviews" | "inquiries" | "bookings";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-500/15 text-yellow-500",
  confirmed: "bg-blue-500/15 text-blue-500",
  completed: "bg-green-500/15 text-green-500",
  cancelled: "bg-red-500/15 text-red-500",
  new: "bg-yellow-500/15 text-yellow-500",
  read: "bg-blue-500/15 text-blue-500",
  responded: "bg-green-500/15 text-green-500",
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("reviews");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [rRes, iRes, bRes] = await Promise.all([
        fetch("/api/reviews?all=1"),
        fetch("/api/inquiries"),
        fetch("/api/bookings"),
      ]);
      const [rData, iData, bData] = await Promise.all([rRes.json(), iRes.json(), bRes.json()]);
      setReviews(rData.reviews ?? []);
      setInquiries(iData.inquiries ?? []);
      setBookings(bData.bookings ?? []);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin");
    router.refresh();
  }

  async function setReviewApproval(id: number, approved: boolean) {
    setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, approved } : r)));
    await fetch(`/api/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ approved }),
    });
  }

  async function deleteReview(id: number) {
    setReviews((prev) => prev.filter((r) => r.id !== id));
    await fetch(`/api/reviews/${id}`, { method: "DELETE" });
  }

  async function setInquiryStatus(id: number, status: string) {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status } : i)));
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function setBookingStatus(id: number, status: string) {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  const pendingReviews = reviews.filter((r) => !r.approved).length;
  const newInquiries = inquiries.filter((i) => i.status === "new").length;
  const pendingBookings = bookings.filter((b) => b.status === "pending").length;

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-[family-name:var(--font-racing)] text-2xl font-black uppercase text-text">
            Pit Wall Dashboard
          </h1>
          <p className="text-sm text-text-muted">
            Review ratings, manage inquiries, and track bookings.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-text transition hover:border-race-red hover:text-race-red"
        >
          <LogOut size={15} /> Sign Out
        </button>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Star} label="Reviews Pending" value={pendingReviews} />
        <StatCard icon={MessageSquare} label="New Inquiries" value={newInquiries} />
        <StatCard icon={CalendarCheck} label="Pending Bookings" value={pendingBookings} />
      </div>

      <div className="mb-6 flex gap-2 border-b border-border">
        {[
          { key: "reviews" as const, label: "Ratings & Reviews", icon: Star },
          { key: "inquiries" as const, label: "Inquiries", icon: MessageSquare },
          { key: "bookings" as const, label: "Bookings", icon: CalendarCheck },
        ].map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-1.5 border-b-2 px-4 py-3 text-sm font-bold uppercase tracking-wide transition ${
              tab === key
                ? "border-race-red text-race-red"
                : "border-transparent text-text-muted hover:text-text"
            }`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20 text-text-muted">
          <Loader2 className="animate-spin" size={28} />
        </div>
      ) : (
        <>
          {tab === "reviews" && (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {reviews.length === 0 && <EmptyState text="No reviews submitted yet." />}
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-text">{review.name}</p>
                      <div className="mt-1 flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={14}
                            className={idx < review.rating ? "fill-race-red text-race-red" : "text-border"}
                          />
                        ))}
                      </div>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
                        review.approved ? STATUS_COLORS.responded : STATUS_COLORS.new
                      }`}
                    >
                      {review.approved ? "Live on Site" : "Pending Review"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-text-muted">&ldquo;{review.comment}&rdquo;</p>
                  <div className="mt-4 flex gap-2">
                    {!review.approved ? (
                      <button
                        onClick={() => setReviewApproval(review.id, true)}
                        className="flex items-center gap-1.5 rounded-md bg-race-red px-3 py-2 text-xs font-bold uppercase text-white hover:bg-race-red-dark"
                      >
                        <Check size={13} /> Approve & Publish
                      </button>
                    ) : (
                      <button
                        onClick={() => setReviewApproval(review.id, false)}
                        className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-bold uppercase text-text hover:border-race-red hover:text-race-red"
                      >
                        <X size={13} /> Unpublish
                      </button>
                    )}
                    <button
                      onClick={() => deleteReview(review.id)}
                      className="flex items-center gap-1.5 rounded-md border border-border px-3 py-2 text-xs font-bold uppercase text-text-muted hover:border-race-red hover:text-race-red"
                    >
                      <Trash2 size={13} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "inquiries" && (
            <div className="space-y-4">
              {inquiries.length === 0 && <EmptyState text="No inquiries submitted yet." />}
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-text">{inquiry.subject}</p>
                      <p className="text-xs text-text-muted">
                        {inquiry.name} · {inquiry.email} {inquiry.phone && `· ${inquiry.phone}`}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-surface-2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-text-muted">
                        {inquiry.department}
                      </span>
                    </div>
                    <select
                      value={inquiry.status}
                      onChange={(e) => setInquiryStatus(inquiry.id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wide outline-none ${STATUS_COLORS[inquiry.status]}`}
                    >
                      <option value="new">New</option>
                      <option value="read">Read</option>
                      <option value="responded">Responded</option>
                    </select>
                  </div>
                  <p className="mt-3 text-sm text-text-muted">{inquiry.message}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "bookings" && (
            <div className="space-y-4">
              {bookings.length === 0 && <EmptyState text="No bookings yet." />}
              {bookings.map((booking) => (
                <div key={booking.id} className="rounded-2xl border border-border bg-surface p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-bold text-text">{booking.customerName}</p>
                      <p className="text-xs text-text-muted">
                        {booking.email} · {booking.phone}
                      </p>
                      <p className="mt-1 text-xs text-text-muted">{booking.vehicleInfo}</p>
                      <p className="mt-1 text-xs font-semibold text-race-red">
                        {booking.preferredDate} at {booking.preferredTime}
                      </p>
                    </div>
                    <select
                      value={booking.status}
                      onChange={(e) => setBookingStatus(booking.id, e.target.value)}
                      className={`rounded-full border-0 px-3 py-1.5 text-xs font-bold uppercase tracking-wide outline-none ${STATUS_COLORS[booking.status]}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                  {booking.notes && (
                    <p className="mt-3 rounded-md bg-surface-2 p-3 text-sm text-text-muted">
                      {booking.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Star;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-surface p-5">
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-race-red/10 text-race-red">
        <Icon size={20} />
      </span>
      <div>
        <p className="font-[family-name:var(--font-racing)] text-2xl font-black text-text">
          {value}
        </p>
        <p className="text-xs uppercase tracking-wide text-text-muted">{label}</p>
      </div>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-text-muted">
      {text}
    </div>
  );
}
