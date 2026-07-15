"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Flag, Wrench } from "lucide-react";
import { HERO_VIDEO } from "@/lib/media";

export default function HeroScrollVideo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.45, 0.85]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div ref={containerRef} className="relative h-[220vh] perspective-container">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
        <motion.video
          style={{ scale }}
          className="absolute inset-0 h-full w-full object-cover"
          src={HERO_VIDEO.src}
          poster={HERO_VIDEO.poster}
          autoPlay
          muted
          loop
          playsInline
        />
        <motion.div
          style={{ opacity: overlayOpacity }}
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black"
        />
        <div className="absolute inset-0 checkered-strip opacity-[0.06] mix-blend-overlay" />

        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
        >
          <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-race-red/50 bg-race-red/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-race-red">
            <Flag size={13} /> 24 Hours. Zero Compromise.
          </span>
          <h1 className="max-w-4xl font-[family-name:var(--font-racing)] text-[clamp(2.4rem,7vw,5.5rem)] font-black uppercase leading-[0.95] text-white">
            Built for <span className="text-gradient-red">Endurance.</span>
            <br />
            Engineered to <span className="text-gradient-red">Win.</span>
          </h1>
          <p className="mt-6 max-w-xl text-balance text-base text-white/75 sm:text-lg">
            Le Mans AutoWorks brings the discipline of the world&apos;s toughest endurance race
            to every vehicle that rolls into our garage — precision diagnostics, race-grade
            builds, and mechanics who never quit before the finish line.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/booking"
              className="flex items-center gap-2 rounded-md bg-race-red px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-race-red-dark"
            >
              <Wrench size={16} /> Book a Bay
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:border-race-red hover:text-race-red"
            >
              Browse Services
            </Link>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <ChevronDown size={18} className="animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
}
