import { Glissix } from 'glissix';

console.log('--- Glissix NPM Package Verification ---');
console.log('1. Instantiating Glissix at starting coordinates (0, 0)...');

const motion = new Glissix(0, 0, {
  mass: 1.0,
  tension: 0.15,
  friction: 0.82
});

console.log('2. Setting target coordinate to (100, 100) and applying an impulse...');
motion.setTarget(100, 100);
motion.applyImpulse(25, 25);

console.log('3. Running physics simulation step loop until settled...');
let steps = 0;
let settled = false;

while (!settled && steps < 200) {
  steps++;
  const { x, y, vx, vy } = motion.step();
  const speed = motion.getVelocity();
  const dist = Math.hypot(100 - x, 100 - y);
  
  if (steps % 5 === 0 || steps === 1) {
    console.log(`[Step ${steps.toString().padStart(2, '0')}] Position: (${x.toFixed(2)}, ${y.toFixed(2)}) | Speed: ${speed.toFixed(2)} | Dist to target: ${dist.toFixed(2)}`);
  }
  
  if (speed < 0.001 && dist < 0.01) {
    settled = true;
    console.log(`\n✦ Settled at Step ${steps}! Final Position: (${x.toFixed(2)}, ${y.toFixed(2)})`);
  }
}

if (!settled) {
  console.log(`\n⚠️ Did not settle within ${steps} steps.`);
} else {
  console.log('✦ SUCCESS: Glissix NPM package is functional and math resolved correctly!');
}
