import React from "react";

const LOGO = "https://customer-assets.emergentagent.com/job_connector-scale/artifacts/fem20hxo_2-removebg-preview%20%281%29.png";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#070707]" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <img src={LOGO} alt="LinkOps" className="h-28 md:h-32 w-auto -my-6" />
          <p className="mt-4 text-[#A3A3A3] text-sm max-w-sm leading-relaxed">
            Predictable client acquisition systems for B2B revenue teams. Built once, compounded forever.
          </p>
        </div>
        <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">Company</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#framework" className="hover:text-white">Framework</a></li>
              <li><a href="#proof" className="hover:text-white">Case studies</a></li>
              <li><a href="#advantage" className="hover:text-white">Advantage</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">Contact</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="mailto:hello@linkops.io" className="hover:text-white">hello@linkops.io</a></li>
              <li><a href="#top" className="hover:text-white">Book a call</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/40 mb-3">Legal</p>
            <ul className="space-y-2 text-sm text-white/70">
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} LinkOps. All rights reserved.</p>
          <p className="text-xs text-white/40">Designed for revenue leaders who refuse volatility.</p>
        </div>
      </div>
    </footer>
  );
}
