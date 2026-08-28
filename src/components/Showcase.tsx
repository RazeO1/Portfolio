"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";

// Constants matching the sketchbook mechanics
const N = 18;        // Number of strips for smooth curving
const SPAN = 0.449;  // Gutter to outer page edge span fraction
const BETA = 0.60;   // Peak curl arc angle in radians
const MAG = 2.3;     // Magnifier scale factor

const PAGES = [
  { title: "Schematics Cover", place: "Index" },
  { title: "Aether-Net Neural Shader", place: "AI Graphics" },
  { title: "Khepri Vector Physics", place: "Rust WASM" },
  { title: "Nox Spatial Audio", place: "Web Audio" },
  { title: "Chronos Swiss Timepiece", place: "Simulation" },
  { title: "Apex Generative Pavilion", place: "3D Parametric" },
];

export default function Showcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const loupeRef = useRef<HTMLDivElement>(null);

  // Core interactive states
  const [idx, setIdx] = useState(0);
  const [turn, setTurn] = useState<{ dir: "next" | "prev"; from: number; to: number; t: number } | null>(null);
  const [view, setView] = useState({ rx: 0, ry: 0, z: 1 });
  const [targetView, setTargetView] = useState({ rx: 0, ry: 0, z: 1 });
  const [loupe, setLoupe] = useState({ active: true, x: 0, y: 0, isHeld: false });

  // Spring animation states for turn progress
  const turnProgressRef = useRef(0);
  const springTweenRef = useRef<gsap.core.Tween | null>(null);

  // 1. Generate custom SVG spreads for the portfolio projects
  const pageUrls = useMemo(() => {
    const paperColor = "#f5ebd9";
    const inkColor = "#2c2822";
    const accentRed = "#de3421";
    const accentOchre = "#d5802a";

    return PAGES.map((_, index) => {
      let content = "";
      const gridPattern = `
        <defs>
          <pattern id="grid-${index}" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="${inkColor}" stroke-width="0.5" opacity="0.07" />
          </pattern>
        </defs>
        <rect width="1760" height="1240" fill="${paperColor}" />
        <rect width="1760" height="1240" fill="url(#grid-${index})" />
        <rect x="876" y="0" width="8" height="1240" fill="black" opacity="0.04" />
      `;

      if (index === 0) {
        // Cover Page
        content = `
          ${gridPattern}
          <!-- Left Page: Cover artwork -->
          <g transform="translate(100, 100)" stroke="${inkColor}" stroke-width="1.5" fill="none" opacity="0.85">
            <path d="M 340 900 C 340 700, 240 500, 440 200" stroke-width="2" />
            <path d="M 440 200 C 470 150, 490 100, 470 50" />
            <path d="M 440 200 C 400 240, 320 230, 340 270 C 360 310, 410 270, 432 215 Z" fill="${accentOchre}" fill-opacity="0.15" />
            <path d="M 390 350 C 330 380, 270 340, 290 390 C 310 440, 360 410, 380 365 Z" fill="${accentRed}" fill-opacity="0.1" />
            <path d="M 360 500 C 290 520, 240 480, 255 530 C 270 580, 320 560, 345 515 Z" />
            <path d="M 345 680 C 260 700, 210 650, 230 710 C 250 770, 300 740, 335 695 Z" fill="${accentOchre}" fill-opacity="0.1" />
            <path d="M 410 400 C 470 430, 520 380, 500 440 C 480 500, 430 460, 415 415 Z" />
            <circle cx="280" cy="220" r="2" fill="${inkColor}" stroke="none" />
            <circle cx="510" cy="550" r="1.5" fill="${inkColor}" stroke="none" />
            <circle cx="310" cy="790" r="3" fill="${inkColor}" stroke="none" />
          </g>
          
          <!-- Right Page: Cover title -->
          <g transform="translate(980, 100)" fill="${inkColor}">
            <text x="100" y="270" font-family="Averia Serif Libre, serif" font-size="72" font-weight="700" letter-spacing="-0.02em">SKETCHBOOK</text>
            <text x="100" y="355" font-family="Averia Serif Libre, serif" font-size="72" font-weight="700" letter-spacing="-0.02em" fill="${accentRed}">OF PROJECTS</text>
            
            <line x1="100" y1="440" x2="680" y2="440" stroke="${inkColor}" stroke-width="1.5" opacity="0.3" />
            
            <text x="100" y="510" font-family="sans-serif" font-size="15" font-weight="700" letter-spacing="0.25em" opacity="0.6">VOL. II / TECHNICAL PORTFOLIO</text>
            <text x="100" y="600" font-family="sans-serif" font-size="20" font-weight="300" opacity="0.8">An interactive collection of code, vector</text>
            <text x="100" y="635" font-family="sans-serif" font-size="20" font-weight="300" opacity="0.8">physics, parametric mesh drawings, and</text>
            <text x="100" y="670" font-family="sans-serif" font-size="20" font-weight="300" opacity="0.8">soundscapes. Made by Yash Raj.</text>
            
            <g transform="translate(420, 800)" stroke="${inkColor}" stroke-width="1" fill="none" opacity="0.4">
              <circle cx="80" cy="80" r="70" />
              <circle cx="80" cy="80" r="50" stroke-dasharray="4,4" />
              <path d="M 10 80 L 150 80 M 80 10 L 80 150" />
              <text x="80" y="85" font-family="Averia Serif Libre, serif" font-size="14" font-weight="700" text-anchor="middle" fill="${inkColor}" stroke="none">Y.R</text>
            </g>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">00</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">01</text>
        `;
      } else if (index === 1) {
        // Aether-Net
        content = `
          ${gridPattern}
          <g transform="translate(100, 100)" fill="${inkColor}">
            <text x="80" y="120" font-family="Averia Serif Libre, serif" font-size="44" font-weight="700">01 / AETHER-NET</text>
            <text x="80" y="160" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="0.2em" fill="${accentRed}">NEURAL SHADER GRAPHICS</text>
            <line x1="80" y1="200" x2="680" y2="200" stroke="${inkColor}" stroke-width="1" opacity="0.2" />
            <text x="80" y="260" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">An experimental neural field shader pipeline that bakes</text>
            <text x="80" y="295" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">highly optimized coordinate-based representations of scenes</text>
            <text x="80" y="330" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">into lightweight WebGL fragments, avoiding polygons.</text>
            
            <g transform="translate(80, 460)" stroke="${inkColor}" stroke-width="1.2" fill="none" opacity="0.8">
              <circle cx="50" cy="100" r="8" fill="${inkColor}" />
              <circle cx="50" cy="200" r="8" fill="${inkColor}" />
              <circle cx="50" cy="300" r="8" fill="${inkColor}" />
              <circle cx="200" cy="50" r="8" />
              <circle cx="200" cy="150" r="8" />
              <circle cx="200" cy="250" r="8" />
              <circle cx="200" cy="350" r="8" />
              <circle cx="350" cy="100" r="8" />
              <circle cx="350" cy="200" r="8" />
              <circle cx="350" cy="300" r="8" />
              <circle cx="500" cy="200" r="10" stroke="${accentRed}" stroke-width="2" />
              
              <path d="M 58 100 L 192 50 M 58 100 L 192 150 M 58 100 L 192 250" stroke-width="0.5" />
              <path d="M 58 200 L 192 150 M 58 200 L 192 250 M 58 200 L 192 350" stroke-width="0.5" stroke-dasharray="2,2" />
              <path d="M 58 300 L 192 250 M 58 300 L 192 350" stroke-width="0.5" />
              <path d="M 208 50 L 342 100 M 208 150 L 342 100 M 208 250 L 342 200" stroke-width="0.5" />
              <path d="M 358 100 L 490 200 M 358 200 L 490 200 M 358 300 L 490 200" stroke="${accentRed}" opacity="0.6" />
              
              <text x="50" y="420" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.6">Inputs (x,y,z)</text>
              <text x="350" y="420" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.6">Latent Field</text>
              <text x="500" y="420" font-family="monospace" font-size="12" fill="${accentRed}" stroke="none" text-anchor="middle">RGB / Density</text>
            </g>
          </g>
          
          <g transform="translate(980, 100)" stroke="${inkColor}" stroke-width="1.2" fill="none">
            <g opacity="0.8">
              ${Array.from({ length: 24 }).map((_, i) => {
                const y = 220 + i * 26;
                const points = Array.from({ length: 35 }).map((_, j) => {
                  const x = 80 + j * 16;
                  const dist = Math.hypot(x - 360, y - 550);
                  const bump = Math.max(0, 110 * Math.exp(-Math.pow(dist / 170, 2)));
                  const wave = Math.sin(j * 0.45 + i * 0.25) * 10 * Math.exp(-dist / 320);
                  return `${x},${y - bump + wave}`;
                }).join(" ");
                const isRed = i === 11 || i === 12;
                return `<polyline points="${points}" stroke="${isRed ? accentRed : inkColor}" stroke-width="${isRed ? 2 : 1}" opacity="${isRed ? 0.9 : 0.5}" />`;
              }).join("")}
            </g>
            <text x="80" y="980" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.5">FIG 1.2 - RADIANCE FIELD TOPOGRAPHY</text>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">02</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">03</text>
        `;
      } else if (index === 2) {
        // Khepri Engine
        content = `
          ${gridPattern}
          <g transform="translate(100, 100)" fill="${inkColor}">
            <text x="80" y="120" font-family="Averia Serif Libre, serif" font-size="44" font-weight="700">02 / KHEPRI ENGINE</text>
            <text x="80" y="160" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="0.2em" fill="${accentOchre}">RUST WASM VECTOR PHYSICS</text>
            <line x1="80" y1="200" x2="680" y2="200" stroke="${inkColor}" stroke-width="1" opacity="0.2" />
            <text x="80" y="260" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">A browser-based vector mechanics tool driven by a</text>
            <text x="80" y="295" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">custom rigid body engine compiled to WebAssembly.</text>
            <text x="80" y="330" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">Renders force stress values dynamically in real-time.</text>
            
            <g transform="translate(80, 440)" stroke="${inkColor}" stroke-width="1.5" fill="none" opacity="0.8">
              <polygon points="60,260 160,130 260,260 360,130 460,260 560,130 660,260" />
              <line x1="60" y1="260" x2="660" y2="260" stroke-width="2" />
              <line x1="260" y1="130" x2="260" y2="260" stroke="${accentOchre}" stroke-width="2.5" />
              <line x1="460" y1="130" x2="460" y2="260" stroke="${accentOchre}" stroke-width="2.5" />
              <path d="M 260 40 L 260 115" stroke="${accentRed}" stroke-width="2" />
              <polygon points="255,110 260,125 265,110" fill="${accentRed}" stroke="none" />
              <path d="M 460 40 L 460 115" stroke="${accentRed}" stroke-width="2" />
              <polygon points="455,110 460,125 465,110" fill="${accentRed}" stroke="none" />
              
              <text x="260" y="30" font-family="monospace" font-size="11" fill="${accentRed}" stroke="none" text-anchor="middle">F_y = 5.6 kN</text>
              <text x="460" y="30" font-family="monospace" font-size="11" fill="${accentRed}" stroke="none" text-anchor="middle">F_y = 5.6 kN</text>
              <polygon points="50,280 60,260 70,280" fill="${inkColor}" />
              <circle cx="660" cy="270" r="8" />
            </g>
          </g>
          
          <g transform="translate(980, 100)" stroke="${inkColor}" stroke-width="1.2" fill="none">
            <g opacity="0.8" transform="translate(360, 520)">
              <circle cx="0" cy="0" r="210" />
              <circle cx="0" cy="0" r="130" stroke-dasharray="3,3" />
              <line x1="-210" y1="0" x2="210" y2="0" stroke-width="0.5" opacity="0.5" />
              <line x1="0" y1="-210" x2="0" y2="210" stroke-width="0.5" opacity="0.5" />
              <path d="M 0 0 A 12 12 0 0 1 12 0 A 24 24 0 0 1 -12 0 A 48 48 0 0 1 36 0 A 96 96 0 0 1 -60 0 A 180 180 0 0 1 120 0" stroke="${accentOchre}" stroke-width="1.8" />
              <line x1="60" y1="-200" x2="220" y2="-80" stroke="${accentRed}" stroke-width="2" />
              <circle cx="148" cy="-148" r="5" fill="${accentRed}" stroke="none" />
            </g>
            <text x="80" y="980" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.5">FIG 2.8 - COMPASS MATRIX EQUILIBRIUM</text>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">04</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">05</text>
        `;
      } else if (index === 3) {
        // Nox Spatial
        content = `
          ${gridPattern}
          <g transform="translate(100, 100)" fill="${inkColor}">
            <text x="80" y="120" font-family="Averia Serif Libre, serif" font-size="44" font-weight="700">03 / NOX SPATIAL</text>
            <text x="80" y="160" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="0.2em" fill="${accentRed}">PROCEDURAL SOUNDSCAPES</text>
            <line x1="80" y1="200" x2="680" y2="200" stroke="${inkColor}" stroke-width="1" opacity="0.2" />
            <text x="80" y="260" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">A spatial binaural synthesizer that maps cursor inputs</text>
            <text x="80" y="295" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">and page scroll speeds into Web Audio synthesizer nodes,</text>
            <text x="80" y="330" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">generating evolving ambient textures.</text>
            
            <g transform="translate(80, 460)" stroke="${inkColor}" stroke-width="1" fill="none" opacity="0.75">
              ${Array.from({ length: 4 }).map((_, i) => {
                const amp = 35 + i * 18;
                const freq = 0.016 - i * 0.002;
                const points = Array.from({ length: 100 }).map((_, j) => {
                  const x = j * 5.5;
                  const y = 160 + Math.sin(x * freq + i * 1.2) * amp * Math.sin(x * 0.0057);
                  return `${x},${y}`;
                }).join(" ");
                const isAccent = i === 1;
                return `<path d="M ${points}" stroke="${isAccent ? accentRed : inkColor}" stroke-width="${isAccent ? 2 : 0.75}" opacity="${isAccent ? 0.9 : 0.4}" />`;
              }).join("")}
            </g>
          </g>
          
          <g transform="translate(980, 100)" stroke="${inkColor}" stroke-width="1" fill="none">
            <g opacity="0.85" transform="translate(360, 520)">
              ${Array.from({ length: 13 }).map((_, i) => {
                const r = 25 + i * 32;
                return `<circle cx="-70" cy="0" r="${r}" stroke="${inkColor}" stroke-width="0.75" opacity="${(0.8 - i * 0.06).toFixed(2)}" />`;
              }).join("")}
              ${Array.from({ length: 13 }).map((_, i) => {
                const r = 25 + i * 32;
                return `<circle cx="70" cy="0" r="${r}" stroke="${accentRed}" stroke-width="0.75" opacity="${(0.8 - i * 0.06).toFixed(2)}" />`;
              }).join("")}
              <circle cx="-70" cy="0" r="4" fill="${inkColor}" stroke="none" />
              <circle cx="70" cy="0" r="4" fill="${accentRed}" stroke="none" />
            </g>
            <text x="80" y="980" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.5">FIG 3.8 - BINAURAL NODAL HARMONICS</text>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">06</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">07</text>
        `;
      } else if (index === 4) {
        // Chronos Swiss
        content = `
          ${gridPattern}
          <g transform="translate(100, 100)" fill="${inkColor}">
            <text x="80" y="120" font-family="Averia Serif Libre, serif" font-size="44" font-weight="700">04 / CHRONOS SWISS</text>
            <text x="80" y="160" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="0.2em" fill="${accentOchre}">MECHANICAL TORQUE SIMULATOR</text>
            <line x1="80" y1="200" x2="680" y2="200" stroke="${inkColor}" stroke-width="1" opacity="0.2" />
            <text x="80" y="260" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">A rigid physics study simulating chronograph gear ratios,</text>
            <text x="80" y="295" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">escapement velocity curves, and mainspring torque</text>
            <text x="80" y="330" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">decays in a mechanical timepiece.</text>
            
            <g transform="translate(200, 480)" stroke="${inkColor}" stroke-width="1.2" fill="none" opacity="0.8">
              <circle cx="0" cy="0" r="130" stroke-dasharray="5,5" />
              ${Array.from({ length: 20 }).map((_, i) => {
                const a = (i * 18 * Math.PI) / 180;
                const tx = Math.cos(a) * 130;
                const ty = Math.sin(a) * 130;
                const tx2 = Math.cos(a + 0.08) * 144;
                const ty2 = Math.sin(a + 0.08) * 144;
                const tx3 = Math.cos(a + 0.16) * 130;
                const ty3 = Math.sin(a + 0.16) * 130;
                return `<polygon points="${tx},${ty} ${tx2},${ty2} ${tx3},${ty3}" />`;
              }).join("")}
              <circle cx="0" cy="0" r="45" fill="${paperColor}" />
              <path d="M 0 0 L 210 110" stroke="${accentOchre}" stroke-width="2" />
              <g transform="translate(180, 90)" stroke="${accentRed}" stroke-width="1.8">
                <polygon points="-8,-8 8,-2 12,10 -4,12" fill="${accentRed}" fill-opacity="0.2" />
              </g>
            </g>
          </g>
          
          <g transform="translate(980, 100)" stroke="${inkColor}" stroke-width="1.2" fill="none">
            <g opacity="0.85" transform="translate(360, 520)">
              <circle cx="-110" cy="-50" r="140" stroke-dasharray="2,2" />
              <circle cx="-110" cy="-50" r="110" />
              <circle cx="-110" cy="-50" r="16" />
              <circle cx="0" cy="70" r="90" />
              <circle cx="0" cy="70" r="6" fill="${inkColor}" />
              ${Array.from({ length: 5 }).map((_, i) => {
                const a = (i * 72 * Math.PI) / 180;
                const tx = Math.cos(a) * 82;
                const ty = 70 + Math.sin(a) * 82;
                return `<line x1="0" y1="70" x2="${tx}" y2="${ty}" stroke-width="1.5" opacity="0.5" />`;
              }).join("")}
              <circle cx="110" cy="-10" r="60" stroke="${accentOchre}" stroke-width="1.8" />
              <circle cx="180" cy="100" r="50" />
            </g>
            <text x="80" y="980" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.5">FIG 4.15 - TORQUE TRAIN VECTOR ANALYSIS</text>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">08</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">09</text>
        `;
      } else if (index === 5) {
        // Apex Pavilion
        content = `
          ${gridPattern}
          <g transform="translate(100, 100)" fill="${inkColor}">
            <text x="80" y="120" font-family="Averia Serif Libre, serif" font-size="44" font-weight="700">05 / APEX PAVILION</text>
            <text x="80" y="160" font-family="sans-serif" font-size="13" font-weight="700" letter-spacing="0.2em" fill="${accentRed}">ALGORITHMIC PAVILION</text>
            <line x1="80" y1="200" x2="680" y2="200" stroke="${inkColor}" stroke-width="1" opacity="0.2" />
            <text x="80" y="260" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">A structural design study compiling parametric formulas into</text>
            <text x="80" y="295" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">3D mesh wireframes. Automatically calculates concrete shell</text>
            <text x="80" y="330" font-family="sans-serif" font-size="17" font-weight="300" opacity="0.8">tension profiles and stress distribution grids.</text>
            
            <g transform="translate(80, 420)" stroke="${inkColor}" stroke-width="1.2" fill="none" opacity="0.8">
              <path d="M 50 280 C 150 90, 250 90, 350 180 C 450 270, 550 270, 650 90" stroke-width="2" stroke="${accentRed}" />
              <path d="M 50 330 C 150 140, 250 140, 350 230 C 450 320, 550 320, 650 140" stroke-dasharray="3,3" />
              <path d="M 50 230 C 150 40, 250 40, 350 130 C 450 220, 550 220, 650 40" />
              <line x1="50" y1="360" x2="650" y2="360" stroke-dasharray="4,4" />
              <line x1="50" y1="350" x2="50" y2="370" />
              <line x1="650" y1="350" x2="650" y2="370" />
              <text x="350" y="390" font-family="monospace" font-size="11" fill="${inkColor}" stroke="none" text-anchor="middle">SPAN L = 120.0m</text>
            </g>
          </g>
          
          <g transform="translate(980, 100)" stroke="${inkColor}" stroke-width="1.2" fill="none">
            <g opacity="0.8" transform="translate(360, 500)">
              ${Array.from({ length: 18 }).map((_, i) => {
                const u = i / 17;
                const points = Array.from({ length: 18 }).map((_, j) => {
                  const v = j / 17;
                  const x = -260 + u * 520;
                  const z = -180 + v * 360;
                  const y = -120 + Math.pow(u - 0.5, 2) * 420 - Math.pow(v - 0.5, 2) * 280;
                  const isoX = x * 0.866 - z * 0.866;
                  const isoY = x * 0.5 + z * 0.5 - y;
                  return `${isoX.toFixed(1)},${isoY.toFixed(1)}`;
                }).join(" ");
                const isRed = i === 9;
                return `<polyline points="${points}" stroke="${isRed ? accentRed : inkColor}" stroke-width="${isRed ? 1.8 : 0.8}" opacity="${isRed ? 0.95 : 0.4}" />`;
              }).join("")}
              
              ${Array.from({ length: 18 }).map((_, j) => {
                const v = j / 17;
                const points = Array.from({ length: 18 }).map((_, i) => {
                  const u = i / 17;
                  const x = -260 + u * 520;
                  const z = -180 + v * 360;
                  const y = -120 + Math.pow(u - 0.5, 2) * 420 - Math.pow(v - 0.5, 2) * 280;
                  const isoX = x * 0.866 - z * 0.866;
                  const isoY = x * 0.5 + z * 0.5 - y;
                  return `${isoX.toFixed(1)},${isoY.toFixed(1)}`;
                }).join(" ");
                return `<polyline points="${points}" stroke="${inkColor}" stroke-width="0.5" opacity="0.25" />`;
              }).join("")}
            </g>
            <text x="80" y="980" font-family="monospace" font-size="12" fill="${inkColor}" stroke="none" opacity="0.5">FIG 5.12 - PARAMETRIC TENSION MESH</text>
          </g>
          <text x="60" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4">10</text>
          <text x="1700" y="1180" font-family="sans-serif" font-size="14" fill="${inkColor}" opacity="0.4" text-anchor="end">11</text>
        `;
      }

      return "data:image/svg+xml;utf8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1760 1240" width="1760" height="1240">
          ${content}
        </svg>
      `);
    });
  }, []);

  const M = pageUrls.length;

  // Initialize loupe position relative to book dimensions
  const restLoupe = () => {
    if (!bookRef.current) return;
    const w = bookRef.current.clientWidth;
    const h = bookRef.current.clientHeight;
    setLoupe((prev) => ({
      ...prev,
      x: w * 0.88,
      y: h * 0.855,
    }));
  };

  useEffect(() => {
    restLoupe();
    window.addEventListener("resize", restLoupe);
    return () => window.removeEventListener("resize", restLoupe);
  }, []);

  // Compute loupe size and offsets based on current layout width
  const layout = useMemo(() => {
    if (!bookRef.current) return { width: 0, height: 0, loupeR: 110, bezel: 12 };
    const bw = bookRef.current.clientWidth;
    const bh = bookRef.current.clientHeight;
    const r = Math.round(Math.max(82, Math.min(131, bw * 0.117))); // Radius is half size
    const bezel = r * 2 * 0.058;
    return { width: bw, height: bh, loupeR: r, bezel };
  }, [loupe.x, idx, turn]);

  // Handle book lean tilt effect towards pointer coordinates
  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === "touch" || turn || loupe.isHeld) return;
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const nx = Math.max(-1, Math.min(1, (e.clientX - (rect.left + rect.width / 2)) / (rect.width * 0.62)));
    const ny = Math.max(-1, Math.min(1, (e.clientY - (rect.top + rect.height / 2)) / (rect.height * 0.9)));
    
    setTargetView({
      rx: -ny * 4.5,
      ry: nx * 7.0,
      z: targetView.z
    });
  };

  const handlePointerOut = () => {
    setTargetView({ rx: 0, ry: 0, z: targetView.z });
  };

  // Lerp calculations for smooth 3D tilting
  useEffect(() => {
    let frameId: number;
    const lerp = () => {
      setView((prev) => {
        const rx = prev.rx + (targetView.rx - prev.rx) * 0.12;
        const ry = prev.ry + (targetView.ry - prev.ry) * 0.12;
        const z = prev.z + (targetView.z - prev.z) * 0.12;
        
        if (
          Math.abs(targetView.rx - rx) < 0.005 &&
          Math.abs(targetView.ry - ry) < 0.005 &&
          Math.abs(targetView.z - z) < 0.005
        ) {
          return targetView;
        }
        return { rx, ry, z };
      });
      frameId = requestAnimationFrame(lerp);
    };
    frameId = requestAnimationFrame(lerp);
    return () => cancelAnimationFrame(frameId);
  }, [targetView]);

  // Page turning triggering
  const triggerTurn = (dir: "next" | "prev", tVal = 0) => {
    if (springTweenRef.current) springTweenRef.current.kill();
    const from = idx;
    const to = dir === "next" ? (from + 1) % M : (from - 1 + M) % M;
    
    setTurn({ dir, from, to, t: tVal });
    turnProgressRef.current = tVal;

    // Shove the loupe out of the way of the sweep
    if (loupe.active && !loupe.isHeld && bookRef.current) {
      const bw = bookRef.current.clientWidth;
      const bh = bookRef.current.clientHeight;
      setLoupe((prev) => ({
        ...prev,
        x: dir === "next" ? bw * 0.12 : bw * 0.88,
        y: bh * 0.855,
      }));
    }

    const obj = { val: tVal };
    springTweenRef.current = gsap.to(obj, {
      val: 1,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        turnProgressRef.current = obj.val;
        setTurn((prev) => (prev ? { ...prev, t: obj.val } : null));
      },
      onComplete: () => {
        setIdx(to);
        setTurn(null);
      },
    });
  };

  const handleZoneClick = (dir: "next" | "prev") => {
    if (turn) return;
    triggerTurn(dir);
  };

  // Magnifier Drag and Positioning Logic
  const handleLoupeDown = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!loupe.active) return;
    e.stopPropagation();
    e.preventDefault();
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;

    setLoupe((prev) => ({ ...prev, isHeld: true }));
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleLoupeMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    if (!loupe.isHeld || !bookRef.current) return;
    const rect = bookRef.current.getBoundingClientRect();
    
    // Convert client coordinates to local coordinates inside the book frame
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;

    setLoupe((prev) => ({
      ...prev,
      x: Math.max(-layout.loupeR * 0.4, Math.min(layout.width + layout.loupeR * 0.4, localX)),
      y: Math.max(-layout.loupeR * 0.4, Math.min(layout.height + layout.loupeR * 0.8, localY)),
    }));
  };

  const handleLoupeUp = (e: React.PointerEvent<HTMLSpanElement>) => {
    setLoupe((prev) => ({ ...prev, isHeld: false }));
    (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
  };

  // Math variables for magnifier zoom offset
  const magnifierMath = useMemo(() => {
    const { width, height, loupeR, bezel } = layout;
    if (width === 0) return { opacity: 0, mask: "", innerTransform: "" };

    const r = (loupeR - bezel).toFixed(1);
    
    // Check overlay bounds to fade loupe out if dragged off sheet
    const cx = width / 2;
    const cy = height / 2;
    const z = view.z;

    const x0 = cx + (width * 0.051 - cx) * z;
    const x1 = cx + (width * 0.949 - cx) * z;
    const y0 = cy + (height * 0.218 - cy) * z;
    const y1 = cy + (height * 0.782 - cy) * z;

    const nx = Math.max(x0, Math.min(loupe.x, x1));
    const ny = Math.max(y0, Math.min(loupe.y, y1));

    const inside = (loupe.x > x0 && loupe.x < x1 && loupe.y > y0 && loupe.y < y1)
      ? Math.min(loupe.x - x0, x1 - loupe.x, loupe.y - y0, y1 - loupe.y)
      : -Math.hypot(loupe.x - nx, loupe.y - ny);

    const k = Math.max(0, Math.min(1, (inside + loupeR * 0.30) / (loupeR * 0.55)));
    const opacity = loupe.active ? k : 0;

    const mask = `radial-gradient(circle ${r}px at ${loupe.x.toFixed(1)}px ${loupe.y.toFixed(1)}px, #000 calc(100% - 1px), transparent 100%)`;
    
    // Zoom coordinates computation
    const px = cx + (loupe.x - cx) / z;
    const py = cy + (loupe.y - cy) / z;
    const s = MAG * z;

    const innerTransform = `translate(${(loupe.x - px * s).toFixed(1)}px, ${(loupe.y - py * s).toFixed(1)}px) scale(${s.toFixed(4)})`;

    return { opacity, mask, innerTransform };
  }, [loupe.x, loupe.y, loupe.active, view, layout]);

  // Recursively render nested 3D strips for bending paper animation
  const renderStrips = (i: number): React.ReactNode => {
    if (i >= N || !turn) return null;
    const isEdge = i === N - 1;
    const bw = layout.width;
    
    // Slice coordinates based on nested hierarchical layout
    const gut = `calc(${bw}px * 0.5)`;
    const sw = `calc(${bw}px * ${SPAN} / ${N})`;
    
    const A = `calc(-1 * (${gut} + ${i} * ${sw}))`;
    const B = `calc((${i + 1}) * ${sw} - ${gut})`;
    
    const faceFrontX = turn.dir === "next" ? A : B;
    const faceBackX = turn.dir === "next" ? B : A;

    return (
      <div className={`strip ${isEdge ? "edge" : ""}`} style={{ "--i": i } as any}>
        <div className="face front" style={{ backgroundImage: `url(${pageUrls[turn.from]})`, backgroundPositionX: faceFrontX } as any}>
          <div className="sh" style={{ opacity: (Math.abs(Math.cos(Math.PI * turn.t - i * (2 * (BETA * Math.sin(Math.PI * turn.t)) / N))) * 0.62).toFixed(3) } as any} />
          <div className="gl" style={{ opacity: (Math.sin(Math.PI * turn.t) * Math.pow(Math.abs(Math.cos(Math.PI * turn.t - i * (2 * (BETA * Math.sin(Math.PI * turn.t)) / N))), 2) * 0.20).toFixed(3) } as any} />
        </div>
        <div className="face back" style={{ backgroundImage: `url(${pageUrls[turn.to]})`, backgroundPositionX: faceBackX } as any}>
          <div className="sh" style={{ opacity: (Math.abs(Math.cos(Math.PI * turn.t - (i + 1) * (2 * (BETA * Math.sin(Math.PI * turn.t)) / N))) * 0.62).toFixed(3) } as any} />
          <div className="gl" style={{ opacity: (Math.sin(Math.PI * turn.t) * Math.pow(Math.abs(Math.cos(Math.PI * turn.t - (i + 1) * (2 * (BETA * Math.sin(Math.PI * turn.t)) / N))), 2) * 0.20).toFixed(3) } as any} />
        </div>
        {renderStrips(i + 1)}
      </div>
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
      <div
        ref={containerRef}
        className="sb-wrap w-full max-w-[1080px] px-6 md:px-12 flex flex-col items-center gap-6"
      >
        <div
          ref={stageRef}
          className="sb-stage relative w-full flex items-center justify-center"
          onPointerMove={handlePointerMove}
          onPointerOut={handlePointerOut}
        >
          {/* Navigation arrow left */}
          <button
            onClick={() => handleZoneClick("prev")}
            className="sb-arrow left absolute left-2 md:-left-4 z-40 p-4 border-0 bg-transparent text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="previous page"
          >
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" className="stroke-current">
              <polyline points="11,3 3,22 11,41" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* 3D Transform Frame */}
          <div className="sb-3d relative flex-1 w-full max-w-[900px] aspect-[1760/1240] perspective-[1750px]">
            <div
              className="sb-tilt w-full h-full relative"
              style={{
                transform: `rotateX(${view.rx.toFixed(2)}deg) rotateY(${view.ry.toFixed(2)}deg) scale(${view.z.toFixed(3)})`,
                transformStyle: "preserve-3d",
              }}
            >
              {/* Decorative dropshadows */}
              <div className="sb-cast ambient absolute inset-0 z-0 opacity-[0.8] filter blur-[26px] bg-[radial-gradient(50%_50%_at_50%_58%,rgba(58,44,26,0.34)_0%,rgba(58,44,26,0.19)_40%,transparent_74%)]" />
              <div className="sb-cast contact absolute inset-0 z-0 opacity-[0.8] filter blur-[11px] bg-[radial-gradient(50%_44%_at_50%_42%,rgba(44,32,14,0.40)_0%,rgba(44,32,14,0.17)_48%,transparent_78%)]" />
              
              {/* Core Book element */}
              <div
                ref={bookRef}
                className="sb-book w-full h-full relative"
                style={{ transformStyle: "preserve-3d" }}
              >
                {!turn ? (
                  <div className="sb-full absolute inset-0 rounded-sm overflow-hidden shadow-md">
                    <img src={pageUrls[idx]} alt={PAGES[idx].title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <>
                    {/* Left half page behind */}
                    <div className="sb-half left absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden">
                      <img src={pageUrls[turn.dir === "next" ? turn.from : turn.to]} className="w-[200%] max-w-none h-full object-cover" alt="" />
                      <div className="gutter-shade left absolute top-0 bottom-0 right-0 w-[46%] bg-gradient-to-l from-black/15 to-transparent pointer-events-none" />
                    </div>

                    {/* Right half page behind */}
                    <div className="sb-half right absolute top-0 bottom-0 left-1/2 w-1/2 overflow-hidden">
                      <img src={pageUrls[turn.dir === "next" ? turn.to : turn.from]} className="w-[200%] max-w-none h-full object-cover -ml-[100%]" alt="" />
                      <div className="gutter-shade right absolute top-0 bottom-0 left-0 w-[46%] bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />
                    </div>

                    {/* The sweeping turning page curl */}
                    <div
                      className={`curl ${turn.dir}`}
                      style={{
                        position: "absolute",
                        top: 0,
                        height: "100%",
                        width: `calc(${layout.width}px * ${SPAN})`,
                        transformStyle: "preserve-3d",
                        zIndex: 6,
                        left: turn.dir === "next" ? "50%" : "auto",
                        right: turn.dir === "prev" ? "50%" : "auto",
                        transformOrigin: turn.dir === "next" ? "left center" : "right center",
                        transform: `rotateY(${((turn.dir === "next" ? -1 : 1) * (Math.PI * turn.t + BETA * Math.sin(Math.PI * turn.t)) * (180 / Math.PI)).toFixed(2)}deg)`,
                        "--n": N,
                        "--span": SPAN,
                        "--bw": `${layout.width}px`,
                        "--tt": `${((Math.PI * turn.t + BETA * Math.sin(Math.PI * turn.t)) * (180 / Math.PI)).toFixed(2)}deg`,
                        "--td": `${((2 * (BETA * Math.sin(Math.PI * turn.t)) / N) * (180 / Math.PI)).toFixed(3)}deg`,
                        "--shade": Math.sin(Math.PI * turn.t).toFixed(3),
                      } as any}
                    >
                      {renderStrips(0)}
                    </div>
                  </>
                )}

                {/* Hotspot hitboxes for page clicks */}
                <div
                  onClick={() => handleZoneClick("prev")}
                  className="absolute top-0 bottom-0 left-0 w-[8%] z-40 cursor-w-resize"
                  title="Previous Page"
                />
                <div
                  onClick={() => handleZoneClick("next")}
                  className="absolute top-0 bottom-0 right-0 w-[8%] z-40 cursor-e-resize"
                  title="Next Page"
                />
              </div>

              {/* Magnifier Glass overlay inside tilt frame */}
              {loupe.active && (
                <div
                  ref={loupeRef}
                  className={`loupe absolute left-0 top-0 select-none z-50 pointer-events-none transition-opacity duration-300 ${loupe.isHeld ? "held" : ""}`}
                  style={{
                    width: `${layout.loupeR * 2}px`,
                    height: `${layout.loupeR * 2}px`,
                    opacity: magnifierMath.opacity,
                    transform: `translate3d(${(loupe.x - layout.loupeR).toFixed(1)}px, ${(loupe.y - layout.loupeR).toFixed(1)}px, 1px)`,
                    "--lr": `${layout.loupeR * 2}px`
                  } as any}
                >
                  <span
                    onPointerDown={handleLoupeDown}
                    onPointerMove={handleLoupeMove}
                    onPointerUp={handleLoupeUp}
                    onPointerCancel={handleLoupeUp}
                    className="grip absolute left-1/2 top-1/2 w-[74%] h-[12.5%] rounded-full cursor-grab active:cursor-grabbing pointer-events-auto bg-gradient-to-b from-white/20 to-black/20 shadow-md"
                    style={{
                      transformOrigin: "0 50%",
                      transform: `rotate(40deg) translate(${layout.loupeR * 0.66}px, -50%)`,
                      background: "linear-gradient(180deg, rgba(255,255,255,0.46) 0%, rgba(0,0,0,0.2) 100%), linear-gradient(90deg, #d4b476 0%, #b8995a 15%, #6a4f32 20%, #4a3420 85%, #6a4f32 100%)"
                    }}
                  />
                  <span
                    onPointerDown={handleLoupeDown}
                    onPointerMove={handleLoupeMove}
                    onPointerUp={handleLoupeUp}
                    onPointerCancel={handleLoupeUp}
                    className="ring absolute inset-0 rounded-full border-4 border-amber-800/10 cursor-grab active:cursor-grabbing pointer-events-auto shadow-2xl"
                    style={{
                      padding: `${layout.loupeR * 2 * 0.058}px`,
                      background: "linear-gradient(146deg, #fffcf4 0%, #ecdcb4 14%, #c7ab77 32%, #8e7850 50%, #dfcea0 66%, #fff6e0 80%, #a48e60 100%)"
                    }}
                  >
                    <span className="lens relative block w-full h-full rounded-full overflow-hidden shadow-inner border border-amber-900/30">
                      <span
                        className="absolute inset-0 bg-[#f5ebd9] pointer-events-none rounded-full"
                        style={{
                          backgroundImage: `url(${pageUrls[turn ? (turn.t > 0.5 ? turn.to : turn.from) : idx]})`,
                          backgroundSize: `${layout.width}px ${layout.height}px`,
                          backgroundRepeat: "no-repeat",
                          transformOrigin: "0 0",
                          transform: magnifierMath.innerTransform,
                        }}
                      />
                      <span className="absolute inset-0 z-10 pointer-events-none rounded-full bg-[radial-gradient(circle_at_50%_50%,transparent_54%,rgba(58,44,26,0.1)_76%,rgba(46,34,16,0.3)_100%)] shadow-[inset_0_4px_12px_rgba(40,30,14,0.3)]" />
                      <span className="absolute inset-0 z-20 pointer-events-none rounded-full bg-[radial-gradient(36%_26%_at_29%_19%,rgba(255,255,255,0.3),transparent_76%)]" />
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Zoom Layer for lens clipping */}
            <div
              className="zoomwrap absolute inset-0 overflow-hidden pointer-events-none z-30"
              style={{
                opacity: magnifierMath.opacity,
                maskImage: magnifierMath.mask,
                WebkitMaskImage: magnifierMath.mask,
              }}
            >
              <div
                className="zoominner absolute inset-0 transform-origin-0-0"
                style={{ transform: magnifierMath.innerTransform }}
              >
                <img src={pageUrls[turn ? (turn.t > 0.5 ? turn.to : turn.from) : idx]} className="w-full h-full object-cover" alt="" />
              </div>
            </div>
          </div>

          {/* Navigation arrow right */}
          <button
            onClick={() => handleZoneClick("next")}
            className="sb-arrow right absolute right-2 md:-right-4 z-40 p-4 border-0 bg-transparent text-neutral-400 hover:text-black transition-colors cursor-pointer"
            aria-label="next page"
          >
            <svg viewBox="0 0 14 44" width="14" height="44" fill="none" className="stroke-current">
              <polyline points="3,3 11,22 3,41" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Caption panel */}
        <div className="sb-captions min-h-[48px] text-center flex flex-col justify-center animate-fade-in">
          <p className="sb-caption font-display font-medium text-xl md:text-2xl text-neutral-800 leading-tight">
            {turn ? (turn.t > 0.5 ? PAGES[turn.to].title : PAGES[turn.from].title) : PAGES[idx].title}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-[#d5802a] font-bold mt-1">
            {turn ? (turn.t > 0.5 ? PAGES[turn.to].place : PAGES[turn.from].place) : PAGES[idx].place}
          </p>
        </div>

        {/* Toolbar controls */}
        <div className="sb-tools flex items-center gap-4 border border-black/10 rounded-full px-5 py-2.5 bg-neutral-50/50 backdrop-blur-md">
          <button
            onClick={() => setLoupe((prev) => ({ ...prev, active: !prev.active }))}
            className={`tool w-8 h-8 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-200/50 hover:text-black transition-all cursor-pointer ${
              loupe.active ? "bg-[#de3421]/15 text-[#de3421] hover:bg-[#de3421]/25 hover:text-[#de3421]" : ""
            }`}
            aria-label="Toggle Magnifier"
            aria-pressed={loupe.active}
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4">
              <circle cx="8.8" cy="8.8" r="5.8" />
              <path d="M13 13 l4.4 4.4" />
            </svg>
          </button>
          <span className="w-[1px] h-4 bg-black/10" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 font-bold">
            Drag glass across pages to inspect details
          </span>
        </div>
      </div>

      {/* Pages Plate Index */}
      <div className="w-full max-w-[900px] mt-16 px-6">
        <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 font-semibold mb-3 border-b border-black/10 pb-2">
          Plates Index
        </p>
        <ol className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1">
          {PAGES.map((p, i) => (
            <li key={i}>
              <button
                onClick={() => {
                  if (turn) return;
                  if (i === idx) return;
                  triggerTurn(i > idx ? "next" : "prev", 0);
                  setIdx(i);
                }}
                className={`w-full text-left py-2 border-b border-black/5 hover:bg-black/[0.02] px-2 flex justify-between items-baseline group transition-all duration-300 cursor-pointer ${
                  i === idx ? "bg-amber-800/[0.04]" : ""
                }`}
              >
                <div className="flex gap-4 items-baseline">
                  <span className={`font-mono text-[9px] ${i === idx ? "text-[#de3421] font-bold" : "text-neutral-400"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`font-display text-[15px] ${i === idx ? "text-[#de3421] font-medium" : "text-neutral-800"}`}>
                    {p.title}
                  </span>
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-wider ${i === idx ? "text-[#de3421]" : "text-neutral-400"}`}>
                  {p.place}
                </span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      {/* Inline styles for 3D strip page turning */}
      <style jsx global>{`
        .sb-wrap {
          perspective: 1750px;
        }
        .sb-book {
          position: relative;
          transform-style: preserve-3d;
        }
        .curl {
          transform-style: preserve-3d;
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
          transform: rotateY(var(--td));
        }
        .curl.prev .strip .strip {
          right: 100%;
          transform: rotateY(calc(-1 * var(--td)));
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
          background-size: var(--bw) auto;
          border-radius: 1px;
        }
        .face.back {
          transform: rotateY(180deg);
        }
        .face .sh, .face .gl {
          position: absolute;
          left: 0;
          right: 0;
          top: 21.8%;
          bottom: 21.8%;
          pointer-events: none;
          mask-image: linear-gradient(180deg, transparent 0%, #000 5.2%, #000 94.8%, transparent 100%);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 5.2%, #000 94.8%, transparent 100%);
        }
        .face .sh {
          background: linear-gradient(90deg, rgba(58, 43, 20, var(--a1, 0.15)), rgba(58, 43, 20, var(--a2, 0)));
        }
        .face .gl {
          background: #fffaf0;
        }
        .strip.edge .face.front {
          --hf: linear-gradient(90deg, #000 0% 22%, transparent 96%);
        }
        .strip.edge .face.back {
          --hf: linear-gradient(270deg, #000 0% 22%, transparent 96%);
        }
        .strip.edge .face .sh, .strip.edge .face .gl {
          mask-image: linear-gradient(180deg, transparent 0%, #000 9%, #000 91%, transparent 100%), var(--hf);
          -webkit-mask-image: linear-gradient(180deg, transparent 0%, #000 9%, #000 91%, transparent 100%), var(--hf);
          mask-composite: intersect;
          -webkit-mask-composite: source-in;
        }
      `}</style>
    </section>
  );
}
