# Notes

## Status

This is the **older** portfolio site. It has been superseded by the
`portfolio-2025` repo, which is the current source of truth for the personal
site. Treat this repo as historical: useful as a reference for the Three.js
boids scene and the hand-rolled scroll animation patterns, but not the place
to make new changes for the live portfolio.

## Things worth knowing if you do touch it

- The Firebase project id is misspelled as `portolfio-2c85b` in
  `.firebaserc` and the deploy workflow. Don't "fix" it without also
  renaming the Firebase project, or deploys will break.
- The Vite build writes to `public/` (not `dist/`) because Firebase Hosting
  serves from `public/`. A `dist/` directory exists at the root but is not
  what Firebase serves.
- `@theatre/core` and `@theatre/studio` are installed, but the source files
  read during documentation did not show them being imported. They may be
  unused.
- `npm test` is a placeholder; there are no tests.
- The intro section's 3D scene mounts into `#scene-container`. If you change
  the markup, keep that id intact or `main.js` will throw.
- Project cards rely on viewport-width-driven classes added by
  `addProjectClasses()` in `animations.js`. If you add new card layouts,
  remember to extend that function.
- The `Loop` exposes `updateToUpdate(obj)` to register per-frame updaters;
  the boid flock uses this. The naming is unusual but functional.

## Open questions

- Whether `dist/` should be in `.gitignore`; it currently appears to be
  carried alongside `public/`.
- Whether the commented-out `AfterimagePass` and `GammaCorrectionShader` in
  `composer.js` are intentional (kept for easy A/B) or just leftover.
- Whether any of the Theatre.js setup ever shipped in a previous commit.

## Pointer to the current site

For active portfolio work, see the `portfolio-2025` repo.
