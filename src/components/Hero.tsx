"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Hero3D from "./Hero3D";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

interface HeroProps {
  active: boolean;
  onOpenAbout: (side: "left" | "right", target?: string) => void;
}

export default function Hero({ active, onOpenAbout }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const portraitContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!active) return;

      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });

      // 1. Reveal the card frame (scale up slightly and border/shadow fade in)
      tl.fromTo(
        cardRef.current,
        {
          scale: 0.96,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // 2. Animate the giant background text sliding in from both sides (split effect)
      tl.fromTo(
        ".char-left",
        { x: -100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
        "-=0.9"
      );

      tl.fromTo(
        ".char-right",
        { x: 100, opacity: 0 },
        { x: 0, opacity: 1, duration: 1.4, ease: "power4.out" },
        "-=1.4"
      );

      // 3. Scale up and fade in the 3D Canvas Portrait
      tl.fromTo(
        portraitContainerRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: "elastic.out(0.5, 0.75)" },
        "-=1.0"
      );

      // 4. Fade/Slide in the UI headers, socials, and bottom titles
      tl.fromTo(
        ".hero-ui-element",
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 },
        "-=1.0"
      );
    },
    { dependencies: [active], scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className={`w-full min-h-screen flex items-center justify-center p-4 md:p-6 transition-all duration-1000 ${
        active ? "bg-[#fcf7f3]" : "bg-transparent opacity-0 pointer-events-none"
      }`}
    >
      {/* Outer Card Frame */}
      <div
        ref={cardRef}
        className="relative w-full h-[calc(100vh-2rem)] md:h-[calc(100vh-3rem)] rounded-xl border border-black flex flex-col justify-between overflow-hidden bg-[#f3f0ed] shadow-sm select-none"
      >
        {/* Subtle noise/paper overlay texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-20"></div>

        {/* 1. Header Navigation Bar - Structured as 3-column grid for perfect viewport centering */}
        <header className="hero-ui-element z-30 w-full px-6 py-4 grid grid-cols-3 items-center text-[10px] md:text-xs font-mono text-black uppercase tracking-wider">
          <div className="flex items-center gap-1 justify-start">
            <span className="font-bold">© Yash Raj</span>
            <span className="opacity-60 hidden sm:inline">— Design, AI & Software</span>
          </div>
          <nav className="flex justify-center gap-4 md:gap-8">
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                onOpenAbout("left", "about");
              }}
              className="hover:text-[#de3421] transition-colors duration-300 pointer-events-auto"
            >
              About
            </a>
            <a
              href="#showcase"
              onClick={(e) => {
                e.preventDefault();
                onOpenAbout("left", "about");
              }}
              className="hover:text-[#de3421] transition-colors duration-300 pointer-events-auto"
            >
              Showcase
            </a>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                onOpenAbout("left", "about");
              }}
              className="hover:text-[#de3421] transition-colors duration-300 pointer-events-auto"
            >
              Projects
            </a>
          </nav>
          <div className="flex justify-end">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onOpenAbout("left", "contact");
              }}
              className="hover:line-through font-bold pointer-events-auto"
            >
              Contact
            </a>
          </div>
        </header>

        {/* 2. Central Area: Unified "Yash [Portrait] Raj" Centerpiece */}
        <div className="relative flex-1 flex items-center justify-center w-full overflow-hidden">
          <div className="flex items-center justify-center w-full max-w-[95vw] px-4 gap-x-2 select-none">
            {/* Left Name part (Yash) - Layered behind (Z-0) */}
            <div className="char-left relative z-0 inline-block">
              <span
                onClick={() => onOpenAbout("left")}
                className="inline-block font-display font-black text-[11.5vw] md:text-[13.8vw] tracking-tighter text-black uppercase leading-none select-none transition-transform duration-500 ease-out hover:-translate-x-8 sm:hover:-translate-x-12 md:hover:-translate-x-16 lg:hover:-translate-x-20 cursor-pointer pointer-events-auto"
              >
                Yash
              </span>
            </div>

            {/* 3D Canvas Portrait Container (Z-10 with negative margins to overlap the text) */}
            <div
              ref={portraitContainerRef}
              className="relative z-10 shrink-0 w-[240px] h-[320px] sm:w-[280px] sm:h-[370px] md:w-[320px] md:h-[420px] lg:w-[340px] lg:h-[450px] -mx-8 sm:-mx-12 md:-mx-16 lg:-mx-20 rounded-lg overflow-hidden border border-black/10 shadow-lg hover:shadow-xl transition-all duration-300 pointer-events-auto"
            >
              <Hero3D />
            </div>

            {/* Right Name part (Raj) - Layered behind (Z-0) */}
            <div className="char-right relative z-0 inline-block">
              <span
                onClick={() => onOpenAbout("right")}
                className="inline-block font-display font-black text-[11.5vw] md:text-[13.8vw] tracking-tighter text-black uppercase leading-none select-none transition-transform duration-500 ease-out hover:translate-x-8 sm:hover:translate-x-12 md:hover:translate-x-16 lg:hover:translate-x-20 cursor-pointer pointer-events-auto"
              >
                Raj
              </span>
            </div>
          </div>
        </div>

        {/* 3. Bottom UI Section */}
        <footer className="z-30 w-full px-6 py-4 flex justify-between items-end">
          {/* Social Links on bottom-left */}
          <div className="hero-ui-element flex flex-col sm:flex-row gap-4 items-center">
            <div className="flex gap-4">
              {/* GitHub SVG */}
              <a
                href="https://github.com/RazeO1"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto text-black"
                aria-label="GitHub"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
              
              {/* LinkedIn SVG */}
              <a
                href="https://www.linkedin.com/in/yraze"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto text-black"
                aria-label="LinkedIn"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>



              {/* Instagram SVG */}
              <a
                href="https://www.instagram.com/i_leo07"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full border border-black/15 flex items-center justify-center hover:bg-black hover:text-white transition-all duration-300 pointer-events-auto text-black"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="14"
                  height="14"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>

          {/* Titles on bottom-right */}
          <div className="hero-ui-element text-right flex flex-col">
            <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-black opacity-40 uppercase leading-none">
              UI / UX,
            </span>
            <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-black uppercase leading-tight">
              AI Engineer
            </span>
            <span className="font-display text-lg sm:text-xl md:text-2xl font-bold text-black opacity-40 uppercase leading-none">
              & Developer
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
