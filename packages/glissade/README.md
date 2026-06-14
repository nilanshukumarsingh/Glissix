# Glissade

An inertia-driven, spring-damper physics engine for tactile UI motion. Focuses on physical simulation (momentum, weight, and drag) so that interface elements feel dragged, flicked, and released naturally, instead of executing rigid time-based bezier curves.

[![npm version](https://img.shields.io/npm/v/glissade.svg?style=flat-square)](https://www.npmjs.com/package/glissade)
[![npm downloads](https://img.shields.io/npm/dm/glissade.svg?style=flat-square)](https://www.npmjs.com/package/glissade)
[![license](https://img.shields.io/npm/l/glissade.svg?style=flat-square)](https://github.com/nilanshukumarsingh/Glissade)

---

## ✦ Features

- **Tactile Material Presets**: Load physically pre-tuned configurations like `LEATHER`, `RUBBER`, `HONEY`, and `GHOST`.
- **Dynamic Impulse Injection**: Inject instantaneous speed at any time (`applyImpulse`) to support fluid swipe-and-flick gestures.
- **Auto-Sanitized Physics**: Automatic clamping limits for mass, tension, and friction to guarantee mathematical stability and prevent spring explosion or jitter.
- **Framework Agnostic**: Pure TypeScript library with zero dependencies. Runs seamlessly in React, Vue, Svelte, or vanilla JS/TS.
- **Ultra-Lightweight**: Only **~2.2KB** gzipped.

---

## ✦ Core Physical Parameters

Unlike duration-based animators, Glissade uses a mathematical spring-mass-damper system:

* **`mass` (0.1 - 10.0)**: Represents the inertia of the moving element. A higher mass creates a feeling of weight, taking longer to accelerate and decelerate.
* **`tension` (0.001 - 1.0)**: Represents the stiffness of the spring. High tension pulls the element toward the target aggressively, while lower tension feels loose.
* **`friction` (0.01 - 0.999)**: Represents the damping or resistance. High friction dampens oscillation quickly (critical damping), while low friction lets the element bounce.

---

## ✦ Installation

```bash
npm install glissade
```

---

## ✦ Quick Start

### 1. Basic 2D Position Tracking (e.g. Card Drag & Flick)

```typescript
import { Glissade } from 'glissade';

// Instantiate with starting coordinates (0, 0)
const tracker = new Glissade(0, 0);

// Use a built-in tactile preset
tracker.useMaterial('LEATHER');

// Target a new coordinates (e.g., when the user releases a drag)
tracker.setTarget(300, 150);

// Inject an instantaneous speed (e.g. from pointer velocity tracker)
tracker.applyImpulse(25, -12);

// Physics animation loop
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
import { Glissade } from 'glissade';

const opacityTracker = new Glissade(0, 0); // initial value 0
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

## ✦ Presets & Materials

| Material Preset | Mass | Tension | Friction | Physical Feeling |
| :--- | :--- | :--- | :--- | :--- |
| **`LEATHER`** | `2.0` | `0.10` | `0.85` | Heavy, draggy, premium tactile dampening |
| **`RUBBER`** | `0.5` | `0.40` | `0.70` | Snappy, highly responsive, elastic spring |
| **`HONEY`** | `5.0` | `0.05` | `0.95` | Slow, high-viscosity, super smooth glide |
| **`GHOST`** | `0.1` | `0.20` | `0.99` | Float-like, almost frictionless motion |

---

## ✦ API Reference

### Constructor
```typescript
const tracker = new Glissade(initialX: number, initialY: number, config?: Partial<GlissadeConfig>);
```
Creates a new motion controller.
- `initialX`: Initial position along the X axis.
- `initialY`: Initial position along the Y axis.
- `config`: Optional configuration object (values are automatically clamped):
  - `mass` (defaults to `1.0`)
  - `tension` (defaults to `0.15`)
  - `friction` (defaults to `0.82`)

### Instance Methods

#### `setTarget(x: number, y: number): void`
Sets the new destination coordinates.

#### `applyImpulse(vx: number, vy: number): void`
Injects an instantaneous impulse velocity (adds to current velocity). Perfect for throwing/flicking cards or lists.

#### `step(): GlissadeStep`
Performs a single simulation step. Returns the current physics metrics:
`{ x: number, y: number, vx: number, vy: number }`

#### `updateValue(target: number, callback: (value: number, velocity: number) => void): void`
Steps a single scalar value. Sets target-x to `target` and returns the output via the callback.

#### `useMaterial(name: GlissadeMaterial): void`
Loads a pre-tuned configuration (`'LEATHER' | 'RUBBER' | 'HONEY' | 'GHOST'`).

#### `setConfig(config: Partial<GlissadeConfig>): void`
Modifies the active configuration fields on-the-fly.

#### `getVelocity(): number`
Returns the scalar magnitude of the current velocity vector (speed).

#### `getState(): GlissadeState`
Returns the exact physics simulation state copy:
`{ x, y, vx, vy, targetX, targetY }`

#### `reset(x?: number, y?: number): void`
Resets the position, target, and sets velocities to zero.

---

## ✦ Why Glissade?

Traditional transition tools require you to specify a preset curve (like ease-out) and duration. If a user flicks an element halfway through an animation, the motion snaps awkwardly. 

**Glissade solves this**:
1. **Preserved Momentum**: If a user drags and releases at speed, the swipe velocity is fed directly into the engine, producing a seamless decelerating slide.
2. **Dynamic Redirection**: Changing targets mid-flight alters the acceleration vector smoothly, preventing sudden direction snaps.
3. **Pure Math**: No browser timers or complex rendering context is required, making it incredibly lightweight and deterministic.

---

## ✦ License

MIT
