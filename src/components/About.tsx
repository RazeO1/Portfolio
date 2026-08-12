"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import About3D from "./About3D";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface AboutProps {
  active: boolean;
}

export default function About({ active }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);
  const [tapTrigger, setTapTrigger] = useState(0);
  const [isAboutInView, setIsAboutInView] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

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
      {/* Sticky 3D Canvas */}
      <div className="sticky top-0 left-0 w-full h-screen pointer-events-none z-20 flex items-center justify-center">
        {isAboutInView && (
          <About3D active={active} activeSection={activeSection} tapTrigger={tapTrigger} mouse={mouse} />
        )}
        <div
          onClick={handleTapHead}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] lg:w-[240px] lg:h-[240px] rounded-full cursor-pointer pointer-events-auto z-30"
          title="Tap Head"
        />
      </div>

      {/* Scrollable Content */}
      <div className="relative z-10 w-full flex flex-col items-center py-20 px-6 md:px-12 pointer-events-none">
        
        {/* Headline */}
        <div className="headline-trigger w-full max-w-[1000px] text-center mt-12 mb-24 md:mb-32">
          <h2 className="text-[28px] sm:text-[40px] md:text-[54px] font-medium tracking-tight leading-[1.15] text-[#111111]">
            I design, build, and spend way too much time thinking about the moment an idea turns into something that actually works—and not just technically, but experientially.
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
            <div className="text-left md:text-right text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4">
              <p>
                I don&apos;t think great work comes from picking a side—design or engineering. It comes from getting them to talk to each other.
                A beautiful interface is useless if the system underneath it falls apart. A powerful model is useless if no one can figure out how to use it. 
              </p>
            </div>
            <div className="text-left text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4 md:pt-35">
              <p>
                Clean code is useless if it&apos;s solving the wrong problem.
                So I stay involved across the whole thing—from the first sketch and the smallest interaction, to the architecture, the model, the performance, the final pixel. Every layer should earn its place.
              </p>
            </div>
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
            <div className="text-left md:text-right text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4">
              <p>
                AI shouldn&apos;t feel like a feature someone bolted on at the last minute.
                The best kind of intelligence is the kind you barely notice.
                It understands context, removes friction, adapts to people, and makes complicated things feel obvious.
              </p>
            </div>
            <div className="text-left text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4 md:pt-35">
              <p>
                Whether I&apos;m designing an interface, training a model, or building the systems around it, the goal is always the same: make technology feel less like technology.
              </p>
            </div>
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
            <div className="text-left md:text-right text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4">
              <p>
                I see software as an experience, not a checklist of features.
                The spacing on a button. The timing of an animation. How information is structured. How long an inference takes.
              </p>
            </div>
            <div className="text-left text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4 md:pt-21">
              <p>
                Each of those things shapes how someone feels when they use what you&apos;ve built.
                That&apos;s where design and engineering stop being separate disciplines and become the same one. Precision builds trust. Simplicity builds confidence.
              </p>
            </div>
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
            <div className="text-left md:text-right text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4">
              <p>
                I&apos;m drawn to the details most people will never consciously notice.
                The interaction that just feels right. The component that didn&apos;t need to exist, so you took it out. The model that got a little faster. The edge case that didn&apos;t break.
              </p>
            </div>
            <div className="text-left text-base md:text-[17px] text-[#3a3a3a] leading-relaxed font-light space-y-4 md:pt-35">
              <p>
                The animation that lasted exactly as long as it needed to.
                Great products don&apos;t usually become great because of one big, dramatic decision.
                They get there through hundreds of small decisions, made deliberately.
              </p>
            </div>
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