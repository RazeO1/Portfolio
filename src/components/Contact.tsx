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
      navigator.clipboard.writeText("hiiam@yashraj.dev");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
    window.location.href = "mailto:hiiam@yashraj.dev";
  };

  return (
    <section
      id="contact"
      className="relative w-full h-screen min-h-[620px] max-h-[1080px] bg-transparent text-white flex flex-col justify-between overflow-hidden pt-6 md:pt-8 pb-0 select-none"
    >

      {/* =========================================================================
          1. TOP BAR (Studio Telemetry & Live Clock)
          ========================================================= */}
      <header className="relative z-10 w-full px-6 md:px-12 lg:px-16 flex items-center justify-end font-mono text-xs uppercase tracking-wider text-neutral-400">

        {/* Right Studio Telemetry / Clock */}
        <div className="flex items-center gap-6 text-[10px] md:text-xs">
          <div className="hidden md:flex items-center gap-2 text-neutral-500 font-mono">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-neutral-400 uppercase tracking-widest">AVAILABLE FOR WORK</span>
          </div>

          {currentTime && (
            <div className="font-mono text-neutral-400 tabular-nums tracking-widest text-[10px] md:text-xs">
              {currentTime}
            </div>
          )}

          {onOpenAbout && (
            <button
              onClick={onOpenAbout}
              className="md:hidden flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors duration-200 font-mono text-[11px] uppercase tracking-widest"
            >
              <span>ABOUT</span>
              <span className="text-neutral-600">::</span>
            </button>
          )}
        </div>
      </header>

      {/* =========================================================================
          2. MAIN CONTENT (Headline + Action Pills + Channels List)
          Matches layout of "Let's start from nothin'" with user's specific items
          ========================================================= */}
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center my-auto">
        
        {/* Left Column: Monumental 2-line Headline + 4 Symbol Action Pills */}
        <div className="lg:col-span-8 flex flex-col items-start max-w-3xl">
          <h2
            className="font-medium text-4xl sm:text-6xl md:text-7xl lg:text-[5.2rem] leading-[0.93] tracking-[-0.035em] text-white select-text"
            style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
          >
            Let&apos;s start<br />
            something bold
          </h2>

          {/* Action Pills: Mail, Resume, GitHub, LinkedIn */}
          <div className="flex flex-wrap items-center gap-2.5 md:gap-3 mt-6 md:mt-8">
            {/* 1. Mail Symbol Pill */}
            <a
              href="mailto:hiiam@yashraj.dev"
              onClick={handleCopyEmail}
              className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs md:text-sm font-mono tracking-wider text-white backdrop-blur-sm cursor-pointer"
              title="Click to copy & open email"
            >
              {/* Mail SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="font-semibold uppercase tracking-wider">
                {copied ? "COPIED TO CLIPBOARD!" : "DROP AN EMAIL"}
              </span>
              <span className="text-[11px] opacity-60 group-hover:opacity-100 transition-opacity font-sans ml-0.5">
                @
              </span>
            </a>

            {/* 2. Resume Download Symbol Pill */}
            <a
              href="/resume.pdf"
              download="Yash_Raj_Resume.pdf"
              className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs md:text-sm font-mono tracking-wider text-white backdrop-blur-sm cursor-pointer"
              title="Download Resume PDF"
            >
              {/* Download Document SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="12" y1="18" x2="12" y2="12" />
                <polyline points="9 15 12 18 15 15" />
              </svg>
              <span className="font-semibold uppercase tracking-wider">RESUME</span>
              <span className="text-[11px] opacity-60 group-hover:opacity-100 transition-opacity font-sans ml-0.5">
                ↓
              </span>
            </a>

            {/* 3. GitHub Symbol Pill */}
            <a
              href="https://github.com/yraze"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs md:text-sm font-mono tracking-wider text-white backdrop-blur-sm cursor-pointer"
              title="View GitHub Profile"
            >
              {/* GitHub SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span className="font-semibold uppercase tracking-wider">GITHUB</span>
              <span className="text-[11px] opacity-60 group-hover:opacity-100 transition-opacity font-sans ml-0.5">
                ↗
              </span>
            </a>

            {/* 4. LinkedIn Symbol Pill */}
            <a
              href="https://www.linkedin.com/in/yraze"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-4 py-2.5 md:px-5 md:py-2.5 rounded-full border border-white/25 bg-white/[0.04] hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-xs md:text-sm font-mono tracking-wider text-white backdrop-blur-sm cursor-pointer"
              title="View LinkedIn Profile"
            >
              {/* LinkedIn SVG Icon */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-4 h-4 transition-transform duration-300 group-hover:scale-110"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
              <span className="font-semibold uppercase tracking-wider">LINKEDIN</span>
              <span className="text-[11px] opacity-60 group-hover:opacity-100 transition-opacity font-sans ml-0.5">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Right Column: Matched Channels List with Symbols (Matches Linkedin / Instagram / Behance in screenshot) */}
        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-start space-y-3.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-neutral-500 mb-0.5">
            CONNECT DIRECTLY
          </span>

          {/* LinkedIn Channel */}
          <a
            href="https://www.linkedin.com/in/yraze"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-base md:text-lg font-sans font-medium text-neutral-300 hover:text-white transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
            </svg>
            <span>Linkedin</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 font-mono transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          {/* GitHub Channel */}
          <a
            href="https://github.com/yraze"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-base md:text-lg font-sans font-medium text-neutral-300 hover:text-white transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            <span>GitHub</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 font-mono transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          {/* Email Channel */}
          <a
            href="mailto:hiiam@yashraj.dev"
            className="group flex items-center gap-3 text-base md:text-lg font-sans font-medium text-neutral-300 hover:text-white transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>Email</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 font-mono transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>

          {/* Resume Download Channel */}
          <a
            href="/resume.pdf"
            download="Yash_Raj_Resume.pdf"
            className="group flex items-center gap-3 text-base md:text-lg font-sans font-medium text-neutral-300 hover:text-white transition-colors duration-200"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 text-neutral-500 group-hover:text-white transition-colors"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="12" y1="18" x2="12" y2="12" />
              <polyline points="9 15 12 18 15 15" />
            </svg>
            <span>Resume</span>
            <span className="text-xs text-neutral-500 group-hover:text-neutral-300 font-mono transition-transform duration-200 group-hover:translate-y-0.5">
              ↓
            </span>
          </a>
        </div>
      </div>

      {/* =========================================================================
          3. GIGANTIC FULL-BLEED BOTTOM NAME: "YASH RAJ ↗"
          Matches "NOTHIN'" from reference screenshot, spanning full width & slightly cropped at bottom baseline
          ========================================================= */}
      <div className="relative z-10 w-full overflow-hidden select-none pointer-events-none mt-auto flex flex-col items-center justify-end px-1 sm:px-2">
        <h1
          className="font-black text-[17.2vw] sm:text-[17.8vw] lg:text-[18vw] leading-[0.74] tracking-[-0.045em] text-white flex items-start justify-center whitespace-nowrap uppercase translate-y-[4%] md:translate-y-[5%]"
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
            className="inline-block ml-[0.06em] mt-[0.02em] shrink-0"
            style={{ width: "0.38em", height: "0.38em", transform: "translateY(2%)" }}
            aria-hidden="true"
          >
            <line x1="6" y1="18" x2="18" y2="6" />
            <polyline points="8 6 18 6 18 16" />
          </svg>
        </h1>
      </div>
    </section>
  );
}
