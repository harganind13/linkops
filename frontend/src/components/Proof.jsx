import React from "react";
import useReveal from "../hooks/useReveal";
import { Quote, ArrowUpRight } from "lucide-react";

const PORTRAITS = [
  "https://images.unsplash.com/photo-1745060594679-61578eb592f7?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzNzl8MHwxfHNlYXJjaHwyfHxleGVjdXRpdmUlMjBwb3J0cmFpdCUyMGRhcmt8ZW58MHx8fHwxNzc3MTY2OTgzfDA&ixlib=rb-4.1.0&q=85",
  "https://images.pexels.com/photos/27015643/pexels-photo-27015643.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
  "https://images.pexels.com/photos/10657877/pexels-photo-10657877.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
];

const TESTIMONIALS = [
  {
    quote: "LinkOps doubled our outbound volume without us hiring a single new rep. The pipeline is steady — finally.",
    name: "Marcus Reed",
    role: "VP Revenue, Northvale SaaS",
    img: PORTRAITS[0],
  },
  {
    quote: "We replaced two SDRs and an agency retainer. The maths spoke for itself by month two.",
    name: "Elena Park",
    role: "COO, Helix Industries",
    img: PORTRAITS[1],
  },
  {
    quote: "Our reps now spend their days closing, not prospecting. That's the unfair advantage.",
    name: "Daniel Osei",
    role: "Head of Sales, Atlas Cyber",
    img: PORTRAITS[2],
  },
];

const LOGOS = [
  "Northvale", "Helix", "Atlas Cyber", "Lumière", "Pinecrest", "Vector", "Quanta", "Brightline",
];

function TestimonialCard({ t, testId }) {
  const ref = useReveal();
  return (
    <figure
      ref={ref}
      data-testid={testId}
      className="reveal bg-[#101010] border border-white/10 rounded-2xl p-8 md:p-10 flex flex-col h-full hover:border-white/20 transition-colors"
    >
      <Quote className="w-6 h-6 text-[#6BE05A] mb-6" strokeWidth={1.5} />
      <blockquote className="font-display text-xl md:text-2xl text-white leading-snug tracking-tight">
        "{t.quote}"
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 pt-6 border-t border-white/10">
        <img
          src={t.img}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover grayscale"
          loading="lazy"
        />
        <div>
          <p className="text-white text-sm font-medium">{t.name}</p>
          <p className="text-white/50 text-xs">{t.role}</p>
        </div>
      </figcaption>
    </figure>
  );
}

export default function Proof() {
  const headRef = useReveal();
  const caseRef = useReveal();
  return (
    <section id="proof" className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headRef} className="reveal max-w-3xl">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-4">— Social Proof</p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-white" data-testid="proof-headline">
            Built for Scale.
          </h2>
          <p className="mt-5 text-[#A3A3A3] max-w-xl">
            What revenue leaders say after 90 days of working with LinkOps.
          </p>
        </div>

        {/* Logo strip */}
        <div className="relative mt-12 overflow-hidden border-y border-white/10 py-6" data-testid="logo-strip">
          <div className="marquee-track flex gap-14 whitespace-nowrap">
            {[...LOGOS, ...LOGOS].map((l, i) => (
              <span key={i} className="font-display text-white/40 text-xl tracking-tight">
                {l}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard t={t} key={i} testId={`testimonial-${i + 1}`} />
          ))}
        </div>

        {/* Case study card */}
        <div
          ref={caseRef}
          data-testid="case-study"
          className="reveal mt-10 grid grid-cols-1 lg:grid-cols-12 gap-0 bg-gradient-to-br from-[#101010] to-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden"
        >
          <div className="lg:col-span-7 p-8 md:p-12">
            <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-4">Case study</p>
            <h3 className="font-display text-3xl md:text-4xl text-white tracking-tight leading-tight">
              How we helped a B2B partner achieve a <span className="text-[#6BE05A]">4x return</span> on investment within the first 90 days.
            </h3>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1">B2B SaaS</span>
              <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1">Series B</span>
              <span className="text-xs text-white/60 border border-white/10 rounded-full px-3 py-1">90-day window</span>
            </div>
          </div>
          <div className="lg:col-span-5 grid grid-cols-2 gap-px bg-white/10">
            <div className="bg-[#0A0A0A] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Pipeline</p>
              <p className="font-display text-3xl md:text-4xl text-white mt-2">$3.8M</p>
              <p className="text-xs text-white/50 mt-1">In 90 days</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-widest text-white/40">ROI</p>
              <p className="font-display text-3xl md:text-4xl text-[#6BE05A] mt-2">4.0×</p>
              <p className="text-xs text-white/50 mt-1">Net of fees</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 md:p-8">
              <p className="text-[10px] uppercase tracking-widest text-white/40">Meetings</p>
              <p className="font-display text-3xl md:text-4xl text-white mt-2">217</p>
              <p className="text-xs text-white/50 mt-1">Qualified</p>
            </div>
            <div className="bg-[#0A0A0A] p-6 md:p-8 flex flex-col justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/40">Outcome</p>
                <p className="font-display text-2xl text-white mt-2">Predictable</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#6BE05A] mt-3" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
