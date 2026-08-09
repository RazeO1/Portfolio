"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // Sync scroll locking on body during loader
  useEffect(() => {
    if (!isLoaded) {
      document.body.classList.add("loading");
    }
    return () => {
      document.body.classList.remove("loading");
    };
  }, [isLoaded]);

  return (
    <main className="relative w-full min-h-screen bg-[#fcf7f3]">
      {showLoader && (
        <Loader
          onComplete={() => {
            setIsLoaded(true);
            // Allow the exit scatter animation to finish playing before removing from DOM
            setTimeout(() => {
              setShowLoader(false);
            }, 300);
          }}
        />
      )}

      {/* Hero section pinned stickily to top: 0, z-index: 1 */}
      <div className="sticky top-0 w-full h-screen z-10 overflow-hidden">
        <Hero active={isLoaded} />
      </div>

      {/* About and subsequent sections scroll relative over the Hero, z-index: 2 */}
      <div className="relative z-20 w-full">
        <About active={isLoaded} />

        {/* Section 03 / Selected Works placeholder */}
        <section
          id="projects"
          className="relative w-full min-h-screen bg-[#fcf7f3] border-t border-black/10 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 select-none"
        >
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#e35342]">
              Section 03 / Selected Works
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-black">
              Projects
            </h2>
            <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
              Case studies coming soon • Scroll to explore further
            </p>
          </div>
        </section>

        {/* Section 04 / Get in Touch placeholder */}
        <section
          id="contact"
          className="relative w-full min-h-screen bg-[#f3f0ed] border-t border-black/10 flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 select-none"
        >
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#d5802a]">
              Section 04 / Get in Touch
            </span>
            <h2 className="font-display font-bold text-4xl md:text-6xl text-black">
              Contact
            </h2>
            <p className="font-mono text-xs md:text-sm text-neutral-500 uppercase tracking-widest">
              Let's connect • Contact info coming soon
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
