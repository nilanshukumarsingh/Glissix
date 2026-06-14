# Glissade

An inertia-driven physics engine for tactile UI motion. Focuses on inertia, weight, and friction so interface elements feel dragged, pulled, and released instead of simply animated from A to B.

[![npm version](https://img.shields.io/npm/v/glissade.svg)](https://www.npmjs.com/package/glissade)
[![license](https://img.shields.io/npm/l/glissade.svg)](https://github.com/nilanshu/glissade)

## Features

- **Tactile Presets**: Built-in physical materials like `LEATHER`, `RUBBER`, `HONEY`, and `GHOST`.
- **Impulse Injection**: Dynamic velocity injection with `applyImpulse()` for natural flick & throw animations.
- **Dynamic Spring Math**: Uses mass, tension, and friction to compute frame-by-frame spring physics.
- **Clamped Configs**: Automatic runtime verification and clamping to prevent unstable spring behavior or system crashes.
- **Zero Dependencies**: Tiny, self-contained, high-performance module written in TypeScript.

## Installation

```bash
npm install glissade
```

## Quick Start

```typescript
import { Glissade } from 'glissade';

// Initialize at start position (0, 0)
const motion = new Glissade(0, 0);

// Use a built-in tactile material
motion.useMaterial('LEATHER');

// Target a new UI position
motion.setTarget(200, 100);

// Inject a starting flick velocity (vx: 15, vy: -5)
motion.applyImpulse(15, -5);

// Physics animation loop
function tick() {
  const state = motion.step(); // Returns { x, y, vx, vy }
  
  // Apply to element style
  element.style.transform = `translate3d(${state.x}px, ${state.y}px, 0)`;
  
  if (motion.getVelocity() > 0.001 || 
      Math.abs(motion.getState().targetX - state.x) > 0.01) {
    requestAnimationFrame(tick);
  }
}
tick();
```

### Animating Single Values (Drawer, Sheets, Toggles)

Use `updateValue` to step a single dimension:

```typescript
import { Glissade } from 'glissade';

const motion = new Glissade(0, 0);

function animateDrawer(isOpen: boolean) {
  const targetValue = isOpen ? 300 : 0;
  
  function step() {
    motion.updateValue(targetValue, (currentVal, velocity) => {
      drawerElement.style.transform = `translateX(${currentVal}px)`;
    });
    
    if (Math.abs(motion.getState().x - targetValue) > 0.01) {
      requestAnimationFrame(step);
    }
  }
  step();
}
```

## API Reference

### `new Glissade(initialX: number, initialY: number, config?: Partial<GlissadeConfig>)`
Creates a new motion tracker.
* `initialX`: Initial X position.
* `initialY`: Initial Y position.
* `config`: Optional configuration object:
  * `mass`: Inertia weight (clamped between `0.1` and `10.0`).
  * `tension`: Spring pull factor (clamped between `0.001` and `1.0`).
  * `friction`: Drag attenuation (clamped between `0.01` and `0.999`).

### Methods

* `setTarget(x: number, y: number): void`
  Sets the target destination.
* `step(): GlissadeStep`
  Performs one physics update step and returns the updated state `{ x, y, vx, vy }`.
* `applyImpulse(vx: number, vy: number): void`
  Adds instantaneous velocity (useful for flicking and gestures).
* `useMaterial(name: GlissadeMaterial): void`
  Loads a pre-configured material config (`LEATHER`, `RUBBER`, `HONEY`, `GHOST`).
* `setConfig(config: Partial<GlissadeConfig>): void`
  Directly updates active mass, tension, or friction with sanitization and clamping.
* `getVelocity(): number`
  Returns current speed (hypotenuse of vx and vy).
* `getState(): GlissadeState`
  Returns clone of current internal state `{ x, y, vx, vy, targetX, targetY }`.
* `reset(x?: number, y?: number): void`
  Resets current position and target position to the specified coordinates with zero velocity.

## Built-In Materials

| Material | Mass | Tension | Friction | Description |
| :--- | :--- | :--- | :--- | :--- |
| `LEATHER` | `2.0` | `0.10` | `0.85` | Heavy, draggy, solid tactile feel |
| `RUBBER` | `0.5` | `0.40` | `0.70` | Snappy, bouncy, rapid response |
| `HONEY` | `5.0` | `0.05` | `0.95` | Extremely slow, viscous, smooth drag |
| `GHOST` | `0.1` | `0.20` | `0.99` | Light, almost frictionless, floaty motion |

## License

MIT
