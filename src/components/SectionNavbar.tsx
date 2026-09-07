"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from "react";

interface SectionNavbarProps {
  theme: "light" | "dark";
  onOpenAbout?: () => void;
  sectionName?: string;
}

export default function SectionNavbar({
  theme,
  onOpenAbout,
  sectionName,
}: SectionNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Smooth scroll handler
  const handleNavigate = useCallback(
    (target: string) => {
      setIsOpen(false);

      if (target === "about") {
        if (onOpenAbout) {
          onOpenAbout();
        }
        return;
      }

      // Small delay to let the curtain begin closing smoothly
      setTimeout(() => {
        const lenis = (window as any).lenis;
        if (target === "home") {
          if (lenis) {
            lenis.scrollTo(0, { duration: 1.2 });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
          return;
        }

        const el = document.getElementById(target);
        if (el) {
          if (lenis) {
            lenis.scrollTo(el, { duration: 1.2 });
          } else {
            el.scrollIntoView({ behavior: "smooth" });
          }
        }
      }, 150);
    },
    [onOpenAbout]
  );

  const navItems = [
    { num: "01", label: "HOME", target: "home", desc: "Intro & Identity" },
    { num: "02", label: "ABOUT", target: "about", desc: "3D Chrome Avatar" },
    { num: "03", label: "SKETCHBOOK", target: "showcase", desc: "Interactive 3D Pages" },
    { num: "04", label: "SKILLS", target: "skills", desc: "Harmonic 4-String Score" },
    { num: "05", label: "PROJECTS", target: "projects", desc: "Selected Works Archive" },
    { num: "06", label: "CONTACT", target: "contact", desc: "Let's Build Something" },
  ];

  const isLight = theme === "light";

  return (
    <>
      {/* =======================================================================
          COLLAPSED TRIGGER BUTTON (Pause Symbol "||" -> Cross "X")
          Anchored at top-right corner of each section
          ======================================================================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        title={isOpen ? "Close Menu (Esc)" : "Navigation Menu"}
        className={`group absolute top-6 right-6 md:top-8 md:right-12 z-40 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md cursor-pointer select-none outline-none shadow-sm ${
          isLight
            ? "bg-[#fcf7f3]/90 border border-black/15 text-[#0A0A0A] hover:border-[#de3421]"
            : "bg-[#0A0A0A]/90 border border-white/15 text-[#fcf7f3] hover:border-[#de3421]"
        }`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
          {/* Left / Top-rotated Bar */}
          <span
            className={`absolute w-[2px] h-3.5 rounded-full transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "translate-x-0 rotate-45"
                : "-translate-x-[3px] rotate-0"
            } ${
              isLight ? "bg-[#0A0A0A]" : "bg-[#fcf7f3]"
            } group-hover:bg-[#de3421] transition-colors`}
          />
          {/* Right / Bottom-rotated Bar */}
          <span
            className={`absolute w-[2px] h-3.5 rounded-full transition-transform duration-250 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "translate-x-0 -rotate-45"
                : "translate-x-[3px] rotate-0"
            } ${
              isLight ? "bg-[#0A0A0A]" : "bg-[#fcf7f3]"
            } group-hover:bg-[#de3421] transition-colors`}
          />
        </div>
      </button>

      {/* =======================================================================
          VARIANT C: KINETIC EDITORIAL CURTAIN OVERLAY
          Full-viewport high-contrast portal matching section palette
          ======================================================================= */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-14 transition-all duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto scale-100"
            : "opacity-0 pointer-events-none scale-[0.98]"
        } ${
          isLight
            ? "bg-[#fcf7f3]/98 text-[#0A0A0A]"
            : "bg-[#0A0A0A]/98 text-white"
        } backdrop-blur-xl select-none`}
      >
        {/* Top Header Row inside Curtain */}
        <div className="w-full flex items-center justify-between border-b pb-4 md:pb-6 border-current/10">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#de3421] animate-pulse" />
            <span className="font-mono text-[9px] md:text-[10.5px] uppercase tracking-[0.2em] font-bold text-[#de3421]">
              DIRECTORY // {sectionName ? sectionName.toUpperCase() : "NAVIGATION"}
            </span>
          </div>

          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 hidden sm:block">
            [PRESS ESC OR CLICK X TO CLOSE]
          </div>

          {/* Close button mirroring the trigger */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close navigation"
            className={`group w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 border cursor-pointer ${
              isLight
                ? "border-black/15 hover:border-[#de3421] bg-black/5"
                : "border-white/15 hover:border-[#de3421] bg-white/5"
            }`}
          >
            <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
              <span
                className={`absolute w-[2px] h-3.5 rounded-full rotate-45 ${
                  isLight ? "bg-[#0A0A0A]" : "bg-white"
                } group-hover:bg-[#de3421] transition-colors`}
              />
              <span
                className={`absolute w-[2px] h-3.5 rounded-full -rotate-45 ${
                  isLight ? "bg-[#0A0A0A]" : "bg-white"
                } group-hover:bg-[#de3421] transition-colors`}
              />
            </div>
          </button>
        </div>

        {/* Center: Monumental Nav Items (Variant C) */}
        <nav className="my-auto py-6 md:py-10 flex flex-col gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto w-full">
          {navItems.map((item, index) => (
            <button
              key={item.target}
              onClick={() => handleNavigate(item.target)}
              className="group flex items-baseline text-left cursor-pointer transition-all duration-200 outline-none w-fit"
              style={{
                transitionDelay: isOpen ? `${index * 35}ms` : "0ms",
              }}
            >
              {/* Number Index */}
              <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#de3421] mr-3 sm:mr-5 shrink-0 tracking-wider">
                {item.num}
              </span>

              {/* Monumental Label */}
              <span
                className="font-display font-black text-2xl sm:text-4xl md:text-6xl tracking-tight transition-transform duration-200 group-hover:translate-x-3 group-hover:text-[#de3421]"
                style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
              >
                {item.label}
              </span>

              {/* Subtitle Description */}
              <span className="hidden sm:inline-block font-mono text-[9px] md:text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-500 ml-4 md:ml-6 transition-colors">
                &mdash; {item.desc}
              </span>
            </button>
          ))}
        </nav>

        {/* Bottom Status / Colophon */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between pt-4 md:pt-6 border-t border-current/10 font-mono text-[9px] md:text-[10px] uppercase tracking-widest gap-2 opacity-70">
          <div>
            <span className="text-[#de3421] font-bold">YASH RAJ</span> &bull; PORTFOLIO &copy; 2026
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/yraze"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#de3421] hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yraze"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#de3421] hover:underline"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hiiam@yashraj.dev"
              className="hover:text-[#de3421] hover:underline"
            >
              hiiam@yashraj.dev
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
