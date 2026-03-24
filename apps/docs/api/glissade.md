# Glissade API

## `new Glissade(initialX, initialY, config?)`

Creates an engine with an initial position and optional config overrides.

## `setTarget(x, y)`

Updates the position the engine will move toward.

## `step()`

Advances the simulation by one frame and returns:

```ts
{
  x: number
  y: number
  vx: number
  vy: number
}
```

## `getState()`

Returns current position, velocity, and target values.

## `setConfig(config)`

Merges and sanitizes config values at runtime.

## `reset(x?, y?)`

Resets position and velocity. If coordinates are omitted, it resets to the current target.
