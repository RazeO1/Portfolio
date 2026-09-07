"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from "react";

interface SectionNavbarProps {
  theme?: "light" | "dark";
  onOpenAbout?: () => void;
  sectionName?: string;
  isAboutOpen?: boolean;
  isLoaded?: boolean;
}

export default function SectionNavbar({
  theme,
  onOpenAbout,
  sectionName,
  isAboutOpen = false,
  isLoaded = true,
}: SectionNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Dynamic scroll & section detection
  const [detectedSection, setDetectedSection] = useState<string>("showcase");
  const [detectedTheme, setDetectedTheme] = useState<"light" | "dark">("light");
  const [isVisible, setIsVisible] = useState(false);
  const [buttonTop, setButtonTop] = useState<number>(32);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      // Excluded during initial loader or when About overlay is open
      if (!isLoaded || isAboutOpen) {
        setIsVisible(false);
        return;
      }

      const showcaseEl = document.getElementById("showcase");
      const skillsEl = document.getElementById("skills");
      const projectsEl = document.getElementById("projects");
      const contactEl = document.getElementById("contact");

      if (!showcaseEl) return;

      const showcaseRect = showcaseEl.getBoundingClientRect();
      const skillsRect = skillsEl ? skillsEl.getBoundingClientRect() : null;
      const projectsRect = projectsEl ? projectsEl.getBoundingClientRect() : null;
      const contactRect = contactEl ? contactEl.getBoundingClientRect() : null;

      // Navbar begins at Sketchbook (Showcase)
      // Reveals as soon as the user scrolls down into the Sketchbook section
      const inSketchbookOrBelow = showcaseRect.top <= 140;

      if (!inSketchbookOrBelow) {
        // Still in Hero section -> strictly hidden
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      // Dynamic vertical tracking:
      // When in Sketchbook, align with "Interactive Sketchbook" title.
      // As the user scrolls down, dock to the top-right header position (top-6 md:top-8).
      const isMobile = window.innerWidth < 768;
      const minTop = isMobile ? 24 : 32;

      if (isOpen) {
        setButtonTop(minTop);
      } else {
        const h2El = showcaseEl.querySelector("h2");
        if (h2El) {
          const h2Rect = h2El.getBoundingClientRect();
          const h2Center = h2Rect.top + h2Rect.height / 2;
          const btnHalf = isMobile ? 22 : 24;
          const targetTop = Math.max(minTop, Math.round(h2Center - btnHalf));
          setButtonTop(targetTop);
        } else {
          setButtonTop(minTop);
        }
      }

      // Section theme threshold: 40% of viewport height
      const threshold = window.innerHeight * 0.4;

      if (contactRect && contactRect.top <= threshold) {
        setDetectedSection("contact");
        setDetectedTheme("dark");
      } else if (projectsRect && projectsRect.top <= threshold) {
        setDetectedSection("projects");
        setDetectedTheme("dark");
      } else if (skillsRect && skillsRect.top <= threshold) {
        setDetectedSection("skills");
        setDetectedTheme("light");
      } else {
        setDetectedSection("showcase");
        setDetectedTheme("light");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isAboutOpen, isOpen, isLoaded]);

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

  // Lock outer scroll while menu is open
  useEffect(() => {
    if (!isOpen) return;
    const lenis = (window as any).lenis;
    if (lenis) lenis.stop();

    const preventScroll = (e: Event) => {
      e.stopPropagation();
    };

    window.addEventListener("wheel", preventScroll, { passive: true });
    window.addEventListener("touchmove", preventScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      if (lenis) lenis.start();
    };
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

      // Small delay to let the theatrical shutter begin closing smoothly
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
      }, 180);
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

  const currentTheme = theme || detectedTheme;
  const isLight = currentTheme === "light";

  const sectionLabels: Record<string, string> = {
    showcase: "SKETCHBOOK",
    skills: "SKILLS",
    projects: "PROJECTS",
    contact: "CONTACT",
  };
  const activeSectionLabel = sectionName || sectionLabels[detectedSection] || "NAVIGATION";

  return (
    <>
      {/* =======================================================================
          SINGLE FIXED SECTION-ADAPTIVE NAVBAR BUTTON
          Fixed at top-right, visible from Sketchbook downwards, hidden on Hero/About
          ======================================================================= */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        title={isOpen ? "Close Menu (Esc)" : "Navigation Menu"}
        style={{
          top: `${buttonTop}px`,
        }}
        className={`group fixed right-6 md:right-12 z-[60] w-11 h-11 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-[opacity,transform,background-color,border-color,box-shadow,color] duration-300 backdrop-blur-md cursor-pointer select-none outline-none active:scale-90 hover:scale-105 ${
          !isVisible && !isOpen
            ? "opacity-0 pointer-events-none -translate-y-4 scale-75"
            : "opacity-100 pointer-events-auto translate-y-0 scale-100"
        } ${
          !isOpen && isLight
            ? "bg-[#fcf7f3]/90 border border-black/15 text-[#0A0A0A] hover:border-[#de3421] shadow-sm hover:shadow-md"
            : !isOpen && !isLight
            ? "bg-[#0A0A0A]/90 border border-white/15 text-[#fcf7f3] hover:border-[#de3421] shadow-sm hover:shadow-md"
            : isOpen && isLight
            ? "bg-black/5 border border-black/20 text-[#0A0A0A] hover:border-[#de3421] hover:bg-black/10"
            : "bg-white/5 border border-white/20 text-white hover:border-[#de3421] hover:bg-white/10"
        }`}
      >
        <div className="relative w-4 h-4 flex items-center justify-center pointer-events-none">
          {/* Left / Clockwise Rotated Bar */}
          <span
            className={`absolute w-[2px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "h-4 translate-x-0 rotate-45"
                : "h-3.5 -translate-x-[3.5px] rotate-0"
            } ${
              !isOpen && isLight
                ? "bg-[#0A0A0A]"
                : !isOpen && !isLight
                ? "bg-[#fcf7f3]"
                : isOpen && isLight
                ? "bg-[#0A0A0A]"
                : "bg-white"
            } group-hover:bg-[#de3421]`}
          />
          {/* Right / Counter-Clockwise Rotated Bar */}
          <span
            className={`absolute w-[2px] rounded-full transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isOpen
                ? "h-4 translate-x-0 -rotate-45"
                : "h-3.5 translate-x-[3.5px] rotate-0"
            } ${
              !isOpen && isLight
                ? "bg-[#0A0A0A]"
                : !isOpen && !isLight
                ? "bg-[#fcf7f3]"
                : isOpen && isLight
                ? "bg-[#0A0A0A]"
                : "bg-white"
            } group-hover:bg-[#de3421]`}
          />
        </div>
      </button>

      {/* =======================================================================
          VARIANT C: THEATRICAL KINETIC EDITORIAL CURTAIN OVERLAY
          Full-viewport high-contrast shutter wipe matching section palette
          ======================================================================= */}
      <div
        className={`fixed inset-0 z-50 flex flex-col justify-between p-6 sm:p-10 md:p-14 select-none backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen
            ? "opacity-100 pointer-events-auto [clip-path:inset(0%_0%_0%_0%)]"
            : "opacity-0 pointer-events-none [clip-path:inset(0%_0%_100%_0%)]"
        } ${
          isLight
            ? "bg-[#FAF8F5]/98 text-[#0A0A0A] bg-[radial-gradient(#0000000a_1px,transparent_1px)] [background-size:24px_24px]"
            : "bg-[#0A0A0A]/98 text-white bg-[radial-gradient(#ffffff0d_1px,transparent_1px)] [background-size:24px_24px]"
        }`}
      >
        {/* Top Header Row inside Curtain */}
        <div
          className={`w-full flex items-center justify-between border-b pb-4 md:pb-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          } ${isLight ? "border-black/10" : "border-white/10"}`}
          style={{ transitionDelay: isOpen ? "100ms" : "0ms" }}
        >
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#de3421] animate-ping" />
            <span className="font-mono text-[9px] md:text-[11px] uppercase tracking-[0.25em] font-bold text-[#de3421]">
              DIRECTORY // {activeSectionLabel}
            </span>
          </div>

          <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-40 hidden sm:block">
            [PRESS ESC OR CLICK × TO CLOSE]
          </div>

          {/* Spacer to balance the top-right trigger button */}
          <div className="w-12 h-12" />
        </div>

        {/* Center: Monumental Kinetic Nav Items with Masked Typography */}
        <nav className="my-auto py-6 md:py-10 flex flex-col gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto w-full">
          {navItems.map((item, index) => (
            <div key={item.target} className="overflow-hidden py-1">
              <button
                onClick={() => handleNavigate(item.target)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`group relative flex items-baseline text-left cursor-pointer transition-all duration-300 outline-none w-full pb-2 ${
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "opacity-25 blur-[0.4px]"
                    : "opacity-100"
                }`}
              >
                <div
                  className={`flex items-baseline w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isOpen
                      ? "translate-y-0 opacity-100 rotate-0"
                      : "translate-y-[130%] opacity-0 rotate-[1.5deg]"
                  }`}
                  style={{
                    transitionDelay: isOpen
                      ? `${130 + index * 45}ms`
                      : `${(5 - index) * 20}ms`,
                  }}
                >
                  {/* Number Index */}
                  <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-[#de3421] mr-4 sm:mr-6 shrink-0 tracking-wider">
                    {item.num}
                  </span>

                  {/* Monumental Label */}
                  <span
                    className="font-display font-black text-2xl sm:text-4xl md:text-6xl tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:text-[#de3421]"
                    style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                  >
                    {item.label}
                  </span>

                  {/* Subtitle Description */}
                  <span className="hidden sm:inline-block font-mono text-[9px] md:text-[11px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-500 ml-4 md:ml-6 transition-colors font-medium">
                    &mdash; {item.desc}
                  </span>

                  {/* Kinetic Arrow Badge */}
                  <span className="hidden md:inline-block opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-[#de3421] font-mono text-xs uppercase tracking-widest font-bold ml-auto">
                    [NAVIGATE] &rarr;
                  </span>
                </div>

                {/* Expanding Hairline Accent on Hover */}
                <span
                  className={`absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-300 origin-left ${
                    isLight ? "bg-black/10 group-hover:bg-[#de3421]" : "bg-white/10 group-hover:bg-[#de3421]"
                  } scale-x-0 group-hover:scale-x-100`}
                />
              </button>
            </div>
          ))}
        </nav>

        {/* Bottom Status / Colophon */}
        <div
          className={`w-full flex flex-col sm:flex-row items-center justify-between pt-4 md:pt-6 border-t font-mono text-[9px] md:text-[10px] uppercase tracking-widest gap-2 opacity-70 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-y-0 opacity-70" : "translate-y-4 opacity-0"
          } ${isLight ? "border-black/10" : "border-white/10"}`}
          style={{ transitionDelay: isOpen ? "340ms" : "0ms" }}
        >
          <div>
            <span className="text-[#de3421] font-bold">YASH RAJ</span> &bull; PORTFOLIO &copy; 2026
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/yraze"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#de3421] hover:underline transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yraze"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#de3421] hover:underline transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:hiiam@yashraj.dev"
              className="hover:text-[#de3421] hover:underline transition-colors"
            >
              hiiam@yashraj.dev
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
