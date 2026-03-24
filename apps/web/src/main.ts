import './style.css'

import { DEFAULT_CONFIG, Glissade } from 'glissade'

function getRequiredElement<T extends Element>(
  selector: string,
  root: ParentNode = document,
) {
  const element = root.querySelector<T>(selector)

  if (!element) {
    throw new Error(`Missing element: ${selector}`)
  }

  return element
}

const app = getRequiredElement<HTMLDivElement>('#app')

app.innerHTML = `
  <div class="shell">
    <header class="topbar">
      <div>
        <p class="eyebrow">Inertia-driven interface motion</p>
        <h1>Glissade</h1>
      </div>
      <nav class="links">
        <a href="http://localhost:5174" target="_blank" rel="noreferrer">Docs</a>
        <span class="version">v0.1.0</span>
      </nav>
    </header>

    <main class="layout">
      <section class="copy">
        <p class="kicker">Obsidian Lab</p>
        <h2>Heavy motion for interfaces that should feel grabbed, tugged, and released.</h2>
        <p class="lede">
          Glissade turns pointer movement into inertia. Tune mass, tension, and friction,
          then watch a single engine power the same tactile language across cards, cursors,
          drawers, and floating surfaces.
        </p>
        <div class="install">npm install glissade</div>
        <ul class="notes">
          <li>Class-based API with rendering left to your app.</li>
          <li>Runtime-safe config clamping to avoid unstable motion.</li>
          <li>Workspace package and docs site ready for publishing.</li>
        </ul>
      </section>

      <section class="lab-panel">
        <div class="panel-head">
          <div>
            <p class="panel-label">Live playground</p>
            <h3>Pointer inertia</h3>
          </div>
          <button id="reset-button" class="ghost-button" type="button">Reset</button>
        </div>

        <div id="lab" class="lab" aria-label="Glissade motion lab">
          <div class="grid"></div>
          <div id="cursor-blob" class="cursor-blob"></div>
          <div id="follower" class="follower">
            <span></span>
          </div>
          <div class="lab-copy">
            <p>Move inside the chamber</p>
            <small>Leave the area to watch the body drift back to center.</small>
          </div>
        </div>

        <div class="controls">
          <label>
            <span>Mass</span>
            <strong id="mass-value">${DEFAULT_CONFIG.mass.toFixed(2)}</strong>
            <input id="mass" type="range" min="0.1" max="5" step="0.1" value="${DEFAULT_CONFIG.mass}" />
          </label>
          <label>
            <span>Tension</span>
            <strong id="tension-value">${DEFAULT_CONFIG.tension.toFixed(2)}</strong>
            <input id="tension" type="range" min="0.01" max="0.5" step="0.01" value="${DEFAULT_CONFIG.tension}" />
          </label>
          <label>
            <span>Friction</span>
            <strong id="friction-value">${DEFAULT_CONFIG.friction.toFixed(2)}</strong>
            <input id="friction" type="range" min="0.05" max="0.99" step="0.01" value="${DEFAULT_CONFIG.friction}" />
          </label>
        </div>
      </section>
    </main>
  </div>
`

const lab = getRequiredElement<HTMLElement>('#lab')
const follower = getRequiredElement<HTMLElement>('#follower')
const cursorBlob = getRequiredElement<HTMLElement>('#cursor-blob')
const resetButton = getRequiredElement<HTMLButtonElement>('#reset-button')
const massInput = getRequiredElement<HTMLInputElement>('#mass')
const tensionInput = getRequiredElement<HTMLInputElement>('#tension')
const frictionInput = getRequiredElement<HTMLInputElement>('#friction')
const massValue = getRequiredElement<HTMLElement>('#mass-value')
const tensionValue = getRequiredElement<HTMLElement>('#tension-value')
const frictionValue = getRequiredElement<HTMLElement>('#friction-value')

const motion = new Glissade(0, 0, DEFAULT_CONFIG)

let centerX = 0
let centerY = 0
let pointerActive = false

function syncReadout(input: HTMLInputElement, valueEl: HTMLElement) {
  valueEl.textContent = Number(input.value).toFixed(2)
}

function updateCenter(reset = false) {
  const rect = lab.getBoundingClientRect()
  centerX = rect.width / 2
  centerY = rect.height / 2

  if (reset) {
    motion.reset(centerX, centerY)
  } else if (!pointerActive) {
    motion.setTarget(centerX, centerY)
  }
}

function syncConfig() {
  motion.setConfig({
    mass: Number(massInput.value),
    tension: Number(tensionInput.value),
    friction: Number(frictionInput.value),
  })

  syncReadout(massInput, massValue)
  syncReadout(tensionInput, tensionValue)
  syncReadout(frictionInput, frictionValue)
}

function placeCursor(x: number, y: number) {
  cursorBlob.style.transform = `translate3d(${x - 70}px, ${y - 70}px, 0)`
}

function animateIdle(time: number) {
  if (pointerActive) {
    return
  }

  const offsetX = Math.sin(time / 900) * 28
  const offsetY = Math.cos(time / 1100) * 18
  placeCursor(centerX + offsetX, centerY + offsetY)
}

function frame(time: number) {
  const { x, y } = motion.step()
  follower.style.transform = `translate3d(${x - 24}px, ${y - 24}px, 0)`
  animateIdle(time)
  requestAnimationFrame(frame)
}

lab.addEventListener('pointermove', (event) => {
  const rect = lab.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  pointerActive = true
  motion.setTarget(x, y)
  placeCursor(x, y)
})

lab.addEventListener('pointerenter', () => {
  pointerActive = true
})

lab.addEventListener('pointerleave', () => {
  pointerActive = false
  motion.setTarget(centerX, centerY)
})

resetButton.addEventListener('click', () => {
  pointerActive = false
  updateCenter(true)
  placeCursor(centerX, centerY)
})

for (const [input, output] of [
  [massInput, massValue],
  [tensionInput, tensionValue],
  [frictionInput, frictionValue],
] as const) {
  input.addEventListener('input', () => syncReadout(input, output))
  input.addEventListener('change', syncConfig)
}

window.addEventListener('resize', () => updateCenter())

syncConfig()
updateCenter(true)
placeCursor(centerX, centerY)
requestAnimationFrame(frame)
