---
layout: home

hero:
  name: Glissade
  text: Inertia-driven motion for tactile interfaces
  tagline: Build UI that feels grabbed, weighted, and released instead of simply tweened.
  actions:
    - theme: brand
      text: Get Started
      link: /guide/getting-started
    - theme: alt
      text: Read the API
      link: /api/glissade
    - theme: alt
      text: Motion Model
      link: /guide/motion-model

features:
  - title: Pointer-first physics
    details: Translate live pointer movement into smooth velocity, drag, and settling behavior with a small class-based engine.
  - title: Stable by default
    details: Runtime clamping prevents broken configs from sending motion into unstable ranges.
  - title: Rendering stays in your app
    details: Glissade computes state only. You decide whether the result drives DOM, canvas, WebGL, or another renderer.
  - title: Built for tactile UI
    details: The target is interactive product motion such as cards, cursors, sheets, floating surfaces, and magnetic elements.
---

## What Glissade is

Glissade is a focused motion primitive for interfaces that need weight and drag. It does not try to be a full animation framework. It gives you a compact state engine that can be stepped every frame and connected to any rendering layer.

## Why the docs open separately in local development

The project is a monorepo with two apps:

- `apps/web` is the interactive landing page and playground on `localhost:5173`
- `apps/docs` is the VitePress documentation site on `localhost:5174`

That split is intentional. It keeps the demo app and the docs app independent while you develop them.

## Recommended first read

Start with [Getting Started](/guide/getting-started), then move to [Motion Model](/guide/motion-model) once you want to tune the feel more precisely.
