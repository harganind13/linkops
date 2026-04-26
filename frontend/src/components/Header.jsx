import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LOGO = "https://customer-assets.emergentagent.com/job_connector-scale/artifacts/fem20hxo_2-removebg-preview%20%281%29.png";

const NAV = [
  { id: "framework", label: "Framework" },
  { id: "impact", label: "Impact" },
  { id: "proof", label: "Proof" },
  { id: "advantage", label: "Advantage" },
];

export default function Header({ onCtaClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0A0A0A]/85 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-24 md:h-28 flex items-center justify-between">
        <a href="#top" data-testid="logo-link" className="flex items-center gap-2">
          <img src={LOGO} alt="LinkOps" className="h-32 md:h-40 lg:h-44 w-auto select-none -my-6" draggable="false" />
        </a>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {NAV.map((n) => (
            <button
              key={n.id}
              data-testid={`nav-${n.id}`}
              onClick={() => goTo(n.id)}
              className="text-sm text-white/70 hover:text-white transition-colors"
            >
              {n.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            data-testid="header-cta"
            onClick={() => onCtaClick("header")}
            className="hidden sm:inline-flex bg-[#6BE05A] hover:bg-[#58C248] text-[#0A0A0A] font-semibold rounded-full px-5 py-2 h-10"
          >
            Book a call <ArrowUpRight className="w-4 h-4 ml-1.5" />
          </Button>
          <button
            data-testid="mobile-menu-toggle"
            className="md:hidden text-white p-2"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0A0A0A] border-t border-white/10">
          <div className="px-6 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => goTo(n.id)}
                className="text-left text-white/80 py-2 border-b border-white/5"
                data-testid={`mobile-nav-${n.id}`}
              >
                {n.label}
              </button>
            ))}
            <Button
              onClick={() => { setOpen(false); onCtaClick("mobile-header"); }}
              className="bg-[#6BE05A] hover:bg-[#58C248] text-[#0A0A0A] font-semibold rounded-full mt-2"
              data-testid="mobile-header-cta"
            >
              Book a call
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
