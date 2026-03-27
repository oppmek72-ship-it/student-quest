// ===== Template-based Item System =====
// 25 templates × 8 color schemes = 200 items per category

export const COLOR_SCHEMES = [
  { key: "wh", name: "ຂາວ", base: "#ECF0F1", shadow: "#BDC3C7", accent: "#95A5A6", highlight: "#FFFFFF" },
  { key: "bl", name: "ຟ້າ", base: "#3498DB", shadow: "#2471A3", accent: "#AED6F1", highlight: "#85C1E9" },
  { key: "rd", name: "ແດງ", base: "#E74C3C", shadow: "#C0392B", accent: "#F1948A", highlight: "#FADBD8" },
  { key: "gn", name: "ຂຽວ", base: "#27AE60", shadow: "#1E8449", accent: "#82E0AA", highlight: "#ABEBC6" },
  { key: "pr", name: "ມ່ວງ", base: "#8E44AD", shadow: "#6C3483", accent: "#C39BD3", highlight: "#D7BDE2" },
  { key: "gd", name: "ທອງ", base: "#F1C40F", shadow: "#D4AC0D", accent: "#F9E547", highlight: "#FEF9E7" },
  { key: "bk", name: "ດຳ", base: "#2C3E50", shadow: "#1A252F", accent: "#5D6D7E", highlight: "#85929E" },
  { key: "pk", name: "ບົວ", base: "#E91E63", shadow: "#C2185B", accent: "#F48FB1", highlight: "#F8BBD0" },
];

function getRarity(t) {
  if (t < 8) return "common";
  if (t < 16) return "rare";
  if (t < 22) return "epic";
  return "legendary";
}

const COLOR_COST_MOD = [0, 0, 2, 2, 3, 5, 3, 3];

// ======== TOP TEMPLATES (25) ========
export const TOP_TEMPLATES = [
  { name: "ເສື້ອຢືດ", collar: "round", sleeves: "short", baseCost: 0 },
  { name: "ຊຸດນັກຮຽນ", collar: "round", sleeves: "short", emblem: "tie", baseCost: 5 },
  { name: "ເສື້ອໂປໂລ", collar: "v", sleeves: "short", buttons: true, baseCost: 8 },
  { name: "ເສື້ອກ້າມ", collar: null, sleeves: null, baseCost: 3 },
  { name: "ເສື້ອແຂນຍາວ", collar: "round", sleeves: "long", baseCost: 10 },
  { name: "ເສື້ອຮູດ", collar: "round", sleeves: "short", hood: true, baseCost: 12 },
  { name: "ແຈັກເກັດ", collar: "v", sleeves: "short", openFront: true, baseCost: 15 },
  { name: "ເສື້ອກັ໊ກ", collar: "v", sleeves: null, belt: true, baseCost: 18 },
  { name: "ຊຸດເກາະ", collar: "high", sleeves: "armored", shoulders: true, emblem: "cross", baseCost: 25 },
  { name: "ຊຸດນິນຈາ", collar: "high", sleeves: "short", belt: true, baseCost: 28 },
  { name: "ເສື້ອກະສັດ", collar: "round", sleeves: "short", trim: true, emblem: "cross", baseCost: 35 },
  { name: "ເສື້ອແລັບ", collar: "round", sleeves: "long", extend: 3, baseCost: 30 },
  { name: "ຊຸດກະລາສີ", collar: "wide", sleeves: "short", pattern: "stripes", baseCost: 32 },
  { name: "ຊຸດທັກຊີໂດ", collar: "v", sleeves: "long", emblem: "tie", baseCost: 40 },
  { name: "ເສື້ອເກາະໂສ້", collar: "high", sleeves: "short", pattern: "chainmail", baseCost: 45 },
  { name: "ເສື້ອເຣນເຈີ", collar: "round", sleeves: null, belt: true, pattern: "pockets", baseCost: 50 },
  { name: "ຊຸດເກັດມັງກອນ", collar: "high", sleeves: "armored", pattern: "scales", shoulders: true, baseCost: 75 },
  { name: "ຊຸດນັກເວດ", collar: "round", sleeves: "long", extend: 4, pattern: "stars", baseCost: 80 },
  { name: "ຊຸດເກາະສົງຄາມ", collar: "high", sleeves: "armored", shoulders: true, belt: true, emblem: "diamond", baseCost: 100 },
  { name: "ຊຸດວິນຍານ", collar: null, sleeves: "long", pattern: "stripes", glow: true, baseCost: 90 },
  { name: "ຊຸດນົກຟີນິກ", collar: "high", sleeves: "short", trim: true, cape: true, baseCost: 120 },
  { name: "ຊຸດຄຣິສຕັນ", collar: "high", sleeves: "armored", emblem: "diamond", glow: true, baseCost: 130 },
  { name: "ຊຸດເງົາມືດ", collar: "high", sleeves: "long", extend: 5, cape: true, glow: true, baseCost: 250 },
  { name: "ຊຸດສະຫວັນ", collar: "round", sleeves: "long", extend: 4, pattern: "stars", trim: true, glow: true, baseCost: 350 },
  { name: "ຊຸດປີສາດ", collar: "high", sleeves: "armored", shoulders: true, pattern: "scales", emblem: "diamond", glow: true, cape: true, baseCost: 500 },
];

// ======== BOTTOM TEMPLATES (25) ========
export const BOTTOM_TEMPLATES = [
  { name: "ໂສ້ງຂາຍາວ", type: "pants", baseCost: 0 },
  { name: "ໂສ້ງຂາສັ້ນ", type: "shorts", baseCost: 3 },
  { name: "ກະໂປງ", type: "skirt", baseCost: 5 },
  { name: "ກາງເກງກິລາ", type: "pants", stripe: true, baseCost: 8 },
  { name: "ໂສ້ງຜ້າ", type: "pants", cuffs: true, baseCost: 6 },
  { name: "ໂສ້ງຍີນ", type: "pants", stitching: true, baseCost: 10 },
  { name: "ກະໂປງສັ້ນ", type: "miniskirt", baseCost: 8 },
  { name: "ໂສ້ງກ້ວາງ", type: "wide", baseCost: 12 },
  { name: "ໂສ້ງທະຫານ", type: "pants", belt: true, pattern: "camo", baseCost: 25 },
  { name: "ໂສ້ງນິນຈາ", type: "pants", belt: true, tight: true, baseCost: 28 },
  { name: "ໂສ້ງກະສັດ", type: "pants", trim: true, baseCost: 35 },
  { name: "ໂສ້ງແລັບ", type: "pants", stripe: true, clean: true, baseCost: 30 },
  { name: "ກະໂປງຍາວ", type: "longskirt", baseCost: 32 },
  { name: "ໂສ້ງທັກຊີໂດ", type: "pants", stripe: true, formal: true, baseCost: 40 },
  { name: "ໂສ້ງເກາະ", type: "pants", armor: true, baseCost: 45 },
  { name: "ໂສ້ງເຣນເຈີ", type: "pants", belt: true, pockets: true, baseCost: 50 },
  { name: "ໂສ້ງເກັດມັງກອນ", type: "pants", pattern: "scales", armor: true, baseCost: 75 },
  { name: "ໂສ້ງນັກເວດ", type: "robe", pattern: "stars", baseCost: 80 },
  { name: "ໂສ້ງສົງຄາມ", type: "pants", armor: true, belt: true, trim: true, baseCost: 100 },
  { name: "ໂສ້ງວິນຍານ", type: "pants", glow: true, ethereal: true, baseCost: 90 },
  { name: "ກະໂປງນົກຟີນິກ", type: "longskirt", trim: true, glow: true, baseCost: 120 },
  { name: "ໂສ້ງຄຣິສຕັນ", type: "pants", pattern: "crystal", glow: true, baseCost: 130 },
  { name: "ໂສ້ງເງົາມືດ", type: "pants", glow: true, pattern: "shadow", baseCost: 250 },
  { name: "ໂສ້ງສະຫວັນ", type: "robe", pattern: "stars", trim: true, glow: true, baseCost: 350 },
  { name: "ໂສ້ງປີສາດ", type: "pants", armor: true, pattern: "scales", glow: true, trim: true, baseCost: 500 },
];

// ======== SHOE TEMPLATES (25) ========
export const SHOE_TEMPLATES = [
  { name: "ເກີບຜ້າ", type: "low", baseCost: 0 },
  { name: "ເກີບກິລາ", type: "low", stripe: true, baseCost: 5 },
  { name: "ເກີບໜັງ", type: "low", buckle: true, baseCost: 8 },
  { name: "ເກີບແຕະ", type: "sandal", baseCost: 3 },
  { name: "ເກີບແລ່ນ", type: "low", stripe: true, thick: true, baseCost: 10 },
  { name: "ເກີບສູງ", type: "mid", baseCost: 12 },
  { name: "ເກີບບູດ", type: "high", baseCost: 15 },
  { name: "ເກີບແຟຊັ່ນ", type: "low", platform: true, baseCost: 18 },
  { name: "ເກີບເກາະ", type: "high", armor: true, baseCost: 25 },
  { name: "ເກີບນິນຈາ", type: "mid", wrap: true, baseCost: 28 },
  { name: "ເກີບກະສັດ", type: "mid", trim: true, buckle: true, baseCost: 35 },
  { name: "ເກີບແລັບ", type: "low", clean: true, baseCost: 30 },
  { name: "ເກີບກະລາສີ", type: "mid", stripe: true, baseCost: 32 },
  { name: "ເກີບທາງການ", type: "low", shiny: true, baseCost: 40 },
  { name: "ເກີບໂສ້", type: "high", chain: true, baseCost: 45 },
  { name: "ເກີບເຣນເຈີ", type: "high", rugged: true, baseCost: 50 },
  { name: "ເກີບມັງກອນ", type: "high", spikes: true, baseCost: 75 },
  { name: "ເກີບນັກເວດ", type: "mid", glow: true, curl: true, baseCost: 80 },
  { name: "ເກີບສົງຄາມ", type: "high", armor: true, spikes: true, baseCost: 100 },
  { name: "ເກີບວິນຍານ", type: "mid", glow: true, ethereal: true, baseCost: 90 },
  { name: "ເກີບໄຟ", type: "mid", glow: true, flame: true, baseCost: 120 },
  { name: "ເກີບຄຣິສຕັນ", type: "mid", glow: true, crystal: true, baseCost: 130 },
  { name: "ເກີບເງົາ", type: "high", glow: true, shadow: true, baseCost: 250 },
  { name: "ເກີບສະຫວັນ", type: "mid", glow: true, wings: true, baseCost: 350 },
  { name: "ເກີບປີສາດ", type: "high", glow: true, spikes: true, flame: true, baseCost: 500 },
];

// ======== HAT TEMPLATES (25) ========
export const HAT_TEMPLATES = [
  { name: "ບໍ່ໃສ່", type: "none", baseCost: 0 },
  { name: "ໝວກແກ໊ບ", type: "cap", baseCost: 8 },
  { name: "ໝວກປີກ", type: "beret", baseCost: 10 },
  { name: "ໂບ", type: "bow", baseCost: 5 },
  { name: "ຜ້າອ້ອມ", type: "bandana", baseCost: 8 },
  { name: "ໝວກສູງ", type: "tophat", baseCost: 15 },
  { name: "ໝວກກັນກະທົບ", type: "helmet", baseCost: 18 },
  { name: "ຜ້າອັດ", type: "headband", baseCost: 12 },
  { name: "ໝວກເກາະ", type: "armorhelm", baseCost: 25 },
  { name: "ໝວກນິນຈາ", type: "ninjaband", ornament: "symbol", baseCost: 28 },
  { name: "ມົງກຸດ", type: "crown", baseCost: 35 },
  { name: "ໝວກແລັບ", type: "cap", clean: true, baseCost: 30 },
  { name: "ໝວກກະລາສີ", type: "sailorhat", baseCost: 32 },
  { name: "ໝວກສູງພິເສດ", type: "tophat", tall: true, ornament: "feather", baseCost: 40 },
  { name: "ໝວກໂສ້", type: "chainhelm", baseCost: 45 },
  { name: "ໝວກເຣນເຈີ", type: "rangerhat", baseCost: 50 },
  { name: "ເຂົາມັງກອນ", type: "horns", baseCost: 75 },
  { name: "ໝວກເວດ", type: "wizard", ornament: "star", baseCost: 80 },
  { name: "ໝວກສົງຄາມ", type: "warhelm", baseCost: 100 },
  { name: "ວົງຫົວວິນຍານ", type: "halo", glow: true, baseCost: 90 },
  { name: "ມົງກຸດໄຟ", type: "crown", glow: true, flame: true, baseCost: 120 },
  { name: "ມົງກຸດຄຣິສຕັນ", type: "crown", glow: true, crystal: true, baseCost: 130 },
  { name: "ໝວກເງົາ", type: "hood", glow: true, baseCost: 250 },
  { name: "ວົງແສງສະຫວັນ", type: "halo", glow: true, radiant: true, baseCost: 350 },
  { name: "ເຂົາປີສາດ", type: "demonhorns", glow: true, baseCost: 500 },
];

// ======== ACCESSORY TEMPLATES (25) ========
export const ACC_TEMPLATES = [
  { name: "ບໍ່ໃສ່", type: "none", baseCost: 0 },
  { name: "ດາບ", type: "sword", baseCost: 10 },
  { name: "ໄມ້ຄ້ອນ", type: "hammer", baseCost: 12 },
  { name: "ໄລ້", type: "shield", baseCost: 10 },
  { name: "ປື້ມ", type: "book", baseCost: 5 },
  { name: "ທະນູ", type: "bow_weapon", baseCost: 15 },
  { name: "ໄມ້ເທົ້າ", type: "staff", baseCost: 12 },
  { name: "ກະເປົາ", type: "backpack", baseCost: 8 },
  { name: "ດາບເກາະ", type: "greatsword", baseCost: 25 },
  { name: "ຊູຣິເກນ", type: "shuriken", baseCost: 28 },
  { name: "ຄະທາ", type: "scepter", baseCost: 35 },
  { name: "ກ້ອງ", type: "telescope", baseCost: 30 },
  { name: "ສະມໍ", type: "anchor", baseCost: 32 },
  { name: "ໄມ້ຄ້ອນໃຫຍ່", type: "warhammer", baseCost: 40 },
  { name: "ໂສ້ຮົບ", type: "chain", baseCost: 45 },
  { name: "ມີດສອງໃບ", type: "dual", baseCost: 50 },
  { name: "ຂວານມັງກອນ", type: "dragonaxe", baseCost: 75 },
  { name: "ໄມ້ເທົ້າເວດ", type: "magicstaff", glow: true, baseCost: 80 },
  { name: "ດາບສົງຄາມ", type: "warsword", baseCost: 100 },
  { name: "ລູກແກ້ວ", type: "orb", glow: true, baseCost: 90 },
  { name: "ປີກໄຟ", type: "firewings", glow: true, baseCost: 120 },
  { name: "ປີກຄຣິສຕັນ", type: "crystalwings", glow: true, baseCost: 130 },
  { name: "ກ່ຽວເງົາ", type: "scythe", glow: true, baseCost: 250 },
  { name: "ປີກສະຫວັນ", type: "angelwings", glow: true, baseCost: 350 },
  { name: "ຫາງປີສາດ", type: "demontail", glow: true, baseCost: 500 },
];

// ======== STAT PROFILES ========
const STAT_PROFILES = {
  top: { common: { hp: 5, def: 1, mdef: 1 }, rare: { hp: 8, def: 3, mdef: 2, atk: 1 }, epic: { hp: 12, def: 5, mdef: 4, atk: 2, matk: 2 }, legendary: { hp: 20, def: 8, mdef: 6, atk: 4, matk: 4 } },
  bottom: { common: { hp: 3, def: 1 }, rare: { hp: 5, def: 3, atk: 1 }, epic: { hp: 8, def: 5, mdef: 2 }, legendary: { hp: 14, def: 6, mdef: 4, atk: 2 } },
  shoes: { common: { hp: 2, def: 1 }, rare: { hp: 4, def: 2, atk: 1 }, epic: { hp: 6, def: 3, mdef: 2, matk: 1 }, legendary: { hp: 10, def: 4, mdef: 3, atk: 2, matk: 2 } },
  hat: { common: { hp: 3, mdef: 1 }, rare: { hp: 6, mdef: 3, matk: 1 }, epic: { hp: 10, mdef: 5, matk: 3, def: 2 }, legendary: { hp: 16, mdef: 8, matk: 5, atk: 3 } },
  accessory: { common: { atk: 2, matk: 1 }, rare: { atk: 4, matk: 2, def: 1 }, epic: { atk: 6, matk: 4, hp: 4 }, legendary: { atk: 10, matk: 8, hp: 8, def: 2 } },
};

function getItemStats(category, templateIdx, colorIdx) {
  const rarity = getRarity(templateIdx);
  const profile = STAT_PROFILES[category][rarity];
  const tierStart = templateIdx < 8 ? 0 : templateIdx < 16 ? 8 : templateIdx < 22 ? 16 : 22;
  const bonus = (templateIdx - tierStart) / (templateIdx < 8 ? 8 : templateIdx < 16 ? 8 : templateIdx < 22 ? 6 : 3);
  const stats = {};
  for (const [stat, val] of Object.entries(profile)) {
    stats[stat] = Math.round(val * (1 + bonus * 0.3));
  }
  if (colorIdx === 5) stats.matk = (stats.matk || 0) + 1;
  if (colorIdx === 6) stats.atk = (stats.atk || 0) + 1;
  return stats;
}

// ======== GENERATION ========
function generateItems(prefix, templates, category) {
  const items = {};
  let idx = 0;
  for (let t = 0; t < templates.length; t++) {
    const tmpl = templates[t];
    const rarity = getRarity(t);
    for (let c = 0; c < 8; c++) {
      const cs = COLOR_SCHEMES[c];
      const id = `${prefix}${idx}`;
      if (tmpl.type === "none") {
        if (c === 0) {
          items[id] = { name: tmpl.name, cost: 0, rarity: "common", template: t, base: "transparent", shadow: "transparent", accent: "transparent", highlight: "transparent", stats: {} };
          idx++;
        }
        continue;
      }
      const cost = Math.round(tmpl.baseCost + tmpl.baseCost * COLOR_COST_MOD[c] * 0.1);
      items[id] = { name: `${tmpl.name} ${cs.name}`, cost, rarity, template: t, base: cs.base, shadow: cs.shadow, accent: cs.accent, highlight: cs.highlight, stats: getItemStats(category, t, c) };
      idx++;
    }
  }
  return items;
}

export const TOPS_ALL = generateItems("tp", TOP_TEMPLATES, "top");
export const BOTTOMS_ALL = generateItems("bt", BOTTOM_TEMPLATES, "bottom");
export const SHOES_ALL = generateItems("sh", SHOE_TEMPLATES, "shoes");
export const HATS_ALL = generateItems("ht", HAT_TEMPLATES, "hat");
export const ACCESSORIES_ALL = generateItems("ac", ACC_TEMPLATES, "accessory");
