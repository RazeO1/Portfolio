"use client";

import { useState, useEffect, useRef } from "react";
import Loader from "@/components/Loader";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [aboutOpen, setAboutOpen] = useState<"left" | "right" | null>(null);
  const [lastOpenedSide, setLastOpenedSide] = useState<"left" | "right">("left");
  const [scrollTarget, setScrollTarget] = useState<string | null>(null);
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

    // Two-way infinite scroll loop check
    lenis.on("scroll", (e: any) => {
      const loopGroup = container.querySelector(".about-loop-group") as HTMLElement | null;
      if (loopGroup) {
        const loopHeight = loopGroup.offsetHeight;
        if (e.scroll >= e.limit - 5) {
          // Reached the bottom: snap scroll back by loopHeight
          lenis.scrollTo(e.scroll - loopHeight, { immediate: true });
        } else if (e.scroll <= 5) {
          // Reached the top: snap scroll forward by loopHeight
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
          if (scrollTarget) {
            const targetEl = document.getElementById(scrollTarget);
            if (targetEl) {
              if (lenis) {
                lenis.scrollTo(`#${scrollTarget}`, { duration: 1.0 });
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
            setScrollTarget(null); // Clear the target
          } else {
            // Otherwise, instantly snap to initialScroll so we start at Headline but can scroll up/down
            if (lenis && initialScroll > 0) {
              lenis.scrollTo(initialScroll, { immediate: true });
            } else if (initialScroll > 0) {
              el.scrollTo(0, initialScroll);
            }
          }
        }
      });
    }
  }, [aboutOpen, isLoaded, scrollTarget]);

  const handleOpenAbout = (side: "left" | "right", target?: string) => {
    setLastOpenedSide(side);
    setAboutOpen(side);
    if (target) {
      setScrollTarget(target);
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
        setScrollTarget(null);
      }
    });
  };

  return (
    <main className="relative w-full min-h-screen bg-[#FAF8F5] overflow-x-hidden">
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
        <Hero active={isLoaded} onOpenAbout={handleOpenAbout} />
      </div>

      {/* Sliding About Section Overlay */}
      <div
        id="about-scroll-container"
        ref={aboutContainerRef}
        className="fixed top-0 left-0 w-full h-full z-20 translate-x-[100%] overflow-y-auto bg-[#FAF8F5]"
      >
        <About active={aboutOpen !== null} onClose={handleCloseAbout} />
      </div>
    </main>
  );
}
