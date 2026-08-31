"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */

import { useRef, useState, useEffect, useMemo } from "react";

// Constants matching the sketchbook mechanics
const N = 18;        // Number of strips for smooth curving
const SPAN = 0.449;  // Gutter to outer page edge span fraction
const BETA = 0.60;   // Peak curl arc angle in radians

const PAGES = [
  { title: "Schematics Cover", place: "Index" },
  { title: "Aether-Net Neural Shader", place: "AI Graphics" },
  { title: "Khepri Vector Physics", place: "Rust Wasm" },
  { title: "Nox Spatial Audio", place: "Web Audio" },
  { title: "Chronos Swiss Timepiece", place: "Simulation" },
  { title: "Apex Generative Pavilion", place: "3D Parametric" },
  { title: "Vortex Fluid Dynamics", place: "Physics Solvers" },
];

export default function Showcase() {
  const bookRef = useRef<HTMLDivElement>(null);
  const capOutRef = useRef<HTMLDivElement>(null);
  const capInRef = useRef<HTMLDivElement>(null);



  const turnRef = useRef<{ dir: "next" | "prev"; from: number; to: number } | null>(null);
  const turnT = useRef<number>(0);

  const viewRef = useRef({ rx: 0, ry: 0, z: 1.0 });
  const targetViewRef = useRef({ rx: 0, ry: 0, z: 1.0 });

  const springRef = useRef<{
    kind: "spring" | "tween";
    v: number;
    target: number;
    done?: () => void;
    k: number;
    c: number;
    from?: number;
    dur?: number;
    e?: number;
  } | null>(null);

  const dragRef = useRef<{
    active: boolean;
    dir: "next" | "prev";
    x0: number;
    w: number;
    moved: number;
    vel: number;
    tPrev: number;
  }>({
    active: false,
    dir: "next",
    x0: 0,
    w: 0,
    moved: 0,
    vel: 0,
    tPrev: 0,
  });

  // Size and layout dimensions state (to avoid accessing refs during render)
  const [bookSize, setBookSize] = useState({ width: 0, height: 0 });
  const { width } = bookSize;

  // Core interactive states
  const [idx, setIdx] = useState(0);
  const idxRef = useRef(0);
  const updateIdx = (newIdx: number) => {
    idxRef.current = newIdx;
    setIdx(newIdx);
  };

  const [turn, setTurn] = useState<{ dir: "next" | "prev"; from: number; to: number } | null>(null);
  const [isIntro, setIsIntro] = useState(true);
  const [introClass, setIntroClass] = useState("");



  // Showcase images from public/showcase
  const pageUrls = useMemo(() => [
    "/showcase/1.png",
    "/showcase/2.png",
    "/showcase/3.png",
    "/showcase/4.png",
    "/showcase/5.png",
    "/showcase/6.png",
    "/showcase/7.png",
  ], []);

  const M = pageUrls.length;

  // Initialize resize listener to keep width/height updated dynamically
  useEffect(() => {
    const updateSize = () => {
      if (bookRef.current) {
        const w = bookRef.current.clientWidth;
        const h = bookRef.current.clientHeight;
        setBookSize({ width: w, height: h });
        // Set layout variables on parent container
        const tiltEl = bookRef.current.closest('.sb-tilt') as HTMLElement;
        if (tiltEl) {
          tiltEl.style.setProperty('--bw', `${w}px`);
        }
      }
    };
    
    updateSize();
    const timer = setTimeout(updateSize, 100);

    window.addEventListener("resize", updateSize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const applyTurn = (t: number) => {
    if (!bookRef.current) return;
    const th = Math.PI * t;
    const beta = BETA * Math.sin(Math.PI * t);
    const D = 180 / Math.PI;
    const tt = th + beta;
    const td = (2 * beta) / N;

    const tiltEl = bookRef.current.closest('.sb-tilt') as HTMLElement;
    if (tiltEl) {
      tiltEl.style.setProperty('--tt', (tt * D).toFixed(2) + 'deg');
      tiltEl.style.setProperty('--td', (td * D).toFixed(3) + 'deg');
      tiltEl.style.setProperty('--shade', Math.sin(Math.PI * t).toFixed(3));
    }

    const stripEls = bookRef.current.querySelectorAll('.strip');
    for (let i = 0; i < stripEls.length; i++) {
      const el = stripEls[i] as HTMLElement;
      const l1 = Math.abs(Math.cos(tt - i * td));
      const l2 = Math.abs(Math.cos(tt - (i + 1) * td));
      el.style.setProperty('--lit', l1.toFixed(3));
      el.style.setProperty('--a1', ((1 - l1) * 0.62).toFixed(3));
      el.style.setProperty('--a2', ((1 - l2) * 0.62).toFixed(3));
    }

    fadeCaption(t);
  };

  const applyView = () => {
    if (!bookRef.current) return;
    const tiltEl = bookRef.current.closest('.sb-tilt') as HTMLElement;
    if (tiltEl) {
      tiltEl.style.setProperty('--rx', viewRef.current.rx.toFixed(2) + 'deg');
      tiltEl.style.setProperty('--ry', viewRef.current.ry.toFixed(2) + 'deg');
      tiltEl.style.setProperty('--zoom', viewRef.current.z.toFixed(3));
    }
    const zReadEl = document.getElementById('zRead');
    if (zReadEl) {
      zReadEl.textContent = Math.round(viewRef.current.z * 100) + '%';
    }
    const zOutBtn = document.getElementById('zOut') as HTMLButtonElement;
    const zInBtn = document.getElementById('zIn') as HTMLButtonElement;
    if (zOutBtn) zOutBtn.disabled = viewRef.current.z <= 0.901;
    if (zInBtn) zInBtn.disabled = viewRef.current.z >= 1.499;
  };

  const fadeCaption = (t: number) => {
    if (!capOutRef.current || !capInRef.current) return;
    const outOpacity = 1 - Math.max(0, Math.min(1, (t - 0.10) / 0.28));
    const inOpacity = Math.max(0, Math.min(1, (t - 0.56) / 0.30));
    capOutRef.current.style.opacity = outOpacity.toFixed(3);
    capInRef.current.style.opacity = inOpacity.toFixed(3);
  };

  const tick = (now: number) => {
    rafRef.current = null;
    const dt = Math.min(0.032, (now - lastTimeRef.current) / 1000 || 0.016);
    lastTimeRef.current = now;

    let active = false;

    if (springRef.current && turnRef.current) {
      active = true;
      const s = springRef.current;
      if (s.kind === 'tween') {
        s.e = (s.e || 0) + dt;
        const k = Math.min(1, s.e / (s.dur || 0.2));
        const t = (s.from || 0) + (s.target - (s.from || 0)) * k;
        turnT.current = t;
        applyTurn(t);
        if (k >= 1) {
          springRef.current = null;
          const d = s.done;
          if (d) d();
        }
      } else {
        const x = turnT.current - s.target;
        s.v += (-s.k * x - s.c * s.v) * dt;
        turnT.current += s.v * dt;
        if (Math.abs(turnT.current - s.target) < 0.002 && Math.abs(s.v) < 0.02) {
          turnT.current = s.target;
          springRef.current = null;
          applyTurn(turnT.current);
          const d = s.done;
          if (d) d();
        } else {
          applyTurn(turnT.current);
        }
      }
    }

    const e = 0.14;
    let viewMoved = false;
    const v = viewRef.current;
    const tv = targetViewRef.current;

    const rxDiff = tv.rx - v.rx;
    if (Math.abs(rxDiff) > 0.0006) {
      v.rx += rxDiff * e;
      viewMoved = true;
    } else {
      v.rx = tv.rx;
    }

    const ryDiff = tv.ry - v.ry;
    if (Math.abs(ryDiff) > 0.0006) {
      v.ry += ryDiff * e;
      viewMoved = true;
    } else {
      v.ry = tv.ry;
    }

    const zDiff = tv.z - v.z;
    if (Math.abs(zDiff) > 0.0006) {
      v.z += zDiff * e;
      viewMoved = true;
    } else {
      v.z = tv.z;
    }

    if (viewMoved) {
      applyView();
      active = true;
    }

    if (active && rafRef.current === null) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const kick = () => {
    if (rafRef.current === null) {
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const startTurn = (dir: "next" | "prev", tInitial: number = 0) => {
    springRef.current = null;
    if (turnRef.current) {
      updateIdx(turnRef.current.to);
      turnRef.current = null;
    }
    const from = idxRef.current;
    const to = dir === "next" ? (from + 1) % M : (from - 1 + M) % M;
    const newTurn = { dir, from, to };
    turnRef.current = newTurn;
    turnT.current = tInitial;
    setTurn(newTurn);
  };

  const commit = () => {
    if (!turnRef.current) return;
    springRef.current = {
      kind: 'spring',
      v: dragRef.current.vel,
      target: 1.0,
      k: 170,
      c: 26,
      done: () => {
        if (!turnRef.current) return;
        const to = turnRef.current.to;
        updateIdx(to);
        setTurn(null);
        turnRef.current = null;
      }
    };
    kick();
  };

  const cancel = () => {
    if (!turnRef.current) return;
    springRef.current = {
      kind: 'spring',
      v: dragRef.current.vel,
      target: 0.0,
      k: 150,
      c: 24,
      done: () => {
        setTurn(null);
        turnRef.current = null;
      }
    };
    kick();
  };

  const runRiffleStep = (stepIndex: number, stepsCount: number) => {
    if (stepIndex >= stepsCount) {
      setIsIntro(false);
      setIntroClass("");
      return;
    }
    const bell = Math.sin(Math.PI * (stepIndex / (stepsCount - 1)));
    const dur = 0.26 - 0.19 * bell;

    setIntroClass(bell > 0.55 ? "intro b2" : "intro");
    startTurn('next', 0);

    springRef.current = {
      kind: 'tween',
      from: 0,
      target: 1.0,
      dur: dur,
      e: 0,
      v: 0,
      k: 0,
      c: 0,
      done: () => {
        if (!turnRef.current) return;
        const to = turnRef.current.to;
        updateIdx(to);
        setTurn(null);
        turnRef.current = null;
        runRiffleStep(stepIndex + 1, stepsCount);
      }
    };
    kick();
  };

  const introStartedRef = useRef(false);

  useEffect(() => {
    if (width > 0 && isIntro && !introStartedRef.current) {
      introStartedRef.current = true;
      const steps = M;
      const timer = setTimeout(() => {
        runRiffleStep(0, steps);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [width, isIntro]);

  const handleBookPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 || isIntro || turnRef.current) return;
    
    const target = e.target as HTMLElement;
    const isPrevZone = target.closest(".sb-prev");
    const isNextZone = target.closest(".sb-next");
    if (!isPrevZone && !isNextZone) return;

    e.preventDefault();
    const dir = isNextZone ? "next" : "prev";

    dragRef.current = {
      active: true,
      dir,
      x0: e.clientX,
      w: width,
      moved: 0,
      vel: 0,
      tPrev: performance.now(),
    };

    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleBookPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;

    const drag = dragRef.current;
    const dx = e.clientX - drag.x0;
    drag.moved = Math.max(drag.moved, Math.abs(dx));

    // Start turn only after crossing the drag threshold to prevent DOM-swap pointer capture loss
    if (!turnRef.current) {
      if (drag.moved >= 6) {
        startTurn(drag.dir, 0);
      } else {
        return;
      }
    }

    const raw = (drag.dir === "next" ? -dx : dx) / (drag.w * 0.62);
    const t = Math.max(0, Math.min(1, raw));

    const now = performance.now();
    const dt = Math.max(0.001, (now - drag.tPrev) / 1000);
    drag.vel = (t - turnT.current) / dt;
    drag.tPrev = now;

    turnT.current = t;
    applyTurn(t);
  };

  const handleBookPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.active) return;
    const drag = dragRef.current;
    drag.active = false;
    e.currentTarget.releasePointerCapture(e.pointerId);

    if (turnRef.current) {
      const go = turnT.current > 0.42 || drag.vel > 1.1;
      if (go) {
        commit();
      } else {
        cancel();
      }
    } else {
      // Tap/click: start and immediately commit the turn to flip the page!
      startTurn(drag.dir, 0);
      commit();
    }
  };

  const handleArrowClick = (dir: "next" | "prev") => {
    if (turnRef.current || isIntro) return;
    startTurn(dir, 0);
    dragRef.current.vel = 0;
    commit();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || turnRef.current || dragRef.current.active) return;
    if (!bookRef.current || width === 0) return;
    
    const rect = bookRef.current.getBoundingClientRect();
    const nx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.9)));
    
    targetViewRef.current = {
      rx: -ny * 4.5,
      ry: nx * 7.0,
      z: targetViewRef.current.z
    };
    kick();
  };

  const handlePointerOut = () => {
    targetViewRef.current = {
      ...targetViewRef.current,
      rx: 0,
      ry: 0
    };
    kick();
  };

  const handleDoubleClick = () => {
    targetViewRef.current = {
      ...targetViewRef.current,
      z: 1.0
    };
    kick();
  };

  // Recursively render nested 3D strips for page bending paper mesh
  const renderStrips = (i: number): React.ReactNode => {
    if (i >= N || !turn) return null;
    const isEdge = i === N - 1;
    
    const gut = `calc(${width}px * 0.5)`;
    const sw = `calc(${width}px * ${SPAN} / ${N})`;
    
    const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
    const B = `calc((${i + 1}) * ${sw} - ${gut})`;
    
    const faceFrontX = turn.dir === "next" ? A : B;
    const faceBackX = turn.dir === "next" ? B : A;
    const tt = 0;
    const td = 0;

    const l1 = Math.abs(Math.cos(tt - i * td));
    const l2 = Math.abs(Math.cos(tt - (i + 1) * td));

    const a1 = ((1 - l1) * 0.62).toFixed(3);
    const a2 = ((1 - l2) * 0.62).toFixed(3);

    return (
      <div 
        className={`strip ${isEdge ? "edge" : ""}`} 
        style={{ 
          "--i": i,
          "--lit": l1.toFixed(3),
          "--a1": a1,
          "--a2": a2,
        } as any}
      >
        <div 
          className="face front" 
          style={{ 
            backgroundImage: `url(${pageUrls[turn.from]})`, 
            backgroundPositionX: faceFrontX,
          }}
        >
          <div className="sh" />
          <div className="gl" />
        </div>
        <div 
          className="face back" 
          style={{ 
            backgroundImage: `url(${pageUrls[turn.to]})`, 
            backgroundPositionX: faceBackX,
          }}
        >
          <div className="sh" />
          <div className="gl" />
        </div>
        {renderStrips(i + 1)}
      </div>
    );
  };

  const renderBookContent = () => {
    if (width === 0) return null;
    
    if (!turn) {
      return (
        <div className="sb-full absolute inset-0">
          <img src={pageUrls[idx]} alt={PAGES[idx].title} className="w-full h-full object-fill block" />
        </div>
      );
    }

    const next = turn.dir === "next";
    const leftIndex = next ? turn.from : turn.to;
    const rightIndex = next ? turn.to : turn.from;

    return (
      <>
        {/* Left half page behind */}
        <div className="sb-half left absolute top-0 bottom-0 left-0 w-1/2">
          <img src={pageUrls[leftIndex]} className="sb-half-img left w-[200%] max-w-none h-full object-fill block" alt="" />
          <div className="gutter-shade left absolute right-0 w-[46%]" />
        </div>

        {/* Right half page behind */}
        <div className="sb-half right absolute top-0 bottom-0 left-1/2 w-1/2">
          <img src={pageUrls[rightIndex]} className="sb-half-img right w-[200%] max-w-none h-full object-fill block -ml-[100%]" alt="" />
          <div className="gutter-shade right absolute left-0 w-[46%]" />
        </div>

        {/* The sweeping turning page curl */}
        <div
          className={`curl ${turn.dir}`}
          style={{
            position: "absolute",
            top: 0,
            height: "100%",
            width: `calc(${width}px * ${SPAN})`,
            transformStyle: "preserve-3d",
            zIndex: 6,
            left: turn.dir === "next" ? "50%" : "auto",
            right: turn.dir === "prev" ? "50%" : "auto",
          }}
        >
          {renderStrips(0)}
        </div>
      </>
    );
  };

  return (
    <section id="showcase" className="relative w-full py-24 select-none bg-[#fcf7f3] border-t border-black/5 flex flex-col items-center">
      {/* Decorative label */}
      <div className="mb-4">
        <span className="font-mono text-xs uppercase tracking-widest text-[#de3421] font-bold">
          Section 02 / Showcase
        </span>
      </div>
      <h2 className="font-display font-medium text-4xl md:text-5xl text-black text-center mb-10 tracking-tight">
        Interactive Sketchbook
      </h2>

      {/* Sketchbook Stage */}
      <div className={`sb-wrap w-full max-w-[1080px] px-6 md:px-12 flex flex-col items-center gap-6 ${introClass}`}>
        <div
          className="sb-stage relative w-full flex items-center justify-center"
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          {/* Navigation arrow left */}
          <button
            onClick={() => handleArrowClick("prev")}
            className="sb-arrow left absolute left-2 md:-left-4 z-40 p-4 border-0 bg-transparent text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="previous page"
            disabled={isIntro}
          >
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" className="stroke-current">
              <polyline points="11,3 3,22 11,41" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* 3D Transform Frame */}
          <div className="sb-3d relative w-full">
            <div
              className="sb-tilt w-full h-full relative"
              style={{
                transformStyle: "preserve-3d",
                "--bw": `${width}px`,
                "--span": SPAN,
                "--n": N,
              } as any}
              onDoubleClick={handleDoubleClick}
            >
              {/* Soft shadows */}
              <div className="sb-cast ambient absolute inset-0 z-0" />
              <div className="sb-cast contact absolute inset-0 z-0" />
              <div className="sb-cast hair absolute inset-0 z-0" />
              
              {/* Core Book element */}
              <div
                ref={bookRef}
                className="sb-book w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
                onPointerDown={handleBookPointerDown}
                onPointerMove={handleBookPointerMove}
                onPointerUp={handleBookPointerUp}
                onPointerCancel={handleBookPointerUp}
              >
                {/* Render the double-page spreads */}
                {renderBookContent()}

                {/* Hotspot hitboxes for page flips / drags */}
                <div
                  className="sb-zone sb-prev absolute top-0 bottom-0 left-0 w-1/2 z-40 cursor-grab active:cursor-grabbing"
                  title="Previous Page"
                />
                <div
                  className="sb-zone sb-next absolute top-0 bottom-0 right-0 w-1/2 z-40 cursor-grab active:cursor-grabbing"
                  title="Next Page"
                />
              </div>
            </div>
          </div>

          {/* Navigation arrow right */}
          <button
            onClick={() => handleArrowClick("next")}
            className="sb-arrow right absolute right-2 md:-right-4 z-40 p-4 border-0 bg-transparent text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="next page"
            disabled={isIntro}
          >
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" className="stroke-current">
              <polyline points="3,3 11,22 3,41" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Caption panel */}
        <div className="sb-captions min-h-[48px] text-center flex flex-col justify-center relative w-full select-none">
          {!turn ? (
            <div className="animate-fade-in">
              <p className="sb-caption font-display font-medium text-xl md:text-2xl text-neutral-800 leading-tight">
                {PAGES[idx].title}
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#d5802a] font-bold mt-1">
                {PAGES[idx].place}
              </p>
            </div>
          ) : (
            <div className="w-full relative min-h-[48px]">
              <div ref={capOutRef} className="absolute left-0 right-0 top-0 transition-none">
                <p className="font-display font-medium text-xl md:text-2xl text-neutral-800 leading-tight">
                  {PAGES[turn.from].title}
                </p>
                <p className="text-xs font-mono uppercase tracking-widest text-[#d5802a] font-bold mt-1">
                  {PAGES[turn.from].place}
                </p>
              </div>
              <div ref={capInRef} className="absolute left-0 right-0 top-0 transition-none opacity-0">
                <p className="font-display font-medium text-xl md:text-2xl text-neutral-800 leading-tight">
                  {PAGES[turn.to].title}
                </p>
                <p className="text-xs font-mono uppercase tracking-widest text-[#d5802a] font-bold mt-1">
                  {PAGES[turn.to].place}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Toolbar controls (Zoom buttons, Readout) */}
        <div className="sb-tools flex items-center gap-2 border border-black/10 rounded-full px-4 py-2 bg-neutral-50/50 backdrop-blur-md">
          {/* Zoom Out Button */}
          <button
            id="zOut"
            onClick={() => {
              targetViewRef.current.z = Math.max(0.9, targetViewRef.current.z / 1.16);
              kick();
            }}
            className="tool w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200/50 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            aria-label="Zoom Out"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 l4.6 4.6 M6.2 8.6 h4.8" />
            </svg>
          </button>

          {/* Zoom Percentage Readout */}
          <span id="zRead" className="font-mono text-[10px] w-12 text-center text-neutral-400 font-bold">
            100%
          </span>

          {/* Zoom In Button */}
          <button
            id="zIn"
            onClick={() => {
              targetViewRef.current.z = Math.min(1.5, targetViewRef.current.z * 1.16);
              kick();
            }}
            className="tool w-7 h-7 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200/50 hover:text-black disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
            aria-label="Zoom In"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <circle cx="8.6" cy="8.6" r="5.6" />
              <path d="M12.8 12.8 l4.6 4.6 M6.2 8.6 h4.8 M8.6 6.2 v4.8" />
            </svg>
          </button>
        </div>

        <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-bold mt-1 text-center animate-fade-in">
          {width > 0 ? "Drag pages to turn" : "Measuring layout dimensions..."}
        </p>
      </div>

      {/* Inject styling parameters matching raw HTML structures */}
      <style dangerouslySetInnerHTML={{ __html: `
        .sb-3d {
          position: relative;
          perspective: 1750px;
          perspective-origin: 50% 46%;
          transform-style: preserve-3d;
          max-width: 900px;
          width: 100%;
          margin: 0 auto;
        }
        .sb-tilt {
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg)) scale(var(--zoom, 1));
          will-change: transform;
        }
        .sb-book {
          position: relative;
          width: 100%;
          aspect-ratio: 1890 / 832;
          transform-style: preserve-3d;
          z-index: 1;
          --pg: 3%;
        }
        
        /* Shadows positioning and decay */
        .sb-cast {
          position: absolute;
          pointer-events: none;
          z-index: 0;
        }
        .sb-cast.ambient {
          left: 5%;
          right: 5%;
          top: 27%;
          bottom: 2%;
          background: radial-gradient(50% 50% at 50% 58%, rgba(58,44,26,.34) 0%, rgba(58,44,26,.19) 40%, rgba(58,44,26,0) 74%);
          filter: blur(26px);
          opacity: calc(1 - var(--shade, 0) * 0.42);
        }
        .sb-cast.contact {
          left: 9%;
          right: 9%;
          top: 62%;
          bottom: 10%;
          background: radial-gradient(50% 44% at 50% 42%, rgba(44,32,14,.40) 0%, rgba(44,32,14,.17) 48%, rgba(44,32,14,0) 78%);
          filter: blur(11px);
          opacity: calc(1 - var(--shade, 0) * 0.50);
        }
        .sb-cast.hair {
          left: 12%;
          right: 12%;
          top: 70%;
          bottom: 17%;
          background: radial-gradient(50% 52% at 50% 40%, rgba(40,28,10,.34) 0%, rgba(40,28,10,0) 76%);
          filter: blur(4px);
          opacity: calc(1 - var(--shade, 0) * 0.62);
        }
        
        .gutter-shade {
          position: absolute;
          top: var(--pg, 3%);
          bottom: var(--pg, 3%);
          width: 46%;
          pointer-events: none;
          opacity: calc(var(--shade, 0) * 0.62);
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%);
        }
        .gutter-shade.left {
          right: 0;
          background: linear-gradient(270deg, rgba(52, 38, 20, 0.30), rgba(52, 38, 20, 0) 82%);
        }
        .gutter-shade.right {
          left: 0;
          background: linear-gradient(90deg, rgba(52, 38, 20, 0.24), rgba(52, 38, 20, 0) 82%);
        }

        /* turning page curl and recursive nested strip bend */
        .curl {
          transform-style: preserve-3d;
        }
        .curl.next {
          left: 50%;
          transform-origin: left center;
          transform: rotateY(calc(-1 * var(--tt, 0deg)));
        }
        .curl.prev {
          right: 50%;
          transform-origin: right center;
          transform: rotateY(var(--tt, 0deg));
        }
        .strip {
          position: absolute;
          top: 0;
          height: 100%;
          width: calc(var(--bw) * var(--span) / var(--n));
          transform-style: preserve-3d;
        }
        .curl.next .strip {
          transform-origin: left center;
        }
        .curl.prev .strip {
          transform-origin: right center;
        }
        .curl.next > .strip {
          left: 0;
        }
        .curl.prev > .strip {
          right: 0;
          left: auto;
        }
        .curl.next .strip .strip {
          left: 100%;
          transform: rotateY(var(--td, 0deg));
        }
        .curl.prev .strip .strip {
          right: 100%;
          transform: rotateY(calc(-1 * var(--td, 0deg)));
        }
        .face {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: -1.2px;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          background-repeat: no-repeat;
          background-size: var(--bw) 100%;
        }
        .face.back {
          transform: rotateY(180deg);
        }
        .face .sh, .face .gl {
          position: absolute;
          left: 0;
          right: 0;
          top: var(--pg, 3%);
          bottom: var(--pg, 3%);
          pointer-events: none;
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%);
          mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%);
        }
        .strip.edge .face .sh, .strip.edge .face .gl {
          -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%), var(--hf);
          mask-image: linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%), var(--hf);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
        }
        .curl.next .strip.edge .face.front, .curl.prev .strip.edge .face.back {
          --hf: linear-gradient(90deg, #000 0 22%, transparent 96%);
        }
        .curl.next .strip.edge .face.back, .curl.prev .strip.edge .face.front {
          --hf: linear-gradient(270deg, #000 0 22%, transparent 96%);
        }
        .curl.next .face.front .sh, .curl.prev .face.back .sh {
          background: linear-gradient(90deg, rgba(58, 43, 20, var(--a1, 0)), rgba(58, 43, 20, var(--a2, 0)));
        }
        .curl.next .face.back .sh, .curl.prev .face.front .sh {
          background: linear-gradient(90deg, rgba(58, 43, 20, var(--a2, 0)), rgba(58, 43, 20, var(--a1, 0)));
        }
        .face .gl {
          background: #fffaf0;
          opacity: calc(var(--shade, 0) * var(--lit, 1) * var(--lit, 1) * 0.20);
        }
        .sb-full img, .sb-half img {
          user-select: none;
          pointer-events: none;
        }
        
        .sb-half {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          overflow-x: clip;
          overflow-y: visible;
          transform-style: preserve-3d;
          z-index: 2;
        }
        .sb-half.left {
          left: 0;
          -webkit-mask-image: linear-gradient(90deg, #000 99.2%, transparent 100%);
          mask-image: linear-gradient(90deg, #000 99.2%, transparent 100%);
        }
        .sb-half.right {
          right: 0;
          -webkit-mask-image: linear-gradient(270deg, #000 99.2%, transparent 100%);
          mask-image: linear-gradient(270deg, #000 99.2%, transparent 100%);
        }
        .lens:before {
          z-index: 1;
          background: radial-gradient(circle at 50% 50%,
            rgba(0,0,0,0) 54%, rgba(58,44,26,0.10) 76%, rgba(46,34,16,0.34) 100%);
          box-shadow:
            inset 0 0 0 2px rgba(130,162,196,0.26),
            inset 0 0 0 4px rgba(206,158,112,0.15);
        }
        .lens:after {
          z-index: 2;
          background:
            radial-gradient(36% 26% at 29% 19%, rgba(255,255,255,0.30), rgba(255,255,255,0) 76%),
            radial-gradient(24% 16% at 74% 86%, rgba(255,255,255,0.12), rgba(255,255,255,0) 80%),
            linear-gradient(150deg, rgba(255,255,255,0.06) 0 18%, rgba(255,255,255,0) 42%);
        }

        /* Intro motion blur filters */
        .sb-wrap.intro .sb-full img, .sb-wrap.intro .sb-half-img {
          filter: url(#sb-mblur-1);
        }
        .sb-wrap.intro.b2 .sb-full img, .sb-wrap.intro.b2 .sb-half-img {
          filter: url(#sb-mblur-2);
        }
      ` }} />

      {/* SVG Motion Blur Filters */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <filter id="sb-mblur-1"><feGaussianBlur stdDeviation="5 0" /></filter>
        <filter id="sb-mblur-2"><feGaussianBlur stdDeviation="14 0" /></filter>
      </svg>
    </section>
  );
}
