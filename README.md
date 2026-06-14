# Glissade Workspace

Glissade is a lightweight, high-performance TypeScript physics engine for tactile UI motion. It models inertia, mass, tension, and friction so that interface components feel dragged, pulled, and naturally released rather than following artificial cubic-bezier curves.

This repository is organized as a monorepo workspace containing the core physics engine library, interactive test suites, and documentation.

---

## Workspace Packages

- **`packages/glissade`**: The core library package compiled to ESM, CJS, and TypeScript typings.
- **`apps/web`**: A highly polished, interactive visual playground built with Vite and raw CSS to test physics properties.
- **`apps/docs`**: A VitePress documentation portal detailing the mathematical model, API specifications, and presets.

---

## Interactive Playground Modules (`apps/web`)

The web app includes four sandbox modules that let you audit, test, and tune the spring mathematics:

1. **Magnetic Core (Stress Field)**: An interactive vector field displaying physical coordinates, force vectors, and instant feedback for presets like `LEATHER`, `RUBBER`, `HONEY`, and `GHOST`.
2. **Signal Analyzer (Oscilloscope)**: Plots real-time kinetic wave graphs for displacement and velocity, tracking peak values and settling times.
3. **Specimen Drawer (Kinetic Bottom Sheet)**: A bottom sheet demo implementing swipe-to-close gestures, velocity injection on release, and bouncy boundary limits.
4. **Elastic Chain (Kinematics)**: A chain of connected spring masses displaying kinetic propagation and inertia transfer across connected elements.

---

## Installation & Setup

Set up the workspace dependencies from the root directory:

```bash
# Install all dependencies across workspaces
npm install
```

---

## Scripts

All scripts can be run directly from the workspace root:

### Running Applications

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev:web` | Start Playground | Launches the interactive visual playground at `http://localhost:5173/` |
| `npm run dev:docs` | Start Docs | Launches the VitePress documentation site |

### Building Packages

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run build` | Build Workspace | Compiles the library and builds both static websites for production |
| `npm run build:pkg` | Build Library | Compiles the core `glissade` library only (emits `dist/` folders) |

### Testing

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run test` | Run Test Suite | Executes the Vitest unit tests for the core physics engine |

---

## Package Usage Quick Start

Once the package is installed in your project (`npm install glissade`), initialize it as follows:

```typescript
import { Glissade } from 'glissade';

// 1. Instantiate with a starting coordinate (0, 0)
const motion = new Glissade(0, 0);

// 2. Select a pre-tuned tactile material preset
motion.useMaterial('LEATHER');

// 3. Move target position on user action (e.g. pointermove)
motion.setTarget(150, 300);

// 4. Inject speed on flick/release (velocity-x: 20, velocity-y: -10)
motion.applyImpulse(20, -10);

// 5. Update coordinates inside requestAnimationFrame loop
function animate() {
  const { x, y } = motion.step(); // Computes next frame coordinates
  element.style.transform = `translate3d(${x}px, ${y}px, 0)`;

  if (motion.getVelocity() > 0.001) {
    requestAnimationFrame(animate);
  }
}
animate();
```

---

## Publishing to NPM

To publish a new version of the package:

1. Build the library target:
   ```bash
   npm run build:pkg
   ```
2. Navigate to the package directory:
   ```bash
   cd packages/glissade
   ```
3. Run the publish command with public access:
   ```bash
   npm publish --access public
   ```
   *Note: If your account enforces Two-Factor Authentication (2FA), open the generated browser verification link and press **Enter** to finalize the upload.*

---

## License

MIT
