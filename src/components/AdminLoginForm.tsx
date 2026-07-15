"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock, ShieldCheck } from "lucide-react";

export default function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      router.push("/admin/dashboard");
      router.refresh();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center px-6 py-16">
      <span className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-race-red/10 text-race-red">
        <ShieldCheck size={28} />
      </span>
      <h1 className="text-center font-[family-name:var(--font-racing)] text-2xl font-black uppercase text-text">
        Pit Wall Access
      </h1>
      <p className="mt-2 text-center text-sm text-text-muted">
        Admin sign-in for reviewing ratings, bookings, and inquiries.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-4">
        <div className="relative">
          <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="w-full rounded-md border border-border bg-surface-2 py-3 pl-11 pr-4 text-sm text-text outline-none focus:border-race-red"
          />
        </div>

        {status === "error" && (
          <p className="text-sm text-race-red">Incorrect password. Try again.</p>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-race-red py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark disabled:opacity-60"
        >
          {status === "loading" && <Loader2 size={16} className="animate-spin" />}
          Enter Pit Wall
        </button>
      </form>

      <p className="mt-6 text-xs text-text-muted">
        Default password: <code className="rounded bg-surface-2 px-1.5 py-0.5">endurance24</code>
      </p>
    </div>
  );
}
