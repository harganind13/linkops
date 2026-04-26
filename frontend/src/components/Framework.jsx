import React from "react";
import useReveal from "../hooks/useReveal";
import { Crosshair, MessagesSquare, Workflow, LineChart } from "lucide-react";

const PHASES = [
  {
    n: "01",
    title: "Targeted Intelligence",
    body: "We pinpoint your most profitable market segments with surgical precision — built on verified firmographics and intent.",
    Icon: Crosshair,
  },
  {
    n: "02",
    title: "Narrative Excellence",
    body: "We deploy high-converting messaging that resonates with executive decision-makers — every word earned, never sprayed.",
    Icon: MessagesSquare,
  },
  {
    n: "03",
    title: "Seamless Integration",
    body: "Leads arrive directly in your workflow, fully qualified and context-rich, ready for the final handshake.",
    Icon: Workflow,
  },
  {
    n: "04",
    title: "Scalable ROI",
    body: "A system that gets smarter and more efficient as your business grows — compounding returns, not flat retainers.",
    Icon: LineChart,
  },
];

function PhaseRow({ n, title, body, Icon, testId }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      data-testid={testId}
      className="reveal group grid grid-cols-12 gap-6 py-10 md:py-14 border-b border-white/10 hover:bg-white/[0.015] transition-colors px-2 -mx-2"
    >
      <div className="col-span-12 md:col-span-2 flex md:flex-col items-start md:items-start gap-3">
        <span className="font-display text-3xl md:text-4xl text-[#6BE05A]/70 tracking-tight">{n}</span>
        <Icon className="w-5 h-5 text-white/40 mt-1.5 md:mt-3" strokeWidth={1.5} />
      </div>
      <div className="col-span-12 md:col-span-5">
        <h3 className="font-display text-2xl md:text-3xl text-white tracking-tight">{title}</h3>
      </div>
      <div className="col-span-12 md:col-span-5">
        <p className="text-[#A3A3A3] text-base leading-relaxed max-w-md">{body}</p>
      </div>
    </div>
  );
}

export default function Framework() {
  const headRef = useReveal();
  return (
    <section id="framework" className="relative py-24 md:py-32 bg-[#080808]">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="reveal grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
          <div className="md:col-span-7">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-4">— The Framework</p>
            <h2
              className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white"
              data-testid="framework-headline"
            >
              The LinkOps<br />Results Framework.
            </h2>
          </div>
          <div className="md:col-span-5 flex md:items-end">
            <p className="text-[#A3A3A3] text-base md:text-lg max-w-md">
              Four phases. One outcome: a compounding system for revenue, not a campaign that ends.
            </p>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10">
          {PHASES.map((p, i) => (
            <PhaseRow
              key={p.n}
              n={p.n}
              title={p.title}
              body={p.body}
              Icon={p.Icon}
              testId={`phase-${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
