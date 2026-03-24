# Getting Started

Glissade is a small physics engine for UI motion where the feel matters as much as the destination.

## Install

```bash
npm install glissade
```

## Mental model

You create one `Glissade` instance for one moving thing. Each frame:

1. Send it a target with `setTarget(x, y)`.
2. Advance the simulation with `step()`.
3. Render the returned position however you want.

The engine does not touch the DOM for you. That separation keeps it framework-agnostic.

## Quick start

```ts
import { Glissade } from 'glissade'

const card = document.querySelector('.card') as HTMLElement

const motion = new Glissade(0, 0, {
  mass: 1,
  tension: 0.15,
  friction: 0.82,
})

window.addEventListener('pointermove', (event) => {
  motion.setTarget(event.clientX, event.clientY)
})

function tick() {
  const { x, y } = motion.step()
  card.style.transform = `translate3d(${x}px, ${y}px, 0)`
  requestAnimationFrame(tick)
}

tick()
```

Glissade only computes state. Your app decides how to render that state.

## Config reference

- `mass`: Heavier motion accelerates more slowly.
- `tension`: Higher tension closes the distance to the target faster.
- `friction`: Lower friction burns off velocity sooner; higher friction lets motion glide longer.

## Typical use cases

- Pointer followers and spotlight cursors
- Draggable cards with snap-back behavior
- Magnetic buttons and icon clusters
- Floating tool palettes and panels
- Experimental canvas and WebGL interactions

## Try the demo app

From the monorepo root:

```bash
cmd /c npm.cmd run dev:web
```

That starts the interactive Obsidian Lab playground in `apps/web`.

## Run the docs locally

```bash
cmd /c npm.cmd run dev:docs
```

The docs app runs separately from the landing page during development.
