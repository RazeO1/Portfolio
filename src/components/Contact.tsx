"use client";

import { useState, useEffect } from "react";

interface ContactProps {
  onOpenAbout?: () => void;
}

export default function Contact({ onOpenAbout }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState("");

  // Live IST (UTC+5:30) / Bengaluru Clock for authentic studio telemetry
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const istString = now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setCurrentTime(`${istString} IST`);
      } catch {
        const now = new Date();
        setCurrentTime(`${now.toTimeString().slice(0, 8)} UTC`);
      }
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText("hiiamyashraj@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    window.location.href = "mailto:hiiamyashraj@gmail.com";
  };

  const handleScrollToHero = (e: React.MouseEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenis = typeof window !== "undefined" ? (window as any).lenis : null;
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.5 });
    } else {
      const heroEl = document.getElementById("hero");
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-transparent text-white flex flex-col justify-between overflow-hidden pt-6 md:pt-8 pb-0 select-none"
    >
      {/* =========================================================================
          1. TOP BAR: Architectural Telemetry Header
          ========================================================================= */}
      <header className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex items-center justify-between font-mono text-[10px] md:text-xs uppercase tracking-wider text-neutral-400">
        {/* Left: Studio coordinate telemetry */}
        <div className="flex items-center gap-2.5 sm:gap-3 text-neutral-400 font-mono">
          <span className="text-[#de3421] font-bold">//</span>
          <span className="tracking-widest">12.9716° N, 77.5946° E</span>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <span className="hidden sm:inline text-neutral-400 tracking-wider">BENGALURU NODE</span>
        </div>

        {/* Right: Availability status & live clock */}
        <div className="flex items-center gap-4 sm:gap-6 text-[10px] md:text-xs">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
            <span className="text-neutral-300 font-semibold uppercase tracking-widest text-[10px] md:text-xs">
              AVAILABLE FOR WORK
            </span>
          </div>

          {currentTime && (
            <div className="hidden sm:block font-mono text-neutral-400 tabular-nums tracking-widest text-[10px] md:text-xs border-l border-white/10 pl-4 sm:pl-6">
              {currentTime}
            </div>
          )}
        </div>
      </header>

      {/* =========================================================================
          2. MAIN STAGE: Blueprint Grid (Headline Left + Architectural Action Matrix Right)
          ========================================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* Left Column: Monumental Headline & Mission Brief */}
        <div className="lg:col-span-6 flex flex-col items-start max-w-xl">
          <div className="inline-flex items-center gap-2 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[#de3421] mb-3 md:mb-4">
            <span>[ TRANSMISSION PROTOCOL ]</span>
          </div>

          <h2
            className="font-black text-4xl sm:text-6xl md:text-7xl lg:text-[5.4rem] leading-[0.92] tracking-[-0.04em] text-white select-text"
            style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
          >
            Let&apos;s start<br />
            something<br />
            bold<span className="text-[#de3421]">.</span>
          </h2>

          <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-white/10 w-full max-w-md">
            <p className="font-mono text-[10.5px] md:text-xs text-neutral-400 uppercase tracking-widest leading-relaxed">
              OPEN TO HIGH-IMPACT ROLES, AI/ML SYSTEMS &amp; CREATIVE ENGINEERING. DIRECT WIRE OPEN FOR GLOBAL INQUIRIES.
            </p>
          </div>
        </div>

        {/* Right Column: Architectural Action Grid Cells (2x2 Matrix) */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 w-full">
          
          {/* Cell 01: Direct Email */}
          <a
            href="mailto:hiiamyashraj@gmail.com"
            onClick={handleCopyEmail}
            className="group relative p-4 md:p-5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[125px] md:min-h-[140px] cursor-pointer"
          >
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>

            <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                01 // DIRECT TRANSMISSION
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-400 group-hover:text-[#de3421]"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>

            <div className="my-1.5">
              <div className="font-mono text-xs md:text-sm font-bold text-white tracking-wider truncate">
                hiiamyashraj@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider">
              {copied ? (
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  COPIED TO CLIPBOARD!
                </span>
              ) : (
                <span className="text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  CLICK TO COPY &bull; OPEN MAILTO
                </span>
              )}
            </div>
          </a>

          {/* Cell 02: Curriculum Vitae / Resume */}
          <a
            href="/resume.pdf"
            download="Yash_Raj_Resume.pdf"
            className="group relative p-4 md:p-5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[125px] md:min-h-[140px] cursor-pointer"
          >
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>

            <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                02 // RESEARCH DOSSIER
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5 text-neutral-400 group-hover:text-[#de3421]"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="19 12 12 19 5 12" />
              </svg>
            </div>

            <div className="my-1.5">
              <div className="font-mono text-xs md:text-sm font-bold text-white tracking-wider">
                Yash_Raj_Resume.pdf
              </div>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span>DOWNLOAD CURRICULUM VITAE</span>
            </div>
          </a>

          {/* Cell 03: Source Artifacts (GitHub) */}
          <a
            href="https://github.com/RazeO1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 md:p-5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[125px] md:min-h-[140px] cursor-pointer"
          >
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>

            <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                03 // CODE ARTIFACTS
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-400 group-hover:text-[#de3421]"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>

            <div className="my-1.5 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-mono text-xs md:text-sm font-bold text-white tracking-wider">
                github.com/RazeO1
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span>OPEN SOURCE LAB &bull; REPOSITORIES</span>
            </div>
          </a>

          {/* Cell 04: Professional Network (LinkedIn) */}
          <a
            href="https://www.linkedin.com/in/yraze"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative p-4 md:p-5 rounded-lg border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/25 transition-all duration-300 flex flex-col justify-between min-h-[125px] md:min-h-[140px] cursor-pointer"
          >
            {/* Corner Ticks */}
            <span className="absolute -top-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -top-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -left-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] font-mono text-neutral-600 group-hover:text-white/60 transition-colors">+</span>

            <div className="flex items-center justify-between text-neutral-400 group-hover:text-white transition-colors">
              <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest">
                04 // NETWORK WIRE
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-neutral-400 group-hover:text-[#de3421]"
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </div>

            <div className="my-1.5 flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors shrink-0">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span className="font-mono text-xs md:text-sm font-bold text-white tracking-wider">
                linkedin.com/in/yraze
              </span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[9.5px] uppercase tracking-wider text-neutral-500 group-hover:text-neutral-300 transition-colors">
              <span>PROFESSIONAL CONNECT &bull; SYNC</span>
            </div>
          </a>

        </div>
      </div>

      {/* =========================================================================
          3. MONUMENTAL CROPPED BOTTOM NAME: "YASH RAJ ↗"
          Clickable: smoothly navigates back to Hero section
          ========================================================================= */}
      <div className="relative z-10 w-full overflow-hidden select-none mt-auto flex flex-col items-center justify-end px-1 sm:px-2 pointer-events-auto">
        <button
          onClick={handleScrollToHero}
          aria-label="Back to Hero section"
          title="Return to top"
          className="group appearance-none bg-transparent border-none p-0 cursor-pointer outline-none transition-transform duration-300 active:scale-[0.99] focus-visible:outline-none w-full flex justify-center"
        >
          <h1
            className="font-black text-[17.2vw] sm:text-[17.8vw] lg:text-[18vw] leading-[0.74] tracking-[-0.045em] text-white group-hover:text-neutral-200 transition-colors duration-300 flex items-start justify-center whitespace-nowrap uppercase translate-y-[4%] md:translate-y-[5%]"
            style={{
              fontFamily: "'Inter Tight', var(--font-sans), sans-serif",
              WebkitTextStroke: "0.018em currentColor",
            }}
          >
            <span>YASH RAJ</span>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
              className="inline-block ml-[0.06em] mt-[0.02em] shrink-0 transition-all duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 text-neutral-400 group-hover:text-[#de3421]"
              style={{ width: "0.38em", height: "0.38em", transform: "translateY(2%)" }}
              aria-hidden="true"
            >
              <line x1="6" y1="18" x2="18" y2="6" />
              <polyline points="8 6 18 6 18 16" />
            </svg>
          </h1>
        </button>
      </div>
    </section>
  );
}
