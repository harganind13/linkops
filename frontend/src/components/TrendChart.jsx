import React from "react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { m: "W1", v: 12 },
  { m: "W2", v: 18 },
  { m: "W3", v: 22 },
  { m: "W4", v: 31 },
  { m: "W5", v: 39 },
  { m: "W6", v: 48 },
  { m: "W7", v: 57 },
  { m: "W8", v: 71 },
  { m: "W9", v: 84 },
  { m: "W10", v: 96 },
];

export default function TrendChart() {
  return (
    <div className="relative h-full w-full" data-testid="hero-trend-chart">
      <div className="absolute inset-0 glow-accent rounded-3xl" aria-hidden />
      <div className="relative bg-[#0F0F0F]/70 border border-white/10 rounded-3xl p-6 md:p-8 backdrop-blur-sm h-full flex flex-col">
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/50">Qualified Opportunities</p>
            <p className="font-display text-3xl md:text-4xl text-white tracking-tight mt-2">+ 312%</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-white/50">Last 90 days</p>
            <p className="text-[#6BE05A] text-sm font-medium mt-1">▲ Trending up</p>
          </div>
        </div>

        <div className="flex-1 min-h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 16, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6BE05A" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#6BE05A" stopOpacity={1} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "#5a5a5a", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#5a5a5a", fontSize: 11 }} axisLine={false} tickLine={false} width={28} />
              <Tooltip
                contentStyle={{ background: "#0A0A0A", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#fff" }}
                cursor={{ stroke: "#6BE05A", strokeWidth: 1, strokeDasharray: "3 3" }}
              />
              <Line
                type="monotone"
                dataKey="v"
                stroke="url(#lineGrad)"
                strokeWidth={2.5}
                dot={{ r: 0 }}
                activeDot={{ r: 5, fill: "#6BE05A", stroke: "#0A0A0A", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
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
