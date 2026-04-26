import React, { Suspense, lazy } from "react";
import useReveal from "../hooks/useReveal";
import useInView from "../hooks/useInView";
import { Button } from "../components/ui/button";
import { ArrowRight } from "lucide-react";

const NetworkNodes3D = lazy(() => import("./three/NetworkNodes3D"));

export default function FinalCTA({ onCtaClick }) {
  const ref = useReveal();
  const [bgRef, bgInView] = useInView("400px");
  return (
    <section
      id="final-cta"
      ref={bgRef}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* 3D network background */}
      <div className="absolute inset-0 opacity-70 pointer-events-none">
        <Suspense fallback={null}>
          {bgInView && <NetworkNodes3D nodeCount={42} linkDistance={1.8} />}
        </Suspense>
      </div>
      <div className="absolute inset-0 bg-grid opacity-30" aria-hidden />
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[700px] rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(closest-side, rgba(107,224,90,0.30), transparent 70%)" }}
        aria-hidden
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        <div ref={ref} className="reveal">
          <p className="text-xs uppercase tracking-[0.22em] text-[#6BE05A] mb-6">— Final word</p>
          <h2
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white leading-[0.95]"
            data-testid="final-cta-headline"
          >
            Stop Guessing.<br />
            <span className="text-[#6BE05A]">Start Closing.</span>
          </h2>
          <p className="mt-8 text-[#A3A3A3] text-base md:text-lg max-w-xl mx-auto">
            Ready to see what your pipeline looks like when it's fully optimized?
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              data-testid="final-cta-button"
              onClick={() => onCtaClick("final")}
              className="bg-[#6BE05A] hover:bg-[#58C248] text-[#0A0A0A] font-semibold rounded-full px-8 py-6 text-base"
            >
              Request Your Custom Growth Plan <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <a
              href="mailto:hello@linkops.io"
              data-testid="final-cta-email"
              className="text-sm text-white/60 hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              or email hello@linkops.io
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
