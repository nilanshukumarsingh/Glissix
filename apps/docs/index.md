---
layout: home

hero:
  name: Glissix
  text: Tactical UI Motion Engine
  tagline: Inertia-driven interface motion that reacts to drag, flick momentum, and target intents.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: API Reference
      link: /api/glissix
    - theme: alt
      text: Motion Model
      link: /guide/motion-model

features:
  - title: ✦ Pointer-First Physics
    details: Translate live pointer vectors and speeds directly into fluid tactile response, drag resistance, and natural elastic bounds.
  - title: ✦ Clamped & Safe Runtime
    details: Math safety clamps ensure mass, tension, and friction parameters remain in mathematically stable bounds, preventing spring explosion or infinite oscillation.
  - title: ✦ Zero Rendering Side-Effects
    details: Computes pure coordinate vectors. The engine is entirely decoupled from the rendering pipeline, enabling it to drive React, Svelte, Vue, vanilla DOM, Canvas, WebGL, or shaders.
  - title: ✦ Featherweight Footprint
    details: Written in pure TypeScript with zero runtime dependencies. The entire engine compiles to under ~2.2KB gzipped.
---

<div class="home-hero-badge" style="text-align: center; margin: 40px auto; padding: 20px; background: rgba(125, 211, 255, 0.05); border: 1px solid rgba(125, 211, 255, 0.1); border-radius: 12px; max-width: 640px;">
  <p style="margin: 0; font-family: monospace; font-size: 1rem; color: #7dd3ff; letter-spacing: 0.05em;">
    npm install glissix
  </p>
</div>

## Why Glissix?

Traditional transition tools require you to specify a preset easing curve and a fixed duration. If a user interrupts an active motion by dragging or throwing the element, the velocity snaps awkwardly.

**Glissix** resolves this by preserving physical state:
1. **Momentum Injection**: If a user drags and releases at speed, the swipe velocity is fed directly into the engine, producing a seamless decelerating slide.
2. **Dynamic Redirection**: Changing targets mid-flight alters the acceleration vector smoothly, preventing sudden direction snaps.
3. **Pure Math**: No browser timers or complex rendering context is required, making it incredibly lightweight and deterministic.

## Explore the Sandbox

Visit the interactive visual playground at [http://localhost:5173/](http://localhost:5173/) to inspect the vector field, tune the mass knob, try the bottom drawer, and visualize the motion waveforms in real time.
