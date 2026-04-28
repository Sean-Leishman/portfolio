# Setup

## Prerequisites

- Node.js (the repo does not pin a version; any version that works with
  Vite 4 and the listed dependencies is fine)
- npm

## Install

From the project root:

```
npm install
```

This installs Three.js (r153), Vite 4, `@theatre/core`, and `@theatre/studio`
based on `package.json` and the lockfile.

## Local development

Start the Vite dev server:

```
npm run dev
```

Vite serves `index.html` and hot-reloads when `main.js`, `animations.js`,
`index.css`, or any of the `three-lib/` modules change.

## Production build

```
npm run build
```

The build output is written to `public/` (configured in `vite.config.js`).
This is intentional so that Firebase Hosting, which is set to serve from
`public/`, picks up the latest build directly.

To preview the built site locally:

```
npm run preview
```

## Firebase deploy

Deployment is automated. Pushing to `master` triggers
`.github/workflows/firebase-hosting-merge.yml`, which runs
`npm ci && npm run build` and deploys the `public/` output to the `live`
channel of the `portolfio-2c85b` Firebase project.

A second workflow (`firebase-hosting-pull-request.yml`) deploys preview
channels for pull requests.

For manual deploys you would need the Firebase CLI installed and to be
authenticated against the `portolfio-2c85b` project; manual deploys are not
the normal path.

## Tests

There are none. `npm test` is the default placeholder that exits with an
error.

## Notes

- The Firebase project id (`portolfio-2c85b`) contains a typo that is also
  present in the deploy workflow secret name. Leave it as-is unless you are
  also renaming the Firebase project.
- `node_modules/` and `public/` are tracked or generated as appropriate; the
  build expects to overwrite `public/` on every build.
