# Portfolio (older)

## Purpose
Personal portfolio website for Sean Leishman, an undergraduate computer science
student at the University of Edinburgh. The landing page introduces the author,
shows projects, experience and courses, and includes a Three.js boids animation
in a dedicated scene container. This is the older portfolio site, superseded by
the `portfolio-2025` repo.

## Tech stack
- Plain HTML / CSS / JavaScript (no framework)
- Vite 4 as the dev server and bundler
- Three.js (r153) for the 3D scene, including post-processing passes
  (`EffectComposer`, `UnrealBloomPass`, `AfterimagePass`, `OutputPass`,
  `GammaCorrectionShader`)
- `@theatre/core` and `@theatre/studio` listed as dependencies (animation
  tooling; usage in the current code is minimal)
- Firebase Hosting for deployment, with a GitHub Actions workflow that builds
  and deploys on merge to `master`

## Key files / entry points
- `index.html` — single-page markup with all sections (intro, projects,
  experience, courses, etc.)
- `index.css` — all styling
- `main.js` — bootstraps the Three.js `World` into `#scene-container`
- `animations.js` — IntersectionObserver-driven scroll animations and
  prev/next project carousel logic
- `three-lib/World.js` — top-level Three.js scene orchestrator
- `three-lib/components/` — `camera.js`, `scene.js`, `cube.js`, `boids/`
- `three-lib/components/boids/Boids.js` — boid flock construction
- `three-lib/systems/` — `renderer.js`, `composer.js`, `Loop.js`,
  `Resizer.js`, `MouseHandler.js`
- `vite.config.js` — sets the build `outDir` to `public/` (Firebase serves
  from `public/`)
- `firebase.json`, `.firebaserc` — Firebase Hosting config (project
  `portolfio-2c85b`, note the typo in the project id)
- `.github/workflows/firebase-hosting-merge.yml` — deploy on push to master
- `assets/` — images, icons, models, static files referenced by the page

## How to run / dev
- Install: `npm install`
- Dev server: `npm run dev` (Vite)
- Production build: `npm run build` (outputs to `public/`)
- Preview build: `npm run preview`
- `npm test` is a placeholder that exits 1 — there are no tests

## Conventions noticed
- ES module imports throughout the Three.js code under `three-lib/`
- Three.js code is split between `components/` (scene objects) and `systems/`
  (rendering, resizing, animation loop, input)
- A single `World` class wires everything together in its constructor and
  exposes `start()` / `stop()` / `render()`
- Scroll-in animations are class-based (`hidden`, `show`, `animate-left`,
  `animate-right`, `animate-down`) toggled by IntersectionObservers
- Project carousel state is driven by a `currentButtonIndex` shared between
  `prev-button` and `next-button` handlers in `animations.js`

## Gaps / unknowns
- The README is two lines and points at `package.json` for build instructions.
- No tests, no linter config, no formatter config in the repo.
- `@theatre/*` is installed but I did not find live usage in the source files
  read; it may be vestigial.
- The Firebase project id `portolfio-2c85b` contains a typo that has been
  carried through `.firebaserc` and the deploy workflow.
- `dist/` and `public/` both exist at the root; `public/` is the Vite output
  and is what Firebase serves. The role of any pre-existing `dist/` is unclear.
