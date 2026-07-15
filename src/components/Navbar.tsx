"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Flag } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/mechanics", label: "Mechanics" },
  { href: "/booking", label: "Book a Bay" },
  { href: "/contact", label: "Inquiries" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-race-red text-white">
            <Flag size={18} strokeWidth={2.5} />
          </span>
          <span className="font-[family-name:var(--font-racing)] text-lg font-bold uppercase tracking-wider text-text">
            Le Mans <span className="text-race-red">AutoWorks</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-semibold uppercase tracking-wide transition hover:text-race-red ${
                pathname === link.href ? "text-race-red" : "text-text"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggle />
          <Link
            href="/booking"
            className="animate-pulse-glow rounded-md bg-race-red px-5 py-2 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark"
          >
            Book Now
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-text"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-bg px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-md px-3 py-3 text-sm font-semibold uppercase tracking-wide transition hover:bg-surface-2 hover:text-race-red ${
                  pathname === link.href ? "text-race-red" : "text-text"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/booking"
              className="mt-2 rounded-md bg-race-red px-4 py-3 text-center text-sm font-bold uppercase tracking-wide text-white"
            >
              Book Now
            </Link>
            <Link
              href="/admin"
              className="mt-1 rounded-md px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-text-muted"
            >
              Admin Access
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
