# Glissade API

## `new Glissade(initialX, initialY, config?)`

Creates an engine with an initial position and optional config overrides.

### Parameters

- `initialX: number`
- `initialY: number`
- `config?: Partial<GlissadeConfig>`

## `setTarget(x, y)`

Updates the position the engine will move toward.

## `useMaterial(name)`

Applies one of the built-in material presets:

```ts
motion.useMaterial('LEATHER')
```

## `applyImpulse(vx, vy)`

Injects velocity directly into the engine so the object can be thrown or flicked.

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

## `getVelocity()`

Returns the current speed magnitude as a single number.

## `updateValue(target, callback)`

Advances a scalar interaction using the engine's `x` axis and returns both current progress and one-dimensional velocity.

## `GlissadeConfig`

```ts
interface GlissadeConfig {
  mass: number
  tension: number
  friction: number
}
```

## `MATERIALS`

```ts
const MATERIALS = {
  LEATHER: { mass: 2, tension: 0.1, friction: 0.85 },
  RUBBER: { mass: 0.5, tension: 0.4, friction: 0.7 },
  HONEY: { mass: 5, tension: 0.05, friction: 0.95 },
  GHOST: { mass: 0.1, tension: 0.2, friction: 0.99 },
}
```
