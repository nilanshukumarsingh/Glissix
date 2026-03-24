import './style.css'

import {
  Glissade,
  MATERIALS,
  type GlissadeConfig,
  type GlissadeMaterial,
} from 'glissade'

function getRequiredElement<T extends Element>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector)

  if (!element) {
    throw new Error(`Missing element: ${selector}`)
  }

  return element
}

const MATERIAL_ORDER = ['LEATHER', 'RUBBER', 'HONEY', 'GHOST'] as const
const STRESS_COUNT = 48
const MAGNET_RADIUS = 250

const app = getRequiredElement<HTMLDivElement>('#app')

app.innerHTML = `
  <div class="shell">
    <header class="topbar">
      <div class="brand">
        <div class="brand-mark" aria-hidden="true">
          <span class="brand-orb"></span>
        </div>
        <div>
          <p class="eyebrow">Inertia-driven interface motion</p>
          <h1 class="kinetic-text">Glissade</h1>
        </div>
      </div>
      <nav class="links">
        <a href="http://localhost:5174">Docs</a>
        <span class="version">v0.1.0</span>
      </nav>
    </header>

    <main class="layout">
      <section class="copy">
        <p class="kicker">Obsidian Lab</p>
        <h2>Material motion for interfaces that need drag, memory, and intent.</h2>
        <p class="lede">
          Glissade treats interaction like a physical identity problem instead of a number guessing game.
          Pick a material, tune force inside the XY field, and inspect the resulting waveform in real time.
        </p>
        <div class="actions">
          <div class="install">npm install glissade</div>
          <a class="secondary-link" href="http://localhost:5174/guide/getting-started">Read the guide</a>
        </div>
        <ul class="notes">
          <li>Named material presets instead of anonymous tuning numbers.</li>
          <li>Impulse injection, scalar progress helpers, and zero runtime dependencies.</li>
          <li>Built to power magnetic UI, kinetic drawers, and chained motion systems.</li>
        </ul>
        <div class="code-preview">
          <p class="code-label">Quick sample</p>
          <pre><code>const motion = new Glissade(0, 0)
motion.useMaterial('LEATHER')
motion.applyImpulse(8, -4)
motion.setTarget(pointerX, pointerY)

const { x, y } = motion.step()</code></pre>
        </div>
        <div class="maker">
          <p class="code-label">Built by</p>
          <h3>Nilanshu Kumar Singh</h3>
          <p>
            Full-stack developer focused on tactile interfaces, disciplined systems thinking,
            and product surfaces that feel deliberate instead of generic.
          </p>
          <div class="maker-links">
            <a href="https://www.linkedin.com/in/nilanshukumarsingh">LinkedIn</a>
            <a href="https://github.com/nilanshukumarsingh">GitHub</a>
            <a href="https://nilanshu.vercel.app/">Portfolio</a>
            <a href="http://x.com/nilanshukumar81">X</a>
          </div>
        </div>
      </section>

      <section class="lab-panel">
        <div class="panel-head">
          <div>
            <p class="panel-label">Module 01</p>
            <h3>Magnetic Core</h3>
          </div>
          <div class="panel-actions">
            <button id="overload-button" class="ghost-button" type="button">Overload</button>
            <button id="reset-button" class="ghost-button" type="button">Reset</button>
          </div>
        </div>

        <div class="materials" id="materials">
          ${MATERIAL_ORDER.map(
            (name) => `<button class="material-chip" data-material="${name}" type="button">${name}</button>`,
          ).join('')}
        </div>

        <div class="control-grid">
          <div class="xy-card">
            <div class="control-copy">
              <p class="panel-label">Force Map</p>
              <h4>Stress Field</h4>
              <p>Drag the probe to set tension and friction together like lab equipment instead of generic sliders.</p>
            </div>
            <div id="xy-pad" class="xy-pad">
              <div class="xy-grid"></div>
              <div class="xy-axis x-axis">Tension</div>
              <div class="xy-axis y-axis">Friction</div>
              <div id="xy-dot" class="xy-dot"></div>
            </div>
            <div class="xy-readouts">
              <span>Tension <strong id="tension-value">0.15</strong></span>
              <span>Friction <strong id="friction-value">0.82</strong></span>
            </div>
          </div>

          <div class="knob-card">
            <p class="panel-label">Mass Dial</p>
            <div id="mass-knob" class="knob-container" aria-label="Mass knob">
              <div class="knob-dial"></div>
              <div id="mass-marker" class="knob-marker"></div>
            </div>
            <strong id="mass-value" class="knob-value">1.00</strong>
            <small>Drag vertically to increase or lighten the specimen.</small>
          </div>
        </div>

        <div id="magnet-zone" class="magnet-zone">
          <div id="field" class="field"></div>
          <div class="magnet-grid"></div>
          <div id="stress-layer" class="stress-layer"></div>
          <div id="cursor-blob" class="cursor-blob"></div>
          <div id="core" class="core"></div>
          <div class="zone-copy">
            <p>Material preset <strong id="material-label">LEATHER</strong></p>
            <small>Core pull radius: 250px. Leave the chamber to watch it snap home.</small>
          </div>
        </div>

        <div class="analyzer">
          <div class="analyzer-head">
            <div>
              <span class="status-dot"></span>
              <span class="panel-label">Signal Analyzer</span>
            </div>
            <span id="fps-counter" class="fps-counter">0 FPS // CALIBRATING</span>
          </div>
          <canvas id="oscilloscope" class="oscilloscope"></canvas>
        </div>

        <section class="module">
          <div class="module-copy">
            <p class="panel-label">Module 02</p>
            <h4>Specimen Drawer</h4>
            <p>Deploy a weighted 3D drawer. Progress drives scale and depth, while live velocity adds tilt and blur.</p>
          </div>
          <div class="drawer-stage">
            <div id="card-drawer" class="drawer-card">
              <div class="drawer-pill"></div>
              <h5>Specimen #742</h5>
              <p>Inertia-driven depth translation with velocity-mapped tilt, blur, and snap acoustics.</p>
            </div>
          </div>
          <button id="toggle-btn" class="deploy-button" type="button">Deploy Module</button>
        </section>

        <section class="module">
          <div class="module-copy">
            <p class="panel-label">Module 03</p>
            <h4>Elastic Chain</h4>
            <p>A chain of linked Glissade instances demonstrates how the same engine can drive compound motion systems.</p>
          </div>
          <div id="chain-container" class="chain-container"></div>
        </section>
      </section>
    </main>
  </div>
`

const title = getRequiredElement<HTMLElement>('.kinetic-text')
const resetButton = getRequiredElement<HTMLButtonElement>('#reset-button')
const overloadButton = getRequiredElement<HTMLButtonElement>('#overload-button')
const materialsRoot = getRequiredElement<HTMLElement>('#materials')
const materialLabel = getRequiredElement<HTMLElement>('#material-label')
const xyPad = getRequiredElement<HTMLElement>('#xy-pad')
const xyDot = getRequiredElement<HTMLElement>('#xy-dot')
const tensionValue = getRequiredElement<HTMLElement>('#tension-value')
const frictionValue = getRequiredElement<HTMLElement>('#friction-value')
const massKnob = getRequiredElement<HTMLElement>('#mass-knob')
const massMarker = getRequiredElement<HTMLElement>('#mass-marker')
const massValue = getRequiredElement<HTMLElement>('#mass-value')
const magnetZone = getRequiredElement<HTMLElement>('#magnet-zone')
const field = getRequiredElement<HTMLElement>('#field')
const stressLayer = getRequiredElement<HTMLElement>('#stress-layer')
const cursorBlob = getRequiredElement<HTMLElement>('#cursor-blob')
const core = getRequiredElement<HTMLElement>('#core')
const oscilloscope = getRequiredElement<HTMLCanvasElement>('#oscilloscope')
const fpsCounter = getRequiredElement<HTMLElement>('#fps-counter')
const drawer = getRequiredElement<HTMLElement>('#card-drawer')
const toggleButton = getRequiredElement<HTMLButtonElement>('#toggle-btn')
const chainContainer = getRequiredElement<HTMLElement>('#chain-container')

const magneticCore = new Glissade(0, 0, MATERIALS.LEATHER)
const drawerPhysics = new Glissade(0, 0, {
  mass: 1.5,
  tension: 0.1,
  friction: 0.82,
})
const chainPhysics = Array.from({ length: 8 }, (_, index) => new Glissade(0, 0, {
  mass: 1 + index * 0.45,
  tension: 0.2,
  friction: 0.8,
}))

const chainBeads = chainPhysics.map((_, index) => {
  const bead = document.createElement('div')
  bead.className = 'chain-bead'
  bead.style.opacity = `${1 - index / chainPhysics.length}`
  chainContainer.appendChild(bead)
  return bead
})

const swarm = Array.from({ length: STRESS_COUNT }, (_, index) => {
  const dot = document.createElement('div')
  dot.className = 'stress-dot'
  dot.style.opacity = `${0.95 - index / STRESS_COUNT * 0.65}`
  stressLayer.appendChild(dot)

  return {
    dot,
    motion: new Glissade(0, 0, {
      mass: 0.45 + (index % 8) * 0.08,
      tension: 0.12 + (index % 5) * 0.01,
      friction: 0.82,
    }),
  }
})

let liveConfig: GlissadeConfig = { ...MATERIALS.LEATHER }
let magnetCenterX = 0
let magnetCenterY = 0
let chainCenterX = 0
let chainCenterY = 0
let chainPointerX = 0
let chainPointerY = 0
let chainActive = false
let magnetPointerX = 0
let magnetPointerY = 0
let magnetActive = false
let overloadActive = false
let isDrawerOpen = false
let coreSettled = true
let drawerSettled = true
let previousFrameTime = performance.now()
let fpsWindow = performance.now()
let fpsFrames = 0
const oscHistory: number[] = []
let audioContext: AudioContext | null = null

function ensureAudioContext() {
  if (!audioContext) {
    audioContext = new AudioContext()
  }

  return audioContext
}

function playMechanicalClick() {
  const context = ensureAudioContext()
  const now = context.currentTime
  const oscillator = context.createOscillator()
  const gain = context.createGain()

  oscillator.type = 'triangle'
  oscillator.frequency.setValueAtTime(320, now)
  oscillator.frequency.exponentialRampToValueAtTime(110, now + 0.08)

  gain.gain.setValueAtTime(0.0001, now)
  gain.gain.exponentialRampToValueAtTime(0.025, now + 0.005)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09)

  oscillator.connect(gain)
  gain.connect(context.destination)
  oscillator.start(now)
  oscillator.stop(now + 0.1)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

function setMaterial(name: GlissadeMaterial) {
  liveConfig = { ...MATERIALS[name] }
  magneticCore.useMaterial(name)
  drawerPhysics.setConfig({
    mass: clamp(liveConfig.mass * 0.8, 0.1, 10),
    tension: clamp(liveConfig.tension * 0.9, 0.001, 1),
    friction: liveConfig.friction,
  })

  for (const button of materialsRoot.querySelectorAll<HTMLButtonElement>('.material-chip')) {
    button.dataset.active = `${button.dataset.material === name}`
  }

  materialLabel.textContent = name
  syncControlVisuals()
}

function syncControlVisuals() {
  tensionValue.textContent = liveConfig.tension.toFixed(2)
  frictionValue.textContent = liveConfig.friction.toFixed(2)
  massValue.textContent = liveConfig.mass.toFixed(2)

  const knobPercent = (liveConfig.mass - 0.1) / (5 - 0.1)
  const knobDegrees = knobPercent * 300 - 150
  massMarker.style.transform = `translateX(-50%) rotate(${knobDegrees}deg)`

  const padRect = xyPad.getBoundingClientRect()
  const x = ((liveConfig.tension - 0.01) / (0.5 - 0.01)) * padRect.width
  const y = (1 - (liveConfig.friction - 0.5) / (0.99 - 0.5)) * padRect.height
  xyDot.style.transform = `translate3d(${x - 11}px, ${y - 11}px, 0)`
}

function updateConfig(partial: Partial<GlissadeConfig>) {
  liveConfig = {
    ...liveConfig,
    ...partial,
  }

  magneticCore.setConfig(liveConfig)
  drawerPhysics.setConfig({
    mass: clamp(liveConfig.mass * 0.8, 0.1, 10),
    tension: clamp(liveConfig.tension * 0.9, 0.001, 1),
    friction: liveConfig.friction,
  })
  syncControlVisuals()
}

function setupMassKnob() {
  let startY = 0
  let startValue = liveConfig.mass

  massKnob.onpointerdown = (event) => {
    startY = event.clientY
    startValue = liveConfig.mass
    massKnob.setPointerCapture(event.pointerId)
  }

  massKnob.onpointermove = (event) => {
    if (!massKnob.hasPointerCapture(event.pointerId)) {
      return
    }

    const delta = (startY - event.clientY) * 0.01
    updateConfig({ mass: clamp(startValue + delta, 0.1, 5) })
  }

  massKnob.onpointerup = (event) => {
    if (massKnob.hasPointerCapture(event.pointerId)) {
      massKnob.releasePointerCapture(event.pointerId)
    }
  }
}

function updatePadFromPointer(clientX: number, clientY: number) {
  const rect = xyPad.getBoundingClientRect()
  const localX = clamp(clientX - rect.left, 0, rect.width)
  const localY = clamp(clientY - rect.top, 0, rect.height)
  const tension = lerp(0.01, 0.5, localX / rect.width)
  const friction = lerp(0.99, 0.5, localY / rect.height)

  updateConfig({ tension, friction })
  xyDot.style.transform = `translate3d(${localX - 11}px, ${localY - 11}px, 0)`
}

function setupPad() {
  xyPad.onpointerdown = (event) => {
    xyPad.setPointerCapture(event.pointerId)
    updatePadFromPointer(event.clientX, event.clientY)
  }

  xyPad.onpointermove = (event) => {
    if (!xyPad.hasPointerCapture(event.pointerId)) {
      return
    }

    updatePadFromPointer(event.clientX, event.clientY)
  }

  xyPad.onpointerup = (event) => {
    if (xyPad.hasPointerCapture(event.pointerId)) {
      xyPad.releasePointerCapture(event.pointerId)
    }
  }
}

function resizeLayouts(reset = false) {
  const magnetRect = magnetZone.getBoundingClientRect()
  magnetCenterX = magnetRect.width / 2
  magnetCenterY = magnetRect.height / 2
  if (reset) {
    magneticCore.reset(magnetCenterX, magnetCenterY)
  } else if (!magnetActive) {
    magneticCore.setTarget(magnetCenterX, magnetCenterY)
  }

  const chainRect = chainContainer.getBoundingClientRect()
  chainCenterX = chainRect.width / 2
  chainCenterY = chainRect.height / 2
  chainPointerX = chainCenterX
  chainPointerY = chainCenterY

  chainPhysics.forEach((motion) => {
    if (reset) {
      motion.reset(chainCenterX, chainCenterY)
    } else {
      motion.setTarget(chainCenterX, chainCenterY)
    }
  })

  swarm.forEach((entry, index) => {
    const angle = (index / swarm.length) * Math.PI * 2
    const radius = 30 + (index % 6) * 12
    entry.motion.reset(
      magnetCenterX + Math.cos(angle) * radius,
      magnetCenterY + Math.sin(angle) * radius,
    )
  })
}

function updateOscilloscope(velocity: number) {
  if (oscilloscope.width !== oscilloscope.clientWidth) {
    oscilloscope.width = oscilloscope.clientWidth
    oscilloscope.height = oscilloscope.clientHeight
  }

  const context = oscilloscope.getContext('2d')
  if (!context) {
    return
  }

  oscHistory.push(velocity * 12)
  if (oscHistory.length > 240) {
    oscHistory.shift()
  }

  context.clearRect(0, 0, oscilloscope.width, oscilloscope.height)
  context.strokeStyle = '#7dd3ff'
  context.lineWidth = 2
  context.lineJoin = 'round'
  context.shadowBlur = 12
  context.shadowColor = '#7dd3ff'
  context.beginPath()

  oscHistory.forEach((value, index) => {
    const x = (index / Math.max(oscHistory.length - 1, 1)) * oscilloscope.width
    const y = oscilloscope.height / 2 + value

    if (index === 0) {
      context.moveTo(x, y)
    } else {
      context.lineTo(x, y)
    }
  })

  context.stroke()
  context.shadowBlur = 0
}

function updateFps(now: number) {
  fpsFrames += 1
  if (now - fpsWindow > 500) {
    const fps = Math.round((fpsFrames * 1000) / (now - fpsWindow))
    fpsCounter.textContent = `${fps} FPS // ${fps >= 55 ? 'STABLE' : 'ACTIVE'}`
    fpsFrames = 0
    fpsWindow = now
  }
}

function updateChromatic(speed: number) {
  const split = Math.min(speed * 0.55, 10)
  title.style.setProperty('--rx', `${split}px`)
  title.style.setProperty('--bx', `${-split}px`)
}

function animateMagnet() {
  if (magnetActive) {
    const distance = Math.hypot(magnetPointerX - magnetCenterX, magnetPointerY - magnetCenterY)

    if (distance < MAGNET_RADIUS) {
      const power = 1 - distance / MAGNET_RADIUS
      const targetX = magnetCenterX + (magnetPointerX - magnetCenterX) * power
      const targetY = magnetCenterY + (magnetPointerY - magnetCenterY) * power
      magneticCore.setTarget(targetX, targetY)
      field.style.opacity = '1'
    } else {
      magneticCore.setTarget(magnetCenterX, magnetCenterY)
      field.style.opacity = '0'
    }
  } else {
    magneticCore.setTarget(magnetCenterX, magnetCenterY)
    field.style.opacity = '0'
  }

  const state = magneticCore.step()
  const coreState = magneticCore.getState()
  core.style.transform = `translate3d(${state.x - 14}px, ${state.y - 14}px, 0)`

  const velocity = magneticCore.getVelocity()
  const split = Math.min(velocity * 3.2, 18)
  core.style.setProperty('--rx', `${split}px`)
  core.style.setProperty('--bx', `${-split}px`)
  updateChromatic(velocity)
  updateOscilloscope(state.vx)

  const isSettled =
    Math.abs(state.vx) < 0.05 &&
    Math.abs(state.vy) < 0.05 &&
    Math.hypot(state.x - coreState.targetX, state.y - coreState.targetY) < 1.2

  if (isSettled && !coreSettled) {
    playMechanicalClick()
  }

  coreSettled = isSettled
}

function animateSwarm(time: number) {
  const baseX = magnetActive ? magnetPointerX : magnetCenterX
  const baseY = magnetActive ? magnetPointerY : magnetCenterY

  swarm.forEach((entry, index) => {
    const orbit = (index / swarm.length) * Math.PI * 2 + time / 1200
    const radius = overloadActive ? 30 + (index % 9) * 10 : 24 + (index % 5) * 6
    const wobble = overloadActive ? 1 : 0.35
    const targetX = baseX + Math.cos(orbit * wobble + index * 0.12) * radius
    const targetY = baseY + Math.sin(orbit + index * 0.1) * radius

    entry.motion.setTarget(targetX, targetY)
    const dotState = entry.motion.step()
    entry.dot.style.transform = `translate3d(${dotState.x - 4}px, ${dotState.y - 4}px, 0)`
  })
}

function animateDrawer() {
  const target = isDrawerOpen ? 1 : 0

  drawerPhysics.updateValue(target, (progress, velocity) => {
    const scale = 0.84 + progress * 0.16
    const translateZ = progress * 72
    const tilt = velocity * 18
    const blur = Math.min(velocity * 6, 8)
    const glow = Math.min(velocity * 14, 32)

    drawer.style.transform = `
      perspective(1000px)
      translateZ(${translateZ}px)
      scale(${scale})
      rotateX(${tilt}deg)
    `
    drawer.style.filter = `blur(${blur}px)`
    drawer.style.opacity = `${0.45 + progress * 0.55}`
    drawer.style.boxShadow = `0 32px 90px rgba(0, 0, 0, 0.35), 0 0 ${glow}px rgba(125, 211, 255, 0.22)`

    if (velocity < 0.01 && Math.abs(progress - target) < 0.015) {
      if (!drawerSettled) {
        playMechanicalClick()
      }
      drawerSettled = true
    } else {
      drawerSettled = false
    }
  })
}

function animateChain() {
  const leadX = chainActive ? chainPointerX : chainCenterX
  const leadY = chainActive ? chainPointerY : chainCenterY

  chainPhysics.forEach((motion, index) => {
    if (index === 0) {
      motion.setTarget(leadX, leadY)
    } else {
      const previous = chainPhysics[index - 1].getState()
      motion.setTarget(previous.x, previous.y)
    }

    const state = motion.step()
    chainBeads[index].style.transform = `translate3d(${state.x - 6}px, ${state.y - 6}px, 0)`
  })
}

function placeCursorBlob(x: number, y: number) {
  cursorBlob.style.transform = `translate3d(${x - 80}px, ${y - 80}px, 0)`
  field.style.setProperty('--x', `${x}px`)
  field.style.setProperty('--y', `${y}px`)
}

function animateFrame(now: number) {
  const delta = now - previousFrameTime
  previousFrameTime = now

  updateFps(now)
  animateMagnet()
  animateSwarm(now)
  animateDrawer()
  animateChain()

  if (!magnetActive) {
    const idleX = magnetCenterX + Math.sin(now / 900) * 24
    const idleY = magnetCenterY + Math.cos(now / 1100) * 16
    placeCursorBlob(idleX, idleY)
  }

  if (delta > 1000) {
    previousFrameTime = now
  }

  requestAnimationFrame(animateFrame)
}

materialsRoot.addEventListener('click', (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>('.material-chip')
  if (!button?.dataset.material) {
    return
  }

  setMaterial(button.dataset.material as GlissadeMaterial)
})

toggleButton.addEventListener('click', () => {
  isDrawerOpen = !isDrawerOpen
  toggleButton.textContent = isDrawerOpen ? 'Retract Module' : 'Deploy Module'
})

resetButton.addEventListener('click', () => {
  magnetActive = false
  overloadActive = false
  isDrawerOpen = false
  toggleButton.textContent = 'Deploy Module'
  setMaterial('LEATHER')
  resizeLayouts(true)
  placeCursorBlob(magnetCenterX, magnetCenterY)
})

overloadButton.addEventListener('click', () => {
  overloadActive = !overloadActive
  overloadButton.textContent = overloadActive ? 'Calm Field' : 'Overload'

  if (overloadActive) {
    swarm.forEach((entry, index) => {
      const angle = (index / swarm.length) * Math.PI * 2
      entry.motion.applyImpulse(Math.cos(angle) * 12, Math.sin(angle) * 12)
    })
  }
})

magnetZone.addEventListener('pointermove', (event) => {
  const rect = magnetZone.getBoundingClientRect()
  magnetActive = true
  magnetPointerX = event.clientX - rect.left
  magnetPointerY = event.clientY - rect.top
  placeCursorBlob(magnetPointerX, magnetPointerY)
})

magnetZone.addEventListener('pointerenter', () => {
  magnetActive = true
})

magnetZone.addEventListener('pointerleave', () => {
  magnetActive = false
})

chainContainer.addEventListener('pointermove', (event) => {
  const rect = chainContainer.getBoundingClientRect()
  chainPointerX = event.clientX - rect.left
  chainPointerY = event.clientY - rect.top
  chainActive = true
})

chainContainer.addEventListener('pointerleave', () => {
  chainActive = false
})

window.addEventListener('resize', () => {
  resizeLayouts()
  syncControlVisuals()
})

setupMassKnob()
setupPad()
setMaterial('LEATHER')
resizeLayouts(true)
placeCursorBlob(magnetCenterX, magnetCenterY)
requestAnimationFrame(animateFrame)
