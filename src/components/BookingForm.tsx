"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, Wrench, User } from "lucide-react";
import type { Service, Mechanic } from "@/lib/types";

const TIME_SLOTS = [
  "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

export default function BookingForm() {
  const searchParams = useSearchParams();
  const [services, setServices] = useState<Service[]>([]);
  const [mechanics, setMechanics] = useState<Mechanic[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [form, setForm] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceId: searchParams.get("service") ?? "",
    mechanicId: searchParams.get("mechanic") ?? "",
    vehicleInfo: "",
    preferredDate: "",
    preferredTime: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  useEffect(() => {
    async function load() {
      try {
        const [sRes, mRes] = await Promise.all([
          fetch("/api/services"),
          fetch("/api/mechanics"),
        ]);
        const sData = await sRes.json();
        const mData = await mRes.json();
        setServices(sData.services ?? []);
        setMechanics(mData.mechanics ?? []);
      } finally {
        setLoadingData(false);
      }
    }
    load();
  }, []);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-lg rounded-2xl border border-border bg-surface p-10 text-center shadow-sm">
        <CheckCircle2 className="mx-auto mb-4 text-race-red" size={52} />
        <h2 className="font-[family-name:var(--font-racing)] text-2xl font-bold uppercase text-text">
          Bay Reserved!
        </h2>
        <p className="mt-3 text-sm text-text-muted">
          Your booking request has been sent to the pit crew. We&apos;ll confirm your appointment
          by email or phone shortly.
        </p>
        <a
          href="/"
          className="mt-6 inline-block rounded-md bg-race-red px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-race-red-dark"
        >
          Back to Home
        </a>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Full Name
          </label>
          <input
            required
            value={form.customerName}
            onChange={(e) => update("customerName", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
            placeholder="Jane Driver"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
            placeholder="jane@email.com"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Phone
          </label>
          <input
            required
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Vehicle Info
          </label>
          <input
            required
            value={form.vehicleInfo}
            onChange={(e) => update("vehicleInfo", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
            placeholder="2019 Porsche 911 GT3 — Plate #ABC123"
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-muted">
            <Wrench size={13} /> Choose a Service
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {loadingData && <p className="text-sm text-text-muted">Loading services…</p>}
            {services.map((s) => (
              <button
                type="button"
                key={s.id}
                onClick={() => update("serviceId", String(s.id))}
                className={`rounded-md border px-4 py-2.5 text-left text-sm transition ${
                  String(s.id) === form.serviceId
                    ? "border-race-red bg-race-red/10 text-race-red"
                    : "border-border text-text hover:border-race-red/50"
                }`}
              >
                <span className="block font-semibold">{s.name}</span>
                <span className="text-xs text-text-muted">From ${s.priceFrom} · {s.durationMinutes} min</span>
              </button>
            ))}
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-2 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-text-muted">
            <User size={13} /> Choose a Mechanic (optional)
          </label>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <button
              type="button"
              onClick={() => update("mechanicId", "")}
              className={`rounded-md border px-4 py-2.5 text-left text-sm transition ${
                form.mechanicId === ""
                  ? "border-race-red bg-race-red/10 text-race-red"
                  : "border-border text-text hover:border-race-red/50"
              }`}
            >
              No preference — assign fastest available
            </button>
            {mechanics.map((m) => (
              <button
                type="button"
                key={m.id}
                onClick={() => update("mechanicId", String(m.id))}
                className={`rounded-md border px-4 py-2.5 text-left text-sm transition ${
                  String(m.id) === form.mechanicId
                    ? "border-race-red bg-race-red/10 text-race-red"
                    : "border-border text-text hover:border-race-red/50"
                }`}
              >
                <span className="block font-semibold">{m.name}</span>
                <span className="text-xs text-text-muted">{m.specialty}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Preferred Date
          </label>
          <input
            required
            type="date"
            min={today}
            value={form.preferredDate}
            onChange={(e) => update("preferredDate", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Preferred Time
          </label>
          <select
            required
            value={form.preferredTime}
            onChange={(e) => update("preferredTime", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Notes for the Crew (optional)
          </label>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            className="w-full resize-none rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
            placeholder="Describe the issue or anything the mechanic should know..."
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-race-red">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading" || !form.serviceId}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-race-red py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark disabled:opacity-50"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Confirm Booking
      </button>
    </form>
  );
}
