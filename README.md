# ✦ Glissix

<p align="center">
  <img src="https://raw.githubusercontent.com/nilanshukumarsingh/Glissix/main/apps/web/public/favicon.svg" alt="Glissix Logo" width="100" height="100" />
</p>

<h3 align="center">Glissix</h3>

<p align="center">
  <strong>An inertia-driven, spring-damper physics engine for tactile UI motion.</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/glissix"><img src="https://img.shields.io/npm/v/glissix.svg?style=for-the-badge&color=blue" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/glissix"><img src="https://img.shields.io/npm/dm/glissix.svg?style=for-the-badge&color=violet" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/package/glissix"><img src="https://img.shields.io/bundlephobia/minzip/glissix?style=for-the-badge&color=emerald" alt="Bundle Size" /></a>
  <a href="https://github.com/nilanshukumarsingh/Glissix/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/glissix.svg?style=for-the-badge&color=orange" alt="License" /></a>
</p>

---

## ✦ Overview

Traditional transition tools require you to specify a preset curve (like ease-out) and duration. If a user flicks an element halfway through an animation, the motion snaps awkwardly. 

**Glissix** models physical simulation—incorporating momentum, weight, and drag—so that interface elements feel dragged, flicked, and released naturally. It provides beautiful tactile motion presets like `LEATHER`, `RUBBER`, `HONEY`, and `GHOST`.

> [!TIP]
> **Why Glissix?**
> 1. **Preserved Momentum**: If a user drags and releases at speed, the swipe velocity is fed directly into the engine, producing a seamless decelerating slide.
> 2. **Dynamic Redirection**: Changing targets mid-flight alters the acceleration vector smoothly, preventing sudden direction snaps.
> 3. **Pure Math**: No browser timers or complex rendering context required, making it lightweight (**~2.2KB** gzipped) and framework-agnostic.

---

## ✦ Workspace Structure

This repository is organized as a monorepo workspace containing the core physics library, interactive test suites, and playground apps:

* 📦 **`packages/glissix`**: The core library package (published as **`glissix`** on npm), compiled to ESM, CJS, and TypeScript typings.
* 🖥️ **`apps/web`**: A highly polished, interactive visual playground built with Vite and raw CSS to test physics properties.
* 📖 **`apps/docs`**: A VitePress documentation portal detailing the mathematical model, API specifications, and presets.

---

## ✦ Installation

Install the package directly into your project:

```bash
npm install glissix
```

---

## ✦ Quick Start

### 1. Basic 2D Position Tracking (e.g. Card Drag & Flick)

```typescript
import { Glissix } from 'glissix';

// 1. Instantiate with starting coordinates (0, 0)
const tracker = new Glissix(0, 0);

// 2. Load a built-in tactile preset
tracker.useMaterial('LEATHER');

// 3. Target a new coordinate (e.g., when the user releases a drag)
tracker.setTarget(300, 150);

// 4. Inject an instantaneous speed (e.g. from pointer velocity tracker)
tracker.applyImpulse(25, -12);

// 5. Physics animation loop
function animate() {
  // Step computes the next physical coordinate based on delta forces
  const { x, y, vx, vy } = tracker.step();

  // Apply positions to CSS transform
  card.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  // Keep animating until the element settles
  const speed = tracker.getVelocity();
  const distToTarget = Math.hypot(tracker.getState().targetX - x, tracker.getState().targetY - y);

  if (speed > 0.001 || distToTarget > 0.01) {
    requestAnimationFrame(animate);
  }
}
animate();
```

### 2. Animating 1D Values (e.g. Drawer Swipe-to-Open)

You can use the helper `updateValue()` to drive single variables like sheet positions, opacity, scale, or scroll offsets:

```typescript
import { Glissix } from 'glissix';

const opacityTracker = new Glissix(0, 0); // initial value 0
opacityTracker.useMaterial('RUBBER');

function fadeOut() {
  function tick() {
    opacityTracker.updateValue(1.0, (val, speed) => {
      overlay.style.opacity = val.toString();
    });

    if (Math.abs(opacityTracker.getState().x - 1.0) > 0.001) {
      requestAnimationFrame(tick);
    }
  }
  tick();
}
```

---

## ✦ Core Physical Parameters

Unlike duration-based animators, Glissix uses a mathematical spring-mass-damper system:

| Parameter | Recommended Range | Description |
| :--- | :--- | :--- |
| **`mass`** | `0.1` - `10.0` | Represents the inertia of the moving element. A higher mass creates a feeling of weight, taking longer to accelerate and decelerate. |
| **`tension`** | `0.001` - `1.0` | Represents the stiffness of the spring. High tension pulls the element toward the target aggressively, while lower tension feels loose. |
| **`friction`** | `0.01` - `0.999` | Represents the damping or resistance. High friction dampens oscillation quickly, while low friction lets the element bounce. |

---

## ✦ Tactile Material Presets

Load pre-configured properties directly using `tracker.useMaterial('PRESET')`:

| Material Preset | Mass | Tension | Friction | Physical Feeling |
| :--- | :--- | :--- | :--- | :--- |
| 🪵 **`LEATHER`** | `2.0` | `0.10` | `0.85` | Heavy, draggy, premium tactile dampening |
| 🪀 **`RUBBER`** | `0.5` | `0.40` | `0.70` | Snappy, highly responsive, elastic spring |
| 🍯 **`HONEY`** | `5.0` | `0.05` | `0.95` | Slow, high-viscosity, super smooth glide |
| 👻 **`GHOST`** | `0.1` | `0.20` | `0.99` | Float-like, almost frictionless motion |

---

## ✦ API Reference

### `new Glissix(initialX, initialY, config?)`
Creates a new motion controller.
* `initialX`: Starting position along X axis.
* `initialY`: Starting position along Y axis.
* `config`: Optional object containing `{ mass, tension, friction }` (values are automatically clamped).

### `setTarget(x, y)`
Sets the new destination coordinates.

### `applyImpulse(vx, vy)`
Injects instantaneous impulse velocity (adds to current velocity). Perfect for throwing/flicking cards or lists.

### `step()`
Performs a single simulation step. Returns the current physics metrics: `{ x, y, vx, vy }`.

### `updateValue(target, callback)`
Steps a single scalar value. Sets target-x to `target` and returns the output via the callback: `callback(value, velocity)`.

### `useMaterial(name)`
Loads a pre-tuned configuration (`'LEATHER' | 'RUBBER' | 'HONEY' | 'GHOST'`).

### `setConfig(config)`
Modifies the active configuration fields on-the-fly.

### `getVelocity()`
Returns the scalar magnitude of the current velocity vector (speed).

### `getState()`
Returns the exact physics simulation state copy: `{ x, y, vx, vy, targetX, targetY }`.

### `reset(x?, y?)`
Resets the position, target, and sets velocities to zero.

---

## ✦ Local Workspace Setup

To run the playground and documentation sites locally:

### 1. Installation
```bash
npm install
```

### 2. Running the Visual Playground (`apps/web`)
Launches the interactive visual playground at `http://localhost:5173/`:
```bash
npm run dev:web
```

### 3. Running the Documentation Portal (`apps/docs`)
Launches the VitePress documentation site at `http://localhost:5174/`:
```bash
npm run dev:docs
```

### 4. Running the Tests
Runs the Vitest test suite for the core library:
```bash
npm run test
```


---

## ✦ Production Deployment & Routing (Vercel Single-Domain)

For production, each monorepo package is deployed as an independent Vercel project and unified under a single root domain via **Vercel Rewrites**:

1. **`apps/web`** (Main domain, e.g. `glissix.vercel.app`)
2. **`apps/docs`** (Served at `/docs` subpath via rewrite pointing to `glissix-docs.vercel.app`)
3. **`apps/verify-glissix`** (Served at `/verify` subpath via rewrite pointing to `glissix-verify.vercel.app`)

The proxying and path rewriting are handled automatically by [apps/web/vercel.json](file:///c:/Users/asus/Desktop/glissade/apps/web/vercel.json):

```json
{
  "rewrites": [
    {
      "source": "/docs",
      "destination": "https://glissix-docs.vercel.app"
    },
    {
      "source": "/docs/:path*",
      "destination": "https://glissix-docs.vercel.app/:path*"
    },
    {
      "source": "/verify",
      "destination": "https://glissix-verify.vercel.app"
    },
    {
      "source": "/verify/:path*",
      "destination": "https://glissix-verify.vercel.app/:path*"
    }
  ]
}
```

---

## ✦ Creator

Developed and maintained by **Nilanshu Kumar Singh**:
* **LinkedIn**: [nilanshukumarsingh](https://www.linkedin.com/in/nilanshukumarsingh/)
* **Twitter/X**: [@nilanshukumar81](https://x.com/nilanshukumar81)

## ✦ License

MIT
