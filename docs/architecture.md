# Architecture

The site is a single static HTML page (`index.html`) styled by `index.css`,
with two JavaScript entry points loaded by Vite:

- `main.js` — instantiates the Three.js `World` and starts its loop.
- `animations.js` — wires up scroll-in animations and the project carousel.

The Three.js code lives under `three-lib/` and is structured into
`components/` (scene content) and `systems/` (machinery around rendering and
input).

## Page layout

`index.html` is a long, hand-written document with named sections for the
intro, project cards, experience, and courses. Section visibility and entry
animations are driven by CSS classes that `animations.js` toggles when each
element scrolls into view.

The intro section contains a `#scene-container` element. `main.js` mounts the
Three.js renderer's canvas into this element, so the 3D scene sits behind /
inside the intro block rather than covering the whole page.

## Three.js world

`three-lib/World.js` is the orchestrator. In its constructor it:

1. Creates a camera (`components/camera.js`), scene (`components/scene.js`)
   and renderer (`systems/renderer.js`).
2. Sets up a `Resizer` that keeps the camera aspect and renderer size in sync
   with the container (`systems/Resizer.js`).
3. Creates a `MouseHandler` for pointer input (`systems/MouseHandler.js`).
4. Builds an `EffectComposer` with `RenderPass`, `UnrealBloomPass` and
   `OutputPass` enabled, plus `AfterimagePass` and `GammaCorrectionShader`
   defined but commented out (`systems/composer.js`).
5. Creates a `Loop` that ticks the renderer / composer each frame and lets
   you register objects with an `update` method via `updateToUpdate`
   (`systems/Loop.js`).
6. Creates a `Boids` flock with 250 boids and adds its group to the scene,
   then registers it with the loop so it animates each frame
   (`components/boids/Boids.js`).

`World.start()` and `World.stop()` proxy to the loop. `World.render()` calls
the bare renderer (the production path goes through the composer).

## Boids

`Boids` builds a `THREE.Group` containing a containment shape and a fixed
number of boid meshes, each with a randomly tinted material. Per-frame
behaviour is driven by `boids_update_helper` from
`three-lib/components/boids/functions.js`.

## Scroll animations and carousel

`animations.js` defines two IntersectionObservers:

- A default observer that adds `show` (and conditionally `animate-left` /
  `animate-right` for grid children that span two columns or rows) when an
  element enters the viewport.
- A left observer used to stagger project cards.

`addProjectClasses()` runs on load and, depending on viewport width, marks
project cards with `animate-left`, `animate-right`, or `animate-down` so the
CSS transitions slide them in from the right direction.

The project carousel is driven by two arrays of buttons (`.prev-button`,
`.next-button`) that toggle `show-left`, `show-right`, `show-button`, and
`hidden-button` classes on the `.project-area` and `.project-grid-container`
elements. A single `currentButtonIndex` keeps the visible prev/next pair in
sync.

## Build and deploy

Vite is configured (in `vite.config.js`) to write its build output to
`public/` rather than the default `dist/`. Firebase Hosting is configured
(in `firebase.json`) to serve from `public/`, so `npm run build` produces
exactly the directory that Firebase will deploy.

The GitHub Actions workflow `.github/workflows/firebase-hosting-merge.yml`
runs `npm ci && npm run build` and then deploys to the `live` channel of the
`portolfio-2c85b` Firebase project on every push to `master`. A second
workflow handles preview channels for pull requests.
