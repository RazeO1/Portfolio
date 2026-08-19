"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ProjectsProps {
  activeSection?: number;
  setActiveSection?: (section: number) => void;
  setProjectsProgress?: (progress: number) => void;
}

export default function Projects({ activeSection, setActiveSection, setProjectsProgress }: ProjectsProps = {}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (typeof window !== "undefined") {
        (window as any).ScrollTrigger = ScrollTrigger;
      }

      // 1. ScrollTrigger to toggle activeSection state to 6 (Projects Section)
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        end: "bottom 45%",
        onToggle: (self) => {
          if (self.isActive && setActiveSection) {
            setActiveSection(6);
          }
        },
      });

      // 2. ScrollTrigger to track precise scroll progress through the runway
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (setProjectsProgress) {
            setProjectsProgress(self.progress);
          }
        },
      });
    },
    { scope: sectionRef, dependencies: [setActiveSection, setProjectsProgress] }
  );

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative w-full h-[400vh] bg-transparent overflow-visible z-20"
    >
      {/* Sticky empty runway to hold the background during the 400vh travel */}
      <div
        className="sticky top-0 left-0 w-full h-screen bg-[#0A0A0A] overflow-hidden pointer-events-none"
        style={{
          transform: "translateZ(0)",
          willChange: "transform",
        }}
      >
        {/* Subtle noise paper overlay texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.012] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        {/* Screen Reader (SEO/Accessibility) representation of the projects */}
        <div className="sr-only">
          <h2>Selected Projects</h2>
          <article>
            <h3>01 / Aether-Net</h3>
            <p>AI & Neural Graphics Pipeline</p>
            <p>An experimental neural field generator that bakes high-dimensional representations of scenes into low-latency WebGL shaders. Drastically speeds up real-time Gaussian Splatting and NeRF visualization in-browser.</p>
          </article>
          <article>
            <h3>02 / Khepri Engine</h3>
            <p>Interactive Vector Physics Editor</p>
            <p>A browser-based vector modeling canvas driven by a custom WASM physical solver engine. Supports structural constraints, rigid-body joints, and real-time tension stress heat-mapping.</p>
          </article>
          <article>
            <h3>03 / Nox Spatial</h3>
            <p>Generative Audio Ambient Player</p>
            <p>A procedural spatial audio synthesizer that maps cursor coordinates, local weather, and page interaction velocity into a continuous ambient soundscape. Visualizes frequency nodes in real time.</p>
          </article>
        </div>
      </div>
    </section>
  );
}
