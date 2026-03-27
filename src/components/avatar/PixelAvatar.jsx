import { useRef, useEffect, useMemo } from "react";
import {
  SKIN_PALETTES, HAIR_COLORS, HAIR_STYLES, FACES,
  TOPS, BOTTOMS, SHOES, HATS, ACCESSORIES,
  TOP_TEMPLATES, BOTTOM_TEMPLATES, SHOE_TEMPLATES, HAT_TEMPLATES, ACC_TEMPLATES,
  DEFAULT_PIXEL_AVATAR,
} from "../../constants/avatarPixel";

export const W = 24;
export const H = 32;

export function drawPixel(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, 1, 1);
}

export function drawRect(ctx, x, y, w, h, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

// ===== BODY =====
export function drawBody(ctx, skin) {
  const { base, shadow, highlight } = skin;
  drawRect(ctx, 8, 4, 8, 8, base);
  drawRect(ctx, 9, 4, 6, 1, highlight);
  drawRect(ctx, 8, 10, 1, 2, shadow);
  drawRect(ctx, 15, 10, 1, 2, shadow);
  drawPixel(ctx, 7, 7, base);
  drawPixel(ctx, 16, 7, base);
  drawRect(ctx, 10, 12, 4, 2, base);
  drawRect(ctx, 10, 12, 1, 2, shadow);
  drawRect(ctx, 7, 14, 10, 8, base);
  drawRect(ctx, 5, 15, 2, 6, base);
  drawRect(ctx, 5, 15, 1, 6, shadow);
  drawRect(ctx, 17, 15, 2, 6, base);
  drawRect(ctx, 18, 15, 1, 6, shadow);
  drawRect(ctx, 5, 21, 2, 2, base);
  drawRect(ctx, 17, 21, 2, 2, base);
  drawRect(ctx, 8, 22, 3, 6, base);
  drawRect(ctx, 13, 22, 3, 6, base);
}

// ===== FACE =====
export function drawFace(ctx, faceId, skin) {
  const face = FACES[faceId] || FACES.fc1;
  const eyeY = 7, lx = 10, rx = 13;

  if (face.eyes === "round") {
    drawPixel(ctx, lx, eyeY, "#fff"); drawPixel(ctx, lx + 1, eyeY, "#fff");
    drawPixel(ctx, rx, eyeY, "#fff"); drawPixel(ctx, rx + 1, eyeY, "#fff");
    drawPixel(ctx, lx + 1, eyeY, "#2C3E50"); drawPixel(ctx, rx, eyeY, "#2C3E50");
    drawPixel(ctx, lx, eyeY, "#fff"); drawPixel(ctx, rx + 1, eyeY, "#fff");
  } else if (face.eyes === "big") {
    drawRect(ctx, lx, eyeY - 1, 2, 2, "#fff"); drawRect(ctx, rx, eyeY - 1, 2, 2, "#fff");
    drawPixel(ctx, lx + 1, eyeY, "#2C3E50"); drawPixel(ctx, rx, eyeY, "#2C3E50");
    drawPixel(ctx, lx, eyeY - 1, "#5DADE2"); drawPixel(ctx, rx + 1, eyeY - 1, "#5DADE2");
  } else if (face.eyes === "line") {
    drawRect(ctx, lx, eyeY, 2, 1, "#2C3E50"); drawRect(ctx, rx, eyeY, 2, 1, "#2C3E50");
  } else if (face.eyes === "closed") {
    drawPixel(ctx, lx, eyeY, "#2C3E50"); drawPixel(ctx, lx + 1, eyeY + 1, "#2C3E50");
    drawPixel(ctx, rx + 1, eyeY, "#2C3E50"); drawPixel(ctx, rx, eyeY + 1, "#2C3E50");
  } else if (face.eyes === "angry") {
    drawPixel(ctx, lx + 1, eyeY, "#C0392B"); drawPixel(ctx, rx, eyeY, "#C0392B");
    drawPixel(ctx, lx, eyeY - 1, "#2C3E50"); drawPixel(ctx, lx + 1, eyeY - 2, "#2C3E50");
    drawPixel(ctx, rx + 1, eyeY - 1, "#2C3E50"); drawPixel(ctx, rx, eyeY - 2, "#2C3E50");
  } else if (face.eyes === "star") {
    drawPixel(ctx, lx, eyeY, "#F1C40F"); drawPixel(ctx, lx + 1, eyeY, "#F1C40F");
    drawPixel(ctx, lx, eyeY - 1, "#F9E547"); drawPixel(ctx, lx + 1, eyeY + 1, "#F9E547");
    drawPixel(ctx, rx, eyeY, "#F1C40F"); drawPixel(ctx, rx + 1, eyeY, "#F1C40F");
    drawPixel(ctx, rx + 1, eyeY - 1, "#F9E547"); drawPixel(ctx, rx, eyeY + 1, "#F9E547");
  }

  const my = 9;
  if (face.mouth === "smile") {
    drawPixel(ctx, 11, my, "#C0392B"); drawPixel(ctx, 12, my, "#C0392B");
    drawPixel(ctx, 10, my - 1, skin.shadow); drawPixel(ctx, 13, my - 1, skin.shadow);
  } else if (face.mouth === "open") {
    drawPixel(ctx, 11, my, "#C0392B"); drawPixel(ctx, 12, my, "#C0392B");
    drawPixel(ctx, 11, my + 1, "#E74C3C"); drawPixel(ctx, 12, my + 1, "#E74C3C");
  } else if (face.mouth === "flat") {
    drawRect(ctx, 11, my, 2, 1, "#7F8C8D");
  } else if (face.mouth === "grin") {
    drawRect(ctx, 10, my, 4, 1, "#C0392B");
    drawPixel(ctx, 11, my, "#fff"); drawPixel(ctx, 12, my, "#fff");
  }

  if (face.blush) {
    drawPixel(ctx, 9, 8, "#FBBCBC88"); drawPixel(ctx, 14, 8, "#FBBCBC88");
  }
}

// ===== HAIR =====
export function drawHair(ctx, hairId, hairColorId) {
  const style = HAIR_STYLES[hairId] || HAIR_STYLES.hr0;
  const hc = HAIR_COLORS[hairColorId] || HAIR_COLORS.hc1;
  if (!style.pixels || style.pixels.length === 0) return;
  const colorMap = { b: hc.base, s: hc.shadow, h: hc.highlight };
  for (const layer of style.pixels) {
    const { rows, ox, oy } = layer;
    for (let r = 0; r < rows.length; r++) {
      const row = rows[r];
      for (let c = 0; c < row.length; c++) {
        const ch = row[c];
        if (ch !== "." && colorMap[ch]) drawPixel(ctx, ox + c, oy + r, colorMap[ch]);
      }
    }
  }
}

// ===== TEMPLATE-BASED DRAWING =====

// --- TOPS ---
export function drawTop(ctx, topId) {
  const top = TOPS[topId];
  if (!top) return;
  const { base, shadow, accent } = top;
  const t = TOP_TEMPLATES[top.template];
  if (!t) return;

  // Main torso
  drawRect(ctx, 7, 14, 10, 8, base);
  drawRect(ctx, 7, 14, 1, 8, shadow);
  drawRect(ctx, 16, 14, 1, 8, shadow);

  // Collar
  if (t.collar === "round") {
    drawRect(ctx, 10, 13, 4, 1, base);
  } else if (t.collar === "v") {
    drawPixel(ctx, 11, 13, base); drawPixel(ctx, 12, 13, base);
    drawPixel(ctx, 10, 14, shadow); drawPixel(ctx, 13, 14, shadow);
  } else if (t.collar === "high") {
    drawRect(ctx, 9, 12, 6, 2, base);
    drawRect(ctx, 9, 12, 1, 2, shadow);
  } else if (t.collar === "wide") {
    drawRect(ctx, 8, 13, 8, 1, accent || base);
    drawRect(ctx, 7, 14, 2, 1, accent || base);
    drawRect(ctx, 15, 14, 2, 1, accent || base);
  }

  // Sleeves
  if (t.sleeves === "short") {
    drawRect(ctx, 5, 15, 2, 5, base); drawRect(ctx, 5, 15, 1, 5, shadow);
    drawRect(ctx, 17, 15, 2, 5, base); drawRect(ctx, 18, 15, 1, 5, shadow);
  } else if (t.sleeves === "long") {
    drawRect(ctx, 5, 15, 2, 7, base); drawRect(ctx, 5, 15, 1, 7, shadow);
    drawRect(ctx, 17, 15, 2, 7, base); drawRect(ctx, 18, 15, 1, 7, shadow);
  } else if (t.sleeves === "armored") {
    drawRect(ctx, 5, 15, 2, 5, base); drawRect(ctx, 5, 15, 1, 5, shadow);
    drawRect(ctx, 17, 15, 2, 5, base); drawRect(ctx, 18, 15, 1, 5, shadow);
    drawRect(ctx, 4, 14, 3, 2, shadow); drawRect(ctx, 17, 14, 3, 2, shadow);
  }

  // Belt
  if (t.belt) drawRect(ctx, 7, 21, 10, 1, accent || shadow);

  // Shoulders
  if (t.shoulders) {
    drawRect(ctx, 4, 14, 3, 2, accent || shadow);
    drawRect(ctx, 17, 14, 3, 2, accent || shadow);
  }

  // Emblem
  if (t.emblem === "cross") {
    drawPixel(ctx, 11, 17, accent || "#F1C40F"); drawPixel(ctx, 12, 17, accent || "#F1C40F");
  } else if (t.emblem === "diamond") {
    drawPixel(ctx, 11, 16, accent || "#F1C40F"); drawPixel(ctx, 12, 16, accent || "#F1C40F");
    drawPixel(ctx, 10, 17, accent || "#F1C40F"); drawPixel(ctx, 13, 17, accent || "#F1C40F");
    drawPixel(ctx, 11, 18, accent || "#F1C40F"); drawPixel(ctx, 12, 18, accent || "#F1C40F");
  } else if (t.emblem === "tie") {
    drawPixel(ctx, 12, 14, accent || "#E74C3C");
    drawPixel(ctx, 12, 15, accent || "#E74C3C");
    drawPixel(ctx, 12, 16, shadow);
  }

  // Extend (robes/coats)
  if (t.extend > 0) {
    drawRect(ctx, 7, 22, 10, t.extend, base);
    drawRect(ctx, 7, 22, 1, t.extend, shadow);
  }

  // Pattern
  if (t.pattern === "stripes") {
    for (let y = 15; y < 21; y += 2) drawRect(ctx, 8, y, 8, 1, accent || shadow);
  } else if (t.pattern === "stars") {
    drawPixel(ctx, 9, 16, accent || "#F1C40F");
    drawPixel(ctx, 14, 18, accent || "#F1C40F");
    drawPixel(ctx, 10, 20, accent || "#F1C40F");
  } else if (t.pattern === "scales") {
    for (let y = 15; y < 21; y += 2)
      for (let x = 8; x < 16; x += 2) {
        drawPixel(ctx, x, y, shadow); drawPixel(ctx, x + 1, y + 1, shadow);
      }
  } else if (t.pattern === "chainmail") {
    for (let y = 15; y < 21; y += 2)
      for (let x = 8; x < 16; x += 3) drawPixel(ctx, x, y, accent || "#aaa");
  } else if (t.pattern === "pockets") {
    drawRect(ctx, 8, 17, 2, 2, shadow); drawRect(ctx, 14, 17, 2, 2, shadow);
  }

  // Trim
  if (t.trim) {
    drawRect(ctx, 7, 14, 10, 1, accent || "#F1C40F");
    drawRect(ctx, 10, 13, 4, 1, accent || "#F1C40F");
  }

  // Hood
  if (t.hood) {
    drawPixel(ctx, 8, 5, base); drawPixel(ctx, 15, 5, base);
    drawPixel(ctx, 7, 6, base); drawPixel(ctx, 16, 6, base);
  }

  // Open front
  if (t.openFront) {
    drawPixel(ctx, 11, 15, shadow); drawPixel(ctx, 12, 15, shadow);
    drawPixel(ctx, 11, 16, shadow); drawPixel(ctx, 12, 16, shadow);
    drawPixel(ctx, 11, 17, shadow); drawPixel(ctx, 12, 17, shadow);
  }

  // Buttons
  if (t.buttons) {
    drawPixel(ctx, 12, 15, accent || "#F1C40F");
    drawPixel(ctx, 12, 17, accent || "#F1C40F");
    drawPixel(ctx, 12, 19, accent || "#F1C40F");
  }

  // Cape
  if (t.cape) {
    drawRect(ctx, 6, 15, 1, 8, accent || base);
    drawRect(ctx, 17, 15, 1, 8, accent || base);
    drawRect(ctx, 6, 23, 12, 2, accent || base);
    drawPixel(ctx, 6, 23, shadow); drawPixel(ctx, 17, 23, shadow);
  }

  // Glow
  if (t.glow) {
    const g = (accent || base) + "44";
    drawPixel(ctx, 6, 13, g); drawPixel(ctx, 17, 13, g);
    drawPixel(ctx, 6, 22, g); drawPixel(ctx, 17, 22, g);
  }
}

// --- BOTTOMS ---
export function drawBottom(ctx, bottomId) {
  const bt = BOTTOMS[bottomId];
  if (!bt) return;
  const { base, shadow, accent } = bt;
  const t = BOTTOM_TEMPLATES[bt.template];
  if (!t) return;

  if (t.type === "skirt") {
    drawRect(ctx, 7, 22, 10, 2, base);
    drawRect(ctx, 6, 24, 12, 2, base);
    drawRect(ctx, 6, 24, 1, 2, shadow);
  } else if (t.type === "miniskirt") {
    drawRect(ctx, 7, 22, 10, 2, base);
    drawRect(ctx, 6, 24, 12, 1, base);
    drawRect(ctx, 6, 24, 1, 1, shadow);
  } else if (t.type === "longskirt") {
    drawRect(ctx, 7, 22, 10, 2, base);
    drawRect(ctx, 6, 24, 12, 4, base);
    drawRect(ctx, 6, 24, 1, 4, shadow);
  } else if (t.type === "shorts") {
    drawRect(ctx, 8, 22, 3, 3, base); drawRect(ctx, 8, 22, 1, 3, shadow);
    drawRect(ctx, 13, 22, 3, 3, base); drawRect(ctx, 13, 22, 1, 3, shadow);
  } else if (t.type === "wide") {
    drawRect(ctx, 7, 22, 4, 5, base); drawRect(ctx, 7, 22, 1, 5, shadow);
    drawRect(ctx, 13, 22, 4, 5, base); drawRect(ctx, 13, 22, 1, 5, shadow);
  } else if (t.type === "robe") {
    drawRect(ctx, 7, 22, 10, 6, base);
    drawRect(ctx, 7, 22, 1, 6, shadow);
  } else {
    // Default pants
    drawRect(ctx, 8, 22, 3, 5, base); drawRect(ctx, 8, 22, 1, 5, shadow);
    drawRect(ctx, 13, 22, 3, 5, base); drawRect(ctx, 13, 22, 1, 5, shadow);
  }

  // Features
  if (t.belt) drawRect(ctx, 7, 22, 10, 1, accent || shadow);
  if (t.stripe) {
    drawRect(ctx, 10, 23, 1, 4, accent || shadow);
    drawRect(ctx, 15, 23, 1, 4, accent || shadow);
  }
  if (t.trim) {
    drawRect(ctx, 8, 26, 3, 1, accent || "#F1C40F");
    drawRect(ctx, 13, 26, 3, 1, accent || "#F1C40F");
  }
  if (t.cuffs) {
    drawRect(ctx, 8, 26, 3, 1, shadow);
    drawRect(ctx, 13, 26, 3, 1, shadow);
  }
  if (t.stitching) {
    drawPixel(ctx, 9, 24, accent || shadow);
    drawPixel(ctx, 14, 24, accent || shadow);
  }
  if (t.armor) {
    drawPixel(ctx, 8, 23, shadow); drawPixel(ctx, 10, 23, shadow);
    drawPixel(ctx, 13, 23, shadow); drawPixel(ctx, 15, 23, shadow);
  }
  if (t.pockets) {
    drawRect(ctx, 9, 23, 1, 2, shadow);
    drawRect(ctx, 14, 23, 1, 2, shadow);
  }
  if (t.pattern === "camo") {
    drawPixel(ctx, 9, 23, shadow); drawPixel(ctx, 14, 25, shadow);
    drawPixel(ctx, 10, 25, accent || shadow); drawPixel(ctx, 15, 23, accent || shadow);
  } else if (t.pattern === "scales") {
    for (let y = 23; y < 27; y += 2) {
      drawPixel(ctx, 9, y, shadow); drawPixel(ctx, 14, y, shadow);
    }
  } else if (t.pattern === "stars") {
    drawPixel(ctx, 9, 24, accent || "#F1C40F");
    drawPixel(ctx, 14, 24, accent || "#F1C40F");
  } else if (t.pattern === "crystal") {
    drawPixel(ctx, 9, 23, accent || "#AED6F1"); drawPixel(ctx, 10, 25, accent || "#AED6F1");
    drawPixel(ctx, 14, 24, accent || "#AED6F1");
  } else if (t.pattern === "shadow") {
    drawPixel(ctx, 9, 24, shadow); drawPixel(ctx, 10, 23, shadow);
    drawPixel(ctx, 14, 25, shadow); drawPixel(ctx, 15, 24, shadow);
  }
  if (t.glow) {
    const g = (accent || base) + "44";
    drawPixel(ctx, 7, 22, g); drawPixel(ctx, 16, 22, g);
  }
}

// --- SHOES ---
export function drawShoes(ctx, shoeId) {
  const shoe = SHOES[shoeId];
  if (!shoe) return;
  const { base, shadow, accent } = shoe;
  const t = SHOE_TEMPLATES[shoe.template];
  if (!t) return;

  let sy, sh;
  if (t.type === "high") { sy = 26; sh = 4; }
  else if (t.type === "mid") { sy = 27; sh = 3; }
  else if (t.type === "sandal") { sy = 29; sh = 1; }
  else { sy = 28; sh = 2; } // low

  // Left shoe
  drawRect(ctx, 7, sy, 4, sh, base); drawRect(ctx, 7, sy, 1, sh, shadow);
  drawPixel(ctx, 7, sy + sh - 1, shadow);
  // Right shoe
  drawRect(ctx, 13, sy, 4, sh, base); drawRect(ctx, 13, sy, 1, sh, shadow);
  drawPixel(ctx, 13, sy + sh - 1, shadow);

  // Features
  if (t.stripe) {
    drawPixel(ctx, 9, sy + sh - 1, accent || "#E74C3C");
    drawPixel(ctx, 15, sy + sh - 1, accent || "#E74C3C");
  }
  if (t.buckle) {
    drawPixel(ctx, 8, sy, accent || "#F1C40F");
    drawPixel(ctx, 14, sy, accent || "#F1C40F");
  }
  if (t.thick || t.platform) {
    drawRect(ctx, 7, sy + sh, 4, 1, shadow);
    drawRect(ctx, 13, sy + sh, 4, 1, shadow);
  }
  if (t.armor) {
    drawPixel(ctx, 8, sy, shadow); drawPixel(ctx, 14, sy, shadow);
    drawPixel(ctx, 9, sy + 1, shadow); drawPixel(ctx, 15, sy + 1, shadow);
  }
  if (t.wrap) {
    drawPixel(ctx, 8, sy + 1, accent || shadow);
    drawPixel(ctx, 14, sy + 1, accent || shadow);
  }
  if (t.trim) {
    drawRect(ctx, 7, sy, 4, 1, accent || "#F1C40F");
    drawRect(ctx, 13, sy, 4, 1, accent || "#F1C40F");
  }
  if (t.chain) {
    drawPixel(ctx, 9, sy + 1, accent || "#aaa"); drawPixel(ctx, 15, sy + 1, accent || "#aaa");
  }
  if (t.rugged) {
    drawPixel(ctx, 7, sy + sh, shadow); drawPixel(ctx, 10, sy + sh, shadow);
    drawPixel(ctx, 13, sy + sh, shadow); drawPixel(ctx, 16, sy + sh, shadow);
  }
  if (t.spikes) {
    drawPixel(ctx, 10, sy - 1, accent || shadow);
    drawPixel(ctx, 16, sy - 1, accent || shadow);
  }
  if (t.curl) {
    drawPixel(ctx, 11, sy + sh - 1, accent || base);
    drawPixel(ctx, 17, sy + sh - 1, accent || base);
  }
  if (t.flame) {
    drawPixel(ctx, 6, sy - 1, "#F39C12" + "88");
    drawPixel(ctx, 12, sy - 1, "#F39C12" + "88");
  }
  if (t.crystal) {
    drawPixel(ctx, 9, sy, accent || "#AED6F1");
    drawPixel(ctx, 15, sy, accent || "#AED6F1");
  }
  if (t.wings) {
    drawPixel(ctx, 6, sy, accent || "#AED6F1");
    drawPixel(ctx, 5, sy - 1, accent || "#AED6F1");
    drawPixel(ctx, 18, sy, accent || "#AED6F1");
    drawPixel(ctx, 19, sy - 1, accent || "#AED6F1");
  }
  if (t.glow) {
    const g = (accent || base) + "44";
    drawPixel(ctx, 8, sy - 1, g); drawPixel(ctx, 14, sy - 1, g);
  }
}

// --- HATS ---
export function drawHat(ctx, hatId) {
  const hat = HATS[hatId];
  if (!hat) return;
  const { base, shadow, accent } = hat;
  const t = HAT_TEMPLATES[hat.template];
  if (!t || t.type === "none") return;

  switch (t.type) {
    case "cap":
      drawRect(ctx, 7, 2, 10, 3, base);
      drawRect(ctx, 6, 4, 12, 1, shadow);
      drawRect(ctx, 5, 5, 5, 1, shadow); // visor
      break;
    case "beret":
      drawRect(ctx, 7, 1, 10, 4, base);
      drawRect(ctx, 5, 3, 3, 2, base);
      drawRect(ctx, 7, 1, 10, 1, shadow);
      break;
    case "bow":
      drawRect(ctx, 14, 3, 3, 2, base);
      drawRect(ctx, 12, 4, 2, 1, base);
      drawPixel(ctx, 13, 3, shadow);
      break;
    case "bandana":
      drawRect(ctx, 7, 3, 10, 2, base);
      drawRect(ctx, 16, 5, 3, 1, base);
      drawRect(ctx, 17, 4, 2, 1, base);
      break;
    case "tophat":
      if (t.tall) {
        drawRect(ctx, 8, -2, 8, 6, base);
        drawRect(ctx, 6, 4, 12, 1, shadow);
        drawRect(ctx, 8, -2, 8, 1, shadow);
      } else {
        drawRect(ctx, 8, 0, 8, 4, base);
        drawRect(ctx, 6, 4, 12, 1, shadow);
        drawRect(ctx, 8, 0, 8, 1, shadow);
      }
      break;
    case "helmet":
      drawRect(ctx, 7, 2, 10, 4, base);
      drawRect(ctx, 7, 2, 10, 1, shadow);
      drawRect(ctx, 6, 5, 12, 1, shadow);
      break;
    case "headband":
      drawRect(ctx, 7, 4, 10, 2, base);
      drawPixel(ctx, 11, 4, accent || "#E74C3C");
      drawPixel(ctx, 12, 4, accent || "#E74C3C");
      break;
    case "armorhelm":
      drawRect(ctx, 6, 1, 12, 5, base);
      drawRect(ctx, 6, 1, 12, 1, shadow);
      drawRect(ctx, 6, 5, 12, 1, shadow);
      drawPixel(ctx, 11, 5, accent || "#F1C40F");
      drawPixel(ctx, 12, 5, accent || "#F1C40F");
      break;
    case "ninjaband":
      drawRect(ctx, 7, 4, 10, 2, base);
      drawRect(ctx, 16, 5, 3, 1, base);
      drawRect(ctx, 17, 4, 2, 1, base);
      drawPixel(ctx, 11, 4, accent || "#E74C3C");
      drawPixel(ctx, 12, 4, accent || "#E74C3C");
      break;
    case "crown":
      drawRect(ctx, 7, 2, 10, 3, base);
      drawRect(ctx, 7, 2, 10, 1, shadow);
      drawPixel(ctx, 8, 1, base); drawPixel(ctx, 10, 0, base);
      drawPixel(ctx, 12, 0, base); drawPixel(ctx, 14, 0, base);
      drawPixel(ctx, 16, 1, base);
      drawPixel(ctx, 9, 3, accent || "#E74C3C");
      drawPixel(ctx, 12, 3, accent || "#3498DB");
      drawPixel(ctx, 15, 3, accent || "#2ECC71");
      break;
    case "sailorhat":
      drawRect(ctx, 7, 1, 10, 4, base);
      drawRect(ctx, 5, 4, 14, 1, shadow);
      drawPixel(ctx, 11, 2, accent || "#F1C40F");
      drawPixel(ctx, 12, 2, accent || "#F1C40F");
      break;
    case "chainhelm":
      drawRect(ctx, 7, 2, 10, 4, base);
      drawRect(ctx, 7, 2, 10, 1, shadow);
      for (let x = 8; x < 16; x += 2) drawPixel(ctx, x, 4, shadow);
      break;
    case "rangerhat":
      drawRect(ctx, 8, 1, 8, 3, base);
      drawRect(ctx, 5, 3, 14, 1, base);
      drawRect(ctx, 5, 4, 14, 1, shadow);
      drawPixel(ctx, 16, 2, accent || "#2ECC71");
      break;
    case "horns":
      drawPixel(ctx, 7, 3, base); drawPixel(ctx, 6, 2, base); drawPixel(ctx, 5, 1, base);
      drawPixel(ctx, 16, 3, base); drawPixel(ctx, 17, 2, base); drawPixel(ctx, 18, 1, base);
      drawPixel(ctx, 5, 0, base + "88"); drawPixel(ctx, 18, 0, base + "88");
      break;
    case "wizard":
      drawRect(ctx, 8, 0, 8, 1, base);
      drawRect(ctx, 9, -1, 6, 1, base);
      drawRect(ctx, 10, -2, 4, 1, base);
      drawRect(ctx, 11, -3, 2, 1, base);
      drawRect(ctx, 7, 1, 10, 3, base);
      drawRect(ctx, 6, 4, 12, 1, shadow);
      drawPixel(ctx, 11, -3, accent || "#F1C40F");
      drawPixel(ctx, 12, -3, accent || "#F1C40F");
      break;
    case "warhelm":
      drawRect(ctx, 6, 1, 12, 5, base);
      drawRect(ctx, 6, 1, 12, 1, shadow);
      drawRect(ctx, 6, 5, 12, 1, shadow);
      drawPixel(ctx, 11, 0, accent || shadow); drawPixel(ctx, 12, 0, accent || shadow);
      drawPixel(ctx, 11, -1, accent || shadow); drawPixel(ctx, 12, -1, accent || shadow);
      break;
    case "halo":
      drawRect(ctx, 8, 0, 8, 1, accent || "#F1C40F");
      drawPixel(ctx, 7, 0, (accent || "#F1C40F") + "88");
      drawPixel(ctx, 16, 0, (accent || "#F1C40F") + "88");
      if (t.radiant) {
        drawPixel(ctx, 9, -1, (accent || "#F1C40F") + "66");
        drawPixel(ctx, 14, -1, (accent || "#F1C40F") + "66");
        drawPixel(ctx, 11, -1, (accent || "#F1C40F") + "44");
        drawPixel(ctx, 12, -1, (accent || "#F1C40F") + "44");
      }
      break;
    case "hood":
      drawRect(ctx, 6, 1, 12, 6, base);
      drawRect(ctx, 6, 1, 1, 6, shadow);
      drawRect(ctx, 17, 1, 1, 6, shadow);
      drawRect(ctx, 8, 5, 8, 1, shadow);
      break;
    case "demonhorns":
      drawPixel(ctx, 6, 3, base); drawPixel(ctx, 5, 2, base);
      drawPixel(ctx, 4, 1, base); drawPixel(ctx, 3, 0, base);
      drawPixel(ctx, 17, 3, base); drawPixel(ctx, 18, 2, base);
      drawPixel(ctx, 19, 1, base); drawPixel(ctx, 20, 0, base);
      drawPixel(ctx, 3, -1, base + "88"); drawPixel(ctx, 20, -1, base + "88");
      break;
  }

  // Ornaments
  if (t.ornament === "star") {
    drawPixel(ctx, 11, 3, accent || "#F1C40F");
    drawPixel(ctx, 12, 3, accent || "#F1C40F");
  } else if (t.ornament === "feather") {
    drawPixel(ctx, 17, 1, accent || "#2ECC71");
    drawPixel(ctx, 17, 0, accent || "#2ECC71");
    drawPixel(ctx, 18, -1, (accent || "#2ECC71") + "88");
  } else if (t.ornament === "symbol") {
    drawPixel(ctx, 11, 4, accent || "#E74C3C");
    drawPixel(ctx, 12, 4, accent || "#E74C3C");
  }

  // Crown glow effects
  if (t.glow && t.type === "crown") {
    if (t.flame) {
      drawPixel(ctx, 10, -1, "#F39C12" + "88");
      drawPixel(ctx, 12, -1, "#E74C3C" + "66");
      drawPixel(ctx, 14, -1, "#F39C12" + "88");
    }
    if (t.crystal) {
      drawPixel(ctx, 9, 3, accent || "#AED6F1");
      drawPixel(ctx, 12, 3, accent || "#AED6F1");
      drawPixel(ctx, 15, 3, accent || "#AED6F1");
    }
  }
  if (t.glow) {
    const g = (accent || base) + "44";
    drawPixel(ctx, 6, 1, g); drawPixel(ctx, 17, 1, g);
  }
}

// --- ACCESSORIES ---
export function drawAccessory(ctx, accId) {
  const acc = ACCESSORIES[accId];
  if (!acc) return;
  const { base, shadow, accent } = acc;
  const t = ACC_TEMPLATES[acc.template];
  if (!t || t.type === "none") return;

  switch (t.type) {
    case "sword":
      drawRect(ctx, 19, 10, 1, 8, base);
      drawPixel(ctx, 19, 9, "#fff");
      drawRect(ctx, 18, 18, 3, 1, accent || "#8B4513");
      drawRect(ctx, 19, 19, 1, 2, accent || "#8B4513");
      break;
    case "hammer":
      drawRect(ctx, 19, 12, 1, 9, accent || "#8B4513");
      drawRect(ctx, 17, 10, 5, 3, base);
      drawRect(ctx, 17, 10, 5, 1, shadow);
      break;
    case "shield":
      drawRect(ctx, 1, 16, 4, 5, base);
      drawRect(ctx, 1, 16, 4, 1, shadow);
      drawPixel(ctx, 2, 18, accent || "#F1C40F");
      drawPixel(ctx, 3, 18, accent || "#F1C40F");
      break;
    case "book":
      drawRect(ctx, 18, 19, 4, 5, base);
      drawRect(ctx, 19, 20, 2, 3, accent || "#EBF5FB");
      break;
    case "bow_weapon":
      drawPixel(ctx, 20, 10, base); drawPixel(ctx, 21, 11, base);
      drawPixel(ctx, 21, 12, base); drawPixel(ctx, 21, 13, base);
      drawPixel(ctx, 21, 14, base); drawPixel(ctx, 21, 15, base);
      drawPixel(ctx, 20, 16, base);
      drawRect(ctx, 19, 11, 1, 5, accent || "#8B4513"); // string
      break;
    case "staff":
      drawRect(ctx, 19, 8, 1, 14, accent || "#8B4513");
      drawPixel(ctx, 18, 7, base); drawPixel(ctx, 19, 7, base); drawPixel(ctx, 20, 7, base);
      drawPixel(ctx, 19, 6, shadow);
      break;
    case "backpack":
      drawRect(ctx, 0, 16, 4, 6, base);
      drawRect(ctx, 0, 16, 4, 1, shadow);
      drawRect(ctx, 1, 18, 2, 2, accent || shadow);
      break;
    case "greatsword":
      drawRect(ctx, 19, 6, 1, 14, base);
      drawPixel(ctx, 19, 5, "#fff"); drawPixel(ctx, 19, 4, "#fff");
      drawRect(ctx, 17, 19, 5, 1, accent || "#8B4513");
      drawRect(ctx, 19, 20, 1, 3, accent || "#8B4513");
      break;
    case "shuriken":
      drawPixel(ctx, 19, 13, base); drawPixel(ctx, 20, 12, base);
      drawPixel(ctx, 21, 13, base); drawPixel(ctx, 20, 14, base);
      drawPixel(ctx, 20, 13, shadow);
      break;
    case "scepter":
      drawRect(ctx, 19, 10, 1, 12, accent || "#8B4513");
      drawRect(ctx, 18, 8, 3, 3, base);
      drawPixel(ctx, 19, 9, accent || "#F1C40F");
      break;
    case "telescope":
      drawRect(ctx, 19, 12, 1, 8, base);
      drawRect(ctx, 18, 11, 3, 2, base);
      drawPixel(ctx, 19, 11, accent || "#AED6F1");
      break;
    case "anchor":
      drawRect(ctx, 19, 12, 1, 8, base);
      drawRect(ctx, 17, 19, 5, 1, base);
      drawPixel(ctx, 17, 18, shadow); drawPixel(ctx, 21, 18, shadow);
      drawRect(ctx, 18, 11, 3, 1, shadow);
      break;
    case "warhammer":
      drawRect(ctx, 19, 10, 1, 12, accent || "#8B4513");
      drawRect(ctx, 16, 8, 7, 4, base);
      drawRect(ctx, 16, 8, 7, 1, shadow);
      break;
    case "chain":
      for (let y = 12; y < 22; y += 2) {
        drawPixel(ctx, 19, y, base); drawPixel(ctx, 20, y + 1, base);
      }
      break;
    case "dual":
      // Right blade
      drawRect(ctx, 19, 12, 1, 6, base);
      drawPixel(ctx, 19, 11, "#fff");
      drawPixel(ctx, 18, 18, accent || "#8B4513");
      // Left blade
      drawRect(ctx, 4, 12, 1, 6, base);
      drawPixel(ctx, 4, 11, "#fff");
      drawPixel(ctx, 5, 18, accent || "#8B4513");
      break;
    case "dragonaxe":
      drawRect(ctx, 19, 8, 1, 14, accent || "#8B4513");
      drawRect(ctx, 20, 8, 3, 5, base);
      drawPixel(ctx, 22, 9, shadow); drawPixel(ctx, 22, 10, shadow);
      drawPixel(ctx, 20, 7, base); drawPixel(ctx, 21, 7, shadow);
      break;
    case "magicstaff":
      drawRect(ctx, 19, 6, 1, 16, accent || "#8B4513");
      drawPixel(ctx, 18, 5, base); drawPixel(ctx, 19, 5, base); drawPixel(ctx, 20, 5, base);
      drawPixel(ctx, 19, 4, base);
      drawPixel(ctx, 18, 4, base + "88"); drawPixel(ctx, 20, 4, base + "88");
      break;
    case "warsword":
      drawRect(ctx, 19, 4, 2, 16, base);
      drawPixel(ctx, 19, 3, "#fff"); drawPixel(ctx, 20, 3, "#fff");
      drawRect(ctx, 17, 19, 6, 1, accent || "#8B4513");
      drawRect(ctx, 19, 20, 2, 3, accent || "#8B4513");
      break;
    case "orb":
      drawRect(ctx, 18, 17, 3, 3, base);
      drawPixel(ctx, 19, 18, accent || "#fff");
      drawPixel(ctx, 17, 17, base + "66"); drawPixel(ctx, 21, 17, base + "66");
      break;
    case "firewings":
      // Left wing
      drawPixel(ctx, 3, 14, base); drawPixel(ctx, 2, 13, base); drawPixel(ctx, 1, 12, base); drawPixel(ctx, 0, 11, base);
      drawPixel(ctx, 3, 15, shadow); drawPixel(ctx, 2, 14, shadow); drawPixel(ctx, 1, 13, shadow);
      drawPixel(ctx, 0, 10, "#F39C12" + "88");
      // Right wing
      drawPixel(ctx, 20, 14, base); drawPixel(ctx, 21, 13, base); drawPixel(ctx, 22, 12, base); drawPixel(ctx, 23, 11, base);
      drawPixel(ctx, 20, 15, shadow); drawPixel(ctx, 21, 14, shadow); drawPixel(ctx, 22, 13, shadow);
      drawPixel(ctx, 23, 10, "#F39C12" + "88");
      break;
    case "crystalwings":
      drawPixel(ctx, 3, 14, base); drawPixel(ctx, 2, 13, base); drawPixel(ctx, 1, 12, base); drawPixel(ctx, 0, 11, base);
      drawPixel(ctx, 3, 15, accent || shadow); drawPixel(ctx, 2, 14, accent || shadow);
      drawPixel(ctx, 1, 11, accent || "#AED6F1");
      drawPixel(ctx, 20, 14, base); drawPixel(ctx, 21, 13, base); drawPixel(ctx, 22, 12, base); drawPixel(ctx, 23, 11, base);
      drawPixel(ctx, 20, 15, accent || shadow); drawPixel(ctx, 21, 14, accent || shadow);
      drawPixel(ctx, 22, 11, accent || "#AED6F1");
      break;
    case "scythe":
      drawRect(ctx, 19, 6, 1, 16, accent || "#555");
      drawRect(ctx, 15, 5, 5, 1, base);
      drawRect(ctx, 14, 6, 5, 1, base);
      drawRect(ctx, 14, 7, 3, 1, shadow);
      break;
    case "angelwings":
      // Large left wing
      drawPixel(ctx, 4, 13, base); drawPixel(ctx, 3, 12, base); drawPixel(ctx, 2, 11, base);
      drawPixel(ctx, 1, 10, base); drawPixel(ctx, 0, 9, base);
      drawPixel(ctx, 4, 14, shadow); drawPixel(ctx, 3, 13, shadow);
      drawPixel(ctx, 2, 12, shadow); drawPixel(ctx, 1, 11, shadow);
      drawPixel(ctx, 0, 8, base + "66");
      // Large right wing
      drawPixel(ctx, 19, 13, base); drawPixel(ctx, 20, 12, base); drawPixel(ctx, 21, 11, base);
      drawPixel(ctx, 22, 10, base); drawPixel(ctx, 23, 9, base);
      drawPixel(ctx, 19, 14, shadow); drawPixel(ctx, 20, 13, shadow);
      drawPixel(ctx, 21, 12, shadow); drawPixel(ctx, 22, 11, shadow);
      drawPixel(ctx, 23, 8, base + "66");
      break;
    case "demontail":
      drawPixel(ctx, 11, 30, base); drawPixel(ctx, 10, 31, base);
      drawPixel(ctx, 9, 31, base); drawPixel(ctx, 8, 30, shadow);
      drawPixel(ctx, 7, 30, shadow); drawPixel(ctx, 6, 29, shadow);
      drawPixel(ctx, 5, 29, base + "88");
      break;
  }

  // Glow effect for all glowing accessories
  if (t.glow) {
    const g = (accent || base) + "33";
    if (t.type.includes("wings")) {
      drawPixel(ctx, 0, 12, g); drawPixel(ctx, 23, 12, g);
    } else {
      drawPixel(ctx, 18, 10, g); drawPixel(ctx, 20, 10, g);
    }
  }
}

// ===== MAIN RENDER FUNCTION =====
export function renderPixelAvatar(canvas, avatar) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, W, H);

  const av = { ...DEFAULT_PIXEL_AVATAR, ...avatar };
  const skin = SKIN_PALETTES[av.skinTone] || SKIN_PALETTES.sk1;

  // Check if accessory is wings (draw behind)
  const accTmpl = ACCESSORIES[av.accessory];
  const isWings = accTmpl && ACC_TEMPLATES[accTmpl.template] &&
    ["firewings", "crystalwings", "angelwings"].includes(ACC_TEMPLATES[accTmpl.template].type);

  if (isWings) drawAccessory(ctx, av.accessory);
  drawBody(ctx, skin);
  drawBottom(ctx, av.bottom);
  drawShoes(ctx, av.shoes);
  drawTop(ctx, av.top);
  drawFace(ctx, av.face, skin);
  drawHair(ctx, av.hair, av.hairColor);
  drawHat(ctx, av.hat);
  if (!isWings) drawAccessory(ctx, av.accessory);
}

// ===== REACT COMPONENT =====
export default function PixelAvatar({ avatar, size = 96, animate = false, style = {}, className = "" }) {
  const canvasRef = useRef(null);
  const av = useMemo(() => ({ ...DEFAULT_PIXEL_AVATAR, ...avatar }), [
    avatar?.skinTone, avatar?.hair, avatar?.hairColor, avatar?.face,
    avatar?.top, avatar?.bottom, avatar?.shoes, avatar?.hat, avatar?.accessory,
  ]);

  useEffect(() => {
    if (canvasRef.current) renderPixelAvatar(canvasRef.current, av);
  }, [av]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      className={className}
      style={{
        width: size,
        height: size * (H / W),
        imageRendering: "pixelated",
        display: "block",
        margin: "0 auto",
        ...(animate ? { animation: "pixelBob 2s ease-in-out infinite" } : {}),
        ...style,
      }}
    />
  );
}
