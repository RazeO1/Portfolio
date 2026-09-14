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

  // Sequential background exhibit dossiers (1, 2, 3, 4)
  const exhibit1Ref = useRef<HTMLDivElement>(null);
  const exhibit2Ref = useRef<HTMLDivElement>(null);
  const exhibit3Ref = useRef<HTMLDivElement>(null);
  const exhibit4Ref = useRef<HTMLDivElement>(null);

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

      const baseRotY = -45;
      const targetY_Phase1 = 360;

      // Stepwise exhibit spin rotation for the 4 faces with smooth transitions:
      // pr goes from 0 (Face 1) to 1 (Face 4)
      const getCubeRotation = (pr: number): number => {
        if (pr <= 0.20) {
          return 360; // Face 1 (Front: 01_hero.jpg)
        } else if (pr < 0.33) {
          const t = (pr - 0.20) / (0.33 - 0.20);
          return 360 + 90 * easeInOutCubic(t);
        } else if (pr <= 0.53) {
          return 450; // Face 2 (Left: 02_team.jpg)
        } else if (pr < 0.66) {
          const t = (pr - 0.53) / (0.66 - 0.53);
          return 450 + 90 * easeInOutCubic(t);
        } else if (pr <= 0.86) {
          return 540; // Face 3 (Back: 03.png)
        } else if (pr < 0.96) {
          const t = (pr - 0.86) / (0.96 - 0.86);
          return 540 + 90 * easeInOutCubic(t);
        } else {
          return 630; // Face 4 (Right: 05_presentation.jpg)
        }
      };

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
          if (exhibit1Ref.current) gsap.set(exhibit1Ref.current, { opacity: 0, y: 30 });
          if (exhibit2Ref.current) gsap.set(exhibit2Ref.current, { opacity: 0, y: 30 });
          if (exhibit3Ref.current) gsap.set(exhibit3Ref.current, { opacity: 0, y: 30 });
          if (exhibit4Ref.current) gsap.set(exhibit4Ref.current, { opacity: 0, y: 30 });
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
          // 2. DYNAMIC BACKGROUND EXHIBIT DOSSIERS
          // Appears sequentially in the background synchronized with the cube's 4 faces:
          // Exhibit 01: Face 1 (Front - 01_hero.jpg) (0.04 -> 0.44)
          // Exhibit 02: Face 2 (Left - 02_team.jpg) (0.38 -> 0.66)
          // Exhibit 03: Face 3 (Back - 03.png) (0.60 -> 0.88)
          // Exhibit 04: Face 4 (Right - 05_presentation.jpg) (0.82 -> 1.0)
          // -------------------------------------------------------------
          if (exhibit1Ref.current) {
            const t1 = calculateTelemetryTransform(progress, 0.04, 0.16, 0.36, 0.44);
            gsap.set(exhibit1Ref.current, { opacity: t1.opacity, y: t1.y });
          }
          if (exhibit2Ref.current) {
            const t2 = calculateTelemetryTransform(progress, 0.38, 0.46, 0.58, 0.66);
            gsap.set(exhibit2Ref.current, { opacity: t2.opacity, y: t2.y });
          }
          if (exhibit3Ref.current) {
            const t3 = calculateTelemetryTransform(progress, 0.60, 0.68, 0.80, 0.88);
            gsap.set(exhibit3Ref.current, { opacity: t3.opacity, y: t3.y });
          }
          if (exhibit4Ref.current) {
            const t4 = calculateTelemetryTransform(progress, 0.82, 0.90, 0.98, 1.02);
            gsap.set(exhibit4Ref.current, { opacity: t4.opacity, y: t4.y });
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
          } else {
            // PHASE 2 & 3: STEPWISE EXHIBIT TOUR THROUGH THE 4 FACES
            // Scale stays locked at 1.35, X stays at 360 (upright in perspective)
            // Y rotates in discrete locked showcases across the 4 faces
            const prTour = Math.max(0, Math.min((progress - p_Tumble) / (0.96 - p_Tumble), 1));
            currentScale = 1.35;
            currentX = 360;
            currentY = getCubeRotation(prTour);
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
            BACKGROUND LAYER: DYNAMIC EDITORIAL EXHIBIT DOSSIERS
            Appears sequentially in the background synchronized with the 3D cube faces
            ================================================================= */}
        <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          {/* EXHIBIT 01: UniMAP Research Appointment (Synchronized with Face 1: 01_hero.jpg) */}
          <div
            ref={exhibit1Ref}
            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 will-change-transform pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Left Flank: Appointment & Institution */}
            <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] flex flex-col justify-center text-left">
              <span
                className="text-white/20 leading-none select-none font-mono text-4xl sm:text-5xl lg:text-6xl font-light mb-2"
                style={{ fontFamily: '"Bitcount Grid Single", monospace' }}
              >
                U // 01
              </span>
              <div className="font-mono text-[9.5px] uppercase tracking-widest text-[#de3421] font-bold">
                // 01 RESEARCH APPOINTMENT • OCT 2025 – FEB 2026
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mt-1.5">
                Universiti Malaysia Perlis
              </h2>
              <p className="font-mono text-[11px] lg:text-xs text-[#d5802a] font-bold mt-1">
                AI/ML Research Intern • Intelligent Computing
              </p>
              <p className="font-mono text-[9px] text-neutral-400 mt-1">
                📍 Kangar, Perlis, Malaysia
              </p>
              <p className="font-sans text-neutral-300 text-xs sm:text-[13px] leading-relaxed mt-3 max-w-sm">
                Architected real-time intelligence for AI-native 6G edge networks, researching latency-constrained multi-temporal modeling and wireless spatial sensing.
              </p>
              <div className="mt-4 flex flex-col gap-1 font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                <div>• 6G Edge Intelligence & Micro-Optimization</div>
                <div>• Multi-Temporal Attention Architecture</div>
                <div>• Real-time Spatial Wireless Sensing</div>
              </div>
            </div>

            {/* Right Flank: Telemetry & Lab Specs */}
            <div className="w-full md:w-[280px] lg:w-[340px] flex flex-col justify-center items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                // NODE: PERLIS • 6.4449° N, 100.1982° E
              </div>
              <div className="font-mono text-xs text-white font-bold mt-1">
                FACULTY OF INTELLIGENT COMPUTING
              </div>
              <div className="mt-3 p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md w-full max-w-[280px]">
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400">
                  <span>SYSTEM STATUS:</span>
                  <div className="flex items-center gap-1.5 text-[#22c55e]">
                    <span>ONLINE</span>
                    <span className="inline-block w-1.5 h-3 bg-[#22c55e] animate-pulse">█</span>
                  </div>
                </div>
                <div className="mt-2 pt-2 border-t border-white/10 font-mono text-[8.5px] text-neutral-400 space-y-1">
                  <div className="flex justify-between">
                    <span>HOST LAB:</span>
                    <span className="text-white font-semibold">FKTE Research Center</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DOMAINS:</span>
                    <span className="text-white font-semibold">6G Edge AI • TinyML</span>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5 justify-start md:justify-end text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">6G Mesh</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">PyTorch</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Edge AI</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">UniMAP</span>
              </div>
            </div>
          </div>

          {/* EXHIBIT 02: Latency-Aware Multi-Temporal Transformer (Synchronized with Face 2: 02_team.jpg) */}
          <div
            ref={exhibit2Ref}
            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 will-change-transform pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Left Flank: Model Architecture & Attention Mechanism */}
            <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] flex flex-col justify-center text-left">
              <span
                className="text-white/20 leading-none select-none font-mono text-4xl sm:text-5xl lg:text-6xl font-light mb-2"
                style={{ fontFamily: '"Bitcount Grid Single", monospace' }}
              >
                N // 02
              </span>
              <div className="font-mono text-[9.5px] uppercase tracking-widest text-[#d5802a] font-bold">
                // 02 MODEL CORE • LATENCY-AWARE ATTENTION
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mt-1.5">
                Multi-Temporal Model
              </h2>
              <p className="font-mono text-[11px] lg:text-xs text-[#d5802a] font-bold mt-1">
                LAMTT Transformer Architecture
              </p>
              <p className="font-mono text-[9px] text-neutral-400 mt-1">
                Short-, Mid- & Long-Term Temporal Modeling
              </p>
              <p className="font-sans text-neutral-300 text-xs sm:text-[13px] leading-relaxed mt-3 max-w-sm">
                Designed a multi-scale temporal transformer with a joint loss optimization algorithm that mathematically balances prediction accuracy against strict edge delay constraints.
              </p>
              <div className="mt-4 p-2.5 rounded bg-white/5 border border-white/10 font-mono text-[8.5px] text-neutral-300 max-w-sm">
                <div className="text-neutral-400 font-bold mb-0.5">OPTIMIZATION THEOREM:</div>
                <div className="text-[#d5802a]">L_total = L_accuracy + λ · L_delay</div>
              </div>
            </div>

            {/* Right Flank: Benchmarks & Open Source Code */}
            <div className="w-full md:w-[280px] lg:w-[340px] flex flex-col justify-center items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="grid grid-cols-2 gap-2.5 w-full max-w-[280px]">
                <div className="p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md">
                  <span className="block font-mono text-[8px] uppercase text-neutral-400">Inference Latency</span>
                  <span className="font-display font-bold text-2xl text-[#d5802a]">~62ms</span>
                  <span className="block font-mono text-[7.5px] text-neutral-500 mt-0.5">Real-time edge target</span>
                </div>
                <div className="p-3 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md">
                  <span className="block font-mono text-[8px] uppercase text-neutral-400">Accuracy Gain</span>
                  <span className="font-display font-bold text-2xl text-white">+40%</span>
                  <span className="block font-mono text-[7.5px] text-neutral-500 mt-0.5">vs standard baselines</span>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between w-full max-w-[280px]">
                <span className="font-mono text-[8.5px] text-neutral-400 uppercase tracking-wider">
                  PyTorch • Attention
                </span>
                <a
                  href="https://github.com/RazeO1/LAMTT-Financial-Intelligence"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#d5802a]/20 border border-[#d5802a]/40 text-[#d5802a] font-mono text-[9px] uppercase font-bold hover:bg-[#d5802a] hover:text-black transition-colors pointer-events-auto"
                >
                  <span>View Code</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* EXHIBIT 03: Edge vs Cloud Pipeline (Synchronized with Face 3: 03.png) */}
          <div
            ref={exhibit3Ref}
            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 will-change-transform pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Left Flank: Systems Architecture */}
            <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] flex flex-col justify-center text-left">
              <span
                className="text-white/20 leading-none select-none font-mono text-4xl sm:text-5xl lg:text-6xl font-light mb-2"
                style={{ fontFamily: '"Bitcount Grid Single", monospace' }}
              >
                I // 03
              </span>
              <div className="font-mono text-[9.5px] uppercase tracking-widest text-[#60a5fa] font-bold">
                // 03 EDGE SYSTEMS • ETL & DEPLOYMENT
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mt-1.5">
                Edge vs Cloud Pipeline
              </h2>
              <p className="font-mono text-[11px] lg:text-xs text-[#60a5fa] font-bold mt-1">
                Microservice & Local API Gateway
              </p>
              <p className="font-mono text-[9px] text-neutral-400 mt-1">
                67% Reduction in Roundtrip Overhead
              </p>
              <p className="font-sans text-neutral-300 text-xs sm:text-[13px] leading-relaxed mt-3 max-w-sm">
                Cut end-to-end system delay by 67% vs cloud-based architectures. Engineered automated ETL ingestion, Flask/FastAPI REST endpoints, memory token buffers, and Dockerized microservices.
              </p>
              <div className="mt-4 flex flex-col gap-1 font-mono text-[9px] text-neutral-400 uppercase tracking-wider">
                <div>• Local Gateway Token Buffering</div>
                <div>• Zero Cloud Roundtrip Bottleneck</div>
                <div>• Containerized Edge Runtime</div>
              </div>
            </div>

            {/* Right Flank: Latency Benchmark Chart */}
            <div className="w-full md:w-[280px] lg:w-[340px] flex flex-col justify-center items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="p-3.5 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md w-full max-w-[280px] space-y-2.5 font-mono text-[9px]">
                <div className="text-white font-bold pb-1 border-b border-white/10 flex justify-between">
                  <span>LATENCY BENCHMARK</span>
                  <span className="text-[#60a5fa]">67% FASTER</span>
                </div>
                <div>
                  <div className="flex justify-between text-neutral-400 text-[8px] mb-1">
                    <span>STANDARD CLOUD</span>
                    <span className="text-neutral-300">~280ms ROUNDTRIP</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-neutral-800 overflow-hidden">
                    <div className="w-[85%] h-full bg-neutral-600 rounded" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-white text-[8px] mb-1">
                    <span className="text-[#60a5fa] font-bold">UNIMAP EDGE ENGINE</span>
                    <span className="text-[#60a5fa] font-bold">~62ms</span>
                  </div>
                  <div className="w-full h-1.5 rounded bg-neutral-800 overflow-hidden">
                    <div className="w-[28%] h-full bg-[#60a5fa] rounded" />
                  </div>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 justify-start md:justify-end text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">FastAPI</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Docker</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Redis</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">CI/CD</span>
              </div>
            </div>
          </div>

          {/* EXHIBIT 04: Wireless AI & Spatial Sensing (Synchronized with Face 4: 05_presentation.jpg) */}
          <div
            ref={exhibit4Ref}
            className="absolute inset-0 flex flex-col md:flex-row items-center md:items-stretch justify-between px-6 md:px-12 lg:px-16 xl:px-24 py-16 md:py-20 will-change-transform pointer-events-none"
            style={{ opacity: 0 }}
          >
            {/* Left Flank: Spatial AI & Mathematical Proof */}
            <div className="w-full md:w-[280px] lg:w-[320px] xl:w-[360px] flex flex-col justify-center text-left">
              <span
                className="text-white/20 leading-none select-none font-mono text-4xl sm:text-5xl lg:text-6xl font-light mb-2"
                style={{ fontFamily: '"Bitcount Grid Single", monospace' }}
              >
                M // 04
              </span>
              <div className="font-mono text-[9.5px] uppercase tracking-widest text-[#22c55e] font-bold">
                // 04 SPATIAL INTELLIGENCE • WIRELESS LOCALIZATION
              </div>
              <h2 className="font-display font-medium text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-snug mt-1.5">
                Wireless Sensing AI
              </h2>
              <p className="font-mono text-[11px] lg:text-xs text-[#22c55e] font-bold mt-1">
                Angle-of-Arrival (AoA) Estimation
              </p>
              <p className="font-mono text-[9px] text-neutral-400 mt-1">
                Supervised ML & Ambiguity Proof
              </p>
              <p className="font-sans text-neutral-300 text-xs sm:text-[13px] leading-relaxed mt-3 max-w-sm">
                Researched RSSI-based Angle-of-Arrival estimation for wireless spatial sensing. Achieved ~96% classification accuracy and mathematically modeled boundary-induced ambiguity and non-invertibility.
              </p>
              <div className="mt-4 p-2.5 rounded bg-white/5 border border-white/10 font-mono text-[8.5px] text-neutral-300 max-w-sm">
                <div className="text-neutral-400 font-bold mb-0.5">RESEARCH PROOF:</div>
                <div className="text-[#22c55e]">Boundary Ambiguity & Non-Invertibility Theorem</div>
              </div>
            </div>

            {/* Right Flank: Polar AoA Radar Chart */}
            <div className="w-full md:w-[280px] lg:w-[340px] flex flex-col justify-center items-start md:items-end text-left md:text-right mt-4 md:mt-0">
              <div className="p-3.5 rounded-lg border border-white/10 bg-black/60 backdrop-blur-md w-full max-w-[280px]">
                <div className="flex items-center justify-between font-mono text-[9px] text-neutral-400 pb-1.5 border-b border-white/10 mb-2">
                  <span>AoA POLAR VECTOR:</span>
                  <span className="text-[#22c55e] font-bold">64.2° (~96%)</span>
                </div>
                <svg viewBox="0 0 260 65" className="w-full h-[50px] select-none">
                  <path d="M 30 55 A 100 100 0 0 1 230 55" fill="none" stroke="#333" strokeWidth="0.8" />
                  <path d="M 70 55 A 60 60 0 0 1 190 55" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                  <line x1="130" y1="55" x2="60" y2="18" stroke="#444" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="130" y1="55" x2="200" y2="18" stroke="#444" strokeWidth="0.8" strokeDasharray="2 2" />
                  <line x1="130" y1="55" x2="175" y2="12" stroke="#22c55e" strokeWidth="2" />
                  <circle cx="175" cy="12" r="3.5" fill="#22c55e" />
                  <circle cx="130" cy="55" r="3" fill="#fff" />
                  <text x="185" y="15" fill="#22c55e" fontSize="7" fontFamily="monospace" fontWeight="bold">AoA: 64.2°</text>
                </svg>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5 justify-start md:justify-end text-[8px] font-mono uppercase tracking-wider text-neutral-400">
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Spatial Sensing</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">AoA Estimation</span>
                <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">Scikit-learn</span>
              </div>
            </div>
          </div>
        </div>

        {/* =================================================================
            BACKGROUND: GIANT DOT-MATRIX MARQUEE RIBBON (title-reveal-wrap)
            With authentic Bitcount Grid Single typography & masked reveal
            ================================================================= */}
        <div
          ref={titleRevealWrapRef}
          className="absolute top-1/2 -translate-y-1/2 left-0 w-full overflow-hidden pointer-events-none z-0 flex items-center opacity-[0.06]"
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
                    FACE 1 (Front / 0 deg): 01_hero.jpg (Research Intern)
                    ------------------------------------------------------------- */}
                <div
                  className="face front absolute inset-0 bg-[#0c0c0c] border border-white/20 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(0deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/01_hero.jpg"
                    alt="Yash Raj - Malaysia Research Internship"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    01 // RESEARCH INTERN
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 2 (Left / -90 deg): 02_team.jpg (Research Cohort & Lab)
                    Positioned at -90deg (270deg) to enter right after Front
                    ------------------------------------------------------------- */}
                <div
                  className="face left absolute inset-0 bg-[#0c0c0c] border border-white/20 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(-90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/02_team.jpg"
                    alt="UniMAP Research Cohort and Lab"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    02 // COHORT & LAB
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 3 (Back / 180 deg): 03.png (Canselori UniMAP)
                    ------------------------------------------------------------- */}
                <div
                  className="face back absolute inset-0 bg-[#0c0c0c] border border-white/20 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(180deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/03.png"
                    alt="Canselori Tuanku Syed Sirajuddin - UniMAP"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    03 // CANSELORI UniMAP
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    FACE 4 (Right / 90 deg): 05_presentation.jpg (Defense)
                    Positioned at 90deg to enter right after Back
                    ------------------------------------------------------------- */}
                <div
                  className="face right absolute inset-0 bg-[#0c0c0c] border border-white/20 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateY(90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/05_presentation.jpg"
                    alt="Research Presentation and Defense"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    04 // RESEARCH DEFENSE
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    TOP PLATE: 04_top of the cube.jpg (FKTE Faculty)
                    ------------------------------------------------------------- */}
                <div
                  className="face top absolute inset-0 bg-[#0c0c0c] border border-white/25 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateX(90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/04_top%20of%20the%20cube.jpg"
                    alt="UniMAP FKTE Faculty Team"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    TOP // FKTE FACULTY
                  </div>
                </div>

                {/* -------------------------------------------------------------
                    BOTTOM PLATE: 06 bottom of the cube.png (Perlis Coast)
                    ------------------------------------------------------------- */}
                <div
                  className="face bottom absolute inset-0 bg-[#080808] border border-white/20 overflow-hidden shadow-[inset_0_0_35px_rgba(0,0,0,0.8)]"
                  style={{
                    width: "var(--scene-size)",
                    height: "var(--scene-size)",
                    transform: "rotateX(-90deg) translateZ(var(--scene-depth))",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <img
                    src="/Experience%20pics/06%20bottom%20of%20the%20cube.png"
                    alt="Penang Coastline & Port"
                    className="w-full h-full object-cover select-none pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-black/40 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/15 font-mono text-[8px] uppercase tracking-wider text-white/90 font-bold">
                    BASE // PERLIS NODE
                  </div>
                </div>
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
