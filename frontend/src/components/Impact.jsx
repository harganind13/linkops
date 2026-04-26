import React from "react";
import useReveal from "../hooks/useReveal";
import { TrendingUp, Clock, ShieldCheck, Activity } from "lucide-react";

const METRICS = [
  {
    id: "metric-1",
    value: "35%",
    label: "Average increase in sales-ready opportunities",
    icon: TrendingUp,
    span: "lg:col-span-2",
  },
  {
    id: "metric-2",
    value: "15+",
    label: "Hours reclaimed per week by your sales team",
    icon: Clock,
    span: "lg:col-span-1",
  },
  {
    id: "metric-3",
    value: "100%",
    label: "Verified outreach — zero-waste methodology",
    icon: ShieldCheck,
    span: "lg:col-span-1",
  },
  {
    id: "metric-4",
    value: "24/7",
    label: "Always-on market presence working in the background",
    icon: Activity,
    span: "lg:col-span-2",
  },
];

function MetricCard({ value, label, Icon, span, testId }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      data-testid={testId}
      className={`reveal group relative bg-[#101010] border border-white/10 rounded-2xl p-8 md:p-10 hover:-translate-y-1 hover:border-[#6BE05A]/30 transition-all duration-500 overflow-hidden ${span}`}
    >
      <div className="absolute -right-12 -top-12 w-40 h-40 rounded-full bg-[#6BE05A]/[0.04] group-hover:bg-[#6BE05A]/[0.08] transition-colors" aria-hidden />
      <div className="flex items-center justify-between">
        <Icon className="w-5 h-5 text-[#6BE05A]" strokeWidth={1.5} />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">Outcome</span>
      </div>
      <div className="mt-10">
        <p className="font-display text-5xl md:text-6xl lg:text-7xl font-medium tracking-tighter text-[#6BE05A] leading-none">
          {value}
        </p>
        <p className="mt-5 text-white/70 text-sm md:text-base max-w-sm leading-relaxed">{label}</p>
      </div>
    </div>
  );
}

export default function Impact() {
  const headRef = useReveal();
  return (
    <section id="impact" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="reveal max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-4">— The Impact</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white" data-testid="impact-headline">
            Numbers that move boards,<br />not vanity dashboards.
          </h2>
          <p className="mt-5 text-[#A3A3A3] max-w-xl">
            We measure what compounds revenue. Every campaign is engineered to produce sharper metrics quarter over quarter.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {METRICS.map((m) => (
            <MetricCard
              key={m.id}
              testId={m.id}
              value={m.value}
              label={m.label}
              Icon={m.icon}
              span={m.span}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
