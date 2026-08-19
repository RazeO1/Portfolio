"use client";
// Rebuild trigger: Slot conveyor update 1.

import { useRef, useState, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About3D from "./About3D";
import Projects from "./Projects";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

gsap.registerPlugin(useGSAP, ScrollTrigger);
interface ProjectItem {
  id: string;
  title: string;
  creator: string;
  project: string;
  category: string;
  image?: string;
}

const PROJECTS: ProjectItem[] = [
  { id: "neurograph-ai", title: "NEUROGRAPH AI", creator: "ELENA ROSTOVA", project: "NEUROGRAPH", category: "NEURAL NETWORKS", image: "/images/dashboard_ui.jpg" },
  { id: "symphony-synth", title: "SYMPHONY SYNTH", creator: "MARCUS VANCE", project: "SYMPHONY AUDIO", category: "CREATIVE SOUND" },
  { id: "aether-dna", title: "AETHER IDENTITY", creator: "LUCAS VANCE", project: "AETHER NET", category: "DESIGN SYSTEMS" },
  { id: "helios-energy", title: "HELIOS INTERFACE", creator: "KAITO SATO", project: "HELIOS CORP", category: "DASHBOARD SYSTEMS" },
  { id: "lumina-fashion", title: "LUMINA COLLECTION", creator: "SOPHIA LOREN", project: "LUMINA PARIS", category: "GENERATIVE DESIGN" },
  { id: "chronos-watch", title: "CHRONOS TIMEPIECE", creator: "HANS ZIMMER", project: "CHRONOS SWISS", category: "CREATIVE SOUND" },
  { id: "orion-space", title: "ORION VOYAGER", creator: "ARTHUR CLARKE", project: "ORION SPACE", category: "3D ENVIRONMENTS" },
  { id: "vortex-dynamics", title: "VORTEX DYNAMICS", creator: "NIKOLA TESLA", project: "VORTEX LAB", category: "PHYSICS SOLVERS" },
  { id: "apex-pavilion", title: "APEX PAVILION", creator: "ZAHA HADID", project: "APEX STUDIO", category: "3D ENVIRONMENTS" },
];
interface PretextParagraphProps {
  text: string;
  font: string;
  lineHeight: number;
  align?: "left" | "right" | "center";
  className?: string;
  colorClass?: string;
}

function PretextParagraph({
  text,
  font,
  lineHeight,
  align = "left",
  className = "",
  colorClass = "text-[#3a3a3a]"
}: PretextParagraphProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  const lineElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Update layout (once on mount/resize)
  useEffect(() => {
    setMounted(true);
    if (!containerRef.current) return;
    const updateLayout = () => {
      if (!containerRef.current) return;
      setWidth(containerRef.current.clientWidth);
    };

    updateLayout();
    
    const observer = new ResizeObserver(() => {
      updateLayout();
    });
    observer.observe(containerRef.current);

    window.addEventListener("resize", updateLayout);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateLayout);
    };
  }, []);

  const prepared = useMemo(() => {
    if (!mounted) return null;
    return prepareWithSegments(text, font);
  }, [text, font, mounted]);

  const lineLayouts = useMemo(() => {
    if (!mounted || width === 0 || !prepared) return [];
    
    // Clear refs before rendering the new list of lines
    lineElementsRef.current = [];

    const { lines } = layoutWithLines(prepared, width, lineHeight);

    const layouts: any[] = [];
    let currentY = 0;

    lines.forEach((line) => {
      let startX = 0;
      if (align === "right") {
        startX = width - line.width;
      } else if (align === "center") {
        startX = (width - line.width) / 2;
      }

      layouts.push({
        text: line.text,
        x: startX,
        y: currentY,
        width: line.width,
        height: lineHeight
      });

      currentY += lineHeight;
    });

    return layouts;
  }, [prepared, width, lineHeight, align, font]);

  const totalHeight = useMemo(() => {
    if (lineLayouts.length === 0) return 0;
    const lastLine = lineLayouts[lineLayouts.length - 1];
    return lastLine ? lastLine.y + lineHeight : 0;
  }, [lineLayouts, lineHeight]);

  // Animation frame loop for horizontal line repulsion wrapping
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const lines = lineLayouts;
      const lineEls = lineElementsRef.current;

      if (lines.length > 0 && containerRef.current) {
        const innerEl = containerRef.current.firstElementChild as HTMLElement;
        if (!innerEl) return;

        // Read real-time viewport bounding rect of the inner line container (ignores outer padding offsets)
        const rect = innerEl.getBoundingClientRect();

        // Viewport-relative head coordinates (sticky centered)
        const headViewportX = window.innerWidth / 2;
        const headViewportY = window.innerHeight / 2;

        // Local head coordinates inside this container
        const headLocalX = headViewportX - rect.left;
        const headLocalY = headViewportY - rect.top;

        const isDesktop = window.innerWidth >= 768;
        const repelRadius = isDesktop ? 120 : 80;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          const lineEl = lineEls[i];
          if (!lineEl) continue;

          // Line vertical center relative to container
          const cy = line.y + line.height / 2;

          // Vertical distance to head center
          const dy = cy - headLocalY;

          let offsetX = 0;

          // Calculate horizontal offset to wrap the entire line around the circular head contour
          if (Math.abs(dy) < repelRadius) {
            // Horizontal radius of the circle at this vertical offset (dy)
            const circleWidth = Math.sqrt(repelRadius * repelRadius - dy * dy);
            
            // Push calculation based on column alignment side:
            if (align === "right") {
              // Left column: line right edge is at startX + width = rect.width (or width)
              const rightEdge = line.x + line.width;
              const minAllowedRight = headLocalX - circleWidth;
              if (rightEdge > minAllowedRight) {
                offsetX = minAllowedRight - rightEdge;
              }
            } else {
              // Right column (or left-aligned): line left edge is at startX = line.x
              const leftEdge = line.x;
              const maxAllowedLeft = headLocalX + circleWidth;
              if (leftEdge < maxAllowedLeft) {
                offsetX = maxAllowedLeft - leftEdge;
              }
            }
          }

          lineEl.style.transform = `translate3d(${offsetX}px, 0, 0)`;
        }
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => {
      active = false;
    };
  }, [lineLayouts]);

  return (
    <div ref={containerRef} className={className} style={{ position: "relative" }}>
      {width === 0 ? (
        <p className={colorClass} style={{ textAlign: align }}>{text}</p>
      ) : (
        <div style={{ lineHeight: `${lineHeight}px`, height: `${totalHeight}px`, position: "relative" }}>
          {lineLayouts.map((line, idx) => (
            <div
              key={idx}
              ref={(el) => { lineElementsRef.current[idx] = el; }}
              className={`absolute select-none will-change-transform ${colorClass}`}
              style={{
                left: `${line.x}px`,
                top: `${line.y}px`,
                width: `${line.width}px`,
                height: `${line.height}px`,
                fontSize: "inherit",
                fontWeight: "inherit",
                fontFamily: "inherit",
                lineHeight: "inherit",
                transformOrigin: "center center",
                textAlign: align,
                whiteSpace: "nowrap"
              }}
            >
              {line.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface AboutProps {
  active: boolean;
}

export default function About({ active }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [projectsProgress, setProjectsProgress] = useState(0);
  const [tapData, setTapData] = useState({ x: 0, y: 0, trigger: 0 });
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => {
    if (isAboutInView) {
      setHasBeenVisible(true);
    }
  }, [isAboutInView]);

  useEffect(() => {
    const handleResize = () => {
      setDevice(window.innerWidth >= 768 ? "desktop" : "mobile");
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any).activeSection = activeSection;
      (window as any).projectsProgress = projectsProgress;
    }
  }, [activeSection, projectsProgress]);

  const bodyFont = device === "desktop" ? "300 17px sans-serif" : "300 16px sans-serif";
  const bodyLineHeight = device === "desktop" ? 17 * 1.6 : 16 * 1.6;

  useEffect(() => {
    if (!isAboutInView) return;
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isAboutInView]);

  const handleTapHead = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - (rect.left + rect.width / 2);
    const clickY = e.clientY - (rect.top + rect.height / 2);
    const normX = Math.max(-1, Math.min(1, clickX / (rect.width / 2)));
    const normY = Math.max(-1, Math.min(1, clickY / (rect.height / 2)));

    setTapData((prev) => ({
      x: normX,
      y: normY,
      trigger: prev.trigger + 1,
    }));
  };

  useGSAP(
    () => {
      if (!active) return;
      if (typeof window !== "undefined") {
        (window as any).gsap = gsap;
        (window as any).ScrollTrigger = ScrollTrigger;
      }
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setIsAboutInView(self.isActive),
      });

      // Background color transition from white/cream (#FAF8F5) to black (#0A0A0A)
      // Matches the palette in Design.md (neutral-950 / #000000)
      gsap.to(sectionRef.current, {
        backgroundColor: "#0A0A0A",
        scrollTrigger: {
          trigger: ".endline-trigger",
          start: "top 75%",     // Start transition when top of endline hits 75% of viewport
          end: "bottom 40%",    // End transition when bottom of endline hits 40% of viewport
          scrub: true,
        },
      });

      // Gradually change the text color inside the endline block from #111111 to cream/white #FAF8F5
      gsap.to(".endline-trigger p", {
        color: "#FAF8F5",
        scrollTrigger: {
          trigger: ".endline-trigger",
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // Gradually change the top border color from #e2e2e0 to a subtle dark-mode border
      gsap.to(".endline-trigger", {
        borderColor: "rgba(255, 255, 255, 0.15)",
        scrollTrigger: {
          trigger: ".endline-trigger",
          start: "top 75%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      const chapters = [
        { selector: ".headline-trigger", section: 0 },
        { selector: ".chapter-1", section: 1 },
        { selector: ".chapter-2", section: 2 },
        { selector: ".chapter-3", section: 3 },
        { selector: ".chapter-4", section: 4 },
        { selector: ".endline-trigger", section: 0 },
      ];

      chapters.forEach(({ selector, section }) => {
        ScrollTrigger.create({
          trigger: selector,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (self.isActive) setActiveSection(section);
          },
        });
      });

      // Showcase Trigger to update activeSection to 5 (Showcase pose)
      ScrollTrigger.create({
        trigger: ".showcase-track",
        start: "top 50%",
        end: "bottom 40%",
        onToggle: (self) => {
          if (self.isActive) setActiveSection(5);
        },
      });

      // Check for prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!prefersReducedMotion) {
        const easeOutBack = (t: number) => {
          const c1 = 1.70158;
          const c3 = c1 + 1;
          return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
        };

        const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));
        const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

        const updateCards = (progress: number) => {
          const playhead = progress * (PROJECTS.length - 1);
          
          // Set active card index
          const activeIdx = Math.min(
            PROJECTS.length - 1,
            Math.max(0, Math.round(progress * (PROJECTS.length - 1)))
          );
          setActiveCard(activeIdx);

          const w = window.innerWidth;
          const h = window.innerHeight;

          // Responsive spiral staircase parameters centered around the 3D head
          let centerX = w / 2;
          let centerY = h / 2;
          let cardW = 560;
          let cardH = 315;
          let activeRadius = 240;
          let radiusStep = 60;
          let angleStep = 0.52; // spiral orbital angle step (in radians)

          if (w < 640) {
            // Mobile (centered, compact stack)
            centerX = w * 0.5;
            centerY = h * 0.5;
            cardW = 280;
            cardH = 158;
            activeRadius = 110;
            radiusStep = 30;
            angleStep = 0.65;
          } else if (w < 1024) {
            // Tablet
            centerX = w * 0.5;
            centerY = h * 0.5;
            cardW = 420;
            cardH = 236;
            activeRadius = 170;
            radiusStep = 45;
            angleStep = 0.58;
          } else {
            // Desktop
            centerX = w * 0.5;
            centerY = h * 0.5;
            cardW = 560;
            cardH = 315;
            activeRadius = 230; // Orbit slightly tighter to fit on standard viewports
            radiusStep = 60;
            angleStep = 0.52;
          }

          const QUEUE_MAX = 5.4;
          const TRAIL_MAX = 4.2;

          const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");

          cards.forEach((el, idx) => {
            const depth = playhead - idx;

            if (depth <= -QUEUE_MAX || depth >= TRAIL_MAX) {
              el.style.setProperty("--op", "0");
              el.style.opacity = "0";
              el.style.pointerEvents = "none";
              return;
            }

            let tx = 0;
            let ty = 0;
            let sx = 1;
            let sy = 1;
            let capOp = 0;

            // Calculate spiral coordinates based on depth
            const theta = depth * angleStep;
            const R = activeRadius + Math.abs(depth) * radiusStep;

            // Position relative to the center of the viewport
            tx = centerX + R * Math.cos(theta) - cardW / 2;
            ty = centerY + R * Math.sin(theta) - cardH / 2;

            if (depth <= 0) {
              // QUEUE side (upcoming) + ACTIVE peak
              const mag = -depth;
              const scale = Math.max(1 - mag * 0.16, 0.16);

              const edge = clamp(mag - (QUEUE_MAX - 1), 0, 1);
              const te = 1 - easeOutBack(1 - edge);
              sx = scale * lerp(1, 1.5, edge * (1 - te));
              sy = scale * lerp(1, 0.45, edge * (1 - te));

              // Fade caption in as card approaches active (between -0.5 and 0 depth)
              if (depth < -0.5) {
                capOp = 0;
              } else {
                capOp = (depth + 0.5) / 0.5;
              }
            } else {
              // TRAIL side (past cards)
              const scale = Math.max(1 - depth * 0.24, 0.2);
              sx = sy = scale;
              capOp = clamp(1 - depth * 0.42, 0, 1);
            }

            el.style.setProperty("--tx", `${tx}px`);
            el.style.setProperty("--ty", `${ty}px`);
            el.style.setProperty("--sx", `${sx}`);
            el.style.setProperty("--sy", `${sy}`);
            el.style.setProperty("--op", "1");
            el.style.opacity = "1";

            // Rotate card tangent to the spiral angle for a helical effect
            const cardRotation = (theta * 180 / Math.PI) * 0.45 + (idx % 2 === 0 ? 1 : -1);

            el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${sx}, ${sy}) rotate(${cardRotation}deg)`;
            
            // Depth layering: active card has highest z-index
            const zIndexVal = Math.round((10 - Math.abs(depth) * 2) * 10);
            el.style.zIndex = `${zIndexVal}`;
            el.style.pointerEvents = Math.abs(depth) < 0.5 ? "auto" : "none";

            const cap = el.querySelector(".showcase-card-caption") as HTMLElement | null;
            if (cap) {
              cap.style.setProperty("--cap-op", `${capOp}`);
              cap.style.opacity = `${capOp}`;
              cap.style.transform = `translateY(${6 - capOp * 6}px)`;
            }
          });
        };

        // Create ScrollTrigger to scrub playhead
        const st = ScrollTrigger.create({
          id: "showcase-trigger",
          trigger: ".showcase-track",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            updateCards(self.progress);
          },
        });

        // Initialize state at progress = 0
        updateCards(0);

        // Update calculations on window resize
        const handleWindowResize = () => {
          updateCards(st.progress);
        };
        window.addEventListener("resize", handleWindowResize);

        // Fade in Selected Work eyebrow heading
        gsap.to(".showcase-eyebrow", {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: ".showcase-track",
            start: "top 90%",
            end: "top 40%",
            scrub: true,
          },
        });

        // Hover feedback for the cards - bound to card inner elements to prevent override jumps
        const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
        const hoverCleanups: (() => void)[] = [];

        cards.forEach((card) => {
          const inner = card.querySelector(".showcase-card-inner");
          const image = card.querySelector(".showcase-image");
          const vector = card.querySelector(".showcase-vector");
          const number = card.querySelector(".showcase-number");

          const onMouseEnter = () => {
            if (inner) {
              gsap.to(inner, {
                y: -8,
                duration: 0.4,
                ease: "power2.out",
              });
            }
            gsap.to(card, {
              borderColor: "rgba(255, 255, 255, 0.25)",
              boxShadow: "rgba(0, 0, 0, 0.4) 0px 20px 40px -15px",
              duration: 0.4,
              ease: "power2.out",
            });
            if (image) {
              gsap.to(image, { scale: 1.03, duration: 0.6, ease: "power2.out" });
            }
            if (vector) {
              gsap.to(vector, { scale: 1.05, duration: 0.6, ease: "power2.out" });
            }
            if (number) {
              gsap.to(number, { x: 5, duration: 0.3, ease: "power2.out" });
            }
          };

          const onMouseLeave = () => {
            if (inner) {
              gsap.to(inner, {
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              });
            }
            gsap.to(card, {
              borderColor: "rgba(255, 255, 255, 0.1)",
              boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 45px -20px",
              duration: 0.4,
              ease: "power2.out",
            });
            if (image) {
              gsap.to(image, { scale: 1.0, duration: 0.6, ease: "power2.out" });
            }
            if (vector) {
              gsap.to(vector, { scale: 1.0, duration: 0.6, ease: "power2.out" });
            }
            if (number) {
              gsap.to(number, { x: 0, duration: 0.3, ease: "power2.out" });
            }
          };

          card.addEventListener("mouseenter", onMouseEnter);
          card.addEventListener("mouseleave", onMouseLeave);

          hoverCleanups.push(() => {
            card.removeEventListener("mouseenter", onMouseEnter);
            card.removeEventListener("mouseleave", onMouseLeave);
          });
        });

        return () => {
          window.removeEventListener("resize", handleWindowResize);
          st.kill();
          hoverCleanups.forEach((cb) => cb());
        };
      } else {
        // Fallback for reduced motion
        const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
        cards.forEach((el) => {
          el.style.opacity = "1";
          const cap = el.querySelector(".showcase-card-caption") as HTMLElement | null;
          if (cap) {
            cap.style.opacity = "1";
            cap.style.transform = "none";
          }
        });
      }
    },
    { dependencies: [active], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-[#FAF8F5] select-none z-20">
      {/* Sticky 3D Canvas Wrapper (Absolute to not push content down) */}
      <div className="absolute inset-0 pointer-events-none z-[35]">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
          <About3D
            active={active}
            activeSection={activeSection}
            projectsProgress={projectsProgress}
            tapData={tapData}
            mouse={mouse}
          />
          <div
            onClick={handleTapHead}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] rounded-full cursor-pointer pointer-events-auto z-30"
            title="Tap Head"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col items-center pt-[20vh] pb-20 px-6 md:px-12 pointer-events-none">
        
        {/* Headline */}
        <div className="headline-trigger w-full max-w-[1000px] text-center mt-0 mb-24 md:mb-32">
          <h2 className="text-[28px] sm:text-[40px] md:text-[54px] font-medium tracking-tight leading-[1.15] text-[#111111]">
           I turn bold ideas into ambitious, beautifully engineered things™ that actually work.
          </h2>
        </div>

        {/* Chapter 1 */}
        <div className="chapter-1 w-full max-w-[960px] flex flex-col items-center">
          <div className="relative w-full py-16 flex justify-center items-center">
            <span className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-extralight font-serif text-[#1a1a1a] leading-none">I</span>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Ch. One</span>
              <span className="text-5xl md:text-6xl font-extralight font-serif leading-none opacity-0 select-none" aria-hidden="true">I</span>
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Craft</span>
            </div>
          </div>

          <div className="w-full max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-4 md:gap-y-0 items-start pb-32 md:pb-48">
            <PretextParagraph
              text="I don't think great work comes from picking a side—design or engineering. It comes from getting them to talk to each other. A beautiful interface is useless if the system underneath it falls apart. A powerful model is useless if no one can figure out how to use it."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align={device === "desktop" ? "right" : "left"}
              className="w-full text-base md:text-[17px] font-light leading-relaxed"
              colorClass="text-[#3a3a3a]"
            />
            <PretextParagraph
              text="Clean code is useless if it's solving the wrong problem. So I stay involved across the whole thing—from the first sketch and the smallest interaction, to the architecture, the model, the performance, the final pixel. Every layer should earn its place."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align="left"
              className="w-full text-base md:text-[17px] font-light leading-relaxed md:pt-[136px]"
              colorClass="text-[#3a3a3a]"
            />
          </div>
        </div>

        {/* Chapter 2 */}
        <div className="chapter-2 w-full max-w-[960px] flex flex-col items-center">
          <div className="relative w-full py-16 flex justify-center items-center">
            <span className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-extralight font-serif text-[#1a1a1a] leading-none">II</span>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Ch. Two</span>
              <span className="text-5xl md:text-6xl font-extralight font-serif leading-none opacity-0 select-none" aria-hidden="true">II</span>
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Intelligence</span>
            </div>
          </div>

          <div className="w-full max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-4 md:gap-y-0 items-start pb-32 md:pb-48">
            <PretextParagraph
              text="AI shouldn't feel like a feature someone bolted on at the last minute. The best kind of intelligence is the kind you barely notice. It understands context, removes friction, adapts to people, and makes complicated things feel obvious."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align={device === "desktop" ? "right" : "left"}
              className="w-full text-base md:text-[17px] font-light leading-relaxed"
              colorClass="text-[#3a3a3a]"
            />
            <PretextParagraph
              text="Whether I'm designing an interface, training a model, or building the systems around it, the goal is always the same: make technology feel less like technology."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align="left"
              className="w-full text-base md:text-[17px] font-light leading-relaxed md:pt-[136px]"
              colorClass="text-[#3a3a3a]"
            />
          </div>
        </div>

        {/* Chapter 3 */}
        <div className="chapter-3 w-full max-w-[960px] flex flex-col items-center">
          <div className="relative w-full py-16 flex justify-center items-center">
            <span className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-extralight font-serif text-[#1a1a1a] leading-none">III</span>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Ch. Three</span>
              <span className="text-5xl md:text-6xl font-extralight font-serif leading-none opacity-0 select-none" aria-hidden="true">III</span>
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Experience</span>
            </div>
          </div>

          <div className="w-full max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-4 md:gap-y-0 items-start pb-32 md:pb-48">
            <PretextParagraph
              text="I see software as an experience, not a checklist of features. The spacing on a button. The timing of an animation. How information is structured. How long an inference takes."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align={device === "desktop" ? "right" : "left"}
              className="w-full text-base md:text-[17px] font-light leading-relaxed"
              colorClass="text-[#3a3a3a]"
            />
            <PretextParagraph
              text="Each of those things shapes how someone feels when they use what you've built. That's where design and engineering stop being separate disciplines and become the same one. Precision builds trust. Simplicity builds confidence."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align="left"
              className="w-full text-base md:text-[17px] font-light leading-relaxed md:pt-[83px]"
              colorClass="text-[#3a3a3a]"
            />
          </div>
        </div>

        {/* Chapter 4 */}
        <div className="chapter-4 w-full max-w-[960px] flex flex-col items-center">
          <div className="relative w-full py-16 flex justify-center items-center">
            <span className="absolute left-1/2 -translate-x-1/2 text-5xl md:text-6xl font-extralight font-serif text-[#1a1a1a] leading-none">IV</span>
            <div className="flex items-center gap-8 md:gap-12">
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Ch. Four</span>
              <span className="text-5xl md:text-6xl font-extralight font-serif leading-none opacity-0 select-none" aria-hidden="true">IV</span>
              <span className="text-base md:text-lg text-[#1a1a1a] font-bold tracking-[-0.02em]">Obsession</span>
            </div>
          </div>

          <div className="w-full max-w-[720px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-4 md:gap-y-0 items-start pb-32 md:pb-48">
            <PretextParagraph
              text="I'm drawn to the details most people will never consciously notice. The interaction that just feels right. The component that didn't need to exist, so you took it out. The model that got a little faster. The edge case that didn't break."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align={device === "desktop" ? "right" : "left"}
              className="w-full text-base md:text-[17px] font-light leading-relaxed"
              colorClass="text-[#3a3a3a]"
            />
            <PretextParagraph
              text="The animation that lasted exactly as long as it needed to. Great products don't usually become great because of one big, dramatic decision. They get there through hundreds of small decisions, made deliberately."
              font={bodyFont}
              lineHeight={bodyLineHeight}
              align="left"
              className="w-full text-base md:text-[17px] font-light leading-relaxed md:pt-[110px]"
              colorClass="text-[#3a3a3a]"
            />
          </div>
        </div>

        {/* Endline */}
        <div className="endline-trigger w-full max-w-[840px] text-center pt-24 pb-36 border-t border-[#e2e2e0]">
          <p className="text-[22px] sm:text-[28px] md:text-[34px] text-[#111111] leading-relaxed font-medium tracking-tight">
            That&apos;s how I like to build. Curious enough to explore. Technical enough to ship. And obsessive enough to keep going until the whole thing feels like it couldn&apos;t have been built any other way.
          </p>
        </div>
      </div>

      {/* Section 03 / Creative Showcase - Black background */}
      <div id="showcase" className="showcase-track w-full relative min-h-[800vh] bg-[#0A0A0A] text-white flex flex-col justify-start select-none z-30">
        <style dangerouslySetInnerHTML={{ __html: `
          :root {
            --card-w: 560px;
            --card-h: 315px;
          }
          @media (max-width: 1024px) {
            :root {
              --card-w: 420px;
              --card-h: 236px;
            }
          }
          @media (max-width: 768px) {
            :root {
              --card-w: 280px;
              --card-h: 158px;
            }
          }
          @media (prefers-reduced-motion: reduce) {
            #showcase { min-height: auto !important; }
            #showcase .sticky { position: relative !important; height: auto !important; overflow: visible !important; }
            .showcase-card { position: relative !important; margin: 40px auto !important; opacity: 1 !important; transform: none !important; pointer-events: auto !important; }
            .showcase-card-caption { position: relative !important; top: 12px !important; opacity: 1 !important; transform: none !important; }
          }
        ` }} />

        {/* Subtle noise paper overlay texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        {/* Sticky viewport container (pinned during the 800vh scroll) */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-between px-6 md:px-12 lg:px-24 py-16 z-10">
          
          {/* Top Eyebrow Title (faded in via ScrollTrigger) */}
          <div className="showcase-eyebrow absolute top-12 left-6 md:left-12 lg:left-24 font-mono text-[10px] uppercase tracking-widest text-white/40 opacity-0 transform translate-y-2 z-25 font-bold">
            Selected Artworks
          </div>

          {/* Left Column: Big Category Label & Refined Mini Index */}
          <div className="hidden lg:flex flex-col justify-center h-full max-w-[280px] z-25 text-left space-y-4 pt-4">
            <div className="text-[10px] uppercase tracking-widest text-[#de3421] font-mono font-bold">
              Showcase Category
            </div>
            <h3 className="font-display font-medium text-4xl xl:text-5xl text-white leading-[1.1] uppercase tracking-tight transition-all duration-300">
              {PROJECTS[activeCard]?.category}
            </h3>
            
            <div className="w-12 h-px bg-white/20 my-2"></div>

            <div className="space-y-2.5 max-h-[35vh] overflow-y-auto pr-2 scrollbar-none">
              {PROJECTS.map((item, idx) => {
                const isActive = activeCard === idx;
                return (
                  <div
                    key={item.id}
                    className={`transition-all duration-500 flex items-start gap-3 cursor-pointer ${
                      isActive ? "opacity-100 translate-x-1" : "opacity-30 hover:opacity-60"
                    }`}
                    onClick={() => {
                      const track = document.querySelector(".showcase-track");
                      if (track) {
                        const start = (track as HTMLElement).offsetTop;
                        const height = (track as HTMLElement).offsetHeight - window.innerHeight;
                        const targetScroll = start + (idx / (PROJECTS.length - 1)) * height;
                        window.scrollTo({ top: targetScroll, behavior: "smooth" });
                      }
                    }}
                  >
                    <span className={`text-[9px] font-mono ${isActive ? "text-[#de3421]" : "text-white/40"}`}>
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white">
                      {item.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile Header: Sticky Active Design Name */}
          <div className="absolute top-6 left-6 lg:hidden z-25 font-mono text-left pt-4">
            <span className="text-[9px] uppercase tracking-widest text-[#de3421] block mb-1">
              Selected Artwork
            </span>
            <span className="text-sm font-bold uppercase tracking-wider text-white font-display">
              {PROJECTS[activeCard]?.title}
            </span>
          </div>

          {/* Center/Right Area: Spiral Staircase Cascade Cards */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {PROJECTS.map((item, idx) => (
              <div
                key={item.id}
                className={`showcase-card showcase-card-${idx + 1} absolute top-0 left-0 rounded-xl border border-white/10 bg-[#121212] p-2 flex flex-col justify-center shadow-md opacity-0 pointer-events-none transition-all duration-500 hover:border-white/20 z-10 will-change-transform`}
                style={{
                  width: "var(--card-w)",
                  height: "var(--card-h)",
                  transformOrigin: "top left",
                  boxShadow: "rgba(0, 0, 0, 0.3) 0px 15px 45px -20px",
                }}
              >
                <div className="showcase-card-inner w-full h-full flex flex-col justify-center">
                  {/* Image/Graphic Area */}
                  <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a] flex items-center justify-center">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.title}
                        className="showcase-image w-full h-full object-cover transform transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full p-3 flex items-center justify-center overflow-hidden">
                        {item.id === "symphony-synth" && (
                          <div className="showcase-vector w-full h-full flex flex-col justify-between text-neutral-400 transform transition-transform duration-700">
                            <div className="flex justify-between items-center text-[7px] font-mono opacity-50">
                              <span>OSC-A: TRIANGLE</span>
                              <span>FILTER: LOWPASS</span>
                            </div>
                            <div className="flex gap-3 justify-center items-center my-auto">
                              {[1, 2, 3].map((k) => (
                                <div key={k} className="relative w-8 h-8 rounded-full border border-white/20 bg-neutral-900 flex items-center justify-center">
                                  <div className="absolute top-0.5 w-0.5 h-2 bg-white/40 rounded-full origin-bottom rotate-[45deg]"></div>
                                  <svg className="absolute w-full h-full stroke-white/5 fill-none" viewBox="0 0 32 32">
                                    <circle cx="16" cy="16" r="11" />
                                  </svg>
                                </div>
                              ))}
                            </div>
                            <div className="space-y-1">
                              <svg viewBox="0 0 100 20" className="w-full h-4 stroke-white/20 fill-none">
                                <path d="M 0,10 C 10,2, 20,18, 30,10 C 40,2, 50,18, 60,10 C 70,2, 80,18, 90,10 L 100,10" strokeWidth="0.75" />
                              </svg>
                            </div>
                          </div>
                        )}

                        {item.id === "aether-dna" && (
                          <div className="showcase-vector w-full h-full flex flex-col justify-between text-neutral-400 transform transition-transform duration-700">
                            <div className="border border-white/10 rounded p-2 flex-1 flex flex-col justify-between font-mono text-[7px] leading-tight">
                              <div className="flex justify-between border-b border-white/5 pb-1">
                                <span className="opacity-50">TYPO SYSTEM</span>
                                <span className="text-[#de3421]">R-1.618</span>
                              </div>
                              <div className="py-1 text-left space-y-0.5">
                                <div className="text-[12px] font-display font-medium text-white tracking-tight leading-none">
                                  Averia Serif
                                </div>
                                <div className="text-[7px] font-mono text-neutral-500">
                                  Geist Mono Regular
                                </div>
                              </div>
                              <div className="flex justify-between border-t border-white/5 pt-1 opacity-50">
                                <span>COL-12</span>
                                <span>G-24PX</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.id !== "symphony-synth" && item.id !== "aether-dna" && (
                          <div className="w-full h-full p-4 flex flex-col justify-between text-neutral-400 z-10 select-none bg-neutral-900/50">
                            <div className="flex justify-between items-center text-[7px] font-mono opacity-40">
                              <span>GRID: 12-COL</span>
                              <span>RENDER: COMPOSITE</span>
                            </div>
                            <div className="flex justify-center items-center my-auto">
                              <div className="relative w-10 h-10 rounded-full border border-dashed border-white/20 flex items-center justify-center animate-spin [animation-duration:20s]">
                                <div className="w-5 h-5 border border-white/15 rotate-45"></div>
                              </div>
                            </div>
                            <div className="flex justify-between items-center text-[7px] font-mono opacity-40 border-t border-white/5 pt-1">
                              <span>PLATFORM: ART</span>
                              <span>PROJECT: {item.id.toUpperCase()}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Caption positioned below the card box */}
                <div className="showcase-card-caption absolute left-0 top-[calc(100%+18px)] w-max max-w-[480px] text-left flex flex-col justify-start font-mono pointer-events-none opacity-0">
                  <div className="flex justify-between items-baseline mb-1 border-b border-white/5 pb-1">
                    <span className="text-[9px] uppercase tracking-widest text-[#de3421] font-semibold">
                      {item.creator}
                    </span>
                    <span className="showcase-number text-[8px] text-white/40 tracking-wider ml-4 inline-block">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h4 className="font-display font-medium text-xs sm:text-sm text-white uppercase tracking-wider mt-1">
                    {item.project}
                  </h4>
                  <p className="text-[10px] text-neutral-400 font-light mt-0.5 uppercase tracking-wide">
                    {item.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      <Projects
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        setProjectsProgress={setProjectsProgress}
      />
    </section>
  );
}