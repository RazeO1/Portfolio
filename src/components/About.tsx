"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(useGSAP, ScrollTrigger);

interface CrowdCanvasProps {
  src: string;
  rows?: number;
  cols?: number;
}

// Crowd Simulator Canvas Component (inspired by Szenia Zadvornykh, illustrations by openpeeps.com)
function CrowdCanvas({ src, rows = 15, cols = 7 }: CrowdCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let isMounted = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const config = {
      src,
      rows,
      cols,
    };

    // Base scale factor for walking peeps
    const peepScale = 0.55;

    // Cache for the tinted red image to maintain performance
    let tintedImg: HTMLCanvasElement | null = null;
    const getTintedImage = (image: HTMLImageElement) => {
      if (tintedImg) return tintedImg;
      const offscreen = document.createElement("canvas");
      offscreen.width = image.width;
      offscreen.height = image.height;
      const oCtx = offscreen.getContext("2d");
      if (oCtx) {
        oCtx.drawImage(image, 0, 0);
        const imgData = oCtx.getImageData(0, 0, offscreen.width, offscreen.height);
        const data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];
          
          // Replace dark outline pixels with red (#de3421), leave white body fills untouched
          if (a > 50 && r < 120 && g < 120 && b < 120) {
            data[i] = 222;     // R (de)
            data[i + 1] = 52;  // G (34)
            data[i + 2] = 33;  // B (21)
          }
        }
        oCtx.putImageData(imgData, 0, 0);
      }
      tintedImg = offscreen;
      return offscreen;
    };

    // UTILS
    const randomRange = (min: number, max: number) =>
      min + Math.random() * (max - min);
    const randomIndex = (array: any[]) => randomRange(0, array.length) | 0;
    const removeFromArray = (array: any[], i: number) => array.splice(i, 1)[0];
    const removeItemFromArray = (array: any[], item: any) =>
      removeFromArray(array, array.indexOf(item));
    const removeRandomFromArray = (array: any[]) =>
      removeFromArray(array, randomIndex(array));
    const getRandomFromArray = (array: any[]) => array[randomIndex(array) | 0];

    // TWEEN FACTORIES
    const resetPeep = ({ stage, peep }: { stage: any; peep: any }) => {
      const direction = Math.random() > 0.5 ? 1 : -1;
      const offsetY = randomRange(-15, 15);
      // Pushing Y offset by +30px to hide bottom flat edge of character busts below the screen
      const startY = stage.height - peep.height + 30 + offsetY;
      let startX: number;
      let endX: number;

      if (direction === 1) {
        startX = -peep.width;
        endX = stage.width;
        peep.scaleX = 1;
      } else {
        startX = stage.width + peep.width;
        endX = 0;
        peep.scaleX = -1;
      }

      peep.x = startX;
      peep.y = startY;
      peep.anchorY = startY;

      return {
        startX,
        startY,
        endX,
      };
    };

    const normalWalk = ({ peep, props }: { peep: any; props: any }) => {
      const { startX, startY, endX } = props;
      const xDuration = 10;
      const yDuration = 0.25;

      const tl = gsap.timeline();
      tl.timeScale(randomRange(0.5, 1.5));
      tl.to(
        peep,
        {
          duration: xDuration,
          x: endX,
          ease: "none",
        },
        0
      );
      tl.to(
        peep,
        {
          duration: yDuration,
          repeat: xDuration / yDuration,
          yoyo: true,
          y: startY - 10,
        },
        0
      );

      return tl;
    };

    const walks = [normalWalk];

    // TYPES
    type Peep = {
      image: HTMLImageElement;
      rect: number[];
      width: number;
      height: number;
      drawArgs: any[];
      x: number;
      y: number;
      anchorY: number;
      scaleX: number;
      walk: any;
      isRed?: boolean;
      setRect: (rect: number[]) => void;
      render: (ctx: CanvasRenderingContext2D) => void;
    };

    // FACTORY FUNCTIONS
    const createPeep = ({
      image,
      rect,
    }: {
      image: HTMLImageElement;
      rect: number[];
    }): Peep => {
      const peep: Peep = {
        image,
        rect: [],
        width: 0,
        height: 0,
        drawArgs: [],
        x: 0,
        y: 0,
        anchorY: 0,
        scaleX: 1,
        walk: null,
        setRect: (rect: number[]) => {
          peep.rect = rect;
          peep.width = rect[2] * peepScale;
          peep.height = rect[3] * peepScale;
          peep.drawArgs = [peep.image, ...rect, 0, 0, peep.width, peep.height];
        },
        render: (ctx: CanvasRenderingContext2D) => {
          ctx.save();
          ctx.translate(peep.x, peep.y);
          ctx.scale(peep.scaleX, 1);
          
          // Draw tinted image (red boundary outline) if designated as red
          const activeImage = peep.isRed ? getTintedImage(peep.image) : peep.image;
          
          ctx.drawImage(
            activeImage,
            peep.rect[0],
            peep.rect[1],
            peep.rect[2],
            peep.rect[3],
            0,
            0,
            peep.width,
            peep.height
          );
          ctx.restore();
        },
      };

      peep.setRect(rect);
      return peep;
    };

    // MAIN
    const img = document.createElement("img");
    const stage = {
      width: 0,
      height: 0,
    };

    const allPeeps: Peep[] = [];
    const availablePeeps: Peep[] = [];
    const crowd: Peep[] = [];
    let redPeep: Peep | null = null;

    const createPeeps = () => {
      const { rows, cols } = config;
      const { naturalWidth: width, naturalHeight: height } = img;
      const total = rows * cols;
      const rectWidth = width / rows;
      const rectHeight = height / cols;

      for (let i = 0; i < total; i++) {
        allPeeps.push(
          createPeep({
            image: img,
            rect: [
              (i % rows) * rectWidth,
              ((i / rows) | 0) * rectHeight,
              rectWidth,
              rectHeight,
            ],
          })
        );
      }

      // Pick index 13 (a modern guy with glasses and collared shirt) as the red character
      const redIndex = 13;
      redPeep = allPeeps[redIndex];
      redPeep.isRed = true;
      
      // Remove redPeep from random standard crowd spawn cycles to handle it custom-persistently
      allPeeps.splice(redIndex, 1);
    };

    // Make sure the red peep walks persistently along with the crowd
    const addRedPeepToCrowd = () => {
      if (!redPeep) return;
      const walk = normalWalk({
        peep: redPeep,
        props: resetPeep({
          peep: redPeep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        addRedPeepToCrowd();
      });

      redPeep.walk = walk;
      if (!crowd.includes(redPeep)) {
        crowd.push(redPeep);
      }
    };

    const initCrowd = () => {
      // 1. Kick off the persistent red walking guy
      addRedPeepToCrowd();

      // 2. Spawn standard walking background crowd with high density
      const maxPeeps = Math.min(30, Math.max(12, (stage.width / 70) | 0));
      for (let i = 0; i < maxPeeps && availablePeeps.length; i++) {
        addPeepToCrowd().walk.progress(Math.random());
      }
    };

    const addPeepToCrowd = () => {
      const peep = removeRandomFromArray(availablePeeps);
      const walk = getRandomFromArray(walks)({
        peep,
        props: resetPeep({
          peep,
          stage,
        }),
      }).eventCallback("onComplete", () => {
        removePeepFromCrowd(peep);
        addPeepToCrowd();
      });

      peep.walk = walk;
      crowd.push(peep);
      return peep;
    };

    const removePeepFromCrowd = (peep: Peep) => {
      removeItemFromArray(crowd, peep);
      availablePeeps.push(peep);
    };

    const render = () => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.scale(devicePixelRatio, devicePixelRatio);

      // Sort crowd on every render frame by Y-coordinate for real-time 3D depth-layering
      crowd.sort((a, b) => a.y - b.y);

      crowd.forEach((peep) => {
        peep.render(ctx);
      });

      ctx.restore();
    };

    const resize = () => {
      if (!canvas) return;
      stage.width = canvas.clientWidth;
      stage.height = canvas.clientHeight;
      canvas.width = stage.width * devicePixelRatio;
      canvas.height = stage.height * devicePixelRatio;

      crowd.forEach((peep) => {
        peep.walk.kill();
      });

      crowd.length = 0;
      availablePeeps.length = 0;
      availablePeeps.push(...allPeeps);

      // Reset red peep size variables on resize
      if (redPeep) {
        redPeep.width = redPeep.rect[2] * peepScale;
        redPeep.height = redPeep.rect[3] * peepScale;
        redPeep.drawArgs = [redPeep.image, ...redPeep.rect, 0, 0, redPeep.width, redPeep.height];
      }

      initCrowd();
    };

    const init = () => {
      if (!isMounted) return;
      createPeeps();
      resize();
      gsap.ticker.add(render);
    };

    img.onload = init;
    img.src = config.src;

    const handleResize = () => resize();
    window.addEventListener("resize", handleResize);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", handleResize);
      gsap.ticker.remove(render);
      crowd.forEach((peep) => {
        if (peep.walk) peep.walk.kill();
      });
    };
  }, [src, rows, cols]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 h-[35vh] w-full pointer-events-none z-5"
    />
  );
}

interface AboutProps {
  active: boolean;
}

export default function About({ active }: AboutProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [showScroll, setShowScroll] = useState(false);

  // Copy adapted for Yash Raj matching design portfolio tone
  const text = "HI, I'M YASH - A DESIGN, AI & SOFTWARE ENGINEER WITH A NAME THAT RUNS LIKE A LINE OF CODE. I build systems that think and products that people remember. From training neural networks to designing intuitive user interfaces, I'm obsessed with performance, clean code, and the small details that make complex experiences feel effortless.";
  const words = text.split(" ");

  // Scroll idle timer of 7 seconds
  useEffect(() => {
    if (!active) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const resetTimer = () => {
      setShowScroll(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowScroll(true);
      }, 7000);
    };

    resetTimer();

    window.addEventListener("scroll", resetTimer);
    return () => {
      window.removeEventListener("scroll", resetTimer);
      clearTimeout(timeoutId);
    };
  }, [active]);

  // GSAP Scroll Scrub Reveal Animation
  useGSAP(
    () => {
      if (!active) return;

      const wordElements = gsap.utils.toArray(".reveal-word");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",      // Start reveal when section pins at the top of viewport
          end: "bottom bottom",  // Complete reveal when section ends scrolling
          scrub: 0.5,            // Smooth transition scrubbed to scroll distance
        },
      });

      // 1. Fade in the whole text block wrapper only when pinned (prevents overlapping hero while sliding up)
      tl.fromTo(
        ".text-container",
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "power1.out" }
      );

      // 2. Scrub the word opacities from low-contrast to full black
      tl.fromTo(
        wordElements,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.8,
          ease: "none",
          duration: 1,
        }
      );

      // 3. Keep text fully highlighted for a bit before unpinning
      tl.to({}, { duration: 0.15 });
    },
    { dependencies: [active], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-[300vh] bg-transparent overflow-visible select-none z-20"
    >
      {/* Sticky Background & Content Container - Match background color #fcf7f3 from Design.md */}
      <div
        ref={containerRef}
        className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center px-6 md:px-12 lg:px-24 bg-[#fcf7f3]"
        style={{
          transform: "translateZ(0)",
          WebkitTransform: "translateZ(0)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
        }}
      >
        {/* Subtle noise paper overlay texture to blend with portfolio aesthetics */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-0"></div>

        {/* Crowd Canvas Walking Animation confined to bottom lanes, drawing behind text */}
        <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />

        {/* Layout wrapper matching 1140px grid constraints, shifted slightly upwards to create margin */}
        <div className="text-container opacity-0 relative z-10 w-full max-w-[1140px] mx-auto flex flex-col justify-center items-start text-left -translate-y-10">
          {/* Section Indicator - Custom elegant cursive font */}
          <div
            ref={labelRef}
            className="font-cursive text-[#de3421] mb-2"
            style={{
              fontFamily: "var(--font-cursive, 'Sacramento', cursive)",
              fontSize: "min(3.5vw, 1.15rem)", // Increased by ~50% to visually offset the thin weight of script font
            }}
          >
            About Me
          </div>

          {/* Typographic Centerpiece - Display font Averia Serif Libre and safe sizing to prevent screen overflow */}
          <h2 className="font-display font-medium text-neutral-900 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-[1.4] uppercase tracking-normal">
            {words.map((word, idx) => (
              <span
                key={idx}
                className="reveal-word inline-block mr-[0.25em] will-change-[opacity]"
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Scroll Indicator Icon - Only visible when scrolling is stopped for 7s */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 select-none pointer-events-none transition-all duration-700 ease-out z-30 ${
            showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span
            className="text-[#de3421] leading-none select-none font-cursive lowercase mb-1"
            style={{
              fontFamily: "var(--font-cursive, 'Sacramento', cursive)",
              fontSize: "1.125rem",
            }}
          >
            scroll
          </span>
          <div className="w-[18px] h-[28px] rounded-full border border-neutral-400/80 flex justify-center p-1">
            <div className="w-[2px] h-[6px] bg-neutral-500 rounded-full animate-wheel-scroll"></div>
          </div>
        </div>

        {/* Local component keyframe stylesheet for smooth mouse scroll-wheel animation */}
        <style>{`
          @keyframes wheel-scroll {
            0% { transform: translateY(0); opacity: 0; }
            35% { opacity: 1; }
            70% { transform: translateY(6px); opacity: 0; }
            100% { transform: translateY(0); opacity: 0; }
          }
          .animate-wheel-scroll {
            animation: wheel-scroll 1.8s infinite ease-in-out;
          }
        `}</style>
      </div>
    </section>
  );
}
