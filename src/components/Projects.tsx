"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  setActiveSection?: (section: number) => void;
  setProjectsProgress?: (progress: number) => void;
}

export default function Projects({ setActiveSection, setProjectsProgress }: ProjectsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        (window as any).ScrollTrigger = ScrollTrigger;
      }

      // 1. ScrollTrigger to toggle activeSection state to 6 (Projects Section) for 3D state sync
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive && setActiveSection) {
            setActiveSection(6);
          }
        },
      });

      // 2. Timeline to fade project slides in and out as we scroll down the runway
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            if (setProjectsProgress) {
              setProjectsProgress(self.progress);
            }
          }
        }
      });

      // Slide transitions matching scroll progress
      // Slide 1 starts active. Transition to Slide 2:
      tl.to(".slide-1", { opacity: 0, duration: 1 })
        .set(".slide-1", { pointerEvents: "none" })
        .set(".slide-2", { pointerEvents: "auto" })
        .fromTo(".slide-2", { opacity: 0 }, { opacity: 1, duration: 1 }, "<")
        
        // Hold Slide 2 visible
        .to({}, { duration: 0.6 })
        
        // Transition from Slide 2 to Slide 3
        .to(".slide-2", { opacity: 0, duration: 1 })
        .set(".slide-2", { pointerEvents: "none" })
        .set(".slide-3", { pointerEvents: "auto" })
        .fromTo(".slide-3", { opacity: 0 }, { opacity: 1, duration: 1 }, "<")
        
        // End hold
        .to({}, { duration: 0.3 });
    },
    { scope: sectionRef, dependencies: [setActiveSection, setProjectsProgress] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[300vh] bg-transparent overflow-visible z-20"
    >
      {/* Sticky runway container */}
      <div
        className="sticky top-0 left-0 w-full h-screen bg-[#0A0A0A] overflow-hidden flex items-center justify-center"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {/* Subtle noise paper overlay texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        {/* Section title header */}
        <div className="absolute top-8 left-6 md:left-12 font-mono text-[9px] uppercase tracking-widest text-[#d5802a] font-bold z-30">
          Section 03 / Selected Works
        </div>

        {/* Project Slides Container */}
        <div className="relative w-full h-full max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-center">
          
          {/* Slide 1: Aether-Net */}
          <div className="project-slide slide-1 absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 pointer-events-auto">
            {/* Left: Graphic */}
            <div className="w-full md:w-[48%] flex justify-center items-center opacity-70">
              <svg className="w-full max-w-[340px] md:max-w-[420px] aspect-[4/3] stroke-[#d5802a] fill-none" viewBox="0 0 100 85">
                <circle cx="20" cy="40" r="2.5" fill="#d5802a" />
                <circle cx="20" cy="55" r="2.5" fill="#d5802a" />
                <circle cx="20" cy="25" r="2.5" fill="#d5802a" />
                <circle cx="50" cy="15" r="2.5" />
                <circle cx="50" cy="32" r="2.5" />
                <circle cx="50" cy="48" r="2.5" />
                <circle cx="50" cy="65" r="2.5" />
                <circle cx="80" cy="25" r="2.5" />
                <circle cx="80" cy="40" r="2.5" />
                <circle cx="80" cy="55" r="2.5" />
                <circle cx="92" cy="40" r="3" stroke="#de3421" strokeWidth="1" />
                
                <path d="M 22 25 L 48 15 M 22 25 L 48 32 M 22 25 L 48 48" strokeWidth="0.2" />
                <path d="M 22 40 L 48 32 M 22 40 L 48 48 M 22 40 L 48 65" strokeWidth="0.2" />
                <path d="M 22 55 L 48 48 M 22 55 L 48 65" strokeWidth="0.2" />
                <path d="M 52 15 L 78 25 M 52 15 L 78 40" strokeWidth="0.2" />
                <path d="M 52 32 L 78 25 M 52 32 L 78 40 M 52 32 L 78 55" strokeWidth="0.2" />
                <path d="M 52 48 L 78 40 M 52 48 L 78 55" strokeWidth="0.2" />
                <path d="M 78 25 L 90 40 M 78 40 L 90 40 M 78 55 L 90 40" stroke="#de3421" strokeWidth="0.4" opacity="0.6" />
                
                {/* Simulated contour waves underneath */}
                <path d="M 5 78 Q 25 70, 50 78 T 95 78" stroke="#de3421" strokeWidth="0.3" strokeDasharray="1,1" />
                <path d="M 5 81 Q 25 76, 50 81 T 95 81" stroke="#d5802a" strokeWidth="0.3" opacity="0.5" />
              </svg>
            </div>
            
            {/* Right: Text details */}
            <div className="w-full md:w-[48%] flex flex-col justify-center text-left pl-2">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest mb-3">
                <span className="font-bold text-[#de3421]">01 / 03</span>
                <span className="text-neutral-700">|</span>
                <span className="text-neutral-400 font-medium">NEURAL NETWORKS & WEBGL</span>
              </div>
              <h3 className="font-display font-medium text-3xl md:text-4xl text-white leading-none tracking-tight mb-4">
                Aether-Net
              </h3>
              <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
                An experimental neural field generator that bakes high-dimensional representations of scenes into low-latency WebGL shaders. Drastically speeds up real-time Gaussian Splatting and NeRF visualization in-browser.
              </p>
              <div className="flex gap-4 items-center">
                <a href="https://github.com/yraze/aether-net" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Codebase
                </a>
                <a href="https://aether.raze.dev" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Live Demo
                </a>
              </div>
            </div>
          </div>
          
          {/* Slide 2: Khepri Engine */}
          <div className="project-slide slide-2 absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 opacity-0 pointer-events-none">
            {/* Left: Graphic */}
            <div className="w-full md:w-[48%] flex justify-center items-center opacity-70">
              <svg className="w-full max-w-[340px] md:max-w-[420px] aspect-[4/3] stroke-[#d5802a] fill-none" viewBox="0 0 100 85">
                {/* Structural truss bridge diagram */}
                <polygon points="10,65 30,35 50,65 70,35 90,65" strokeWidth="1" />
                <line x1="10" y1="65" x2="90" y2="65" strokeWidth="1.5" />
                <line x1="30" y1="35" x2="70" y2="35" strokeDasharray="2,2" />
                <line x1="30" y1="35" x2="30" y2="65" />
                <line x1="50" y1="35" x2="50" y2="65" stroke="#de3421" strokeWidth="2" />
                <line x1="70" y1="35" x2="70" y2="65" />
                
                {/* Force vectors */}
                <path d="M 50 10 L 50 30" stroke="#de3421" strokeWidth="1.5" />
                <polygon points="48,25 50,32 52,25" fill="#de3421" stroke="none" />
                <text x="50" y="8" fontFamily="monospace" fontSize="6" fill="#de3421" stroke="none" textAnchor="middle">LOAD = 9.8 kN</text>
                
                <circle cx="50" cy="50" r="18" stroke="#d5802a" strokeWidth="0.5" strokeDasharray="1,1" />
                <circle cx="50" cy="50" r="3" fill="#de3421" />
              </svg>
            </div>
            
            {/* Right: Text details */}
            <div className="w-full md:w-[48%] flex flex-col justify-center text-left pl-2">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest mb-3">
                <span className="font-bold text-[#de3421]">02 / 03</span>
                <span className="text-neutral-700">|</span>
                <span className="text-neutral-400 font-medium">RUST WASM & PHYSICS</span>
              </div>
              <h3 className="font-display font-medium text-3xl md:text-4xl text-white leading-none tracking-tight mb-4">
                Khepri Engine
              </h3>
              <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
                A browser-based vector modeling canvas driven by a custom WASM physical solver engine. Supports structural constraints, rigid-body joints, and real-time tension stress heat-mapping.
              </p>
              <div className="flex gap-4 items-center">
                <a href="https://github.com/yraze/khepri-engine" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Codebase
                </a>
                <a href="https://khepri.raze.dev" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Live Demo
                </a>
              </div>
            </div>
          </div>

          {/* Slide 3: Nox Spatial */}
          <div className="project-slide slide-3 absolute inset-0 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 opacity-0 pointer-events-none">
            {/* Left: Graphic */}
            <div className="w-full md:w-[48%] flex justify-center items-center opacity-70">
              <svg className="w-full max-w-[340px] md:max-w-[420px] aspect-[4/3] stroke-[#d5802a] fill-none" viewBox="0 0 100 85">
                {/* Concentric soundwaves expanding */}
                <circle cx="30" cy="42" r="8" strokeWidth="0.5" />
                <circle cx="30" cy="42" r="18" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="30" cy="42" r="28" strokeWidth="0.5" />
                
                <circle cx="70" cy="42" r="8" stroke="#de3421" strokeWidth="0.5" />
                <circle cx="70" cy="42" r="18" stroke="#de3421" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="70" cy="42" r="28" stroke="#de3421" strokeWidth="0.5" />

                <circle cx="30" cy="42" r="2.5" fill="#d5802a" />
                <circle cx="70" cy="42" r="2.5" fill="#de3421" />

                {/* Oscillating sine waves */}
                <path d="M 5 15 C 20 5, 30 25, 45 15 C 60 5, 70 25, 95 15" stroke="#d5802a" strokeWidth="0.5" opacity="0.6" />
                <path d="M 5 69 C 20 79, 30 59, 45 69 C 60 79, 70 59, 95 69" stroke="#de3421" strokeWidth="0.5" opacity="0.6" />
              </svg>
            </div>
            
            {/* Right: Text details */}
            <div className="w-full md:w-[48%] flex flex-col justify-center text-left pl-2">
              <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-widest mb-3">
                <span className="font-bold text-[#de3421]">03 / 03</span>
                <span className="text-neutral-700">|</span>
                <span className="text-neutral-400 font-medium">AUDIO & WEB AUDIO API</span>
              </div>
              <h3 className="font-display font-medium text-3xl md:text-4xl text-white leading-none tracking-tight mb-4">
                Nox Spatial
              </h3>
              <p className="font-sans text-neutral-400 text-xs md:text-sm leading-relaxed mb-6">
                A procedural spatial audio synthesizer that maps cursor coordinates, local weather, and page interaction velocity into a continuous ambient soundscape. Visualizes frequency nodes in real time.
              </p>
              <div className="flex gap-4 items-center">
                <a href="https://github.com/yraze/nox-spatial" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Codebase
                </a>
                <a href="https://nox.raze.dev" target="_blank" rel="noreferrer" className="font-mono text-[10px] uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold">
                  Live Demo
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
