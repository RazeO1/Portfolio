1. Framework Layer
If you're building a personal 3D portfolio (not a studio site), Next.js + React is the industry standard in 2026. It handles routing, SEO, and CMS integration while letting you drop a <Canvas> anywhere.

2. 3D Engine Layer
R3F + Three.js is the dominant stack. R3F for layout, Drei for helpers, and raw Three.js when you need to write custom shaders or TSL nodes.

3. Animation & Motion
Stack pairing: GSAP for the page motion, @react-spring or useFrame for 3D motion.

4. Styling
Tailwind for 90% of UI, SCSS for the 10% that needs custom keyframes or complex gradient logic.

5. 3D Asset Pipeline
Tool                | Purpose
--------------------|------------------------	            
Blender	            | Modeling, rigging, UV unwrapping, baking — export to .glb/.gltf
gltf-transform	    | CLI optimization: Draco compression, KTX2 texture encoding, LOD generation
@react-three/drei	| <Environment>, <ContactShadows>, <Float>, <Html> — essential R3F helpers
Three.js Editor	    | Quick scene composition, light baking preview
Critical rule: Never ship raw .glb files. Always run gltf-transform draco --quantize and use KTX2 for textures. Target <5MB for hero assets, <15MB total per page.

6. Physics & Interaction
Library	Use Case
Rapier	Fast WASM physics (Bruno Simon uses this). Rigid bodies, collisions, vehicles
@react-three/cannon	Lightweight physics for floating objects, cloth, simple collisions
Leva	In-scene debug UI for tweaking lights, colors, positions in real time

7. Audio (Optional but High-Impact)
Table
Library	Use Case
Howler.js	Spatial audio, background music, UI sounds (used by Bruno Simon)
Tone.js	Procedural audio, generative soundscapes

8. Hosting & Deployment
Table
Platform	Best For
Vercel	Next.js native, edge functions, preview deployments, excellent Core Web Vitals
GitHub Pages	Static Vite/Astro builds, free, custom domain
Netlify	Large media with LFS, form handling, edge functions

9. Recommended 2026 Stack (Copy-Paste Ready)
plain
Framework:     Next.js 15 (App Router) + TypeScript
3D:            React Three Fiber + Three.js (WebGPURenderer fallback)
Animation:     GSAP (ScrollTrigger, SplitText) + Lenis
Styling:       Tailwind CSS + CSS Modules (for complex anims)
UI Primitives: shadcn/ui
Assets:        Blender → gltf-transform (Draco + KTX2)
Physics:       Rapier (@react-three/rapier)
Audio:         Howler.js (optional)
Deploy:        Vercel

10. Color Pallete:
:root {
  --color-primary-50: #fcf3f2;
  --color-primary-100: #fae8e5;
  --color-primary-200: #f3c8c3;
  --color-primary-300: #ef9d94;
  --color-primary-400: #e35342;
  --color-primary-500: #de3421;
  --color-primary-600: #bb2c1c;
  --color-primary-700: #972316;
  --color-primary-800: #731b11;
  --color-primary-900: #531913;
  --color-primary-950: #36100c;
  --color-secondary-50: #fcf7f3;
  --color-secondary-100: #f9f0e7;
  --color-secondary-200: #f5e1cd;
  --color-secondary-300: #ebc299;
  --color-secondary-400: #e29e5a;
  --color-secondary-500: #d5802a;
  --color-secondary-600: #b36b24;
  --color-secondary-700: #91571d;
  --color-secondary-800: #6f4216;
  --color-secondary-900: #503316;
  --color-secondary-950: #34210e;
  --color-accent-50: #f9f7f6;
  --color-accent-100: #f3f0ed;
  --color-accent-200: #e2dbd4;
  --color-accent-300: #d4c8bc;
  --color-accent-400: #b49e88;
  --color-accent-500: #9b8064;
  --color-accent-600: #826b54;
  --color-accent-700: #6a5744;
  --color-accent-800: #514234;
  --color-accent-900: #3c332a;
  --color-accent-950: #27211b;
  --color-neutral-50: #f7f7f7;
  --color-neutral-100: #f0f0f0;
  --color-neutral-200: #dbdbdb;
  --color-neutral-300: #c2c2c2;
  --color-neutral-400: #9e9e9e;
  --color-neutral-500: #808080;
  --color-neutral-600: #6b6b6b;
  --color-neutral-700: #575757;
  --color-neutral-800: #424242;
  --color-neutral-900: #333333;
  --color-neutral-950: #000000;
  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  --font-family-sans: sans-serif;
  --font-family-display: Averia Serif Libre;
  --font-family-mono: Geist Mono;
  --font-size-xs: 0.75rem;
  --font-size-sm: 1rem;
  --font-size-base: 1.188rem;
  --font-size-lg: 1.313rem;
  --font-size-xl: 1.813rem;
  --font-size-2xl: 2rem;
  --font-size-3xl: 2.813rem;
  --font-size-4xl: 3.188rem;
  --spacing-0: 0;
  --spacing-1: 0.125rem;
  --spacing-3: 0.625rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-7: 1.75rem;
  --spacing-13: 3.125rem;
  --spacing-30: 7.5rem;
  --radius-none: 0;
  --radius-sm: 0.6875rem;
  --radius-md: 0.8125rem;
  --radius-lg: 1.25rem;
  --radius-xl: 3.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;
  --shadow-sm: rgba(0, 0, 0, 0.6) 0px 0.602187px 0px -1.25px, rgba(0, 0, 0, 0.53) 0px 2.28853px 0px -2.5px, rgba(0, 0, 0, 0.21) 0px 10px 0px -3.75px;
  --shadow-md: rgba(0, 0, 0, 0.25) 0px 1px 2px 0px;
  --shadow-lg: rgba(0, 0, 0, 0.41) 0px 3px 2px 1px;
  --shadow-xl: rgba(0, 0, 0, 0.47) 0px 4px 5px 2px;
  --gradient-brand-1: linear-gradient(rgb(245, 225, 206) 0%, rgb(227, 83, 66) 62%);
  --gradient-brand-2: linear-gradient(rgba(224, 224, 224, 0) 0%, rgba(237, 226, 216, 0.64) 5%, rgba(230, 230, 229, 0.03) 24%, rgba(230, 230, 230, 0) 89%, rgba(23, 15, 6, 0.17) 98%, rgba(26, 15, 4, 0.88) 100%);
  --gradient-brand-3: linear-gradient(rgba(26, 15, 4, 0.88) 0%, rgba(23, 15, 6, 0.17) 2%, rgba(230, 230, 230, 0) 6%, rgba(230, 230, 229, 0.03) 18%, rgba(230, 230, 229, 0.03) 28%, rgba(237, 226, 216, 0.64) 37%, rgba(224, 224, 224, 0) 69%);
}

11. Font and Typography
Body : sans-self
Headings : Averia Serif Libre
Monospace : Geist Mono