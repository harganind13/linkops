import React from "react";
import useReveal from "../hooks/useReveal";
import { Check, X } from "lucide-react";

const OLD_WAY = [
  "Inconsistent cold lists and burned domains",
  "SDRs context-switching between 5 tools",
  "Generic templates ignored by executives",
  "Volatile pipeline that swings month over month",
];

const LINKOPS_WAY = [
  "Verified ICP intelligence, refreshed weekly",
  "One source of truth — leads land in your CRM",
  "Narratives engineered for C-suite decision makers",
  "A stabilized foundation to scale revenue",
];

export default function Advantage({ onCtaClick }) {
  const headRef = useReveal();
  const colA = useReveal();
  const colB = useReveal();

  return (
    <section id="advantage" className="relative py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-4">— Why LinkOps</p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white"
              data-testid="advantage-headline"
            >
              Your sales team's<br />unfair advantage.
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="text-[#A3A3A3] text-base md:text-lg max-w-md">
              Most agencies sell <span className="text-white">leads</span>. We sell <span className="text-[#6BE05A]">predictability</span>.
              We remove the volatility of outbound — giving you a stabilized foundation to scale revenue.
            </p>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            ref={colA}
            data-testid="old-way-card"
            className="reveal bg-[#0F0F0F] border border-white/10 rounded-2xl p-8 md:p-10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white/70 tracking-tight">The old way</h3>
              <span className="text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">Volatile</span>
            </div>
            <ul className="space-y-4">
              {OLD_WAY.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-white/60">
                  <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-white/[0.04] border border-white/10">
                    <X className="w-3 h-3 text-white/40" />
                  </span>
                  <span className="text-sm md:text-base leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            ref={colB}
            data-testid="linkops-way-card"
            className="reveal relative bg-[#101010] border border-[#6BE05A]/30 rounded-2xl p-8 md:p-10 overflow-hidden"
          >
            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full glow-accent" aria-hidden />
            <div className="relative flex items-center justify-between mb-6">
              <h3 className="font-display text-2xl text-white tracking-tight">The LinkOps way</h3>
              <span className="text-xs text-[#6BE05A] border border-[#6BE05A]/40 rounded-full px-3 py-1 bg-[#6BE05A]/[0.06]">
                Predictable
              </span>
            </div>
            <ul className="relative space-y-4">
              {LINKOPS_WAY.map((p, i) => (
                <li key={i} className="flex items-start gap-3 text-white">
                  <span className="mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full bg-[#6BE05A]/15 border border-[#6BE05A]/40">
                    <Check className="w-3 h-3 text-[#6BE05A]" />
                  </span>
                  <span className="text-sm md:text-base leading-relaxed text-white/85">{p}</span>
                </li>
              ))}
            </ul>

            <button
              data-testid="advantage-cta"
              onClick={() => onCtaClick("advantage")}
              className="relative mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#0A0A0A] bg-[#6BE05A] hover:bg-[#58C248] rounded-full px-5 py-2.5 transition-colors"
            >
              Talk to a strategist →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
