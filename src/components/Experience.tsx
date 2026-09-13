"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// Easing formula directly ported from nudot-studio (index.html line 2736)
function easeInOutCubic(x: number): number {
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Sequential reveal and glide calculation for corner telemetry blocks
function calculateTelemetryTransform(
  progress: number,
  start: number,
  fadeInEnd: number,
  fadeOutStart: number,
  end: number
) {
  if (progress <= start) {
    return { opacity: 0, y: 30 };
  }
  if (progress < fadeInEnd) {
    const t = (progress - start) / (fadeInEnd - start);
    const ease = easeInOutCubic(t);
    return { opacity: ease, y: (1 - ease) * 30 };
  }
  if (progress <= fadeOutStart) {
    const t = (progress - fadeInEnd) / (fadeOutStart - fadeInEnd);
    return { opacity: 1, y: -t * 12 };
  }
  if (progress < end) {
    const t = (progress - fadeOutStart) / (end - fadeOutStart);
    const ease = easeInOutCubic(t);
    return { opacity: 1 - ease, y: -12 - ease * 30 };
  }
  return { opacity: 0, y: -42 };
}

interface ExperienceProps {
  onOpenAbout?: () => void;
}

export default function Experience({ onOpenAbout: _onOpenAbout }: ExperienceProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sceneWrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const cubeTiltRef = useRef<HTMLDivElement>(null);

  // Background elements
  const titleRevealWrapRef = useRef<HTMLDivElement>(null);
  const titleMarqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);

  // Sequential corner telemetry items (U, N, I, M)
  const itemURef = useRef<HTMLDivElement>(null);
  const itemNRef = useRef<HTMLDivElement>(null);
  const itemIRef = useRef<HTMLDivElement>(null);
  const itemMRef = useRef<HTMLDivElement>(null);

  // Centered scroll prompt
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // QuickSetter refs for decoupled mouse tilt
  const quickTiltX = useRef<((val: number) => void) | null>(null);
  const quickTiltY = useRef<((val: number) => void) | null>(null);

  // Base dimensions matching nudot-studio
  const baseSceneSize = 270;

  // =========================================================================
  // CONTINUOUS HORIZONTAL MARQUEE ENGINE (ported from nudot-studio tick engine)
  // =========================================================================
  useEffect(() => {
    let animId: number;
    let xPos = 0;
    const baseSpeed = 1.2; // px per tick baseline

    const inner = marqueeInnerRef.current;
    if (!inner) return;

    const tick = () => {
      xPos -= baseSpeed;
      const setWidth = inner.scrollWidth / 3;
      if (setWidth > 0 && Math.abs(xPos) >= setWidth) {
        xPos += setWidth;
      }
      inner.style.transform = `translate3d(${xPos}px, 0, 0)`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  // =========================================================================
  // GSAP SCROLLTRIGGER ANIMATION PIPELINE
  // Mirrors nudot-studio: Tumble Entrance -> 4-Exhibit Spin Tour -> Hero Zoom
  // =========================================================================
  useGSAP(
    () => {
      const section = sectionRef.current;
      const sceneWrapper = sceneWrapperRef.current;
      const scene = sceneRef.current;
      const cube = cubeRef.current;
      const cubeTilt = cubeTiltRef.current;
      const titleMarquee = titleMarqueeRef.current;

      if (!section || !sceneWrapper || !scene || !cube || !cubeTilt || !titleMarquee) return;

      // Mouse tilt decoupled from scroll timeline
      quickTiltX.current = gsap.quickTo(cubeTilt, "rotationX", { duration: 0.6, ease: "power2.out" });
      quickTiltY.current = gsap.quickTo(cubeTilt, "rotationY", { duration: 0.6, ease: "power2.out" });

      // Thresholds calibrated for Yash's portfolio Experience section
      const p_Tumble = 0.28; // Tumble entrance complete
      const p_Spin = 0.88;   // Spin through 4 faces complete (returns to Face 01 at 0.88 and rests)

      const baseRotY = -45;
      const targetY_Phase1 = 360;

      // Ensure marquee and cube start completely hidden before scroll entrance
      gsap.set(titleMarquee, { y: "130%" });
      if (scene) {
        gsap.set(scene, { clearProps: "transform,scale,rotationX,rotationY" });
      }
      gsap.set(sceneWrapper, {
        xPercent: -50,
        yPercent: -50,
        scale: 0.001,
        top: "50%",
        left: "50%",
      });
      gsap.set(cube, {
        rotationX: -15,
        rotationY: baseRotY,
        rotationZ: 0,
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          gsap.set(titleMarquee, { y: "130%" });
          if (itemURef.current) gsap.set(itemURef.current, { opacity: 0, y: 30 });
          if (itemNRef.current) gsap.set(itemNRef.current, { opacity: 0, y: 30 });
          if (itemIRef.current) gsap.set(itemIRef.current, { opacity: 0, y: 30 });
          if (itemMRef.current) gsap.set(itemMRef.current, { opacity: 0, y: 30 });
          if (sceneWrapper) {
            gsap.set(sceneWrapper, {
              xPercent: -50,
              yPercent: -50,
              scale: 0.001,
              top: "50%",
              left: "50%",
            });
          }
          if (cube) {
            gsap.set(cube, {
              rotationX: -15,
              rotationY: baseRotY,
              rotationZ: 0,
            });
          }
          if (scene) {
            gsap.set(scene, { clearProps: "transform,scale,rotationX,rotationY" });
          }
        },
        onUpdate: (self) => {
          const progress = self.progress;
          const winW = window.innerWidth;
          const isMobile = winW <= 768;

          let currentScale = 0.001;
          let currentX = -15;
          let currentY = baseRotY;
          const currentSceneSize = isMobile ? 180 : baseSceneSize;

          // -------------------------------------------------------------
          // 1. BACKGROUND TEXT MASKED REVEAL & VERTICAL PARALLAX
          // -------------------------------------------------------------
          if (progress <= p_Tumble) {
            // Tumble entrance: marquee slides UP from 130% to 0% (masked reveal)
            const revealPr = Math.max(0, Math.min(progress / (p_Tumble * 0.9), 1));
            const marqueeEase = easeInOutCubic(revealPr);
            const yOffset = (1 - marqueeEase) * 130;
            gsap.set(titleMarquee, { y: `${yOffset}%` });
          } else {
            // Exhibit tour & section rest: marquee stays fully visible at 0%
            gsap.set(titleMarquee, { y: "0%" });
          }

          // -------------------------------------------------------------
          // 2. SEQUENTIAL CORNER TELEMETRY ITEMS (U, N, I, M)
          // Each corner element appears one by one with scroll progress
          // matching each exhibit phase:
          // Item 1 (U): Exhibit 01 Entrance & Lab Scope (0.04 -> 0.38)
          // Item 2 (N): Exhibit 02 LAMTT Model & Faculty (0.30 -> 0.56)
          // Item 3 (I): Exhibit 03 Edge Engine & Telemetry (0.48 -> 0.74)
          // Item 4 (M): Exhibit 04 Wireless Sensing & Stats (0.66 -> 0.94)
          // -------------------------------------------------------------
          if (itemURef.current) {
            const tU = calculateTelemetryTransform(progress, 0.04, 0.16, 0.30, 0.38);
            gsap.set(itemURef.current, { opacity: tU.opacity, y: tU.y });
          }
          if (itemNRef.current) {
            const tN = calculateTelemetryTransform(progress, 0.30, 0.38, 0.48, 0.56);
            gsap.set(itemNRef.current, { opacity: tN.opacity, y: tN.y });
          }
          if (itemIRef.current) {
            const tI = calculateTelemetryTransform(progress, 0.48, 0.56, 0.66, 0.74);
            gsap.set(itemIRef.current, { opacity: tI.opacity, y: tI.y });
          }
          if (itemMRef.current) {
            const tM = calculateTelemetryTransform(progress, 0.66, 0.74, 0.86, 0.94);
            gsap.set(itemMRef.current, { opacity: tM.opacity, y: tM.y });
          }

          // Centered DOWN indicator fade near section transition
          if (scrollIndicatorRef.current) {
            const downOpacity = progress > 0.90 ? Math.max(0, (1 - (progress - 0.90) / 0.08) * 0.75) : 0.75;
            gsap.set(scrollIndicatorRef.current, { opacity: downOpacity });
          }

          // -------------------------------------------------------------
          // 3. 3D CUBE MOTION PHASES
          // -------------------------------------------------------------
          if (progress <= p_Tumble) {
            // PHASE 1: TUMBLE ENTRANCE (Tumbles from deep space into scale 1.35)
            const pr = progress / p_Tumble;
            const ease = easeInOutCubic(pr);

            currentScale = 1.35 * ease;
            currentX = -15 * (1 - ease) + 360 * ease;
            currentY = baseRotY * (1 - ease) + targetY_Phase1 * ease;
          } else if (progress <= p_Spin) {
            // PHASE 2: EXHIBIT SPIN TOUR THROUGH THE 4 FACES
            // Scale stays locked at 1.35, X stays at 360 (upright in perspective)
            // Y smoothly spins 360deg across the 4 faces: Front -> Left -> Back -> Right -> Front
            const pr = (progress - p_Tumble) / (p_Spin - p_Tumble);

            currentScale = 1.35;
            currentX = 360;
            currentY = targetY_Phase1 + 360 * pr;
          } else {
            // REST AT SECTION END: Cube maintains its exact 3D solid volume,
            // identical face style, and scale (1.35) without expanding or flattening.
            currentScale = 1.35;
            currentX = 360;
            currentY = targetY_Phase1 + 360;
          }

          // Apply dynamic CSS variables and transforms matching nudot
          gsap.set(scene, {
            "--scene-size": `${currentSceneSize}px`,
            "--scene-depth": `${currentSceneSize / 2}px`,
          });

          gsap.set(cube, {
            rotationX: currentX,
            rotationY: currentY,
            rotationZ: 0,
          });

          gsap.set(sceneWrapper, {
            xPercent: -50,
            yPercent: -50,
            scale: currentScale,
            top: "50%",
            left: "50%",
          });
        },
      });
    },
    { scope: sectionRef, dependencies: [] }
  );

  // Mouse move tilt: purely GPU-accelerated through GSAP quickTo
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (quickTiltX.current) quickTiltX.current(-ny * 12);
    if (quickTiltY.current) quickTiltY.current(nx * 14);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (quickTiltX.current) quickTiltX.current(0);
    if (quickTiltY.current) quickTiltY.current(0);
  }, []);

  // Smooth scroll down prompt handler
  const handleScrollDown = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const scrollStep = window.innerHeight * 0.85;
    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.scrollTo(window.scrollY + scrollStep, { duration: 1.0 });
    } else {
      window.scrollBy({ top: scrollStep, behavior: "smooth" });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-transparent text-white select-none z-20"
      style={{ height: "420vh" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Pinned Viewport Stage */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-transparent z-20">

        {/* =================================================================
            BACKGROUND LAYER: SEQUENTIAL CORNER TELEMETRY (U, N, I, M)
            Each corner block appears one by one with scroll progress
            ================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* Top-Left: Large 'U' & Research Scope list */}
          <div
            ref={itemURef}
            className="absolute top-16 md:top-24 left-6 md:left-14 flex items-start gap-4 will-change-transform"
            style={{ opacity: 0 }}
          >
            <span
              className="text-white opacity-85 leading-none select-none"
              style={{
                fontFamily: '"Bitcount Grid Single", monospace',
                fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                mixBlendMode: "difference",
              }}
            >
              U
            </span>
            <div className="pt-2 font-mono text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest leading-relaxed">
              <div className="text-white font-bold mb-1">( RESEARCH SCOPE )</div>
              <div>• 6G Edge Intelligence</div>
              <div>• TinyML Micro-Optimization</div>
              <div>• Multi-Temporal Attention</div>
              <div>• Real-time Spatial Sensing</div>
            </div>
          </div>

          {/* Top-Right: Dot 'N' & Status */}
          <div
            ref={itemNRef}
            className="absolute top-16 md:top-24 right-6 md:right-14 flex flex-col items-end text-right will-change-transform"
            style={{ opacity: 0 }}
          >
            <span
              className="text-white opacity-85 leading-none select-none"
              style={{
                fontFamily: '"Bitcount Grid Single", monospace',
                fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                mixBlendMode: "difference",
              }}
            >
              N
            </span>
            <div className="font-mono text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest pt-1">
              <div>Faculty of Intelligent Computing</div>
              <div className="text-[#de3421] font-bold">Perlis, Malaysia</div>
            </div>
          </div>

          {/* Bottom-Left: Dot 'I' & Live Telemetry Cursor */}
          <div
            ref={itemIRef}
            className="absolute bottom-16 md:bottom-20 left-6 md:left-14 flex items-end gap-4 will-change-transform"
            style={{ opacity: 0 }}
          >
            <span
              className="text-white opacity-85 leading-none select-none"
              style={{
                fontFamily: '"Bitcount Grid Single", monospace',
                fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                mixBlendMode: "difference",
              }}
            >
              I
            </span>
            <div className="pb-3 font-mono text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest">
              <div className="text-white font-bold">SYSTEM TELEMETRY:</div>
              <div className="flex items-center gap-1.5 text-[#22c55e]">
                <span>EDGE NODES ONLINE</span>
                <span className="inline-block w-2 h-3.5 bg-[#22c55e] animate-pulse">█</span>
              </div>
            </div>
          </div>

          {/* Bottom-Right: Dot 'M' & Benchmarks */}
          <div
            ref={itemMRef}
            className="absolute bottom-16 md:bottom-20 right-6 md:right-14 flex items-end gap-4 text-right will-change-transform"
            style={{ opacity: 0 }}
          >
            <div className="pb-3 font-mono text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest">
              <div className="text-[#d5802a] font-bold">VALIDATION STATS:</div>
              <div>~62ms Infer Latency</div>
              <div>67% Cloud Cost Cut</div>
              <div>~96% AoA Precision</div>
            </div>
            <span
              className="text-white opacity-85 leading-none select-none"
              style={{
                fontFamily: '"Bitcount Grid Single", monospace',
                fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                mixBlendMode: "difference",
              }}
            >
              M
            </span>
          </div>
        </div>

        {/* =================================================================
            BACKGROUND: GIANT DOT-MATRIX MARQUEE RIBBON (title-reveal-wrap)
            With authentic Bitcount Grid Single typography & masked reveal
            ================================================================= */}
        <div
          ref={titleRevealWrapRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-10 flex items-center"
          style={{ height: "13vw", minHeight: "90px", maxHeight: "150px" }}
        >
          <div
            ref={titleMarqueeRef}
            className="w-full will-change-transform flex items-center"
            style={{ transform: "translateY(130%)" }}
          >
            <div
              ref={marqueeInnerRef}
              className="flex items-center whitespace-nowrap will-change-transform"
            >
              {[1, 2, 3].map((setIdx) => (
                <div key={setIdx} className="flex items-center shrink-0">
                  <span className="inline-flex items-baseline shrink-0">
                    <span
                      className="text-white font-normal"
                      style={{
                        fontFamily: '"Bitcount Grid Single", monospace',
                        fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
                        lineHeight: 1,
                      }}
                    >
                      RESEARCH INTERN
                    </span>
                    <span
                      className="text-neutral-400 uppercase px-6 font-mono self-center"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 1.1rem)" }}
                    >
                      （ UniMAP MALAYSIA ）
                    </span>
                  </span>

                  <span className="inline-flex items-baseline shrink-0">
                    <span
                      className="text-white font-normal"
                      style={{
                        fontFamily: '"Bitcount Grid Single", monospace',
                        fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
                        lineHeight: 1,
                      }}
                    >
                      6G EDGE AI
                    </span>
                    <span
                      className="text-[#de3421] uppercase px-6 font-mono self-center"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 1.1rem)" }}
                    >
                      （ LATENCY-AWARE ATTENTION ）
                    </span>
                  </span>

                  <span className="inline-flex items-baseline shrink-0">
                    <span
                      className="text-white font-normal"
                      style={{
                        fontFamily: '"Bitcount Grid Single", monospace',
                        fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
                        lineHeight: 1,
                      }}
                    >
                      ~62MS
                    </span>
                    <span
                      className="text-[#d5802a] uppercase px-6 font-mono self-center"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 1.1rem)" }}
                    >
                      （ 67% OVERHEAD CUT ）
                    </span>
                  </span>

                  <span className="inline-flex items-baseline shrink-0">
                    <span
                      className="text-white font-normal"
                      style={{
                        fontFamily: '"Bitcount Grid Single", monospace',
                        fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
                        lineHeight: 1,
                      }}
                    >
                      WIRELESS SENSING
                    </span>
                    <span
                      className="text-[#22c55e] uppercase px-6 font-mono self-center"
                      style={{ fontSize: "clamp(0.75rem, 0.9vw, 1.1rem)" }}
                    >
                      （ 96% RSSI AOA ACCURACY ）
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* =================================================================
            CENTERPIECE: 3D WATERTIGHT SOLID CUBE (nudot-studio architecture)
            ================================================================= */}
        <div
          ref={sceneWrapperRef}
          className="scene-wrapper absolute z-20 pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.001)",
          }}
        >
          <div
            ref={sceneRef}
            className="scene relative pointer-events-auto"
            style={
              {
                "--scene-size": `${baseSceneSize}px`,
                "--scene-depth": `${baseSceneSize / 2}px`,
                width: "var(--scene-size)",
                height: "var(--scene-size)",
                perspective: "calc(var(--scene-size) * 5)",
              } as React.CSSProperties
            }
          >
            {/* Cube Root: Driven by GSAP scroll rotation (X tumble & Y spin) */}
            <div
              ref={cubeRef}
              className="cube w-full h-full relative will-change-transform"
              style={{
                transformStyle: "preserve-3d",
                transform: "rotateX(-15deg) rotateY(-45deg)",
              }}
            >
              {/* Inner Cube: Driven by mouse cursor tilt via quickTo */}
              <div
                ref={cubeTiltRef}
                className="w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* -------------------------------------------------------------
                    FACE 1 (Front / 0 deg): UniMAP Research Appointment
                    ------------------------------------------------------------- */}
                <div
                  className="face front absolute inset-0 bg-[#0c0c0c] border border-white/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(0deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-neutral-400 pb-2 border-b border-white/10">
                      <span className="text-[#de3421] font-bold">01 // APPOINTMENT</span>
                      <span>OCT 2025 – FEB 2026</span>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block px-2 py-0.5 rounded bg-white/10 font-mono text-[8px] uppercase tracking-wider text-neutral-300 font-bold mb-1">
                        📍 KANGAR, PERLIS, MALAYSIA
                      </span>
                      <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-tight leading-snug">
                        Universiti Malaysia Perlis
                      </h3>
                      <p className="font-mono text-[10px] text-[#d5802a] font-bold mt-0.5">
                        AI/ML Research Intern • Intelligent Computing
                      </p>
                    </div>

                    <p className="font-sans text-neutral-300 text-[11px] leading-relaxed mt-2 line-clamp-3">
                      Architected real-time intelligence for AI-native 6G edge networks, researching latency-constrained multi-temporal modeling and wireless spatial sensing.
                    </p>
                  </div>

                  {/* 6G Mesh Schematic */}
                  <div className="relative z-10 p-2 rounded border border-white/10 bg-black/50 flex items-center justify-center my-1">
                    <svg viewBox="0 0 300 70" className="w-full h-[55px] select-none">
                      <circle cx="150" cy="35" r="14" fill="none" stroke="#de3421" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                      <circle cx="150" cy="35" r="28" fill="none" stroke="#de3421" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />
                      <line x1="150" y1="35" x2="190" y2="18" stroke="#de3421" strokeWidth="1.6" />
                      <circle cx="150" cy="35" r="4" fill="#de3421" />
                      <circle cx="150" cy="35" r="7" fill="none" stroke="#fff" strokeWidth="1" />
                      <circle cx="75" cy="22" r="3" fill="#d5802a" />
                      <line x1="150" y1="35" x2="75" y2="22" stroke="#d5802a" strokeWidth="0.8" strokeDasharray="2 2" />
                      <text x="75" y="14" fill="#d5802a" fontSize="6.5" fontFamily="monospace" textAnchor="middle">NODE A: ~62ms</text>
                      <circle cx="225" cy="25" r="3" fill="#60a5fa" />
                      <line x1="150" y1="35" x2="225" y2="25" stroke="#60a5fa" strokeWidth="0.8" strokeDasharray="2 2" />
                      <text x="225" y="16" fill="#60a5fa" fontSize="6.5" fontFamily="monospace" textAnchor="middle">NODE B: 6G EDGE</text>
                    </svg>
                  </div>

                  <div className="relative z-10 pt-1.5 border-t border-white/10 flex flex-wrap gap-1 text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">6G Mesh</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">PyTorch</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Edge AI</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">UniMAP</span>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 2 (Left / 270 deg): LAMTT Architecture (~62ms)
                    Positioned at -90deg (270deg) to enter right after Front
                    ------------------------------------------------------------- */}
                <div
                  className="face left absolute inset-0 bg-[#0c0c0c] border border-white/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(-90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-neutral-400 pb-2 border-b border-white/10">
                      <span className="text-[#d5802a] font-bold">02 // MODEL CORE</span>
                      <span>LAMTT TRANSFORMER</span>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#d5802a]/15 text-[#d5802a] font-mono text-[8px] uppercase tracking-wider font-bold mb-1">
                        LATENCY-AWARE ATTENTION
                      </span>
                      <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-tight leading-snug">
                        Multi-Temporal Model
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-400 font-semibold mt-0.5">
                        Short-, Mid- & Long-Term Modeling
                      </p>
                    </div>

                    <p className="font-sans text-neutral-300 text-[11px] leading-relaxed mt-2 line-clamp-3">
                      Designed a multi-scale temporal transformer with a joint loss optimization algorithm that mathematically balances prediction accuracy against strict edge delay constraints.
                    </p>
                  </div>

                  {/* Metrics */}
                  <div className="relative z-10 grid grid-cols-2 gap-2 my-1">
                    <div className="p-2 rounded border border-white/10 bg-white/5">
                      <span className="block font-mono text-[8px] uppercase text-neutral-400">Inference Latency</span>
                      <span className="font-display font-bold text-lg text-[#d5802a]">~62ms</span>
                      <span className="block font-mono text-[7.5px] text-neutral-500">Real-time edge target</span>
                    </div>
                    <div className="p-2 rounded border border-white/10 bg-white/5">
                      <span className="block font-mono text-[8px] uppercase text-neutral-400">Accuracy Gain</span>
                      <span className="font-display font-bold text-lg text-white">+40%</span>
                      <span className="block font-mono text-[7.5px] text-neutral-500">vs standard baselines</span>
                    </div>
                  </div>

                  <div className="relative z-10 pt-1.5 border-t border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[8px] text-neutral-400 uppercase tracking-wider">
                      PyTorch • Transformers
                    </span>
                    <a
                      href="https://github.com/RazeO1/LAMTT-Financial-Intelligence"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#d5802a]/20 border border-[#d5802a]/40 text-[#d5802a] font-mono text-[8.5px] uppercase font-bold hover:bg-[#d5802a] hover:text-black transition-colors pointer-events-auto"
                    >
                      <span>View Code</span>
                      <ArrowUpRight className="w-2.5 h-2.5" />
                    </a>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 3 (Back / 180 deg): Edge-Native Pipeline (67% Cut)
                    ------------------------------------------------------------- */}
                <div
                  className="face back absolute inset-0 bg-[#0c0c0c] border border-white/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(180deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-neutral-400 pb-2 border-b border-white/10">
                      <span className="text-[#60a5fa] font-bold">03 // EDGE SYSTEMS</span>
                      <span>ETL & DEPLOYMENT</span>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#60a5fa]/15 text-[#60a5fa] font-mono text-[8px] uppercase tracking-wider font-bold mb-1">
                        MICROSERVICE PIPELINE
                      </span>
                      <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-tight leading-snug">
                        Edge vs Cloud Pipeline
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-400 font-semibold mt-0.5">
                        Local API Gateway & Caching
                      </p>
                    </div>

                    <p className="font-sans text-neutral-300 text-[11px] leading-relaxed mt-2 line-clamp-3">
                      Cut end-to-end system delay by 67% vs cloud-based architectures. Engineered automated ETL ingestion, Flask/FastAPI REST endpoints, memory token buffers, and Dockerized microservices.
                    </p>
                  </div>

                  {/* Comparative Latency Diagram */}
                  <div className="relative z-10 p-2 rounded border border-white/10 bg-black/50 space-y-1.5 my-1 font-mono text-[9px]">
                    <div>
                      <div className="flex justify-between text-neutral-400 text-[8px] mb-0.5">
                        <span>STANDARD CLOUD</span>
                        <span className="text-neutral-300">~280ms ROUNDTRIP</span>
                      </div>
                      <div className="w-full h-1 rounded bg-neutral-800 overflow-hidden">
                        <div className="w-[85%] h-full bg-neutral-600 rounded" />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-white text-[8px] mb-0.5">
                        <span className="text-[#60a5fa] font-bold">UNIMAP EDGE ENGINE</span>
                        <span className="text-[#60a5fa] font-bold">~62ms (67% CUT)</span>
                      </div>
                      <div className="w-full h-1 rounded bg-neutral-800 overflow-hidden">
                        <div className="w-[28%] h-full bg-[#60a5fa] rounded" />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-1.5 border-t border-white/10 flex flex-wrap gap-1 text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">FastAPI</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Docker</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Redis</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">CI/CD</span>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 4 (Right / 90 deg): Wireless Sensing & AoA (~96%)
                    Positioned at 90deg to enter right after Back
                    ------------------------------------------------------------- */}
                <div
                  className="face right absolute inset-0 bg-[#0c0c0c] border border-white/20 p-5 sm:p-6 flex flex-col justify-between overflow-hidden shadow-[inset_0_0_40px_rgba(0,0,0,1)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:14px_14px]" />

                  <div className="relative z-10">
                    <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-wider text-neutral-400 pb-2 border-b border-white/10">
                      <span className="text-[#22c55e] font-bold">04 // WIRELESS AI</span>
                      <span>SPATIAL SENSING</span>
                    </div>

                    <div className="mt-2.5">
                      <span className="inline-block px-2 py-0.5 rounded bg-[#22c55e]/15 text-[#22c55e] font-mono text-[8px] uppercase tracking-wider font-bold mb-1">
                        ANGLE-OF-ARRIVAL (AoA)
                      </span>
                      <h3 className="font-display font-medium text-lg sm:text-xl text-white tracking-tight leading-snug">
                        Wireless Localization
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-400 font-semibold mt-0.5">
                        Supervised ML & Ambiguity Proof
                      </p>
                    </div>

                    <p className="font-sans text-neutral-300 text-[11px] leading-relaxed mt-2 line-clamp-3">
                      Researched RSSI-based Angle-of-Arrival estimation for wireless localization. Achieved ~96% classification accuracy and mathematically modeled boundary-induced ambiguity and non-invertibility.
                    </p>
                  </div>

                  {/* Polar AoA Beam Chart */}
                  <div className="relative z-10 p-2 rounded border border-white/10 bg-black/50 flex items-center justify-center my-1">
                    <svg viewBox="0 0 260 65" className="w-full h-[50px] select-none">
                      <path d="M 30 55 A 100 100 0 0 1 230 55" fill="none" stroke="#333" strokeWidth="0.8" />
                      <path d="M 70 55 A 60 60 0 0 1 190 55" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <line x1="130" y1="55" x2="60" y2="18" stroke="#444" strokeWidth="0.8" strokeDasharray="2 2" />
                      <line x1="130" y1="55" x2="200" y2="18" stroke="#444" strokeWidth="0.8" strokeDasharray="2 2" />
                      <line x1="130" y1="55" x2="175" y2="12" stroke="#22c55e" strokeWidth="2" />
                      <circle cx="175" cy="12" r="3.5" fill="#22c55e" />
                      <circle cx="130" cy="55" r="3" fill="#fff" />
                      <text x="185" y="15" fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">AoA: 64.2° (~96%)</text>
                    </svg>
                  </div>

                  <div className="relative z-10 pt-1.5 border-t border-white/10 flex flex-wrap gap-1 text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Wireless Sensing</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">AoA Estimation</span>
                    <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">Scikit-learn</span>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    TOP PLATE: Precision-Machined Research Chassis Lid
                    ------------------------------------------------------------- */}
                <div
                  className="face top absolute inset-0 bg-gradient-to-b from-[#222] via-[#161616] to-[#0c0c0c] border border-white/30 p-5 flex flex-col items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.4),0_0_30px_rgba(0,0,0,0.8)] overflow-hidden"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateX(90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none opacity-[0.08] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:10px_10px]" />
                  <span className="absolute top-2 left-2 font-mono text-[8px] text-white/40">+</span>
                  <span className="absolute top-2 right-2 font-mono text-[8px] text-white/40">+</span>
                  <span className="absolute bottom-2 left-2 font-mono text-[8px] text-white/40">+</span>
                  <span className="absolute bottom-2 right-2 font-mono text-[8px] text-white/40">+</span>

                  <div className="relative z-10 flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/10 border border-white/20 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-200 font-bold">
                      UNIMAP // 6G EDGE CHASSIS
                    </span>
                  </div>

                  <div className="relative z-10 flex items-center gap-3 text-center font-mono text-[8px]">
                    <div>
                      <span className="text-neutral-400">COORDINATES</span>
                      <div className="font-bold text-white">6.4449° N, 100.1982° E</div>
                    </div>
                    <div className="w-[1px] h-5 bg-white/20" />
                    <div>
                      <span className="text-neutral-400">LOCATION</span>
                      <div className="font-bold text-[#de3421]">PERLIS, MALAYSIA</div>
                    </div>
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    BOTTOM PLATE: Watertight Base Plate
                    ------------------------------------------------------------- */}
                <div
                  className="face bottom absolute inset-0 bg-[#080808] border border-white/10"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateX(-90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                />
              </div>
            </div>

            {/* Floor Drop Shadow below the Cube */}
            <div
              className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[90%] h-[24px] rounded-[100%] bg-black/90 blur-lg pointer-events-none -z-10"
            />
          </div>
        </div>

        {/* =================================================================
            DOWN SCROLL PROMPT (Authentic nudot pixel chevron)
            Centered horizontally directly below the 3D cube
            ================================================================= */}
        <div
          ref={scrollIndicatorRef}
          onClick={handleScrollDown}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleScrollDown();
            }
          }}
          aria-label="Scroll down"
          className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 opacity-75 hover:opacity-100 transition-opacity cursor-pointer pointer-events-auto select-none group"
        >
          <div className="w-5 h-auto transition-transform duration-300 group-hover:translate-y-0.5">
            <svg
              viewBox="0 0 258 155"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-auto"
            >
              <path
                d="M257.8 51.5996L257.8 1.12688e-05L206.2 9.0133e-06L206.2 51.5996L257.8 51.5996ZM103.1 103.2L103.1 154.7L154.7 154.7L154.7 103.2L206.3 103.2L206.3 51.6006L154.7 51.6006L154.7 103.101L103.2 103.101L103.2 51.6006L51.5996 51.6006L51.5996 103.2L103.1 103.2ZM-2.25549e-06 51.5996L51.5996 51.5996L51.5996 2.25549e-06L0 0L-2.25549e-06 51.5996Z"
                fill="white"
              />
            </svg>
          </div>
          <span className="font-mono text-[9.5px] tracking-[0.25em] text-white/90 uppercase font-medium">
            DOWN
          </span>
        </div>

      </div>
    </section>
  );
}
