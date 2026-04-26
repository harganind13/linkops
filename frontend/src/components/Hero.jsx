import React from "react";
import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import TrendChart from "./TrendChart";

export default function Hero({ onCtaClick }) {
  return (
    <section id="top" className="relative pt-40 md:pt-52 pb-16 md:pb-24 overflow-hidden">
      {/* Background grid + glow */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, rgba(107,224,90,0.35), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
            <div
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70"
              data-testid="hero-badge"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#6BE05A]" />
              Outbound systems for B2B teams that want predictability
            </div>

            <h1
              className="font-display mt-6 text-[44px] sm:text-6xl lg:text-7xl font-medium tracking-tighter leading-[1.02] text-white"
              data-testid="hero-headline"
            >
              Consistent Pipeline.
              <br />
              <span className="text-white/85">Zero </span>
              <span className="relative inline-block">
                <span className="relative z-10 text-[#6BE05A]">Manual Effort.</span>
                <span className="absolute -bottom-1 left-0 right-0 h-[6px] bg-[#6BE05A]/15 -z-0 rounded-sm" />
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-[#A3A3A3] leading-relaxed" data-testid="hero-sub">
              We architect high-performance client acquisition systems that deliver qualified meetings to your calendar
              every week. Stop worrying about where your next deal is coming from.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                data-testid="hero-cta-primary"
                onClick={() => onCtaClick("hero")}
                className="bg-[#6BE05A] hover:bg-[#58C248] text-[#0A0A0A] font-semibold rounded-full px-7 py-6 text-base"
              >
                Secure Your Growth Audit <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a
                href="#framework"
                data-testid="hero-cta-secondary"
                className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-medium text-white/80 border border-white/15 hover:bg-white/5 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("framework")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                See the framework
              </a>
            </div>

            <div className="mt-10 flex items-center gap-6 text-xs text-white/45">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#1f1f1f] border border-white/10" />
                <div className="w-7 h-7 rounded-full bg-[#262626] border border-white/10" />
                <div className="w-7 h-7 rounded-full bg-[#1f1f1f] border border-white/10" />
              </div>
              <span>Trusted by revenue teams from Series A to Enterprise</span>
            </div>
          </div>

          {/* Right: trend chart */}
          <div className="lg:col-span-5 h-[420px] md:h-[460px]">
            <TrendChart />
          </div>
        </div>
      </div>
    </section>
  );
}
