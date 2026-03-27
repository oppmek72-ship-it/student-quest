// ===== Battle Sprite Animation Poses =====
// Each animation is a function(t) where t=0..1, returns a pose delta object.

function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function easeOutBack(t) { const c = 1.7; return 1 + (--t) * t * ((c + 1) * t + c); }
function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2; }
function easeOutQuad(t) { return 1 - (1 - t) * (1 - t); }

const BASE_POSE = {
  offsetX: 0, offsetY: 0,
  tintColor: null, tintOpacity: 0,
  opacity: 1, scaleX: 1, scaleY: 1, rotation: 0,
};

// --- Animation durations (ms) ---
export const ANIM_DURATIONS = {
  idle: 2000,
  attack_physical: 500,
  attack_magic: 600,
  hit: 350,
  death: 800,
  heal: 500,
  buff: 400,
};

// --- Idle: gentle bob ---
export function idle(t) {
  const angle = t * Math.PI * 2;
  return {
    ...BASE_POSE,
    offsetY: -2 * Math.sin(angle),
    scaleX: 1 + 0.01 * Math.sin(angle),
    scaleY: 1 - 0.01 * Math.sin(angle),
  };
}

// --- Physical attack: lunge forward + squash ---
export function attack_physical(t) {
  let offsetX = 0;
  let scaleX = 1, scaleY = 1;

  if (t < 0.15) {
    // Wind up: pull back slightly
    offsetX = lerp(0, -4, t / 0.15);
    scaleX = lerp(1, 1.1, t / 0.15);
    scaleY = lerp(1, 0.9, t / 0.15);
  } else if (t < 0.4) {
    // Lunge forward
    const p = (t - 0.15) / 0.25;
    offsetX = lerp(-4, 24, easeOutBack(p));
    scaleX = lerp(1.1, 0.95, p);
    scaleY = lerp(0.9, 1.05, p);
  } else if (t < 0.55) {
    // Hold at peak
    offsetX = lerp(24, 22, (t - 0.4) / 0.15);
  } else {
    // Return
    const p = (t - 0.55) / 0.45;
    offsetX = lerp(22, 0, easeInOutQuad(p));
    scaleX = lerp(0.95, 1, p);
    scaleY = lerp(1.05, 1, p);
  }

  return { ...BASE_POSE, offsetX, scaleX, scaleY };
}

// --- Magic attack: float up + glow ---
export function attack_magic(t) {
  let offsetY = 0;
  let tintColor = null, tintOpacity = 0;
  let scaleX = 1, scaleY = 1;

  if (t < 0.25) {
    // Float up
    const p = t / 0.25;
    offsetY = lerp(0, -8, easeOutQuad(p));
    scaleY = lerp(1, 1.05, p);
  } else if (t < 0.6) {
    // Hold + glow pulse
    offsetY = -8;
    scaleY = 1.05;
    const pulse = Math.sin(((t - 0.25) / 0.35) * Math.PI);
    tintColor = "#9b59b6";
    tintOpacity = 0.35 * pulse;
  } else if (t < 0.75) {
    // Release flash
    const p = (t - 0.6) / 0.15;
    offsetY = lerp(-8, -10, p);
    tintColor = "#ffffff";
    tintOpacity = lerp(0.4, 0, p);
    scaleX = lerp(1, 1.15, p);
    scaleY = lerp(1.05, 0.95, p);
  } else {
    // Settle
    const p = (t - 0.75) / 0.25;
    offsetY = lerp(-10, 0, easeInOutQuad(p));
    scaleX = lerp(1.15, 1, p);
    scaleY = lerp(0.95, 1, p);
  }

  return { ...BASE_POSE, offsetY, tintColor, tintOpacity, scaleX, scaleY };
}

// --- Hit: knockback + white flash ---
export function hit(t) {
  let offsetX = 0;
  let tintColor = "#ffffff", tintOpacity = 0;
  let scaleX = 1, scaleY = 1;

  if (t < 0.15) {
    // Knockback
    const p = t / 0.15;
    offsetX = lerp(0, -10, easeOutQuad(p));
    scaleX = lerp(1, 0.9, p);
    scaleY = lerp(1, 1.1, p);
  } else if (t < 0.5) {
    // Hold + flash
    const p = (t - 0.15) / 0.35;
    offsetX = lerp(-10, -6, p);
    // Two flashes
    const flashT = p * 2;
    tintOpacity = flashT < 1
      ? 0.6 * (1 - Math.abs(flashT - 0.5) * 2)
      : 0.4 * (1 - Math.abs(flashT - 1.5) * 2);
    tintOpacity = Math.max(0, tintOpacity);
  } else {
    // Return
    const p = (t - 0.5) / 0.5;
    offsetX = lerp(-6, 0, easeInOutQuad(p));
    scaleX = lerp(0.9, 1, p);
    scaleY = lerp(1.1, 1, p);
  }

  return { ...BASE_POSE, offsetX, tintColor, tintOpacity, scaleX, scaleY };
}

// --- Death: knockback + fall + fade ---
export function death(t) {
  let offsetX = 0, offsetY = 0;
  let opacity = 1, rotation = 0;
  let tintColor = "#ff0000", tintOpacity = 0;

  if (t < 0.2) {
    // Big knockback + red flash
    const p = t / 0.2;
    offsetX = lerp(0, -14, easeOutQuad(p));
    tintOpacity = 0.5 * (1 - p);
  } else if (t < 0.5) {
    // Start falling
    const p = (t - 0.2) / 0.3;
    offsetX = lerp(-14, -16, p);
    offsetY = lerp(0, 6, p * p);
    rotation = lerp(0, Math.PI / 3, easeOutQuad(p));
  } else {
    // Fall + fade
    const p = (t - 0.5) / 0.5;
    offsetX = -16;
    offsetY = lerp(6, 14, p);
    rotation = lerp(Math.PI / 3, Math.PI / 2, p);
    opacity = lerp(1, 0, easeInOutQuad(p));
  }

  return { ...BASE_POSE, offsetX, offsetY, opacity, rotation, tintColor, tintOpacity };
}

// --- Heal: green pulse + float ---
export function heal(t) {
  let offsetY = 0;
  let tintColor = "#2ecc71", tintOpacity = 0;

  if (t < 0.3) {
    const p = t / 0.3;
    offsetY = lerp(0, -5, easeOutQuad(p));
    tintOpacity = lerp(0, 0.4, p);
  } else if (t < 0.6) {
    offsetY = -5;
    const pulse = Math.sin(((t - 0.3) / 0.3) * Math.PI);
    tintOpacity = 0.2 + 0.2 * pulse;
  } else {
    const p = (t - 0.6) / 0.4;
    offsetY = lerp(-5, 0, easeInOutQuad(p));
    tintOpacity = lerp(0.3, 0, p);
  }

  return { ...BASE_POSE, offsetY, tintColor, tintOpacity };
}

// --- Buff: blue/gold pulse ---
export function buff(t) {
  let tintColor = "#3498db", tintOpacity = 0;
  let scaleX = 1, scaleY = 1;

  const pulse = Math.sin(t * Math.PI * 2);
  tintOpacity = 0.3 * Math.abs(pulse);

  if (t < 0.3) {
    const p = t / 0.3;
    scaleX = lerp(1, 1.06, p);
    scaleY = lerp(1, 1.06, p);
  } else if (t > 0.7) {
    const p = (t - 0.7) / 0.3;
    scaleX = lerp(1.06, 1, p);
    scaleY = lerp(1.06, 1, p);
  } else {
    scaleX = 1.06;
    scaleY = 1.06;
  }

  return { ...BASE_POSE, tintColor, tintOpacity, scaleX, scaleY };
}

// --- Get animation function by name ---
export function getAnimation(name) {
  const map = { idle, attack_physical, attack_magic, hit, death, heal, buff };
  return map[name] || idle;
}
