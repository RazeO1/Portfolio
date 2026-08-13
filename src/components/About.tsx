"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About3D from "./About3D";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";

gsap.registerPlugin(useGSAP, ScrollTrigger);interface PretextParagraphProps {
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
  const [tapTrigger, setTapTrigger] = useState(0);
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

  const handleTapHead = () => setTapTrigger((prev) => prev + 1);

  useGSAP(
    () => {
      if (!active) return;
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => setIsAboutInView(self.isActive),
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
    },
    { dependencies: [active], scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-[#FAF8F5] select-none z-20">
      {/* Sticky 3D Canvas Wrapper (Absolute to not push content down) */}
      <div className="absolute inset-0 pointer-events-none z-20">
        <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center">
          {hasBeenVisible && (
            <About3D active={active} activeSection={activeSection} tapTrigger={tapTrigger} mouse={mouse} />
          )}
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
    </section>
  );
}