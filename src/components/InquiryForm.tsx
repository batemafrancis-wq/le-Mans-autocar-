"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

const DEPARTMENTS = [
  "General Inquiries",
  "Service & Repairs",
  "Parts & Accessories",
  "Sales & New Builds",
  "Customer Support",
  "Careers",
];

export default function InquiryForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: DEPARTMENTS[0],
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/inquiries", {
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
          Message Received
        </h2>
        <p className="mt-3 text-sm text-text-muted">
          Your inquiry has been routed to the {form.department} team. Expect a reply soon.
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-10"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
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
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Phone (optional)
          </label>
          <input
            value={form.phone}
            onChange={(e) => update("phone", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Department
          </label>
          <select
            value={form.department}
            onChange={(e) => update("department", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          >
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Subject
          </label>
          <input
            required
            value={form.subject}
            onChange={(e) => update("subject", e.target.value)}
            className="w-full rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-text-muted">
            Message
          </label>
          <textarea
            required
            rows={6}
            value={form.message}
            onChange={(e) => update("message", e.target.value)}
            className="w-full resize-none rounded-md border border-border bg-surface-2 px-4 py-2.5 text-sm text-text outline-none focus:border-race-red"
          />
        </div>
      </div>

      {status === "error" && (
        <p className="mt-4 text-sm text-race-red">Something went wrong. Please try again.</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-md bg-race-red py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark disabled:opacity-50"
      >
        {status === "loading" && <Loader2 size={16} className="animate-spin" />}
        Send Inquiry
      </button>
    </form>
  );
}
