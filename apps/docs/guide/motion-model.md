# Motion Model

Glissade is tuned for interface inertia rather than generic spring branding.

## Frame update

Each frame the engine:

1. Measures the distance between the current position and the target.
2. Converts that gap into acceleration using `tension`.
3. Scales the acceleration by `mass`.
4. Carries the current velocity forward and damps it with `friction`.
5. Produces the next position.

This means motion has memory. The object does not just jump toward the target. It arrives with momentum and settles over time.

## Mass

Mass controls how much resistance an element has to acceleration. Higher values feel heavier.

## Tension

Tension controls how strongly the object tries to close the gap to the target.

## Friction

Friction damps carried velocity so the element settles instead of diverging.

## Runtime safety

Config values are clamped at runtime to keep motion stable:

- `mass`: `0.1` to `10`
- `tension`: `0.001` to `1`
- `friction`: `0.01` to `0.999`

## Tuning presets

### Heavy panel

- `mass: 1.8`
- `tension: 0.11`
- `friction: 0.86`

### Snappy cursor

- `mass: 0.8`
- `tension: 0.22`
- `friction: 0.74`

### Slow magnetic element

- `mass: 1.3`
- `tension: 0.09`
- `friction: 0.9`

## Material presets

Glissade ships with named identities so you can start from feel first:

- `LEATHER`: heavy and controlled
- `RUBBER`: light and snappy
- `HONEY`: dense and slow settling
- `GHOST`: nearly frictionless and airy
