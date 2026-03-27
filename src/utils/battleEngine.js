import { PETS } from "../constants/pets";
import {
  BASE_STATS, STAT_PER_LEVEL, EQUIPMENT_STATS,
  PET_ABILITIES, getPetAbilityPower, getSkillById,
} from "../constants/battle";

// Compute total fighter stats from student data
export function computeFighterStats(student) {
  const lv = student.battleLevel || 1;
  const stats = {
    hp: BASE_STATS.hp + (lv - 1) * STAT_PER_LEVEL.hp,
    atk: BASE_STATS.atk + (lv - 1) * STAT_PER_LEVEL.atk,
    def: BASE_STATS.def + (lv - 1) * STAT_PER_LEVEL.def,
    matk: BASE_STATS.matk + (lv - 1) * STAT_PER_LEVEL.matk,
    mdef: BASE_STATS.mdef + (lv - 1) * STAT_PER_LEVEL.mdef,
  };

  // Add equipment stats
  const av = student.avatar || {};
  for (const slot of ["top", "bottom", "shoes", "hat", "accessory"]) {
    const itemId = av[slot];
    const eq = EQUIPMENT_STATS[itemId];
    if (eq) {
      for (const [k, v] of Object.entries(eq)) {
        stats[k] = (stats[k] || 0) + v;
      }
    }
  }

  // Pet info
  let pet = null;
  if (student.activePetIndex >= 0 && student.pets?.[student.activePetIndex]) {
    const ref = student.pets[student.activePetIndex];
    const def = PETS.find(p => p.id === ref.id);
    const ability = PET_ABILITIES[ref.id];
    if (def && ability) {
      pet = {
        ...def,
        stars: ref.stars,
        ability,
        power: getPetAbilityPower(ref.id, ref.stars),
      };
    }
  }

  // Skills
  const skills = (student.equippedSkills || [])
    .filter(Boolean)
    .map(id => getSkillById(id))
    .filter(Boolean);

  if (skills.length === 0) {
    skills.push(getSkillById("sk_punch"));
  }

  return {
    id: student.id,
    name: student.name,
    avatar: student.avatar,
    level: lv,
    stats: { ...stats, maxHp: stats.hp },
    pet,
    skills,
  };
}

// AI skill selection
function aiPickSkill(fighter, turn) {
  const { stats, skills } = fighter;
  const hpRatio = stats.hp / stats.maxHp;

  // Heal if low HP
  if (hpRatio < 0.3) {
    const healSkill = skills.find(s => s.type === "heal");
    if (healSkill) return healSkill;
  }

  // Use ultimate if available (cooldown check simplified)
  if (turn >= 4) {
    const ult = skills.find(s => s.cooldown);
    if (ult && Math.random() < 0.4) return ult;
  }

  // Random from available skills
  const attackSkills = skills.filter(s => s.type !== "heal" || hpRatio < 0.5);
  return attackSkills[Math.floor(Math.random() * attackSkills.length)] || skills[0];
}

// Apply a single skill action
function applySkill(attacker, defender, skill) {
  const variance = 0.85 + Math.random() * 0.3;
  let dmg = 0;
  let heal = 0;
  let buff = null;
  let selfDmg = 0;

  switch (skill.type) {
    case "physical": {
      const base = skill.hits
        ? skill.power * skill.hits
        : skill.power;
      dmg = Math.max(1, Math.round((base + attacker.stats.atk - defender.stats.def * 0.5) * variance));
      if (skill.selfDmg) selfDmg = skill.selfDmg;
      break;
    }
    case "magic": {
      dmg = Math.max(1, Math.round((skill.power + attacker.stats.matk - defender.stats.mdef * 0.5) * variance));
      if (skill.debuff === "def") {
        defender.stats.def = Math.max(0, defender.stats.def - (skill.debuffAmt || 2));
        buff = { target: "enemy", stat: "DEF", amount: -(skill.debuffAmt || 2) };
      }
      break;
    }
    case "heal": {
      heal = Math.round((skill.power + attacker.stats.matk * 0.3) * variance);
      attacker.stats.hp = Math.min(attacker.stats.maxHp, attacker.stats.hp + heal);
      break;
    }
    case "defend": {
      attacker.stats.def += skill.power;
      buff = { target: "self", stat: "DEF", amount: skill.power };
      break;
    }
    case "buff_mdef": {
      attacker.stats.mdef += skill.power;
      buff = { target: "self", stat: "MDEF", amount: skill.power };
      break;
    }
  }

  if (dmg > 0) {
    defender.stats.hp = Math.max(0, defender.stats.hp - dmg);
  }
  if (selfDmg > 0) {
    attacker.stats.hp = Math.max(1, attacker.stats.hp - selfDmg);
  }

  return { dmg, heal, buff, selfDmg };
}

// Apply pet ability
function applyPetAbility(fighter, enemy) {
  if (!fighter.pet) return null;
  const { ability, power, pet } = { ...fighter, pet: fighter.pet };
  const ab = fighter.pet.ability;
  const pw = fighter.pet.power;
  const variance = 0.9 + Math.random() * 0.2;
  let dmg = 0, heal = 0, buff = null;

  switch (ab.type) {
    case "physical":
      dmg = Math.max(1, Math.round((pw + fighter.stats.atk * 0.3) * variance));
      enemy.stats.hp = Math.max(0, enemy.stats.hp - dmg);
      break;
    case "magic":
    case "ultimate":
      dmg = Math.max(1, Math.round((pw + fighter.stats.matk * 0.3) * variance));
      enemy.stats.hp = Math.max(0, enemy.stats.hp - dmg);
      break;
    case "heal":
      heal = Math.round(pw * variance);
      fighter.stats.hp = Math.min(fighter.stats.maxHp, fighter.stats.hp + heal);
      break;
    case "buff_atk":
      fighter.stats.atk += Math.round(pw);
      buff = { stat: "ATK", amount: Math.round(pw) };
      break;
    case "buff_def":
      fighter.stats.def += Math.round(pw);
      buff = { stat: "DEF", amount: Math.round(pw) };
      break;
  }

  return {
    petName: fighter.pet.name,
    petEmoji: fighter.pet.emoji,
    abilityName: ab.name,
    abilityEmoji: ab.emoji,
    dmg, heal, buff,
  };
}

// Main battle resolution
export function resolveBattle(student1, student2) {
  const f1 = computeFighterStats(student1);
  const f2 = computeFighterStats(student2);
  const log = [];
  let turn = 0;

  while (f1.stats.hp > 0 && f2.stats.hp > 0 && turn < 20) {
    const attacker = turn % 2 === 0 ? f1 : f2;
    const defender = turn % 2 === 0 ? f2 : f1;

    // Pet activates every 3 turns
    if (turn % 3 === 0 && turn > 0) {
      const petResult = applyPetAbility(attacker, defender);
      if (petResult) {
        log.push({
          turn,
          type: "pet",
          attackerId: attacker.id,
          attackerName: attacker.name,
          ...petResult,
          attackerHp: attacker.stats.hp,
          defenderHp: defender.stats.hp,
        });
      }
    }

    // Skill action
    const skill = aiPickSkill(attacker, turn);
    const result = applySkill(attacker, defender, skill);

    log.push({
      turn,
      type: "skill",
      attackerId: attacker.id,
      attackerName: attacker.name,
      defenderId: defender.id,
      defenderName: defender.name,
      skillName: skill.name,
      skillEmoji: skill.emoji,
      skillType: skill.type,
      ...result,
      attackerHp: attacker.stats.hp,
      defenderHp: defender.stats.hp,
    });

    turn++;
  }

  const winner = f1.stats.hp > 0 ? f1 : f2;
  const loser = f1.stats.hp > 0 ? f2 : f1;

  return {
    winnerId: winner.id,
    loserId: loser.id,
    winnerName: winner.name,
    loserName: loser.name,
    log,
    turns: turn,
    fighter1: f1,
    fighter2: f2,
  };
}
