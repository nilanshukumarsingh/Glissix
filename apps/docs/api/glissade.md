# Glissade API

## `new Glissade(initialX, initialY, config?)`

Creates an engine with an initial position and optional config overrides.

### Parameters

- `initialX: number`
- `initialY: number`
- `config?: Partial<GlissadeConfig>`

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

Call this once per animation frame.

## `getState()`

Returns current position, velocity, and target values.

```ts
{
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
}
```

## `setConfig(config)`

Merges and sanitizes config values at runtime.

## `reset(x?, y?)`

Resets position and velocity. If coordinates are omitted, it resets to the current target.

## `GlissadeConfig`

```ts
interface GlissadeConfig {
  mass: number
  tension: number
  friction: number
}
```
