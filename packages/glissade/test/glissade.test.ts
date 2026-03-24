import { describe, expect, it } from 'vitest'

import { DEFAULT_CONFIG, Glissade, MATERIALS } from '../src'

describe('Glissade', () => {
  it('uses default config values', () => {
    const motion = new Glissade(0, 0)

    expect(motion.config).toEqual(DEFAULT_CONFIG)
  })

  it('merges partial config overrides', () => {
    const motion = new Glissade(0, 0, { mass: 2.5 })

    expect(motion.config).toEqual({
      mass: 2.5,
      tension: DEFAULT_CONFIG.tension,
      friction: DEFAULT_CONFIG.friction,
    })
  })

  it('updates the target state', () => {
    const motion = new Glissade(10, 20)

    motion.setTarget(30, 40)

    expect(motion.getState()).toMatchObject({
      targetX: 30,
      targetY: 40,
    })
  })

  it('moves toward the target when stepped', () => {
    const motion = new Glissade(0, 0)
    motion.setTarget(100, 0)

    const first = motion.step()

    expect(first.x).toBeGreaterThan(0)
    expect(first.y).toBe(0)
  })

  it('friction reduces carried velocity over time', () => {
    const motion = new Glissade(0, 0, {
      tension: 0.2,
      friction: 0.5,
    })

    motion.setTarget(100, 0)
    motion.step()
    motion.setTarget(0, 0)

    const magnitudes = Array.from({ length: 6 }, () => Math.abs(motion.step().vx))

    expect(magnitudes.at(-1)).toBeLessThan(magnitudes[0] ?? Infinity)
  })

  it('heavier mass accelerates more slowly', () => {
    const light = new Glissade(0, 0, { mass: 1 })
    const heavy = new Glissade(0, 0, { mass: 4 })

    light.setTarget(100, 0)
    heavy.setTarget(100, 0)

    expect(light.step().x).toBeGreaterThan(heavy.step().x)
  })

  it('resets state predictably', () => {
    const motion = new Glissade(0, 0)

    motion.setTarget(50, 25)
    motion.step()
    motion.reset(10, 15)

    expect(motion.getState()).toEqual({
      x: 10,
      y: 15,
      vx: 0,
      vy: 0,
      targetX: 10,
      targetY: 15,
    })
  })

  it('clamps invalid config values', () => {
    const motion = new Glissade(0, 0, {
      mass: 0,
      tension: 999,
      friction: -5,
    })

    expect(motion.config).toEqual({
      mass: 0.1,
      tension: 1,
      friction: 0.01,
    })
  })

  it('applies a named material preset', () => {
    const motion = new Glissade(0, 0)

    motion.useMaterial('LEATHER')

    expect(motion.config).toEqual(MATERIALS.LEATHER)
  })

  it('injects velocity through impulses', () => {
    const motion = new Glissade(0, 0)

    motion.applyImpulse(12, -4)

    expect(motion.step()).toMatchObject({
      x: 9.84,
      y: -3.28,
    })
  })

  it('returns the current velocity magnitude', () => {
    const motion = new Glissade(0, 0)

    motion.applyImpulse(3, 4)

    expect(motion.getVelocity()).toBe(5)
  })

  it('updates scalar progress values for one-dimensional interactions', () => {
    const motion = new Glissade(0, 0)
    let captured = { value: 0, velocity: 0 }

    motion.updateValue(1, (value, velocity) => {
      captured = { value, velocity }
    })

    expect(captured.value).toBeGreaterThan(0)
    expect(captured.velocity).toBeGreaterThan(0)
  })
})
