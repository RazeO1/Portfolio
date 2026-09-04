"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// =================================================================
// ARCHITECTURAL METRICS & CONSTANTS
// Scaled down to match the refined aesthetic of Yash Raj's portfolio.
// Compact row height (86px), elegant 52px discs, balanced typography.
// =================================================================
const ROW_HEIGHT = 86;       // 4 rows = 344px total staff height
const COL_WIDTH = 320;        // Balanced column width
const COVER_WIDTH = 150;      // Vertical masthead column width
const TOTAL_COLUMNS = 17;

const SVG_ICONS: Record<string, string> = {
  python: `<path d="M11.927 2C6.91 2 7.22 4.17 7.22 4.17l.006 2.25h4.77v.675H5.21S2 6.72 2 11.75c0 5.03 2.8 4.88 2.8 4.88h1.67v-2.35s-.09-2.8 2.76-2.8h4.73s2.68.04 2.68-2.61V4.67S17.06 2 11.927 2zm-2.6 1.45a.95.95 0 11.002 1.9.95.95 0 01-.002-1.9zm2.74 8.42h6.78s3.21.37 3.21-4.66c0-5.03-2.8-4.88-2.8-4.88h-1.67v2.35s.09 2.8-2.76 2.8H10.5s-2.68-.04-2.68 2.61v4.21S7.46 22 12.59 22c5.02 0 4.71-2.17 4.71-2.17l-.006-2.25H12.53v-.68h6.78s3.21.37 3.21-4.66zm2.6 8.68a.95.95 0 11-.002-1.9.95.95 0 01.002 1.9z"/>`,
  react: `<ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.8" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.8" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4.2" fill="none" stroke="currentColor" stroke-width="1.8" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/>`,
  nextjs: `<circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/><path d="M9 8v8l8-9.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 12.5v3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`,
  typescript: `<rect x="3" y="3" width="18" height="18" rx="3.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M6 8.5h6m-3 0v7M14 13.5c.5.8 1.4 1.5 2.5 1.5 1.2 0 1.9-.6 1.9-1.5 0-1-1-1.4-2.2-1.8-1.5-.5-2.6-1.1-2.6-2.6 0-1.5 1.2-2.6 2.8-2.6 1.2 0 2.2.5 2.7 1.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  cpp: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M11 9a3 3 0 000 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M15 11v2m-1-1h2M19 11v2m-1-1h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
  sql: `<ellipse cx="12" cy="6" rx="7.5" ry="2.8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4.5 6v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8V6M4.5 12v6c0 1.55 3.36 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-6" fill="none" stroke="currentColor" stroke-width="2"/>`,
  pytorch: `<path d="M12.98 2.5a.75.75 0 00-1.12.11L10.3 4.5a7.5 7.5 0 106.84 5.38.75.75 0 00-1.44-.42 6 6 0 11-4.97-4.14l.87-1.18a.75.75 0 00-.62-1.64zm3.89 2.97a1.12 1.12 0 101.59 1.59 1.12 1.12 0 00-1.59-1.59z"/>`,
  threejs: `<path d="M12 2L2.5 19.5h19L12 2zm0 4.2l6.2 11.3H5.8L12 6.2z"/>`,
  blender: `<path d="M12.5 10.5a2 2 0 100 4 2 2 0 000-4zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14.93V19h-2v-2.07c-2.84-.48-5-2.94-5-5.93 0-.67.12-1.31.33-1.91l6.67 4.91zm5.67-4.02l-7-5.15c.44-.48.98-.86 1.6-1.11V4h2v2.18c2.47.67 4.3 2.76 4.67 5.37-.41.48-.84.97-1.27 1.38z"/>`,
  figma: `<circle cx="15" cy="12" r="3"/><path d="M9 3h3a3 3 0 013 3v0a3 3 0 01-3 3H9V3zm0 6h3a3 3 0 013 3v0a3 3 0 01-3 3H9V9zm0 6h3a3 3 0 010 6 3 3 0 01-3-3v-3zm0-12H6a3 3 0 00-3 3v0a3 3 0 003 3h3V3zm0 6H6a3 3 0 00-3 3v0a3 3 0 003 3h3V9z"/>`,
  gsap: `<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M16 8l-6 4 6 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
  cuda: `<path d="M12 3a9 9 0 00-9 9c0 4.97 4.03 9 9 9 3.5 0 6.54-2 8-5h-3.2A5.8 5.8 0 0112 18a6 6 0 110-12c2.1 0 3.9 1.1 5 2.7H20A9 9 0 0012 3z"/>`,
  tailwind: `<path d="M12 6c-3.6 0-5.8 1.8-6.6 5.4 1.3-1.8 2.9-2.5 4.8-2 1.1.3 1.9 1.1 2.8 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.8 2-1.1-.3-1.9-1.1-2.8-2-1.4-1.4-3-3.1-6.8-3.1zm-6.6 6.5C1.8 12.5-.4 14.3-1.2 17.9c1.3-1.8 2.9-2.5 4.8-2 1.1.3 1.9 1.1 2.8 2 1.4 1.4 3 3.1 6.8 3.1 3.6 0 5.8-1.8 6.6-5.4-1.3 1.8-2.9 2.5-4.8 2-1.1-.3-1.9-1.1-2.8-2-1.4-1.4-3-3.1-6.8-3.1z"/>`,
  opencv: `<circle cx="12" cy="6.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="6.5" cy="16.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="16.5" r="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="1.5"/>`,
  fastapi: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-3l2-5H9l4-5v4h3l-3 6z"/>`,
  yolo: `<rect x="3" y="3" width="18" height="18" rx="3.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="2" x2="12" y2="5" stroke="currentColor" stroke-width="2"/><line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" stroke-width="2"/><line x1="2" y1="12" x2="5" y2="12" stroke="currentColor" stroke-width="2"/><line x1="19" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2"/>`,
  docker: `<path d="M22 12.5c-.4-1.2-1.6-1.8-2.6-1.8-.7 0-1.4.3-1.8.8-1.2-.8-2.6-.9-3.6-.3-.8-.8-2-.9-3-.3-.9-.9-2.5-.9-3.5 0-1-.8-2.4-.7-3.3.3-1.6 1.7-2.2 4.2-2.2 6.5h18s1.6-2.5 2-5.2zM2 13h2v2H2zm3 0h2v2H5zm3 0h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-6-3h2v2H8zm3 0h2v2h-2zm3 0h2v2h-2zm-3-3h2v2h-2z"/>`,
  linux: `<path d="M12 2C9.5 2 7.8 3.5 7.8 6c0 1.2.4 2.2 1 3-1.8 1.5-3 3.8-3 6.5 0 2.5 1.5 4.5 4 4.5h4.4c2.5 0 4-2 4-4.5 0-2.7-1.2-5-3-6.5.6-.8 1-1.8 1-3 0-2.5-1.7-4-4.2-4zm-1.5 3a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2z"/>`,
  transformers: `<path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2zm0 2.3L5.8 7.8 12 11.2l6.2-3.4L12 4.3zM5.5 9.4v7.2L11 19.7v-7.1L5.5 9.4zm13 0l-5.5 3.2v7.1l5.5-3.1V9.4z"/>`,
  onnx: `<path d="M12 2L4 7v10l8 5 8-5V7l-8-5zM12 6l5 3v6l-5 3-5-3V9l5-3z" fill="none" stroke="currentColor" stroke-width="2"/>`,
  arduino: `<path d="M7.5 7A5.5 5.5 0 002 12.5a5.5 5.5 0 009.6 3.7L12 15.8l.4.4A5.5 5.5 0 0022 12.5 5.5 5.5 0 0016.5 7a5.4 5.4 0 00-4.5 2.4A5.4 5.4 0 007.5 7zm0 2c1.9 0 3.5 1.6 3.5 3.5S9.4 16 7.5 16 4 14.4 4 12.5 5.6 9 7.5 9zm9 0c1.9 0 3.5 1.6 3.5 3.5s-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5 1.6-3.5 3.5-3.5zM6 12h3v1H6zm10-1.5h1v1h1v1h-1v1h-1v-1h-1v-1h1z"/>`
};

// Pure technical skills: strictly ordered with mandated opening sequence
const MUSICAL_SKILLS = [
  // Mandated Opening Priority Sequence
  { id: "python", name: "Python", row: 1, col: 1, offset: 24, sub: "Primary Language // AI, ML & Systems", cat: "LANGUAGES" },
  { id: "react", name: "React", row: 2, col: 2, offset: 24, sub: "React 19 Concurrent UI // State Machines", cat: "FRONTEND" },
  { id: "nextjs", name: "Next.js", row: 3, col: 3, offset: 24, sub: "Next.js 16 App Router // Turbopack", cat: "FULL-STACK" },
  { id: "typescript", name: "TypeScript", row: 4, col: 4, offset: 24, sub: "Strict Typing // Scalable Architecture", cat: "TYPE-SAFE" },
  
  // Harmonic Two-Note Interval in Column 5
  { id: "cpp", name: "C++", row: 1, col: 5, offset: 24, sub: "High-Performance Algorithms & Memory", cat: "SYSTEMS" },
  { id: "sql", name: "SQL", row: 2, col: 5, offset: 24, sub: "Relational Indexing // ACID Transactions", cat: "DATA" },

  // Spatial & Creative Graphics
  { id: "threejs", name: "Three.js", row: 3, col: 6, offset: 24, sub: "WebGL 3D // Custom PBR Shaders & R3F", cat: "3D WEB" },
  { id: "pytorch", name: "PyTorch", row: 1, col: 7, offset: 24, sub: "Deep Learning // CNNs & CUDA AMP", cat: "AI/ML" },
  { id: "blender", name: "Blender", row: 4, col: 7, offset: 24, sub: "3D Geometry // Morph Targets & Rigging", cat: "3D PIPELINE" },

  // Design Systems & High Compute
  { id: "figma", name: "Figma", row: 2, col: 8, offset: 24, sub: "Design Systems // Vector Tokens & Spec", cat: "DESIGN" },
  { id: "cuda", name: "CUDA", row: 1, col: 9, offset: 24, sub: "GPU Acceleration // ~62ms Real-Time", cat: "COMPUTE" },
  { id: "gsap", name: "GSAP", row: 3, col: 9, offset: 24, sub: "ScrollTrigger // Physics Lerp & Motion", cat: "ANIMATION" },

  // Responsive UI & Vision
  { id: "tailwind", name: "Tailwind", row: 4, col: 10, offset: 24, sub: "Tailwind v4 // Modern CSS Layout", cat: "STYLING" },
  { id: "opencv", name: "OpenCV", row: 2, col: 11, offset: 24, sub: "Computer Vision // Video Processing", cat: "VISION" },

  // Asynchronous Backend & Edge
  { id: "fastapi", name: "FastAPI", row: 1, col: 12, offset: 24, sub: "Asynchronous REST // <100ms Services", cat: "BACKEND" },
  { id: "yolo", name: "YOLO", row: 3, col: 12, offset: 24, sub: "Real-Time Object Detection // 94% mAP", cat: "EDGE AI" },

  // DevOps & Operating Systems
  { id: "docker", name: "Docker", row: 4, col: 13, offset: 24, sub: "Containerization // Multi-Stage CI/CD", cat: "INFRA" },
  { id: "linux", name: "Linux", row: 2, col: 14, offset: 24, sub: "POSIX Kernel // Shell Scripting & GitOps", cat: "SYSTEMS" },

  // Advanced Models & Hardware
  { id: "transformers", name: "Transformers", row: 1, col: 15, offset: 24, sub: "Multi-Temporal Attention // LLMs", cat: "AI MODELS" },
  { id: "onnx", name: "ONNX", row: 3, col: 15, offset: 24, sub: "Cross-Platform Graph Acceleration", cat: "RUNTIME" },
  { id: "arduino", name: "Arduino", row: 4, col: 16, offset: 24, sub: "Embedded IoT // Microcontrollers & Sensors", cat: "HARDWARE" }
];

// =================================================================
// CANVAS GENERATIVE COMPONENT (Skill: canvas-generative)
// DPR-aware, particle pool, sine wave harmonics along the 4 strings.
// Ambient resonance connecting nodes with vermilion/ochre frequencies.
// =================================================================
function GenerativeStaffCanvas({ activeHoverId }: { activeHoverId: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    // Fixed pool of particles to prevent GC pressure (Skill standard)
    const POOL_SIZE = 72;
    const particles = new Array(POOL_SIZE);
    
    const initParticles = (w: number) => {
      for (let i = 0; i < POOL_SIZE; i++) {
        const row = (i % 4) + 1;
        const baseY = (row - 0.5) * ROW_HEIGHT;
        particles[i] = {
          x: Math.random() * Math.max(w, 2000),
          baseY,
          y: baseY,
          vx: 0.35 + Math.random() * 0.55,
          row,
          radius: 1.2 + Math.random() * 1.8,
          phase: Math.random() * Math.PI * 2,
          color: i % 3 === 0 ? "rgba(222, 52, 33, 0.45)" : i % 3 === 1 ? "rgba(213, 128, 42, 0.4)" : "rgba(10, 10, 10, 0.25)"
        };
      }
    };

    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = parent.scrollWidth || rect.width;
      height = rect.height;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      initParticles(width);
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (canvas.parentElement) {
      ro.observe(canvas.parentElement);
    }

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle harmonic wave trails along each of the 4 strings
      ctx.lineWidth = 1;
      for (let r = 1; r <= 4; r++) {
        const lineY = r * ROW_HEIGHT;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(222, 52, 33, 0.06)";
        for (let x = 0; x < width; x += 30) {
          const waveY = lineY + Math.sin(x * 0.008 + time + r) * 2;
          if (x === 0) ctx.moveTo(x, waveY);
          else ctx.lineTo(x, waveY);
        }
        ctx.stroke();
      }

      // 2. Update and draw generative harmonic particles
      for (let i = 0; i < POOL_SIZE; i++) {
        const p = particles[i];
        if (!p) continue;

        p.x += p.vx;
        if (p.x > width) p.x = 0;

        // Harmonic sine wave oscillation around its string line
        p.y = p.baseY + Math.sin(time * 1.5 + p.phase) * 6;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Connect nearby particles across strings with delicate frequency filaments
        for (let j = i + 1; j < Math.min(i + 5, POOL_SIZE); j++) {
          const p2 = particles[j];
          if (!p2) continue;
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4500) { // ~67px
            const alpha = (1 - distSq / 4500) * 0.15;
            ctx.strokeStyle = `rgba(222, 52, 33, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 opacity-75"
    />
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);

  // Dynamic scroll runway height: computed so horizontal scroll finishes 100% before vertical release
  const [scrollRange, setScrollRange] = useState<number>(3800);

  // Floating HUD Tooltip state
  const [tooltipData, setTooltipData] = useState<{ visible: boolean; name: string; sub: string; x: number; y: number }>({
    visible: false,
    name: "",
    sub: "",
    x: 0,
    y: 0
  });

  const totalStageWidth = TOTAL_COLUMNS * COL_WIDTH + 480;

  // Calibrate exact scroll distance so the runway scrolls completely horizontally
  const updateMetrics = useCallback(() => {
    const runway = runwayRef.current;
    if (!runway) return;
    const maxHorizontal = Math.max(0, runway.scrollWidth - window.innerWidth);
    // Add 400px of resting cushion at the end so the user comfortably sees the complete repertoire before unpinning
    const neededScroll = maxHorizontal + 400;
    setScrollRange(neededScroll);
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics]);

  // Bind GSAP ScrollTrigger to the sticky runway container
  useGSAP(
    () => {
      const section = sectionRef.current;
      const runway = runwayRef.current;
      if (!section || !runway) return;

      const getMaxScroll = () => Math.max(0, runway.scrollWidth - window.innerWidth);

      // Horizontal scrub timeline pinned stickily over the calibrated scrollRange
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.5,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`;
            }
          }
        }
      });

      // Scrub runway horizontally to the exact end
      tl.to(runway, {
        x: () => -getMaxScroll(),
        ease: "none",
        duration: 1
      });

      // Subtle architectural typographic parallax lag
      tl.fromTo(
        ".h-d-text",
        { x: "0.4em" },
        { x: "-0.4em", ease: "none", stagger: 0.015 },
        0
      );
    },
    { scope: sectionRef, dependencies: [scrollRange] }
  );

  // Smooth jump to specific column on clicking bottom category links
  const handleJumpToCol = (colIndex: number) => {
    const section = sectionRef.current;
    const runway = runwayRef.current;
    if (!section || !runway) return;

    const maxHorizontal = Math.max(0, runway.scrollWidth - window.innerWidth);
    const targetX = Math.min(maxHorizontal, (colIndex - 1) * COL_WIDTH);
    const progress = maxHorizontal > 0 ? targetX / maxHorizontal : 0;

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const scrollableDistance = section.offsetHeight - window.innerHeight;
    const targetScrollY = sectionTop + progress * scrollableDistance;

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetScrollY, behavior: "smooth" });
    }
  };

  // Jump to Projects section immediately
  const handleSkipToProjects = () => {
    const projects = document.getElementById("projects");
    if (!projects) return;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(projects, { duration: 1.2 });
    } else {
      projects.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="skills"
      style={{ height: `calc(100vh + ${scrollRange}px)` }}
      className="relative w-full bg-[#fcf7f3] select-none z-20 border-t border-black/10"
    >
      {/* Sticky Viewport Stage: Pinned cleanly in viewport while scrolling horizontally */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-between bg-[#fcf7f3] text-[#0A0A0A]">
        
        {/* =============================================================
            TOP STATUS BAR (Refined Architectural Header)
            ============================================================= */}
        <header className="w-full h-[58px] px-6 md:px-12 flex items-center justify-between z-30 border-b border-black/10 bg-[#fcf7f3]/95 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            {/* Animated Equalizer Wave Bars in brand red #de3421 */}
            <div className="flex items-end gap-[2px] h-3.5" title="Harmonic Resonance">
              <span className="w-[2px] h-1.5 bg-[#de3421] rounded-[1px] animate-[pulse_1s_infinite_alternate]" />
              <span className="w-[2px] h-3.5 bg-[#de3421] rounded-[1px] animate-[pulse_1.2s_infinite_alternate_0.2s]" />
              <span className="w-[2px] h-2 bg-[#de3421] rounded-[1px] animate-[pulse_0.9s_infinite_alternate_0.1s]" />
              <span className="w-[2px] h-3 bg-[#de3421] rounded-[1px] animate-[pulse_1.3s_infinite_alternate_0.3s]" />
            </div>
            <div>
              <span className="font-mono text-[9.5px] uppercase tracking-widest text-[#de3421] font-bold block leading-none">
                Section 03 / Core Stack
              </span>
              <span className="font-sans font-bold text-[12.5px] text-[#0A0A0A] leading-tight block mt-0.5">
                Technical Repertoire
              </span>
            </div>
          </div>

          <div className="hidden lg:block max-w-lg text-center font-sans text-[11.5px] font-medium text-neutral-600 leading-snug">
            Interactive horizontal score &mdash; 4 harmonic staff strings detailing production engineering systems.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 font-bold hidden sm:inline-block">
              Scroll &darr; &rarr;
            </span>
            <button
              onClick={handleSkipToProjects}
              className="font-mono text-[10px] uppercase tracking-wider text-[#de3421] hover:underline font-bold cursor-pointer"
            >
              Skip to Projects &darr;
            </button>
          </div>
        </header>

        {/* =============================================================
            MAIN 4-ROW ARCHITECTURAL GRID STAGE
            Scaled to 344px (86px/row) so it sits centered with high elegance
            ============================================================= */}
        <div className="relative flex-1 w-full overflow-hidden flex items-center justify-start">
          
          <div ref={runwayRef} className="relative h-[344px] flex will-change-transform">
            
            {/* COLUMN 00: VERTICAL "SKILLS" MASTHEAD COVER */}
            <aside className="relative w-[150px] min-w-[150px] h-[344px] shrink-0 border-y border-l border-black/90 flex flex-col bg-[#fcf7f3] z-20">
              {/* 4 horizontal string row guides running through cover */}
              <div className="w-full h-[86px] border-b border-black/90" />
              <div className="w-full h-[86px] border-b border-black/90" />
              <div className="w-full h-[86px] border-b border-black/90" />
              <div className="w-full h-[86px]" />

              {/* Vertical "SKILLS" Typographic Masthead */}
              <div className="absolute inset-0 flex flex-col justify-between items-center py-3 z-20 pointer-events-auto">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#de3421]">
                  SEC 03
                </span>
                
                <div className="w-full h-[75%] flex items-center justify-center">
                  <svg viewBox="0 0 100 320" preserveAspectRatio="xMidYMid meet" className="w-full h-full overflow-visible">
                    <text
                      x="50"
                      y="160"
                      textAnchor="middle"
                      dominantBaseline="central"
                      transform="rotate(-90 50 160)"
                      className="fill-[#0A0A0A] font-sans font-black text-[72px] tracking-[0.18em] transition-colors duration-200 hover:fill-[#de3421]"
                      style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                    >
                      SKILLS
                    </text>
                  </svg>
                </div>

                <span className="font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-neutral-500">
                  STRINGS 01–04
                </span>
              </div>

              {/* Right vertical column divider */}
              <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-black/90" />
            </aside>

            {/* THE 17-COLUMN GRID STAGE */}
            <div
              className="relative h-[344px] flex flex-col shrink-0 border-y border-black/90"
              style={{ width: `${totalStageWidth}px` }}
            >
              {/* Generative Canvas 2D Soundwaves Layer behind the strings */}
              <GenerativeStaffCanvas activeHoverId={activeHoverId} />

              {/* Vertical Columns Grid Lines (Columns 01 to 17) */}
              <div className="absolute inset-0 flex pointer-events-none z-0">
                {Array.from({ length: TOTAL_COLUMNS }, (_, i) => i + 1).map((colNum) => (
                  <div
                    key={colNum}
                    className="relative shrink-0 h-full border-r border-black/90"
                    style={{ width: `${COL_WIDTH}px` }}
                  >
                    {/* Column number index touching top horizontal line */}
                    <span className="absolute -top-5 left-0 -translate-x-1/2 font-sans text-[11px] font-bold text-[#0A0A0A] tracking-tight">
                      {colNum < 10 ? `0${colNum}` : colNum}
                    </span>
                  </div>
                ))}
              </div>

              {/* ROW 1: HIGH TREBLE */}
              <div className="relative h-[86px] w-full border-b border-black/90 flex items-center z-10">
                {MUSICAL_SKILLS.filter((s) => s.row === 1).map((skill) => (
                  <div
                    key={skill.id}
                    className="group absolute h-[86px] inline-flex items-center whitespace-nowrap cursor-pointer z-10"
                    style={{ left: `${(skill.col - 1) * COL_WIDTH + skill.offset}px` }}
                    onMouseEnter={(e) => {
                      setActiveHoverId(skill.id);
                      setTooltipData({ visible: true, name: skill.name, sub: skill.sub, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setActiveHoverId(null);
                      setTooltipData((prev) => ({ ...prev, visible: false }));
                    }}
                    onMouseMove={(e) => {
                      setTooltipData((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
                    }}
                  >
                    <span className="absolute -top-1.5 left-2 bg-[#0A0A0A] text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      {skill.cat}
                    </span>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#0A0A0A] text-white inline-flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#de3421] group-hover:shadow-md group-hover:shadow-[#de3421]/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[24px] h-[24px] fill-current transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{ __html: SVG_ICONS[skill.id] || "" }}
                      />
                    </div>
                    <h3
                      className="h-d-text font-sans font-extrabold text-[clamp(32px,3.8vw,52px)] tracking-[-0.04em] leading-none text-[#0A0A0A] ml-3.5 transition-colors duration-200 group-hover:text-[#de3421]"
                      style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* ROW 2: UPPER HARMONY */}
              <div className="relative h-[86px] w-full border-b border-black/90 flex items-center z-10">
                {MUSICAL_SKILLS.filter((s) => s.row === 2).map((skill) => (
                  <div
                    key={skill.id}
                    className="group absolute h-[86px] inline-flex items-center whitespace-nowrap cursor-pointer z-10"
                    style={{ left: `${(skill.col - 1) * COL_WIDTH + skill.offset}px` }}
                    onMouseEnter={(e) => {
                      setActiveHoverId(skill.id);
                      setTooltipData({ visible: true, name: skill.name, sub: skill.sub, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setActiveHoverId(null);
                      setTooltipData((prev) => ({ ...prev, visible: false }));
                    }}
                    onMouseMove={(e) => {
                      setTooltipData((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
                    }}
                  >
                    <span className="absolute -top-1.5 left-2 bg-[#0A0A0A] text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      {skill.cat}
                    </span>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#0A0A0A] text-white inline-flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#de3421] group-hover:shadow-md group-hover:shadow-[#de3421]/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[24px] h-[24px] fill-current transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{ __html: SVG_ICONS[skill.id] || "" }}
                      />
                    </div>
                    <h3
                      className="h-d-text font-sans font-extrabold text-[clamp(32px,3.8vw,52px)] tracking-[-0.04em] leading-none text-[#0A0A0A] ml-3.5 transition-colors duration-200 group-hover:text-[#de3421]"
                      style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* ROW 3: LOWER HARMONY */}
              <div className="relative h-[86px] w-full border-b border-black/90 flex items-center z-10">
                {MUSICAL_SKILLS.filter((s) => s.row === 3).map((skill) => (
                  <div
                    key={skill.id}
                    className="group absolute h-[86px] inline-flex items-center whitespace-nowrap cursor-pointer z-10"
                    style={{ left: `${(skill.col - 1) * COL_WIDTH + skill.offset}px` }}
                    onMouseEnter={(e) => {
                      setActiveHoverId(skill.id);
                      setTooltipData({ visible: true, name: skill.name, sub: skill.sub, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setActiveHoverId(null);
                      setTooltipData((prev) => ({ ...prev, visible: false }));
                    }}
                    onMouseMove={(e) => {
                      setTooltipData((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
                    }}
                  >
                    <span className="absolute -top-1.5 left-2 bg-[#0A0A0A] text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      {skill.cat}
                    </span>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#0A0A0A] text-white inline-flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#de3421] group-hover:shadow-md group-hover:shadow-[#de3421]/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[24px] h-[24px] fill-current transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{ __html: SVG_ICONS[skill.id] || "" }}
                      />
                    </div>
                    <h3
                      className="h-d-text font-sans font-extrabold text-[clamp(32px,3.8vw,52px)] tracking-[-0.04em] leading-none text-[#0A0A0A] ml-3.5 transition-colors duration-200 group-hover:text-[#de3421]"
                      style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* ROW 4: DEEP BASS */}
              <div className="relative h-[86px] w-full flex items-center z-10">
                {MUSICAL_SKILLS.filter((s) => s.row === 4).map((skill) => (
                  <div
                    key={skill.id}
                    className="group absolute h-[86px] inline-flex items-center whitespace-nowrap cursor-pointer z-10"
                    style={{ left: `${(skill.col - 1) * COL_WIDTH + skill.offset}px` }}
                    onMouseEnter={(e) => {
                      setActiveHoverId(skill.id);
                      setTooltipData({ visible: true, name: skill.name, sub: skill.sub, x: e.clientX, y: e.clientY });
                    }}
                    onMouseLeave={() => {
                      setActiveHoverId(null);
                      setTooltipData((prev) => ({ ...prev, visible: false }));
                    }}
                    onMouseMove={(e) => {
                      setTooltipData((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
                    }}
                  >
                    <span className="absolute -top-1.5 left-2 bg-[#0A0A0A] text-white font-mono text-[8px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none z-20">
                      {skill.cat}
                    </span>
                    <div className="w-[52px] h-[52px] rounded-full bg-[#0A0A0A] text-white inline-flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-105 group-hover:bg-[#de3421] group-hover:shadow-md group-hover:shadow-[#de3421]/30">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-[24px] h-[24px] fill-current transition-transform duration-300 group-hover:scale-110"
                        dangerouslySetInnerHTML={{ __html: SVG_ICONS[skill.id] || "" }}
                      />
                    </div>
                    <h3
                      className="h-d-text font-sans font-extrabold text-[clamp(32px,3.8vw,52px)] tracking-[-0.04em] leading-none text-[#0A0A0A] ml-3.5 transition-colors duration-200 group-hover:text-[#de3421]"
                      style={{ fontFamily: "'Inter Tight', var(--font-sans), sans-serif" }}
                    >
                      {skill.name}
                    </h3>
                  </div>
                ))}
              </div>

              {/* FINAL CODA / COMPLETION ANCHOR */}
              <div
                className="absolute top-0 bottom-0 flex items-center pl-10 border-l border-black/90 z-10"
                style={{ left: `${TOTAL_COLUMNS * COL_WIDTH}px`, width: "380px" }}
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 font-mono text-[10px] font-bold uppercase tracking-widest text-[#de3421]">
                    <span className="w-2 h-2 rounded-full bg-[#de3421] animate-ping" />
                    <span>Repertoire Complete</span>
                  </div>
                  <p className="font-sans text-xs font-semibold text-[#0A0A0A] leading-snug">
                    Continue scrolling down to explore selected production works.
                  </p>
                  <button
                    onClick={handleSkipToProjects}
                    className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase font-bold text-[#0A0A0A] hover:text-[#de3421] transition-colors cursor-pointer"
                  >
                    <span>Proceed to Projects</span>
                    <span>&darr;</span>
                  </button>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* =============================================================
            BOTTOM BAR (Refined Navigation Jump Filters)
            ============================================================= */}
        <footer className="relative w-full h-[52px] px-6 md:px-12 flex items-center justify-between z-30 border-t border-black/10 bg-[#fcf7f3]/95 backdrop-blur-sm text-[11.5px] font-bold">
          <div className="flex items-center gap-5 sm:gap-8 overflow-x-auto no-scrollbar py-2">
            <button
              onClick={() => handleJumpToCol(1)}
              className="group flex items-center gap-2 cursor-pointer text-[#0A0A0A] hover:text-[#de3421] transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:bg-[#de3421] transition-colors" />
              <span>Python &bull; React &bull; Next &bull; TS &bull; C++ &bull; SQL</span>
            </button>

            <button
              onClick={() => handleJumpToCol(6)}
              className="group hidden sm:flex items-center gap-2 cursor-pointer text-[#0A0A0A] hover:text-[#de3421] transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:bg-[#de3421] transition-colors" />
              <span>Three.js &bull; Blender &bull; Figma &bull; GSAP</span>
            </button>

            <button
              onClick={() => handleJumpToCol(10)}
              className="group hidden md:flex items-center gap-2 cursor-pointer text-[#0A0A0A] hover:text-[#de3421] transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:bg-[#de3421] transition-colors" />
              <span>Tailwind &bull; OpenCV &bull; FastAPI &bull; YOLO</span>
            </button>

            <button
              onClick={() => handleJumpToCol(13)}
              className="group hidden lg:flex items-center gap-2 cursor-pointer text-[#0A0A0A] hover:text-[#de3421] transition-colors whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] group-hover:bg-[#de3421] transition-colors" />
              <span>Docker &bull; Linux &bull; Transformers &bull; Arduino</span>
            </button>
          </div>

          <div className="flex items-center gap-3 shrink-0 ml-4">
            <button
              onClick={handleSkipToProjects}
              className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 hover:text-[#0A0A0A] transition-colors cursor-pointer hidden sm:inline-block"
            >
              Projects &darr;
            </button>
          </div>

          {/* Real-time Scroll Progress Line */}
          <div className="absolute -top-[1px] left-0 w-full h-[2px] bg-black/5">
            <div
              ref={progressBarRef}
              className="h-full bg-[#de3421] w-0 transition-all duration-75 ease-out"
            />
          </div>
        </footer>

      </div>

      {/* Floating HUD Tooltip */}
      {tooltipData.visible && (
        <div
          className="fixed pointer-events-none z-[1000] -translate-x-1/2 -translate-y-[135%] bg-[#0A0A0A] text-white px-3 py-1.5 rounded shadow-xl font-mono text-[11px] border border-white/10"
          style={{ left: `${tooltipData.x}px`, top: `${tooltipData.y}px` }}
        >
          <strong className="text-[#de3421]">{tooltipData.name}</strong> &mdash; {tooltipData.sub}
        </div>
      )}
    </section>
  );
}
