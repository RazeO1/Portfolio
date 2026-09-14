"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  setActiveSection?: (section: number) => void;
  setProjectsProgress?: (progress: number) => void;
  onOpenAbout?: () => void;
}

interface ProjectData {
  id: string;
  title: string;
  image: string;
  link: string;
  positionClass: string; // Left, Right, Center placement
}

export default function Projects({
  setActiveSection,
  setProjectsProgress,
}: ProjectsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Individual card refs for GSAP scroll scrub choreography
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);

  // High-performance DOM-based cursor tracking (zero re-renders on mousemove)
  useEffect(() => {
    const stage = pinnedStageRef.current;
    const cursor = cursorRef.current;
    if (!stage || !cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Flagship engineering projects - Pure picture tiles matching Nudot Studio
  const projects: ProjectData[] = [
    {
      id: "plantvision-ai",
      title: "PlantVision AI",
      image: "/Projects/PlantVision%20AI.png",
      link: "https://plant-vision-ai-psi.vercel.app",
      positionClass:
        "left-[5%] sm:left-[7%] md:left-[9%] lg:left-[11%] w-[88vw] sm:w-[50vw] md:w-[44vw] lg:w-[38vw] max-w-[560px]",
    },
    {
      id: "smart-car-parking",
      title: "Smart Car Parking",
      image: "/Projects/Smart%20Car%20Parking.png",
      link: "https://smartcarparking.netlify.app",
      positionClass:
        "right-[5%] sm:right-[7%] md:right-[9%] lg:right-[11%] w-[88vw] sm:w-[50vw] md:w-[44vw] lg:w-[38vw] max-w-[560px]",
    },
    {
      id: "dress-up",
      title: "Dress Up",
      image: "/Projects/TAG.png",
      link: "https://github.com/RazeO1/Dress-up",
      positionClass:
        "left-1/2 -translate-x-1/2 w-[90vw] sm:w-[56vw] md:w-[48vw] lg:w-[42vw] max-w-[620px]",
    },
  ];

  // GSAP Choreography matching Nudot Reference Video (00:00:16 - 00:00:25)
  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        (window as any).ScrollTrigger = ScrollTrigger;
      }

      const cards = [
        card1Ref.current,
        card2Ref.current,
        card3Ref.current,
      ].filter(Boolean) as HTMLDivElement[];

      if (!sectionRef.current || cards.length === 0) return;

      // Set initial positions off-screen below the viewport
      cards.forEach((card) => {
        gsap.set(card, {
          y: () => window.innerHeight * 1.15,
          opacity: 1,
          scale: 1,
        });
      });

      // Master scrubbed timeline across the pinned section runway
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.0, // Smooth momentum catchup
          onToggle: (self) => {
            if (self.isActive && setActiveSection) {
              setActiveSection(6);
            }
          },
          onUpdate: (self) => {
            if (setProjectsProgress) {
              setProjectsProgress(self.progress);
            }
          },
        },
      });

      // Staggered motion trajectory for 3 picture tiles (Left -> Right -> Center):
      // Card 1 (Left - PlantVision AI): Enters 0.05 -> exits 0.48
      tl.fromTo(
        card1Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.43, ease: "none" },
        0.05
      );

      // Card 2 (Right - Smart Car Parking): Enters 0.32 -> exits 0.75
      tl.fromTo(
        card2Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.43, ease: "none" },
        0.32
      );

      // Card 3 (Center - Dress Up / TAG): Enters 0.58 -> exits 0.98
      tl.fromTo(
        card3Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.40, ease: "none" },
        0.58
      );
    },
    { scope: sectionRef, dependencies: [setActiveSection, setProjectsProgress] }
  );

  const cardRefs = [card1Ref, card2Ref, card3Ref];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[320vh] bg-transparent text-white selection:bg-[#de3421] selection:text-white"
    >
      {/* =========================================================================
          PINNED STAGE VIEWPORT (Exact match to Nudot Studio 00:00:16 - 00:00:25)
          Holds the pinned background typography while pure picture tiles scroll past
          ========================================================================= */}
      <div
        ref={pinnedStageRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center select-none"
      >
        {/* =========================================================================
            PINNED MONUMENTAL HEADLINE
            "ARCHIVE OF / THE SELECTED WORKS / BY YASH RAJ"
            ========================================================================= */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-0 pointer-events-none">
          {/* Subtitle in parentheses */}
          <span className="font-sans font-medium text-[11px] sm:text-xs md:text-sm uppercase tracking-[0.22em] text-neutral-400 mb-2 sm:mb-3">
            (REDEFINING THE VISUAL &amp; INTELLIGENT THINKING OF SYSTEMS)
          </span>

          {/* Monumental Headline */}
          <h2
            className="font-display font-black text-[clamp(2.4rem,7.2vw,6.8rem)] leading-[0.92] tracking-tighter text-white uppercase"
            style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
          >
            ARCHIVE OF
          </h2>
          <h2
            className="font-display font-black text-[clamp(2.4rem,7.2vw,6.8rem)] leading-[0.92] tracking-tighter text-white uppercase"
            style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
          >
            THE SELECTED WORKS
          </h2>
          <h2
            className="font-display font-black text-[clamp(2.4rem,7.2vw,6.8rem)] leading-[0.92] tracking-tighter text-white uppercase"
            style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
          >
            BY YASH RAJ
          </h2>

          {/* Subtitle below */}
          <span className="font-sans text-xs sm:text-sm text-neutral-400 mt-4 sm:mt-5 tracking-wide">
            Digital Vision Energy Release Point &bull; Production Architectures
          </span>
        </div>

        {/* Bottom Pinned Status Bar */}
        <footer className="absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 flex items-center justify-end font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 z-0 pointer-events-none">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">SCROLL DOWN TO EXPLORE</span>
            <span className="text-white font-bold">&darr;</span>
          </div>
        </footer>

        {/* =========================================================================
            FOREGROUND MOVING PURE PICTURE TILES (nudot-studio style, NO TEXT)
            Scrubbed along scroll runway: Left -> Right -> Center
            ========================================================================= */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden flex items-center justify-center">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              ref={cardRefs[idx]}
              className={`absolute top-1/2 -translate-y-1/2 pointer-events-auto will-change-transform ${project.positionClass}`}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
            >
              <ProjectPictureTile project={project} />
            </div>
          ))}
        </div>

        {/* =========================================================================
            INTERACTIVE FLOATING "VIEW" CURSOR DISC
            Follows mouse cursor over picture tiles just like in Nudot Video reference
            ========================================================================= */}
        <div
          ref={cursorRef}
          className={`fixed top-0 left-0 pointer-events-none z-50 w-16 h-16 -ml-8 -mt-8 rounded-full bg-slate-200/25 backdrop-blur-md border border-white/40 shadow-[0_10px_25px_rgba(0,0,0,0.5)] flex items-center justify-center transition-opacity transition-transform duration-200 ${
            cursorVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        >
          <span className="font-sans font-black text-[11px] tracking-wider text-white select-none">
            VIEW
          </span>
        </div>
      </div>
    </section>
  );
}

// Sub-component: Pure Picture Tile (Zero text, edge-to-edge screenshot like Nudot Studio)
function ProjectPictureTile({ project }: { project: ProjectData }) {
  return (
    <article
      onClick={() => {
        if (project.link) {
          window.open(project.link, "_blank", "noopener,noreferrer");
        }
      }}
      className="group relative w-full aspect-[16/10] rounded-2xl md:rounded-3xl border border-white/20 bg-[#121215] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] hover:border-white/50 transition-all duration-500 overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9)",
      }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover object-top select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        draggable={false}
      />
      {/* Subtle hairline inner border for museum polish */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl md:rounded-3xl pointer-events-none" />
    </article>
  );
}
