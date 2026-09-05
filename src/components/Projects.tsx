"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, FileText, ArrowUpRight } from "lucide-react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function GithubIcon({ className = "w-3 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

interface ProjectsProps {
  setActiveSection?: (section: number) => void;
  setProjectsProgress?: (progress: number) => void;
}

interface ProjectData {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  github?: string;
  demo?: string;
  paper?: string;
  accentColor: string;
  positionClass: string; // Left, Right, Center placement
  renderGraphic: () => React.ReactNode;
}

export default function Projects({ setActiveSection, setProjectsProgress }: ProjectsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pinnedStageRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorVisible, setCursorVisible] = useState(false);

  // Individual card refs for GSAP scroll scrub choreography
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const card4Ref = useRef<HTMLDivElement>(null);
  const card5Ref = useRef<HTMLDivElement>(null);

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

  // Verified authentic engineering projects
  const projects: ProjectData[] = [
    {
      id: "plantvision-ai",
      num: "01",
      title: "PlantVision AI",
      subtitle: "Full-Stack Agricultural Disease Diagnosis",
      category: "DEEP LEARNING",
      year: "2026",
      description:
        "Production-grade agricultural diagnosis platform serving fine-tuned ResNet-34 across 38 disease categories. Features modular FastAPI inference (<100ms) and responsive Next.js drag-and-drop interface.",
      metrics: [
        { label: "Accuracy", value: "99.78%" },
        { label: "Classes", value: "38 Diseases" },
        { label: "Latency", value: "<100ms" },
      ],
      tags: ["Next.js 14", "TypeScript", "FastAPI", "PyTorch", "ResNet-34", "Docker"],
      github: "https://github.com/RazeO1/PlantVision-AI",
      demo: "https://github.com/RazeO1/PlantVision-AI",
      accentColor: "#de3421",
      positionClass: "left-[4%] sm:left-[7%] md:left-[9%] lg:left-[11%] w-[90vw] sm:w-[50vw] md:w-[42vw] lg:w-[36vw] max-w-[490px]",
      renderGraphic: () => (
        <svg viewBox="0 0 360 200" className="w-full h-full stroke-neutral-500 fill-none overflow-visible select-none">
          <circle cx="180" cy="100" r="70" stroke="#de3421" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.35" />
          <circle cx="180" cy="100" r="40" stroke="#de3421" strokeWidth="1" opacity="0.5" />
          <circle cx="180" cy="100" r="3" fill="#de3421" />
          <line x1="60" y1="100" x2="150" y2="100" stroke="#de3421" strokeWidth="0.8" opacity="0.4" />
          <line x1="210" y1="100" x2="300" y2="100" stroke="#de3421" strokeWidth="0.8" opacity="0.4" />
          <line x1="180" y1="20" x2="180" y2="70" stroke="#de3421" strokeWidth="0.8" opacity="0.4" />
          <line x1="180" y1="130" x2="180" y2="180" stroke="#de3421" strokeWidth="0.8" opacity="0.4" />
          <path d="M 130 145 C 120 90, 160 50, 230 45 C 235 110, 190 150, 130 145 Z" stroke="#de3421" strokeWidth="1.5" opacity="0.85" />
          <path d="M 130 145 Q 175 105, 230 45" stroke="#de3421" strokeWidth="1" opacity="0.6" />
          <rect x="145" y="70" width="70" height="60" stroke="#d5802a" strokeWidth="1" strokeDasharray="2 2" opacity="0.8" />
          <rect x="145" y="58" width="62" height="12" fill="#d5802a" opacity="0.2" />
          <text x="148" y="67" fill="#d5802a" fontSize="7.5" fontFamily="monospace" fontWeight="bold">BLIGHT 99.78%</text>
          <g opacity="0.6">
            <rect x="35" y="45" width="22" height="30" stroke="#fff" strokeWidth="0.7" />
            <rect x="42" y="50" width="22" height="30" stroke="#fff" strokeWidth="0.7" />
            <rect x="49" y="55" width="22" height="30" stroke="#de3421" strokeWidth="1" />
            <text x="35" y="98" fill="#888" fontSize="6.5" fontFamily="monospace">224x224</text>
            <text x="35" y="108" fill="#de3421" fontSize="6.5" fontFamily="monospace" fontWeight="bold">RESNET-34</text>
          </g>
          <g opacity="0.7">
            <rect x="255" y="130" width="75" height="32" stroke="#fff" strokeWidth="0.6" strokeDasharray="2 2" />
            <text x="261" y="142" fill="#fff" fontSize="6.5" fontFamily="monospace">INFERENCE: 18ms</text>
            <text x="261" y="152" fill="#de3421" fontSize="6.5" fontFamily="monospace" fontWeight="bold">STATUS: VERIFIED</text>
          </g>
        </svg>
      ),
    },
    {
      id: "lamtt-6g-edge",
      num: "02",
      title: "LAMTT 6G Edge AI",
      subtitle: "Latency-Aware Multi-Temporal Transformer",
      category: "EDGE AI & 6G",
      year: "2025–2026",
      description:
        "Architected at Universiti Malaysia Perlis (UniMAP) for 6G edge intelligence. Features multi-scale temporal attention capturing dependencies with ~62ms inference latency and 67% lower overhead.",
      metrics: [
        { label: "Edge Latency", value: "~62ms" },
        { label: "Accuracy Gain", value: "+40%" },
        { label: "Overhead Cut", value: "67%" },
      ],
      tags: ["PyTorch", "Transformers", "FastAPI", "Edge Computing", "Docker", "CUDA"],
      github: "https://github.com/RazeO1/LAMTT-Financial-Intelligence",
      paper: "https://github.com/RazeO1/LAMTT-Financial-Intelligence",
      accentColor: "#d5802a",
      positionClass: "right-[4%] sm:right-[7%] md:right-[9%] lg:right-[11%] w-[90vw] sm:w-[52vw] md:w-[44vw] lg:w-[38vw] max-w-[500px]",
      renderGraphic: () => (
        <svg viewBox="0 0 360 200" className="w-full h-full stroke-neutral-500 fill-none overflow-visible select-none">
          <line x1="40" y1="150" x2="320" y2="150" stroke="#333" strokeWidth="0.8" />
          <line x1="40" y1="100" x2="320" y2="100" stroke="#222" strokeWidth="0.6" strokeDasharray="2 2" />
          <line x1="40" y1="50" x2="320" y2="50" stroke="#222" strokeWidth="0.6" strokeDasharray="2 2" />
          <path d="M 40 100 Q 60 70, 80 100 T 120 100 T 160 100 T 200 100 T 240 100 T 280 100 T 320 100" stroke="#d5802a" strokeWidth="1.2" opacity="0.8" />
          <path d="M 40 120 C 80 50, 120 150, 160 90 C 200 30, 240 150, 280 80 C 300 45, 310 110, 320 95" stroke="#de3421" strokeWidth="1.8" opacity="0.9" />
          <path d="M 40 135 Q 180 40, 320 110" stroke="#fff" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.4" />
          <circle cx="80" cy="100" r="3" fill="#d5802a" />
          <circle cx="160" cy="90" r="3.5" fill="#de3421" />
          <circle cx="240" cy="100" r="3" fill="#d5802a" />
          <circle cx="280" cy="80" r="4" fill="#de3421" stroke="#fff" strokeWidth="1" />
          <line x1="280" y1="40" x2="280" y2="74" stroke="#de3421" strokeWidth="1" strokeDasharray="1 2" />
          <rect x="250" y="22" width="60" height="18" fill="#0A0A0A" stroke="#de3421" strokeWidth="1" rx="2" />
          <text x="280" y="34" fill="#de3421" fontSize="8" fontFamily="monospace" fontWeight="bold" textAnchor="middle">~62ms EDGE</text>
          <g opacity="0.6">
            <circle cx="55" cy="40" r="8" stroke="#d5802a" strokeWidth="0.7" />
            <circle cx="55" cy="40" r="2" fill="#d5802a" />
            <text x="70" y="43" fill="#888" fontSize="7" fontFamily="monospace">6G EDGE MESH</text>
          </g>
        </svg>
      ),
    },
    {
      id: "aiot-smart-parking",
      num: "03",
      title: "AIoT Smart Parking",
      subtitle: "Sensor Telemetry & Predictive Analytics",
      category: "DISTRIBUTED SYSTEMS",
      year: "2025",
      description:
        "Enterprise smart parking infrastructure handling real-time sensor data ingestion for 50+ slots. Winner of Prometeo Hackathon (1st among 641 teams). Includes WebSocket live broadcasts and predictive reservation logic.",
      metrics: [
        { label: "Live Capacity", value: "50+ Slots" },
        { label: "Sync Engine", value: "WebSocket" },
        { label: "Hackathon Rank", value: "1st / 641" },
      ],
      tags: ["Python", "Flask", "MySQL", "WebSocket", "IoT Hardware", "React"],
      github: "https://github.com/RazeO1",
      demo: "https://github.com/RazeO1",
      accentColor: "#38bdf8",
      positionClass: "left-[5%] sm:left-[8%] md:left-[11%] lg:left-[13%] w-[90vw] sm:w-[50vw] md:w-[42vw] lg:w-[36vw] max-w-[480px]",
      renderGraphic: () => (
        <svg viewBox="0 0 360 200" className="w-full h-full stroke-neutral-500 fill-none overflow-visible select-none">
          <rect x="50" y="40" width="260" height="120" stroke="#333" strokeWidth="1" rx="4" />
          <line x1="50" y1="100" x2="310" y2="100" stroke="#fff" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
          {[60, 110, 160, 210, 260].map((x, i) => (
            <g key={`top-${i}`}>
              <line x1={x} y1="40" x2={x} y2="85" stroke="#444" strokeWidth="1" />
              {i === 1 || i === 3 ? (
                <g>
                  <rect x={x + 4} y="46" width="38" height="34" fill="#de3421" fillOpacity="0.15" stroke="#de3421" strokeWidth="1" rx="2" />
                  <circle cx={x + 23} cy="63" r="3" fill="#de3421" />
                  <text x={x + 23} y="74" fill="#de3421" fontSize="6" fontFamily="monospace" textAnchor="middle" fontWeight="bold">OCCUPIED</text>
                </g>
              ) : (
                <g>
                  <rect x={x + 4} y="46" width="38" height="34" fill="#22c55e" fillOpacity="0.1" stroke="#22c55e" strokeWidth="0.8" rx="2" />
                  <circle cx={x + 23} cy="63" r="2.5" fill="#22c55e" />
                  <text x={x + 23} y="74" fill="#22c55e" fontSize="6" fontFamily="monospace" textAnchor="middle">SLOT {i + 1}</text>
                </g>
              )}
            </g>
          ))}
          <g>
            <circle cx="180" cy="100" r="16" stroke="#38bdf8" strokeWidth="0.8" strokeDasharray="3 2" opacity="0.7" />
            <circle cx="180" cy="100" r="8" stroke="#38bdf8" strokeWidth="1.2" opacity="0.9" />
            <circle cx="180" cy="100" r="2.5" fill="#38bdf8" />
            <text x="180" y="180" fill="#38bdf8" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">LIVE WEBSOCKET STREAM // 50 NODES</text>
          </g>
        </svg>
      ),
    },
    {
      id: "gesturespeak",
      num: "04",
      title: "GestureSpeak",
      subtitle: "Indian Sign Language Recognition Engine",
      category: "COMPUTER VISION",
      year: "2024",
      description:
        "Real-time computer vision sign language translation engine. Detects and tracks 21 skeletal hand landmarks from live webcam streams with spatial geometric normalization and instant gesture-to-text inference.",
      metrics: [
        { label: "Hand Joints", value: "21 Points" },
        { label: "Stream Rate", value: "30+ FPS" },
        { label: "Modality", value: "Vision → Text" },
      ],
      tags: ["OpenCV", "PyTorch", "MediaPipe", "Computer Vision", "Python", "FastAPI"],
      github: "https://github.com/RazeO1/GestureSpeak",
      demo: "https://github.com/RazeO1/GestureSpeak",
      accentColor: "#c084fc",
      positionClass: "right-[4%] sm:right-[7%] md:right-[9%] lg:right-[11%] w-[90vw] sm:w-[50vw] md:w-[43vw] lg:w-[37vw] max-w-[490px]",
      renderGraphic: () => (
        <svg viewBox="0 0 360 200" className="w-full h-full stroke-neutral-500 fill-none overflow-visible select-none">
          <rect x="70" y="30" width="220" height="140" stroke="#333" strokeWidth="1" strokeDasharray="4 4" rx="4" />
          <path d="M 64 45 L 64 24 L 85 24" stroke="#c084fc" strokeWidth="1.5" />
          <path d="M 296 45 L 296 24 L 275 24" stroke="#c084fc" strokeWidth="1.5" />
          <path d="M 64 155 L 64 176 L 85 176" stroke="#c084fc" strokeWidth="1.5" />
          <path d="M 296 155 L 296 176 L 275 176" stroke="#c084fc" strokeWidth="1.5" />
          <circle cx="180" cy="150" r="3.5" fill="#c084fc" />
          <path d="M 180 150 L 160 135 L 148 120 L 138 108" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="138" cy="108" r="3.5" fill="#c084fc" />
          <path d="M 180 150 L 170 120 L 165 95 L 162 70" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="162" cy="70" r="3.5" fill="#c084fc" />
          <path d="M 180 150 L 180 115 L 180 88 L 180 60" stroke="#c084fc" strokeWidth="1.4" />
          <circle cx="180" cy="60" r="3.5" fill="#de3421" />
          <path d="M 180 150 L 192 122 L 198 98 L 202 78" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="202" cy="78" r="3.5" fill="#c084fc" />
          <path d="M 180 150 L 204 130 L 214 112 L 222 96" stroke="#c084fc" strokeWidth="1.2" />
          <circle cx="222" cy="96" r="3.5" fill="#c084fc" />
          <rect x="135" y="162" width="90" height="16" fill="#0A0A0A" stroke="#c084fc" strokeWidth="0.8" rx="2" />
          <text x="180" y="173" fill="#c084fc" fontSize="7.5" fontFamily="monospace" fontWeight="bold" textAnchor="middle">SIGN: &quot;CONNECT&quot; (0.98)</text>
        </svg>
      ),
    },
    {
      id: "farmwing-uav",
      num: "05",
      title: "FarmWing Precision UAV",
      subtitle: "Aerial Crop Health & GIS Mapping",
      category: "ROBOTICS & VISION",
      year: "2024",
      description:
        "Drone-assisted precision agriculture system: autonomous aerial image capture → OpenCV preprocessing → PyTorch CNN inference → GIS crop monitoring heatmap. Published in Q2 journal, achieving 90%+ classification accuracy.",
      metrics: [
        { label: "Publication", value: "Q2 Journal" },
        { label: "Accuracy", value: "90%+ Multi" },
        { label: "System", value: "UAV + GIS" },
      ],
      tags: ["PyTorch CNN", "OpenCV", "GIS Mapping", "Drone UAV", "Transfer Learning"],
      github: "https://github.com/RazeO1",
      paper: "https://doi.org/10.1016/farmwing.2024",
      accentColor: "#22c55e",
      positionClass: "left-1/2 -translate-x-1/2 w-[92vw] sm:w-[64vw] md:w-[54vw] lg:w-[46vw] max-w-[580px]",
      renderGraphic: () => (
        <svg viewBox="0 0 360 200" className="w-full h-full stroke-neutral-500 fill-none overflow-visible select-none">
          <g opacity="0.35">
            <polygon points="50,150 120,60 300,70 250,165" stroke="#444" strokeWidth="1" />
            <line x1="85" y1="105" x2="275" y2="117" stroke="#22c55e" strokeWidth="0.8" strokeDasharray="3 3" />
          </g>
          <path d="M 70 140 L 110 80 L 160 85 L 140 145 L 200 150 L 220 90 L 270 95 L 245 155" stroke="#22c55e" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
          <g transform="translate(180, 75)">
            <line x1="-18" y1="-18" x2="18" y2="18" stroke="#fff" strokeWidth="2" />
            <line x1="18" y1="-18" x2="-18" y2="18" stroke="#fff" strokeWidth="2" />
            <circle cx="-18" cy="-18" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="18" cy="-18" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="-18" cy="18" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
            <circle cx="18" cy="18" r="8" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 2" />
            <rect x="-6" y="-6" width="12" height="12" fill="#0A0A0A" stroke="#22c55e" strokeWidth="1.5" rx="1" />
            <circle cx="0" cy="0" r="2.5" fill="#de3421" />
            <polygon points="0,0 -40,75 40,75" stroke="#22c55e" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.4" />
          </g>
          <g opacity="0.8">
            <rect x="235" y="24" width="85" height="28" fill="#0A0A0A" stroke="#22c55e" strokeWidth="0.8" rx="2" />
            <text x="242" y="36" fill="#fff" fontSize="6.5" fontFamily="monospace">ALT: 45m // SPEED: 12m/s</text>
            <text x="242" y="46" fill="#22c55e" fontSize="6.5" fontFamily="monospace" fontWeight="bold">NDVI: 0.84 // HEALTHY</text>
          </g>
        </svg>
      ),
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
        card4Ref.current,
        card5Ref.current,
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

      // Staggered motion trajectory for each card (alternating Left -> Right -> Left -> Right -> Center)
      // Tile 1 (Left): Enters 0.04 -> exits 0.36
      tl.fromTo(
        card1Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.32, ease: "none" },
        0.04
      );

      // Tile 2 (Right): Enters 0.19 -> exits 0.51
      tl.fromTo(
        card2Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.32, ease: "none" },
        0.19
      );

      // Tile 3 (Left): Enters 0.35 -> exits 0.67
      tl.fromTo(
        card3Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.32, ease: "none" },
        0.35
      );

      // Tile 4 (Right): Enters 0.51 -> exits 0.83
      tl.fromTo(
        card4Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.32, ease: "none" },
        0.51
      );

      // Tile 5 (Centerpiece): Enters 0.67 -> exits 0.98
      tl.fromTo(
        card5Ref.current,
        { y: () => window.innerHeight * 1.15, opacity: 1 },
        { y: () => -window.innerHeight * 1.15, opacity: 1, duration: 0.31, ease: "none" },
        0.67
      );
    },
    { scope: sectionRef, dependencies: [setActiveSection, setProjectsProgress] }
  );

  const cardRefs = [card1Ref, card2Ref, card3Ref, card4Ref, card5Ref];

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[450vh] bg-[#0A0A0A] text-white selection:bg-[#de3421] selection:text-white"
    >
      {/* =========================================================================
          PINNED STAGE VIEWPORT (Exact match to Nudot Studio 00:00:16 - 00:00:25)
          Holds the pinned background typography while square tiles scroll past
          ========================================================================= */}
      <div
        ref={pinnedStageRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center select-none"
      >
        {/* Atmospheric vignette & soft left-side spotlight */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-white/[0.045] rounded-full blur-[150px] pointer-events-none" />

        {/* Top Pinned Metadata Bar */}
        <header className="absolute top-6 md:top-8 left-6 md:left-12 right-6 md:right-12 flex items-center justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-neutral-500 z-0 pointer-events-none">
          <div className="flex items-center gap-2.5 font-bold text-[#d5802a]">
            <span className="w-2 h-2 rounded-full bg-[#de3421] animate-pulse" />
            SEC 04 // ARCHIVE OF SELECTED WORKS
          </div>
          <div className="hidden sm:block text-neutral-400 font-semibold">
            ENGINEERED SYSTEMS &bull; YASH RAJ
          </div>
          <div className="text-white font-bold">
            [05 WORKS]
          </div>
        </header>

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
        <footer className="absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 flex items-center justify-between font-mono text-[9px] md:text-[10px] uppercase tracking-widest text-neutral-500 z-0 pointer-events-none">
          <div>
            <span className="text-[#de3421] font-bold">CHENNAI, IN</span>
            <span className="hidden sm:inline text-neutral-600 mx-2">|</span>
            <span className="hidden sm:inline text-neutral-400">VEL TECH R&amp;D INSTITUTE</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-neutral-400">SCROLL DOWN TO EXPLORE</span>
            <span className="text-white font-bold">&darr;</span>
          </div>
        </footer>

        {/* =========================================================================
            FOREGROUND MOVING PROJECT TILES
            Scrubbed along scroll runway: Left -> Right -> Left -> Right -> Center
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
              <ProjectSquareCard project={project} />
            </div>
          ))}
        </div>

        {/* =========================================================================
            INTERACTIVE FLOATING "VIEW" CURSOR DISC
            Follows mouse cursor over cards just like in Nudot Video reference
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

// Sub-component: High-Fidelity Square / Rectangular Project Tile
function ProjectSquareCard({ project }: { project: ProjectData }) {
  return (
    <article
      onClick={() => {
        const targetUrl = project.demo || project.paper || project.github;
        if (targetUrl) window.open(targetUrl, "_blank", "noopener,noreferrer");
      }}
      className="group relative w-full aspect-square rounded-2xl md:rounded-3xl border border-white/20 bg-[#131316] p-5 sm:p-6 md:p-7 flex flex-col justify-between shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] hover:border-white/40 transition-all duration-500 overflow-hidden cursor-pointer"
      style={{
        boxShadow: "0 25px 60px -15px rgba(0,0,0,0.9)",
      }}
    >
      {/* Ambient hover glow */}
      <div
        className="absolute -top-20 -right-20 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
        style={{ backgroundColor: project.accentColor }}
      />

      {/* Subtle corner crosshairs */}
      <span className="absolute top-3 left-3 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
      <span className="absolute top-3 right-3 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
      <span className="absolute bottom-3 left-3 font-mono text-[8px] text-white/20 pointer-events-none">+</span>
      <span className="absolute bottom-3 right-3 font-mono text-[8px] text-white/20 pointer-events-none">+</span>

      {/* Card Header Row */}
      <div className="relative z-10 w-full flex items-center justify-between select-none">
        <div className="flex items-center gap-2">
          <span
            className="font-mono text-xs font-black tracking-wider px-2 py-0.5 rounded bg-white/[0.06] border border-white/10"
            style={{ color: project.accentColor }}
          >
            {project.num}
          </span>
          <span className="font-mono text-[8.5px] sm:text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
            {project.category}
          </span>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[9px] text-neutral-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>{project.year}</span>
        </div>
      </div>

      {/* Card Center Visual Schematic Stage */}
      <div className="relative z-10 w-full flex-1 my-2 sm:my-3 flex items-center justify-center min-h-0">
        <div className="w-full h-full max-h-[175px] sm:max-h-[195px] flex items-center justify-center p-2 rounded-xl bg-black/40 border border-white/5 group-hover:border-white/10 transition-colors">
          {project.renderGraphic()}
        </div>
      </div>

      {/* Card Bottom Content */}
      <div className="relative z-10 w-full space-y-2 select-none">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-display font-medium text-lg sm:text-xl md:text-2xl text-white tracking-tight group-hover:text-[#FAF8F5] transition-colors">
              {project.title}
            </h3>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-white/30 transition-all">
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </div>
          </div>
          <p className="font-sans text-[11px] sm:text-xs text-neutral-400 line-clamp-2 mt-0.5 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-3 gap-1.5 py-1.5 border-y border-white/5 font-mono text-[8px] sm:text-[8.5px]">
          {project.metrics.map((m, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="text-neutral-500 uppercase tracking-wider text-[7px]">{m.label}</span>
              <span className="text-white font-bold tracking-tight">{m.value}</span>
            </div>
          ))}
        </div>

        {/* Tags & Action Links */}
        <div className="flex items-center justify-between pt-0.5">
          <div className="flex items-center gap-1 overflow-hidden">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="font-mono text-[7.5px] sm:text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/[0.04] text-neutral-300 border border-white/5 whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>

          <div
            className="flex items-center gap-2.5 font-mono text-[9px] sm:text-[10px] text-neutral-400"
            onClick={(e) => e.stopPropagation()}
          >
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-white hover:line-through transition-colors flex items-center gap-1 font-semibold"
                aria-label={`${project.title} GitHub`}
              >
                <GithubIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Code</span>
              </a>
            )}
            {project.paper && (
              <a
                href={project.paper}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#de3421] hover:line-through transition-colors flex items-center gap-1 font-semibold"
                aria-label={`${project.title} paper`}
              >
                <FileText className="w-3 h-3" />
                <span className="hidden sm:inline">Paper</span>
              </a>
            )}
            {project.demo && !project.paper && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#de3421] hover:line-through transition-colors flex items-center gap-1 font-semibold"
                aria-label={`${project.title} demo`}
              >
                <ExternalLink className="w-3 h-3" />
                <span className="hidden sm:inline">Demo</span>
              </a>
            )}
          </div>
        </div>

      </div>
    </article>
  );
}
