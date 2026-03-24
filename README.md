# Glissade

Glissade is a small TypeScript physics engine for tactile UI motion. It focuses on inertia, weight, and friction so interface elements feel dragged, pulled, and released instead of simply animated from A to B.

## Features

- Material presets such as `LEATHER`, `RUBBER`, `HONEY`, and `GHOST`
- Velocity injection with `applyImpulse()` for throw and flick interactions
- Scalar animation helper with `updateValue()` for drawers, sheets, and toggles
- Runtime-safe config clamping to keep motion stable
- Zero runtime dependencies

## Workspace Layout

```text
glissade/
|- package.json
|- apps/
|  |- docs/
|  `- web/
`- packages/
   `- glissade/
```

## Install

From the repo root:

```powershell
cmd /c npm.cmd install
```

If your PowerShell execution policy allows npm scripts, plain `npm install` also works.

## Development

Run the demo site:

```powershell
cmd /c npm.cmd run dev:web
```

Run the docs site:

```powershell
cmd /c npm.cmd run dev:docs
```

Build the package only:

```powershell
cmd /c npm.cmd run build:pkg
```

Build everything:

```powershell
cmd /c npm.cmd run build
```

Run tests:

```powershell
cmd /c npm.cmd run test
```

## Package Quick Start

```ts
import { Glissade } from 'glissade'

const motion = new Glissade(0, 0)

motion.useMaterial('LEATHER')
motion.applyImpulse(8, -4)
motion.setTarget(240, 120)

function frame() {
  const { x, y } = motion.step()
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`
  requestAnimationFrame(frame)
}

frame()
```

## Testing Checklist

1. Install dependencies from the repo root with `cmd /c npm.cmd install`.
2. Run `cmd /c npm.cmd run test` and confirm the Vitest suite passes.
3. Run `cmd /c npm.cmd run build:pkg` and confirm the package emits `dist/`.
4. Run `cmd /c npm.cmd run dev:web` and verify the Magnetic Core, Signal Analyzer, Specimen Drawer, and Elastic Chain demos.
5. Run `cmd /c npm.cmd run dev:docs` and verify the docs pages load.
6. Run `cmd /c npm.cmd pack --dry-run --workspace glissade` before publishing.

## Publish

After tests and build pass:

```powershell
cmd /c npm.cmd pack --dry-run --workspace glissade
cmd /c npm.cmd publish --workspace glissade --access public
```
