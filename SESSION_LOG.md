# Session Log

## [2026-09-14 21:48] Updated Project Links to Live Deployments
- **Accomplishments**:
  - **Updated Project Destination URLs in [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx)**:
    - **PlantVision AI**: Updated destination link from GitHub repo to live deployment `https://plant-vision-ai-psi.vercel.app`.
    - **Smart Car Parking**: Updated destination link from GitHub profile to live deployment `https://smartcarparking.netlify.app`.
    - **Dress Up**: Retained GitHub repository link `https://github.com/RazeO1/Dress-up`.
  - **Verification & Build**:
    - Ran Next.js production build (`cmd /c "npm run build"`) with 0 errors and static prerendering.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Updated `link` properties for PlantVision AI and Smart Car Parking.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented the update.

## [2026-09-14 21:02] Refined Contact Section: Removed Coordinates & Transmission Badge, Colored Apostrophe Red
- **Accomplishments**:
  - **Removed Red-Circled Elements**:
    - Removed coordinate telemetry (`// 12.9716° N, 77.5946° E • BENGALURU NODE`) from the top-left header in [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx), while preserving the right-aligned availability status and live Bengaluru IST clock.
    - Removed decorative badge `[ TRANSMISSION PROTOCOL ]` above the monumental headline.
  - **Colored Green-Circled Apostrophe Red**:
    - Styled the apostrophe in `Let's` with vermilion red (`<span className="text-[#de3421]">&apos;</span>`), creating balanced typographic punctuation synergy with the red period after `bold.`.
  - **Verification & Build**:
    - Next.js production build (`cmd /c "npm run build"`) passed with 0 errors and static prerendering.
    - Visually verified changes in browser via Playwright.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Removed header coordinates, removed transmission protocol badge, and applied vermilion red color to apostrophe.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented the update.

## [2026-09-14 20:05] Upgraded Projects Section: Pure Picture Tiles (Nudot Studio Style), Integrated Dress Up, Removed FarmWing
- **Accomplishments**:
  - **Implemented Pure Picture Tiles (Zero Text, Matching Nudot Studio)**:
    - Replaced all text/word content on the project tiles with pure edge-to-edge authentic app screenshots in [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx):
      - **Tile 01**: `PlantVision AI` (`public/Projects/PlantVision AI.png`)
      - **Tile 02**: `Smart Car Parking` (`public/Projects/Smart Car Parking.png`)
      - **Tile 03**: `Dress Up` / TAG (`public/Projects/TAG.png`)
    - Completely stripped all text labels, titles, descriptions, metrics, badges, and buttons off the tiles.
    - Designed sleek `aspect-[16/10]` rounded panels with hairline inner border rings, deep shadows (`shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)]`), and hover zoom transitions (`group-hover:scale-[1.04]`).
  - **Integrated Dress Up & Removed FarmWing**:
    - Removed `FarmWing Precision UAV` from the project lineup.
    - Integrated `Dress Up` (TAG / Wardrobe OS) with repository link `https://github.com/RazeO1/Dress-up`.
    - Added comprehensive metadata: Real-time Cost-Per-Wear (CPW) telemetry, AI background segmentation, and 6 canonical wardrobe taxonomies.
  - **Re-calibrated GSAP Scroll Scrub Choreography**:
    - Synchronized the 3 flagship projects along the pinned `ARCHIVE OF THE SELECTED WORKS` stage (`h-[320vh]`):
      - **Card 1 (Left Flank)**: Enters 0.05 -> exits 0.48 (PlantVision AI)
      - **Card 2 (Right Flank)**: Enters 0.32 -> exits 0.75 (Smart Car Parking)
      - **Card 3 (Centerpiece)**: Enters 0.58 -> exits 0.98 (Dress Up)
    - Preserved interactive floating `VIEW` cursor disc and direct 1-click external navigation.
  - **Verification & Build**:
    - Successfully passed Next.js production build (`cmd /c "npm run build"`) with 0 errors.
    - Verified layout, card proportions, image rendering, and scroll choreography in browser via Playwright.
    - Updated AST knowledge graph using `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Replaced word tiles with authentic screenshot cards, integrated Dress Up, removed FarmWing, and recalibrated 3-card GSAP timeline.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented the update.

## [2026-09-14 12:40] Added Authentic Photos to 3D Experience Cube & Synchronized Background Dossiers
- **Accomplishments**:
  - **Applied Authentic Photos to 3D Cube Faces**:
    - Integrated real photos from `public/Experience pics/` onto all 6 watertight faces of the 3D rotating cube in [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx):
      - **Face 1 (Front)**: `01_hero.jpg` (Hero in Malaysia / Research Intern)
      - **Face 2 (Left)**: `02_team.jpg` (Lab cohort & team)
      - **Face 3 (Back)**: `03.png` (Canselori UniMAP)
      - **Face 4 (Right)**: `05_presentation.jpg` (Research defense)
      - **Top Face**: `04_top of the cube.jpg` (FKTE faculty)
      - **Bottom Face**: `06 bottom of the cube.png` (Perlis/Penang coastline)
    - Added subtle dark gradient vignettes, fine 1px borders (`border-white/20`), and sleek museum-grade pill index badges (`01 // RESEARCH INTERN`, `02 // COHORT & LAB`, etc.) to each face.
  - **Transferred Technical Details into Dynamic Background Text Dossiers**:
    - Extracted all technical research content, benchmarks, mathematical formulas, and telemetry out of the cube and into 4 dynamic editorial background exhibits:
      - **Exhibit 01**: UniMAP Research Appointment & Faculty of Intelligent Computing specs.
      - **Exhibit 02**: Latency-Aware Multi-Temporal Transformer (`LAMTT`), joint loss formula, and ~62ms inference stats.
      - **Exhibit 03**: Edge vs Cloud Pipeline architecture, Dockerized microservice pipeline, and latency comparison bar chart.
      - **Exhibit 04**: Wireless Sensing AI, Angle-of-Arrival (AoA) estimation theorem, and polar radar vector graphic.
    - Implemented stepwise cube rotation (`getCubeRotation`) that aligns each exhibit with its corresponding photo face as the user scrolls, with smooth cubic-bezier ease transitions.
    - Tuned left flank containers to `w-full md:w-[280px] lg:w-[320px] xl:w-[360px]` and softened the background dot-matrix marquee ribbon to `opacity-[0.06]` to ensure zero visual collision with the central 3D cube.
  - **Image Sizing & Quality Specifications Determined**:
    - Analyzed the cube's CSS rendering box (`~365px × 365px` on desktop, `~243px × 243px` on mobile) against 2x and 3x device pixel ratios.
    - Formulated the exact optimal specifications: **800 × 800 px** (or **1000 × 1000 px** for 4K/3x), **WebP** at **80–85% quality**, **72 DPI**.
  - **Verification & Build**:
    - Executed Next.js production build (`cmd /c "npm run build"`) which compiled successfully with exit code 0.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Integrated cube photos, created synchronized background exhibit dossiers, and tuned layout clearance.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented the update.

## [2026-09-14 11:58] Removed 'SECTION 02 / SHOWCASE' Header Label from Showcase Section
- **Accomplishments**:
  - **Removed Red-Circled Section Label**:
    - Analyzed user screenshot (`Screenshot 2026-09-14 115222.png`) and located the red-circled decorative badge `SECTION 02 / SHOWCASE`.
    - Removed the decorative label element (`<div className="mb-3"><span className="font-mono text-xs uppercase tracking-widest text-[#de3421] font-bold">Section 02 / Showcase</span></div>`) from [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx).
    - Preserved clean editorial focus directly on the `Interactive Sketchbook` display heading (`Averia Serif Libre`).
    - Verified dynamic alignment with [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx) which dynamically queries the `<h2>` element.
  - **Verification & Build**:
    - Ran Next.js production build (`cmd /c "npm run build"`) with 0 TypeScript/ESLint errors and successful static page generation.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed `Section 02 / Showcase` decorative label above the main title.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented the update.

## [2026-09-13 22:48] Removed Floating Navbar from Contact Section & Linked Bottom Name to Hero Section
- **Accomplishments**:
  - **Removed Floating Navbar from Contact Section**:
    - Updated [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx) scroll handler to detect when the user reaches the Contact section (`contactRect.top <= window.innerHeight * 0.5`).
    - Configured `setIsVisible(false)` and `setIsOpen(false)` when entering Contact so the floating navigation button completely disappears (`opacity-0 pointer-events-none`).
    - The navbar seamlessly reappears when scrolling back up towards Projects or earlier sections.
    - Symmetrized the Contact header padding (`px-6 md:px-12 lg:px-16`) and removed the mobile About button from [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx) to ensure zero navbar clutter.
  - **Linked Monumental Name to Hero Section**:
    - Added `id="hero"` to the Hero section container in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx).
    - Wrapped the monumental `YASH RAJ ↗` typography at the bottom of [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx) in an accessible interactive button.
    - Attached smooth Lenis scroll (`lenis.scrollTo(0, { duration: 1.5 })` with `window.scrollTo` fallback) back up to the Hero section upon click.
    - Added hover micro-interactions: cursor pointer, arrow translate `↗` + vermilion accent shift (`#de3421`), and text soft lightening.
  - **Verification & Testing**:
    - Ran Next.js production build (`cmd /c "npm run build"`) which completed with exit code 0.
    - Verified via Playwright automation:
      1. Confirmed `SectionNavbar` computed opacity is `"0"` and `pointerEvents: "none"` in Contact.
      2. Clicked `YASH RAJ ↗` and verified smooth programmatic scroll from `scrollY = 13386.4` back to `scrollY = 0` (Hero section).
    - Ran `graphify update .`.
- **Key Files Modified**:
  - [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx): Hidden on Contact section.
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Removed header navbar elements, made `YASH RAJ ↗` clickable to scroll to Hero.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Added `id="hero"` to hero wrapper.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Documented changes.

## [2026-09-13 22:35] Implemented Architectural Blueprint Redesign for Contact Section (Variant 1)
- **Accomplishments**:
  - **Redesigned Contact Section (`src/components/Contact.tsx`)**:
    - Replaced the generic layout with the requested "Mission Control / Architectural Telemetry Blueprint" (Variant 1).
    - Preserved essential personal elements:
      - Monumental quote: *"Let's start something bold."* with vermilion period (`#de3421`).
      - Studio telemetry: Live Bengaluru IST clock (`Asia/Kolkata`, UTC+5:30) and pulsing green beacon (`AVAILABLE FOR WORK`).
      - Monumental cropped `YASH RAJ ↗` typography anchored edge-to-edge across the bottom baseline.
    - Excluded the intent selector chips (`6G & ... Architecture`) as explicitly instructed.
    - Added 2x2 architectural action matrix with subtle corner crosshair ticks (`+`), hairline borders, and hover micro-interactions:
      1. `01 // DIRECT TRANSMISSION`: `hiiam@yashraj.dev` with 1-click clipboard copy feedback (`COPIED TO CLIPBOARD!` + animated ping indicator) and mailto fallback.
      2. `02 // RESEARCH DOSSIER`: `Yash_Raj_Resume.pdf` with direct PDF download trigger.
      3. `03 // CODE ARTIFACTS`: `github.com/yraze` with GitHub SVG icon and external link.
      4. `04 // NETWORK WIRE`: `linkedin.com/in/yraze` with LinkedIn SVG icon and external link.
    - Added studio geolocation coordinates: `// 12.9716° N, 77.5946° E • BENGALURU NODE`.
    - Adjusted header right padding (`pr-20 md:pr-28 lg:pr-32`) to guarantee comfortable clearance from the fixed floating sound/navigation trigger button.
    - Kept `bg-transparent` so the master continuous `#050505` obsidian canvas and dot grid from `#unified-canvas-container` remain seamless.
  - **Verification & Build**:
    - Ran Next.js production build (`cmd /c "npm run build"`) with 0 errors and clean static page generation.
    - Live visual verification via Playwright in browser: confirmed layout, typography hierarchy, tick alignment, and live IST time.
    - Updated AST knowledge graph using `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Complete redesign to Blueprint Matrix Variant 1 without intent chips.
  - [`SESSION_LOG.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/SESSION_LOG.md): Updated session history.

## [2026-09-13 21:26] Removed 'ENGINEERED SYSTEMS' Header & Unified Canvas Transition Between Experience and Projects
- **Accomplishments**:
  - **Removed Orange-Circled Header**:
    - Removed `<header>` containing `ENGINEERED SYSTEMS • YASH RAJ` from [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx) as requested in user feedback screenshot (`Screenshot 2026-09-13 205554.png`).
  - **Eliminated Yellow-Circled Canvas Background Seam Between Experience & Projects**:
    - Extracted and enhanced contrast of the yellow-circled region using OpenCV (`amplified.png`).
    - Discovered that [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx) still contained a local radial spotlight (`bg-[radial-gradient(circle_at_50%_50%,rgba(222,52,33,0.08)_0%,rgba(15,15,15,0.25)_50%,transparent_85%)]`).
    - When Experience unpinned and scrolled up, this spotlight abruptly cut off along its pinned viewport boundary, jumping from warm glow RGB `(14, 8, 8)` / `(8, 8, 8)` to pure dark canvas RGB `(5, 5, 5)`.
    - Removed this local radial gradient from `Experience.tsx`, leaving Experience, Projects, and Contact 100% `bg-transparent`.
    - Both sections now directly expose the continuous `#050505` obsidian canvas and aligned 24px micro dot-grid from `#unified-canvas-container` in [`page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx).
    - Verified 100% pixel uniformity across the scroll boundary (`BGR=(5, 5, 5)` across all test coordinates).
  - **Build & Verification**:
    - Verified live transition in browser via Playwright screenshot.
    - Production build (`cmd /c "npm run build"`) passed with zero errors.
    - Updated AST knowledge graph with `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Removed `ENGINEERED SYSTEMS • YASH RAJ` header bar.
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Removed local radial spotlight.

## [2026-09-13 20:53] Fixed Experience Cube Disappearing on Subsequent Scroll Re-entrances
- **Accomplishments**:
  - **Diagnosed Frame-by-Frame Regression from User Video**:
    - Analyzed user screen recording (`Screen Recording 2026-09-13 202113.mp4`, 00:00:05 to 00:00:12) by extracting dense frames at 30 fps using OpenCV.
    - Pinpointed that on initial scroll into Experience, the 3D cube rendered and tumbled properly. However, when scrolling back up into Skills and scrolling down into Experience again, the cube was completely absent while background telemetry and marquee continued to render.
    - Traced root cause to `onLeaveBack` in [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx):
      - `onLeaveBack` executed `gsap.set(scene, { scale: 0.001, rotationX: -15, rotationY: baseRotY })`.
      - `scene` is the 3D perspective viewport (`sceneRef.current`), NOT the scaled container (`sceneWrapperRef.current`) or the rotating cube (`cubeRef.current`).
      - In `onUpdate`, GSAP updates `scale` on `sceneWrapper` and rotations on `cube`, but never touches `scale` or transforms on `scene`.
      - Consequently, `scale: 0.001` remained permanently stuck on `scene` after the first upward scroll, shrinking the 3D cube down to 0.27px (invisible).
  - **Applied Watertight Hierarchy Reset**:
    - Targeted `sceneWrapper` for `scale: 0.001` in `onLeaveBack` and component initialization.
    - Targeted `cube` for `rotationX: -15, rotationY: baseRotY, rotationZ: 0`.
    - Added `gsap.set(scene, { clearProps: "transform,scale,rotationX,rotationY" })` to ensure `scene` remains completely free of any residual transform styles.
  - **Live Browser Verification & Production Build**:
    - Verified live behavior in browser via Playwright: scrolled into Experience (cube rendered), scrolled all the way back up into Skills (`onLeaveBack` fired), and scrolled back down into Experience (cube rendered with full size and all exhibits intact).
    - Production build (`cmd /c "npm run build"`) compiled cleanly with exit code 0.
    - Updated AST knowledge graph with `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Fixed `onLeaveBack` and initialization targets to manipulate `sceneWrapper` and `cube` instead of `scene`, and cleared transforms on `scene`.

## [2026-09-13 00:15] Removed Y' Header Monogram & Unified Background Across Projects and Contact
- **Accomplishments**:
  - **Removed Red-Circled Y' Monogram from Contact Header**:
    - Removed `Y' // CONTACT • 2026` from the top-left of [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx) as requested in user feedback screenshot (`Screenshot 2026-09-12 235831.png`).
    - Adjusted the header to `justify-end` so the studio telemetry (`AVAILABLE FOR WORK`) and live clock remain pinned cleanly on the right.
  - **Unified Canvas Background Between Projects and Contact (Eliminated Seam)**:
    - Diagnosed the cause of the distinct background in the orange-circled area between Projects and Contact:
      - `Projects.tsx` had a local `720px` white glow (`bg-white/[0.045]`) that abruptly cut off when its pinned viewport stage ended, elevating RGB from `#050505` (5, 5, 5) to (13, 13, 13).
      - Both `Projects.tsx`, `Contact.tsx`, and `Experience.tsx` had duplicate local dot-grids stacking at different opacities on top of the parent container.
    - Removed all local spotlight circles and duplicate dot-grids from `Projects.tsx`, `Contact.tsx`, and `Experience.tsx`.
    - Let the master `#unified-canvas-container` in `page.tsx` provide the single continuous `#050505` background and micro dot-grid.
    - Python pixel sampling verified 100% uniform RGB `(5, 5, 5)` across the entire Projects-to-Contact transition.
  - **Build & Verification**:
    - Production build (`npm run build`) passed with zero errors.
    - Verified live transition in browser via Playwright screenshot.
    - Updated AST knowledge graph with `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Removed `Y'` monogram, adjusted header alignment, and removed local glow and dot-grid.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Removed local spotlight and duplicate dot-grid.
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Removed duplicate dot-grid.

## [2026-09-12 23:58] Enhanced Contact Name Scale, Boldness & Added Brutalist Diagonal Arrow
- **Accomplishments**:
  - **Monumental Scale & Enhanced Boldness for Name**:
    - Increased `YASH RAJ` typography to `text-[17.2vw] sm:text-[17.8vw] lg:text-[18vw]` with tight `tracking-[-0.045em]`.
    - Added `WebkitTextStroke: "0.018em currentColor"` alongside `font-black` (weight 900) to significantly boost the stroke density, solid visual weight, and punchy brutalist presence matching `NOTHIN'` in the reference poster screenshot.
  - **Integrated Brutalist Diagonal Arrow**:
    - Modeled after the reference screenshot mark at the end of `NOTHIN'`: placed immediately to the right of `RAJ` and aligned with the cap-height of the letters.
    - Designed custom vector SVG diagonal arrow (`↗`) with `strokeWidth="3.8"`, `strokeLinecap="square"`, and `strokeLinejoin="miter"`, echoing the geometric flat-cut terminals of the font.
    - Sized in relative font units (`0.38em`), guaranteeing responsive proportional scaling across mobile (390px) up to 4K displays.
  - **Build & Live Browser Verification**:
    - Next.js production build (`npm run build`) passed with zero errors.
    - Verified live rendering across viewports (1440x900 desktop and 390x844 mobile) via Playwright.
    - Updated AST knowledge graph with `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Scaled up h1 typography, added text stroke, and embedded responsive diagonal arrow SVG.

## [2026-09-12 23:50] Removed GhostCursor Completely & Fixed Premature Experience Marquee Ribbon Visibility
- **Accomplishments**:
  - **Removed GhostCursor Entirely from Contact and Portfolio**:
    - Removed `GhostCursor` import and component invocation from [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx).
    - Permanently deleted `src/components/GhostCursor.tsx` and `src/components/GhostCursor.css`.
    - Maintained pure, pristine `#050505` obsidian dark canvas with micro dot-grid across Experience, Projects, and Contact without any canvas or shader overhead.
  - **Fixed Premature Marquee Ribbon Visibility in Experience Section**:
    - Diagnosed visual bug from screen recording where the continuous dot-matrix marquee text ribbon (`RESEARCH INTERN (UniMAP) ...`) was prematurely visible when first scrolling down to Experience.
    - Set initial transform `translateY(130%)` directly in JSX styles and GSAP initialization to ensure the marquee remains 100% hidden behind its mask before section activation.
    - Added `onLeaveBack` in GSAP `ScrollTrigger` to cleanly reset the marquee, 3D cube scale (`0.001`), and corner telemetry blocks when scrolling back up into Skills.
  - **Build & Verification**:
    - Next.js production build (`cmd /c "npm run build"`) compiled cleanly with zero errors.
    - Updated AST knowledge graph with `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Removed GhostCursor component and imports.
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Added initial `translateY(130%)` inline style, GSAP initial state, and `onLeaveBack` reset handler.
  - Deleted `src/components/GhostCursor.tsx` and `src/components/GhostCursor.css`.

## [2026-09-12 23:30] Unified Canvas Background across Experience, Projects, and Contact with Red GhostCursor in Contact
- **Accomplishments**:
  - **Unified Canvas Architecture Across Experience, Projects & Contact**:
    - Removed the full-page sticky GhostCursor wrapper from across all three sections.
    - Wrapped Experience, Projects, and Contact inside a single master container (`#unified-canvas-container`) sharing the identical deep obsidian black palette (`#050505`) and an aligned continuous 24px micro dot-grid (`opacity-[0.03] bg-[radial-gradient(#fff_1px,transparent_1px)]`).
    - Standardized backgrounds in `Experience.tsx`, `Projects.tsx`, and `Contact.tsx` to `bg-transparent`, eliminating dividing borders (`border-t border-white/10`) and background mismatch lines so the three sections look like one seamless, continuous dark canvas.
  - **Red GhostCursor Effect in Contact Section**:
    - Integrated `GhostCursor` exclusively into `Contact.tsx` positioned in the background (`zIndex: 0`).
    - Configured the cursor trail with the portfolio's primary signature vermilion red (`#de3421`), high-fashion bloom, organic smoke turbulence, and smooth fade-out.
    - Updated `GhostCursor.tsx` shader to discard sub-threshold bloom coverage (`coverage < 0.025`), eliminating any background haze and keeping the obsidian black background 100% pure and deep.
  - **Build & Live Browser Verification**:
    - Next.js production build (`next build`) compiled cleanly with exit code 0.
    - Verified in live browser across Experience, Projects, and Contact using Playwright.
    - Confirmed zero visual seams, crisp typography, and interactive red smoke trail in Contact.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Created unified `#unified-canvas-container` with continuous dot-grid for Experience, Projects, and Contact; removed global GhostCursor wrapper.
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Integrated red GhostCursor effect (`#de3421`), set `bg-transparent`, removed top border line.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Updated section background to `bg-transparent` to inherit the unified `#050505` canvas.
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Set section and pinned stage to `bg-transparent` and softened radial spotlight.
  - [`src/components/GhostCursor.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/GhostCursor.tsx): Added window-level hit testing, sub-threshold alpha discard, and default `normal` blend mode for pure black background transparency.

## [2026-09-12 22:50] Created Monumental Brutalist Contact Section
- **Accomplishments**:
  - **Recreated Reference Screenshot Layout & Aesthetics**:
    - Modeled after user reference image (`Screenshot 2026-09-07 201303.png`), replacing the placeholder contact section with a dedicated, monumental poster component ([`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx)).
    - **Header Bar**: Features `Y'` monogram (inspired by the reference `N'`), studio telemetry (`// CONTACT • 2026`), live IST/Bengaluru clock, and active work availability status (`AVAILABLE FOR WORK`).
    - **Headline**: High-impact, 2-line grotesque headline using `Inter Tight`: *"Let's start / something bold"* with tight `leading-[0.93]` and `tracking-[-0.035em]`.
    - **Interactive Action Pills**: 4 pill buttons with crisp SVG icons, clean hover inversions, and micro-interactions:
      1. **Drop an Email (`@`)**: Opens mailto and copies `hiiam@yashraj.dev` to clipboard with real-time feedback toast.
      2. **Resume (`↓`)**: Dedicated download button prepared for `/resume.pdf` (`Yash_Raj_Resume.pdf`).
      3. **GitHub (`↗`)**: Links directly to `https://github.com/yraze` with official GitHub Octocat SVG.
      4. **LinkedIn (`↗`)**: Links directly to `https://www.linkedin.com/in/yraze` with official LinkedIn SVG.
    - **Right Column Direct Channels**: Vertical channel list mirroring `Linkedin / Instagram / Behance` from reference, pairing each service with its official symbol and arrow indicator.
    - **Full-Bleed Monumental Name**: Anchored edge-to-edge across the bottom with `text-[17vw]` bold uppercase `YASH RAJ`, subtly cropped at the bottom baseline for authentic editorial poster framing.
  - **Cross-Platform Verification & Responsive Polish**:
    - Tested across desktop (1440x900) and mobile (390x844) viewports via Playwright.
    - Verified single-screen viewport fit (`h-screen min-h-[620px] max-h-[1080px]`).
    - Fixed loader exit tween opacity to guarantee crisp entrance transitions.
    - Production build (`next build`) and `graphify update .` completed with zero errors.
- **Key Files Modified**:
  - [`src/components/Contact.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Contact.tsx): Brand-new dedicated Contact section component.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Replaced inline placeholder contact and footer with `<Contact />`.
  - [`src/components/Loader.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Loader.tsx): Added `opacity: 0` to exit timeline tween for flawless background fade-out.



## [2026-09-12 22:30] Eliminated 3D Head Flicker on About Drawer Open
- **Accomplishments**:
  - **Identified Single-Frame Head Flash Root Cause**:
    - Extracted dense frames at 30 fps from user reference video (`Screen Recording 2026-09-12 213844.mp4`, 00:00:00 to 00:00:02) using OpenCV.
    - Pinpointed the flash to Frame 025 (0.833s), where the full unclipped chrome avatar rendered over the About headline for 1 frame before disappearing at Frame 026 (0.867s) and starting liquid emergence at 1.500s.
    - Traced root cause to two factors:
      1. Default shader uniforms in [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) initialized `uLiquidActive: 0.0` and `uScanY: 0.0`. Before `useEffect` could arm the liquid uniforms upon `isGenerating` becoming true, the GPU fragment shader allowed all geometry fragments to pass without discard.
      2. The `<group>` containing the avatar mesh had no conditional visibility gate, rendering during the drawer's initial slide-in delay.
  - **Zero-Flicker Emergence Architecture**:
    - Added `hasGenerated?: boolean` prop through [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) and [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx).
    - Initialized `liquidUniforms` dynamically: `uScanY: hasGenerated ? 999.0 : -999.0` and `uLiquidActive: hasGenerated ? 0.0 : 1.0`. For ungenerated state, all fragments are strictly discarded at shader compile/mount time (`effY > -999.0` evaluates true).
    - Gated `<group visible={hasGenerated || isGenerating}>` so Three.js ignores the mesh during drawer entrance prior to emergence.
    - Guarded blinking animation loop so it only plays when `hasGenerated && !isGenerating`.
    - Protected tap interaction overlay (`hasGenerated ? "pointer-events-auto" : "pointer-events-none"`).
  - **Playwright Verification & Production Build**:
    - Verified live behavior across drawer opening, liquid emergence rise, eye-opening completion, and drawer close/re-open.
    - Confirmed zero visual flicker or premature mesh flash.
    - `next build` passed with exit code 0.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Added `hasGenerated` prop, configured default clipping uniforms, gated group visibility and blink loop.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Passed `hasGenerated` to `<About3D />`, gated tap hitbox.



## [2026-09-12 21:35] Experience Section Refinements: Removed Header & HUD Pills, Centered DOWN Prompt, Staggered Corner Telemetry
- **Accomplishments**:
  - **Removed Red-Circled Elements**:
    - Removed the top header bar (`Section 04 // Research Experience` and `6.4449° N, 100.1982° E AI-NATIVE 6G LAB`) from [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx).
    - Removed the bottom HUD navigation pills (`[01 LAB]`, `[02 LAMTT]`, `[03 EDGE ENGINE]`, `[04 WIRELESS SENSING]`) and retired unused React state (`activeFace`) for zero unnecessary scroll re-renders.
  - **Moved Yellow-Circled Element (DOWN Prompt)**:
    - Moved the `DOWN` indicator from the bottom-right corner to horizontally centered directly below the 3D cube (`absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2`).
    - Integrated authentic nudot 5-square pixel chevron SVG (`258x155` viewBox) and uppercase monospace `DOWN` typography.
    - Added click-to-scroll functionality supporting Lenis smooth scroll and native fallback, and added graceful fade-out as section ends.
  - **Sequential Staggered Scroll for Green-Circled Corner Elements**:
    - Assigned dedicated refs (`itemURef`, `itemNRef`, `itemIRef`, `itemMRef`) to each corner telemetry block.
    - Implemented `calculateTelemetryTransform` mapping each corner block to its respective exhibit phase:
      - `U` (Research Scope): Active during Exhibit 01 tumble entrance (`0.04 -> 0.38`).
      - `N` (Faculty of Intelligent Computing): Enters during Exhibit 02 LAMTT orbit (`0.30 -> 0.56`).
      - `I` (System Telemetry: Edge Nodes Online): Enters during Exhibit 03 Edge Engine orbit (`0.48 -> 0.74`).
      - `M` (Validation Stats: ~62ms Infer Latency): Enters during Exhibit 04 Wireless Sensing orbit (`0.66 -> 0.94`).
    - Each block smoothly glides upward from `+30px` to `0px` during entrance, floats subtly (`-12px`) during its active showcase, and floats away to `-42px` as it fades out.
  - **Build & Verification**:
    - `next build` compiled cleanly with 0 errors.
    - Verified live rendering across all 4 phases using Playwright browser screenshots.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Removed header and HUD pills, centered DOWN button, implemented sequential corner telemetry choreography.


## [2026-09-12 19:50] Eliminated Cube Face Expansion & Preserved Consistent 3D Styling at End of Experience
- **Accomplishments**:
  - **Decoded End-of-Section Visual Regression**:
    - Analyzed user screen recording (`Screen Recording 2026-09-10 224309.mp4` 00:00:00–00:00:09) and reference frames.
    - Diagnosed that Phase 3 ("Hero Zoom") was expanding `--scene-size` up to `min(winW * 0.75, winH * 0.75)` (~750px+), forcing the Face 01 layout to stretch awkwardly into a giant flat window while dropping `currentScale` and fading out background typography.
  - **Preserved Constant 3D Solid Cube Geometry**:
    - Removed `zoomedSceneSize` expansion completely.
    - Locked `currentSceneSize` to `baseSceneSize` (or `180px` on mobile) and `currentScale = 1.35` continuously throughout the exhibit tour and the resting state at the end of the section.
    - Kept the continuous dot-matrix marquee (`titleMarquee`) and the background telemetry letters (`stmLayer`) fully visible without fading or exiting.
    - Calibrated HUD face jump mapping (`progressMap = [0.30, 0.43, 0.58, 0.73]`) with symmetrical quadrant indexing.
  - **Build & Live Browser Verification**:
    - `next build` compiled cleanly with exit code 0.
    - Verified in browser at 92% scroll offset: Face 01 remains in its compact, physical instrument card styling with 3D perspective and background telemetry intact.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Removed Phase 3 zoom expansion, kept constant 3D volume, stabilized background marquee and HUD tracking.

## [2026-09-12 19:33] Resolved GSAP quickTo Reset Warnings in Experience Component
- **Accomplishments**:
  - **Identified Warning Root Cause**:
    - Traced `rotateX not eligible for reset. Try splitting into individual properties` to `gsap.quickTo` in [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx).
    - Identified that `Hero3D.tsx:23:18` appeared as the source because it globally wraps `console.warn` to filter Three.js deprecations.
    - Diagnosed that GSAP's `quickTo` requires canonical transform names (`rotationX`, `rotationY`) rather than property aliases (`rotateX`, `rotateY`), as alias lookup fails internal PropTween comparison.
  - **Applied Canonical GSAP Properties**:
    - Updated `quickTiltX` and `quickTiltY` in [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx) to target `rotationX` and `rotationY`.
  - **Build Verification**:
    - `next build` compiled cleanly with exit code 0.
    - Updated AST knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Replaced `rotateX`/`rotateY` with `rotationX`/`rotationY` in `quickTo`.

## [2026-09-10 20:55] Refined Experience 3D Cube Motion & Perspective (Variant B Implemented)
- **Accomplishments**:
  - **Solved Forward Pitch Slant**:
    - Replaced the hardcoded `rotateX(14deg)` pitch slant with an upright architectural orientation (`rotateX: 2.5deg`), eliminating the unnatural leaning-forward look.
    - Added an elevated perspective camera (`perspective: 1300px`, `perspective-origin: 50% 38%`) so the brushed obsidian top lid remains naturally visible without distorting the vertical lines of the cube.
  - **Eliminated Flat-Card Morphing at Section Start**:
    - Replaced the flat initial state (`rotateY: 0deg`) with an isometric entrance tumbling from `-55deg` into `-32deg` as it zooms in from deep space (`scale: 0.35` &rarr; `1.0`, `opacity: 0` &rarr; `1.0`).
    - Both the front face and side face are visible from the very first frame of entry, immediately establishing an authentic 3D solid volume.
  - **Keyframed Exhibit Runway Motion**:
    - Choreographed smooth sequential pauses across all 4 UniMAP exhibits (`01 LAB`, `02 LAMTT`, `03 EDGE ENGINE`, `04 WIRELESS SENSING`).
    - Calibrated interactive HUD pill jump progress mapping (`[0.20, 0.45, 0.68, 0.92]`) to center each respective exhibit face on click.
  - **Decoupled 60fps Mouse Hover Parallax**:
    - Refined GPU-accelerated mouse tilt via `gsap.quickTo` on `cubeTiltRef` (`-ny * 14`, `nx * 16`), completely decoupled from React state to guarantee zero re-render instability.
  - **Build & Live Verification**:
    - `next build` compiled cleanly with exit code 0 (0 TypeScript, Turbopack, or ESLint errors).
    - Verified live rendering at multiple scroll offsets in headless Playwright browser.
    - Updated codebase knowledge graph via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): Perspective origin, base transform, and GSAP timeline keyframe motion pipeline updated.

## [2026-09-10 19:30] Integrated Research Experience Section & 3D Rotating Showcase Cube
- **Accomplishments**:
  - **Decoded Visual Reference (`Screen Recording 2026-09-02 200003.mp4` 00:03–00:09)**:
    - Extracted and analyzed frame sequences from user's screen recording showcasing a cinematic pinned dark stage with giant circular dot-matrix punch-card typography scrolling horizontally in the background, and a 3D rotating showcase cube in perspective space presenting multi-face engineering exhibits.
  - **Authentic Malaysian Research Internship Content Extracted**:
    - Extracted verified internship data from user's CVs (`New folder/YashRaj_CV_AI_Engineer (1).pdf`, `YashRaj_CV_Software_Developer (1).pdf`):
      - **Role**: AI/ML Research Intern — Intelligent Computing
      - **Institution**: Universiti Malaysia Perlis (UniMAP), Kangar, Perlis, Malaysia (Oct 2025 – Feb 2026)
      - **Key Achievements**: Architected Latency-Aware Multi-Temporal Transformer (LAMTT) for real-time 6G edge networks; ~62ms inference latency; +40% accuracy gain; edge-native microservice reducing cloud overhead by 67%; RSSI Angle-of-Arrival (AoA) wireless sensing with ~96% accuracy and mathematical proof of boundary ambiguity.
  - **Mathematical Dot-Matrix Typography System**:
    - Created an SVG dot-matrix renderer based on a 5x7 circular dot grid for each alphanumeric character (`DOT_GLYPHS`).
    - Rendered giant punch-card ribbons (`UNIMAP • 6G EDGE AI • ~62MS • SENSING • MALAYSIA`) interspersed with editorial mono notes.
    - Linked horizontal ribbon scrub to GSAP `ScrollTrigger` across the 380vh section runway.
  - **3D Rotating Showcase Cube (`Experience.tsx`)**:
    - Engineered a hardware-accelerated 3D rectangular prism (`perspective: 1300px`, `transform-style: preserve-3d`) with 4 distinct lateral faces:
      - **Face 01**: UniMAP Lab & 6G Edge Intelligence Appointment (concentric radar sweep schematic).
      - **Face 02**: The LAMTT Model & Joint Delay Loss Optimization (~62ms latency, +40% gain, attention waves).
      - **Face 03**: Edge-Native Microservice vs Cloud Overhead (67% overhead cut, Dockerized architecture diagram).
      - **Face 04**: RSSI Angle-of-Arrival Wireless Sensing (~96% accuracy, polar radiation beam chart).
    - Top plate features metallic obsidian finish with engraved coordinates (`6.4449° N, 100.1982° E`).
    - Interactive HUD pill tabs (`[01 LAB]`, `[02 LAMTT]`, `[03 EDGE ENGINE]`, `[04 WIRELESS SENSING]`) with instant face snapping.
    - Natural mouse-cursor perspective parallax tilt.
  - **Portfolio Integration & Section Harmonization**:
    - Mounted `<Experience />` between Section 03 (Skills) and Section 05 (Projects) in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx).
    - Updated Contact to `Section 06 / Get in Touch`.
    - Updated [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx) end card and skip buttons to target `#experience`.
    - Updated [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx) with dynamic dark theme detection for `#experience` and added `EXPERIENCE` to the Variant C kinetic curtain menu.
    - Updated [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx) navigation links to include `Experience`.
  - **Verified Build & Live State**:
    - Production build (`npm run build`) succeeded with code 0 (0 TypeScript, Turbopack, or ESLint errors).
    - Verified live at `http://localhost:3000` via Playwright with 3D perspective rotation, dot-matrix scrub, and HUD tabs.
    - Updated knowledge graph via `graphify update .`.
- **Key Files Modified/Created**:
  - [`src/components/Experience.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Experience.tsx): [NEW] Component with 3D rotating showcase cube, dot-matrix marquee, and UniMAP internship exhibits.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Mounted Experience component and synchronized section numbering.
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): Updated end card narrative and skip button to target Experience.
  - [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx): Added Experience section detection (dark theme) and curtain menu link.
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Added Experience link in header navigation.

- **Accomplishments**:
  - **Single Global Fixed Navbar**:
    - Consolidated all per-section navbar instances into a single global `<SectionNavbar>` mounted in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx).
    - Removed duplicate mounts from [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx), [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx), [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx), and `#contact`.
  - **Hero & About Exclusion**:
    - Excluded from the **Hero** section: strictly hidden (`opacity-0 pointer-events-none`) while above the Sketchbook section (`showcaseRect.top > 140`).
    - Excluded during the initial page loader (`isLoaded && !showLoader`).
    - Excluded while the **About** section drawer is open (`isAboutOpen = true`).
  - **Sketchbook Alignment & Dynamic Vertical Scroll Motion**:
    - In the Sketchbook section, the navbar button aligns pixel-perfectly with `"Interactive Sketchbook"` (`top: 116px`, center `140px`).
    - Moves strictly vertically with the user's scroll: as the user scrolls down, the button glides with the page until it reaches `top: 32px` (`top-8`, or `24px` on mobile), where it docks cleanly in the viewport.
    - Stays fixed and accompanies the user through Skills, Projects, and Contact sections along the right margin (`right-6 md:right-12`).
    - Scrolling back up returns the button seamlessly to the level of `"Interactive Sketchbook"`.
  - **Dynamic Theme Palette Switching**:
    - Automatically detects the active section in view:
      - **Showcase / Skills**: Dynamic light mode (warm paper `#fcf7f3` background, dark border and bars).
      - **Projects / Contact**: Dynamic dark mode (obsidian `#0A0A0A` background, white border and bars).
  - **Animatic Kinetic Curtain Overlay (Variant C)**:
    - Vertical clip-path shutter wipe (`[clip-path:inset(0%_0%_100%_0%)]` &rarr; `[clip-path:inset(0%_0%_0%_0%)]`) over 500ms `cubic-bezier(0.16, 1, 0.3, 1)`.
    - Masked typographic rise from `translate-y-[130%] rotate-[1.5deg]` with 45ms per-item stagger.
    - Ambient spotlight dimming of sibling items to `opacity-25 blur-[0.4px]` on hover.
    - Morphing pause (`||`) to cross (`×`) with tactile click feedback.
  - **Verified Build & Live State**: Production build (`npm run build`) succeeded with code 0 (zero errors). Tested on live `http://localhost:3001` via Playwright and verified pixel-perfect vertical alignment and dynamic scroll tracking. AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx): Dynamic vertical scroll tracking, alignment with Interactive Sketchbook, docking at `top-8`, dynamic palette, Variant C kinetic curtain.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Mounted single global SectionNavbar, passed `isAboutOpen` and `isLoaded`.
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed local SectionNavbar instance.
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): Removed local SectionNavbar instance.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Removed local SectionNavbar instance.
  - **Replaced Sci-Fi Laser with Organic Liquid Emergence ([`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx))**:
    - Extracted and analyzed frame-by-frame reference from user's screen recording of `gionatanwiese.com/about` (`C:\Users\hiiam\Videos\Screen Recordings\Screen Recording 2026-09-07 210529.mp4`).
    - Stripped out the generic sci-fi laser artifacts: discarded the cyan geometric ring meshes, flat additive discs, and horizontal laser plane.
    - Implemented organic multiscale liquid surface tension wave function in GLSL fragment shader (`calcLiquidWave`), creating an undulating liquid meniscus across the $X-Z$ plane.
    - Added high-fashion **deep cobalt / royal blue** (`#1438f2` / `#1d4ed8`) rim highlight blending into bright sapphire specular accents (`#60a5fa`) at the rising crest.
    - Configured `THREE.DoubleSide` rendering with interior cavity depth shading, reproducing the exact hollow liquid mercury bowl/vessel appearance visible during the rise.
    - Attached a dynamic royal blue point light (`#1d4ed8`, intensity 4.5) that tracks the rising crest to illuminate the chrome surface with authentic physical specular highlights.
  - **Cleaned Editorial Layout & Removed Cyberpunk HUD ([`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx))**:
    - Completely removed the video-game HUD overlay (`SYNTHESIS PROTOCOL ACTIVE // 3D CHROME CORE`, percentage ticker, progress bar).
    - Removed background blur and opacity hiding (`opacity-0 blur-md scale-95`); preserved the crisp, high-fashion editorial typography (`Averia Serif Libre`) so the chrome sculpture emerges organically directly in the center of the text.
    - Maintained temporary scroll lock during the 2.6s emergence to ensure the user experiences the initial reveal before exploring chapter content.
    - Kept avatar eyes closed during liquid emergence; upon reaching full height, eyes open smoothly over 0.7s and transition into natural breathing and blinking loops.
  - **Maintained Git Rollback Safety**:
    - Checkpoint tag `checkpoint-pre-laser` remains intact at commit `60ebe77` if the user commands "roll back".
  - **Verified Build**: Production build (`npm run build`) succeeded with code 0 (zero TypeScript / Turbopack errors). AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Liquid emergence shader, dynamic cobalt crest light, organic wave math.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Stripped HUD, unblurred editorial text, streamlined emergence trigger.


## [2026-09-07 20:30] Integrated Section-Adaptive Pause-to-Cross Navbar (Variant C)
- **Accomplishments**:
  - **Engineered Morphing `SectionNavbar` Component ([`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx))**:
    - **Trigger Button**: Anchored at `absolute top-6 right-6 md:top-8 md:right-12 z-40`, featuring GPU-accelerated 240ms `cubic-bezier(0.16, 1, 0.3, 1)` spring transforms that smoothly morph a dual-pillar pause symbol (`||`) into a cross (`×`).
    - **Color Harmonization**: Automatically adapts to section background tokens (`theme="light"` for `#fcf7f3` paper canvas; `theme="dark"` for `#0A0A0A` obsidian backdrop) with signature vermilion `#de3421` hover states.
    - **Variant C Kinetic Editorial Curtain**: Expands a full-viewport translucent backdrop-blur portal revealing 6 monumental section links with staggered micro-delays, numbered badges, descriptive metadata, and a colophon with direct social links (`GitHub`, `LinkedIn`, `hiiam@yashraj.dev`).
    - **Smooth Navigation Integration**: Connects with Lenis smooth-scrolling for all page sections (`home`, `showcase`, `skills`, `projects`, `contact`) and dynamically triggers the 3D sliding About drawer for `about`.
    - **Accessibility & Controls**: Bound to `Escape` key dismiss, backdrop dismissal, `aria-expanded` and `aria-label` screen reader attributes.
  - **Mounted Across Requested Sections**:
    - Mounted in **Showcase** ([`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx)) with `theme="light"`.
    - Mounted inside **Skills** pinned viewport ([`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx)) with `theme="light"` (stays pinned while scrolling horizontally).
    - Mounted inside **Projects** pinned stage ([`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx)) with `theme="dark"` (stays pinned while square project cards scroll past).
    - Mounted in **Contact** section ([`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx)) with `theme="dark"`.
    - Excluded from **Hero** and **About** per explicit specification.
  - **Verified Build & Live State**: Production build (`npm run build`) succeeded with code 0 (zero TypeScript / Turbopack errors). AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/SectionNavbar.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/SectionNavbar.tsx): [NEW] Component implementing the pause-to-cross button and Variant C curtain.
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Mounted SectionNavbar (light theme).
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): Mounted SectionNavbar (light theme) inside sticky container.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Mounted SectionNavbar (dark theme) inside pinned stage.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Mounted SectionNavbar (dark theme) in Contact and wired `onOpenAbout` triggers.

## [2026-09-07 20:16] Cleaned Top Header Bar from Skills Section
- **Accomplishments**:
  - **Removed Circled Header Element from Section 03 ([`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx))**:
    - Removed entire `<header>` element containing equalizer wave animation, `Section 03 / Core Stack - Technical Repertoire`, center descriptor note, and `Scroll ↓ → / Skip to Projects ↓` controls.
    - Removed `border-t border-black/10` from section boundary for seamless blending from the Sketchbook canvas.
  - **Layout Harmonization**:
    - The 4-row musical staff grid stage now centers vertically across the full viewport, giving generous open breathing room to the column indices and generative soundwaves.
  - **Verified Build**: Production build (`npm run build`) succeeded with code 0 (zero TypeScript / Turbopack errors). AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): Removed `<header>` bar and top border line.

## [2026-09-07 20:05] Cleaned Pinned Headline Overlays in Projects Section
- **Accomplishments**:
  - **Removed Circled UI Elements from Section 04 ([`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx))**:
    - Removed `● SEC 04 // ARCHIVE OF SELECTED WORKS` from top-left.
    - Removed `[05 WORKS]` count badge from top-right.
    - Removed `CHENNAI, IN | VEL TECH R&D INSTITUTE` location metadata from bottom-left.
  - **Layout Refinement**:
    - Top header now neatly centers `ENGINEERED SYSTEMS • YASH RAJ`.
    - Bottom status bar cleanly aligns `SCROLL DOWN TO EXPLORE ↓` to the right corner.
  - **Verified Build**: Production build (`npm run build`) succeeded with code 0 (zero TypeScript / Turbopack errors). AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Cleaned pinned backdrop header and footer markup.

## [2026-09-05 20:30] Pinned "Archive of Selected Works" & Alternating Floating Square Tiles (Nudot Studio Inspiration)
- **Accomplishments**:
  - **Decoded Reference Video (`00:00:16 - 00:00:25`)**: Extracted and analyzed frames from user's screen recording of `nudot.com.tw` demonstrating a pinned architectural headline in the center with floating project cards scrolling vertically across the viewport in an alternating trajectory (Left &rarr; Right &rarr; Left &rarr; Right &rarr; Center finale).
  - **Pinned Monumental Headline Background**: Implemented the pinned backdrop in [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx) using `sticky top-0 h-screen` containing `(REDEFINING THE VISUAL & INTELLIGENT THINKING OF SYSTEMS)`, monumental grotesque typography `ARCHIVE OF / THE SELECTED WORKS / BY YASH RAJ`, and atmospheric spotlight vignetting on deep obsidian `#0A0A0A`.
  - **Choreographed Alternating Square Tiles**: Integrated Yash Raj's 5 authentic projects from his resumes (*PlantVision AI, LAMTT 6G Edge AI, AIoT Smart Parking, GestureSpeak, FarmWing Precision UAV*) into 100% opaque, solid architectural square cards with unique procedural technical schematics, metrics, tags, and direct repository/paper/demo links.
  - **Silky Smooth GSAP Scrubbed Trajectory**: Wired a scrubbed GSAP timeline with `ScrollTrigger` driving each card from `window.innerHeight * 1.15` to `-window.innerHeight * 1.15` in an overlapping, non-colliding rhythm matching the exact timing of Nudot Studio.
  - **Interactive Floating "VIEW" Cursor Disc**: Created a DOM-driven magnetic liquid glass disc that tracks the mouse cursor with zero React re-renders, displaying a crisp `"VIEW"` badge on card hover.
  - **Verified Build & Live State**: Verified static compilation with `next build` (0 TypeScript / Turbopack errors) and confirmed visual layout, occlusion, and cursor interactions via Playwright screenshots. AST knowledge graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Complete revamp with pinned background, choreographed floating square tiles, and "VIEW" magnetic cursor.

## [2026-09-04 21:40] Restored Hero Card Border & Natural Scroll Flow into Sketchbook
- **Accomplishments**:
  - **Restored Hero Frame**: Restored the complete iconic Hero card frame, rounded corners (`rounded-xl`), black outline (`border border-black`), and drop shadow in [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx).
  - **Removed Sticky Slide-Over Transition**: Removed `sticky top-0 w-full h-screen z-10 overflow-hidden` from Hero in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx). When scrolling down, Hero naturally scrolls upward and `<Showcase />` follows directly beneath it in normal document flow, eliminating the layered curtain effect where Sketchbook slid on top of Hero.
  - **Seamless Canvas Harmonization**: Removed the top border (`border-t border-black/5`) from `<Showcase />` in [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx) and unified the background palette to `#fcf7f3`.
  - **Verified Build & Live State**: Verified via Playwright screenshots that Hero retains its full border styling, and confirmed with a 0-error `next build`.
- **Key Files Modified**:
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Reinstated original card frame and borders; preserved Skills nav link.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Changed Hero container from sticky to relative flow.
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed top divider border.

## [2026-09-04 21:28] Refined Skills Scale, Canvas Generative Harmonics, & Pinned Horizontal Scroll
- **Accomplishments**:
  - **Aesthetic Scale Harmonization**: Scaled down the musical grid stage to match the refined aesthetic of Yash Raj's portfolio:
    - Reduced row height from 160px to 86px (total 4-string grid height: 344px), fitting comfortably within any laptop or desktop screen.
    - Scaled skill typography from giant 175px to crisp, monumental `clamp(32px, 3.8vw, 52px)` with tight grotesque tracking.
    - Scaled icon discs from oversized 136px to elegant 52px solid ink discs with 24px crisp SVG icons.
    - Scaled column width to 320px and cover masthead to 150px.
  - **Canvas 2D Generative Harmonics Layer (`canvas-generative`)**: Built a dedicated, high-performance Canvas 2D background (`GenerativeStaffCanvas`) that renders DPR-sharp sinusoidal soundwave frequencies and a pre-allocated pool of 72 particles drifting along the 4 staff strings in vermilion `#de3421`, ochre `#d5802a`, and ink `#0A0A0A`, complete with delicate inter-node frequency filaments and hover resonance.
  - **Fixed Pinned Horizontal Scroll Mechanism**:
    - Identified that `overflow-x: hidden` on `<main>` was breaking standard CSS sticky and pin contexts, causing the section to scroll out of view vertically before horizontal movement could complete.
    - Replaced `overflow-x: hidden` with modern `overflow-x: clip` on `<main>` in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx), preserving horizontal overflow containment without breaking sticky/pin containers.
    - Calibrated the runway's dynamic vertical scroll distance (`scrollRange = maxHorizontal + 400px`) so that the horizontal scrub completes 100% across all 21 skills before the section releases and allows the page to scroll down into Section 04 (`#projects`).
    - Added an explicit "Repertoire Complete // Proceed to Projects ↓" end card and a "Skip to Projects ↓" quick jump button.
    - Fixed bottom jump filter link target calculations using `getBoundingClientRect().top + window.scrollY`.
  - **Verification**: Verified live via Playwright across multiple scroll positions; production build (`next build`) compiled cleanly with 0 TypeScript/ESLint errors; AST graph updated via `graphify update .`.
- **Key Files Modified**:
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): Refactored dimensions, added GenerativeStaffCanvas, and calibrated scroll range.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Changed `overflow-x-hidden` to `overflow-x-clip` on `<main>`.

## [2026-09-04 20:55] Production Integration of Paul Kalkbrenner Architectural Skills Section
- **Accomplishments**:
  - **Paul Kalkbrenner Architectural Grid**: Created [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx) mirroring the geometric ratios of `paulkalkbrenner.net` (560px column stripes, 160px row height, 136px solid note discs, 280px cover column).
  - **Portfolio Design System Harmonization**: Harmonized the component with the portfolio's palette (warm paper `#fcf7f3`, deep ink `#0A0A0A`, brand vermilion `#de3421`, ochre `#d5802a`, `Inter Tight` for monumental display, and `JetBrains Mono` for technical metadata).
  - **Section Placement**: Mounted `<Skills />` as **Section 03** in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx) directly following `<Showcase />` (Sketchbook) and preceding `<Projects />`.
  - **Navigation & Numbering Synchronized**:
    - Added `Skills` anchor link in [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx) navigation bar.
    - Updated [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx) to `Section 04 / Selected Works`.
    - Updated Contact in [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx) to `Section 05 / Get in Touch`.
  - **Kinetic GSAP ScrollTrigger Integration**: Configured pinned horizontal runway scrub with `useGSAP`, momentum parallax word drift (`.h-d-text`), real-time progress indicator, and interactive bottom jump filters.
  - **Mandated Sequence & Non-Colliding Musical Score**: Guaranteed `Python`, `React`, `Next.js`, `TypeScript`, `C++`, and `SQL` appear first with 0 row collisions across 17 columns and 21 skills.
  - **Verified Build & Graph**: `next build` passed with 0 TypeScript/ESLint errors; `graphify update .` updated AST graph.
- **Key Files Modified**:
  - [`src/components/Skills.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Skills.tsx): New production component.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Mounted `<Skills />` and updated section numbering.
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Added Skills nav link.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Updated to Section 04.
  - [`src/app/globals.css`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/globals.css): Imported `Inter Tight` and `JetBrains Mono`.

- **Accomplishments**:
  - **Reference Video Analysis**: Decoded screen recording clip (`00:00:00 - 00:00:04`) featuring a pinned kinetic typography galaxy stream, horizontal optical datum line, and central focal nexus.
  - **Awwwards Research & Benchmarking**: Researched and benchmarked 10 award-winning websites (Grigoletti, Studio Merge, Grafik, TWKS, Little Plains, Paul Kalkbrenner, Signal-A, Mad Monkey, Maria Vasilyeva, NexStudio) for high-end skills and services presentations.
  - **Resume Skills Synthesis**: Extracted verified technical skills from Yash Raj's 3 resumes (`Resume_linkedin.pdf`, `YashRaj_CV_AI_Engineer (1).pdf`, `YashRaj_CV_Software_Developer (1).pdf`) across 4 domains (Deep Learning, Computer Vision, Edge AI/MLOps, Full-Stack Systems), ensuring zero project content.
  - **Clean State**: Removed temporary prototype file (`public/skills-preview.html`) per user request to keep workspace clean.
- **Pending Tasks & Next Steps**:
  - Re-evaluate creative concepts for the Skills section to design a fresh, truly premium approach that natively fits the portfolio and 3D avatar.

## [2026-09-02 19:46] Pushed 3D Avatar Models and Hero Asset to GitHub
- **Accomplishments**:
  - **Tracked & Pushed Public Assets**: Added `public/chrome_avatar_blinking.glb`, `public/chrome_avatar_blinking.glb.bak`, `public/chrome_avatar.glb`, and `public/hero.jpg` to git tracking.
  - **Synchronized Remote**: Committed and pushed assets to `origin/main`.
- **Key Files Modified**:
  - `public/chrome_avatar_blinking.glb`
  - `public/chrome_avatar_blinking.glb.bak`
  - `public/chrome_avatar.glb`
  - `public/hero.jpg`

## [2026-09-02 00:08] Cleaned Repository & Removed Obsolete Screenshot Artifacts
- **Accomplishments**:
  - **Repository Cleanup**: Removed 12 obsolete Playwright screenshot image files (`conveyor_*.png` and `showcase_*.png`) from git tracking.
  - **Clean State**: Pushed all clean commits to GitHub `origin/main`.
- **Key Files Modified**:
  - Root directory screenshot PNGs deleted from git index.

## [2026-09-01 23:56] Disabled Sketchbook Hovering Levitation Animation
- **Accomplishments**:
  - **Static Grounding**: Removed the vertical hovering levitation loop (`@keyframes sb-float`) and shadow breathing animation (`@keyframes sb-shadow-breathe`) from `.sb-book` and `.sb-shadow-rig`.
  - **Preserved Dynamic 3D Interactivity**: Retained smooth mouse-tilt 3D perspective response, stage drag gestures, zoom controls, and realistic page curls with zero vertical bobbing or floating drift.
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed hover animations from `.sb-book` and `.sb-shadow-rig`.

## [2026-09-01 23:49] Unified All Sketchbook Spread Dimensions & Master Paper Silhouette with Full Artwork Preserved
- **Accomplishments**:
  - **Identical Master Sketchbook Dimensions**: Unified all 8 spreads (`1.png` through `8.png`) onto the canonical master sketchbook frame (`1890x832` canvas, exact `1797x775` paper silhouette, matching corner coordinates).
  - **Full Uncut Artwork Preservation**: Preserved 100% of all sketches, illustrations, notes, and watercolor drawings without cropping or erasing any artwork detail.
  - **Authentic Sketchbook Paper & Spine Integration**: Harmonized paper background tones and blended natural spiral ring bindings in the center gutter across all pages, ensuring every spread looks like an authentic page of the same physical sketchbook.
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - `public/showcase/*.png`: Processed and standardized all 8 spreads with unified geometry and full artwork.

## [2026-09-01 23:17] 100% Full Artwork Preservation, Zero Black Borders, and Exact Dimension Unification
- **Accomplishments**:
  - **100% Full Artwork Preservation**: Ensured no drawing, pencil stroke, or illustration detail is cropped, masked, or erased. The complete original artwork of every page (`1.png` through `8.png`) is fully displayed.
  - **Zero Black Borders**: Replaced uninitialized pitch-black boundary padding on top/bottom/side margins (especially on `"School's end"` / `7.png` and `8.png`) by seamlessly extending natural warm sketchbook paper gradients directly to the page edges.
  - **Identical Physical Dimensions**: All 8 spreads share the exact same `(1890, 832)` canvas size and the exact same `(1797 x 775)` paper silhouette (`Y=[28, 802]`, `X=[47, 1843]`), ensuring every page looks like it belongs to the exact same physical sketchbook with 0px variance.
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - `public/showcase/*.png`: Cleaned padding and extended natural paper while preserving 100% full artwork.
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Configured 7 spreads with `8.png`.

## [2026-09-01 23:09] Eradicated Black Borders Across Spreads, Aligned Page Geometry (100% Match), and Integrated Page 8 (`8.png`)
- **Accomplishments**:
  - **Integrated Page 8 (`8.png`)**: Added `/showcase/8.png` and its corresponding page milestone `"New Chapter"` to `pageUrls` and `PAGES` arrays in `Showcase.tsx` (7 total active spreads).
  - **Eliminated Black Borders Across All Margins**: Detected and replaced hard rectangular photo borders and pitch-black top/bottom strips (especially in `"School's end"` / `7.png` and `8.png`) with clean, continuous warm paper gradients and organic vignette transitions, ensuring all drawings look like hand-drawn sketchbook pages rather than photos.
  - **100.00% Geometric Homography & Silhouette Alignment**: Aligned all artwork spreads (`1.png` through `8.png`) to the canonical master open-book geometry and alpha silhouette of `1.png` (0px mask variance, identical `1890x832` canvas, matching corner coordinates).
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Added `8.png` and `"New Chapter"` spread to `PAGES`.
  - `public/showcase/*.png`: Cleaned borders, aligned geometry, and unified paper tones across all spreads.

## [2026-09-01 20:58] Refined 3D Cinematic Floating Shadow Rig and Levitation Physics
- **Accomplishments**:
  - **3D Cinematic Floating Shadow Rig**: Crafted a 4-tier atmospheric lighting and shadow rig inside `.sb-tilt` (`ambient` 44px soft pool, `floor-glow` warm bounce light reflection, `contact` 20px penumbra, and `core` 9px deep occlusion) positioned at `translateZ(-24px) translateY(24px)`.
  - **Weightless 3D Levitation**: Elevated `.sb-book` to `translateZ(18px)` with a subtle, silky-smooth 6-second hovering levitation cycle (`@keyframes sb-float`). Coupled the shadow rig with a synchronized optical breathing cycle (`@keyframes sb-shadow-breathe`) that dynamically softens and expands as the book rises, obeying real-world inverse-square lighting physics.
  - **Verified Reduced Motion & Build**: Added `@media (prefers-reduced-motion: reduce)` fallbacks and verified 0 errors on production build.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Implemented 4-tier cinematic floating shadow rig and synchronized levitation physics.

## [2026-09-01 20:50] Integrated 3D Zoom-Reactive Shadows, Fixed 90%-104% Dragging, and Capped Zoom to 127%
- **Accomplishments**:
  - **3D Zoom-Reactive Dynamic Shadows**: Shifted the cast shadow system completely into `.sb-tilt` using `transform: translateZ(-2px)` and realistic bottom projection (`bottom: -24%` ambient, `-14%` contact, `-7%` hairline). The shadow now dynamically scales and tilts with 3D perspective as the sketchbook zooms from 90% to 127% or tilts with mouse movements, while smoothly decaying with `--shade` during page curl turns. Removed the detached static container div.
  - **Stage-Level Pointer Capture (Fixed 90%-104% Zoom Dragging)**: Attached pointer down/move/up and pointer capture handlers to `stageRef` on `.sb-stage`. By capturing events on the 2D stage surface rather than the 3D transformed book container, drag gestures never suffer coordinate distortion or dropped events across any zoom level (including 90% to 104%).
  - **Fixed Zoom Cap at 127%**: Set `ZOOM_MAX = 1.27` (127%) and `ZOOM_MIN = 0.90` (90%), updating toolbar zoom buttons, slider boundaries, and percentage readout.
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Integrated 3D dynamic shadows, stage-level pointer capture, and fixed 127% zoom cap.

## [2026-09-01 20:45] Removed 2.png, Added Visible Ground Shadow, Full-Sized Page Dragging & 130% Zoom Cap
- **Accomplishments**:
  - **Removed Page 2 (`2.png`)**: Removed `/showcase/2.png` and the corresponding `Birth-Day` entry from `pageUrls` and `PAGES` arrays, bringing the total page spreads to 6 (Hometown, School, Hobbies (kid), Hobbies (Teen), Unforgettable Trip, School's end).
  - **Enhanced Ground Shadow**: Designed and integrated a multi-layered desk ground shadow beneath the `.sb-stage` containing an ambient diffuse glow, contact shadow, and crisp baseline hairline shadow to realistically ground the sketchbook.
  - **Universal Drag-to-Flip & Middle Page Dragging**: Updated pointer down/move/up tracking to use dynamic `getBoundingClientRect()` width calculations, ensuring dragging works smoothly across all zoom levels and screen sizes. Configured drag direction to dynamically resolve based on drag displacement (`dx < 0` => turn next, `dx > 0` => turn prev), allowing seamless page flips when dragging from the middle or any location on the spread.
  - **Capped Zoom to 130%**: Defined `ZOOM_MAX = 1.3` (130%) and `ZOOM_MIN = 0.9` (90%), updating toolbar zoom buttons, slider limits, and button disabled states accordingly.
  - **Verified Build**: Production compile passes with 0 errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed 2.png, upgraded ground shadow, implemented full-size/middle-page drag logic, and capped zoom at 130%.

## [2026-09-01 00:25] Removed Floating Tooltip and Grounded Sketchbook with Desk Shadow
- **Accomplishments**:
  - **Removed Tooltip**: Removed the floating, cursor-following tooltip JSX element, its ref (`tooltipRef`), and all coordinate calculations inside `handleWindowPointerMove` and window events.
  - **Grounded Sketchbook Shadow**: Added a soft, blurred 2D ground shadow beneath the `.sb-stage` (using a CSS radial-gradient effect on a scaled oval `div` with `filter blur-xl`). This anchors the sketchbook realistically on the flat desktop without tilting along with the 3D book cover, providing an immersive, high-quality material effect.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Removed floating page tooltip and added a flat ground shadow below the book stage.
- **Pending Tasks & Next Steps**:
  - Review overall sketchbook styling and responsive design across standard screen resolutions.
  - Optimize dynamic asset loading for the sketchbook PNGs to ensure fast loading times on slower connections.
  - Transition focus to next priority sections (e.g., Hero animations, Projects showcase, or Contact section).

## [2026-09-01 00:07] Refined Sketchbook Tooltip Aesthetic and Page Clicks
- **Accomplishments**:
  - **Refined Tooltip Design**: Replaced the modern black tooltip container with a warm, textured ivory paper style (`bg-[#fbf8f3]`), deep charcoal ink text (`text-[#2b2721]`), a subtle hairline border (`border-[#2b2721]/15`), and elegant display serif italics (`font-display italic text-[14px]`). This matches the classic analog paper-and-ink aesthetic of the sketchbook.
  - **Implemented Page Clicks**: Added dedicated `onClick` handlers (`handleZoneClick`) to the left and right sketchbook page hotspots. Tapping or clicking anywhere on the left or right page spreads now smoothly triggers a complete, animated page flip, resolving any touch/drag gesture collision issues.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Refined floating page tooltip style and implemented zone-level click handlers.

## [2026-08-31 23:56] Enabled Smooth Mobile Touch Dragging
- **Accomplishments**:
  - **Touch Action Settings**: Added `touch-action: none;` in the CSS styling for `.sb-book` and `.sb-zone`, and `touch-action: pan-y;` on `.sb-stage`. This disables the browser's default touch scrolling and swipe gestures on the book canvas, enabling seamless touch-dragging controls on mobile and tablet devices.
  - **Division Safety**: Added a safe fallback for the division denominator `(drag.w || width || 900)` in `handleBookPointerMove` to prevent divide-by-zero or `NaN` values during rapid pointer dragging.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Added touch-action CSS rules and implemented pointer division safety fallback.

## [2026-08-31 23:53] Converted Hover Page Descriptions to Floating Tooltips
- **Accomplishments**:
  - **Implemented Cursor-Following Tooltip**: Shifted the page description display from a static text block under the caption to a high-performance, cursor-following tooltip overlay.
  - **Decoupled Hover Detection**: Monitored the pointer's local coordinates relative to the `.sb-book` bounding client rect inside `handleWindowPointerMove`. Automatically positions the tooltip above the cursor (`translate(-50%, -125%)`) and toggles its opacity (`0` or `1`) dynamically via DOM style manipulation, avoiding React render lag on mouse move.
  - **Cleaned Caption Panel**: Reverted the static caption panel height and layout to just display the page title and place index.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Implemented floating mouse-follow tooltips and cleaned up static caption panel.

## [2026-08-31 23:49] Updated Sketchbook Titles and Added Hover Descriptions
- **Accomplishments**:
  - **Renamed Pages**: Updated the `PAGES` definition array in [`Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx) to use the new personalized labels: 1. Hometown, 2. Birth-Day, 3. School, 4. Hobbies (kid), 5. Hobbies (Teen), 6. Unforgettable Trip, and 7. School's end.
  - **Hover Descriptions**: Added a new `description` property to each page block. Introduced an `isHovered` React state that triggers on mouse hover over the `.sb-3d` book container. When active, it displays a detailed descriptive tooltip that smoothly slides and fades in beneath the page title and place index.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Updated page titles and implemented hover descriptions.

## [2026-08-31 23:27] Unified Showcase Page Asset Dimensions and Centering
- **Accomplishments**:
  - **Identical Asset Alignment**: Wrote a Pillow-based image processing script that dynamically crops the non-transparent bounding box from each showcase PNG spread (`1.png` to `7.png` in `public/showcase/`), resizes the active book content to a standard layout size of `1800x775` pixels, and centers the scaled book content perfectly on matching transparent canvases of size `1890x832` pixels. Re-ran the process to ensure all pages (including `5.png` and `7.png`) are exactly `1890x832` with identical centering.
  - **Resolved Transition Jitter**: This aligns the book margins, center spines, shadows, and pages pixel-for-pixel across all pages, ensuring that when pages are flipped, the physical book outline remains 100% stationary and jitter-free.
  - **Ignored Status**: Confirmed that `public/` is ignored by `.gitignore`, so these local assets do not require git commits.

## [2026-08-31 23:17] Ported Page Interaction Features (Tilt & Key Navigation) from index.html
- **Accomplishments**:
  - **Exposed Keyboard Navigation**: Added global keydown listener to track `ArrowLeft` and `ArrowRight` inputs. Triggers smooth page flips using `handleArrowClick`, bypassing input forms and content-editable segments.
  - **Window-Level Mouse Tilt**: Replaced local pointer tracking boundaries with window-wide listener tracking. Allows the book's 3D tilt (`--rx`, `--ry`) to lean dynamically toward the cursor anywhere on the page, keeping the book steady during page-turns and page-drag states.
  - **Reset Tilt on Blur & Pointerout**: Integrated pointerout and blur events to gracefully restore the sketchbook's flat 3D orientation when the cursor exits the browser window or focus is lost.
  - **Verified Build**: Production compile passes successfully.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Integrated keyboard and window-level tilt listeners, removed local listener wrappers.

## [2026-08-31 23:01] Refined Book Aspect Ratio/Scale and Implemented Tap/Click to Flip
- **Accomplishments**:
  - **Refined Dimensions & Scale**: Scaled up the `.sb-3d` container `max-width` from `760px` to `900px` (matching the original sketchbook-main layout bounds). Updated `.sb-book` aspect-ratio to `1890 / 832` (roughly `2.27` aspect ratio), which perfectly represents the average dimensions of our cropped double-page PNG assets.
  - **Implemented Tap/Click to Flip**: Resolved the pointer-capture loss bug where the sudden React DOM-swap from `.sb-full` (static page) to `.sb-half`/`.curl` (turning page) during a pointer-down event aborted the browser's pointer capture. We decoupled the state change: pointer-down now only sets up tracking coordinates, pointer-move starts the page bend once the drag crosses a `6px` threshold, and pointer-up handles clean taps/clicks by programmatically calling `startTurn` and `commit` to execute a smooth, animated page flip.
  - **Verified Build**: Re-ran the Next.js static build checks and TypeScript tests with zero errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Refined pointer-down, move, and up handlers, and updated the CSS layout variables for aspect ratio and max-width.

## [2026-08-31 22:52] Refined Sketchbook Dimensions, Fixed Page Flips, and Removed Magnifier
- **Accomplishments**:
  - **Fixed Book Dimensions & Jitter**: Set a consistent aspect ratio of `1916 / 821` (matching the dimensions of the showcase PNG spreads) directly on the `.sb-book` container. Forced page images to fill the container height using `h-full object-fill` (for static/half-pages) and `var(--bw) 100%` background sizing (for page-turn strips), eliminating all vertical layout shifts and size changes between turns.
  - **Corrected Page Shading Bounds**: Set `--pg: 3%` in the CSS styles and updated the gradient masks to `linear-gradient(180deg, transparent 0, #000 3%, #000 97%, transparent 100%)` to perfectly cover the book borders in our cropped assets (which only have about 3% vertical margins).
  - **Fixed Page Flip interaction (Intro Riffle)**: Introduced `idxRef` and `updateIdx` to bypass React state closure lag during the fast synchronous page turns of the intro riffle. Added `introStartedRef` to prevent layout reflow width changes from restarting the intro loop from page 0. This enables the intro to complete successfully and releases the flip handlers (re-enabling click-to-flip and drag-to-flip controls).
  - **Removed Magnifier (Loupe)**: Fully removed the draggable brass magnifier glass, including all state hooks, pointer event handlers, helper methods, cloned layers (`.zoomwrap`), tool button toggle, and CSS rules.
  - **Verified Compilation**: Confirmed the Next.js static build checks and TypeScript tests pass successfully.

## [2026-08-31 21:29] Refined Sketchbook Layout & Integrated Interactive Magnifier Glass (Loupe)
- **Accomplishments**:
  - Replaced the large procedural SVG-generating `pageUrls` `useMemo` block in [`Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx) with a clean, static array referencing the 7 PNG image assets (`1.png` to `7.png`) located in the `public/showcase/` directory.
  - Expanded the `PAGES` definition array to 7 elements, adding a 7th slide representation ("Vortex Fluid Dynamics", "Physics Solvers") to map precisely to the 7 available image files.
  - Updated the aspect ratio of the 3D book container (`.sb-3d`) in [`Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx) from `aspect-[1760/1240]` (the SVG aspect ratio) to `aspect-[3/2]` to perfectly match the `1536x1024` dimensions of the PNG images, eliminating any potential stretching or distortion.
  - Successfully ran `graphify update .` to keep the code relationship graph in sync.
  - Verified static production build and TypeScript checks pass cleanly.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Swapped dynamic SVGs for static PNG references, added a 7th page entry, and adjusted container aspect ratio to 3:2.

## [2026-08-28 21:40] Integrated Interactive 3D Sketchbook Showcase, Runway Project Slide and Main Page Scrolling
- **Accomplishments**:
  - Implemented the interactive **Showcase Section** (`Showcase.tsx`) containing a 3D page-flipping book inspired by `MengTo/sketchbook`. Integrated customizable vector project drawings represented as responsive inline SVG data URLs (Cover, Aether-Net, Khepri Engine, Nox Spatial, Chronos Swiss, and Apex Pavilion).
  - Wired page-turning physics and compass-based pointer-lean tilting in `Showcase.tsx` using GSAP. Replicated the draggable brass magnifier glass overlay and zoomed canvas lens, enabling details inspection on hover.
  - Refactored the **Projects Section** (`Projects.tsx`) into an immersive HTML project presentation. Visualized the projects in a fullscreen sticky slideshow that scrubs card opacity transitions and controls links pointer-events based on scroll runway progress.
  - Configured the main landing page (`page.tsx`) to support vertical scrolling, letting the Showcase, Projects, and Contact sections scroll over the sticky Hero centerpiece in a parallax transition flow (Hero -> Showcase -> Projects -> Contact).
  - Maintained the sliding About overlay behavior: clicking "YASH RAJ" or the "About" menu button smoothly slides in the About overlay from the sides while locking the body scroll.
  - Configured dual Lenis scroll instances: created a global Lenis instance on the `window` when the About overlay is closed to enable smooth scrolling on the main page, and gracefully swapped scroll focus to the About-specific Lenis container when the overlay is open.
  - Re-routed Hero header navigation links: clicking "Showcase", "Projects", and "Contact" scrolls the main window smoothly to their respective anchors rather than opening the About overlay.
  - Verified static compilation: the Next.js production build succeeded with zero errors.
- **Key Files Modified**:
  - [`src/components/Showcase.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Showcase.tsx): Created the component with 3D recursive nested strip geometry, magnifier lens calculation, and SVG blueprints.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Updated to render interactive slides, trigger card opacities, and remove the snapping loop.
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Added `onScrollToSection` prop, linked menu items to trigger scroll targets on the main page.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Added global Lenis scroll effect, rendered Showcase, Projects, and Contact sections inside a z-index relative container.

## [2026-08-28 20:40] Refactored Scroll Target to Ref (No Double-Render), Viewport-Fixed Close Button & Symmetrical Loop Snapping
- **Accomplishments**:
  - Replaced the `scrollTarget` state with a `scrollTargetRef` in [`page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx). This fixes the bug where clicking "About" opened the overlay twice, caused by updating the target state inside the transition's `onComplete` callback, which re-triggered the slide-in `useEffect` hook.
  - Moved the Close Button from [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to [`page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx) outside the translated container. This resolves the issue where scrolling inside the overlay caused the button to move out of view (due to CSS transforms establishing a new container viewport coordinate space).
  - Integrated `ScrollTrigger.refresh()` at the end of the slide-in transition's `onComplete` callback in [`page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx). This forces GSAP to recalculate viewport offsets only after the container is stationary in the viewport, fixing the bug where the 3D head got stuck on Chapter 1 (caused by cached trigger values computed while translated off-screen).
  - Implemented a seamless two-way infinite scrolling loop by duplicating the About editorial content (Headline, Chapters 1-4, Endline) into two identical `.about-loop-group` wrappers inside [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx).
  - Engineered a symmetrical spacing layout: removed `pt-[20vh]` and `pb-20` from the parent scrollable container and applied them inside each `.about-loop-group` wrapper (top padding `pt-[20vh]` and bottom padding `pb-[20vh]` on the Endline). This guarantees that the height of each loop group (`loopHeight`) is the exact repeating period of the layout.
  - Shifted snapping trigger ranges to the middle of the scroll area (snapping when `scroll >= loopHeight + 100` and `scroll <= 100`). This ensures the scroll position never hits the browser's absolute top (0) or bottom limits, completely eliminating elastic bounce halts, jitters, or scroll freezes.
  - Snapshot the initial scroll position of the About overlay on transition completion to `loopHeight` (the start of the second loop group). This shows the Headline immediately while allowing seamless scrolling up or down instantly.
  - Reset all base pose rotations for sections 0 to 5 to `[0, 0, 0]` in `SECTION_POSES` inside [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx). This ensures the 3D head faces straight and follows the mouse cursor symmetrically throughout all scrolling sections.
  - Removed the duplicate black Contact section from the bottom of the About overlay, making the About section a fully self-contained editorial flow.
  - Integrated duplicate-aware class lookups inside the GSAP trigger loop via `gsap.utils.toArray` to monitor scroll progress across both loop groups.
  - Verified static compilation: the Next.js production build checks passed with code 0.
- **Key Files Modified**:
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Replaced the `scrollTarget` state with a React Ref, rendered the close button outside the transform containing block, set up mid-range scroll snapping, and called `ScrollTrigger.refresh()` on animation completion.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Removed close button markup, extracted editorial content into a single `renderContent` helper rendered twice, restructured paddings inside the helper for layout symmetry, removed the Contact section container, and adapted ScrollTriggers to duplicate nodes.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Cleared rotations in `SECTION_POSES` for sections 0-5 to enable straight mouse-look tracking.

## [2026-08-26 18:25] Custom Scroll Container Overlay, Parent-Bound ScrollTriggers & 3D Head Turning
- **Accomplishments**:
  - Returned the `About` layout to a fixed-overlay structure (`fixed top-0 left-0 w-full h-full`) that scrolls internally via `overflow-y-auto` while keeping the main window scroll locked, preventing any background shifts or page jitter.
  - Linked GSAP ScrollTriggers to the custom scroll container: added `ScrollTrigger.defaults({ scroller: sectionRef.current?.parentElement })` inside [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to query the DOM wrapper parent reference directly.
  - Enabled dynamic 3D head movement: as you scroll internally inside the overlay, ScrollTrigger correctly fires active section updates, and the 3D head turns smoothly to look at the left/right text columns.
  - Handled overlay exit cleanup: when closing the overlay, the wrapper scroll position resets to `0` dynamically on transition end.
  - Verified static compilation: production build completed with exit code 0.
- **Key Files Modified**:
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Updated container elements to use `fixed` positioning and custom id `#about-scroll-container`, and streamlined open/close slide transitions.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Configured ScrollTrigger to use the parent scroll element reference as its default scroller.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Added base rotation lerping and set section poses to make the head turn toward the columns on scroll.

## [2026-08-19 21:30] Procedural WebGL Space Tunnel and Brand-Colored Starfield
- **Accomplishments**:
  - Replaced the static background image (`galaxy_tunnel.png`) in `About.tsx` with a fully procedural, real-time GPU-rendered background shader inside `About3D.tsx` (`WarpTunnelBackdrop` component).
  - Designed a custom GLSL fragment shader (`CosmicTunnelShader`) that renders a swirling wormhole vortex with 3 spiral arms, utilizing fractional Brownian motion (FBM) noise for organic nebula clouds.
  - Custom-mapped colors to the portfolio's signature branding: blends brand red (`#de3421`), warm amber (`#e2a222`), and cream white (`#FAF8F5`) on a deep charcoal black background (`#0A0A0A`).
  - Added camera-relative coordinate locking to the background plane, keeping the backdrop centered in the perspective viewport as the camera floats, rolls, and pans down the tunnel.
  - Multi-colored the flying `Starfield` particles to match the design palette, creating mixed streams of cream, brand red, and gold warp speed trails.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Removed static background image div.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Created `CosmicTunnelShader` and `WarpTunnelBackdrop` component; updated `Starfield` buffer attributes to inject brand vertex colors.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 21:10] Unified Mouse Look-At Tracking in Projects Section
- **Accomplishments**:
  - Removed the camera-relative slerped quaternion rotation branch in `AvatarModel`'s `useFrame` loop.
  - Unified the 3D head's rotation behavior across all sections (0-6) using direct Euler rotation summation, making the mouse following action identically direct and responsive in the Projects section.
  - Set the default base rotation values for pose 6 to `[0, 0, 0]` in `SECTION_POSES`, removing default pitch/yaw tilts so the head faces the screen symmetrically.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Removed the quaternion slerp code block and simplified the `useFrame` loop; set pose 6 rotation to neutral.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 21:05] Camera-Relative Mouse-Tracking and Scale Correction in Projects Section
- **Accomplishments**:
  - Implemented camera-relative slerped quaternion rotations in the Projects section (Section 6), making the 3D head follow the mouse cursor with look-at tracking relative to the moving camera's viewpoint.
  - Corrected the visual size regression in the tunnel by pushing the head offset to `Z = -3.2` units in front of the camera (instead of `-2.0`) and scaling the model down to `0.23` (instead of `0.38`), giving it a balanced backdrop size.
  - Handled smooth transitions between Euler-based world rotations in sections 0-5 and camera-relative quaternions in section 6.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Calculated and slerped target quaternions inside `useFrame` for Section 6, and updated pose settings.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 20:55] Vertical Centering of 3D Head Centerpiece in Projects Section
- **Accomplishments**:
  - Removed the `+0.58` Y-axis camera offset in `AvatarModel`'s `useFrame` loop for Section 6 (Projects), centering the 3D head centerpiece vertically on the screen.
  - Adjusted the camera `lookAt` Y target in `CameraPath`'s `useFrame` loop from `-0.12` to `0`, ensuring the camera looks straight down the center line of the cylinder starfield tunnel.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Centered the head's Y position in `AvatarModel` and the camera's `lookAt` target in `CameraPath`.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 20:45] Auto-Blinking, Tap Timelines, and Rim Light Restorations for 3D Head
- **Accomplishments**:
  - Restored the auto-blinking animation sequence on model load by mapping it to the correct animation action key (`white_mesh (1)Action.004`) from the optimized GLTF model.
  - Re-implemented the GSAP-driven click/tap recoil translation, rotation shake, and scale pop timelines, restoring the fluid organic interaction feel on clicking/tapping the head centerpiece.
  - Re-integrated the click-induced eye-closing behavior by tweening the mesh shape-key `morphTargetInfluences` (shutting eyes instantly on impact, holding them closed for 1.45s, and opening them smoothly back to auto-blinking).
  - Removed all red color casting by replacing red contour/rim directional lights with neutral grey/white directional fill lights in both the `<AvatarModel>` group and the main `<Canvas>` backlight parameters.
  - Resolved TypeScript compilation errors by adding null-checks and utilizing a local variable pointer (`const group = groupRef.current`) for the mutable group ref scale.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Restored correct action names, GSAP tap animations, shape key transitions, and white directional light colors; added TypeScript compile-time null safety checks.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 19:45] Centering and Chrome Material Restorations for 3D Head Centerpiece
- **Accomplishments**:
  - Restored uniform center-aligned pose values for sections 0, 1, 2, 3, 4, and 5 in `SECTION_POSES` inside `About3D.tsx`, solving the horizontal offset/scale shifts that caused the 3D head to collide with paragraph columns.
  - Reset initial base position coordinates in the `basePosition` ref back to `[0, 0, 0]` to guarantee layout alignment on mount.
  - Re-implemented the GLTF scene traverse block in `AvatarModel` to apply the mirror-like clearcoat physical chrome materials (`metalness: 1.0`, `roughness: 0.1`, `clearcoat: 1.0`) on model load.
  - Re-applied corrective pitch/yaw rotations (`scene.rotation.set(0.4, -0.85, 0)`) to the scene root on load, aligning the avatar head to look straight at the screen.
  - Visually verified both the About text chapters and the spiral Showcase stack in Playwright, ensuring the 3D head centerpiece sits dead-centered, fully sized, and gorgeously polished.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Restored uniform pose coordinates, initial base vector values, and scene traversal physical materials/corrective rotations.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 19:35] Ref-Synchronized State and DOM-Driven Project Cards in 3D Galaxy Tunnel
- **Accomplishments**:
  - Exposed `activeSection` and `projectsProgress` on the global `window` object to allow seamless verification and testing inside headless browser environments.
  - Exposed the initialized `Lenis` smooth-scroll controller on `window.lenis` to permit simulated scrolling and wheel triggers in automated Playwright scripts.
  - Corrected a critical R3F stale closure bug: mapped `activeSection` and `projectsProgress` props to local mutable refs (`activeSectionRef`, `projectsProgressRef`) inside the `<AvatarModel>`, `<Starfield>`, and `<CameraPath>` hooks, ensuring frame loops read fresh updates during scrolling.
  - Solved Three.js viewport clipping: adjusted the head's falling Y-offset from `+0.88` to `+0.58` units relative to the camera, centering the head centerpiece inside the top-center frustum beautifully on all screens.
  - Implemented 3D studio light travel: parented active white key and red fill directional lights directly inside the `<AvatarModel>`'s `<group>` container so they follow the head centerpiece down the negative Z-axis, keeping the polished chrome materials lit with rich specular highlights.
  - Engineered direct DOM style mutations inside a single `useFrame` loop in `<ProjectCapsules>`: binds project capsule opacities and depth-of-field blurs to the camera Z depth on every frame, eliminating mounting delays and achieving smooth 60fps card transitions.
  - Visual verification: successfully ran Playwright testing loops to confirm that Project 1 (`Aether-Net`) is fully faded out at 38% progress, while Project 2 (`Khepri Engine`) emerges on the left side of the cylinder starfield tunnel with cinematic focus blur.
  - Verified static compilation: build successfully compiled with Turbopack.
- **Key Files Modified**:
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Exposed `window.lenis`.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added window logging hooks.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Updated all components to use ref-synchronized state access, added local group lights, adjusted head viewport Y-offset, and converted card opacities/blurs to direct DOM style updates inside `useFrame`.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 18:42] Cinematic Alternate Projects Slide Transition and WebGL Starfield Warp Tunnel
- **Accomplishments**:
  - Combined `<Projects />` inside the parent `<About />` structure in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) and removed it from [`page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx) to seamlessly share the sticky WebGL Canvas.
  - Added a responsive 3D starfield tunnel generator component (`Starfield`) inside [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) that animates 1,500 point particles along the Z-axis and rotates on the Z-axis.
  - Programmed smooth speed and opacity fading so the starfield warp tunnel is invisible elsewhere but activates at high warp speed when `activeSection === 6` (Projects).
  - Set up a cinematic Projects Pose (`6`) in [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) that scales down the chrome head centerpiece, pans it upwards, and tilts it back to sit centered-top as a backdrop.
  - Refactored [`Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx) to support absolute full-screen project slides that alternate layouts side-to-side (Project 1: Text Left / Card Right; Project 2: Card Left / Text Right; Project 3: Text Left / Card Right).
  - Wired a GSAP timeline scrubbing transitions between slides seamlessly on scroll, translating and fading slides on the Y-axis to prevent vertical overlaps.
  - Verified static production build compilation exits with `code 0`.
  - Conducted live visual verification in Playwright at 35% projects progress.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Integrated `<Projects />` render loop.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Programmed `Starfield` cylinder mesh and pose 6 parameters.
  - [`src/components/Projects.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Projects.tsx): Re-architected slide structure, layout logic, and GSAP transition scrubbing.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Cleaned up Projects import and rendering tags.
- **Pending Tasks & Next Steps**:
  - Complete contact section transitions.

## [2026-08-19 16:40] Dead-Centered 3D Head and Spiral Showcase Realignment
- **Accomplishments**:
  - Reverted horizontal shifts inside `About3D.tsx`'s `useFrame` loop, keeping the 3D head centerpiece dead-centered (`basePosX = 0`) across both the showcase and about text chapters.
  - Centered the spiral staircase orbital center in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to exactly `w / 2` and `h / 2` across all viewports, ensuring it aligns perfectly concentric with the 3D head model.
  - Confirmed that the C-shape helical math successfully wraps cards on the right side of the centered head, leaving the left-panel editorial category index completely clear of overlaps on desktop.
  - Verified static production build compilation exits with `code 0`.
  - Ran automated visual tests with Playwright to verify the centered layout at 60% progress.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Centered `centerX` and `centerY` in the card positioning calculations.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Removed the horizontal shifts inside `useFrame`.
- **Pending Tasks & Next Steps**:
  - Map final project details in `Projects.tsx`.

## [2026-08-19 16:25] Spiral Staircase Cascade around 3D Head Centerpiece
- **Accomplishments**:
  - Restored 3D head visibility in the showcase section by setting Section Pose 5 (Showcase) in [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) back to its full centered size (`scale: [0.576, 0.576, 0.576]`).
  - Implemented responsive horizontal shift for the 3D head centerpiece inside `About3D.tsx`'s `useFrame` loop (`basePosX = 0.52` on desktop, `0.3` on tablet) to smoothly slide it to the right during showcase mode, matching the spiral center.
  - Developed mathematical orbital spiral staircase cascade formula in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to arrange cards in a helical C-shape sweep winding around the 3D head centerpiece.
  - Tangent-rotated the cards using their position angle `theta` (`rotate(${cardRotation}deg)`) to align them flat along the helical curve, matching a winding staircase look.
  - Flattened card wrapper structure to `absolute inset-0 w-full h-full pointer-events-none z-10` directly inside the sticky viewport container, resolving parent coordinate offsets.
  - Successfully verified compile-time static page build and ran automated visual tests with Playwright to verify the concentric spiral arrangement at 60% progress.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Implemented spiral coordinate math, tangent rotations, responsive center offsets, and absolute container restructuring.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Restored pose 5 scale and added dynamic horizontal offsets inside `useFrame`.
- **Pending Tasks & Next Steps**:
  - Map final project details in `Projects.tsx`.

## [2026-08-19 15:45] Visual Verification and Left Panel Category Refinements via Playwright
- **Accomplishments**:
  - Eliminated 3D head canvas overlap with the showcase section by setting Section Pose 5 (Showcase) in [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) to scale down to `0` and position out of view (`[0, -2, -5]`), allowing a clean backdrop transition.
  - Added dynamic `category` headers to the showcase project items, replacing duplicate index labels on the left of the screen with a large, bold Category title that transitions on scroll (e.g. `NEURAL NETWORKS`, `CREATIVE SOUND`, `3D ENVIRONMENTS`).
  - Laced a refined mini scroll-index side list below the category title, preserving index links and highlights.
  - Used Playwright to perform automated visual tests of the cascade at `25%`, `60%`, and `90%` scroll positions, verifying that the mathematical zigzag cascade cards and captions align, layer, and fade exactly as in the Scheme Engine video starting from `00:00:10`.
  - Verified static production build compilation exits with `code 0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added category fields to projects, restructured left panel layout to show category header and mini-index, and formatted mobile layout labels.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Configured Section Pose 5 to shrink scale and hide head from showcase scene.
- **Pending Tasks & Next Steps**:
  - Finish content data mapping in `Projects.tsx`.

## [2026-08-19 15:10] Refined Art Showcase to Mathematical Zigzag Stair Cascade
- **Accomplishments**:
  - Refined the creative art showcase scroll cascade to implement the continuous ever-rising zigzag staircase formula from the video reference (`Screen Recording 2026-08-15 220410.mp4` and user prototype in `claude html.html`).
  - Implemented high-performance direct DOM updates inside a single ScrollTrigger `onUpdate` callback, avoiding React state re-render lag and achieving smooth 60fps scrolling.
  - Positioned upcoming cards in a stretched, squashed staircase queue that animates smoothly on scroll, peaks size at the active spot, and recedes up and to the right into a faded trail.
  - Positioned card captions absolutely below the cards, with opacity and vertical offsets faded in dynamically as cards approach active focus and faded out as they recede.
  - Added responsiveness to the mathematical layout by scaling spacing factors (`activeX/Y`, steps) based on screen width/breakpoints.
  - Handled prefers-reduced-motion accessibility fallbacks.
  - Verified compilation: build succeeded cleanly with zero warnings or errors.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Replaced the slot-timeline matchMedia triggers with a single ScrollTrigger running the dynamic cascade formula; restructured markup and styling to support responsive layout variables, absolute captions, and dot overlay patterns.
- **Pending Tasks & Next Steps**:
  - Move on to completing details for Projects.tsx.
  - Test contact section responsiveness.

## [2026-08-15 22:42] Converted Art Showcase to Natural Scrolling Flow
- **Accomplishments**:
  - Re-implemented the staircase art showcase layout to follow the **natural vertical scroll flow** of the page rather than locking the screen in a sticky viewport box, aligning 100% with the Scheme Engine scroll mechanics in the video reference.
  - Positioned cards relatively and staggered them horizontally in a left/right/left flow using native Tailwind offsets (`mr-auto ml-[5vw]`, `ml-auto mr-[5vw]`, etc.) and rotational offsets (`rotate-[-2deg]`, `rotate-[3deg]`, `rotate-[-1deg]`).
  - Added large vertical spacers (`space-y-[35vh]`) so the cards scroll up naturally one by one, framing the centered sticky 3D head as they pass it.
  - Setup simple, high-performance ScrollTriggers for each card to highlight the corresponding art title in the sticky left index as the card crosses the center of the viewport.
  - Bound the sticky index item click handlers to smooth `scrollIntoView` triggers, providing a premium interactive navigation experience.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Simplified GSAP hook block (removed screen-lock matchedMedia timelines, replaced with clean activeCard scroll triggers), and simplified cards container markup structure.

## [2026-08-15 22:20] Implemented Premium Art Showcase Staircase Cascade
- **Accomplishments**:
  - Restored `SHOWCASE_ITEMS` and `DesignItem` data structures in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to showcase art designs (`NEUROGRAPH AI`, `SYMPHONY SYNTH`, `AETHER IDENTITY`).
  - Implemented an editorial sticky column layout on the left of the showcase section displaying the vertical index of art design names. Added an active highlight state controlled by scroll progress and click-to-scroll navigation triggers.
  - Implemented a responsive diagonal card cascade around the centered 3D head on the right side of the screen matching the Scheme Engine scroll timeline mechanics from `Screen Recording 2026-08-15 220410.mp4`.
  - Removed inline `top` styles from cards to let GSAP handle vertical positioning completely, preventing viewport displacement drift.
  - Removed `overflow-hidden` from `.showcase-track` to allow `position: sticky` on the inner container to work properly, relying on the body's `overflow-x: clip` in [`globals.css`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/globals.css) to clip horizontal card animation overflows.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Re-engineered layout markup, restored definitions, added scroll activeCard triggers, and recreated matchedMedia timelines.

## [2026-08-15 22:03] Removed Showcase Cards Entirely
- **Accomplishments**:
  - Removed all showcase cards, their mapping loop, and nested styling structures from the showcase section (`.showcase-track`) in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) as requested by the user in `Screenshot 2026-08-15 220006.png`.
  - Simplified the `.showcase-track` container from a `min-h-[300vh]` scrolling track to a simple, clean, full-viewport `h-screen` spacing segment.
  - Cleaned up the unused `SHOWCASE_ITEMS` and `DesignItem` typescript declarations.
  - Deleted the card-specific GSAP scroll-triggered position timelines and card-specific mouseenter/mouseleave hover events to avoid compilation errors and runtime leaks.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Removed card markup, cleaned up variables, simplified container layout structure and height, and deleted card GSAP timelines and hover event listeners.

## [2026-08-15 21:58] Removed Showcase Top Border Divider
- **Accomplishments**:
  - Removed `border-t border-white/5` from the `.showcase-track` classes.
  - This removes the thin white line divider visible at the boundary between the about section's endline area and the showcase container, enabling the black backgrounds to transition seamlessly into a single continuous visual segment as shown in `Screenshot 2026-08-15 215651.png`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Removed `border-t border-white/5` from `.showcase-track` div.

## [2026-08-15 21:56] Corrected Sticky 3D Head Layering (Z-Index Overlap)
- **Accomplishments**:
  - Increased the z-index of the Sticky 3D Canvas Wrapper from `z-20` to `z-[35]`.
  - This ensures the 3D head renders correctly in front of the sibling `.showcase-track` (which has `z-30` and an opaque black background), restoring the head's visibility during the showcase section.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Raised Sticky 3D Canvas Wrapper z-index to `z-[35]`.

## [2026-08-15 21:52] Fixed Showcase Section Bleed Layout & Side Square Artifact
- **Accomplishments**:
  - Moved the `.showcase-track` container outside of the Centered Scrollable Content flex wrapper. Because `.showcase-track` is now a direct child of the `#about` section (which is full-width with no horizontal padding), it natively spans 100% of the page width using `w-full relative`.
  - Removed the `w-screen`, `left-1/2`, `right-1/2`, `-ml-[50vw]`, and `-mr-[50vw]` CSS bleed hacks which caused width calculation mismatch relative to parent padding/vertical scrollbars, correcting the off-center rendering offset that produced the side black square artifact circled in `Screenshot 2026-08-15 214828.png`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Adjusted wrapper div closing tags placement, removed margin/positioning viewport hacks, and simplified class definitions for `.showcase-track`.

## [2026-08-15 21:47] Fixed Showcase Section Layout, Navigation, and Hover Animations
- **Accomplishments**:
  - Added `id="showcase"` anchor element to the `.showcase-track` container, resolving a broken navigation link issue where clicking "Showcase" in the header failed to scroll the page.
  - Wrapped each showcase card's content inside a dedicated `.showcase-card-inner` container.
  - Moved the hover translation (`y: -8`) animation to `.showcase-card-inner`, completely isolating it from the outer `.showcase-card` container controlled by GSAP ScrollTrigger. This resolves the position animation override bug that caused cards to jump, jitter, or break layout positions when hovered.
  - Implemented card text content rendering. Renders each card's title, category, number, and description inside the markup using clean typography, restoring the intended premium portfolio details.
  - Verified that all animations perform smoothly with zero console warnings or compilation errors.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added inner wrappers, rendered text labels, corrected target selectors for hover events, and added showcase anchor id.

## [2026-08-15 21:05] Prevent Pre-Scroll Card Leakage via CSS Opacity & Pointer Events
- **Accomplishments**:
  - Solved the premature card leakage bug shown in `Screenshot 2026-08-15 210021.png` where Card 3 emerged at the bottom-right corner before the showcase track scroll trigger was reached.
  - Set default HTML classes for all showcase cards to `opacity-0 pointer-events-none` to prevent them from rendering or blocking cursor clicks before the GSAP ScrollTrigger timeline initializes or when React performs post-hydration layout shifts.
  - Configured the responsive GSAP matchMedia scroll timelines to dynamically manage and animate `opacity` and `pointerEvents` alongside positions (animating `pointerEvents` to `"auto"` when active, and `"none"` when hidden/off-screen).
  - Verified a successful Next.js production build (`npm run build` exits with `code 0`).
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added `opacity-0 pointer-events-none` classes to card markup, and updated all responsive GSAP media query timelines with pointer-event and opacity tweens.

## [2026-08-14 00:38] Line-Based Pretext Text Wrapping & 10% Head Size Decrease & Scanning Cap Glow Reveal
- **Accomplishments**:
  - Implemented cohesive line-based circular wrapping inside `About.tsx`. Instead of splitting lines into individual shifting words (which causes reading disruption and word overlapping), `PretextParagraph` now renders and shifts each text line as a single solid unit, matching `4.png` perfectly.
  - Calculated line offset displacements based on column alignment:
    - **Left Column (Right-Aligned)**: Computes the line's right edge coordinate and shifts it left (`translateX`) to stay tangential to the circular head's contour.
    - **Right Column (Left-Aligned)**: Computes the line's left edge coordinate and shifts it right (`translateX`) to clear the circular head.
  - Resolved dynamic reference lifecycle race condition by resetting the element ref cache during the render phase (inside the `wordLayouts`/`lineLayouts` `useMemo`) rather than asynchronously inside post-render `useEffect` hooks.
  - Gated all off-screen canvas context measurements with a `mounted` client-side hydration check, resolving Turbopack / Next.js SSR build crashes.
  - Decreased the visual scale of the sticky 3D head model by exactly 10% (reducing constants in `SECTION_POSES` and default R3F `<group>` elements in `About3D.tsx` from `0.64` to `0.576`).
  - Implemented 3D head mount persistence: added `hasBeenVisible` state toggled once the `About` section comes into view for the first time. The head remains mounted in the background when scrolling away, eliminating unmount reloading/flashing and keeping the head sitting at the endline ready for the user to scroll back up.
  - Built first-generation vertical scan reveal animation: added a dynamic `THREE.Plane` vertical local clipping constant inside `About3D.tsx`. On first load, it sweeps up from chin to hair (`constant: -1.5` to `1.5`) over a 40% slower duration (`2.8` seconds) revealing the model from bottom-to-top.
  - Created a glowing slice edge cap contour matching `Screenshot 2026-08-14 003637.png`: bound the blue point light position dynamically in `useFrame` to trace the clipping plane Y height exactly (`position.y = constant`) and positioned it extremely close on the Z axis (`position.z = 0.35`). Shortened the light's range (`distance = 2.0`) and raised the initial sweep flash intensity to `25.0` (with a decay duration of `3.36` seconds). This creates a highly concentrated, electric neon blue glow tracing only the top slice boundary, leaving the lower chrome face untouched.
  - Added holographic flickering noise to the laser sweep: added high-frequency light intensity noise modulation inside the R3F `useFrame` loop. The flicker is computed via double trigonometry multipliers ($f = \sin(t \times 120) \times \cos(t \times 67) \times 4.0$) and crackles active scanning light intensity dynamically. The noise is gated so it turns off completely once the scan completes.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Implemented line-based pretext rendering, fixed ref lifecycle bugs, and added `hasBeenVisible` mount persistence.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): Reduced default scaling coefficients for the 3D model poses by 10%, implemented vertical scan local clipping planes, enabled canvas `localClippingEnabled` renderer, and added 40% slower scan reveal animation with holographic flickering noise and boundary slice cap glow.

## [2026-08-12 19:15] Centered Layout Wrapping & Water Ripple Tap Effect
- **Accomplishments**:
  - Integrated the full editorial text layout from `about content.txt` containing a full-bleed display headline, 4 chapters of two-column converging text funneling inward, and a full-width endline statement.
  - Made the Intro Headline and Outro Endline statements more bold and impactful: changed their weights from `font-light` to `font-medium`, increased sizes (Headline to `54px`, Endline to `34px`), adjusted colors to high-contrast `#111111` and tightened tracking/leading.
  - Redesigned the chapter divider rows to be completely line-free and borderless, featuring a massive serif Roman numeral in the center (`text-5xl md:text-6xl font-extralight`) and normal-cased sans-serif labels on the left and right, vertically centered.
  - Implemented sticky canvas placement: wrapped the 3D Canvas in a `sticky top-0 h-screen` container that remains locked in the center of the viewport while the text content layer scrolls over and around it.
  - Eliminated scrolling wobble by setting all pose coordinates and dimensions in `SECTION_POSES` to be completely uniform (position `[0, 0, 0]`, scale `[0.64, 0.64, 0.64]`), preventing any scroll-linked shifts in position or scale.
  - Increased the vertical breathing bobbing drift amplitude inside `useFrame` by 30% (setting amplitude to `0.04` and frequency to `0.8`), which moves the head gently up/down to feel alive.
  - Positioned the 3D head exactly at the center of the screen by setting the Y-axis offset coordinates to `0` inside the primitive `<group>` element.
  - Decreased the visual dimensions of the 3D head by another 30% (multiplied by `0.7` again), setting active pose scale to `0.64` and initial group scale to `[0.64, 0.64, 0.64]`.
  - Added a 3-column grid structure on desktop (`md:grid-cols-[1fr_260px_1fr]`) to reserve a `260px` center column gutter for the sticky head, avoiding any text overlap.
  - Overrode the default sideways and upward rotation from the GLTF model by applying a Y-axis offset of `-0.85` radians (Yaw) and an X-axis offset of `0.4` radians (Pitch) directly to the `scene` root object, keeping the original node transforms intact (holding the head structure upright) while correcting the face to look perfectly straight at the screen.
  - Resolved pointer event canvas blockage: created a global window-level `mousemove` listener mapping viewport coordinates to standard WebGL ranges and passed them as props to bypass overlays and wrapper blockage.
  - Corrected vertical mouse tracking: negated the Pitch target rotation (`-(mouse.y * Math.PI) / 8`) so that the head tilts up when the mouse is up, and down when the mouse is down, tracking the cursor with `0.08` damping.
  - Created a front-facing blue WebGL PointLight inside `About3D.tsx` that flashes a bright blue light reflections glow (intensity: `12`) on tap and decays back to `0` over `1.2s`.
  - Configured the About container height bg as exactly `#FAF8F5` (warm cream) with no borders or cards, allowing the content to scroll naturally.
  - Implemented dynamic performance mounting: created the state `isAboutInView` toggled by an outer ScrollTrigger on `#about`. Wrapped `About3D` inside `{isAboutInView && <About3D ... />}` so that the WebGL context and DOM nodes are completely generated on scroll-enter and destroyed on scroll-exit.
  - Configured global styling rules: set a warm cream background (`#FAF8F5`) for subsequent page segments. Removed all card frames, text overlays, and borders for a clean editorial canvas.
  - Upgraded model shader materials in `About3D.tsx` to `THREE.MeshPhysicalMaterial` (`metalness: 1.0`, `roughness: 0.1`, `clearcoat: 1.0`) to model glossy clearcoat liquid-glass reflections.
  - Integrated global smooth inertia scrolling using the `Lenis` scrolling engine in client-side `page.tsx`.
  - Verified compilation: build succeeded, static route pages generated cleanly, and ESLint checks are fully green.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Portfolio/src/components/About.tsx): [MODIFY] Restructured layout to support full-bleed headline, 3-column sticky canvas gutter grid columns for 4 chapters, horizontal divider rows (line-free with large serif numerals), scroll-trigger poses state updates, and global mouse events; increased weight and sizes of headline and endline.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Portfolio/src/components/About3D.tsx): [MODIFY] Adjusted visual scale dimensions (multiplied by `0.7`, setting group scale to `0.64`) and vertical position to `0` in group and poses; set poses to be uniform across all sections to eliminate scroll wobbling; increased idle vertical breathing bobbing drift amplitude by 30% to `0.04`; restored parent node default rotations, added Pitch adjustment of `0.4` rad and Yaw adjustment of `-0.85` rad on the `scene.rotation` root object, added PointLight, configured cursor-tracking using coordinates prop with pitch inversion, and added idle breathing animations.
- **Pending Tasks & Next Steps**:
  - Move on to section 3 ("PROJECTS") card layouts and content transitions.
  - Move on to section 3 ("PROJECTS") card layouts and content transitions.

## [2026-08-12 19:00] Gionatan Nese Inspired About Layout & Poses
- **Accomplishments**:
  - Restructured the "About" section with the new 4-section copywriting provided by the user.
  - Implemented a Gionatan Nese inspired split-screen layout: left column contains natural scrolling text sections, and right column contains the sticky 3D Canvas (`lg:sticky lg:top-0 lg:h-screen`).
  - Added responsive stacking behavior: on mobile, the 3D head pins at the top of the viewport (`sticky top-0 h-[350px]`) while text scrolls beneath.
  - Defined 6 active poses `SECTION_POSES` (position, scale, base rotation) in `About3D.tsx` to showcase different details of the model (e.g. eye close-up on Obsession, tilt-up on Intelligence).
  - Used GSAP ScrollTrigger to track active viewport sections and dynamically update `activeSection` state, driving smooth transitions between poses in the R3F `useFrame` loop.
  - Retained mouse pointer look-at tracking as an additive overlay rotation on top of active poses.
  - Completed verification: all files compile cleanly, static prerendering completes without errors, and ESLint is clean.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): [MODIFY] Rewrote layout grid columns, integrated ScrollTriggers for active sections and text fades, and updated copy content.
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): [MODIFY] Added support for `activeSection` state prop, defined 3D section pose mappings, and updated `useFrame` lerping values.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions and layouts.

## [2026-08-12 18:45] About Section 3D Chrome Avatar Integration
- **Accomplishments**:
  - Remade the "About" section to utilize the newly optimized and compressed chrome avatar model (`chrome_avatar_blinking.glb`), replacing the legacy 2D HTML5 Crowd Simulator canvas.
  - Created a dedicated 3D component [`About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx) utilizing `@react-three/fiber` and `@react-three/drei` to render the canvas, load the `.glb` model, and configure custom silver-chrome material properties.
  - Set up a professional 3-point studio lighting configuration inside R3F, including a stylized brand red (`#de3421`) rim light.
  - Enabled shape-key-based eye blinking animations using `useAnimations` to play back the baked `"white_mesh (1)Action.004"` timeline.
  - Implemented interactive cursor-tracking so the chrome avatar head smoothly rotates and floats dynamically in response to mouse movements.
  - Restructured the page layout of the About section into a responsive grid (About text on the left, 3D Canvas on the right) on desktop.
  - Resolved 4 ESLint errors and 2 warnings across the codebase (`page.tsx`, `About3D.tsx`, `Hero3D.tsx`, `Hero.tsx`, and `Loader.tsx`), achieving clean build-time checking.
  - Addressed browser console warning flood by setting explicit shadow map properties (`shadows={{ type: THREE.PCFShadowMap }}`) and adding console.warn interceptor filters for `THREE.WebGLShadowMap` deprecations and ANGLE/HLSL double precision conversion `warning X4122`.
- **Key Files Modified**:
  - [`src/components/About3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About3D.tsx): [NEW] Created 3D rendering context, configured lights/shadows, material params, animations, pointer loops, and added console warning filters.
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): [MODIFY] Removed the old Crowd Canvas simulator, imported `About3D`, and adapted the layout grid columns to fit the new design.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): [MODIFY] Escaped raw apostrophe entity (`Let's` to `Let&apos;s`) to satisfy lint requirements.
  - [`src/components/Hero3D.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero3D.tsx): [MODIFY] Fixed `any[]` typing warning to `unknown[]` and added console warning filters to suppress `warning X4122`.
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): [MODIFY] Removed unused `textBgRef` declaration.
  - [`src/components/Loader.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Loader.tsx): [MODIFY] Wrapped sticker spawning and auto-spawning methods in `useCallback`, rearranged them before use to prevent hoisting temporal dead zone errors, and registered dependencies.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions and layouts.

## [2026-08-11 23:58] Web GLB Model Compression
- **Accomplishments**:
  - Successfully optimized and compressed the exported chrome head `.glb` model using `npx gltfpack -cc` (meshoptimizer with Draco compression).
  - Shrank the asset size from **6.13 MB** down to **807 KB** (an 87% reduction), bringing it well within the target range for rapid web loading.
  - Overwrote the asset at [`public/chrome_avatar_blinking.glb`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/public/chrome_avatar_blinking.glb) with the optimized 807 KB version.
  - Cleaned up all temporary intermediate `.glb` build files to keep the directory structure tidy.
- **Key Files Modified**:
  - [`public/chrome_avatar_blinking.glb`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/public/chrome_avatar_blinking.glb): Replaced with the optimized 807 KB version.
- **Pending Tasks & Next Steps**:
  - Remake the "About" section using the newly optimized chrome avatar.

## [2026-08-11 23:46] Blender GLB Export for Web
- **Accomplishments**:
  - Exported the animated polished chrome head mesh `white_mesh (1)` as a `.glb` file at [`public/chrome_avatar_blinking.glb`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/public/chrome_avatar_blinking.glb) for Next.js web application integration.
  - Included the `Blink` shape key morph targets and the 60 FPS keyframe animation in the export.
  - Verified the exported file size (6.13 MB).
- **Key Files Modified**:
  - [`public/chrome_avatar_blinking.glb`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/public/chrome_avatar_blinking.glb): Exported the web-ready 3D model asset.
- **Pending Tasks & Next Steps**:
  - Continue styling Next.js site portfolio components.

## [2026-08-11 23:33] Blender Polished Chrome Render & Studio Lighting Setup
- **Accomplishments**:
  - Configured a polished chrome material (Metallic `1.0`, Roughness `0.05`, Color `0.9` silver) and assigned it to the head mesh `white_mesh (1)`.
  - Enabled smooth shading on all mesh polygons for clean, mirror-like reflections.
  - Set the timeline playback speed to **60 FPS** (`render.fps = 60`).
  - Added a professional 3-point studio lighting setup: Key Light (500W), Fill Light (150W), and Rim Light (800W) using large area lights positioned dynamically to frame the sculpture.
  - Attached Track To constraints on all lights so they automatically face the head mesh.
  - Implemented a World shader node setup using `Light Path` to render a clean white background for the camera, while keeping reflections dark for metallic contrast.
  - Switched the render engine to Cycles with denoising enabled (`use_denoising = True`) and sample count set to 32.
  - Saved [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) and verified the render.
- **Key Files Modified**:
  - [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) (modified in active Blender session).
- **Pending Tasks & Next Steps**:
  - Continue styling Next.js site portfolio components.

## [2026-08-11 23:22] Blender Individual-Origins Scale Eye Blink Animation
- **Accomplishments**:
  - Created a fresh `Basis` shape key and a `Blink` shape key on the head mesh `white_mesh (1)`.
  - Programmatically simulated proportional editing (smooth falloff, radius `0.12`) on the vertices of `Eye_l` and `Eye_r` vertex groups to squash them vertically by 95% and move them slightly inward along the normal (+Y-axis).
  - Set the timeline end frame to 120.
  - Inserted three distinct blinks on the timeline:
    - Blink 1: Frames 1 (`0.0`), 12 (`1.0`), 24 (`0.0`)
    - Blink 2: Frames 60 (`0.0`), 72 (`1.0`), 84 (`0.0`)
    - Blink 3: Frames 90 (`0.0`), 102 (`1.0`), 114 (`0.0`), 120 (`0.0`)
  - Configured all keyframe interpolation modes on the shape key F-Curve to `BEZIER` for smooth transitions.
  - Triggered viewport animation playback to play and loop the timeline.
  - Saved the modified [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) file.
- **Key Files Modified**:
  - [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) (modified in active Blender session).
- **Pending Tasks & Next Steps**:
  - Continue styling Next.js site portfolio components.

## [2026-08-11 22:50] Blender Blink Animation Removal

## [2026-08-11 22:49] Blender Blink Shape Key & Animation
- **Accomplishments**:
  - Created a `Basis` shape key on the head mesh `white_mesh (1)`.
  - Created a `Blink` shape key that squashes the eye socket vertices (`Eye_l` and `Eye_r`) downward along the Z-axis towards their minimum Z coordinates by a scale factor of 0.05, transforming the tall ovals into thin horizontal slits.
  - Keyframed the `Blink` shape key value from `0.0` at frame 1, to `1.0` at frame 10, to `0.0` at frame 20, and `0.0` at frame 90.
  - Applied a Cycles animation modifier (mode `REPEAT`) to the shape key's F-Curve to loop the blink sequence every 90 frames infinitely.
  - Verified the animation states visually and programmatically at frames 1 and 10.
  - Saved the modified [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) file.
- **Key Files Modified**:
  - [`Chrome.blend`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Chrome.blend) (modified in active Blender session).
- **Pending Tasks & Next Steps**:
  - Continue styling Next.js site portfolio components.

## [2026-08-11 22:42] Blender Vertex Assignment for Eye_l and Eye_r

## [2026-08-10 00:48] Section 02 — "ABOUT" Outline-only Red Tint & Dense Crowd Walk
- **Accomplishments**:
  - Refactored red tint engine in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) to use pixel manipulation (`getImageData`). Instead of shading the character entirely red, it replaces dark outline pixels (RGB < 120) with red `#de3421` while preserving internal white hand-drawn details.
  - Selected Sprite Index `13` (a guy character with glasses, beard, and collared shirt) as the custom red character.
  - Removed the vertical walk-out animation; the red character now walks horizontally along the bottom lanes alongside the other characters, stand out uniquely while remaining part of the crowd.
  - Increased active crowd capacity to a maximum of 30 peeps (approx. 20–28 on standard screens) to restore crowd density.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Applied outline tinting logic, male sprite selection, horizontal walk triggers, and crowd capacity.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:42] Section 02 — "ABOUT" Interactive Red Peep & Layout Polish
- **Accomplishments**:
  - Implemented an interactive red character animation (`isRed` flag, using a cached, source-in offscreen tinted canvas sprite sheet context) that walks out of the crowd to stand next to the `"About Me"` label.
  - Added a two-phase GSAP walk sequence: the red character walks horizontally, then turns and walks vertically up the page to a custom coordinate calculated from `labelRef.current.getBoundingClientRect()`.
  - Added 3D perspective depth scaling (from `0.55` scale at the foreground down to `0.28` scale when standing next to the label).
  - Implemented real-time depth sorting (`crowd.sort((a, b) => a.y - b.y)`) on every render tick so walking characters correctly layer behind/in front of each other.
  - Increased standard crowd character sizes to `0.55` scale for clear resolution and offset their vertical start position by `+30px` to keep flat-bottom bust lines hidden below the screen edge.
  - Shifted the centered about text container upwards (`-translate-y-10`) to increase visual spacing from the bottom crowd.
  - Added StrictMode mount checking (`isMounted`) to prevent duplicate GSAP ticker registrations.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added red tinting cache, coordinate detection hooks, dual-phase timelines, depth sorting, and layout shifts.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:38] Section 02 — "ABOUT" Crowd Resizing & Text Overlap Fix
- **Accomplishments**:
  - Solved text readability blockage by scaling down character dimensions to 45% of original size (approx. `90px` wide x `128px` tall) using `peepScale`.
  - Implemented dynamic crowd density regulation: instead of dumping all 105 sprites simultaneously, the simulator now maps the active crowd size responsively to screen width (`Math.min(15, Math.max(6, width / 120))`).
  - Constrained canvas size to `h-[25vh]` absolutely at the bottom edge, leaving a `10vh` margin below the vertically centered text container.
  - Aligned walking height offsets (`randomRange(-15, 15)`) to lock character paths tightly to the ground viewport floor.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Tuned CrowdCanvas sizing scales, offsets, viewport constraints, and density hooks.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:26] Shadcn MCP Server Initialization
- **Accomplishments**:
  - Ran `npx shadcn@latest mcp init` and selected the `Claude Code` configuration as the baseline compatibility layout.
  - Initialized standard MCP server configuration settings in the project.
  - Created [`.agents/mcp_config.json`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/.agents/mcp_config.json) in the workspace customization root to register the `shadcn` MCP server (`npx shadcn@latest mcp`) for Antigravity integration.
- **Key Files Modified**:
  - [`.agents/mcp_config.json`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/.agents/mcp_config.json): Created and configured standard MCP server settings.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:35] Section 02 — "ABOUT" Crowd Simulator Animation
- **Accomplishments**:
  - Downloaded the original walking crowd sprite sheet (`open-peeps-sheet.png` by Pablo Stanley) from Pen CDN, saving it locally to [`public/images/peeps/all-peeps.png`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/public/images/peeps/all-peeps.png).
  - Integrated Szenia Zadvornykh's popular HTML5 Canvas + GSAP "Crowd Simulator" engine as a React component [`CrowdCanvas`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx) in `About.tsx`.
  - Configured walking animations, horizontal direction changes, random speed scales, and bobbing movement for the sprite-sliced walking peeps on the canvas context.
  - Positioned the canvas absolutely at the bottom of the sticky wrapper (`h-[80vh] pointer-events-none z-5`), rendering the crowd dynamically behind the text centerpiece as the user scrolls.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added `CrowdCanvas` component code and rendered it inside the main viewport.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:12] Section 02 — "ABOUT" Idle Scroll Indicator
- **Accomplishments**:
  - Implemented a scroll idle detection listener using a React `useEffect` hook in [`About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx).
  - Configured a 7000ms (7-second) timeout that resets dynamically upon window `scroll` events, hiding the indicator when actively scrolling and fading it in during inactive periods.
  - Added a responsive, stylized scroll icon centered at the bottom of the sticky viewport (`absolute bottom-8 left-1/2 -translate-x-1/2`).
  - Styled the icon with a cursive `"scroll"` label (in primary accent color `#de3421`) and a custom CSS keyframe animated mouse scroll-wheel inside a `<style>` block.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Added timer listeners, scroll indicator layout, and mouse scroll animation keyframes.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:09] Hero Section — Navigation Centering & Hover Styling
- **Accomplishments**:
  - Restructured the header navigation container in [`Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx) from a flexbox to a `grid-cols-3` layout.
  - Centered the "About" and "Projects" navigation link pair in the exact horizontal center of the viewport regardless of viewport scaling.
  - Added hover transitions so that "About" and "Projects" change text color to red (`#de3421`, matching the primary-500 brand color) when hovered.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Centered navigation bar items via grid layout and updated hover color states.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-10 00:04] Section 02 — "ABOUT" Cursive Label Style
- **Accomplishments**:
  - Replaced the Section 02 header with `"About Me"` styled in the elegant monoline cursive font `Sacramento` (imported from Google Fonts).
  - Scaled the visual size of the cursive label up by 30-50% (`min(3.5vw, 1.15rem)`) to balance the visual weight of the script font strokes.
  - Removed capitalization (`uppercase`) and letter-spacing (`tracking-widest`) restrictions on the cursive label to ensure character connection lines remain perfectly legible.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Applied cursive typography variables, case alignment, and size scale updates to the label.
  - [`src/app/globals.css`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/globals.css): Imported the `Sacramento` Google Font and registered `--font-cursive` class.
- **Pending Tasks & Next Steps**:
  - Visually test the scroll reveal behavior on the local dev server.
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-09 23:48] Section 02 — "ABOUT" Typographic Scroll-Reveal Animation
- **Accomplishments**:
  - Removed the ambient background video and corresponding observers in favor of a clean, high-contrast modernist design style.
  - Extracted the Design DNA from `pamidordesign.com/#about` to establish a light-themed, typographic editorial look.
  - Aligned About typography font with [`Design.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Design.md), switching from `Funnel Display` to `Averia Serif Libre` (`font-display`).
  - Adjusted typographic scaling to a safe, legible range (`text-lg` to `xl:text-4xl`) to prevent the content from overflowing off-screen on desktop and mobile viewports.
  - Replaced the section header "SECTION 02 / ABOUT" with "ABOUT ME" styled in custom font `"society"`.
  - Resolved text overlap issues with the Hero page header/portrait by applying a default `opacity-0` hide class to the text container wrapper and using GSAP ScrollTrigger to fade the entire container in only after it is stickily pinned and the Hero card is fully covered.
  - Matched the section's background color with the body background `#fcf7f3` from [`Design.md`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/Design.md).
  - Re-implemented the scroll-triggered text-reveal animation in `About.tsx` using GSAP ScrollTrigger. The paragraph text splits into word spans, scrub-animating from low opacity (0.15) to full opacity (1.0) while the section pins stickily over a `300vh` scroll track.
  - Adaptive copywriting: personalized the extracted About text for Yash Raj while maintaining Pamidor's structure and voice.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Implemented dynamic word span split, typography size scaling, visibility controls, and GSAP scroll scrub timeline.
  - [`src/app/globals.css`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/globals.css): Cleaned up font imports by reverting the `Funnel Display` reference.
- **Pending Tasks & Next Steps**:
  - Visually test the scroll reveal behavior on the local dev server.
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-09 23:21] Section 02 — "ABOUT" Sticky Curtain Background
- **Accomplishments**:
  - Refactored the video background container to use CSS `sticky` positioning (`position: sticky; top: 0; h-screen; w-full;`) inside a `relative` transparent parent section.
  - Re-established the physical curtain transition: as the user scrolls, the About background container slides up from below to cover the fixed Hero cover page naturally, then pins natively at the top of the viewport while the text scrolls over it.
  - Kept all GPU hardware-accelerated layouts (`translateZ(0)`, `will-change: opacity, transform`) and viewport pre-loading buffer (`IntersectionObserver` with `150px` `rootMargin`) intact for locked 60fps performance.
  - Verified static page rendering and TypeScript compilation; `npm run build` completed successfully with code `0`.
- **Key Files Modified**:
  - [`src/components/About.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/About.tsx): Created the new About component.
  - [`src/app/page.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/page.tsx): Integrated the sticky-curtain structural wrapper.
  - [`src/components/Hero.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Hero.tsx): Added scrollbar unlocking logic upon intro end.
  - [`src/app/globals.css`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/app/globals.css): Configured default body scrolling and dynamic loading class styles.
- **Pending Tasks & Next Steps**:
  - Style Section 03 ("PROJECTS") card transitions.

## [2026-08-09 19:42] Loader Cursor-Follow Animation (Free Line Trail)
- **Accomplishments**:
  - Implemented a distance-constrained bead-chain follow algorithm for stickers in [`Loader.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Loader.tsx).
  - Sticker 0 follows the cursor directly, and each subsequent Sticker `i` follows Sticker `i-1` while maintaining a `35px` spacing separation. This causes them to trail behind the cursor in a smooth, continuous "free line" snake trail matching the layout shown in [`Loading animation example.png`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/New%20folder/Loading%20animation%20example.png).
  - Designed a dual-mode behavior:
    - **Interactive Mode**: Active when the user hovers/moves the mouse. Stickers break apart to follow the pointer path.
    - **Fallback/Idle Mode**: Active on load or when pointer leaves the screen. Stickers gently float back to center and stack up in their beautiful pre-structured pile layout.
  - Decreased the spawn distance to `55px` so the trail populates rapidly when the mouse starts moving.
  - Verified that TypeScript checks pass cleanly with code `0`.
- **Key Files Modified**:
  - [`src/components/Loader.tsx`](file:///C:/Users/hiiam/OneDrive/Desktop/Python/Portfolio/src/components/Loader.tsx): Redefined the follow loop to use a constrained chain and added pointer leave handlers to reset interaction state.
- **Pending Tasks & Next Steps**:
  - Visually test the smooth drag-trail interaction on the local next server.
