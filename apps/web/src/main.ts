import './style.css'

import {
  Glissix,
  MATERIALS,
  type GlissixConfig,
  type GlissixMaterial,
} from 'glissix'

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
      <div class="brand-container">
        <p class="eyebrow">Inertia-driven interface motion</p>
        <div class="brand">
          <div class="brand-mark" aria-hidden="true">
            <svg class="brand-logo" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%; height: 100%; padding: 8px;">
              <path d="M30 10 C22 2, 10 6, 8 18 C6 30, 18 34, 28 30 C34 27, 34 20, 28 18 L18 18" stroke="url(#trackGrad)" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
              <circle cx="28" cy="18" r="4.5" fill="#8dd3ff" />
              <circle cx="28" cy="18" r="8" fill="#8dd3ff" opacity="0.3" />
              <defs>
                <linearGradient id="trackGrad" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stop-color="#7dd3ff" />
                  <stop offset="60%" stop-color="#46a3ff" />
                  <stop offset="100%" stop-color="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 class="kinetic-text">Glissix</h1>
        </div>
      </div>
      <nav class="links">
        <a href="https://github.com/nilanshukumarsingh" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub">
          <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
        </a>
        <a href="https://www.linkedin.com/in/nilanshukumarsingh/" target="_blank" rel="noopener noreferrer" class="social-link" title="LinkedIn">
          <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
          </svg>
        </a>
        <a href="https://x.com/nilanshukumar81" target="_blank" rel="noopener noreferrer" class="social-link" title="X">
          <svg class="icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a href="/docs/">Docs</a>
        <span class="version">v0.1.0</span>
      </nav>
    </header>

    <!-- Hero Header (Full Width) -->
    <section class="hero-section">
      <div class="hero-content">
        <p class="kicker">Obsidian Lab</p>
        <h2>Material motion for interfaces that need drag, memory, and intent.</h2>
        <p class="lede">
          Glissix treats interaction like a physical identity problem instead of a number guessing game.
          Pick a material, tune force inside the XY field, and inspect the resulting waveform in real time.
        </p>
        <div class="actions">
          <div class="install">npm install glissix</div>
          <a class="secondary-link" href="/docs/guide/getting-started">Read the guide</a>
        </div>
      </div>
      <ul class="notes">
        <li>Named material presets instead of anonymous tuning numbers.</li>
        <li>Impulse injection, scalar progress helpers, and zero runtime dependencies.</li>
        <li>Built to power magnetic UI, kinetic drawers, and chained motion systems.</li>
      </ul>
    </section>

    <main class="layout">
      <!-- Column 1: Lab Core -->
      <section class="lab-panel core-panel">
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
      </section>

      <!-- Column 2: Secondary Modules & Code -->
      <section class="lab-panel modules-panel">
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
            <p>A chain of linked Glissix instances demonstrates how the same engine can drive compound motion systems.</p>
          </div>
          <div id="chain-container" class="chain-container"></div>
        </section>

        <div class="code-preview">
          <p class="code-label">Quick sample</p>
          <pre><code>const motion = new Glissix(0, 0)
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
            <a href="https://github.com/nilanshukumarsingh" target="_blank" rel="noopener noreferrer">
              <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nilanshukumarsingh/" target="_blank" rel="noopener noreferrer">
              <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn
            </a>
            <a href="https://x.com/nilanshukumar81" target="_blank" rel="noopener noreferrer">
              <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              X
            </a>
            <a href="https://nilanshu.vercel.app/" target="_blank" rel="noopener noreferrer">
              <svg class="icon" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              Portfolio
            </a>
          </div>
        </div>
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

const magneticCore = new Glissix(0, 0, MATERIALS.LEATHER)
const drawerPhysics = new Glissix(0, 0, {
  mass: 1.5,
  tension: 0.1,
  friction: 0.82,
})
const chainPhysics = Array.from({ length: 8 }, (_, index) => new Glissix(0, 0, {
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
    motion: new Glissix(0, 0, {
      mass: 0.45 + (index % 8) * 0.08,
      tension: 0.12 + (index % 5) * 0.01,
      friction: 0.82,
    }),
  }
})

let liveConfig: GlissixConfig = { ...MATERIALS.LEATHER }
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
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    audioContext = new AudioContextClass()
  }

  return audioContext
}

function initAudioOnGesture() {
  const resume = () => {
    ensureAudioContext()
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume()
    }
    window.removeEventListener('pointerdown', resume)
    window.removeEventListener('click', resume)
  }
  window.addEventListener('pointerdown', resume)
  window.addEventListener('click', resume)
}

function playMechanicalClick() {
  const context = ensureAudioContext()
  if (!context) return
  
  const now = context.currentTime
  
  // 1. High-frequency transient (metallic snap)
  const osc1 = context.createOscillator()
  const gain1 = context.createGain()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(1400, now)
  osc1.frequency.exponentialRampToValueAtTime(350, now + 0.012)
  
  gain1.gain.setValueAtTime(0.12, now)
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.012)
  
  osc1.connect(gain1)
  gain1.connect(context.destination)
  
  // 2. Low-frequency housing resonance
  const osc2 = context.createOscillator()
  const gain2 = context.createGain()
  osc2.type = 'triangle'
  osc2.frequency.setValueAtTime(160, now)
  osc2.frequency.exponentialRampToValueAtTime(70, now + 0.035)
  
  gain2.gain.setValueAtTime(0.08, now)
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.035)
  
  osc2.connect(gain2)
  gain2.connect(context.destination)
  
  // Start/Stop
  osc1.start(now)
  osc1.stop(now + 0.02)
  osc2.start(now)
  osc2.stop(now + 0.05)
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

function setMaterial(name: GlissixMaterial) {
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

  const knobPercent = (liveConfig.mass - 0.1) / (10 - 0.1)
  const knobDegrees = knobPercent * 300 - 150
  massMarker.style.transform = `translateX(-50%) rotate(${knobDegrees}deg)`

  const padRect = xyPad.getBoundingClientRect()
  const x = ((liveConfig.tension - 0.01) / (0.5 - 0.01)) * padRect.width
  const y = (1 - (liveConfig.friction - 0.5) / (0.99 - 0.5)) * padRect.height
  xyDot.style.transform = `translate3d(${x - 11}px, ${y - 11}px, 0)`
}

function updateConfig(partial: Partial<GlissixConfig>) {
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

  for (const button of materialsRoot.querySelectorAll<HTMLButtonElement>('.material-chip')) {
    button.dataset.active = 'false'
  }
  materialLabel.textContent = 'CUSTOM'

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

    const delta = (startY - event.clientY) * 0.08
    updateConfig({ mass: clamp(startValue + delta, 0.1, 10) })
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

  // 1. Clear canvas
  context.clearRect(0, 0, oscilloscope.width, oscilloscope.height)

  // 2. Draw HUD Faint Dotted Center Baseline
  context.save()
  context.strokeStyle = 'rgba(125, 211, 255, 0.15)'
  context.lineWidth = 1
  context.setLineDash([4, 4])
  context.beginPath()
  context.moveTo(0, oscilloscope.height / 2)
  context.lineTo(oscilloscope.width, oscilloscope.height / 2)
  context.stroke()
  context.restore()

  // 3. Draw Waveform Trace with Gradient and Glow
  if (oscHistory.length > 0) {
    context.save()
    const gradient = context.createLinearGradient(0, 0, oscilloscope.width, 0)
    gradient.addColorStop(0, '#7dd3ff')
    gradient.addColorStop(0.5, '#46a3ff')
    gradient.addColorStop(1, '#8b5cf6')

    context.strokeStyle = gradient
    context.lineWidth = 2.5
    context.lineJoin = 'round'
    context.lineCap = 'round'
    context.shadowBlur = 10
    context.shadowColor = 'rgba(70, 163, 255, 0.8)'
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
    context.restore()
  }

  // 4. Overlay HUD Telemetry Text
  context.save()
  context.font = '9px Consolas, Courier New, monospace'
  context.fillStyle = 'rgba(125, 211, 255, 0.65)'

  // Top-left
  context.fillText('SYS: ANALYZER // ACTIVE', 12, 18)

  // Top-right
  const maxVal = oscHistory.length > 0 ? Math.max(...oscHistory.map(Math.abs)) : 0
  const liveAmp = (maxVal / 12).toFixed(2)
  context.fillText(`AMP: ${liveAmp} units/s`, oscilloscope.width - 120, 18)

  // Bottom-left
  context.fillText(`MODE: ${materialLabel.textContent}`, 12, oscilloscope.height - 12)

  // Bottom-right
  context.fillText('RATE: 60Hz // SCALE: x1.0', oscilloscope.width - 140, oscilloscope.height - 12)
  
  context.restore()
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

  setMaterial(button.dataset.material as GlissixMaterial)
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

setupMassKnob()
setupPad()
setMaterial('LEATHER')

let hasInitialized = false
const resizeObserver = new ResizeObserver(() => {
  if (!hasInitialized) {
    resizeLayouts(true)
    placeCursorBlob(magnetCenterX, magnetCenterY)
    hasInitialized = true
  } else {
    resizeLayouts(false)
  }
  syncControlVisuals()
})

resizeObserver.observe(magnetZone)
resizeObserver.observe(chainContainer)

initAudioOnGesture()
requestAnimationFrame(animateFrame)
