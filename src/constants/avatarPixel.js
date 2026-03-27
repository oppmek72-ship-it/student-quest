// ===== Pixel Art Avatar System =====
// Sprites are 24x32 pixels, drawn on canvas, scaled up with CSS pixelated
import { TOPS_ALL, BOTTOMS_ALL, SHOES_ALL, HATS_ALL, ACCESSORIES_ALL, TOP_TEMPLATES, BOTTOM_TEMPLATES, SHOE_TEMPLATES, HAT_TEMPLATES, ACC_TEMPLATES } from "./itemTemplates";

// ---- Skin Palettes ----
export const SKIN_PALETTES = {
  sk1: { base: "#FDEBD0", shadow: "#E8C9A0", highlight: "#FFF5E6", name: "ຂາວ" },
  sk2: { base: "#F5CBA7", shadow: "#D4A76A", highlight: "#FBE5CC", name: "ສົ້ມ" },
  sk3: { base: "#D4A574", shadow: "#B8895A", highlight: "#E8C9A0", name: "ນ້ຳຕານ" },
  sk4: { base: "#8D6E63", shadow: "#6D4C41", highlight: "#A1887F", name: "ເຂັ້ມ" },
  sk5: { base: "#81D4FA", shadow: "#4FC3F7", highlight: "#B3E5FC", name: "ຟ້າ", cost: 15 },
  sk6: { base: "#CE93D8", shadow: "#BA68C8", highlight: "#E1BEE7", name: "ມ່ວງ", cost: 15 },
};

// ---- Hair Colors ----
export const HAIR_COLORS = {
  hc1: { base: "#2C3E50", shadow: "#1A252F", highlight: "#3D566E", name: "ດຳ" },
  hc2: { base: "#8B4513", shadow: "#5D2E0A", highlight: "#A0622D", name: "ນ້ຳຕານ" },
  hc3: { base: "#D4A76A", shadow: "#B8895A", highlight: "#E8C88A", name: "ທອງ" },
  hc4: { base: "#C0392B", shadow: "#922B21", highlight: "#E74C3C", name: "ແດງ", cost: 10 },
  hc5: { base: "#2980B9", shadow: "#21618C", highlight: "#3498DB", name: "ຟ້າ", cost: 10 },
  hc6: { base: "#E91E8C", shadow: "#B71570", highlight: "#FF69B4", name: "ບົວ", cost: 12 },
  hc7: { base: "#27AE60", shadow: "#1E8449", highlight: "#2ECC71", name: "ຂຽວ", cost: 12 },
  hc8: { base: "#F1C40F", shadow: "#D4AC0D", highlight: "#F9E547", name: "ເຫຼືອງ", cost: 15 },
};

// ---- Hair Styles ----
export const HAIR_STYLES = {
  hr0: { name: "ລ້ຽນ", cost: 0, pixels: [] },
  hr1: {
    name: "ສັ້ນ", cost: 0,
    pixels: [{ rows: ["..bbbbbb..","bhhhhhhhhb","bhhhhhhhhbb","bbbbbbbbbbb","bs......sbb"], ox: 6, oy: 2 }],
  },
  hr2: {
    name: "ຍາວ", cost: 0,
    pixels: [{ rows: ["..bbbbbbb..","bhhhhhhhhb","bhhhhhhhhhb","bbbbbbbbbbb","bs.......sb","bs.......sb","bs.......sb","bs.......sb",".b.......b.",".b.......b.","..b.....b.."], ox: 6, oy: 2 }],
  },
  hr3: {
    name: "ບ໊ອບ", cost: 5,
    pixels: [{ rows: ["..bbbbbbb..","bhhhhhhhhb","bhhhhhhhhhb","bbbbbbbbbbb","bbs.....sbb","bbs.....sbb","bbs.....sbb",".bb.....bb."], ox: 6, oy: 2 }],
  },
  hr4: {
    name: "ຫຍິກ", cost: 8, rarity: "rare",
    pixels: [{ rows: [".bbb.bbb.b.","bhbhbhbhbhb","bhhhhhhhhbb","bbbbbbbbbbb","bhb.....bhb","bsb.....bsb","bhb.....bhb",".b.......b."], ox: 6, oy: 1 }],
  },
  hr5: {
    name: "ຫາງມ້າ", cost: 8,
    pixels: [{ rows: ["..bbbbbbb..","bhhhhhhhhb","bhhhhhhhhhb","bbbbbbbbbbb","bs......sbb","..........bb","...........b","...........b","..........b."], ox: 6, oy: 2 }],
  },
  hr6: {
    name: "ແຫຼມ", cost: 12, rarity: "rare",
    pixels: [{ rows: ["....b.b.b...","...bbbbbbb..","..bhhhhhhhb.",".bhhhhhhhhbb","bhhhhhhhhhbb","bbbbbbbbbbbb","bbs......sbb"], ox: 5, oy: 0 }],
  },
  hr7: {
    name: "ສອງຫາງ", cost: 10, rarity: "rare",
    pixels: [{ rows: ["..bbbbbbb..","bhhhhhhhhb","bhhhhhhhhhb","bbbbbbbbbbb","bbs.....sbb","bb.......bb","bs.......sb","b.........b","b.........b"], ox: 6, oy: 2 }],
  },
};

// ---- Face Expressions ----
export const FACES = {
  fc1: { name: "ຍິ້ມ", cost: 0, eyes: "round", mouth: "smile", blush: true },
  fc2: { name: "ຕື່ນເຕັ້ນ", cost: 0, eyes: "big", mouth: "open", blush: true },
  fc3: { name: "ເທ່", cost: 0, eyes: "line", mouth: "flat", blush: false },
  fc4: { name: "ງ້ວງ", cost: 5, eyes: "closed", mouth: "smile", blush: true },
  fc5: { name: "ເກັ່ງ", cost: 8, eyes: "angry", mouth: "grin", blush: false },
  fc6: { name: "ຕາດາວ", cost: 15, eyes: "star", mouth: "smile", blush: true, rarity: "epic" },
};

// ---- Use generated items from templates ----
export const TOPS = TOPS_ALL;
export const BOTTOMS = BOTTOMS_ALL;
export const SHOES = SHOES_ALL;
export const HATS = HATS_ALL;
export const ACCESSORIES = ACCESSORIES_ALL;

// Re-export templates for draw functions
export { TOP_TEMPLATES, BOTTOM_TEMPLATES, SHOE_TEMPLATES, HAT_TEMPLATES, ACC_TEMPLATES };

// ---- Category definitions for AvatarPage ----
function makeItems(obj) {
  return Object.entries(obj).map(([id, v]) => ({
    id, name: v.name, cost: v.cost || 0, color: v.base, rarity: v.rarity,
  }));
}

export const PIXEL_CATEGORIES = [
  { key: "skinTone", label: "ສີຜິວ", emoji: "🧑", items: Object.entries(SKIN_PALETTES).map(([id, v]) => ({ id, name: v.name, cost: v.cost || 0, color: v.base })) },
  { key: "hair", label: "ຜົມ", emoji: "💇", items: Object.entries(HAIR_STYLES).map(([id, v]) => ({ id, name: v.name, cost: v.cost || 0, rarity: v.rarity })) },
  { key: "hairColor", label: "ສີຜົມ", emoji: "🎨", items: Object.entries(HAIR_COLORS).map(([id, v]) => ({ id, name: v.name, cost: v.cost || 0, color: v.base })) },
  { key: "face", label: "ໜ້າ", emoji: "😊", items: Object.entries(FACES).map(([id, v]) => ({ id, name: v.name, cost: v.cost || 0, rarity: v.rarity })) },
  { key: "top", label: "ເສື້ອ", emoji: "👕", items: makeItems(TOPS) },
  { key: "bottom", label: "ໂສ້ງ", emoji: "👖", items: makeItems(BOTTOMS) },
  { key: "shoes", label: "ເກີບ", emoji: "👟", items: makeItems(SHOES) },
  { key: "hat", label: "ໝວກ", emoji: "🎩", items: makeItems(HATS) },
  { key: "accessory", label: "ອຸປະກອນ", emoji: "⚔️", items: makeItems(ACCESSORIES) },
];

export const DEFAULT_PIXEL_AVATAR = {
  skinTone: "sk1",
  hair: "hr1",
  hairColor: "hc1",
  face: "fc1",
  top: "tp0",
  bottom: "bt0",
  shoes: "sh0",
  hat: "ht0",
  accessory: "ac0",
};

export const FREE_PIXEL_ITEMS = [
  "sk1","sk2","sk3","sk4",
  "hr0","hr1","hr2",
  "hc1","hc2","hc3",
  "fc1","fc2","fc3",
  "tp0","tp1",
  "bt0","bt1",
  "sh0",
  "ht0",
  "ac0",
];

export function findPixelItem(itemId) {
  for (const cat of PIXEL_CATEGORIES) {
    const item = cat.items.find(i => i.id === itemId);
    if (item) return item;
  }
  return null;
}
