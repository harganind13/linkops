import React from "react";
import TrendSpline3D from "./three/TrendSpline3D";

export default function TrendChart() {
  return (
    <div className="relative h-full w-full" data-testid="hero-trend-chart">
      <div className="absolute inset-0 glow-accent rounded-3xl" aria-hidden />
      <div className="relative bg-[#0F0F0F]/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm h-full flex flex-col overflow-hidden">
        <div className="flex items-start justify-between mb-2 z-10 relative">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">Qualified Opportunities</p>
            <p className="font-display text-3xl md:text-4xl text-white tracking-tight mt-2">+ 312%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">Last 90 days</p>
            <p className="text-[#6BE05A] text-sm font-medium mt-1">▲ Trending up</p>
          </div>
        </div>

        <div className="relative flex-1 min-h-[260px] -mx-6 md:-mx-8 my-2">
          <TrendSpline3D />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/80" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#0F0F0F] to-transparent" />
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/10 z-10 relative">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Meetings</p>
            <p className="font-display text-white text-lg">142</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Reply Rate</p>
            <p className="font-display text-white text-lg">11.4%</p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-widest text-white/40">Pipeline</p>
            <p className="font-display text-[#6BE05A] text-lg">$2.4M</p>
          </div>
        </div>
      </div>
    </div>
  );
}
