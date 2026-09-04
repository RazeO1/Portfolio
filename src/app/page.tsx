"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useRef } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Showcase from "@/components/Showcase";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [aboutOpen, setAboutOpen] = useState<"left" | "right" | null>(null);
  const [lastOpenedSide, setLastOpenedSide] = useState<"left" | "right">("left");
  const scrollTargetRef = useRef<string | null>(null);
  const aboutContainerRef = useRef<HTMLDivElement>(null);

  // Sync scroll locking on body during loader and when About section is open
  useEffect(() => {
    if (!isLoaded || aboutOpen !== null) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
    return () => {
      document.body.classList.remove("loading");
    };
  }, [isLoaded, aboutOpen]);

  // Initialize Lenis specifically on the About scroll container when open
  useEffect(() => {
    if (!isLoaded) return;
    if (aboutOpen === null || !aboutContainerRef.current) return;

    const container = aboutContainerRef.current;
    const lenis = new Lenis({
      wrapper: container,
      content: container.firstElementChild as HTMLElement,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    // Bind ScrollTrigger updates to Lenis scroll event
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Two-way infinite scroll loop check (snaps in the middle of the scroll range to avoid limits)
    lenis.on("scroll", (e: any) => {
      const loopGroup = container.querySelector(".about-loop-group") as HTMLElement | null;
      if (loopGroup) {
        const loopHeight = loopGroup.offsetHeight;
        if (e.scroll >= loopHeight + 100) {
          // Snaps back into the first loop group
          lenis.scrollTo(e.scroll - loopHeight, { immediate: true });
        } else if (e.scroll <= 100) {
          // Snaps forward into the second loop group
          lenis.scrollTo(e.scroll + loopHeight, { immediate: true });
        }
      }
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Recalculate ScrollTrigger positions
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      if (typeof window !== "undefined") {
        (window as any).lenis = null;
      }
    };
  }, [aboutOpen, isLoaded]);

  // Initialize Lenis globally for the main page when About section is closed
  useEffect(() => {
    if (!isLoaded) return;
    if (aboutOpen !== null) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
      smoothWheel: true,
    });

    if (typeof window !== "undefined") {
      (window as any).lenis = lenis;
    }

    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Refresh ScrollTrigger calculations
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      lenis.off("scroll", handleScroll);
      lenis.destroy();
      cancelAnimationFrame(rafId);
      if (typeof window !== "undefined") {
        (window as any).lenis = null;
      }
    };
  }, [isLoaded, aboutOpen]);

  // Handles GSAP slide transitions for About Section Overlay (Open)
  useEffect(() => {
    if (!isLoaded) return;
    const el = aboutContainerRef.current;
    if (!el) return;

    if (aboutOpen !== null) {
      // Determine starting translation dynamically based on entry side
      const startTransform = aboutOpen === "left" ? "translateX(-100%)" : "translateX(100%)";
      
      // Kill any active tweens on the element to prevent glitches
      gsap.killTweensOf(el);
      
      // Instantly set start position off-screen
      gsap.set(el, { transform: startTransform });
      
      // Animate slide-in to center
      gsap.to(el, {
        transform: "translateX(0%)",
        duration: 1.0,
        ease: "power3.out",
        onComplete: () => {
          const lenis = (window as any).lenis;
          const loopGroup = el.querySelector(".about-loop-group") as HTMLElement | null;
          let initialScroll = 0;
          if (loopGroup) {
            initialScroll = loopGroup.offsetHeight;
          }

          // If a scroll target is set (e.g. "contact"), scroll to it smoothly
          if (scrollTargetRef.current) {
            const targetEl = document.getElementById(scrollTargetRef.current);
            if (targetEl) {
              if (lenis) {
                lenis.scrollTo(`#${scrollTargetRef.current}`, { duration: 1.0 });
              } else {
                targetEl.scrollIntoView({ behavior: "smooth" });
              }
            } else {
              // Target not found, snap to initialScroll
              if (lenis && initialScroll > 0) {
                lenis.scrollTo(initialScroll, { immediate: true });
              } else if (initialScroll > 0) {
                el.scrollTo(0, initialScroll);
              }
            }
            scrollTargetRef.current = null; // Clear the target
          } else {
            // Otherwise, instantly snap to initialScroll so we start at Headline but can scroll up/down
            if (lenis && initialScroll > 0) {
              lenis.scrollTo(initialScroll, { immediate: true });
            } else if (initialScroll > 0) {
              el.scrollTo(0, initialScroll);
            }
          }

          // Recalculate ScrollTrigger offsets now that the overlay is stationary and in the viewport
          ScrollTrigger.refresh();
        }
      });
    }
  }, [aboutOpen, isLoaded]);

  const handleOpenAbout = (side: "left" | "right", target?: string) => {
    setLastOpenedSide(side);
    setAboutOpen(side);
    if (target) {
      scrollTargetRef.current = target;
    }
  };

  const handleScrollToSection = (target: string) => {
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(`#${target}`, { duration: 1.5 });
    } else {
      const el = document.getElementById(target);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCloseAbout = () => {
    const el = aboutContainerRef.current;
    if (!el) {
      setAboutOpen(null);
      return;
    }
    
    // Determine exit direction based on the last opened side
    const targetTransform = lastOpenedSide === "left" ? "translateX(-100%)" : "translateX(100%)";
    
    gsap.killTweensOf(el);
    gsap.to(el, {
      transform: targetTransform,
      duration: 1.0,
      ease: "power3.inOut",
      onComplete: () => {
        // Reset container scroll back to 0
        el.scrollTo(0, 0);
        setAboutOpen(null);
        scrollTargetRef.current = null;
      }
    });
  };

  return (
    <main className="relative w-full min-h-screen bg-[#fcf7f3] overflow-x-clip">
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

      {/* Hero section */}
      <div className="relative w-full z-10">
        <Hero active={isLoaded} onOpenAbout={handleOpenAbout} onScrollToSection={handleScrollToSection} />
      </div>

      {/* Sliding About Section Overlay (z-30 to slide over Showcase/Projects) */}
      <div
        id="about-scroll-container"
        ref={aboutContainerRef}
        className="fixed top-0 left-0 w-full h-full z-30 translate-x-[100%] overflow-y-auto bg-[#FAF8F5]"
      >
        <About active={aboutOpen !== null} onClose={handleCloseAbout} />
      </div>

      {/* Main Page Scrollable Content (relative z-20 covers the sticky Hero as we scroll) */}
      <div className="relative z-20 w-full bg-[#fcf7f3]">
        {/* Showcase Section (3D Page-turning Sketchbook) */}
        <Showcase />

        {/* Skills Section (Paul Kalkbrenner Architectural Grid) */}
        <Skills />

        {/* Projects Section (Runway Timeline Slideshow) */}
        <Projects />

        {/* Contact Section */}
        <section
          id="contact"
          className="relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20 select-none border-t border-white/5"
        >
          <div className="max-w-4xl space-y-8">
            <span className="font-mono text-xs md:text-sm uppercase tracking-widest text-[#d5802a] font-bold">
              Section 05 / Get in Touch
            </span>
            <h2 className="font-display font-medium text-4xl md:text-6xl text-white tracking-tight">
              Let&apos;s build something.
            </h2>
            <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed max-w-xl">
              I&apos;m always interested in hearing about new projects, creative collaborations, or opportunities to design and engineer premium digital experiences.
            </p>
            
            <div className="flex flex-col gap-4 font-mono text-xs md:text-sm uppercase tracking-wider pt-4">
              <div>
                <span className="text-neutral-500 mr-4">Write to me:</span>
                <a href="mailto:hiiam@yashraj.dev" className="text-white hover:line-through transition-all">hiiam@yashraj.dev</a>
              </div>
              <div className="flex gap-6 mt-4">
                <a href="https://github.com/yraze" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white hover:line-through transition-all">GitHub</a>
                <a href="https://www.linkedin.com/in/yraze" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white hover:line-through transition-all">LinkedIn</a>
                <a href="https://www.instagram.com/i_leo07" target="_blank" rel="noreferrer" className="text-neutral-400 hover:text-white hover:line-through transition-all">Instagram</a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full py-8 text-center bg-[#0A0A0A] border-t border-white/5">
          <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600 font-bold">
            YASH RAJ © 2026 • PORTFOLIO
          </p>
        </footer>
      </div>

      {/* Fixed Close Button for About Overlay */}
      {aboutOpen !== null && (
        <button
          onClick={handleCloseAbout}
          className="fixed top-6 right-6 md:top-8 md:right-8 z-[100] w-10 h-10 rounded-full border border-white/20 bg-black/10 backdrop-blur-sm flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 pointer-events-auto text-white mix-blend-difference cursor-pointer"
          aria-label="Close About Section"
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      )}
    </main>
  );
}
