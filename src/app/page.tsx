"use client";

import { useState, useEffect } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Lenis from "lenis";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // Sync scroll locking on body during loader & initialize Lenis smooth scroll
  useEffect(() => {
    if (!isLoaded) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
    return () => {
      document.body.classList.remove("loading");
    };
  }, [isLoaded]);

  // Global Lenis smooth scroll initialization
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5]">
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

      <div className="relative z-20 w-full">
        <About active={isLoaded} />

        {/* Section 04 / Selected Works (Card Stack) - Black background */}
        <Projects />

        {/* Section 05 / Get in Touch - Black background */}
        <section
          id="contact"
          className="relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 select-none border-t border-white/5"
        >
          <div className="max-w-4xl space-y-6">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#d5802a]">
              Section 05 / Get in Touch
            </span>
            <h2 className="font-display font-medium text-4xl md:text-6xl text-white">
              Contact
            </h2>
            <p className="font-mono text-xs md:text-sm text-neutral-400 uppercase tracking-widest">
              Let&apos;s connect • Contact info coming soon
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
