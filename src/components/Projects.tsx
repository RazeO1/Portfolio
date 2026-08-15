"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  color: string;        // Card background color
  accentColor: string;  // Left typography color accent
  textColor: string;    // Text color inside the card
  borderColor: string;  // Border color of the card
  githubLink: string;
  liveLink: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: "aether-net",
    number: "01",
    title: "AETHER-NET",
    category: "AI & Neural Graphics Pipeline",
    year: "2026",
    description: "An experimental neural field generator that bakes high-dimensional neural representations of scenes into low-latency WebGL shaders. Drastically speeds up real-time 3D Gaussian Splatting and NeRF visualization directly in-browser.",
    tech: ["Three.js", "GLSL Shaders", "PyTorch", "WebGL 2.0", "Next.js"],
    color: "#f5e1cd",      // Warm cream sand
    accentColor: "#de3421", // Vivid red
    textColor: "#27211b",
    borderColor: "border-[#27211b]/20",
    githubLink: "https://github.com/RazeO1/aether-net",
    liveLink: "#",
  },
  {
    id: "khepri",
    number: "02",
    title: "KHEPRI ENGINE",
    category: "Interactive Vector Physics Editor",
    year: "2025",
    description: "A browser-based vector modeling canvas driven by an custom WASM physical solver engine. Supports structural constraints, rigid-body joints, and real-time tension stress heat-mapping for architects and game designers.",
    tech: ["Rust", "WASM", "Canvas2D", "GSAP Core", "TypeScript"],
    color: "#ebc299",      // Muted clay orange
    accentColor: "#d5802a", // Dark warm orange
    textColor: "#3c332a",
    borderColor: "border-[#3c332a]/20",
    githubLink: "https://github/RazeO1/khepri",
    liveLink: "#",
  },
  {
    id: "nox",
    number: "03",
    title: "NOX SPATIAL",
    category: "Generative Audio Ambient Player",
    year: "2025",
    description: "A procedural spatial audio synthesizer that maps cursor coordinates, local weather, and page interaction velocity into a continuous ambient soundscape. Custom canvas oscillators visualize frequency nodes in real time.",
    tech: ["Tone.js", "Web Audio API", "HTML5 Canvas", "Tailwind CSS"],
    color: "#e2dbd4",      // Light editorial grey/clay
    accentColor: "#9b8064", // Olive brown
    textColor: "#2a241f",
    borderColor: "border-[#2a241f]/20",
    githubLink: "https://github/RazeO1/nox",
    liveLink: "#",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardStackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");
      if (cards.length <= 1) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Start animating as soon as section hits top
          end: "bottom bottom",  // End when we complete the scroll height
          scrub: 0.5,            // Smooth scrub rate
        },
      });

      // Stacking animation sequence:
      // Loop through card indices and transition them in sequence
      cards.forEach((card, index) => {
        if (index === 0) return; // First card is static in position 0

        const textPrev = `.text-column-${index - 1}`;
        const textCurr = `.text-column-${index}`;
        const prevCard = cards[index - 1];

        // 1. Cross-fade the Left Column metadata panel
        tl.to(
          textPrev,
          {
            opacity: 0,
            y: -25,
            duration: 0.8,
            ease: "power2.inOut",
          },
          `step-${index}`
        );

        tl.fromTo(
          textCurr,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          `step-${index}+=0.3`
        );

        // 2. Slide up and rotate the next card
        tl.fromTo(
          card,
          {
            y: "100vh",
            rotation: index % 2 === 0 ? 5 : -5,
            scale: 0.95,
          },
          {
            y: "0vh",
            rotation: index % 2 === 0 ? 1 : -1.5, // Subtle custom stack tilt
            scale: 1,
            duration: 1.2,
            ease: "power3.inOut",
          },
          `step-${index}`
        );

        // 3. Scale down and blur the underlying card slightly to add physical depth perspective
        tl.to(
          prevCard,
          {
            scale: 0.92,
            y: -15, // push up slightly
            opacity: 0.75,
            duration: 1.2,
            ease: "power3.inOut",
          },
          `step-${index}`
        );

        // Buffer hold duration at the end of each stack card cover
        tl.to({}, { duration: 0.5 });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[400vh] bg-transparent overflow-visible select-none z-20 border-t border-white/5"
    >
      {/* Sticky base container */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center bg-[#0A0A0A] overflow-hidden px-6 md:px-12 lg:px-24 py-16"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {/* Subtle noise paper overlay texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        {/* Master layout grid */}
        <div className="relative z-10 w-full max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center flex-1 h-full">
          
          {/* LEFT PANEL: Dynamic Editorial Copy (Column Span 5) */}
          <div className="lg:col-span-5 relative h-[250px] md:h-[300px] lg:h-[400px] flex flex-col justify-center items-start">
            
            {PROJECTS_DATA.map((project, idx) => (
              <div
                key={project.id}
                className={`text-column-${idx} absolute inset-0 flex flex-col justify-center items-start text-left pointer-events-auto ${
                  idx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Index & Category Label */}
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest mb-4">
                  <span
                    className="font-bold"
                    style={{ color: project.accentColor }}
                  >
                    {project.number} / {PROJECTS_DATA.length.toString().padStart(2, "0")}
                  </span>
                  <span className="text-neutral-600">|</span>
                  <span className="text-neutral-400 font-medium">{project.category}</span>
                </div>

                {/* Project Title */}
                <h3 className="font-display font-medium text-4xl md:text-5xl lg:text-6xl text-white leading-none tracking-tight mb-6">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-neutral-400 text-sm md:text-base leading-relaxed max-w-md mb-8">
                  {project.description}
                </p>

                {/* Project Links */}
                <div className="flex gap-6 items-center">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold"
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
                    Codebase
                  </a>
                  <a
                    href={project.liveLink}
                    className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white hover:line-through transition-all duration-300 font-bold"
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
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT PANEL: Absolute Stacking Cards (Column Span 7) */}
          <div
            ref={cardStackRef}
            className="lg:col-span-7 relative flex items-center justify-center h-[350px] sm:h-[450px] md:h-[500px] lg:h-[550px] w-full"
          >
            {PROJECTS_DATA.map((project, idx) => (
              <div
                key={project.id}
                className="project-card absolute w-full max-w-[480px] h-[320px] sm:h-[380px] md:h-[420px] rounded-xl border border-black p-6 flex flex-col justify-between shadow-sm select-none pointer-events-auto"
                style={{
                  backgroundColor: project.color,
                  zIndex: 10 + idx,
                  boxShadow: "rgba(0, 0, 0, 0.05) 0px 10px 30px -10px",
                }}
              >
                {/* Card Header Info */}
                <div className="flex justify-between items-start border-b border-black/10 pb-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-1">
                      selected work
                    </span>
                    <span className="font-display font-bold text-lg text-black">
                      {project.title}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-bold text-black border border-black/20 rounded-full px-2 py-0.5">
                    {project.year}
                  </div>
                </div>

                {/* Card Interactive Graphic: Decorative Technical Vector Mesh */}
                <div className="flex-1 w-full flex items-center justify-center overflow-hidden py-4 opacity-75 hover:opacity-100 transition-opacity duration-300 relative group">
                  
                  {idx === 0 && (
                    /* Aether-Net Vector Coordinates Mesh */
                    <svg className="w-[180px] h-[120px] stroke-black/30 fill-none" viewBox="0 0 100 60">
                      <g className="animate-pulse">
                        <circle cx="20" cy="15" r="1.5" className="fill-black" />
                        <circle cx="50" cy="45" r="1.5" className="fill-black" />
                        <circle cx="80" cy="20" r="1.5" className="fill-black" />
                        <circle cx="40" cy="15" r="1.5" className="fill-black" />
                        <circle cx="70" cy="40" r="1.5" className="fill-black" />
                      </g>
                      <path d="M20 15 L50 45 L80 20 M40 15 L70 40 L50 45 M20 15 L40 15 L80 20 L70 40" strokeWidth="0.5" />
                      <path d="M10 5 L90 5 M90 5 L90 55 M90 55 L10 55 M10 55 L10 5" strokeWidth="0.25" strokeDasharray="2,2" />
                      <g className="translate-x-[50px] translate-y-[30px] origin-center rotate-[30deg]">
                        <rect x="-10" y="-10" width="20" height="20" strokeWidth="0.5" strokeDasharray="1,1" />
                      </g>
                    </svg>
                  )}

                  {idx === 1 && (
                    /* Khepri Vector Constraint Blueprints */
                    <svg className="w-[160px] h-[120px] stroke-black/35 fill-none" viewBox="0 0 100 60">
                      <circle cx="50" cy="30" r="18" strokeWidth="0.5" strokeDasharray="3,3" />
                      <path d="M50 5 L50 55 M20 30 L80 30" strokeWidth="0.25" strokeDasharray="4,4" />
                      <rect x="35" y="15" width="30" height="30" strokeWidth="0.75" />
                      <path d="M35 15 L15 15 M65 45 L85 45 M65 15 L85 5" strokeWidth="0.5" />
                      <line x1="50" y1="30" x2="65" y2="45" strokeWidth="1" className="stroke-[#de3421]" />
                    </svg>
                  )}

                  {idx === 2 && (
                    /* Nox Audio Frequencies Waves */
                    <svg className="w-[200px] h-[120px] stroke-black/35 fill-none" viewBox="0 0 100 60">
                      <path d="M10 30 C 20 10, 25 50, 35 30 C 45 10, 55 50, 65 30 C 75 10, 85 50, 90 30" strokeWidth="0.75" />
                      <path d="M10 30 C 15 20, 20 40, 35 30 C 50 20, 50 40, 65 30 C 80 20, 80 40, 90 30" strokeWidth="0.5" className="stroke-black/15" />
                      <path d="M10 30 H 90" strokeWidth="0.25" strokeDasharray="5,5" />
                      <line x1="50" y1="5" x2="50" y2="55" strokeWidth="0.25" strokeDasharray="2,2" />
                      <circle cx="35" cy="30" r="2.5" className="fill-[#de3421] stroke-none" />
                      <circle cx="65" cy="30" r="2.5" className="fill-[#de3421] stroke-none" />
                    </svg>
                  )}
                  
                  {/* Technology Overlay Icon (Visual indicator of codebase) */}
                  <div className="absolute bottom-2 right-2 border border-black/10 rounded-full p-2 bg-[#fcf7f3]/50 backdrop-blur-xs scale-0 group-hover:scale-100 transition-transform duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-black"
                    >
                      <polyline points="16 18 22 12 16 6"></polyline>
                      <polyline points="8 6 2 12 8 18"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Card Footer Technical Tags */}
                <div className="border-t border-black/10 pt-4 flex flex-col gap-3">
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[9px] uppercase tracking-wider bg-[#fcf7f3]/60 border border-black/5 rounded-md px-2 py-0.5 font-bold text-neutral-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-mono text-neutral-500 uppercase tracking-widest font-semibold">
                    <span>Selected Works</span>
                    <span>{project.number}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
