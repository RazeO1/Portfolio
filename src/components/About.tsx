"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About3D from "./About3D";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface DesignItem {
  id: string;
  number: string;
  title: string;
  category: string;
  description: string;
  imgSrc?: string;
  color: string;
  accentColor: string;
}

const SHOWCASE_ITEMS: DesignItem[] = [
  {
    id: "neurograph-ai",
    number: "01",
    title: "NEUROGRAPH AI",
    category: "Neural Graphics Platform (UI/UX)",
    description: "An editorial-style web application designed for high-dimensional neural scene representation. Designed with strict minimalist grids, high-contrast typography, and fluid responsive panels.",
    imgSrc: "/images/dashboard_ui.jpg",
    color: "#FAF8F5", // Light cream
    accentColor: "#de3421",
  },
  {
    id: "symphony-synth",
    number: "02",
    title: "SYMPHONY SYNTH",
    category: "Tactile Audio Interface (UI/UX)",
    description: "An interactive, hardware-inspired sound design interface. Features custom responsive rotary control knobs, visual frequency waves, and modular routing grids designed for spatial audio producers.",
    color: "#FAF8F5",
    accentColor: "#d5802a",
  },
  {
    id: "aether-dna",
    number: "03",
    title: "AETHER IDENTITY",
    category: "Brand Architecture & DNA",
    description: "Visual identity guidelines, color palettes, and typographic layout ratios for a decentralized cloud computing interface. Emphasizes clean alignment and raw technical layout details.",
    color: "#FAF8F5",
    accentColor: "#9b8064",
  },
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
  const [tapData, setTapData] = useState({ x: 0, y: 0, trigger: 0 });
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [hasBeenVisible, setHasBeenVisible] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [device, setDevice] = useState<"mobile" | "desktop">("desktop");

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

      // Showcase horizontal/vertical 3D staircase timeline (scrubbed with scroll)
      // Custom responsive paths matching the screen recording depth composition
      const mm = gsap.matchMedia();

      // Desktop (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".showcase-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // Card 1: Starts prominent on the left/foreground, slides away left & down
        showcaseTl.fromTo(
          ".showcase-card-1",
          { x: "6vw", y: "42vh", scale: 0.98, opacity: 1, rotation: -3, zIndex: 30, pointerEvents: "auto" },
          { x: "-65vw", y: "55vh", scale: 0.75, opacity: 0, rotation: -8, zIndex: 10, pointerEvents: "none", ease: "power1.inOut" },
          0
        );

        // Card 2: Starts right background, moves to center-right foreground, crosses left behind head
        showcaseTl.fromTo(
          ".showcase-card-2",
          { x: "100vw", y: "22vh", scale: 0.75, opacity: 0.15, rotation: 6, zIndex: 10, pointerEvents: "none" },
          { x: "54vw", y: "28vh", scale: 1.06, opacity: 1, rotation: 1, zIndex: 30, pointerEvents: "auto", duration: 1.5, ease: "power1.inOut" },
          0
        );
        showcaseTl.to(
          ".showcase-card-2",
          { x: "4vw", y: "36vh", scale: 0.82, opacity: 0.6, rotation: -3, zIndex: 10, pointerEvents: "none", duration: 1.5, ease: "power1.inOut" },
          1.5
        );

        // Card 3: Starts far right background, sweeps in, becomes new front focal point
        showcaseTl.fromTo(
          ".showcase-card-3",
          { x: "140vw", y: "2vh", scale: 0.65, opacity: 0, rotation: -4, zIndex: 10, pointerEvents: "none" },
          { x: "58vw", y: "6vh", scale: 0.85, opacity: 0.5, rotation: 2, zIndex: 10, pointerEvents: "none", duration: 1.5, ease: "power1.inOut" },
          0
        );
        showcaseTl.to(
          ".showcase-card-3",
          { x: "5vw", y: "10vh", scale: 1.08, opacity: 1, rotation: -1, zIndex: 30, pointerEvents: "auto", duration: 1.5, ease: "power1.inOut" },
          1.5
        );
      });

      // Tablet (768px to 1023px)
      mm.add("(min-width: 768px) and (max-width: 1023px)", () => {
        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".showcase-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // Tablet timeline (reduced X and Y offsets to prevent clipping)
        showcaseTl.fromTo(
          ".showcase-card-1",
          { x: "2vw", y: "44vh", scale: 0.95, opacity: 1, rotation: -2, zIndex: 30, pointerEvents: "auto" },
          { x: "-70vw", y: "55vh", scale: 0.7, opacity: 0, rotation: -6, zIndex: 10, pointerEvents: "none", ease: "power1.inOut" },
          0
        );

        showcaseTl.fromTo(
          ".showcase-card-2",
          { x: "100vw", y: "24vh", scale: 0.72, opacity: 0.15, rotation: 4, zIndex: 10, pointerEvents: "none" },
          { x: "50vw", y: "30vh", scale: 1.02, opacity: 1, rotation: 1, zIndex: 30, pointerEvents: "auto", duration: 1.5, ease: "power1.inOut" },
          0
        );
        showcaseTl.to(
          ".showcase-card-2",
          { x: "2vw", y: "38vh", scale: 0.78, opacity: 0.5, rotation: -2, zIndex: 10, pointerEvents: "none", duration: 1.5, ease: "power1.inOut" },
          1.5
        );

        showcaseTl.fromTo(
          ".showcase-card-3",
          { x: "140vw", y: "4vh", scale: 0.6, opacity: 0, rotation: -3, zIndex: 10, pointerEvents: "none" },
          { x: "54vw", y: "8vh", scale: 0.8, opacity: 0.4, rotation: 1, zIndex: 10, pointerEvents: "none", duration: 1.5, ease: "power1.inOut" },
          0
        );
        showcaseTl.to(
          ".showcase-card-3",
          { x: "2vw", y: "12vh", scale: 1.04, opacity: 1, rotation: -1, zIndex: 30, pointerEvents: "auto", duration: 1.5, ease: "power1.inOut" },
          1.5
        );
      });

      // Mobile (< 768px)
      mm.add("(max-width: 767px)", () => {
        const showcaseTl = gsap.timeline({
          scrollTrigger: {
            trigger: ".showcase-track",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.5,
          },
        });

        // Mobile timeline (simplified cascading concept centered)
        showcaseTl.fromTo(
          ".showcase-card-1",
          { x: "5vw", y: "45vh", scale: 0.9, opacity: 1, rotation: -1, zIndex: 30, pointerEvents: "auto" },
          { x: "-80vw", y: "50vh", scale: 0.7, opacity: 0, rotation: -3, zIndex: 10, pointerEvents: "none", ease: "power1.inOut" },
          0
        );

        showcaseTl.fromTo(
          ".showcase-card-2",
          { x: "110vw", y: "25vh", scale: 0.7, opacity: 0.15, rotation: 2, zIndex: 10, pointerEvents: "none" },
          { x: "5vw", y: "25vh", scale: 1.0, opacity: 1, rotation: 0, zIndex: 30, pointerEvents: "auto", duration: 1.5, ease: "power1.inOut" },
          0
        );
        showcaseTl.to(
          ".showcase-card-2",
          { x: "-80vw", y: "25vh", scale: 0.7, opacity: 0, rotation: -2, zIndex: 10, pointerEvents: "none", duration: 1.5, ease: "power1.inOut" },
          1.5
        );

        showcaseTl.fromTo(
          ".showcase-card-3",
          { x: "110vw", y: "25vh", scale: 0.7, opacity: 0, rotation: 1, zIndex: 10, pointerEvents: "none" },
          { x: "110vw", y: "25vh", scale: 0.7, opacity: 0, rotation: 1, zIndex: 10, pointerEvents: "none", duration: 1.2 },
          0
        );
        showcaseTl.to(
          ".showcase-card-3",
          { x: "5vw", y: "25vh", scale: 1.0, opacity: 1, rotation: 0, zIndex: 30, pointerEvents: "auto", duration: 1.8, ease: "power1.inOut" },
          1.2
        );
      });

      // Hover feedback for the cards
      const cards = gsap.utils.toArray<HTMLElement>(".showcase-card");
      cards.forEach((card) => {
        const image = card.querySelector(".showcase-image");
        const vector = card.querySelector(".showcase-vector");
        const number = card.querySelector(".showcase-number");

        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -8,
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
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 20px -10px",
            duration: 0.4,
            ease: "power2.out",
          });
          if (image) {
            gsap.to(image, { scale: 1, duration: 0.6, ease: "power2.out" });
          }
          if (vector) {
            gsap.to(vector, { scale: 1, duration: 0.6, ease: "power2.out" });
          }
          if (number) {
            gsap.to(number, { x: 0, duration: 0.3, ease: "power2.out" });
          }
        });
      });
    },
    { dependencies: [active], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-[#FAF8F5] select-none z-20">
      {/* Sticky 3D Canvas Wrapper (Absolute to not push content down) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
          <About3D active={active} activeSection={activeSection} tapData={tapData} mouse={mouse} />
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

        {/* Section 03 / Creative Showcase - Black background */}
        <div className="showcase-track w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] min-h-[300vh] bg-[#0A0A0A] text-white flex flex-col justify-start select-none overflow-hidden border-t border-white/5 pointer-events-auto z-30">
          {/* Subtle noise paper overlay texture */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

          {/* Sticky container that keeps the viewport locked during horizontal scroll sweep */}
          <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-24 py-16 z-10">
            <div className="relative z-10 w-full max-w-[1240px] mx-auto">
              
              {/* Showcase Cards Staggered Staircase Layout */}
              <div className="relative w-full h-[75vh] z-20">
                {SHOWCASE_ITEMS.map((item, idx) => (
                  <div
                    key={item.id}
                    className={`showcase-card showcase-card-${idx + 1} absolute rounded-xl border border-white/10 bg-[#121212] p-2 flex flex-col justify-center shadow-md overflow-hidden opacity-0 pointer-events-none w-[250px] sm:w-[280px] md:w-[320px] lg:w-[340px] xl:w-[360px] left-0`}
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.2) 0px 10px 30px -15px",
                      // Staggered staircase vertical positioning: bottom to top
                      top: idx === 0 ? "50vh" : idx === 1 ? "25vh" : "0vh",
                    }}
                  >
                    {/* Image/Graphic Area */}
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 bg-[#1a1a1a] flex items-center justify-center">
                      {item.imgSrc ? (
                        <img
                          src={item.imgSrc}
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
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}