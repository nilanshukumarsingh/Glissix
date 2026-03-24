import {
  DEFAULT_CONFIG,
  sanitizeConfig,
  type GlissadeConfig,
  type GlissadeState,
} from './types'

export class Glissade {
  private state: GlissadeState
  public config: GlissadeConfig

  constructor(
    initialX: number,
    initialY: number,
    config: Partial<GlissadeConfig> = {},
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

  setConfig(config: Partial<GlissadeConfig>): void {
    this.config = sanitizeConfig(config, this.config)
  }

  step() {
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

  getState(): GlissadeState {
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

export { DEFAULT_CONFIG, sanitizeConfig }
export type { GlissadeConfig, GlissadeState }
