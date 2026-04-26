import React, { useState, useCallback } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Impact from "../components/Impact";
import Framework from "../components/Framework";
import Proof from "../components/Proof";
import Advantage from "../components/Advantage";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import ContactModal from "../components/ContactModal";

export default function Landing() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("hero");

  const openModal = useCallback((src) => {
    setSource(src || "hero");
    setOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white" data-testid="landing-page">
      <Header onCtaClick={openModal} />
      <main>
        <Hero onCtaClick={openModal} />
        <Impact />
        <Framework />
        <Proof />
        <Advantage onCtaClick={openModal} />
        <FinalCTA onCtaClick={openModal} />
      </main>
      <Footer />
      <ContactModal
        open={open}
        onOpenChange={setOpen}
        source={source}
        title={
          source === "final"
            ? "Request your custom growth plan"
            : source === "advantage"
            ? "Talk to a LinkOps strategist"
            : "Secure your growth audit"
        }
      />
    </div>
  );
}
