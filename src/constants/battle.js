// ===== Colosseum Battle Arena Constants =====

// --- Base stats at level 1 ---
export const BASE_STATS = { hp: 50, atk: 5, def: 3, matk: 5, mdef: 3 };
export const STAT_PER_LEVEL = { hp: 8, atk: 1, def: 1, matk: 1, mdef: 1 };
export const XP_PER_LEVEL = 100;
export const MAX_LEVEL = 30;

// --- Battle rewards ---
export const BATTLE_XP_WIN = 25;
export const BATTLE_XP_LOSE = 10;
export const RATING_WIN = 15;
export const RATING_LOSE = 10;

// --- Equipment → Combat Stats ---
// Auto-generated from item templates — each item has stats baked in
import { TOPS_ALL, BOTTOMS_ALL, SHOES_ALL, HATS_ALL, ACCESSORIES_ALL } from "./itemTemplates";

function buildEquipmentStats() {
  const stats = {};
  const allItems = { ...TOPS_ALL, ...BOTTOMS_ALL, ...SHOES_ALL, ...HATS_ALL, ...ACCESSORIES_ALL };
  for (const [id, item] of Object.entries(allItems)) {
    stats[id] = item.stats || {};
  }
  return stats;
}

export const EQUIPMENT_STATS = buildEquipmentStats();

// --- Pet Abilities ---
export const PET_ABILITIES = {
  // Common
  p1:  { name: "ກັດ", type: "physical", basePower: 8, emoji: "🦷", desc: "ໝາກັດສັດຕູ" },
  p2:  { name: "ຂ່ວນ", type: "physical", basePower: 7, emoji: "🐾", desc: "ແມວຂ່ວນສັດຕູ" },
  p3:  { name: "ຟື້ນໄວ", type: "heal", basePower: 10, emoji: "💚", desc: "ກະຕ່າຍຮັກສາ HP" },
  p4:  { name: "ກຳລັງໃຈ", type: "buff_atk", basePower: 3, emoji: "💪", desc: "ໜູເພີ່ມ ATK" },
  p5:  { name: "ລົມແຮງ", type: "magic", basePower: 8, emoji: "🌪️", desc: "ນົກໂຈມຕີເວດ" },
  p16: { name: "ປີກຕົບ", type: "physical", basePower: 6, emoji: "💨", desc: "ເປັດຕົບປີກ" },
  p17: { name: "ແທະ", type: "physical", basePower: 5, emoji: "🦷", desc: "ໜູແທະສັດຕູ" },
  p18: { name: "ໜາມ", type: "buff_def", basePower: 3, emoji: "🛡️", desc: "ເມັ່ນພຸ່ງໜາມ" },
  p19: { name: "ນຳໂຊກ", type: "heal", basePower: 8, emoji: "🌸", desc: "ນົກຮຸ້ງນຳໂຊກ" },
  p20: { name: "ນອນໃສ່", type: "buff_def", basePower: 2, emoji: "☁️", desc: "ແກະປ້ອງກັນ" },
  // Uncommon
  p6:  { name: "ກັນ", type: "buff_def", basePower: 4, emoji: "🛡️", desc: "ເຕົ່າເພີ່ມ DEF" },
  p7:  { name: "ພິດ", type: "magic", basePower: 12, emoji: "☠️", desc: "ກົບໂຈມຕີພິດ" },
  p8:  { name: "ກຳລັງ", type: "heal", basePower: 15, emoji: "❤️‍🩹", desc: "ໝູຮັກສາ HP" },
  p21: { name: "ກັດຫອຍ", type: "physical", basePower: 11, emoji: "🦷", desc: "ນາກນ້ຳກັດແຮງ" },
  p22: { name: "ລັກຂອງ", type: "buff_atk", basePower: 4, emoji: "✋", desc: "ແຣັກຄູນລັກ ATK" },
  p23: { name: "ຫາງຟາດ", type: "physical", basePower: 10, emoji: "💥", desc: "ຈີ້ງຈົກຟາດຫາງ" },
  p24: { name: "ສາຍຕາຄົມ", type: "magic", basePower: 13, emoji: "👁️", desc: "ນົກຮູ້ໂຈມຕີເວດ" },
  p25: { name: "ຝຸ່ນເວດ", type: "magic", basePower: 11, emoji: "✨", desc: "ແມງກະເບື້ອໂປ່ຍຝຸ່ນ" },
  // Rare
  p9:  { name: "ຢຽບ", type: "physical", basePower: 18, emoji: "🦶", desc: "ຊ້າງຢຽບສັດຕູ" },
  p10: { name: "ຄຳລາມ", type: "buff_atk", basePower: 6, emoji: "🔥", desc: "ສິງໂຕເພີ່ມ ATK ແຮງ" },
  p11: { name: "ເລັບຄົມ", type: "physical", basePower: 20, emoji: "⚡", desc: "ເສືອຕະປົບ" },
  p26: { name: "ຮ້ອງຫອນ", type: "buff_atk", basePower: 7, emoji: "🌙", desc: "ໝາປ່າຮ້ອງເພີ່ມ ATK" },
  p27: { name: "ຊົນ", type: "physical", basePower: 22, emoji: "💥", desc: "ແຮດຊົນແຮງ" },
  p28: { name: "ຢຽບດິນ", type: "physical", basePower: 19, emoji: "🌍", desc: "ງົວກະທິງຢຽບ" },
  p29: { name: "ກັດຈົມ", type: "physical", basePower: 21, emoji: "🦈", desc: "ເຫຍີ່ຍວກັດ" },
  p30: { name: "ໂຈມຕີຈາກຟ້າ", type: "magic", basePower: 18, emoji: "🌪️", desc: "ນົກອິນຊີໂຈມຕີ" },
  // Epic
  p12: { name: "ພົ່ນໄຟ", type: "magic", basePower: 28, emoji: "🔥", desc: "ມັງກອນພົ່ນໄຟ" },
  p13: { name: "ແສງສະຫວ່າງ", type: "heal", basePower: 25, emoji: "✨", desc: "ຟີນິກຟື້ນ HP" },
  p31: { name: "ປີກພະລັງ", type: "magic", basePower: 26, emoji: "🦅", desc: "ກຣິຟຟິນໂຈມຕີ" },
  p32: { name: "ເລືອດເຢັນ", type: "physical", basePower: 27, emoji: "🖤", desc: "ເສືອດຳຕະປົບ" },
  p33: { name: "ຄື້ນຍັກ", type: "magic", basePower: 30, emoji: "🌊", desc: "ປາວານພົ່ນນ້ຳ" },
  p34: { name: "ຟັນໄຟ", type: "magic", basePower: 29, emoji: "🔱", desc: "ເຫຍີ່ຍວໄຟກັດ" },
  p35: { name: "ຮ້ອງນ້ຳກ້ອນ", type: "magic", basePower: 26, emoji: "❄️", desc: "ໝາປ່າເຜືອກແຊ່ນ້ຳກ້ອນ" },
  p36: { name: "ພິດຮ້າຍ", type: "magic", basePower: 32, emoji: "☠️", desc: "ງູຈົງອາງພົ່ນພິດ" },
  // Legendary
  p14: { name: "ແສງຮຸ້ງ", type: "ultimate", basePower: 35, emoji: "🌈", desc: "ຢູນິຄອນປ່ອຍພະລັງ" },
  p15: { name: "ນ້ຳທ່ວມ", type: "ultimate", basePower: 38, emoji: "🌊", desc: "ນາກາປ່ອຍນ້ຳ" },
  p37: { name: "ໄຟມືດ", type: "ultimate", basePower: 40, emoji: "🖤", desc: "ມັງກອນດຳພົ່ນໄຟມືດ" },
  p38: { name: "ຮຸ້ງເວດ", type: "heal", basePower: 35, emoji: "🌈", desc: "ກິເລນຟື້ນຟູທັງໝົດ" },
  p39: { name: "ພະຍຸນ້ຳກ້ອນ", type: "ultimate", basePower: 42, emoji: "❄️", desc: "ຟີນິກນ້ຳກ້ອນແຊ່ແຂງ" },
  p40: { name: "ສາຍຟ້າ", type: "ultimate", basePower: 44, emoji: "⚡", desc: "ເທບພະຍາຟ້າຜ່າ" },
  p41: { name: "ກົ້ນທະເລ", type: "ultimate", basePower: 41, emoji: "🌊", desc: "ຄຣາເຄັ່ນດຶງລົງ" },
  p42: { name: "ແສງສະຫວັນ", type: "heal", basePower: 38, emoji: "👼", desc: "ເທວະດາຮັກສາ" },
  p43: { name: "ແຜ່ນດິນໄຫວ", type: "ultimate", basePower: 43, emoji: "🗿", desc: "ໂກເລັມທຸບພື້ນ" },
  p44: { name: "ໄຟວິນຍານ", type: "ultimate", basePower: 45, emoji: "🦊", desc: "ຈິ້ງຈອກ 9 ຫາງປ່ອຍໄຟ" },
  p45: { name: "ລາວາລະເບີດ", type: "ultimate", basePower: 48, emoji: "🌋", desc: "ລາວາໄທທັນລະເບີດ" },
};

export function getPetAbilityPower(petId, stars) {
  const a = PET_ABILITIES[petId];
  if (!a) return 0;
  return Math.round(a.basePower * (1 + (stars - 1) * 0.15));
}

// --- Battle Skills (purchasable) ---
export const BATTLE_SKILLS = [
  // Free starters
  { id: "sk_punch", name: "ຕີ", type: "physical", power: 10, cost: 0, emoji: "👊", desc: "ໂຈມຕີທຳມະດາ" },
  { id: "sk_guard", name: "ກັນ", type: "defend", power: 5, cost: 0, emoji: "🛡️", desc: "ເພີ່ມ DEF 1 ຕາ" },
  // Physical
  { id: "sk_slash", name: "ຟັນ", type: "physical", power: 18, cost: 20, emoji: "⚔️", desc: "ຟັນດ້ວຍດາບ" },
  { id: "sk_smash", name: "ທຸບ", type: "physical", power: 25, cost: 35, emoji: "💥", desc: "ທຸບແຮງ" },
  { id: "sk_combo", name: "ຄອມໂບ", type: "physical", power: 15, hits: 3, cost: 50, emoji: "🥊", desc: "ຕີ 3 ທີ" },
  { id: "sk_crit", name: "ຟ້າຜ່າ", type: "physical", power: 35, cost: 60, emoji: "⚡", desc: "ໂຈມຕີວິກິດ", rarity: "rare" },
  // Magic
  { id: "sk_fire", name: "ໄຟ", type: "magic", power: 16, cost: 20, emoji: "🔥", desc: "ເວດໄຟ" },
  { id: "sk_ice", name: "ນ້ຳກ້ອນ", type: "magic", power: 14, cost: 20, emoji: "❄️", debuff: "def", debuffAmt: 2, desc: "ເວດນ້ຳກ້ອນ ຫຼຸດ DEF" },
  { id: "sk_thunder", name: "ຟ້າແມບ", type: "magic", power: 22, cost: 40, emoji: "⛈️", desc: "ເວດຟ້າແມບ" },
  { id: "sk_dark", name: "ມືດ", type: "magic", power: 30, cost: 55, emoji: "🌑", desc: "ເວດມືດ", rarity: "rare" },
  // Support
  { id: "sk_heal", name: "ຮັກສາ", type: "heal", power: 20, cost: 25, emoji: "💚", desc: "ຟື້ນຟູ HP" },
  { id: "sk_barrier", name: "ກຳແພງ", type: "buff_mdef", power: 8, cost: 30, emoji: "🔮", desc: "ເພີ່ມ MDEF" },
  // Ultimate
  { id: "sk_meteor", name: "ດາວຕົກ", type: "magic", power: 45, cost: 100, emoji: "☄️", cooldown: 3, desc: "ເວດທີ່ແຮງທີ່ສຸດ", rarity: "epic" },
  { id: "sk_berserk", name: "ບ້າເລືອດ", type: "physical", power: 50, cost: 100, emoji: "😤", cooldown: 3, selfDmg: 10, desc: "ໂຈມຕີແຮງ ເຈັບຕົນເອງ", rarity: "epic" },
];

export function getSkillById(id) {
  return BATTLE_SKILLS.find(s => s.id === id) || null;
}

// Default battle fields for new/migrated students
export const DEFAULT_BATTLE_FIELDS = {
  battleXP: 0,
  battleLevel: 1,
  arenaRating: 1000,
  arenaWins: 0,
  arenaLosses: 0,
  ownedSkills: ["sk_punch", "sk_guard"],
  equippedSkills: ["sk_punch", "sk_guard", null, null],
  battleLog: [],
};
