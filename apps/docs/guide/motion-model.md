# Motion Model

Glissade is tuned for interface inertia rather than generic spring branding.

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
