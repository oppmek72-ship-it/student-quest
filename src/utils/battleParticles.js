// ===== Lightweight Pixel-Art Particle System =====

const MAX_PARTICLES = 40;

export function createParticle(x, y, vx, vy, life, color, size = 2) {
  return { x, y, vx, vy, life, maxLife: life, color, size, type: "rect" };
}

// --- Effect factories ---

export function createSlashEffect(x, y, direction = 1) {
  const particles = [];
  const count = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI / 3) * (i / count - 0.5) + (direction > 0 ? 0 : Math.PI);
    const speed = 60 + Math.random() * 40;
    particles.push(createParticle(
      x + Math.random() * 8 - 4,
      y + Math.random() * 8 - 4,
      Math.cos(angle) * speed * direction,
      Math.sin(angle) * speed - 20,
      0.25 + Math.random() * 0.15,
      Math.random() > 0.3 ? "#ffffff" : "#ffdd57",
      Math.random() > 0.5 ? 3 : 2,
    ));
  }
  return particles;
}

export function createMagicBurst(x, y, color = "#9b59b6") {
  const particles = [];
  const count = 10 + Math.floor(Math.random() * 5);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.3;
    const speed = 30 + Math.random() * 50;
    const c = Math.random() > 0.4 ? color : "#ffffff";
    particles.push(createParticle(
      x + Math.random() * 6 - 3,
      y + Math.random() * 6 - 3,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed,
      0.35 + Math.random() * 0.2,
      c,
      2 + Math.floor(Math.random() * 2),
    ));
  }
  return particles;
}

export function createHealSparkles(x, y) {
  const particles = [];
  const count = 8 + Math.floor(Math.random() * 4);
  for (let i = 0; i < count; i++) {
    particles.push(createParticle(
      x + Math.random() * 30 - 15,
      y + Math.random() * 10,
      (Math.random() - 0.5) * 15,
      -30 - Math.random() * 30,
      0.5 + Math.random() * 0.3,
      Math.random() > 0.4 ? "#2ecc71" : "#ffffff",
      2,
    ));
  }
  return particles;
}

export function createBuffSparkles(x, y, color = "#3498db") {
  const particles = [];
  const count = 6;
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count;
    particles.push(createParticle(
      x + Math.cos(angle) * 12,
      y + Math.sin(angle) * 12,
      Math.cos(angle) * 20,
      Math.sin(angle) * 20 - 10,
      0.4 + Math.random() * 0.2,
      Math.random() > 0.5 ? color : "#ffffff",
      2,
    ));
  }
  return particles;
}

export function createDeathParticles(x, y) {
  const particles = [];
  for (let i = 0; i < 12; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 20 + Math.random() * 40;
    particles.push(createParticle(
      x + Math.random() * 20 - 10,
      y + Math.random() * 20 - 10,
      Math.cos(angle) * speed,
      Math.sin(angle) * speed - 15,
      0.5 + Math.random() * 0.3,
      Math.random() > 0.5 ? "#e74c3c" : "#333333",
      2 + Math.floor(Math.random() * 2),
    ));
  }
  return particles;
}

// --- Update & Draw ---

export function updateParticles(particles, dt) {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    p.vy += 60 * dt; // gravity
    p.life -= dt;
    if (p.life <= 0) {
      particles.splice(i, 1);
    }
  }
  // Cap
  while (particles.length > MAX_PARTICLES) {
    particles.shift();
  }
}

export function drawParticles(ctx, particles, width, height) {
  for (const p of particles) {
    const alpha = Math.max(0, Math.min(1, p.life / p.maxLife));
    ctx.globalAlpha = alpha;
    ctx.fillStyle = p.color;
    ctx.fillRect(
      Math.round(p.x),
      Math.round(p.y),
      p.size,
      p.size,
    );
  }
  ctx.globalAlpha = 1;
}

// --- Magic color mapping ---
export const MAGIC_COLORS = {
  "🔥": "#e74c3c",
  "❄️": "#3498db",
  "⛈️": "#f1c40f",
  "🌑": "#9b59b6",
  "☄️": "#ff6b35",
  "🌪️": "#1abc9c",
  "☠️": "#8e44ad",
  "🌊": "#2980b9",
  "🌈": "#e67e22",
  default: "#9b59b6",
};

export function getMagicColor(emoji) {
  return MAGIC_COLORS[emoji] || MAGIC_COLORS.default;
}
