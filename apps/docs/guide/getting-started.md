# Getting Started

## Install

```bash
npm install glissade
```

## Quick start

```ts
import { Glissade } from 'glissade'

const motion = new Glissade(0, 0, {
  mass: 1,
  tension: 0.15,
  friction: 0.82,
})

motion.setTarget(240, 120)

function tick() {
  const { x, y } = motion.step()
  card.style.transform = `translate3d(${x}px, ${y}px, 0)`
  requestAnimationFrame(tick)
}

tick()
```

Glissade only computes state. Your app decides how to render that state.

## Try the demo app

From the monorepo root:

```bash
cmd /c npm.cmd run dev:web
```

That starts the interactive Obsidian Lab playground in `apps/web`.
