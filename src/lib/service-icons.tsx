import {
  Wrench,
  Gauge,
  Cog,
  ShieldCheck,
  Sparkles,
  Timer,
  Car,
  Droplet,
  Zap,
  Search,
  type LucideIcon,
} from "lucide-react";

export const SERVICE_ICONS: Record<string, LucideIcon> = {
  wrench: Wrench,
  gauge: Gauge,
  cog: Cog,
  shield: ShieldCheck,
  sparkles: Sparkles,
  timer: Timer,
  car: Car,
  droplet: Droplet,
  zap: Zap,
  search: Search,
};

export function getServiceIcon(icon: string): LucideIcon {
  return SERVICE_ICONS[icon] ?? Wrench;
}
