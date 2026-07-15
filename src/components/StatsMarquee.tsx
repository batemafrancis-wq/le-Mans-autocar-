const stats = [
  { label: "Years of Craft", value: "18+" },
  { label: "Endurance Hours Logged", value: "24,000+" },
  { label: "Cars Serviced", value: "9,600+" },
  { label: "Certified Mechanics", value: "22" },
  { label: "Customer Satisfaction", value: "98%" },
  { label: "Race-Prepped Builds", value: "340+" },
];

export default function StatsMarquee() {
  const items = [...stats, ...stats];
  return (
    <div className="speed-line border-y border-race-red/40 bg-ink py-5">
      <div className="flex w-max animate-marquee gap-14">
        {items.map((s, i) => (
          <div key={i} className="flex items-center gap-3 whitespace-nowrap">
            <span className="font-[family-name:var(--font-racing)] text-2xl font-black text-race-red">
              {s.value}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              {s.label}
            </span>
            <span className="ml-8 text-race-red/50">/</span>
          </div>
        ))}
      </div>
    </div>
  );
}
