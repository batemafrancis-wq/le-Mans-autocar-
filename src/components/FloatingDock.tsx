"use client";

import { useState } from "react";
import { Star, Share2, X } from "lucide-react";
import { WhatsAppIcon, FacebookIcon, InstagramIcon, XIcon, TikTokIcon } from "@/components/icons";
import RatingModal from "@/components/RatingModal";

const socials = [
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { icon: XIcon, href: "https://twitter.com", label: "X / Twitter" },
  { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
];

export default function FloatingDock() {
  const [socialOpen, setSocialOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {socialOpen && (
          <div className="flex flex-col items-end gap-2.5">
            {socials.map(({ icon: Icon, href, label }, i) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ animationDelay: `${i * 40}ms` }}
                className="animate-float flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-2 text-xs font-semibold text-text shadow-lg transition hover:border-race-red hover:text-race-red"
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </a>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => setRatingOpen(true)}
          aria-label="Rate us"
          className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-race-red shadow-lg transition hover:scale-105"
        >
          <Star size={20} />
        </button>

        <a
          href="https://wa.me/15552401924"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="animate-pulse-glow flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105"
        >
          <WhatsAppIcon size={26} />
        </a>

        <button
          type="button"
          onClick={() => setSocialOpen((v) => !v)}
          aria-label="Toggle social links"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-ink text-white shadow-lg transition hover:scale-105"
        >
          {socialOpen ? <X size={20} /> : <Share2 size={18} />}
        </button>
      </div>

      <RatingModal open={ratingOpen} onClose={() => setRatingOpen(false)} />
    </>
  );
}
