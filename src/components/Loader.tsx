"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1. Simulating loading percentage
  useEffect(() => {
    const duration = 2500; // 2.5 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;
    let currentStep = 0;

    progressIntervalRef.current = setInterval(() => {
      currentStep++;
      const nextProgress = Math.min(
        Math.round((currentStep / steps) * 100),
        100
      );
      setProgress(nextProgress);

      if (nextProgress === 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      }
    }, intervalTime);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // 2. GSAP Animations for Stickers
  useGSAP(
    () => {
      // Entrance: drop and bounce stickers one by one
      const tl = gsap.timeline({
        onComplete: () => {
          // Wait briefly at 100% before triggering exit scatter
          gsap.delayedCall(0.4, () => {
            triggerExit();
          });
        },
      });

      // Targets: .sticker-wrapper
      // We animate them dropping in with scale, rotation, and elastic bounce
      tl.fromTo(
        ".sticker-wrapper",
        {
          y: -150,
          scale: 0,
          rotation: () => gsap.utils.random(-90, 90),
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          rotation: (index) => {
            // Give them structured offsets to stack beautifully like the reference image
            const angles = [-15, -5, 10, -25, 5, 20, -10, 15];
            return angles[index % angles.length];
          },
          opacity: 1,
          duration: 0.8,
          ease: "elastic.out(1, 0.6)",
          stagger: 0.18, // staggered landing
        }
      );

      // Subtle float animations once landed
      gsap.to(".sticker-wrapper", {
        y: "yoyo",
        yoyo: true,
        repeat: -1,
        duration: "random(2.5, 4)",
        ease: "sine.inOut",
        stagger: {
          amount: 0.5,
          from: "random",
        },
      });

      // Exit Scatter Animation
      const triggerExit = () => {
        const exitTl = gsap.timeline({
          onComplete: () => {
            onComplete();
          },
        });

        // Scatter stickers outwards toward the screen (3D effect)
        exitTl.to(".sticker-wrapper", {
          z: 300, // 3D depth effect (requires perspective on parent)
          scale: 2.2,
          opacity: 0,
          rotation: () => gsap.utils.random(-60, 60),
          x: () => gsap.utils.random(-400, 400),
          y: () => gsap.utils.random(-300, 300),
          duration: 0.9,
          ease: "power2.in",
          stagger: 0.05,
        });

        // Fade out background and bottom ui
        exitTl.to(
          containerRef.current,
          {
            backgroundColor: "rgba(243, 240, 237, 0)", // transition to transparent
            backdropFilter: "blur(0px)",
            duration: 0.6,
            ease: "power2.inOut",
          },
          "-=0.6"
        );

        exitTl.to(
          ".loader-ui",
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.in",
          },
          "-=0.7"
        );
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-gradient-to-tr from-[#deddd9] via-[#f3f0ed] to-[#e4e2de] select-none"
      style={{ perspective: "1000px" }}
    >
      {/* 3D Sticker Stack Container */}
      <div className="relative w-full max-w-lg h-[400px] flex items-center justify-center">
        
        {/* Sticker 1: Teal "YASH RAJ" Slanted Badge (Bottom Layer) */}
        <div
          className="sticker-wrapper absolute w-[140px] h-[75px] z-10"
          style={{ transform: "translate(-120px, 30px)" }}
        >
          <div className="w-full h-full bg-[#e29e5a] border-2 border-black rounded-lg shadow-sm flex flex-col justify-center items-center -rotate-6 transform hover:scale-105 transition-transform duration-300">
            <span className="font-mono text-[9px] font-bold text-black opacity-80 uppercase tracking-widest">
              PORTFOLIO
            </span>
            <span className="font-display text-xl font-black text-black leading-none mt-1">
              YASH RAJ
            </span>
          </div>
        </div>

        {/* Sticker 2: Purple 5-Petal Flower "PIXEL" */}
        <div
          className="sticker-wrapper absolute w-[120px] h-[120px] z-15"
          style={{ transform: "translate(-80px, -60px)" }}
        >
          <div className="w-full h-full flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            {/* SVG Flower Outline */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              <path
                d="M 50,20 C 40,20 30,30 30,45 C 15,45 10,55 25,65 C 20,80 30,90 45,80 C 55,90 65,90 70,75 C 85,75 85,60 70,50 C 70,30 60,20 50,20 Z"
                fill="#bb2c1c"
                stroke="black"
                strokeWidth="2.5"
              />
              <circle cx="50" cy="53" r="18" fill="#f5e1cd" stroke="black" strokeWidth="2" />
              {/* Face inside flower */}
              <circle cx="44" cy="50" r="2.5" fill="black" />
              <circle cx="56" cy="50" r="2.5" fill="black" />
              <path d="M 44,58 Q 50,64 56,58" stroke="black" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
            <span className="absolute font-mono text-[8px] font-bold tracking-widest text-black bg-white px-1.5 py-0.5 rounded border border-black shadow-sm rotate-12 -top-1">
              PIXEL
            </span>
          </div>
        </div>

        {/* Sticker 3: Neon Green Smiley */}
        <div
          className="sticker-wrapper absolute w-[100px] h-[100px] z-20"
          style={{ transform: "translate(-10px, 40px)" }}
        >
          <div className="w-full h-full bg-[#22c55e] border-2.5 border-black rounded-full shadow-sm flex items-center justify-center hover:scale-105 transition-transform duration-300 relative">
            <svg viewBox="0 0 80 80" className="w-[70%] h-[70%]">
              {/* Cross eyes */}
              <path d="M 22,25 L 32,35 M 32,25 L 22,35" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M 48,25 L 58,35 M 58,25 L 48,35" stroke="black" strokeWidth="3" strokeLinecap="round" />
              {/* Sparkle details or teeth smile */}
              <path
                d="M 24,48 C 24,62 56,62 56,48 Z"
                fill="black"
              />
              <path d="M 32,48 L 48,48" stroke="#22c55e" strokeWidth="2.5" />
            </svg>
            <span className="absolute bottom-0 right-0 font-mono text-[8px] bg-black text-[#22c55e] px-1 py-0.5 rounded border border-black rotate-6">
              AI ENGINE
            </span>
          </div>
        </div>

        {/* Sticker 4: Blue Building Block / Lego "DEV" */}
        <div
          className="sticker-wrapper absolute w-[95px] h-[95px] z-25"
          style={{ transform: "translate(40px, -40px)" }}
        >
          <div className="w-full h-full bg-[#3c332a] text-[#fcf3f2] border-2 border-black rounded shadow-sm flex flex-col justify-between p-2.5 hover:scale-105 transition-transform duration-300">
            <div className="flex justify-between items-center">
              <span className="font-mono text-[8px] font-bold text-neutral-400">DEV.SYS</span>
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
            </div>
            <div className="my-auto text-left font-mono font-black text-sm tracking-tighter">
              &lt;CODE&gt;
            </div>
            <div className="text-right font-mono text-[8px] text-neutral-400">
              v1.0.0
            </div>
          </div>
        </div>

        {/* Sticker 5: Pink Acid Face (Sparkly eyes, wavy mouth) */}
        <div
          className="sticker-wrapper absolute w-[110px] h-[110px] z-30"
          style={{ transform: "translate(110px, 20px)" }}
        >
          <div className="w-full h-full bg-[#ef9d94] border-2.5 border-black rounded-full shadow-sm flex items-center justify-center hover:scale-105 transition-transform duration-300 relative">
            <svg viewBox="0 0 100 100" className="w-[80%] h-[80%]">
              {/* Star Eyes */}
              <path d="M 25,35 L 35,35 M 30,30 L 30,40" stroke="black" strokeWidth="3" strokeLinecap="round" />
              <path d="M 65,35 L 75,35 M 70,30 L 70,40" stroke="black" strokeWidth="3" strokeLinecap="round" />
              {/* Sparkles / cheeks */}
              <circle cx="20" cy="50" r="3" fill="#de3421" />
              <circle cx="80" cy="50" r="3" fill="#de3421" />
              {/* Wavy mouth */}
              <path
                d="M 30,60 Q 40,50 50,60 T 70,60"
                fill="none"
                stroke="black"
                strokeWidth="4.5"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-white border border-black px-1.5 py-0.5 rounded text-[8px] font-mono font-bold text-black shadow-sm">
              SUPER
            </div>
          </div>
        </div>

        {/* Sticker 6: Red Curved Label "WALK ALONG" */}
        <div
          className="sticker-wrapper absolute w-[130px] h-[55px] z-35"
          style={{ transform: "translate(60px, 90px)" }}
        >
          <div className="w-full h-full bg-[#de3421] border-2 border-black rounded-full shadow-sm flex items-center justify-center p-2 hover:scale-105 transition-transform duration-300 relative">
            <span className="font-mono text-[9px] font-black text-white tracking-widest uppercase">
              ★ WALK ALONG ★
            </span>
            <div className="absolute -bottom-1 right-5 bg-yellow-300 text-black border border-black rounded px-1 text-[7px] font-mono font-bold">
              OK!
            </div>
          </div>
        </div>

        {/* Sticker 7: Orange Sunburst / Badge "CREATIVE" */}
        <div
          className="sticker-wrapper absolute w-[100px] h-[100px] z-40"
          style={{ transform: "translate(-60px, 95px)" }}
        >
          <div className="w-full h-full flex items-center justify-center relative hover:scale-105 transition-transform duration-300">
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
              {/* Sunburst points */}
              <path
                d="M 50,5 L 60,35 L 90,25 L 75,50 L 95,70 L 65,70 L 60,95 L 45,75 L 20,90 L 30,60 L 5,50 L 32,40 Z"
                fill="#d5802a"
                stroke="black"
                strokeWidth="2.5"
                strokeLinejoin="miter"
              />
              <circle cx="50" cy="50" r="15" fill="black" />
              <text
                x="50"
                y="54"
                textAnchor="middle"
                fill="#fcf7f3"
                fontSize="12"
                fontFamily="monospace"
                fontWeight="black"
              >
                *
              </text>
            </svg>
            <span className="absolute font-mono text-[7px] font-bold text-black bg-[#fcf7f3] border border-black px-1 rounded rotate-[-12deg] -top-1">
              CREATIVE
            </span>
          </div>
        </div>

        {/* Sticker 8: Beige Oval "YUM / DELICIOUS" */}
        <div
          className="sticker-wrapper absolute w-[90px] h-[60px] z-45"
          style={{ transform: "translate(10px, -110px)" }}
        >
          <div className="w-full h-full bg-[#f5e1cd] border-2 border-black rounded-[50%] shadow-sm flex flex-col justify-center items-center hover:scale-105 transition-transform duration-300">
            <span className="font-display text-sm font-black text-black leading-none">
              YUM
            </span>
            <span className="font-mono text-[6px] tracking-wider text-black opacity-80 mt-1">
              100% QUALITY
            </span>
          </div>
        </div>

      </div>

      {/* Bottom UI bar */}
      <div className="loader-ui absolute bottom-8 left-8 right-8 flex justify-between items-end font-mono text-sm text-black">
        {/* Left Side: Logo/Initials */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border border-black rounded-sm flex items-center justify-center bg-transparent relative overflow-hidden group">
            {/* Spinning inner symbol */}
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
            <span className="absolute font-display font-bold text-xs">Y</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-wider leading-none text-xs">YASH RAJ</span>
            <span className="text-[9px] opacity-60 mt-0.5">3D PORTFOLIO INCEPTION</span>
          </div>
        </div>

        {/* Right Side: Large Percentage Counter */}
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] opacity-40 uppercase tracking-widest font-bold">
            LOADING SYSTEM
          </span>
          <span className="font-display text-6xl font-black tabular-nums tracking-tighter w-[120px] text-right">
            {progress.toString().padStart(2, "0")}%
          </span>
        </div>
      </div>
    </div>
  );
}
