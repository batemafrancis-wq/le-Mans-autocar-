import Link from "next/link";
import { Flag, MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon, InstagramIcon, XIcon, YoutubeIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-white">
      <div className="checkered-strip h-2 w-full opacity-80" />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-md bg-race-red text-white">
              <Flag size={18} strokeWidth={2.5} />
            </span>
            <span className="font-[family-name:var(--font-racing)] text-lg font-bold uppercase tracking-wider">
              Le Mans <span className="text-race-red">AutoWorks</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Endurance-grade automotive care. Inspired by 24 hours of relentless racing, built for
            a lifetime of the open road.
          </p>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-racing)] text-sm font-bold uppercase tracking-widest text-race-red">
            Navigate
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/mechanics" className="hover:text-white">Meet the Crew</Link></li>
            <li><Link href="/booking" className="hover:text-white">Book a Bay</Link></li>
            <li><Link href="/contact" className="hover:text-white">Inquiries</Link></li>
            <li><Link href="/admin" className="hover:text-white">Admin Access</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-racing)] text-sm font-bold uppercase tracking-widest text-race-red">
            Pit Lane HQ
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-race-red" />
              12 Circuit de la Sarthe Way, Motor District
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="shrink-0 text-race-red" />
              +1 (555) 240-1924
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="shrink-0 text-race-red" />
              pitcrew@lemansautoworks.com
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-[family-name:var(--font-racing)] text-sm font-bold uppercase tracking-widest text-race-red">
            Follow the Race
          </h4>
          <div className="mt-4 flex gap-3">
            {[
              { icon: FacebookIcon, href: "https://facebook.com" },
              { icon: InstagramIcon, href: "https://instagram.com" },
              { icon: XIcon, href: "https://twitter.com" },
              { icon: YoutubeIcon, href: "https://youtube.com" },
            ].map(({ icon: Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-race-red hover:text-race-red"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className="mt-5 text-xs uppercase tracking-widest text-white/40">
            Open 24 Hours. Every Day. Just Like the Race.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/40">
        © {new Date().getFullYear()} Le Mans AutoWorks. Built for endurance.
      </div>
    </footer>
  );
}
