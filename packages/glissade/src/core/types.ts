export interface GlissadeConfig {
  mass: number
  tension: number
  friction: number
}

export interface GlissadeState {
  x: number
  y: number
  vx: number
  vy: number
  targetX: number
  targetY: number
}

export interface GlissadeStep {
  x: number
  y: number
  vx: number
  vy: number
}

const CONFIG_LIMITS = {
  mass: { min: 0.1, max: 10 },
  tension: { min: 0.001, max: 1 },
  friction: { min: 0.01, max: 0.999 },
} as const

export const DEFAULT_CONFIG: GlissadeConfig = {
  mass: 1,
  tension: 0.15,
  friction: 0.82,
}

export const MATERIALS = {
  LEATHER: { mass: 2, tension: 0.1, friction: 0.85 },
  RUBBER: { mass: 0.5, tension: 0.4, friction: 0.7 },
  HONEY: { mass: 5, tension: 0.05, friction: 0.95 },
  GHOST: { mass: 0.1, tension: 0.2, friction: 0.99 },
} as const satisfies Record<string, GlissadeConfig>

export type GlissadeMaterial = keyof typeof MATERIALS

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function sanitizeNumber(value: number | undefined, fallback: number) {
  return Number.isFinite(value) ? (value as number) : fallback
}

export function sanitizeConfig(
  config: Partial<GlissadeConfig> = {},
  base: GlissadeConfig = DEFAULT_CONFIG,
): GlissadeConfig {
  const mass = clamp(
    sanitizeNumber(config.mass, base.mass),
    CONFIG_LIMITS.mass.min,
    CONFIG_LIMITS.mass.max,
  )
  const tension = clamp(
    sanitizeNumber(config.tension, base.tension),
    CONFIG_LIMITS.tension.min,
    CONFIG_LIMITS.tension.max,
  )
  const friction = clamp(
    sanitizeNumber(config.friction, base.friction),
    CONFIG_LIMITS.friction.min,
    CONFIG_LIMITS.friction.max,
  )

  return { mass, tension, friction }
}
