import {
  DEFAULT_CONFIG,
  MATERIALS,
  sanitizeConfig,
  type GlissixConfig,
  type GlissixMaterial,
  type GlissixState,
  type GlissixStep,
} from './types'

export class Glissix {
  private state: GlissixState
  public config: GlissixConfig

  constructor(
    initialX: number,
    initialY: number,
    config: Partial<GlissixConfig> = {},
  ) {
    this.config = sanitizeConfig(config)
    this.state = {
      x: initialX,
      y: initialY,
      vx: 0,
      vy: 0,
      targetX: initialX,
      targetY: initialY,
    }
  }

  setTarget(x: number, y: number): void {
    this.state.targetX = x
    this.state.targetY = y
  }

  setConfig(config: Partial<GlissixConfig>): void {
    this.config = sanitizeConfig(config, this.config)
  }

  useMaterial(name: GlissixMaterial): void {
    this.config = sanitizeConfig(MATERIALS[name], this.config)
  }

  applyImpulse(vx: number, vy: number): void {
    this.state.vx += vx
    this.state.vy += vy
  }

  step(): GlissixStep {
    const ax = (this.state.targetX - this.state.x) * this.config.tension
    const ay = (this.state.targetY - this.state.y) * this.config.tension

    this.state.vx = (this.state.vx + ax / this.config.mass) * this.config.friction
    this.state.vy = (this.state.vy + ay / this.config.mass) * this.config.friction

    this.state.x += this.state.vx
    this.state.y += this.state.vy

    return {
      x: this.state.x,
      y: this.state.y,
      vx: this.state.vx,
      vy: this.state.vy,
    }
  }

  getVelocity(): number {
    return Math.hypot(this.state.vx, this.state.vy)
  }

  updateValue(target: number, callback: (value: number, velocity: number) => void): void {
    this.state.targetX = target
    this.state.targetY = 0

    const next = this.step()
    callback(next.x, Math.abs(next.vx))
  }

  getState(): GlissixState {
    return { ...this.state }
  }

  reset(x = this.state.targetX, y = this.state.targetY): void {
    this.state = {
      x,
      y,
      vx: 0,
      vy: 0,
      targetX: x,
      targetY: y,
    }
  }
}

export { DEFAULT_CONFIG, MATERIALS, sanitizeConfig }
export type { GlissixConfig, GlissixMaterial, GlissixState, GlissixStep }
